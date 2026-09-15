import Link from "next/link";
import { DEMO_PLAYERS, DEMO_TEAMS, DEMO_META } from "@/lib/demo-data";

export default function HomePage() {
  const featured = DEMO_PLAYERS.slice(0, 6);
  const teams = DEMO_TEAMS.slice(0, 6);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <section className="mb-12 rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 p-8 md:p-12">
        <p className="mb-2 text-sm font-medium uppercase tracking-wider text-orange-400">
          NBA History Archive
        </p>
        <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-5xl">
          Legends. Teams. Stats. Records.
        </h1>
        <p className="mb-6 max-w-2xl text-zinc-400">
          Explore the complete history of the NBA — players, teams, arenas,
          championships, and statistical leaders. Demo data is clearly labeled.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/players"
            className="rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-semibold text-black hover:bg-orange-400"
          >
            Browse Players
          </Link>
          <Link
            href="/stats"
            className="rounded-lg border border-zinc-700 px-5 py-2.5 text-sm hover:bg-zinc-800"
          >
            Stats Leaderboard
          </Link>
          <Link
            href="/ai"
            className="rounded-lg border border-zinc-700 px-5 py-2.5 text-sm hover:bg-zinc-800"
          >
            Ask AI
          </Link>
        </div>
        <p className="mt-4 text-xs text-zinc-600">
          Data source: {DEMO_META.source} · Last Updated: {DEMO_META.last_updated} ·{" "}
          {DEMO_META.is_demo ? "Demo Data" : "Live"}
        </p>
      </section>

      <section className="mb-12">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Featured Players</h2>
          <Link href="/players" className="text-sm text-orange-400 hover:underline">
            View all →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <Link
              key={p.id}
              href={`/players/${p.id}`}
              className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 transition hover:border-zinc-600"
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="font-medium">{p.full_name}</span>
                {p.is_hall_of_fame && (
                  <span className="rounded bg-yellow-500/20 px-1.5 py-0.5 text-[10px] text-yellow-400">
                    HOF
                  </span>
                )}
              </div>
              <p className="text-sm text-zinc-500">
                {p.position} · {p.is_active ? "Active" : "Retired"}
              </p>
              <p className="mt-2 line-clamp-2 text-xs text-zinc-600">{p.bio}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Teams</h2>
          <Link href="/teams" className="text-sm text-orange-400 hover:underline">
            View all →
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {teams.map((t) => (
            <Link
              key={t.id}
              href={`/teams/${t.id}`}
              className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 transition hover:border-zinc-600"
            >
              <div
                className="h-10 w-10 rounded-full"
                style={{ backgroundColor: t.primary_color }}
              />
              <div>
                <p className="font-medium">
                  {t.city} {t.name}
                </p>
                <p className="text-xs text-zinc-500">
                  {t.conference} · {t.championships} titles
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { href: "/championships", title: "Championships", desc: "Title history" },
          { href: "/records", title: "Records", desc: "All-time marks" },
          { href: "/compare", title: "Compare", desc: "Player vs Player" },
          { href: "/arenas", title: "Arenas", desc: "Home courts" },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5 transition hover:border-orange-500/50"
          >
            <p className="font-medium">{item.title}</p>
            <p className="text-sm text-zinc-500">{item.desc}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}
