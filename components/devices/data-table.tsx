"use client"

import { useState, useMemo, useEffect } from "react"
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
import { DataTableFilterDrawer } from "./data-table-filter-drawer"
import { useTableFilters } from "@/lib/use-table-filters"
import { mobileColumnIds, desktopColumnIds } from "./columns"
import type { Device } from "@/lib/types"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

// Hook to detect mobile screen size
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)")
    setIsMobile(mediaQuery.matches)

    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mediaQuery.addEventListener("change", handler)
    return () => mediaQuery.removeEventListener("change", handler)
  }, [])

  return isMobile
}

// Get default visibility based on screen size
function getDefaultVisibility(isMobile: boolean): VisibilityState {
  if (isMobile) {
    // On mobile: show only the combined "device" column
    return {
      device: true,
      ...Object.fromEntries(desktopColumnIds.map((id) => [id, false])),
    }
  }
  // On desktop: hide the combined column, show individual columns (matterSupport hidden by default)
  return {
    device: false,
    ...Object.fromEntries(desktopColumnIds.map((id) => [id, id !== "matterSupport"])),
  }
}

export function DataTable<TData extends Device, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [filters, setFilters] = useTableFilters()
  const [sorting, setSorting] = useState<SortingState>([])
  const isMobile = useIsMobile()
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(() => getDefaultVisibility(false))

  // Update visibility when switching between mobile/desktop
  useEffect(() => {
    setColumnVisibility(getDefaultVisibility(isMobile))
  }, [isMobile])

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
      {/* Desktop sidebar - hidden on mobile */}
      <div className="hidden md:block">
        <DataTableSidebar table={table} data={data} filters={filters} setFilters={setFilters} />
      </div>
      <div className="flex-1 space-y-4 min-w-0">
        <div className="space-y-2 md:space-y-0">
          <DataTableToolbar table={table} filters={filters} setFilters={setFilters} />
          {/* Mobile filter drawer - visible only on mobile, below search */}
          <div className="md:hidden">
            <DataTableFilterDrawer table={table} data={data} filters={filters} setFilters={setFilters} />
          </div>
        </div>

        {/* Single table for both mobile and desktop */}
        <div className="rounded-md border">
          <Table>
            <TableHeader className={isMobile ? "sr-only" : ""}>
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
