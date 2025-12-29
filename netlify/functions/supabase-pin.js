import { createClient } from '@supabase/supabase-js'

// Schedule: run hourly
export const config = { schedule: '@hourly' }

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
      return {
        statusCode: 502,
        body: JSON.stringify({ ok: false, error: error.message || error })
      }
    }

    console.log('Supabase health check passed at:', new Date().toISOString())
    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true, checked_at: new Date().toISOString(), data })
    }
  } catch (err) {
    console.error('Scheduled function error:', err)
    return {
      statusCode: 500,
      body: JSON.stringify({ ok: false, error: err.message || String(err) })
    }
  }
}