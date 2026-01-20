import React, { useEffect } from "react";
export function Toast({ message, onClose, durationMs=2500 }) {
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(() => onClose?.(), durationMs);
    return () => clearTimeout(t);
  }, [message, onClose, durationMs]);

  if (!message) return null;
  return (
    <div className="toast" role="status" aria-live="polite">
      <span>{message}</span>
      <button className="toastClose" onClick={onClose} aria-label="Close toast">×</button>
    </div>
  );
}
