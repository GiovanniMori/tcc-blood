import Link from "next/link";

import { cn } from "@/lib/utils";

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
        href="/admin/users"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Doadores
      </Link>
      <Link
        href="/admin/appointments"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Agendamentos
      </Link>
      <Link
        href="/admin/rewards"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Recompensas
      </Link>
    </nav>
  );
}
