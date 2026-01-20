from datetime import datetime
from typing import Optional
import uuid

from sqlalchemy import JSON, Column, DateTime
from sqlmodel import Field, SQLModel

from models.sql.types import UUIDHex
from utils.datetime_utils import get_current_utc_datetime


class ImageAsset(SQLModel, table=True):
    id: uuid.UUID = Field(
        sa_column=Column(UUIDHex(), primary_key=True), default_factory=uuid.uuid4
    )
    created_at: datetime = Field(
        sa_column=Column(
            DateTime(timezone=True), nullable=False, default=get_current_utc_datetime
        ),
    )
    is_uploaded: bool = Field(default=False)
    path: str
    extras: Optional[dict] = Field(sa_column=Column(JSON), default=None)
