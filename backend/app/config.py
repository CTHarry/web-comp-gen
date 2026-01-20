import os

def get_env(name: str) -> str | None:
    v = os.getenv(name)
    if v is None:
        return None
    v = v.strip()
    return v if v else None

OPENAI_API_KEY = get_env("OPENAI_API_KEY")
GEMINI_API_KEY = get_env("GEMINI_API_KEY")
