import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 py-8">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-semibold">NBA HISTORY</p>
            <p className="text-sm text-zinc-500">
              Historical data &amp; stats. Demo data clearly marked.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-zinc-400">
            <Link href="/players" className="hover:text-white">
              Players
            </Link>
            <Link href="/teams" className="hover:text-white">
              Teams
            </Link>
            <Link href="/stats" className="hover:text-white">
              Stats
            </Link>
            <Link href="/records" className="hover:text-white">
              Records
            </Link>
            <Link href="/admin" className="hover:text-white">
              Admin
            </Link>
          </div>
        </div>
        <p className="mt-6 text-xs text-zinc-600">
          Not affiliated with the NBA. Stats from public historical sources or Demo Data.
          Last Updated shown on data pages.
        </p>
      </div>
    </footer>
  );
}
