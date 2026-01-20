import React from "react";
export function Card({ title, children }) {
  return (
    <section className="card" aria-label={title}>
      <h2 className="cardTitle">{title}</h2>
      <div>{children}</div>
    </section>
  );
}
