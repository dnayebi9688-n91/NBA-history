import Link from "next/link";
import { DEMO_PLAYERS, DEMO_META } from "@/lib/demo-data";

export default function PlayersPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Players</h1>
          <p className="text-sm text-zinc-500">
            {DEMO_PLAYERS.length} players · {DEMO_META.is_demo ? "Demo Data" : "Live"}
          </p>
        </div>
        <p className="text-xs text-zinc-600">
          Last Updated: {DEMO_META.last_updated}
        </p>
      </div>

      <div className="mb-4 overflow-x-auto">
        <div className="flex gap-2 text-sm">
          <span className="rounded-full bg-zinc-800 px-3 py-1">All</span>
          <span className="rounded-full px-3 py-1 text-zinc-500">Active</span>
          <span className="rounded-full px-3 py-1 text-zinc-500">HOF</span>
          <span className="rounded-full px-3 py-1 text-zinc-500">G</span>
          <span className="rounded-full px-3 py-1 text-zinc-500">F</span>
          <span className="rounded-full px-3 py-1 text-zinc-500">C</span>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {DEMO_PLAYERS.map((p) => (
          <Link
            key={p.id}
            href={`/players/${p.id}`}
            className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 transition hover:border-zinc-600"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-medium">{p.full_name}</p>
                <p className="text-sm text-zinc-500">
                  {p.position}
                  {p.jersey_number != null ? ` · #${p.jersey_number}` : ""}
                </p>
              </div>
              <div className="flex flex-col items-end gap-1">
                {p.is_hall_of_fame && (
                  <span className="rounded bg-yellow-500/20 px-1.5 py-0.5 text-[10px] text-yellow-400">
                    HOF
                  </span>
                )}
                <span
                  className={`text-[10px] ${
                    p.is_active ? "text-green-400" : "text-zinc-500"
                  }`}
                >
                  {p.is_active ? "Active" : "Retired"}
                </span>
              </div>
            </div>
            {p.bio && (
              <p className="mt-2 line-clamp-2 text-xs text-zinc-600">{p.bio}</p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
