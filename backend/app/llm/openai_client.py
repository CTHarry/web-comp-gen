import json
from typing import Optional

from app.config import OPENAI_API_KEY

class OpenAIClient:
    def __init__(self):
        if not OPENAI_API_KEY:
            raise RuntimeError("OPENAI_API_KEY is not set")

        # Try modern SDK first, fall back gracefully
        try:
            from openai import OpenAI  # type: ignore
            self._client = OpenAI(api_key=OPENAI_API_KEY)
            self._mode = "new"
        except Exception:
            import openai  # type: ignore
            openai.api_key = OPENAI_API_KEY
            self._client = openai
            self._mode = "old"

    def generate_json(self, prompt: str, model: Optional[str] = None) -> str:
        model = model or "gpt-4o-mini"

        if self._mode == "new":
            # New style: client.chat.completions.create
            # We ask for strict JSON and set temperature=0 for consistency.
            resp = self._client.chat.completions.create(
                model=model,
                messages=[
                    {"role": "system", "content": "Return ONLY valid JSON. No markdown."},
                    {"role": "user", "content": prompt},
                ],
                temperature=0,
            )
            return resp.choices[0].message.content or "{}"

        # Old style fallback
        resp = self._client.ChatCompletion.create(
            model=model,
            messages=[
                {"role": "system", "content": "Return ONLY valid JSON. No markdown."},
                {"role": "user", "content": prompt},
            ],
            temperature=0,
        )
        return resp["choices"][0]["message"]["content"] or "{}"
