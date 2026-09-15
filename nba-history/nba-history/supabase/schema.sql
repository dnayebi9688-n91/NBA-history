-- NBA HISTORY - Complete Supabase Schema
-- Run this in Supabase SQL Editor
-- Includes RLS, Indexes, and seed-ready structure

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =====================================================
-- PROFILES (extends auth.users)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'USER' CHECK (role IN ('OWNER', 'ADMIN', 'EDITOR', 'USER')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================================================
-- TEAMS
-- =====================================================
CREATE TABLE IF NOT EXISTS public.teams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  abbreviation TEXT NOT NULL UNIQUE,
  city TEXT NOT NULL,
  conference TEXT NOT NULL CHECK (conference IN ('East', 'West')),
  division TEXT NOT NULL,
  founded_year INTEGER,
  arena_id UUID,
  primary_color TEXT DEFAULT '#000000',
  secondary_color TEXT DEFAULT '#FFFFFF',
  logo_url TEXT,
  championships INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================================================
-- ARENAS
-- =====================================================
CREATE TABLE IF NOT EXISTS public.arenas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT,
  country TEXT DEFAULT 'USA',
  capacity INTEGER,
  opened_year INTEGER,
  team_id UUID REFERENCES public.teams(id) ON DELETE SET NULL,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  image_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add FK after arenas exists
ALTER TABLE public.teams
  ADD CONSTRAINT fk_teams_arena
  FOREIGN KEY (arena_id) REFERENCES public.arenas(id) ON DELETE SET NULL;

-- =====================================================
-- PLAYERS
-- =====================================================
CREATE TABLE IF NOT EXISTS public.players (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  birth_date DATE,
  birth_place TEXT,
  height_cm INTEGER,
  weight_kg INTEGER,
  position TEXT NOT NULL,
  jersey_number INTEGER,
  team_id UUID REFERENCES public.teams(id) ON DELETE SET NULL,
  draft_year INTEGER,
  draft_round INTEGER,
  draft_pick INTEGER,
  college TEXT,
  is_active BOOLEAN DEFAULT false,
  is_hall_of_fame BOOLEAN DEFAULT false,
  image_url TEXT,
  bio TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================================================
-- GAMES
-- =====================================================
CREATE TABLE IF NOT EXISTS public.games (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  season TEXT NOT NULL,
  game_date DATE NOT NULL,
  home_team_id UUID NOT NULL REFERENCES public.teams(id),
  away_team_id UUID NOT NULL REFERENCES public.teams(id),
  home_score INTEGER,
  away_score INTEGER,
  arena_id UUID REFERENCES public.arenas(id) ON DELETE SET NULL,
  is_playoff BOOLEAN DEFAULT false,
  status TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'live', 'final', 'postponed')),
  attendance INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================================================
-- PLAYER GAME STATS
-- =====================================================
CREATE TABLE IF NOT EXISTS public.player_game_stats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  game_id UUID NOT NULL REFERENCES public.games(id) ON DELETE CASCADE,
  player_id UUID NOT NULL REFERENCES public.players(id) ON DELETE CASCADE,
  team_id UUID NOT NULL REFERENCES public.teams(id),
  minutes NUMERIC(5,1),
  points INTEGER NOT NULL DEFAULT 0,
  rebounds INTEGER NOT NULL DEFAULT 0,
  assists INTEGER NOT NULL DEFAULT 0,
  steals INTEGER NOT NULL DEFAULT 0,
  blocks INTEGER NOT NULL DEFAULT 0,
  turnovers INTEGER NOT NULL DEFAULT 0,
  fg_made INTEGER NOT NULL DEFAULT 0,
  fg_attempted INTEGER NOT NULL DEFAULT 0,
  three_made INTEGER NOT NULL DEFAULT 0,
  three_attempted INTEGER NOT NULL DEFAULT 0,
  ft_made INTEGER NOT NULL DEFAULT 0,
  ft_attempted INTEGER NOT NULL DEFAULT 0,
  plus_minus INTEGER,
  is_starter BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(game_id, player_id)
);

