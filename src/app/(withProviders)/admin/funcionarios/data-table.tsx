"use client"
import { ArrowUpDown } from "lucide-react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useEffect, useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { DataTableToolbar } from "./data-table-toolbar"
import { DataTablePagination } from "./data-table-pagination"
import { UserType } from "@/types/collection"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import Loader from "@/components/ui/loader"
import { table } from "console"
import axios from "axios"

interface getUserProps {
  pageNumber: number
  pageSize?: number
}

async function getClient({ pageNumber = 0, pageSize = 10 }: getUserProps) {
  const res = await fetch(
    `/api/client?page_size=${pageSize}&page_number=${pageNumber}`
  )
  const data = await res.json()
  const users = data.data as UserType[]
  const pageCount = data.totalPage
  return { users, pageCount }
}

export function DataTable() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [count, setCount] = useState(0)
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const defaultData = useMemo(() => [], [])
  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  )
  const client = useQueryClient()
  const { data, isLoading, isFetching, error, isRefetching } = useQuery({
    queryKey: ["client", pagination],
    queryFn: () =>
      getClient({
        pageNumber: pagination.pageIndex,
        pageSize: pagination.pageSize,
      }),
    keepPreviousData: true,
  })

  const mutation = useMutation({
    mutationFn: async (newTodo: any) => {
      return await axios.patch("/api/client", newTodo)
    },
    onSuccess: () => {
      client.invalidateQueries(["client"])
    },
  })

  const deliveryRoutes = ["madrugada", "lago", "tarde"]

  const columns: ColumnDef<UserType>[] = [
    {
      id: "uid",
      accessorKey: "uid",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            UID
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
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
        )
      },
    },
    {
      id: "Telefone",

      accessorKey: "telephone",
      header: "Telefone",
    },
    // {
    //   accessorKey: "email",
    //   header: "Email",
    // },
    {
      id: "Rota",
      accessorKey: "route",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Rota
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        return (
          <Select
            value={row.getValue("Rota")}
            onValueChange={(routeName) => {
              if (routeName !== row.getValue("Rota")) {
                mutation.mutateAsync({
                  uid: row.getValue("uid"),
                  route: routeName.toLowerCase(),
                })
              }
            }}
            disabled={isLoading}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder={row.getValue("Rota")} />
            </SelectTrigger>
            <SelectContent>
              {deliveryRoutes.map((route, index) => (
                <SelectItem value={route} key={route}>
                  {route}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )
      },
    },
    // {
    //   accessorKey: "type",
    //   header: () => <div className="text-right">Tipo de Cliente</div>,
    //   cell: ({ row }) => {
    //     const amount = parseFloat(row.getValue(""))
    //     const formatted = new Intl.NumberFormat("en-US", {
    //       style: "currency",
    //       currency: "USD",
    //     }).format(amount)

    //     return <div className="text-right font-medium">{formatted}</div>
    //   },
    // },

    {
      accessorKey: "email",
      header: "Email",
    },
    {
      id: "Endereço",
      accessorKey: "address",
      header: "Endereço",
    },
    {
      id: "Criação do Usuário",
      accessorKey: "created_at",
      header: "Criação do Usuário",
      accessorFn: (row) => `${new Date(row.created_at!).toLocaleString()}`,
    },
  ]

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
  })

  if (isLoading) {
    return <Loader color="#000000" />
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
                  )
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
  )
}
