import React, { useId } from "react";

export function Tooltip({ text, children }) {
  const id = useId();
  return (
    <span style={{ position: "relative", display: "inline-flex", alignItems: "center", gap: 6 }}>
      <span aria-describedby={id}>{children}</span>
      <span
        id={id}
        role="tooltip"
        style={{
          position: "absolute",
          left: "100%",
          marginLeft: 10,
          top: "50%",
          transform: "translateY(-50%)",
          background: "#111",
          color: "white",
          padding: "6px 8px",
          borderRadius: 10,
          fontSize: 12,
          whiteSpace: "nowrap",
          opacity: 0.92
        }}
      >
        {text}
      </span>
    </span>
  );
}
