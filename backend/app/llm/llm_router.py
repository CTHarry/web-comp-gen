from typing import Optional
from app.llm.mock_client import MockLLMClient

def generate_ui_copy_json(provider: Optional[str], model: Optional[str], prompt: str, req_dict: dict) -> str:
    p = (provider or "").strip().lower()

    # Default: deterministic mock (always works)
    if not p or p == "mock":
        return MockLLMClient().generate_json(req_dict, prompt)

    if p == "openai":
        try:
            from app.llm.openai_client import OpenAIClient
            return OpenAIClient().generate_json(prompt, model=model)
        except Exception:
            # If key/sdk missing, fall back to mock so app still works
            return MockLLMClient().generate_json(req_dict, prompt)

    if p == "gemini":
        try:
            from app.llm.gemini_client import GeminiClient
            return GeminiClient().generate_json(prompt, model=model)
        except Exception:
            return MockLLMClient().generate_json(req_dict, prompt)

    # Unknown provider -> safe fallback
    return MockLLMClient().generate_json(req_dict, prompt)
