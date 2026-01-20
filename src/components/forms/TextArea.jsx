import React from "react";
import { FormField } from "./FormField.jsx";

export function TextArea({ label, value, onChange, placeholder, helperText, error, required=false, ariaLabel, rows=4 }) {
  return (
    <FormField label={label} helperText={helperText} error={error} required={required}>
      {({ id, describedBy }) => (
        <textarea
          id={id}
          className="textarea"
          value={value}
          rows={rows}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          aria-label={ariaLabel || label}
          aria-describedby={describedBy || undefined}
          aria-invalid={!!error}
        />
      )}
    </FormField>
  );
}
