import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h2>404</h2>
      <p>Não conseguimos encontrar essa página</p>
      <Button asChild>
        <Link href="/"> Voltar ao início</Link>
      </Button>
    </div>
  );
}
