import React, { useId } from "react";
export function FormField({ label, helperText, error, required=true, children }) {
  const id = useId();
  const helperId = `${id}-help`;
  const errorId = `${id}-err`;
  const describedBy = [helperText ? helperId : null, error ? errorId : null].filter(Boolean).join(" ");

  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}{required ? <span aria-label="required"> *</span> : null}
      </label>

      {typeof children === "function" ? children({ id, describedBy }) : children}

      {helperText ? <div className="helper muted" id={helperId}>{helperText}</div> : null}
      {error ? <div className="error" id={errorId} role="alert">{error}</div> : null}
    </div>
  );
}
