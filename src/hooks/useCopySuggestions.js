import { useState } from "react";
import { suggestCopy } from "../api/client.js";

export function useCopySuggestions() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState(null);

  async function run(payload) {
    setLoading(true);
    setError("");
    setSuggestions(null);
    try {
      const data = await suggestCopy(payload);
      setSuggestions(data);
      return data;
    } catch (e) {
      setError(e?.message || "Something went wrong.");
      return null;
    } finally {
      setLoading(false);
    }
  }

  return { loading, error, suggestions, run };
}
