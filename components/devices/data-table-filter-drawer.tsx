"use client"

import { Table } from "@tanstack/react-table"
import { Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerBody,
} from "@/components/ui/drawer"
import { DataTableFilters } from "./data-table-filters"
import type { Device } from "@/lib/types"
import type { TableFilters, SetTableFilters } from "@/lib/use-table-filters"

interface DataTableFilterDrawerProps<TData> {
  table: Table<TData>
  data: TData[]
  filters: TableFilters
  setFilters: SetTableFilters
}

export function DataTableFilterDrawer<TData extends Device>({
  table,
  data,
  filters,
  setFilters,
}: DataTableFilterDrawerProps<TData>) {
  const activeFilterCount =
    filters.manufacturer.length +
    filters.category.length +
    filters.protocol.length +
    filters.power.length

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" size="sm" className="h-9 w-full gap-2">
          <Filter className="h-4 w-4" />
          Filters
          {activeFilterCount > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
              {activeFilterCount}
            </span>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent side="right">
        <DrawerHeader>
          <DrawerTitle>Filters</DrawerTitle>
        </DrawerHeader>
        <DrawerBody>
          <DataTableFilters
            table={table}
            data={data}
            filters={filters}
            setFilters={setFilters}
            showReset={true}
            resetVariant="outline"
          />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}
