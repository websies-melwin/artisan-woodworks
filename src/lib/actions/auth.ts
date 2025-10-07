'use server'

import { createSupabaseServer } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function login(email: string, password: string) {
  const supabase = await createSupabaseServer()
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  // Verify user is admin
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', data.user.id)
    .single()

  if (!profile || profile.role !== 'admin') {
    await supabase.auth.signOut()
    return { error: 'Unauthorized: Admin access required' }
  }

  revalidatePath('/admin/dashboard')
  redirect('/admin/dashboard')
}

export async function logout() {
  const supabase = await createSupabaseServer()
  await supabase.auth.signOut()
  redirect('/admin/login')
}

export async function getSession() {
  const supabase = await createSupabaseServer()
  const { data: { session } } = await supabase.auth.getSession()
  return session
}

export async function getUser() {
  const supabase = await createSupabaseServer()
  const { data: { user } } = await supabase.auth.getUser()
  return user
}
