import { createClient } from '@supabase/supabase-js'

// Schedule: every 6 days at 00:00 UTC
export const config = { schedule: '0 0 */6 * *' }

export default async function () {
  try {
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_ANON_KEY
    )

    // Query an actual table in your database
    // Replace 'your_table_name' with any table you have
    const { data, error } = await supabase
      .from('avatars')
      .select('*')
      .limit(1)

    if (error) {
      console.error('Health check failed:', error)
    } else { 
    console.log('Supabase health check passed at:', new Date().toISOString()) 
    }
  } catch (err) {
    console.error('Scheduled function error:', err)
  }
}