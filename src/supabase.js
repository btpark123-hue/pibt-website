import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://ckanwbynvyuqxmenxvlr.supabase.co'
const supabaseAnonKey = 'sb_publishable_HVZkkPEB7-5zzLqn93h5jA_PdKWJXWk'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
