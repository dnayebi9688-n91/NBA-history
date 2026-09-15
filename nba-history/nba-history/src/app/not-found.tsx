import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-md flex-col items-center justify-center px-4 text-center">
      <p className="text-6xl font-bold text-zinc-700">404</p>
      <h1 className="mt-4 text-xl font-semibold">Page not found</h1>
      <p className="mt-2 text-sm text-zinc-500">
        The page you requested does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-semibold text-black hover:bg-orange-400"
      >
        Go Home
      </Link>
    </div>
  );
}
