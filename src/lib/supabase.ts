import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type UserProfile = {
  id: string;
  email: string;
  name: string | null;
  phone: string | null;
  date_of_birth: string | null;
  gender: 'male' | 'female' | 'non_binary' | 'prefer_not_to_say' | null;
  city: string | null;
  dietary_pattern: 'omnivore' | 'vegetarian' | 'vegan' | 'pescatarian' | 'other' | null;
  activity_level: 'sedentary' | 'moderate' | 'athlete' | null;
  pregnancy_status: 'not_pregnant' | 'pregnant' | 'postpartum' | null;
  conditions: string[];
  performance_intent: 'longevity' | 'energy' | 'mental_sharpness' | 'athletic_recovery' | 'hormonal_balance' | 'stress_sleep' | null;
  secondary_intent: 'longevity' | 'energy' | 'mental_sharpness' | 'athletic_recovery' | 'hormonal_balance' | 'stress_sleep' | null;
  subscription_tier: 'free' | 'starter' | 'essential' | 'optimise' | 'elite';
  subscription_status: string;
  onboarded_at: string | null;
  notification_preferences: {
    supplement_reminders: boolean;
    streak_milestones: boolean;
    retest_reminders: boolean;
    whatsapp_enabled: boolean;
  };
  created_at: string;
  updated_at: string;
};
