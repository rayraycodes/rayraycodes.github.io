import { createClient } from '@supabase/supabase-js';

const supabaseUrl = secrets.SUPABASE_URL;
const supabaseAnonKey =secrets.ANNON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
