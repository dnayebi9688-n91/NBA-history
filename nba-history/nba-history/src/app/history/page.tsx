import Link from "next/link";
import { DEMO_META } from "@/lib/demo-data";

export default function HistoryPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-2 text-2xl font-bold">NBA History</h1>
      <p className="mb-6 text-sm text-zinc-500">
        Timeline &amp; milestones · {DEMO_META.is_demo ? "Demo Data" : "Live"} · Last Updated:{" "}
        {DEMO_META.last_updated}
      </p>

      <div className="space-y-4">
        <div className="rounded-xl border border-zinc-800 p-5">
          <p className="text-sm text-orange-400">1946</p>
          <p className="font-medium">BAA founded (later NBA)</p>
        </div>
        <div className="rounded-xl border border-zinc-800 p-5">
          <p className="text-sm text-orange-400">1949</p>
          <p className="font-medium">BAA-NBL merger → NBA</p>
        </div>
        <div className="rounded-xl border border-zinc-800 p-5">
          <p className="text-sm text-orange-400">1950s–60s</p>
          <p className="font-medium">Bill Russell era · Celtics dynasty</p>
        </div>
        <div className="rounded-xl border border-zinc-800 p-5">
          <p className="text-sm text-orange-400">1980s</p>
          <p className="font-medium">Magic vs Bird · Lakers-Celtics rivalry</p>
        </div>
        <div className="rounded-xl border border-zinc-800 p-5">
          <p className="text-sm text-orange-400">1990s</p>
          <p className="font-medium">Michael Jordan · Bulls dynasty</p>
        </div>
        <div className="rounded-xl border border-zinc-800 p-5">
          <p className="text-sm text-orange-400">2010s–present</p>
          <p className="font-medium">
            Warriors dynasty · LeBron · 3-point era · Giannis / Jokić
          </p>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/championships"
          className="rounded-lg border border-zinc-700 px-4 py-2 text-sm hover:bg-zinc-800"
        >
          Championships
        </Link>
        <Link
          href="/records"
          className="rounded-lg border border-zinc-700 px-4 py-2 text-sm hover:bg-zinc-800"
        >
          Records
        </Link>
      </div>
    </div>
  );
}
