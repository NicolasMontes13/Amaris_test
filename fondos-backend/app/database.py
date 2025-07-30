import boto3
import os
from dotenv import load_dotenv

load_dotenv()

if os.getenv("DYNAMODB_LOCAL") == "true":
    dynamodb = boto3.resource(
        'dynamodb',
        endpoint_url = "http://localhost:8000",
        region_name = os.getenv("AWS_REGION"),
        aws_access_key_id = os.getenv("AWS_ACCESS_KEY_ID"),
        aws_secret_access_key = os.getenv("AWS_SECRET_ACCESS_KEY")
    )
else:
    dynamodb = boto3.resource(
        'dynamodb',
        region_name=os.getenv("AWS_REGION")
    )

funds_table = dynamodb.Table("Funds")
transactions_table = dynamodb.Table("Transactions")
user_table = dynamodb.Table("Users")
subscriptions_table = dynamodb.Table("Subscriptions")