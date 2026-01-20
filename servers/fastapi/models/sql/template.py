from datetime import datetime
from typing import Optional
import uuid
from sqlalchemy import Column, DateTime
from sqlmodel import SQLModel, Field

from models.sql.types import UUIDHex
from utils.datetime_utils import get_current_utc_datetime


class TemplateModel(SQLModel, table=True):
    __tablename__ = "templates"

    id: uuid.UUID = Field(
        sa_column=Column(UUIDHex(), primary_key=True),
        default_factory=uuid.uuid4,
        description="UUID for the template (matches presentation_id)",
    )
    name: str = Field(description="Human friendly template name")
    description: Optional[str] = Field(
        default=None, description="Optional template description"
    )
    created_at: datetime = Field(
        sa_column=Column(
            DateTime(timezone=True), nullable=False, default=get_current_utc_datetime
        ),
    )
