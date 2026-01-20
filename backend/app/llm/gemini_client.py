from typing import Optional
from app.config import GEMINI_API_KEY

class GeminiClient:
    def __init__(self):
        if not GEMINI_API_KEY:
            raise RuntimeError("GEMINI_API_KEY is not set")
        import google.generativeai as genai  # type: ignore
        genai.configure(api_key=GEMINI_API_KEY)
        self._genai = genai

    def generate_json(self, prompt: str, model: Optional[str] = None) -> str:
        model = model or "gemini-1.5-flash"
        m = self._genai.GenerativeModel(model_name=model)
        resp = m.generate_content(
            prompt,
            generation_config={"temperature": 0},
        )
        # Gemini returns text; we enforce "JSON only" in prompt template
        return (resp.text or "{}").strip()
