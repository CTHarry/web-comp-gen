import React, { useEffect } from "react";

export function Modal({ open, title, children, onClose }) {
  useEffect(() => {
    if (!open) return;
    function onKey(e) {
      if (e.key === "Escape") onClose?.();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.45)",
        display: "grid",
        placeItems: "center",
        padding: 16
      }}
      role="presentation"
    >
      <div
        className="card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        style={{ width: "min(720px, 100%)" }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
          <h2 className="cardTitle">{title}</h2>
          <button className="toastClose" onClick={onClose} aria-label="Close modal"></button>
        </div>
        <div style={{ marginTop: 10 }}>{children}</div>
      </div>
    </div>
  );
}
