import React from "react";
import { FormField } from "./FormField.jsx";
export function Select({ label, value, onChange, options, helperText, error, required=false, ariaLabel, disabled=false }) {
  return (
    <FormField label={label} helperText={helperText} error={error} required={required}>
      {({ id, describedBy }) => (
        <select
          id={id}
          className="select"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label={ariaLabel || label}
          aria-describedby={describedBy || undefined}
          aria-invalid={!!error}
          disabled={disabled}
        >
          <option value="">Select one</option>
          {options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      )}
    </FormField>
  );
}
