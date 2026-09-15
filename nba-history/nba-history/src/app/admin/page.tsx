import Link from "next/link";

export default function AdminPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-2 text-2xl font-bold">Owner / Admin Dashboard</h1>
      <p className="mb-6 text-sm text-zinc-500">
        Requires role OWNER or ADMIN. Protect with Supabase RLS + middleware.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        {[
          { title: "Import Players", desc: "Data Sync · players table" },
          { title: "Import Teams", desc: "Data Sync · teams table" },
          { title: "Import Arenas", desc: "Data Sync · arenas table" },
          { title: "Import Games", desc: "Data Sync · games table" },
          { title: "Import Stats", desc: "Data Sync · stats tables" },
          { title: "Update Existing", desc: "Refresh cache & existing rows" },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5"
          >
            <p className="font-medium">{item.title}</p>
            <p className="mt-1 text-sm text-zinc-500">{item.desc}</p>
            <p className="mt-3 text-xs text-zinc-600">
              Implement server actions with service role + cache. Use allowed APIs only.
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-zinc-800 p-5">
        <h2 className="font-semibold">Security</h2>
        <ul className="mt-2 list-inside list-disc text-sm text-zinc-400">
          <li>Never put passwords or service keys in client code</li>
          <li>RLS policies already defined in schema.sql</li>
          <li>Only OWNER can change roles</li>
          <li>Cache responses to avoid rate limits</li>
        </ul>
      </div>

      <p className="mt-6 text-center text-sm">
        <Link href="/" className="text-orange-400 hover:underline">
          ← Back to site
        </Link>
      </p>
    </div>
  );
}
