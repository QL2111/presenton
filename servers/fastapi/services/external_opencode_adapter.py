"""Async adapter around the vendored `OpenCodeClient`.

This adapter lets Presenton call the synchronous vendored client without
blocking the event loop. It also provides an async `create_session` using
`httpx` for convenience.
"""
import os
import asyncio
import logging
from typing import Optional, List, Tuple

import httpx

logger = logging.getLogger(__name__)

try:
    # Typical runtime: servers/fastapi is on PYTHONPATH
    from external_langgraph.opencode_client import OpenCodeClient
except Exception:
    # Fallback if imported as a package
    from servers.fastapi.external_langgraph.opencode_client import OpenCodeClient  # type: ignore


class ExternalOpenCodeAdapter:
    def __init__(self, base_url: Optional[str] = None):
        self.base_url = base_url or os.getenv("OPENCODE_URL", "http://127.0.0.1:4096")
        self._sync_client = OpenCodeClient(base_url=self.base_url)
        self._httpx = httpx.AsyncClient(timeout=300.0)

    async def list_sessions(self) -> List[Tuple[str, Optional[str]]]:
        return await asyncio.to_thread(self._sync_client.list_sessions)

    async def create_session(self, slug: Optional[str] = None) -> str:
        payload = {"slug": slug} if slug else {}
        resp = await self._httpx.post(f"{self.base_url}/session", json=payload, timeout=30.0)
        resp.raise_for_status()
        data = resp.json()
        return data.get("id")

    async def send_message(
        self,
        session_id: str,
        content: str,
        system_prompt: str,
        model: Optional[str] = None,
        temperature: Optional[float] = None,
    ) -> str:
        """Send a message. If `model`/`temperature` are provided we call the
        HTTP API directly (so the extra params are passed through). Otherwise
        we call the vendored sync client via a thread.
        """
        if model is None and temperature is None:
            return await asyncio.to_thread(self._sync_client.send_message, session_id, content, system_prompt)

        payload = {"system": system_prompt, "parts": [{"type": "text", "text": content}]}
        if model is not None:
            payload["model"] = model
        if temperature is not None:
            payload["temperature"] = temperature

        resp = await self._httpx.post(
            f"{self.base_url}/session/{session_id}/message", json=payload, timeout=180.0
        )
        resp.raise_for_status()
        data = resp.json()

        response_text = ""
        for part in data.get("parts", []):
            if part.get("type") == "text":
                response_text = part.get("text", "")
                break
        return response_text.strip()
