import React, { useId } from "react";

export function ToggleSwitch({ label, enabled, onToggle }) {
  const id = useId();
  return (
    <div style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 8 }}>
      <input id={id} type="checkbox" role="switch" checked={enabled} onChange={(e) => onToggle(e.target.checked)} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}
