import { DEMO_META } from "@/lib/demo-data";

export default function StatsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">NBA STATS</h1>
          <p className="text-sm text-zinc-500">Leaderboards · {DEMO_META.is_demo ? "Demo Data" : "Live"}</p>
        </div>
        <p className="text-xs text-zinc-600">Last Updated: {DEMO_META.last_updated}</p>
      </div>

      <div className="mb-6 flex flex-wrap gap-2 text-sm">
        {["Season", "Player", "Team", "Position", "Last 5", "Last 10", "Regular Season", "Playoffs"].map(
          (f) => (
            <button
              key={f}
              className="rounded-full border border-zinc-700 px-3 py-1 text-zinc-400 hover:border-zinc-500 hover:text-white"
            >
              {f}
            </button>
          )
        )}
      </div>

      <div className="mb-4 flex flex-wrap gap-2 text-sm">
        {["Points", "Rebounds", "Assists", "Steals", "Blocks", "FG%", "3P%", "FT%"].map(
          (cat) => (
            <button
              key={cat}
              className="rounded-lg bg-zinc-800 px-3 py-1.5 hover:bg-zinc-700"
            >
              {cat}
            </button>
          )
        )}
      </div>

      <div className="rounded-xl border border-zinc-800 p-6 text-center">
        <p className="text-zinc-400">
          Leaderboard data requires connected Supabase + Data Sync from allowed APIs.
        </p>
        <p className="mt-2 text-sm text-zinc-600">Data unavailable in pure demo mode.</p>
        <p className="mt-4 text-xs text-zinc-600">
          Filters and categories are ready. Wire to season_stats / player_game_stats tables.
        </p>
      </div>
    </div>
  );
}
