'use client'

import { Card, CardContent } from '@/components/ui/card'
import { TrendingUp, TrendingDown, Wallet, Building2, Zap } from 'lucide-react'
import type { Transaction } from '@/lib/types'

interface SummaryCardsProps {
  transactions: Transaction[]
  activeTab: 'personal' | 'business'
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

export function SummaryCards({ transactions, activeTab }: SummaryCardsProps) {
  const filtered = transactions.filter(t => t.type === activeTab)
  
  const income = filtered
    .filter(t => t.transaction_type === 'income')
    .reduce((acc, t) => acc + Number(t.amount), 0)
  
  const expense = filtered
    .filter(t => t.transaction_type === 'expense')
    .reduce((acc, t) => acc + Number(t.amount), 0)
  
  const balance = income - expense

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card className="group border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-card/80">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                {activeTab === 'personal' ? 'Saldo Pessoal' : 'Saldo Empresa'}
              </p>
              <p className="mt-1 text-2xl font-bold text-foreground">
                {formatCurrency(balance)}
              </p>
            </div>
            <div className="glow-cyan flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 transition-transform group-hover:scale-110">
              {activeTab === 'personal' ? (
                <Wallet className="h-6 w-6 text-primary" />
              ) : (
                <Building2 className="h-6 w-6 text-primary" />
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="group border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:border-success/50 hover:bg-card/80">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Entradas</p>
              <p className="mt-1 text-2xl font-bold text-success">
                {formatCurrency(income)}
              </p>
            </div>
            <div className="glow-success flex h-12 w-12 items-center justify-center rounded-xl bg-success/20 transition-transform group-hover:scale-110">
              <TrendingUp className="h-6 w-6 text-success" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="group border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:border-destructive/50 hover:bg-card/80">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Saidas</p>
              <p className="mt-1 text-2xl font-bold text-destructive">
                {formatCurrency(expense)}
              </p>
            </div>
            <div className="glow-destructive flex h-12 w-12 items-center justify-center rounded-xl bg-destructive/20 transition-transform group-hover:scale-110">
              <TrendingDown className="h-6 w-6 text-destructive" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="group border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:border-accent/50 hover:bg-card/80">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Transacoes</p>
              <p className="mt-1 text-2xl font-bold text-foreground">
                {filtered.length}
              </p>
            </div>
            <div className="glow-purple flex h-12 w-12 items-center justify-center rounded-xl bg-accent/20 transition-transform group-hover:scale-110">
              <Zap className="h-6 w-6 text-accent" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
