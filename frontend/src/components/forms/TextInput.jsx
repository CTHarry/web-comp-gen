import React from "react";
import { FormField } from "./FormField.jsx";
export function TextInput({ label, value, onChange, placeholder, helperText, error, required=true, ariaLabel, type="text" }) {
  return (
    <FormField label={label} helperText={helperText} error={error} required={required}>
      {({ id, describedBy }) => (
        <input
          id={id}
          className="input"
          value={value}
          type={type}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          aria-label={ariaLabel || label}
          aria-describedby={describedBy || undefined}
          aria-invalid={!!error}
          required={required}
        />
      )}
    </FormField>
  );
}
