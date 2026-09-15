import Link from "next/link";
import { DEMO_RECORDS, DEMO_PLAYERS, DEMO_META } from "@/lib/demo-data";

export default function RecordsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold">Records</h1>
          <p className="text-sm text-zinc-500">
            All-time marks · {DEMO_META.is_demo ? "Demo Data" : "Live"}
          </p>
        </div>
        <p className="text-xs text-zinc-600">Last Updated: {DEMO_META.last_updated}</p>
      </div>

      <div className="space-y-3">
        {DEMO_RECORDS.map((r) => {
          const player = r.player_id
            ? DEMO_PLAYERS.find((p) => p.id === r.player_id)
            : null;
          return (
            <div
              key={r.id}
              className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4"
            >
              <p className="text-sm text-zinc-500">{r.category}</p>
              <p className="text-2xl font-bold">{r.value}</p>
              <p className="mt-1 text-sm text-zinc-400">{r.description}</p>
              {player && (
                <Link
                  href={`/players/${player.id}`}
                  className="mt-2 inline-block text-sm text-orange-400 hover:underline"
                >
                  {player.full_name}
                </Link>
              )}
            </div>
          );
        })}
      </div>
      <p className="mt-6 text-center text-sm text-zinc-600">
        More records available after Data Sync from authoritative sources.
      </p>
    </div>
  );
}
