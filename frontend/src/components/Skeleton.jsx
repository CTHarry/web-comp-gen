import React from "react";
export function Skeleton({ height=12, width="100%" }) {
  return (
    <div
      style={{
        height,
        width,
        borderRadius: 10,
        background: "linear-gradient(90deg, #eee, #f5f5f5, #eee)",
        backgroundSize: "200% 100%",
        animation: "pulse 1.2s infinite"
      }}
      aria-hidden="true"
    />
  );
}
