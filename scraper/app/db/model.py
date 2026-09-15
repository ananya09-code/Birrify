from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime

from .database import Base


class Bank(Base):
    __tablename__ = "banks"

    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True, nullable=False)

    rates = relationship("Rate", back_populates="bank")


class Rate(Base):
    __tablename__ = "rates"

    id = Column(Integer, primary_key=True)
    bank_id = Column(Integer, ForeignKey("banks.id"))

    currency_code = Column(String, nullable=False)
    bank_name = Column(String, nullable=False)
    buy = Column(Float, nullable=False)
    sell = Column(Float, nullable=False)

    created_at = Column(DateTime, default=datetime.utcnow)

    bank = relationship("Bank", back_populates="rates")