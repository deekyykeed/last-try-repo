export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          name: string;
          image: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          image?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          image?: string | null;
        };
      };
      groups: {
        Row: {
          id: string;
          name: string;
          image: string;
        };
        Insert: {
          id?: string;
          name: string;
          image: string;
        };
        Update: {
          id?: string;
          name?: string;
          image?: string;
        };
      };
      posts: {
        Row: {
          id: string;
          created_at: string;
          title: string;
          description: string | null;
          image: string | null;
          user_id: string;
          group_id: string;
          users: {
            id: string;
            name: string;
            image: string | null;
          };
          groups: {
            id: string;
            name: string;
            image: string;
          };
        };
        Insert: {
          id?: string;
          created_at?: string;
          title: string;
          description?: string | null;
          image?: string | null;
          upvotes?: number;
          nr_of_comments?: number;
          user_id: string;
          group_id: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          title?: string;
          description?: string | null;
          image?: string | null;
          upvotes?: number;
          nr_of_comments?: number;
          user_id?: string;
          group_id?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
