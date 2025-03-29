'use client'

import {
    ColumnDef,
    ColumnFiltersState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
  } from "@tanstack/react-table"
  import { ChevronDown, MoreHorizontal } from "lucide-react"
  import { Button } from "@ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import { Input } from "@ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@ui/table"
import { useGetEmployes } from "@/services/useGetEmploye"
import Employe from "@/types/employe"
import { useState } from "react"
import { useDebounce } from "use-debounce"

export const columns: ColumnDef<Employe>[] = [
    {
      accessorKey: "numEmp",
      header: "Numéro",
      cell: ({ row }) => (
        <div>{row.getValue("numEmp")}</div>
      ),
    },
    {
      accessorKey: "nom",
      header: 'Nom',
      cell: ({ row }) => <div className="lowercase">{row.getValue("nom")}</div>,
    },
    {
      accessorKey: "nombre_de_jours",
      header: () => <div className="text-right">Nombre de jours</div>,
      cell: ({ row }) => {
        return <div className="text-right font-medium">{row.getValue('nombre_de_jours')}</div>
      },
    },
    {
        accessorKey: "taux_journalier",
        header: () => <div className="text-right">Taux journalier</div>,
        cell: ({ row }) => {
          return <div className="text-right font-medium">{row.getValue('taux_journalier')}</div>
        },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ }) => {
        //const employe = row.original
   
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Ouvrir menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {}}
              >
                Modifier
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-500"
              >Supprimer</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]


export const DataTable =  () => {
    const [search, setSearch] = useState("")
    const [debouncedSearch] = useDebounce(search, 500);
    const [pagination, setPagination] = useState({
      pageIndex: 0,
      pageSize: 5,
    });
    
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})

    //DATA
    const { employes, error } = useGetEmployes({
      search: debouncedSearch,
      page: pagination.pageIndex + 1,
      perPage: pagination.pageSize,
    });


    const table = useReactTable({
        data: employes?.data || [],
        columns,
        pageCount: employes?.pagination?.totalPages ?? - 1,
        manualPagination: true,
        onPaginationChange: setPagination,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
          columnFilters,
          columnVisibility,
          rowSelection,
          pagination
        },
    })


    return(
        <main className="w-full grid grid-cols-1 md:grid-cols-[1fr_400px] gap-[32px] row-start-2 items-center sm:items-start">
            <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filtrer par noms..."
          value={search}
          onChange={(event) => {
            setSearch(event.target.value)
          }}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Colonnes <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {error ? (<p className="text-red-500">Erreur lors du chargement des données</p>) :
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
                  Aucun résultats
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      }
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Précédent
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Suivant
          </Button>
        </div>
        </div>
        </div>
    </main>
    )
}