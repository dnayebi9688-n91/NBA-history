import Link from "next/link";
import { DEMO_CHAMPIONSHIPS, DEMO_TEAMS, DEMO_PLAYERS, DEMO_META } from "@/lib/demo-data";

export default function ChampionshipsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold">Championships</h1>
          <p className="text-sm text-zinc-500">
            {DEMO_CHAMPIONSHIPS.length} titles in demo · {DEMO_META.is_demo ? "Demo Data" : "Live"}
          </p>
        </div>
        <p className="text-xs text-zinc-600">Last Updated: {DEMO_META.last_updated}</p>
      </div>

      <div className="space-y-3">
        {DEMO_CHAMPIONSHIPS.map((c) => {
          const team = DEMO_TEAMS.find((t) => t.id === c.team_id);
          const mvp = c.mvp_player_id
            ? DEMO_PLAYERS.find((p) => p.id === c.mvp_player_id)
            : null;
          return (
            <div
              key={c.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-zinc-800 bg-zinc-900/40 p-4"
            >
              <div>
                <p className="font-semibold">{c.year}</p>
                <p className="text-sm text-zinc-400">
                  {team ? `${team.city} ${team.name}` : "Data unavailable"}
                  {c.series_result ? ` · ${c.series_result}` : ""}
                </p>
              </div>
              {mvp && (
                <Link
                  href={`/players/${mvp.id}`}
                  className="text-sm text-orange-400 hover:underline"
                >
                  MVP: {mvp.full_name}
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
