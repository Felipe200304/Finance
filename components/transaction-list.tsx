'use client'

import { useTransition } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Trash2, ArrowUpRight, ArrowDownRight, Rocket } from 'lucide-react'
import { deleteTransaction } from '@/lib/actions'
import type { Transaction } from '@/lib/types'

interface TransactionListProps {
  transactions: Transaction[]
  activeTab: 'personal' | 'business'
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

function formatDate(dateString: string) {
  return new Date(dateString + 'T00:00:00').toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short'
  })
}

export function TransactionList({ transactions, activeTab }: TransactionListProps) {
  const filtered = transactions.filter(t => t.type === activeTab)
  const [isPending, startTransition] = useTransition()

  function handleDelete(id: string) {
    startTransition(async () => {
      await deleteTransaction(id)
    })
  }

  if (filtered.length === 0) {
    return (
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardContent className="flex flex-col items-center justify-center py-16">
          <div className="float flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
            <Rocket className="h-8 w-8 text-primary" />
          </div>
          <p className="mt-4 text-foreground">Nenhuma transacao encontrada</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Adicione sua primeira {activeTab === 'personal' ? 'transacao pessoal' : 'transacao empresarial'}
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader className="border-b border-border/50 pb-4">
        <CardTitle className="text-base font-medium text-foreground">
          Transacoes Recentes
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border/50">
          {filtered.map((transaction) => (
            <div
              key={transaction.id}
              className="group flex items-center justify-between px-6 py-4 transition-colors hover:bg-muted/30"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl transition-transform group-hover:scale-110 ${
                    transaction.transaction_type === 'income'
                      ? 'bg-success/20'
                      : 'bg-destructive/20'
                  }`}
                >
                  {transaction.transaction_type === 'income' ? (
                    <ArrowUpRight className="h-5 w-5 text-success" />
                  ) : (
                    <ArrowDownRight className="h-5 w-5 text-destructive" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-foreground">{transaction.category}</p>
                  <p className="text-sm text-muted-foreground">
                    {transaction.description || formatDate(transaction.date)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p
                    className={`font-semibold ${
                      transaction.transaction_type === 'income'
                        ? 'text-success'
                        : 'text-destructive'
                    }`}
                  >
                    {transaction.transaction_type === 'income' ? '+' : '-'}
                    {formatCurrency(Number(transaction.amount))}
                  </p>
                  <p className="text-xs text-muted-foreground">{formatDate(transaction.date)}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground opacity-0 transition-opacity hover:text-destructive group-hover:opacity-100"
                  onClick={() => handleDelete(transaction.id)}
                  disabled={isPending}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
