"use client";

import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(
      "Connect Supabase Auth to enable login. See README for setup. Never store passwords in code."
    );
  }

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col justify-center px-4 py-12">
      <h1 className="mb-6 text-center text-2xl font-bold">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm text-zinc-500">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-zinc-500">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-lg bg-orange-500 py-2.5 text-sm font-semibold text-black hover:bg-orange-400"
        >
          Sign in
        </button>
      </form>
      {msg && <p className="mt-4 text-center text-sm text-zinc-400">{msg}</p>}
      <p className="mt-6 text-center text-sm text-zinc-500">
        No account?{" "}
        <Link href="/signup" className="text-orange-400 hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
