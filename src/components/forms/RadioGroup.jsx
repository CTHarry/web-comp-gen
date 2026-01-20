import React, { useId } from "react";

export function RadioGroup({ legend, value, onChange, options }) {
  const base = useId();
  return (
    <fieldset style={{ border: "1px solid #ddd", borderRadius: 12, padding: 10 }}>
      <legend style={{ padding: "0 6px", fontWeight: 600 }}>{legend}</legend>
      <div style={{ display: "grid", gap: 6 }}>
        {options.map((opt, i) => {
          const id = `${base}-${i}`;
          return (
            <label key={opt} htmlFor={id} style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <input
                id={id}
                type="radio"
                name={base}
                value={opt}
                checked={value === opt}
                onChange={() => onChange(opt)}
              />
              {opt}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
