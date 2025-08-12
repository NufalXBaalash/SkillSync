import { createClient } from '@supabase/supabase-js'

// For client-side, we need to use NEXT_PUBLIC_ prefixed environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Check if environment variables are properly loaded
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase environment variables:")
  console.error("NEXT_PUBLIC_SUPABASE_URL:", supabaseUrl ? "✓ Set" : "✗ Missing")
  console.error("NEXT_PUBLIC_SUPABASE_ANON_KEY:", supabaseAnonKey ? "✓ Set" : "✗ Missing")
  
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Missing Supabase environment variables. Please check your .env.local file contains:\n" +
      "NEXT_PUBLIC_SUPABASE_URL=your_supabase_url\n" +
      "NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key"
    )
  }
}

console.log("Supabase config loaded:", { 
  url: supabaseUrl, 
  hasKey: !!supabaseAnonKey,
  keyLength: supabaseAnonKey?.length || 0
})

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Client-side Supabase client
export const createClientComponentClient = () => {
  return createClient(supabaseUrl, supabaseAnonKey)
}

// Server-side Supabase client
export const createServerComponentClient = () => {
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
    },
  })
}
