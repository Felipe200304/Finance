import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Mail, Wallet } from 'lucide-react'

export default function SignUpSuccessPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md border-0 shadow-lg">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-primary">
            <Wallet className="h-7 w-7 text-primary-foreground" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-foreground">
              Verifique seu Email
            </CardTitle>
            <CardDescription className="mt-2 text-muted-foreground">
              Enviamos um link de confirmacao para seu email
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-success/10">
              <Mail className="h-10 w-10 text-success" />
            </div>
          </div>
          
          <p className="text-center text-sm text-muted-foreground">
            Clique no link enviado para seu email para ativar sua conta. 
            Depois, voce podera fazer login e comecar a usar o FinControl.
          </p>

          <Button asChild className="w-full">
            <Link href="/auth/login">Voltar para Login</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
