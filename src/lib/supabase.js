import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Safeguard against missing credentials to prevent app-wide crash
export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : { 
      from: () => ({ 
        insert: () => ({ select: () => ({ single: () => Promise.resolve({ data: null, error: new Error('Supabase credentials missing') }) }) }),
        update: () => ({ eq: () => Promise.resolve({ error: new Error('Supabase credentials missing') }) })
      }),
      storage: { from: () => ({ upload: () => Promise.resolve({ error: new Error('Supabase credentials missing') }) }) }
    };
