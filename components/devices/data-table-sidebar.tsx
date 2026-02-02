"use client"

import { Table } from "@tanstack/react-table"
import { DataTableFilters } from "./data-table-filters"
import type { Device } from "@/lib/types"
import type { TableFilters, SetTableFilters } from "@/lib/use-table-filters"

interface DataTableSidebarProps<TData> {
  table: Table<TData>
  data: TData[]
  filters: TableFilters
  setFilters: SetTableFilters
}

export function DataTableSidebar<TData extends Device>({
  table,
  data,
  filters,
  setFilters,
}: DataTableSidebarProps<TData>) {
  return (
    <div className="w-[220px] shrink-0 space-y-4">
      <div className="text-sm font-medium text-muted-foreground">Filters</div>
      <DataTableFilters
        table={table}
        data={data}
        filters={filters}
        setFilters={setFilters}
        showReset={true}
        resetVariant="ghost"
      />
    </div>
  )
}
