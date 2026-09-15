"use client";

import { useState } from "react";
import { DEMO_META } from "@/lib/demo-data";

export default function AIPage() {
  const [q, setQ] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);

  function handleAsk(e: React.FormEvent) {
    e.preventDefault();
    if (!q.trim()) return;
    // Placeholder: real AI needs API key + context from DB
    setAnswer(
      "AI response requires an API key (OpenAI or similar) and connection to live/demo player data. " +
        "Configure OPENAI_API_KEY in .env.local and implement the chat route. " +
        "Current mode: Demo only. Data unavailable for live answers."
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-2 text-2xl font-bold">NBA AI Assistant</h1>
      <p className="mb-6 text-sm text-zinc-500">
        Ask about players, teams, records · {DEMO_META.is_demo ? "Demo Data" : "Live"}
      </p>

      <form onSubmit={handleAsk} className="mb-6 flex gap-2">
        <input
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Who has the most championships?"
          className="flex-1 rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-sm"
        />
        <button
          type="submit"
          className="rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-semibold text-black hover:bg-orange-400"
        >
          Ask
        </button>
      </form>

      {answer && (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 text-sm text-zinc-300">
          {answer}
        </div>
      )}

      <p className="mt-6 text-xs text-zinc-600">
        Last Updated (data context): {DEMO_META.last_updated}
      </p>
    </div>
  );
}
