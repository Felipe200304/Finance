export type TransactionType = 'personal' | 'business'
export type TransactionKind = 'income' | 'expense'

export interface Transaction {
  id: string
  user_id: string
  type: TransactionType
  category: string
  description: string | null
  amount: number
  transaction_type: TransactionKind
  date: string
  created_at: string
  updated_at: string
}

export interface TransactionFormData {
  type: TransactionType
  category: string
  description: string
  amount: number
  transaction_type: TransactionKind
  date: string
}

export const PERSONAL_CATEGORIES = [
  'Alimentacao',
  'Transporte',
  'Moradia',
  'Saude',
  'Educacao',
  'Lazer',
  'Compras',
  'Outros'
]

export const BUSINESS_CATEGORIES = [
  'Ferramentas',
  'Software',
  'Marketing',
  'Servicos',
  'Infraestrutura',
  'Salarios',
  'Impostos',
  'Outros'
]
