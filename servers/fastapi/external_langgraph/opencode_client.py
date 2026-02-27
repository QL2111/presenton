import logging
import requests
from typing import Optional, List
from langsmith import traceable

logger = logging.getLogger(__name__)

# Remplacer par ton URL réelle si besoin
BASE_URL = "http://127.0.0.1:4096" # ou localhost selon ta config

class OpenCodeClient:
    """
    Classe qui gère la création de session, et le fetch de session ainsi que l'envoie de message.
    On utilise Opencode comme gateway et exposer une API afin de toucher aux modèles fournis par GitHub Copilot
    """
    def __init__(self, base_url: str = BASE_URL):
        self.base_url = base_url

    def list_sessions(self) -> List[tuple[str, Optional[str]]]:
        """Récupère les sessions actives."""
        resp = requests.get(url=f"{self.base_url}/session",
                             timeout=180)
        resp.raise_for_status()
        return [(s['id'], s.get('slug')) for s in resp.json()]

    @traceable(run_type="llm", name="OpenCode LLM Call")
    def send_message(self, session_id: str, content: str, system_prompt: str) -> str:
        """
        Envoie un message avec un SYSTEM PROMPT dynamique.
        Multi-agent : chaque agent passera sa propre "personnalité" ici.
        """
        payload = {
            'system': system_prompt, 
            'parts': [{'type': 'text', 'text': content}]
        }
        
        try:
            logger.debug(f"Sending message to session {session_id}")
            logger.debug(f"Payload: {payload}")
            
            resp = requests.post(
                url=f"{self.base_url}/session/{session_id}/message",
                json=payload,
                timeout=180)
            resp.raise_for_status()
            
            logger.debug(f"Status: {resp.status_code}")
            logger.debug(f"Response text: {resp.text}")
            
            data = resp.json()
            logger.debug(f"Parsed response: {data}")
            
            response_text = ""
            for part in data.get('parts', []):
                if part.get('type') == 'text':
                    response_text = part.get('text', '')
                    break
            
            logger.info(f"Successfully received response from OpenCode")
            return response_text.strip()
            
        except requests.exceptions.RequestException as e:
            logger.error(f"Network error: {str(e)}")
            return f"Network error: {str(e)}"
        except ValueError as e:
            logger.error(f"JSON parse error: {str(e)}")
            return f"JSON parse error: {str(e)}"
        except Exception as e:
            logger.error(f"Error calling OpenCode: {str(e)}")
            return f"Error calling OpenCode: {str(e)}"
