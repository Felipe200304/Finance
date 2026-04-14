'use client'

import { Button } from '@/components/ui/button'
import { Wallet, Building2 } from 'lucide-react'
import type { TransactionType } from '@/lib/types'

interface TabSelectorProps {
  activeTab: TransactionType
  onChange: (tab: TransactionType) => void
}

export function TabSelector({ activeTab, onChange }: TabSelectorProps) {
  return (
    <div className="flex gap-2 rounded-xl border border-border/50 bg-card/30 p-1.5 backdrop-blur-sm">
      <Button
        variant={activeTab === 'personal' ? 'default' : 'ghost'}
        size="sm"
        className={`flex-1 gap-2 ${activeTab === 'personal' ? 'glow-cyan' : 'text-muted-foreground hover:text-foreground'}`}
        onClick={() => onChange('personal')}
      >
        <Wallet className="h-4 w-4" />
        <span className="hidden sm:inline">Pessoal</span>
      </Button>
      <Button
        variant={activeTab === 'business' ? 'default' : 'ghost'}
        size="sm"
        className={`flex-1 gap-2 ${activeTab === 'business' ? 'glow-cyan' : 'text-muted-foreground hover:text-foreground'}`}
        onClick={() => onChange('business')}
      >
        <Building2 className="h-4 w-4" />
        <span className="hidden sm:inline">Empresa</span>
      </Button>
    </div>
  )
}
