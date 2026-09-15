import Link from "next/link";
import { DEMO_ARENAS, DEMO_TEAMS, DEMO_META } from "@/lib/demo-data";

export default function ArenasPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold">Arenas</h1>
          <p className="text-sm text-zinc-500">
            {DEMO_ARENAS.length} arenas · {DEMO_META.is_demo ? "Demo Data" : "Live"}
          </p>
        </div>
        <p className="text-xs text-zinc-600">Last Updated: {DEMO_META.last_updated}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {DEMO_ARENAS.map((a) => {
          const team = a.team_id
            ? DEMO_TEAMS.find((t) => t.id === a.team_id)
            : null;
          return (
            <Link
              key={a.id}
              href={`/arenas/${a.id}`}
              className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 transition hover:border-zinc-600"
            >
              <p className="font-semibold">{a.name}</p>
              <p className="text-sm text-zinc-500">
                {a.city}, {a.state ?? a.country}
              </p>
              <p className="mt-2 text-xs text-zinc-600">
                Capacity: {a.capacity ?? "Data unavailable"} · Opened{" "}
                {a.opened_year ?? "Data unavailable"}
              </p>
              {team && (
                <p className="mt-1 text-xs text-orange-400/80">
                  Home of {team.city} {team.name}
                </p>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
