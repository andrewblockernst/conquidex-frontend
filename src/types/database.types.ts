export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      attendance: {
        Row: {
          event_id: number
          notes: string | null
          person_id: number
          taken_by: number | null
        }
        Insert: {
          event_id: number
          notes?: string | null
          person_id: number
          taken_by?: number | null
        }
        Update: {
          event_id?: number
          notes?: string | null
          person_id?: number
          taken_by?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "attendance_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attendance_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "guests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attendance_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "member_club_role_unit"
            referencedColumns: ["person_id"]
          },
          {
            foreignKeyName: "attendance_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attendance_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "person_with_role"
            referencedColumns: ["person_id"]
          },
          {
            foreignKeyName: "attendance_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "persons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attendance_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "user_club_and_role"
            referencedColumns: ["person_id"]
          },
          {
            foreignKeyName: "attendance_taken_by_fkey"
            columns: ["taken_by"]
            isOneToOne: false
            referencedRelation: "guests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attendance_taken_by_fkey"
            columns: ["taken_by"]
            isOneToOne: false
            referencedRelation: "member_club_role_unit"
            referencedColumns: ["person_id"]
          },
          {
            foreignKeyName: "attendance_taken_by_fkey"
            columns: ["taken_by"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attendance_taken_by_fkey"
            columns: ["taken_by"]
            isOneToOne: false
            referencedRelation: "person_with_role"
            referencedColumns: ["person_id"]
          },
          {
            foreignKeyName: "attendance_taken_by_fkey"
            columns: ["taken_by"]
            isOneToOne: false
            referencedRelation: "persons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attendance_taken_by_fkey"
            columns: ["taken_by"]
            isOneToOne: false
            referencedRelation: "user_club_and_role"
            referencedColumns: ["person_id"]
          },
        ]
      }
      class_items: {
        Row: {
          class_id: number
          description: string | null
          id: number
          name: string
        }
        Insert: {
          class_id: number
          description?: string | null
          id: number
          name: string
        }
        Update: {
          class_id?: number
          description?: string | null
          id?: number
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "class_items_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
        ]
      }
      classes: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      club_socials: {
        Row: {
          club_id: number
          social_id: number
          url: string
        }
        Insert: {
          club_id: number
          social_id: number
          url: string
        }
        Update: {
          club_id?: number
          social_id?: number
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "club_socials_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "club_socials_social_id_fkey"
            columns: ["social_id"]
            isOneToOne: false
            referencedRelation: "socials"
            referencedColumns: ["id"]
          },
        ]
      }
      clubs: {
        Row: {
          city: string | null
          country: string | null
          description: string | null
          founding_date: string | null
          id: number
          name: string
          phone_number: string | null
          province: string | null
          street: string | null
          street_number: number | null
        }
        Insert: {
          city?: string | null
          country?: string | null
          description?: string | null
          founding_date?: string | null
          id?: number
          name: string
          phone_number?: string | null
          province?: string | null
          street?: string | null
          street_number?: number | null
        }
        Update: {
          city?: string | null
          country?: string | null
          description?: string | null
          founding_date?: string | null
          id?: number
          name?: string
          phone_number?: string | null
          province?: string | null
          street?: string | null
          street_number?: number | null
        }
        Relationships: []
      }
      events: {
        Row: {
          city: string | null
          club_id: number
          country: string | null
          description: string | null
          end_date: string
          id: number
          name: string
          start_date: string
          state: string | null
          street: string | null
          street_number: number | null
        }
        Insert: {
          city?: string | null
          club_id: number
          country?: string | null
          description?: string | null
          end_date: string
          id?: number
          name: string
          start_date: string
          state?: string | null
          street?: string | null
          street_number?: number | null
        }
        Update: {
          city?: string | null
          club_id?: number
          country?: string | null
          description?: string | null
          end_date?: string
          id?: number
          name?: string
          start_date?: string
          state?: string | null
          street?: string | null
          street_number?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "event_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
        ]
      }
      honor_category: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
      honors: {
        Row: {
          honor_category_id: string
          id: number
          level: string
          name: string
        }
        Insert: {
          honor_category_id: string
          id?: number
          level: string
          name: string
        }
        Update: {
          honor_category_id?: string
          id?: number
          level?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "honor_honor_category_id_fkey"
            columns: ["honor_category_id"]
            isOneToOne: false
            referencedRelation: "honor_category"
            referencedColumns: ["id"]
          },
        ]
      }
      person_class_items: {
        Row: {
          class_id: number
          item_id: number
          person_id: number
        }
        Insert: {
          class_id: number
          item_id: number
          person_id: number
        }
        Update: {
          class_id?: number
          item_id?: number
          person_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "person_class_items_class_id_item_id_fkey"
            columns: ["class_id", "item_id"]
            isOneToOne: false
            referencedRelation: "class_items"
            referencedColumns: ["class_id", "id"]
          },
          {
            foreignKeyName: "person_class_items_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "guests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "person_class_items_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "member_club_role_unit"
            referencedColumns: ["person_id"]
          },
          {
            foreignKeyName: "person_class_items_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "person_class_items_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "person_with_role"
            referencedColumns: ["person_id"]
          },
          {
            foreignKeyName: "person_class_items_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "persons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "person_class_items_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "user_club_and_role"
            referencedColumns: ["person_id"]
          },
        ]
      }
      person_classes: {
        Row: {
          class_id: number
          person_id: number
        }
        Insert: {
          class_id: number
          person_id: number
        }
        Update: {
          class_id?: number
          person_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "person_classes_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "person_classes_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "guests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "person_classes_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "member_club_role_unit"
            referencedColumns: ["person_id"]
          },
          {
            foreignKeyName: "person_classes_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "person_classes_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "person_with_role"
            referencedColumns: ["person_id"]
          },
          {
            foreignKeyName: "person_classes_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "persons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "person_classes_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "user_club_and_role"
            referencedColumns: ["person_id"]
          },
        ]
      }
      person_honors: {
        Row: {
          honor_category_id: string
          honor_id: number
          person_id: number
        }
        Insert: {
          honor_category_id: string
          honor_id: number
          person_id: number
        }
        Update: {
          honor_category_id?: string
          honor_id?: number
          person_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "person_honor_honor_category_id_honor_id_fkey"
            columns: ["honor_category_id", "honor_id"]
            isOneToOne: false
            referencedRelation: "honors"
            referencedColumns: ["honor_category_id", "id"]
          },
          {
            foreignKeyName: "person_honor_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "guests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "person_honor_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "member_club_role_unit"
            referencedColumns: ["person_id"]
          },
          {
            foreignKeyName: "person_honor_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "person_honor_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "person_with_role"
            referencedColumns: ["person_id"]
          },
          {
            foreignKeyName: "person_honor_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "persons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "person_honor_person_id_fkey"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "user_club_and_role"
            referencedColumns: ["person_id"]
          },
        ]
      }
      persons: {
        Row: {
          auth_user_uuid: string | null
          club_id: number
          email: string
          id: number
          last_enrollment: string | null
          name: string | null
          nickname: string | null
          role_id: number
          surname: string | null
        }
        Insert: {
          auth_user_uuid?: string | null
          club_id: number
          email: string
          id?: number
          last_enrollment?: string | null
          name?: string | null
          nickname?: string | null
          role_id: number
          surname?: string | null
        }
        Update: {
          auth_user_uuid?: string | null
          club_id?: number
          email?: string
          id?: number
          last_enrollment?: string | null
          name?: string | null
          nickname?: string | null
          role_id?: number
          surname?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "persons_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "persons_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
      persons_units: {
        Row: {
          club_id: number
          person_id: number
          unit_id: number
        }
        Insert: {
          club_id: number
          person_id: number
          unit_id: number
        }
        Update: {
          club_id?: number
          person_id?: number
          unit_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "fk_persons_units_person"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "guests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_persons_units_person"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "member_club_role_unit"
            referencedColumns: ["person_id"]
          },
          {
            foreignKeyName: "fk_persons_units_person"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_persons_units_person"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "person_with_role"
            referencedColumns: ["person_id"]
          },
          {
            foreignKeyName: "fk_persons_units_person"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "persons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_persons_units_person"
            columns: ["person_id"]
            isOneToOne: false
            referencedRelation: "user_club_and_role"
            referencedColumns: ["person_id"]
          },
          {
            foreignKeyName: "fk_persons_units_unit"
            columns: ["unit_id", "club_id"]
            isOneToOne: false
            referencedRelation: "units"
            referencedColumns: ["id", "club_id"]
          },
        ]
      }
      roles: {
        Row: {
          hierarchy: number
          id: number
          name: string
        }
        Insert: {
          hierarchy: number
          id?: number
          name: string
        }
        Update: {
          hierarchy?: number
          id?: number
          name?: string
        }
        Relationships: []
      }
      socials: {
        Row: {
          id: number
          name: string
          svg_url: string | null
        }
        Insert: {
          id?: number
          name: string
          svg_url?: string | null
        }
        Update: {
          id?: number
          name?: string
          svg_url?: string | null
        }
        Relationships: []
      }
      units: {
        Row: {
          club_id: number
          id: number
          name: string
        }
        Insert: {
          club_id: number
          id: number
          name: string
        }
        Update: {
          club_id?: number
          id?: number
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_units_club"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      guests: {
        Row: {
          auth_user_uuid: string | null
          club_id: number | null
          email: string | null
          id: number | null
          last_enrollment: string | null
          name: string | null
          nickname: string | null
          role_id: number | null
          surname: string | null
        }
        Insert: {
          auth_user_uuid?: string | null
          club_id?: number | null
          email?: string | null
          id?: number | null
          last_enrollment?: string | null
          name?: string | null
          nickname?: string | null
          role_id?: number | null
          surname?: string | null
        }
        Update: {
          auth_user_uuid?: string | null
          club_id?: number | null
          email?: string | null
          id?: number | null
          last_enrollment?: string | null
          name?: string | null
          nickname?: string | null
          role_id?: number | null
          surname?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "persons_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "persons_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
      member_club_role_unit: {
        Row: {
          club_id: number | null
          hierarchy: number | null
          person_id: number | null
          role_name: string | null
          unit_id: number | null
          user_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "persons_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
        ]
      }
      members: {
        Row: {
          auth_user_uuid: string | null
          club_id: number | null
          club_name: string | null
          email: string | null
          id: number | null
          last_enrollment: string | null
          name: string | null
          nickname: string | null
          role_id: number | null
          role_name: string | null
          surname: string | null
        }
        Relationships: [
          {
            foreignKeyName: "persons_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "persons_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
      person_with_role: {
        Row: {
          hierarchy: number | null
          person_id: number | null
          role_name: string | null
          user_id: string | null
        }
        Relationships: []
      }
      user_available_units: {
        Row: {
          auth_user_uuid: string | null
          unit_id: number | null
        }
        Relationships: []
      }
      user_club_and_role: {
        Row: {
          club_id: number | null
          hierarchy: number | null
          person_id: number | null
          role_name: string | null
          user_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "persons_club_id_fkey"
            columns: ["club_id"]
            isOneToOne: false
            referencedRelation: "clubs"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      get_current_user: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_event_club_by_id: {
        Args: {
          event_id_param: number
        }
        Returns: number
      }
      get_person_club_by_id: {
        Args: {
          person_id_param: number
        }
        Returns: number
      }
      get_person_hierarchy_by_id: {
        Args: {
          person_id_param: number
        }
        Returns: number
      }
      get_persons_by_class: {
        Args: {
          club_id: number
        }
        Returns: {
          class_id: number
          class_name: string
          persons: Json
        }[]
      }
      get_persons_by_unit: {
        Args: {
          input_club_id: number
        }
        Returns: {
          unit_id: number
          unit_name: string
          persons: Json
        }[]
      }
      is_of_same_club:
        | {
            Args: {
              target_club_id: number
            }
            Returns: boolean
          }
        | {
            Args: {
              target_club_id: number
              uid: string
            }
            Returns: boolean
          }
      sync_person_to_user: {
        Args: {
          user_id: string
          user_email: string
        }
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
