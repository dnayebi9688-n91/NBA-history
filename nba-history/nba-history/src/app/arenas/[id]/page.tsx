import Link from "next/link";
import { notFound } from "next/navigation";
import { DEMO_ARENAS, DEMO_TEAMS, DEMO_META } from "@/lib/demo-data";

type Props = { params: Promise<{ id: string }> };

export default async function ArenaPage({ params }: Props) {
  const { id } = await params;
  const arena = DEMO_ARENAS.find((a) => a.id === id);
  if (!arena) notFound();

  const team = arena.team_id
    ? DEMO_TEAMS.find((t) => t.id === arena.team_id)
    : null;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link href="/arenas" className="mb-4 inline-block text-sm text-zinc-500 hover:text-white">
        ← Arenas
      </Link>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
        <h1 className="text-3xl font-bold">{arena.name}</h1>
        <p className="mt-1 text-zinc-400">
          {arena.city}, {arena.state ?? arena.country}
        </p>

        <dl className="mt-6 space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-zinc-500">Capacity</dt>
            <dd>{arena.capacity ?? "Data unavailable"}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-zinc-500">Opened</dt>
            <dd>{arena.opened_year ?? "Data unavailable"}</dd>
          </div>
          {team && (
            <div className="flex justify-between">
              <dt className="text-zinc-500">Home team</dt>
              <dd>
                <Link href={`/teams/${team.id}`} className="text-orange-400 hover:underline">
                  {team.city} {team.name}
                </Link>
              </dd>
            </div>
          )}
        </dl>

        <p className="mt-6 text-xs text-zinc-600">
          {DEMO_META.is_demo ? "Demo Data" : "Live"} · Last Updated: {DEMO_META.last_updated}
        </p>
        <p className="mt-2 text-xs text-zinc-600">
          3D arena view: placeholder. Add Three.js / React Three Fiber for interactive model.
        </p>
      </div>
    </div>
  );
}
