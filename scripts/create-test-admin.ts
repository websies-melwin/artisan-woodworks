/**
 * Script to create a test admin user for development
 * Run with: npx tsx scripts/create-test-admin.ts
 */

import { config } from 'dotenv'
import { resolve } from 'path'
import { createClient } from '@supabase/supabase-js'

// Load environment variables
config({ path: resolve(__dirname, '../.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function createTestAdmin() {
  const email = 'test@artisanwoodworks.com'
  const password = 'TestPass123!'

  console.log('Creating test admin user...')

  // Create auth user
  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true
  })

  if (authError) {
    console.error('Error creating auth user:', authError.message)
    return
  }

  console.log('✓ Auth user created:', authData.user.id)

  // Create profile
  const { error: profileError } = await supabase
    .from('profiles')
    .insert({
      id: authData.user.id,
      email,
      role: 'admin'
    })

  if (profileError) {
    console.error('Error creating profile:', profileError.message)
    return
  }

  console.log('✓ Profile created')
  console.log('\nTest Admin Credentials:')
  console.log('Email:', email)
  console.log('Password:', password)
  console.log('\nUser ID:', authData.user.id)
}

createTestAdmin()
