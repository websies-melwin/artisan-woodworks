export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          role: 'admin'
          created_at: string
        }
        Insert: {
          id: string
          email: string
          role?: 'admin'
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          role?: 'admin'
          created_at?: string
        }
      }
      products: {
        Row: {
          id: string
          name_en: string
          name_bg: string
          description_en: string
          description_bg: string
          category: 'table' | 'chair' | 'cabinet' | 'custom'
          wood_type: 'oak' | 'walnut' | 'pine' | 'mixed'
          status: 'published' | 'hidden' | 'sold'
          featured: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name_en: string
          name_bg: string
          description_en: string
          description_bg: string
          category: 'table' | 'chair' | 'cabinet' | 'custom'
          wood_type: 'oak' | 'walnut' | 'pine' | 'mixed'
          status?: 'published' | 'hidden' | 'sold'
          featured?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name_en?: string
          name_bg?: string
          description_en?: string
          description_bg?: string
          category?: 'table' | 'chair' | 'cabinet' | 'custom'
          wood_type?: 'oak' | 'walnut' | 'pine' | 'mixed'
          status?: 'published' | 'hidden' | 'sold'
          featured?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      product_images: {
        Row: {
          id: string
          product_id: string
          image_url: string
          display_order: number
          created_at: string
        }
        Insert: {
          id?: string
          product_id: string
          image_url: string
          display_order: number
          created_at?: string
        }
        Update: {
          id?: string
          product_id?: string
          image_url?: string
          display_order?: number
          created_at?: string
        }
      }
      product_videos: {
        Row: {
          id: string
          product_id: string
          video_url: string
          created_at: string
        }
        Insert: {
          id?: string
          product_id: string
          video_url: string
          created_at?: string
        }
        Update: {
          id?: string
          product_id?: string
          video_url?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

export type Product = Database['public']['Tables']['products']['Row']
export type ProductInsert = Database['public']['Tables']['products']['Insert']
export type ProductUpdate = Database['public']['Tables']['products']['Update']

export type ProductImage = Database['public']['Tables']['product_images']['Row']
export type ProductImageInsert = Database['public']['Tables']['product_images']['Insert']

export type ProductVideo = Database['public']['Tables']['product_videos']['Row']
export type ProductVideoInsert = Database['public']['Tables']['product_videos']['Insert']

export type Profile = Database['public']['Tables']['profiles']['Row']
