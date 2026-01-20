"""Utility functions for UUID handling with SQLite."""

import uuid


def uuid_to_hex(uuid_val: uuid.UUID) -> str:
    """Convert a UUID to its hex string representation (without dashes).

    SQLite stores UUIDs as 32-character hex strings without dashes,
    but SQLAlchemy/SQLModel queries with the standard 36-character
    dashed format. This function normalizes UUIDs for database queries.

    Args:
        uuid_val: A UUID object

    Returns:
        A 32-character hex string without dashes
    """
    return uuid_val.hex


def hex_to_uuid(hex_str: str) -> uuid.UUID:
    """Convert a hex string to a UUID object.

    Args:
        hex_str: A 32-character hex string without dashes

    Returns:
        A UUID object
    """
    return uuid.UUID(hex_str)
