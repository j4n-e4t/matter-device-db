"use client"

import { useState, useMemo } from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
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
import { DataTablePagination } from "./data-table-pagination"
import { DataTableToolbar } from "./data-table-toolbar"
import { DataTableSidebar } from "./data-table-sidebar"
import { useTableFilters } from "@/lib/use-table-filters"
import type { Device } from "@/lib/types"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData extends Device, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [filters, setFilters] = useTableFilters()
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})

  // Derive columnFilters from nuqs state
  const columnFilters = useMemo<ColumnFiltersState>(() => {
    const result: ColumnFiltersState = []
    if (filters.search) {
      result.push({ id: "name", value: filters.search })
    }
    if (filters.manufacturer.length > 0) {
      result.push({ id: "manufacturer_id", value: filters.manufacturer })
    }
    if (filters.category.length > 0) {
      result.push({ id: "capabilities", value: filters.category })
    }
    if (filters.protocol.length > 0) {
      result.push({ id: "protocols", value: filters.protocol })
    }
    if (filters.power.length > 0) {
      result.push({ id: "powerSupply", value: filters.power })
    }
    return result
  }, [filters])

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    initialState: {
      pagination: {
        pageSize: 20,
      },
    },
  })

  return (
    <div className="flex gap-6">
      <DataTableSidebar table={table} data={data} filters={filters} setFilters={setFilters} />
      <div className="flex-1 space-y-4">
        <DataTableToolbar table={table} filters={filters} setFilters={setFilters} />
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
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
                    No devices found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <DataTablePagination table={table} />
      </div>
    </div>
  )
}
