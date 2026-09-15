import Link from "next/link";
import { DEMO_TEAMS, DEMO_META } from "@/lib/demo-data";

export default function TeamsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold">Teams</h1>
          <p className="text-sm text-zinc-500">
            {DEMO_TEAMS.length} teams · {DEMO_META.is_demo ? "Demo Data" : "Live"}
          </p>
        </div>
        <p className="text-xs text-zinc-600">Last Updated: {DEMO_META.last_updated}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {DEMO_TEAMS.map((t) => (
          <Link
            key={t.id}
            href={`/teams/${t.id}`}
            className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 transition hover:border-zinc-600"
          >
            <div className="mb-3 flex items-center gap-3">
              <div
                className="h-12 w-12 rounded-full"
                style={{ backgroundColor: t.primary_color }}
              />
              <div>
                <p className="font-semibold">
                  {t.city} {t.name}
                </p>
                <p className="text-sm text-zinc-500">{t.abbreviation}</p>
              </div>
            </div>
            <div className="flex justify-between text-sm text-zinc-400">
              <span>
                {t.conference} / {t.division}
              </span>
              <span>{t.championships} titles</span>
            </div>
            <p className="mt-2 text-xs text-zinc-600">Founded {t.founded_year}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
