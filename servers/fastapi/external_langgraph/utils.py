"""Utility functions vendored from my_first_langgraph_project."""
from pathlib import Path
import os
import logging

logger = logging.getLogger(__name__)


def configure_logging() -> None:
    """Configure le logging vers un fichier (mode écrasement) et console."""
    log_file = os.path.join(os.path.dirname(__file__), "logs.txt")
    logging.basicConfig(
        level=logging.DEBUG,
        format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
        handlers=[
            logging.FileHandler(log_file, mode="w"),  # Overwrite on each run
            # logging.StreamHandler()  # Also print to console
        ]
    )


def get_session_id(client) -> str:
    """Récupère ou crée un ID de session.
    
    Args:
        client: Instance OpenCodeClient
        
    Returns:
        ID de session valide
        
    Raises:
        RuntimeError: Si aucune session n'est disponible
    """
    session_id = os.environ.get("SESSION_ID")
    
    if not session_id:
        logger.info("No SESSION_ID found. Creating a new session...")
        try:
            sessions = client.list_sessions()
            if sessions:
                session_id = sessions[0][0]
                logger.info(f"Using existing session: {session_id}")
            else:
                logger.error("No existing sessions. Please set SESSION_ID env var or start OpenCode server.")
                raise RuntimeError("No sessions available")
        except Exception as e:
            logger.error(f"Failed to get sessions: {e}")
            raise
    else:
        logger.info(f"Using SESSION_ID: {session_id}")
    
    return session_id


def export_graph_png(graph_image: bytes, filename: str = "langgraph_graph.png") -> Path:
    """Exporte la visualisation du graphe en fichier PNG.
    
    Args:
        graph_image: Octets PNG provenant de app.get_graph().draw_mermaid_png()
        filename: Nom du fichier de sortie (défaut: "langgraph_graph.png")
    
    Returns:
        Chemin du fichier exporté
    """
    output_dir = Path("output")
    output_dir.mkdir(exist_ok=True)
    
    graph_path = Path(f"{output_dir}/{filename}")
    
    with open(graph_path, "wb") as f:
        f.write(graph_image)
    
    logger = logging.getLogger(__name__)
    logger.info(f"Graphe exporté : {graph_path}")
    
    return graph_path
