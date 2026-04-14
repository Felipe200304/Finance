import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Wallet, TrendingUp, Building2, Shield, ArrowRight, Sparkles } from 'lucide-react'

function Stars() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="star absolute h-1 w-1 rounded-full bg-foreground/30"
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

export default async function HomePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    redirect('/dashboard')
  }

  return (
    <div className="relative min-h-screen bg-background">
      <Stars />
      
      <header className="relative border-b border-border/50 bg-card/30 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="glow-cyan flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Wallet className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold text-foreground">FinControl</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild className="text-foreground/80 hover:text-foreground">
              <Link href="/auth/login">Entrar</Link>
            </Button>
            <Button size="sm" asChild className="glow-cyan">
              <Link href="/auth/sign-up">Criar Conta</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="relative">
        <section className="mx-auto max-w-6xl px-4 py-24 text-center">
          <div className="float mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary">
            <Sparkles className="h-4 w-4" />
            Controle financeiro inteligente
          </div>
          <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Suas financas em
            <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              outra orbita
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground">
            Gerencie seus gastos pessoais e da empresa em um unico lugar. 
            Tenha visibilidade total sobre suas receitas, despesas e ferramentas que voce utiliza.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild className="glow-cyan">
              <Link href="/auth/sign-up">
                Comecar Gratis
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="border-border/50 hover:border-primary/50 hover:bg-primary/5">
              <Link href="/auth/login">Ja tenho conta</Link>
            </Button>
          </div>
        </section>

        <section className="border-t border-border/50 bg-card/30 py-24 backdrop-blur-sm">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="text-center text-2xl font-bold text-foreground sm:text-3xl">
              Tudo que voce precisa para controlar suas financas
            </h2>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="group rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-card/80">
                <div className="glow-cyan flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20">
                  <Wallet className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">Gastos Pessoais</h3>
                <p className="mt-2 text-muted-foreground">
                  Acompanhe suas despesas do dia a dia organizadas por categoria.
                </p>
              </div>

              <div className="group rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-all hover:border-success/50 hover:bg-card/80">
                <div className="glow-success flex h-12 w-12 items-center justify-center rounded-xl bg-success/20">
                  <Building2 className="h-6 w-6 text-success" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">Gestao Empresarial</h3>
                <p className="mt-2 text-muted-foreground">
                  Controle as ferramentas, servicos e custos da sua empresa.
                </p>
              </div>

              <div className="group rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-all hover:border-accent/50 hover:bg-card/80">
                <div className="glow-purple flex h-12 w-12 items-center justify-center rounded-xl bg-accent/20">
                  <TrendingUp className="h-6 w-6 text-accent" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">Visao Completa</h3>
                <p className="mt-2 text-muted-foreground">
                  Veja entradas e saidas em um unico painel, mes a mes.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="mx-auto max-w-6xl px-4 text-center">
            <div className="flex justify-center">
              <div className="glow-success flex h-16 w-16 items-center justify-center rounded-full bg-success/20">
                <Shield className="h-8 w-8 text-success" />
              </div>
            </div>
            <h2 className="mt-6 text-2xl font-bold text-foreground sm:text-3xl">
              Seus dados estao seguros
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Utilizamos criptografia e as melhores praticas de seguranca para proteger suas informacoes financeiras.
            </p>
          </div>
        </section>
      </main>

      <footer className="relative border-t border-border/50 py-8">
        <div className="mx-auto max-w-6xl px-4 text-center text-sm text-muted-foreground">
          <p>FinControl - Controle financeiro simples e eficiente</p>
        </div>
      </footer>
    </div>
  )
}
