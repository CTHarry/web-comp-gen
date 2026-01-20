from dotenv import load_dotenv
load_dotenv()

import json
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import ValidationError

from app.schemas import CopySuggestRequest, CopySuggestResponse
from app.prompts.templates import build_prompt
from app.llm.llm_router import generate_ui_copy_json

app = FastAPI(title="Prompt Service", version="1.1")

app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=r"http://localhost:\d+",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health():
    return {"ok": True}

def _safe_parse_json(text: str) -> dict:
    text = (text or "").strip()
    if not text:
        return {}
    try:
        return json.loads(text)
    except Exception:
        pass
    start = text.find("{")
    end = text.rfind("}")
    if start != -1 and end != -1 and end > start:
        try:
            return json.loads(text[start:end+1])
        except Exception:
            return {}
    return {}

@app.post("/suggest-copy", response_model=CopySuggestResponse)
def suggest_copy(req: CopySuggestRequest):
    req_dict = req.model_dump()
    prompt = build_prompt(req_dict)

    raw = generate_ui_copy_json(req.provider, req.model, prompt, req_dict)
    data = _safe_parse_json(raw)

    try:
        return CopySuggestResponse(**data)
    except ValidationError:
        # defensive fallback to mock JSON
        from app.llm.mock_client import MockLLMClient
        fallback = _safe_parse_json(MockLLMClient().generate_json(req_dict, prompt))
        return CopySuggestResponse(**fallback)
