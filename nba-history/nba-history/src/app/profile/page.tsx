import Link from "next/link";

export default function ProfilePage() {
  return (
    <div className="mx-auto max-w-lg px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">Profile</h1>
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
        <p className="text-sm text-zinc-400">
          Sign in to view your profile, favorites, and role.
        </p>
        <div className="mt-4 flex gap-3">
          <Link
            href="/login"
            className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-black hover:bg-orange-400"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="rounded-lg border border-zinc-700 px-4 py-2 text-sm hover:bg-zinc-800"
          >
            Sign up
          </Link>
        </div>
        <p className="mt-6 text-xs text-zinc-600">
          Owner account: create user <strong>dani_n91</strong> via Supabase Auth,
          then run the role update SQL (see README). Password is never stored in
          source code.
        </p>
      </div>
    </div>
  );
}
