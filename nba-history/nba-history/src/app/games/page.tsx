import { DEMO_META } from "@/lib/demo-data";

export default function GamesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold">Games</h1>
          <p className="text-sm text-zinc-500">
            Schedule &amp; results · {DEMO_META.is_demo ? "Demo Data" : "Live"}
          </p>
        </div>
        <p className="text-xs text-zinc-600">Last Updated: {DEMO_META.last_updated}</p>
      </div>

      <div className="rounded-xl border border-zinc-800 p-8 text-center">
        <p className="text-zinc-400">
          Game list, filters by season / playoffs, and game detail pages are wired to the{" "}
          <code className="text-orange-400">games</code> table.
        </p>
        <p className="mt-3 text-sm text-zinc-600">
          No sample games in current Demo Data set. Use Data Sync (Import Games) after
          connecting Supabase and an allowed API.
        </p>
        <p className="mt-2 text-xs text-zinc-600">Data unavailable</p>
      </div>
    </div>
  );
}
