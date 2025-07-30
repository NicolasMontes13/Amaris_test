from pydantic import BaseModel
from typing import Literal
from datetime import datetime

class Fund(BaseModel):
    fund_id: str
    name: str
    category: Literal["FPV", "FIC"]
    min_amount: int

class TransactionRequest(BaseModel):
    fund_id: str
    action: Literal["subscribe", "cancel"]
    notification_method: Literal["email", "sms"]

class Transaction(BaseModel):
    transaction_id: str
    fund_id: str
    action: str
    amount: int
    timestamp: datetime
    notification_method: str