"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Donor } from "@prisma/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { PaginationState } from "@tanstack/react-table";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "use-debounce";
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
  const data = await res.json();
  const users = data.data as Donor[];
  const pageCount = data.totalPage;
  return { users, pageCount };
}
export default function Home() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
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
  const client = useQueryClient();
  const { data, isLoading, isFetching, error, isRefetching } = useQuery({
    queryKey: ["donors", query],
    queryFn: () =>
      getUsers({
        pageNumber: pagination.pageIndex,
        pageSize: pagination.pageSize,
        user: query || "",
      }),
  });

  return (
    <main className="flex flex-col gap-8 ">
      <Input onChange={(e) => setText(e.currentTarget.value)} />
      <div>Fazer amigos</div>
      {data?.users.map((user) => (
        <div key={user.id}>
          <Link href={`/perfil/${user.nickname}`}>@{user.nickname}</Link>
          <Button>Seguir</Button>
        </div>
      ))}
    </main>
  );
}
