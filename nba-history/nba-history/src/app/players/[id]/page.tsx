import Link from "next/link";
import { notFound } from "next/navigation";
import { DEMO_PLAYERS, DEMO_TEAMS, DEMO_META } from "@/lib/demo-data";
import { formatDate, formatHeight, formatWeight } from "@/lib/utils";

type Props = { params: Promise<{ id: string }> };

export default async function PlayerPage({ params }: Props) {
  const { id } = await params;
  const player = DEMO_PLAYERS.find((p) => p.id === id);
  if (!player) notFound();

  const team = player.team_id
    ? DEMO_TEAMS.find((t) => t.id === player.team_id)
    : null;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <Link href="/players" className="mb-4 inline-block text-sm text-zinc-500 hover:text-white">
        ← Players
      </Link>

      <div className="mb-6 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">{player.full_name}</h1>
            <p className="mt-1 text-zinc-400">
              {player.position}
              {player.jersey_number != null ? ` · #${player.jersey_number}` : ""}
              {team ? ` · ${team.city} ${team.name}` : ""}
            </p>
          </div>
          <div className="flex gap-2">
            {player.is_hall_of_fame && (
              <span className="rounded-full bg-yellow-500/20 px-3 py-1 text-xs text-yellow-400">
                Hall of Fame
              </span>
            )}
            <span
              className={`rounded-full px-3 py-1 text-xs ${
                player.is_active
                  ? "bg-green-500/20 text-green-400"
                  : "bg-zinc-700 text-zinc-300"
              }`}
            >
              {player.is_active ? "Active" : "Retired"}
            </span>
          </div>
        </div>

        {player.bio && (
          <p className="mt-4 text-sm text-zinc-400">{player.bio}</p>
        )}

        <p className="mt-4 text-xs text-zinc-600">
          {DEMO_META.is_demo ? "Demo Data" : "Live"} · Last Updated:{" "}
          {DEMO_META.last_updated}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-zinc-800 p-4">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500">
            Bio
          </h2>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-zinc-500">Born</dt>
              <dd>{formatDate(player.birth_date)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-zinc-500">Birthplace</dt>
              <dd>{player.birth_place ?? "Data unavailable"}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-zinc-500">Height</dt>
              <dd>{formatHeight(player.height_cm)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-zinc-500">Weight</dt>
              <dd>{formatWeight(player.weight_kg)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-zinc-500">College</dt>
              <dd>{player.college ?? "Data unavailable"}</dd>
            </div>
          </dl>
        </div>

        <div className="rounded-xl border border-zinc-800 p-4">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500">
            Draft
          </h2>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-zinc-500">Year</dt>
              <dd>{player.draft_year ?? "Data unavailable"}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-zinc-500">Round</dt>
              <dd>{player.draft_round ?? "Data unavailable"}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-zinc-500">Pick</dt>
              <dd>{player.draft_pick ?? "Data unavailable"}</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-zinc-800 p-4">
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-zinc-500">
          Stats / Game Logs
        </h2>
        <p className="text-sm text-zinc-500">
          Season averages, Last 5, Last 10 and full game logs require connected
          data source. Currently showing Demo Data only.
        </p>
        <p className="mt-2 text-xs text-zinc-600">Data unavailable for detailed logs in demo mode.</p>
      </div>
    </div>
  );
}
