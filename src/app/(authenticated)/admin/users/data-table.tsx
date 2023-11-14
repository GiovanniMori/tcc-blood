"use client";
import { ArrowUpDown } from "lucide-react";

import Confetti from "react-confetti";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loader from "@/components/ui/loader";
import { table } from "console";
import axios from "axios";
import { User, UserRole as PrismaUserRole } from "@prisma/client";
import { DataTableToolbar } from "@/components/data-table-toolbar";
import { DataTablePagination } from "@/components/data-table-pagination";

interface getUserProps {
  pageNumber: number;
  pageSize?: number;
}

async function getUsers({ pageNumber = 0, pageSize = 10 }: getUserProps) {
  const res = await fetch(
    `/api/user?page_size=${pageSize}&page_number=${pageNumber}`
  );
  const data = await res.json();
  const users = data.data as User[];
  const pageCount = data.totalPage;
  return { users, pageCount };
}

export function DataTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [count, setCount] = useState(0);
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const defaultData = useMemo(() => [], []);
  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );
  const client = useQueryClient();
  const { data, isLoading, isFetching, error, isRefetching } = useQuery({
    queryKey: ["users", pagination],
    queryFn: () =>
      getUsers({
        pageNumber: pagination.pageIndex,
        pageSize: pagination.pageSize,
      }),
    keepPreviousData: true,
  });

  const mutation = useMutation({
    mutationFn: async (newTodo: any) => {
      return await axios.patch("/api/user", newTodo);
    },
    onSuccess: () => {
      client.invalidateQueries(["users"]);
    },
  });

  const columns: ColumnDef<User>[] = [
    {
      id: "Nome",
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nome
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },

    {
      id: "Cargo",
      accessorKey: "role",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Cargo
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },

      cell: ({ row }) => {
        const userRole = row.getValue("cargo");
        return (
          <Select
            value={row.getValue("cargo")}
            onValueChange={(userRole) => {
              if (userRole !== row.getValue("Cargo")) {
                mutation.mutateAsync({
                  id: row.getValue("id"),
                  userRole: userRole.toUpperCase(),
                });
              }
            }}
            disabled={isLoading}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder={row.getValue("Cargo")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={"ADMIN"}>ADMIN</SelectItem>
              <SelectItem value={"USER"}>USUÁRIO</SelectItem>
            </SelectContent>
          </Select>
        );
      },
    },
    {
      accessorKey: "email",
      header: "Email",
    },

    {
      id: "Criação do Usuário",
      accessorKey: "created_at",
      header: "Criação do Usuário",
      accessorFn: (row) => `${new Date(row.createdAt).toLocaleString()}`,
    },
  ];

  const table = useReactTable({
    data: data?.users ?? defaultData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
    pageCount: data?.pageCount,
    state: {
      pagination,
      sorting,
      columnFilters,
    },
  });

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="space-y-4">
      <DataTableToolbar table={table} />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} onClick={() => console.log(cell)}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
