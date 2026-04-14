'use client'

import { useState, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Plus, TrendingDown, TrendingUp } from 'lucide-react'
import { createTransaction } from '@/lib/actions'
import { PERSONAL_CATEGORIES, BUSINESS_CATEGORIES } from '@/lib/types'
import type { TransactionType, TransactionKind } from '@/lib/types'

interface TransactionFormProps {
  activeTab: TransactionType
}

export function TransactionForm({ activeTab }: TransactionFormProps) {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [transactionKind, setTransactionKind] = useState<TransactionKind>('expense')
  const [category, setCategory] = useState('')
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])

  const categories = activeTab === 'personal' ? PERSONAL_CATEGORIES : BUSINESS_CATEGORIES

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    
    if (!category || !amount) return

    startTransition(async () => {
      const result = await createTransaction({
        type: activeTab,
        category,
        description,
        amount: parseFloat(amount),
        transaction_type: transactionKind,
        date
      })

      if (result.success) {
        setOpen(false)
        setCategory('')
        setAmount('')
        setDescription('')
        setTransactionKind('expense')
        setDate(new Date().toISOString().split('T')[0])
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="glow-cyan gap-2">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Adicionar</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="border-border/50 bg-card/95 backdrop-blur-xl sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-foreground">
            Nova {activeTab === 'personal' ? 'Transacao Pessoal' : 'Transacao Empresarial'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant={transactionKind === 'expense' ? 'default' : 'outline'}
              className={transactionKind === 'expense' 
                ? 'glow-destructive bg-destructive text-destructive-foreground hover:bg-destructive/90' 
                : 'border-border/50 text-muted-foreground hover:text-foreground'
              }
              onClick={() => setTransactionKind('expense')}
            >
              <TrendingDown className="mr-2 h-4 w-4" />
              Saida
            </Button>
            <Button
              type="button"
              variant={transactionKind === 'income' ? 'default' : 'outline'}
              className={transactionKind === 'income' 
                ? 'glow-success bg-success text-success-foreground hover:bg-success/90' 
                : 'border-border/50 text-muted-foreground hover:text-foreground'
              }
              onClick={() => setTransactionKind('income')}
            >
              <TrendingUp className="mr-2 h-4 w-4" />
              Entrada
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount" className="text-foreground">Valor (R$)</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              min="0"
              placeholder="0,00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="border-border/50 bg-background/50"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category" className="text-foreground">Categoria</Label>
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger className="border-border/50 bg-background/50">
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent className="border-border/50 bg-card/95 backdrop-blur-xl">
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-foreground">Descricao (opcional)</Label>
            <Input
              id="description"
              placeholder="Ex: Almoco no restaurante"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border-border/50 bg-background/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date" className="text-foreground">Data</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border-border/50 bg-background/50"
              required
            />
          </div>

          <Button type="submit" className="glow-cyan w-full" disabled={isPending}>
            {isPending ? 'Salvando...' : 'Salvar Transacao'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
