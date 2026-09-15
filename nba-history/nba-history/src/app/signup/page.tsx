"use client";

import Link from "next/link";
import { useState } from "react";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(
      "Connect Supabase Auth to enable signup. Profile is auto-created with role=USER. See README to promote dani_n91 to OWNER."
    );
  }

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col justify-center px-4 py-12">
      <h1 className="mb-6 text-center text-2xl font-bold">Sign up</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm text-zinc-500">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2"
            required
          />
        </div>
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
            minLength={8}
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-lg bg-orange-500 py-2.5 text-sm font-semibold text-black hover:bg-orange-400"
        >
          Create account
        </button>
      </form>
      {msg && <p className="mt-4 text-center text-sm text-zinc-400">{msg}</p>}
      <p className="mt-6 text-center text-sm text-zinc-500">
        Already have an account?{" "}
        <Link href="/login" className="text-orange-400 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}
