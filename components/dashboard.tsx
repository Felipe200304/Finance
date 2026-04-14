'use client'

import { useState, useEffect, useCallback } from 'react'
import { Header } from './header'
import { SummaryCards } from './summary-cards'
import { TransactionForm } from './transaction-form'
import { TransactionList } from './transaction-list'
import { MonthSelector } from './month-selector'
import { TabSelector } from './tab-selector'
import { createClient } from '@/lib/supabase/client'
import type { Transaction, TransactionType } from '@/lib/types'

function Stars() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {[...Array(60)].map((_, i) => (
        <div
          key={i}
          className="star absolute h-0.5 w-0.5 rounded-full bg-foreground/20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        />
      ))}
    </div>
  )
}

export function Dashboard() {
  const [activeTab, setActiveTab] = useState<TransactionType>('personal')
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(true)
  
  const now = new Date()
  const [month, setMonth] = useState(now.getMonth())
  const [year, setYear] = useState(now.getFullYear())

  const fetchTransactions = useCallback(async () => {
    setIsLoading(true)
    const supabase = createClient()
    
    const startDate = new Date(year, month, 1).toISOString().split('T')[0]
    const endDate = new Date(year, month + 1, 0).toISOString().split('T')[0]

    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .gte('date', startDate)
      .lte('date', endDate)
      .order('date', { ascending: false })

    if (!error && data) {
      setTransactions(data)
    }
    setIsLoading(false)
  }, [month, year])

  useEffect(() => {
    fetchTransactions()

    const supabase = createClient()
    const channel = supabase
      .channel('transactions-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'transactions' },
        () => {
          fetchTransactions()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [fetchTransactions])

  function handlePreviousMonth() {
    if (month === 0) {
      setMonth(11)
      setYear(year - 1)
    } else {
      setMonth(month - 1)
    }
  }

  function handleNextMonth() {
    if (month === 11) {
      setMonth(0)
      setYear(year + 1)
    } else {
      setMonth(month + 1)
    }
  }

  return (
    <div className="relative min-h-screen bg-background">
      <Stars />
      <Header />
      <main className="relative mx-auto max-w-6xl px-4 py-6">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <TabSelector activeTab={activeTab} onChange={setActiveTab} />
            <MonthSelector
              month={month}
              year={year}
              onPrevious={handlePreviousMonth}
              onNext={handleNextMonth}
            />
          </div>
          <TransactionForm activeTab={activeTab} />
        </div>

        <div className="space-y-6">
          <SummaryCards transactions={transactions} activeTab={activeTab} />
          
          {isLoading ? (
            <div className="flex h-40 items-center justify-center">
              <div className="glow-cyan h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
          ) : (
            <TransactionList transactions={transactions} activeTab={activeTab} />
          )}
        </div>
      </main>
    </div>
  )
}