-- =====================================================
-- SEASON STATS
-- =====================================================
CREATE TABLE IF NOT EXISTS public.season_stats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  player_id UUID NOT NULL REFERENCES public.players(id) ON DELETE CASCADE,
  team_id UUID REFERENCES public.teams(id) ON DELETE SET NULL,
  season TEXT NOT NULL,
  games_played INTEGER NOT NULL DEFAULT 0,
  points NUMERIC(8,1) NOT NULL DEFAULT 0,
  rebounds NUMERIC(8,1) NOT NULL DEFAULT 0,
  assists NUMERIC(8,1) NOT NULL DEFAULT 0,
  steals NUMERIC(8,1) NOT NULL DEFAULT 0,
  blocks NUMERIC(8,1) NOT NULL DEFAULT 0,
  fg_pct NUMERIC(5,3),
  three_pct NUMERIC(5,3),
  ft_pct NUMERIC(5,3),
  is_playoff BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(player_id, season, is_playoff)
);

-- =====================================================
-- CHAMPIONSHIPS
-- =====================================================
CREATE TABLE IF NOT EXISTS public.championships (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  year INTEGER NOT NULL,
  season TEXT NOT NULL,
  team_id UUID NOT NULL REFERENCES public.teams(id),
  opponent_team_id UUID REFERENCES public.teams(id),
  series_result TEXT,
  mvp_player_id UUID REFERENCES public.players(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================================================
-- RECORDS
-- =====================================================
CREATE TABLE IF NOT EXISTS public.records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category TEXT NOT NULL,
  player_id UUID REFERENCES public.players(id) ON DELETE SET NULL,
  team_id UUID REFERENCES public.teams(id) ON DELETE SET NULL,
  value NUMERIC NOT NULL,
  season TEXT,
  game_id UUID REFERENCES public.games(id) ON DELETE SET NULL,
  description TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================================================
-- FAVORITES
-- =====================================================
CREATE TABLE IF NOT EXISTS public.favorites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  player_id UUID REFERENCES public.players(id) ON DELETE CASCADE,
  team_id UUID REFERENCES public.teams(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CHECK (
    (player_id IS NOT NULL AND team_id IS NULL) OR
    (player_id IS NULL AND team_id IS NOT NULL)
  ),
  UNIQUE(user_id, player_id),
  UNIQUE(user_id, team_id)
);

-- =====================================================
-- DATA META (for Last Updated + Cache tracking)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.data_meta (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  entity_type TEXT NOT NULL, -- players, teams, games, stats
  source TEXT NOT NULL,
  last_updated TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  is_demo BOOLEAN DEFAULT false,
  notes TEXT
);

-- =====================================================
-- INDEXES for Performance
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_players_team ON public.players(team_id);
CREATE INDEX IF NOT EXISTS idx_players_name ON public.players(last_name, first_name);
CREATE INDEX IF NOT EXISTS idx_players_active ON public.players(is_active);
CREATE INDEX IF NOT EXISTS idx_games_date ON public.games(game_date DESC);
CREATE INDEX IF NOT EXISTS idx_games_season ON public.games(season);
CREATE INDEX IF NOT EXISTS idx_games_home ON public.games(home_team_id);
CREATE INDEX IF NOT EXISTS idx_games_away ON public.games(away_team_id);
CREATE INDEX IF NOT EXISTS idx_pgs_player ON public.player_game_stats(player_id);
CREATE INDEX IF NOT EXISTS idx_pgs_game ON public.player_game_stats(game_id);
CREATE INDEX IF NOT EXISTS idx_season_stats_player ON public.season_stats(player_id);
CREATE INDEX IF NOT EXISTS idx_season_stats_season ON public.season_stats(season);
CREATE INDEX IF NOT EXISTS idx_favorites_user ON public.favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_username ON public.profiles(username);

-- =====================================================
-- UPDATED_AT TRIGGER
-- =====================================================
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at_profiles
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at_teams
  BEFORE UPDATE ON public.teams
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at_players
  BEFORE UPDATE ON public.players
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at_arenas
  BEFORE UPDATE ON public.arenas
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at_games
  BEFORE UPDATE ON public.games
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at_pgs
  BEFORE UPDATE ON public.player_game_stats
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at_season
  BEFORE UPDATE ON public.season_stats
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- =====================================================
-- AUTO CREATE PROFILE ON SIGNUP
-- =====================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, full_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    'USER'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =====================================================
-- ROW LEVEL SECURITY
-- =====================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.players ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.arenas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.games ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.player_game_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.season_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.championships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.data_meta ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Only OWNER can change roles"
  ON public.profiles FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'OWNER'
    )
  );

