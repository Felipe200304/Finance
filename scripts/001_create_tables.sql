-- Tabela de transações (gastos pessoais e da empresa)
CREATE TABLE IF NOT EXISTS transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type VARCHAR(10) NOT NULL CHECK (type IN ('personal', 'business')),
  category VARCHAR(100) NOT NULL,
  description TEXT,
  amount DECIMAL(12, 2) NOT NULL,
  transaction_type VARCHAR(10) NOT NULL CHECK (transaction_type IN ('income', 'expense')),
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
