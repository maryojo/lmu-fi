import { createClient } from '@supabase/supabase-js'

// Schedule: every 6 days at 00:00 UTC
export const config = { schedule: '0 0 */6 * *' }

export default async function () {
  try {
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_ANON_KEY
    )

    // Health check: simple query to verify Supabase is reachable
    const { data, error } = await supabase.rpc('now')

    if (error) {
      console.error('Health check failed:', error)
    } else {
      console.log('Supabase health check passed at:', new Date().toISOString())
    }
  } catch (err) {
    console.error('Scheduled function error:', err)
  }
}
