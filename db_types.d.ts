export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      daily_rankdles_log: {
        Row: {
          id: number;
          rankdle_id: number;
          shown_date: string;
        };
        Insert: {
          id?: number;
          rankdle_id: number;
          shown_date: string;
        };
        Update: {
          id?: number;
          rankdle_id?: number;
          shown_date?: string;
        };
      };
      guesses: {
        Row: {
          clip_id: number;
          created_at: string | null;
          id: number;
          rank: Database["public"]["Enums"]["valorant_rank"];
          user_id: string | null;
        };
        Insert: {
          clip_id: number;
          created_at?: string | null;
          id?: number;
          rank: Database["public"]["Enums"]["valorant_rank"];
          user_id?: string | null;
        };
        Update: {
          clip_id?: number;
          created_at?: string | null;
          id?: number;
          rank?: Database["public"]["Enums"]["valorant_rank"];
          user_id?: string | null;
        };
      };
      proposed: {
        Row: {
          created_at: string | null;
          id: number;
          tracker_id: string;
          user_id: string;
          val_id: string;
          youtube_id: string;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          tracker_id: string;
          user_id: string;
          val_id: string;
          youtube_id: string;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          tracker_id?: string;
          user_id?: string;
          val_id?: string;
          youtube_id?: string;
        };
      };
      rankdles: {
        Row: {
          created_at: string | null;
          id: number;
          rank: Database["public"]["Enums"]["valorant_rank"];
          tracker_match: string;
          val_id: string | null;
          youtube_id: string;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          rank: Database["public"]["Enums"]["valorant_rank"];
          tracker_match: string;
          val_id?: string | null;
          youtube_id: string;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          rank?: Database["public"]["Enums"]["valorant_rank"];
          tracker_match?: string;
          val_id?: string | null;
          youtube_id?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      delete_user: {
        Args: Record<PropertyKey, never>;
        Returns: undefined;
      };
      get_daily_rankdles: {
        Args: Record<PropertyKey, never>;
        Returns: {
          id: number;
          created_at: string;
          tracker_match: string;
          youtube_id: string;
          rank: Database["public"]["Enums"]["valorant_rank"];
          val_id: string;
        }[];
      };
      get_rank_distribution: {
        Args: {
          p_clip_id: number;
        };
        Returns: {
          rank_rankdle: Database["public"]["Enums"]["valorant_rank"];
          percentage: number;
        }[];
      };
    };
    Enums: {
      valorant_rank:
        | "iron"
        | "bronze"
        | "silver"
        | "gold"
        | "platinum"
        | "diamond"
        | "ascendant"
        | "immortal"
        | "radiant";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
