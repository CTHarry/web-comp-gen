import json

def build_prompt(req_dict: dict) -> str:
    schema = {
        "label": "string",
        "placeholder": "string",
        "helper_text": "string",
        "aria_label": "string",
        "error_messages": {"required": "string", "invalid": "string"},
        "microcopy": ["string", "string", "string"]
    }

    return (
        "You are an expert UX writer and accessibility specialist.\n"
        "Return ONLY valid JSON (no markdown, no backticks).\n"
        "The JSON must match this exact shape and keys:\n"
        f"{json.dumps(schema, indent=2)}\n\n"
        "Rules:\n"
        "- Plain language and supportive.\n"
        "- Make it accessible: clear label + meaningful aria_label.\n"
        "- placeholder should be an example, not instructions.\n"
        "- helper_text helps user succeed.\n"
        "- error_messages.required: short + specific.\n"
        "- error_messages.invalid: formatting error.\n"
        "- microcopy: 3 short helpful tips.\n\n"
        "Context:\n"
        f"{json.dumps(req_dict, indent=2)}\n"
    )
