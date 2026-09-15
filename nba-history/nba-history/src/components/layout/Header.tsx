import Link from "next/link";

const nav = [
  { href: "/", label: "Home" },
  { href: "/players", label: "Players" },
  { href: "/teams", label: "Teams" },
  { href: "/games", label: "Games" },
  { href: "/stats", label: "Stats" },
  { href: "/history", label: "History" },
  { href: "/championships", label: "Championships" },
  { href: "/records", label: "Records" },
  { href: "/compare", label: "Compare" },
  { href: "/ai", label: "AI" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold tracking-tight">
          <span className="rounded bg-orange-500 px-1.5 py-0.5 text-xs text-black">NBA</span>
          <span>HISTORY</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-1.5 text-sm text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="rounded-md px-3 py-1.5 text-sm text-zinc-300 hover:text-white"
          >
            Login
          </Link>
          <Link
            href="/profile"
            className="rounded-md bg-zinc-800 px-3 py-1.5 text-sm hover:bg-zinc-700"
          >
            Profile
          </Link>
        </div>
      </div>
    </header>
  );
}
