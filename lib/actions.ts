'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { TransactionFormData } from './types'

export async function createTransaction(data: TransactionFormData) {
  const supabase = await createClient()
  
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  
  if (userError || !user) {
    return { error: 'Nao autenticado' }
  }

  const { error } = await supabase
    .from('transactions')
    .insert({
      user_id: user.id,
      type: data.type,
      category: data.category,
      description: data.description || null,
      amount: data.amount,
      transaction_type: data.transaction_type,
      date: data.date
    })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard')
  return { success: true }
}

export async function deleteTransaction(id: string) {
  const supabase = await createClient()
  
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  
  if (userError || !user) {
    return { error: 'Nao autenticado' }
  }

  const { error } = await supabase
    .from('transactions')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard')
  return { success: true }
}

export async function getTransactions(month?: number, year?: number) {
  const supabase = await createClient()
  
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  
  if (userError || !user) {
    return { error: 'Nao autenticado', data: [] }
  }

  let query = supabase
    .from('transactions')
    .select('*')
    .eq('user_id', user.id)
    .order('date', { ascending: false })

  if (month !== undefined && year !== undefined) {
    const startDate = new Date(year, month, 1).toISOString().split('T')[0]
    const endDate = new Date(year, month + 1, 0).toISOString().split('T')[0]
    query = query.gte('date', startDate).lte('date', endDate)
  }

  const { data, error } = await query

  if (error) {
    return { error: error.message, data: [] }
  }

  return { data: data || [] }
}
