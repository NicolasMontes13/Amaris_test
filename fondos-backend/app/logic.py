import uuid
from datetime import datetime
from app.database import user_table, funds_table, transactions_table, subscriptions_table

def subscribe_to_fund(fund_id: str, method: str):
    user = user_table.get_item(Key={"user_id": "1"}).get("Item")
    fund = funds_table.get_item(Key={"fund_id": fund_id}).get("Item")
    if not user:
        raise Exception("Usuario no encontrado")
    elif not fund:
        raise Exception("Fondo no encontrado")
    
    response = subscriptions_table.get_item(Key={"user_id": "1", "fund_id": fund_id})
    if response.get("Item") and response["Item"]["status"] == "active":
        raise Exception(f"Ya está suscrito al fondo {fund['name']}.")

    if user["balance"] < fund["min_amount"]:
        raise Exception(f"No tiene saldo disponible para vincularse al fondo {fund['name']}")

    user_table.update_item(
        Key={"user_id": "1"},
        UpdateExpression="SET balance = balance - :amount",
        ExpressionAttributeValues={":amount": fund["min_amount"]}
    )

    transaction_id = str(uuid.uuid4())
    transactions_table.put_item(
        Item={
            "transaction_id": transaction_id,
            "user_id": "1",
            "fund_id": fund_id,
            "action": "subscribe",
            "amount": fund["min_amount"],
            "timestamp": datetime.now().isoformat(),
            "notification_method": method
        }
    )

    subscriptions_table.put_item(
        Item={
            "user_id": "1",
            "fund_id": fund_id,
            "status": "active",
            "joined_at": datetime.now().isoformat(),
            "updated_at": datetime.now().isoformat()
        }
    )

    return transaction_id

def list_funds():
    from app.database import funds_table
    response = funds_table.scan()
    return response.get("Items", [])

def cancel_fund(fund_id: str, method: str):
    user = user_table.get_item(Key={"user_id": "1"}).get("Item")
    fund = funds_table.get_item(Key={"fund_id": fund_id}).get("Item")
    if not user:
        raise Exception("Usuario no encontrado")
    elif not fund:
        raise Exception("Fondo no encontrado")
    
    response = subscriptions_table.get_item(Key={"user_id": "1", "fund_id": fund_id})
    subscription = response.get("Item")
    if not subscription or subscription["status"] != "active":
        raise Exception(f"No está suscrito actualmente al fondo {fund['name']}.")

    # Retornar el valor al usuario
    user_table.update_item(
        Key={"user_id": "1"},
        UpdateExpression="SET balance = balance + :amount",
        ExpressionAttributeValues={":amount": fund["min_amount"]}
    )

    transaction_id = str(uuid.uuid4())
    transactions_table.put_item(
        Item={
            "transaction_id": transaction_id,
            "user_id": "1",
            "fund_id": fund_id,
            "action": "cancel",
            "amount": fund["min_amount"],
            "timestamp": datetime.now().isoformat(),
            "notification_method": method
        }
    )

    subscriptions_table.update_item(
        Key={"user_id": "1", "fund_id": fund_id},
        UpdateExpression="SET #s = :s, updated_at = :u",
        ExpressionAttributeNames={"#s": "status"},
        ExpressionAttributeValues={
            ":s": "cancelled",
            ":u": datetime.now().isoformat()
        }
    )

    return transaction_id

def get_history_transactions():
    response = transactions_table.scan()
    return response.get("Items", [])

def get_user():
    user = user_table.get_item(Key={"user_id": "1"}).get("Item")
    if not user:
        raise Exception("Usuario no encontrado.")
    return user

def get_active_subscriptions():
    response = subscriptions_table.scan(
        FilterExpression="user_id = :u AND #s = :s",
        ExpressionAttributeNames={"#s": "status"},
        ExpressionAttributeValues={":u": "1", ":s": "active"}
    )
    return response.get("Items", [])