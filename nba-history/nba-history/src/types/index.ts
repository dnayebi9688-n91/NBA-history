// NBA HISTORY - Core Types
// All data from demo or Supabase. Never invent stats.

export type UserRole = 'OWNER' | 'ADMIN' | 'EDITOR' | 'USER';

export interface Profile {
  id: string;
  username: string;
  full_name: string | null;
  avatar_url: string | null;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface Team {
  id: string;
  name: string;
  abbreviation: string;
  city: string;
  conference: 'East' | 'West';
  division: string;
  founded_year: number;
  arena_id: string | null;
  primary_color: string;
  secondary_color: string;
  logo_url: string | null;
  championships: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Player {
  id: string;
  full_name: string;
  first_name: string;
  last_name: string;
  birth_date: string | null;
  birth_place: string | null;
  height_cm: number | null;
  weight_kg: number | null;
  position: string; // G, F, C, G-F, F-C etc.
  jersey_number: number | null;
  team_id: string | null;
  draft_year: number | null;
  draft_round: number | null;
  draft_pick: number | null;
  college: string | null;
  is_active: boolean;
  is_hall_of_fame: boolean;
  image_url: string | null;
  bio: string | null;
  created_at: string;
  updated_at: string;
}

export interface Arena {
  id: string;
  name: string;
  city: string;
  state: string | null;
  country: string;
  capacity: number | null;
  opened_year: number | null;
  team_id: string | null;
  latitude: number | null;
  longitude: number | null;
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Game {
  id: string;
  season: string; // e.g. "2023-24"
  game_date: string;
  home_team_id: string;
  away_team_id: string;
  home_score: number | null;
  away_score: number | null;
  arena_id: string | null;
  is_playoff: boolean;
  status: 'scheduled' | 'live' | 'final' | 'postponed';
  attendance: number | null;
  created_at: string;
  updated_at: string;
}

export interface PlayerGameStat {
  id: string;
  game_id: string;
  player_id: string;
  team_id: string;
  minutes: number | null;
  points: number;
  rebounds: number;
  assists: number;
  steals: number;
  blocks: number;
  turnovers: number;
  fg_made: number;
  fg_attempted: number;
  three_made: number;
  three_attempted: number;
  ft_made: number;
  ft_attempted: number;
  plus_minus: number | null;
  is_starter: boolean;
  created_at: string;
  updated_at: string;
}

export interface SeasonStat {
  id: string;
  player_id: string;
  team_id: string | null;
  season: string;
  games_played: number;
  points: number;
  rebounds: number;
  assists: number;
  steals: number;
  blocks: number;
  fg_pct: number | null;
  three_pct: number | null;
  ft_pct: number | null;
  is_playoff: boolean;
  created_at: string;
  updated_at: string;
}

export interface Championship {
  id: string;
  year: number;
  season: string;
  team_id: string;
  opponent_team_id: string | null;
  series_result: string | null; // e.g. "4-2"
  mvp_player_id: string | null;
  created_at: string;
}

export interface Record {
  id: string;
  category: string; // "points_game", "points_season", etc.
  player_id: string | null;
  team_id: string | null;
  value: number;
  season: string | null;
  game_id: string | null;
  description: string;
  is_active: boolean;
  created_at: string;
}

export interface Favorite {
  id: string;
  user_id: string;
  player_id: string | null;
  team_id: string | null;
  created_at: string;
}

export interface DataSourceMeta {
  source: string;
  last_updated: string;
  is_demo: boolean;
}

// Leaderboard filters
export type StatCategory =
  | 'points'
  | 'rebounds'
  | 'assists'
  | 'steals'
  | 'blocks'
  | 'fg_pct'
  | 'three_pct'
  | 'ft_pct';

export type SeasonFilter = 'regular' | 'playoffs' | 'all';
export type RangeFilter = 'season' | 'last5' | 'last10';
