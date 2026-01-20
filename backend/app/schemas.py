from pydantic import BaseModel, Field
from typing import Dict, List, Optional

class CopySuggestRequest(BaseModel):
    business_name: str = Field(..., min_length=1)
    product_or_service: str = Field(..., min_length=1)
    city: str = Field(..., min_length=1)
    target_audience: str = Field(..., min_length=1)
    tone: str = Field(..., min_length=1)
    field_type: str = Field(..., description="text, email, select, textarea, etc.")
    field_name: str = Field(..., description="e.g., email, fullName")
    field_purpose: str = Field(..., description="What the field is for")
    required: bool = True
    options: Optional[List[str]] = None  # for select/radio
    provider: Optional[str] = None       # UI sends it; backend may ignore for now
    model: Optional[str] = None          # UI sends it; backend may ignore for now

class CopySuggestResponse(BaseModel):
    label: str
    placeholder: str
    helper_text: str
    aria_label: str
    error_messages: Dict[str, str]
    microcopy: List[str]
