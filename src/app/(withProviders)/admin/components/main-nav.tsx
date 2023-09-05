import Link from "next/link"

import { cn } from "@/lib/utils"

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/admin"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Visão Geral
      </Link>
      <Link
        href="/admin/clientes"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Clientes
      </Link>
      <Link
        href="/admin/funcionarios"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Funcionários
      </Link>
      <Link
        href="/admin/estoque"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Estoque
      </Link>
      <Link
        href="/admin/configuracoes"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Configurações
      </Link>
    </nav>
  )
}
