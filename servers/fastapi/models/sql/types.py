"""Custom SQLAlchemy types for handling UUID storage in SQLite."""

import uuid
from sqlalchemy import String
from sqlalchemy.types import TypeDecorator


class UUIDHex(TypeDecorator):
    """A custom type that stores UUIDs as 32-character hex strings in SQLite.

    SQLite doesn't have a native UUID type, and SQLModel/SQLAlchemy can
    sometimes create a mismatch between how UUIDs are queried (with dashes)
    and how they're stored (as hex without dashes).

    This TypeDecorator ensures consistent handling:
    - Stores UUIDs as 32-character hex strings (no dashes)
    - Converts UUID objects to hex on bind (insert/update)
    - Converts hex strings back to UUID objects on load
    """

    impl = String(32)
    cache_ok = True

    def process_bind_param(self, value, dialect):
        """Convert UUID to hex string when writing to database."""
        if value is None:
            return None
        if isinstance(value, uuid.UUID):
            return value.hex
        if isinstance(value, str):
            # Handle both formats: with dashes or without
            return value.replace("-", "")
        return value

    def process_result_value(self, value, dialect):
        """Convert hex string back to UUID when reading from database."""
        if value is None:
            return None
        if isinstance(value, uuid.UUID):
            return value
        return uuid.UUID(value)

    def process_literal_param(self, value, dialect):
        """Process literal parameters in SQL statements."""
        return self.process_bind_param(value, dialect)
