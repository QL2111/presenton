from typing import Any, List, Literal, Optional, Union
from pydantic import BaseModel
from google.genai.types import Content as GoogleContent

from models.llm_tool_call import AnthropicToolCall


class LLMMessage(BaseModel):
    pass


class LLMTextContent(BaseModel):
    type: Literal["text"] = "text"
    text: str


class LLMImageContent(BaseModel):
    type: Literal["image"] = "image"
    mime: str  # e.g., "image/png"
    data: str  # base64 encoded image data (without data: prefix)


LLMContentPart = Union[LLMTextContent, LLMImageContent]


class LLMUserMessage(LLMMessage):
    role: Literal["user"] = "user"
    content: Union[str, List[LLMContentPart]]


class LLMSystemMessage(LLMMessage):
    role: Literal["system"] = "system"
    content: str


class OpenAIAssistantMessage(LLMMessage):
    role: Literal["assistant"] = "assistant"
    content: str | None = None
    tool_calls: Optional[List[dict]] = None


class GoogleAssistantMessage(LLMMessage):
    role: Literal["assistant"] = "assistant"
    content: GoogleContent


class AnthropicAssistantMessage(LLMMessage):
    role: Literal["assistant"] = "assistant"
    content: List[AnthropicToolCall]


class AnthropicToolCallMessage(LLMMessage):
    type: Literal["tool_result"] = "tool_result"
    tool_use_id: str
    content: str


class AnthropicUserMessage(LLMMessage):
    role: Literal["user"] = "user"
    content: List[AnthropicToolCallMessage]


class OpenAIToolCallMessage(LLMMessage):
    role: Literal["tool"] = "tool"
    content: str
    tool_call_id: str


class GoogleToolCallMessage(LLMMessage):
    role: Literal["tool"] = "tool"
    id: Optional[str] = None
    name: str
    response: dict
