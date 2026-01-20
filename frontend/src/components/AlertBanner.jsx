import React from "react";
export function AlertBanner({ children }) {
  return <div className="banner" role="status">{children}</div>;
}
