import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://fkctegvunlfbfihtlbeb.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZrY3RlZ3Z1bmxmYmZpaHRsYmViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI5MDExNjAsImV4cCI6MjAyODQ3NzE2MH0.ZSzUqOZkep_9kEnZHby4-uxsHnhzOqFC7mqzmMb8Sd8'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase