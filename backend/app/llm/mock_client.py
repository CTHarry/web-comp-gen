import json
import re

def _titleize(s: str) -> str:
    s = re.sub(r"([a-z])([A-Z])", r"\1 \2", s)
    s = s.replace("_", " ").strip()
    return s[:1].upper() + s[1:] if s else "Field"

class MockLLMClient:
    def generate_json(self, req_dict: dict, prompt: str) -> str:
        field_name = req_dict.get("field_name", "field")
        field_type = req_dict.get("field_type", "text")
        tone = (req_dict.get("tone") or "").lower()

        label = _titleize(field_name)

        if field_type == "email":
            placeholder = "e.g., alex@email.com"
        elif field_type == "text":
            placeholder = "e.g., Alex Johnson"
        elif field_type == "select":
            placeholder = "Choose an option"
        else:
            placeholder = "Type here"

        helper = "Enter a short, clear answer so we can help you faster."
        if "friendly" in tone:
            helper = "A quick answer helps us get back to you sooner."

        aria_label = f"{label} input"
        errors = {
            "required": f"Please enter your {label.lower()}.",
            "invalid": f"That {label.lower()} doesnt look right. Please check the format."
        }
        microcopy = [
            "Keep it short and clear.",
            "Double-check spelling before you submit.",
            "You can update this later if needed."
        ]

        return json.dumps({
            "label": label,
            "placeholder": placeholder,
            "helper_text": helper,
            "aria_label": aria_label,
            "error_messages": errors,
            "microcopy": microcopy
        })
