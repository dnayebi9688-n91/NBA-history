import Link from "next/link";
import { notFound } from "next/navigation";
import { DEMO_TEAMS, DEMO_PLAYERS, DEMO_ARENAS, DEMO_META } from "@/lib/demo-data";

type Props = { params: Promise<{ id: string }> };

export default async function TeamPage({ params }: Props) {
  const { id } = await params;
  const team = DEMO_TEAMS.find((t) => t.id === id);
  if (!team) notFound();

  const players = DEMO_PLAYERS.filter((p) => p.team_id === team.id);
  const arena = team.arena_id
    ? DEMO_ARENAS.find((a) => a.id === team.arena_id)
    : null;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <Link href="/teams" className="mb-4 inline-block text-sm text-zinc-500 hover:text-white">
        ← Teams
      </Link>

      <div className="mb-6 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
        <div className="flex items-center gap-4">
          <div
            className="h-16 w-16 rounded-full"
            style={{ backgroundColor: team.primary_color }}
          />
          <div>
            <h1 className="text-3xl font-bold">
              {team.city} {team.name}
            </h1>
            <p className="text-zinc-400">
              {team.conference} Conference · {team.division} Division
            </p>
          </div>
        </div>
        <p className="mt-4 text-sm text-zinc-500">
          Founded {team.founded_year} · {team.championships} Championships
        </p>
        <p className="mt-2 text-xs text-zinc-600">
          {DEMO_META.is_demo ? "Demo Data" : "Live"} · Last Updated: {DEMO_META.last_updated}
        </p>
      </div>

      {arena && (
        <div className="mb-6 rounded-xl border border-zinc-800 p-4">
          <h2 className="mb-2 text-sm font-semibold uppercase text-zinc-500">Arena</h2>
          <Link href={`/arenas/${arena.id}`} className="font-medium hover:text-orange-400">
            {arena.name}
          </Link>
          <p className="text-sm text-zinc-500">
            {arena.city}, {arena.state} · Capacity: {arena.capacity ?? "Data unavailable"}
          </p>
        </div>
      )}

      <div className="rounded-xl border border-zinc-800 p-4">
        <h2 className="mb-3 text-sm font-semibold uppercase text-zinc-500">
          Roster (Demo)
        </h2>
        {players.length === 0 ? (
          <p className="text-sm text-zinc-500">No players linked in demo data.</p>
        ) : (
          <ul className="space-y-2">
            {players.map((p) => (
              <li key={p.id}>
                <Link
                  href={`/players/${p.id}`}
                  className="flex justify-between rounded-lg px-2 py-1.5 hover:bg-zinc-800"
                >
                  <span>{p.full_name}</span>
                  <span className="text-sm text-zinc-500">{p.position}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
