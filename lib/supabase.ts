import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';
import { Database } from '../types/supabase';

const supabaseUrl = 'https://agncngnmajzbxmghuqla.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFnbmNuZ25tYWp6YnhtZ2h1cWxhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM1MTY5NTgsImV4cCI6MjA2OTA5Mjk1OH0.3N6VZNPD0itqI80mElmFApm_xHI0sDRPFCQB0V06gug';

export const supabase = createClient<Database>(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      autoRefreshToken: false,
      detectSessionInUrl: false
    }
  }
);
