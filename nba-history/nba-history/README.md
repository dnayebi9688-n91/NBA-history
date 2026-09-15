# NBA HISTORY

Full-stack NBA history archive: players, teams, arenas, games, stats, championships, records, compare, AI, auth & admin.

**Status of this scaffold**
- Professional folder structure
- TypeScript types
- Complete Supabase schema (RLS + indexes + triggers)
- Demo Data for legendary players/teams/arenas (clearly labeled **Demo Data**)
- Pages: Home, Players, Teams, Arenas, Games, Stats, History, Championships, Records, Compare, AI, Profile, Login, Signup, Admin, 404
- Mobile bottom navigation
- Last Updated display on data pages
- No passwords in source code

**Not fully production-ready without your setup**
- Real Data Sync from allowed NBA APIs (needs keys + implementation)
- Full 3D arena (add R3F later)
- Live AI answers (needs API key)
- Auth UI fully wired to Supabase client actions
- Detailed game logs / Last 5 / Last 10 (need imported stats)

---

## 1. Install

```bash
cd nba-history
cp .env.example .env.local
# edit .env.local with your Supabase keys
npm install
```

## 2. Run

```bash
npm run dev
```

Open http://localhost:3000

## 3. Supabase setup

1. Create a project at https://supabase.com
2. Copy Project URL and anon key → `.env.local`
3. (Optional) Service role key for admin/data sync only (server-side)
4. In SQL Editor, run the entire file:

```text
supabase/schema.sql
```

5. Enable Email auth (or preferred providers) in Authentication settings.

## 4. Create OWNER account `dani_n91`

**Never put the password in code or git.**

1. Sign up via the site `/signup` with username `dani_n91` (or create user in Supabase Auth dashboard).
2. After the user exists, run in SQL Editor:

```sql
UPDATE public.profiles
SET role = 'OWNER'
WHERE username = 'dani_n91';
```

3. Confirm:

```sql
SELECT id, username, role FROM public.profiles WHERE username = 'dani_n91';
```

## 5. Environment

See `.env.example`:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (server only, never expose)
- Optional AI / external API keys

## 6. Data rules (important)

- Do **not** invent stats. Use Demo Data or real imported data.
- When data is missing show: **Data unavailable**
- Always show **Last Updated** and whether it is **Demo Data**
- Use Cache for external API calls (Data Sync)

## 7. Project structure

```text
src/
  app/           # routes (App Router)
  components/    # UI, layout, feature components
  lib/           # supabase clients, demo-data, utils
  types/         # TypeScript types
supabase/
  schema.sql     # full schema + RLS
public/
scripts/
```

## 8. Deploy

Recommended: Vercel

1. Push repo to GitHub
2. Import project in Vercel
3. Add the same env vars
4. Deploy

For Supabase: use production project URL/keys.

## 9. Build check

```bash
npm run build
npm run lint
```

Fix any TypeScript / import errors before production.

## 10. Next steps for full production

1. Implement Supabase Auth client helpers (signIn / signUp / signOut)
2. Middleware for protected `/admin` routes (check role)
3. Data Sync scripts (server actions or cron) using allowed APIs only + cache
4. Wire Stats leaderboard to `season_stats` / aggregates
5. Game logs & Last 5 / Last 10 from `player_game_stats`
6. Optional: React Three Fiber arena scene
7. Optional: AI route with streaming + context from DB
8. Image optimization + pagination everywhere
9. Skeleton / Error / Empty states (basic structure ready)

---

Built as a solid foundation for **NBA HISTORY**. Extend with real data and auth as described above.
