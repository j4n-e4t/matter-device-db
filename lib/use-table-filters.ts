"use client"

import { useQueryStates, parseAsArrayOf, parseAsString } from "nuqs"

export const filterParsers = {
  search: parseAsString.withDefault(""),
  manufacturer: parseAsArrayOf(parseAsString).withDefault([]),
  category: parseAsArrayOf(parseAsString).withDefault([]),
  protocol: parseAsArrayOf(parseAsString).withDefault([]),
  power: parseAsArrayOf(parseAsString).withDefault([]),
  matterSupport: parseAsArrayOf(parseAsString).withDefault([]),
}

export function useTableFilters() {
  return useQueryStates(filterParsers, {
    history: "push",
    shallow: true,
  })
}

export type TableFilters = ReturnType<typeof useTableFilters>[0]
export type SetTableFilters = ReturnType<typeof useTableFilters>[1]
