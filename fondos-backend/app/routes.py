from fastapi import APIRouter, HTTPException
from app.models import TransactionRequest
from app.logic import subscribe_to_fund, list_funds, cancel_fund, get_history_transactions, get_user, get_active_subscriptions

router = APIRouter()

@router.post("/transaction")
def handle_transaction(request: TransactionRequest):
    try:
        if request.action == "subscribe":
            tx_id = subscribe_to_fund(request.fund_id, request.notification_method)
            return {"message": "Suscripción exitosa", "transaction_id": tx_id}
        elif request.action == "cancel":
            tx_id = cancel_fund(request.fund_id, request.notification_method)
            return {"message": "Cancelación exitosa", "transaction_id": tx_id}
        else:
            raise HTTPException(status_code=400, detail="Acción no soportada aún.")
    
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@router.get("/funds")
def get_funds():
    try:
        return list_funds()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@router.get("/transactions")
def get_transactions():
    try:
        return get_history_transactions()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/user")
def read_user():
    try:
        return get_user()
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))
    
@router.get("/subscriptions")
def get_subscriptions():
    try:
        response = get_active_subscriptions()
        if response == []:
            raise HTTPException(status_code=404, detail="No hay suscripciones activas.")
        return response
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))