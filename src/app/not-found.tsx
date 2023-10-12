import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <img src="/not-found.svg" alt="404" className=" max-w-xs " />
      <div className="flex flex-col gap-2 text-center">
        <p>Não conseguimos encontrar essa página</p>
        <Button asChild>
          <Link href="/"> Voltar ao início</Link>
        </Button>
      </div>
    </div>
  );
}
