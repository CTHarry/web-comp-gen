import React, { useMemo, useState } from "react";
import { Card } from "../components/Card.jsx";
import { Button } from "../components/Button.jsx";
import { AlertBanner } from "../components/AlertBanner.jsx";
import { Toast } from "../components/Toast.jsx";
import { TextInput } from "../components/forms/TextInput.jsx";
import { Select } from "../components/forms/Select.jsx";
import { useCopySuggestions } from "../hooks/useCopySuggestions.js";

export default function Playground() {
  const [provider, setProvider] = useState("");
  const modelOptions = useMemo(() => {
    if (provider === "openai") return ["gpt-4o-mini", "gpt-4.1-mini"];
    if (provider === "gemini") return ["gemini-1.5-flash", "gemini-1.5-pro"];
    if (provider === "mock") return ["mock-deterministic"];
    return [];
  }, [provider]);
  const [model, setModel] = useState(""); // default blank 

  const [email, setEmail] = useState("");
  const [toast, setToast] = useState("");

  const [emailCopy, setEmailCopy] = useState({
    label: "Email address",
    placeholder: "name@example.com",
    helper_text: "We’ll send your generated copy here (optional).",
    aria_label: "Email address input",
    error_messages: {
      required: "Please enter an email address.",
      invalid: "Please enter a valid email address (like name@example.com)."
    },
    microcopy: [
      "We’ll only email you about this request.",
      "No marketing messages.",
      "You can leave this blank if you prefer."
    ]
  });

  const { loading, error, run } = useCopySuggestions();

  const emailError = !email ? emailCopy.error_messages.required : (email.includes("@") ? "" : emailCopy.error_messages.invalid);

  async function generateEmailCopy() {
    const payload = {
      business_name: "Sample Studio",
      product_or_service: "Website Templates",
      city: "Waterloo, ON",
      target_audience: "students and small teams",
      tone: "supportive, clear",
      field_type: "email",
      field_name: "email",
      field_purpose: "contact you with updates",
      required: true,
      options: null,
      provider,
      model
    };

    const data = await run(payload);
    if (data) {
      setEmailCopy(data);
      setToast("Applied AI copy suggestions to the Email field.");
    }
  }

  return (
    <div>
      <Toast message={toast} onClose={() => setToast("")} />

      <div className="grid">
        <Card title="AI settings">
          <div className="row2">
            <Select
              label="AI Provider"
              value={provider}
              onChange={(v) => { setProvider(v); setModel(""); }}
              options={["mock", "openai", "gemini"]}
              helperText="This is a UI control; backend provider switching comes next."
              required={false}
            />
            <Select
              label="Model"
              value={model}
              onChange={setModel}
              options={modelOptions}
              helperText={provider ? "Pick a model for this provider." : "Choose a provider first."}
              required={false}
              disabled={!provider}
            />
          </div>
          <AlertBanner>
            You now have a reusable component set + AI copy assist hook.
          </AlertBanner>
        </Card>

        <Card title="Field preview">
          <Button onClick={generateEmailCopy} disabled={loading} ariaLabel="Generate AI copy">
            {loading ? "Generating..." : "Generate Copy"}
          </Button>

          {error ? <div className="error">{error}</div> : null}
          <div className="divider" />

          <TextInput
            label={emailCopy.label}
            value={email}
            onChange={setEmail}
            placeholder={emailCopy.placeholder}
            helperText={emailCopy.helper_text}
            error={emailError}
            ariaLabel={emailCopy.aria_label}
            required={true}
            type="email"
          />

          <div className="helper muted">Microcopy:</div>
          <ul>
            {emailCopy.microcopy.map((m) => <li key={m}>{m}</li>)}
          </ul>
        </Card>
      </div>
    </div>
  );
}
