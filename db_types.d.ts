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
      guesses: {
        Row: {
          clip_id: number;
          created_at: string | null;
          id: number;
          rank: Database["public"]["Enums"]["valorant_rank"];
        };
        Insert: {
          clip_id: number;
          created_at?: string | null;
          id?: number;
          rank: Database["public"]["Enums"]["valorant_rank"];
        };
        Update: {
          clip_id?: number;
          created_at?: string | null;
          id?: number;
          rank?: Database["public"]["Enums"]["valorant_rank"];
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
          approved: boolean;
          created_at: string | null;
          id: number;
          rank: Database["public"]["Enums"]["valorant_rank"];
          tracker_match: string;
          youtube_id: string;
        };
        Insert: {
          approved?: boolean;
          created_at?: string | null;
          id?: number;
          rank: Database["public"]["Enums"]["valorant_rank"];
          tracker_match: string;
          youtube_id: string;
        };
        Update: {
          approved?: boolean;
          created_at?: string | null;
          id?: number;
          rank?: Database["public"]["Enums"]["valorant_rank"];
          tracker_match?: string;
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
          youtube_id: string;
          rank: Database["public"]["Enums"]["valorant_rank"];
          tracker_match: string;
          date: string;
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
