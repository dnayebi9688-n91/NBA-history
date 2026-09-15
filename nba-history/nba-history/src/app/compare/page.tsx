"use client";

import { useState } from "react";
import { DEMO_PLAYERS, DEMO_META } from "@/lib/demo-data";

export default function ComparePage() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");

  const playerA = DEMO_PLAYERS.find((p) => p.id === a);
  const playerB = DEMO_PLAYERS.find((p) => p.id === b);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-2 text-2xl font-bold">Compare Players</h1>
      <p className="mb-6 text-sm text-zinc-500">
        {DEMO_META.is_demo ? "Demo Data" : "Live"} · Last Updated: {DEMO_META.last_updated}
      </p>

      <div className="mb-8 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm text-zinc-500">Player A</label>
          <select
            value={a}
            onChange={(e) => setA(e.target.value)}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2"
          >
            <option value="">Select…</option>
            {DEMO_PLAYERS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.full_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm text-zinc-500">Player B</label>
          <select
            value={b}
            onChange={(e) => setB(e.target.value)}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2"
          >
            <option value="">Select…</option>
            {DEMO_PLAYERS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.full_name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {playerA && playerB ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {[playerA, playerB].map((p) => (
            <div key={p.id} className="rounded-xl border border-zinc-800 p-5">
              <p className="text-lg font-semibold">{p.full_name}</p>
              <p className="text-sm text-zinc-500">
                {p.position} · {p.is_active ? "Active" : "Retired"}
                {p.is_hall_of_fame ? " · HOF" : ""}
              </p>
              <dl className="mt-4 space-y-1 text-sm">
                <div className="flex justify-between">
                  <dt className="text-zinc-500">Height</dt>
                  <dd>{p.height_cm ? `${p.height_cm} cm` : "Data unavailable"}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-zinc-500">Draft</dt>
                  <dd>{p.draft_year ?? "Data unavailable"}</dd>
                </div>
              </dl>
              <p className="mt-3 text-xs text-zinc-600">
                Career stats comparison requires season_stats data.
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-zinc-500">Select two players to compare.</p>
      )}
    </div>
  );
}
