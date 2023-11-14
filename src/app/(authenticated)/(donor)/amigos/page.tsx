"use client";
import MakeFriends from "@/components/make-friends";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { PaginatedResponse } from "@/types/paginatedResponse";
import { Donor } from "@prisma/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { PaginationState } from "@tanstack/react-table";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const PAGE_SIZE = 10;

import { useDebounce } from "use-debounce";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";

interface getUserProps {
  pageNumber: number;
  user: string;
  pageSize?: number;
}

async function getUsers({
  pageNumber = 0,
  pageSize = 10,
  user = "",
}: getUserProps) {
  const res = await fetch(
    `/api/donors?page_size=${pageSize}&page_number=${pageNumber}&user=${user}`
  );
  const response: PaginatedResponse<Donor> = await res.json();
  return response;
}
export default function Home() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: PAGE_SIZE,
  });
  const [text, setText] = useState(search);
  const [query] = useDebounce(text, 750);

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );
  const { data, isLoading } = useQuery({
    queryKey: ["donors", query],
    queryFn: () =>
      getUsers({
        pageNumber: pagination.pageIndex,
        pageSize: pagination.pageSize,
        user: query || "",
      }),
    enabled: !!query,
  });
  const { toast } = useToast();
  function handleNextPage() {
    setPagination({ ...pagination, pageIndex: pageIndex + 1 });
  }

  function handleFollow(id: string) {
    axios
      .post(`/api/follow`, { id })
      .then((response) => {
        toast({
          title: "Usuário seguido com sucesso",
          description: "Agora vocês são amigos",
        });
      })
      .catch((error) => {
        console.error(error);
        // handle error response
      });
  }

  return (
    <main className="flex flex-col gap-8 ">
      <h1 className="text-3xl font-bold">Procurar amigos</h1>
      <Input
        onChange={(e) => setText(e.currentTarget.value)}
        placeholder="Nome ou nome de usuário"
      />
      <Separator />
      <div className="flex flex-col gap-4 items-center">
        {isLoading && !!query && <p>Carregando...</p>}
        {!query && <MakeFriends />}
        {data && (
          <>
            {data.totalRecords > 0 ? (
              <>
                <div className="font-bold text-xl ">
                  {data.totalRecords} resultado {data.totalRecords > 1 && "s"}
                </div>
                <Card className="w-full pt-6">
                  <CardContent>
                    {data.data.map((donor) => (
                      <div
                        key={donor.id}
                        className="flex items-center gap-2 justify-between"
                      >
                        <Link
                          href={`/perfil/${donor.nickname}`}
                          className="flex gap-2 items-center"
                        >
                          <Avatar className="h-16 w-16">
                            <AvatarImage src={donor.nickname} />
                            <AvatarFallback className="uppercase">
                              {donor.nickname[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-semibold text-lg">
                              Giovanni
                            </div>
                            <div className="text-foreground">
                              @{donor.nickname}
                            </div>
                          </div>
                        </Link>
                        <Button
                          onClick={() => handleFollow(donor.id)}
                          className="uppercase"
                        >
                          Seguir
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                  {data.totalRecords > PAGE_SIZE && (
                    <CardFooter>
                      <Button onClick={handleNextPage}>Carregar mais </Button>
                    </CardFooter>
                  )}
                </Card>
              </>
            ) : (
              <>
                Que pena, não encontramos ninguém. Tente fazer uma nova busca.
              </>
            )}
          </>
        )}
      </div>
    </main>
  );
}
