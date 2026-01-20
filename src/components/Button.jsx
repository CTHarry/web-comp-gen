import React from "react";
export function Button({ children, onClick, type="button", disabled, ariaLabel }) {
  return (
    <button className="btn" type={type} onClick={onClick} disabled={disabled} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
