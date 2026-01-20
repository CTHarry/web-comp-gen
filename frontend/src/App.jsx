import React from "react";
import Playground from "./pages/Playground.jsx";
import "./styles/app.css";

export default function App() {
  return (
    <div className="app">
      <div className="header">
        <div>
          <h1>AI Copy Assistant</h1>
          <p className="muted">Generate accessible form microcopy with a structured backend prompt service.</p>
        </div>
      </div>
      <Playground />
    </div>
  );
}
