"use client";

import { ArrowUpDown, Check, Trash } from "lucide-react";
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
import {
  User,
  UserRole as PrismaUserRole,
  Reward,
  Appointment,
} from "@prisma/client";
import { appointmentDonorWithUser } from "@/types/donorWithUser";
import { PaginatedResponse } from "@/types/paginatedResponse";
import { DataTableToolbar } from "@/components/data-table-toolbar";
import { DataTablePagination } from "@/components/data-table-pagination";
import CreateBloodDonation from "./create-blood-donation";

interface getUserProps {
  pageNumber: number;
  pageSize?: number;
}

async function getUsers({ pageNumber = 0, pageSize = 10 }: getUserProps) {
  const res = await fetch(
    `/api/appointments?page_size=${pageSize}&page_number=${pageNumber}`
  );
  const data: PaginatedResponse<appointmentDonorWithUser> = await res.json();
  console.log(data);
  const users = data.data;
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
    queryKey: ["appointments", pagination],
    queryFn: () =>
      getUsers({
        pageNumber: pagination.pageIndex,
        pageSize: pagination.pageSize,
      }),
    keepPreviousData: true,
  });

  const mutation = useMutation({
    mutationFn: async (newTodo: any) => {
      return await axios.patch("/api/client", newTodo);
    },
    onSuccess: () => {
      client.invalidateQueries(["client"]);
    },
  });

  function handleConfirmDonation(id: string) {
    axios
      .patch(`/api/appointments/${id}`, {
        status: "ACCEPTED",
      })
      .then(() => {
        client.invalidateQueries(["appointments"]);
      });
  }

  function handleCancel(id: string) {}

  const columns: ColumnDef<appointmentDonorWithUser>[] = [
    {
      id: "id",
      accessorKey: "id",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            UID
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      id: "Nome",
      accessorKey: "donor.user.name",
      header: "Nome",
    },
    {
      id: "CPF",
      accessorKey: "donor.cpf",
      header: "CPF",
    },
    {
      id: "Status",
      accessorKey: "status",
      header: "Status",
    },
    {
      id: "Data do agendamento",
      accessorKey: "createdAt",
      header: "Data do agendamento",
      accessorFn: (row) => `${new Date(row.createdAt).toLocaleString()}`,
    },
    {
      id: "Ações",
      accessorKey: "id",
      header: "Ações",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <CreateBloodDonation
            donorId={row.original.donorUserId}
            hemocenterId={row.original.hemocenterId}
            donationDate={row.original.createdAt}
            appointmentId={row.original.id}
          />
          <Button onClick={() => handleCancel(row.id)} variant={"secondary"}>
            <Trash />
          </Button>
        </div>
      ),
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
                  {isLoading ? (
                    <div className="flex gap-2 w-full justify-center">
                      <Loader /> Carregando...
                    </div>
                  ) : (
                    "Sem resultados"
                  )}
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
