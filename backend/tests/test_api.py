from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health():
    r = client.get("/health")
    assert r.status_code == 200
    assert r.json() == {"ok": True}

def test_suggest_copy_contract_mock():
    payload = {
        "business_name": "Sample Studio",
        "product_or_service": "Website Templates",
        "city": "Waterloo, ON",
        "target_audience": "students and small teams",
        "tone": "supportive, clear",
        "field_type": "email",
        "field_name": "email",
        "field_purpose": "contact you with updates",
        "required": True,
        "options": None,
        "provider": "mock",
        "model": "mock-deterministic"
    }

    r = client.post("/suggest-copy", json=payload)
    assert r.status_code == 200
    data = r.json()

    for k in ["label", "placeholder", "helper_text", "aria_label", "error_messages", "microcopy"]:
        assert k in data

    assert isinstance(data["microcopy"], list)
    assert "required" in data["error_messages"]
    assert "invalid" in data["error_messages"]

def test_suggest_copy_validation_422():
    r = client.post("/suggest-copy", json={"field_name": "email"})
    assert r.status_code == 422

def test_provider_fallback_does_not_break():
    payload = {
        "business_name": "Sample Studio",
        "product_or_service": "Website Templates",
        "city": "Waterloo, ON",
        "target_audience": "students",
        "tone": "friendly",
        "field_type": "text",
        "field_name": "fullName",
        "field_purpose": "identify the user",
        "required": True,
        "options": None,
        "provider": "openai",
        "model": "gpt-4o-mini"
    }
    r = client.post("/suggest-copy", json=payload)
    assert r.status_code == 200
    assert "label" in r.json()