-- Public read for most tables
CREATE POLICY "Teams are public" ON public.teams FOR SELECT USING (true);
CREATE POLICY "Players are public" ON public.players FOR SELECT USING (true);
CREATE POLICY "Arenas are public" ON public.arenas FOR SELECT USING (true);
CREATE POLICY "Games are public" ON public.games FOR SELECT USING (true);
CREATE POLICY "Stats are public" ON public.player_game_stats FOR SELECT USING (true);
CREATE POLICY "Season stats are public" ON public.season_stats FOR SELECT USING (true);
CREATE POLICY "Championships are public" ON public.championships FOR SELECT USING (true);
CREATE POLICY "Records are public" ON public.records FOR SELECT USING (true);
CREATE POLICY "Data meta is public" ON public.data_meta FOR SELECT USING (true);

-- Favorites: own only
CREATE POLICY "Users manage own favorites"
  ON public.favorites FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Write policies for ADMIN / OWNER / EDITOR
CREATE POLICY "Admins can insert teams"
  ON public.teams FOR INSERT
  WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('OWNER', 'ADMIN', 'EDITOR'))
  );

CREATE POLICY "Admins can update teams"
  ON public.teams FOR UPDATE
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('OWNER', 'ADMIN', 'EDITOR'))
  );

CREATE POLICY "Admins can insert players"
  ON public.players FOR INSERT
  WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('OWNER', 'ADMIN', 'EDITOR'))
  );

CREATE POLICY "Admins can update players"
  ON public.players FOR UPDATE
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('OWNER', 'ADMIN', 'EDITOR'))
  );

CREATE POLICY "Admins can insert games"
  ON public.games FOR INSERT
  WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('OWNER', 'ADMIN', 'EDITOR'))
  );

CREATE POLICY "Admins can update games"
  ON public.games FOR UPDATE
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('OWNER', 'ADMIN', 'EDITOR'))
  );

CREATE POLICY "Admins can insert stats"
  ON public.player_game_stats FOR INSERT
  WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('OWNER', 'ADMIN', 'EDITOR'))
  );

CREATE POLICY "Admins can update stats"
  ON public.player_game_stats FOR UPDATE
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('OWNER', 'ADMIN', 'EDITOR'))
  );

CREATE POLICY "Admins can insert season stats"
  ON public.season_stats FOR INSERT
  WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('OWNER', 'ADMIN', 'EDITOR'))
  );

CREATE POLICY "Admins can update season stats"
  ON public.season_stats FOR UPDATE
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('OWNER', 'ADMIN', 'EDITOR'))
  );

CREATE POLICY "Admins can manage championships"
  ON public.championships FOR ALL
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('OWNER', 'ADMIN', 'EDITOR'))
  );

CREATE POLICY "Admins can manage records"
  ON public.records FOR ALL
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('OWNER', 'ADMIN', 'EDITOR'))
  );

CREATE POLICY "Admins can manage data_meta"
  ON public.data_meta FOR ALL
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('OWNER', 'ADMIN'))
  );

CREATE POLICY "Admins can manage arenas"
  ON public.arenas FOR ALL
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('OWNER', 'ADMIN', 'EDITOR'))
  );

-- =====================================================
-- HELPER: Promote user to OWNER (run once after creating dani_n91)
-- =====================================================
-- UPDATE public.profiles SET role = 'OWNER' WHERE username = 'dani_n91';
