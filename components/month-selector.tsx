'use client'

import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface MonthSelectorProps {
  month: number
  year: number
  onPrevious: () => void
  onNext: () => void
}

const MONTHS = [
  'Janeiro',
  'Fevereiro',
  'Marco',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro'
]

export function MonthSelector({ month, year, onPrevious, onNext }: MonthSelectorProps) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-border/50 bg-card/30 p-1.5 backdrop-blur-sm">
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-8 w-8 text-muted-foreground hover:text-foreground" 
        onClick={onPrevious}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <span className="min-w-[140px] text-center text-sm font-medium text-foreground">
        {MONTHS[month]} {year}
      </span>
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-8 w-8 text-muted-foreground hover:text-foreground" 
        onClick={onNext}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
