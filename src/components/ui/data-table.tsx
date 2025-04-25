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
  import { ChevronDown, MoreHorizontal, PlusCircleIcon } from "lucide-react"
  import { Button } from "@ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import { Input } from "@ui/input"
import { Badge } from '@ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@ui/table"
import { useGetEmployes } from "@/services/useGetEmploye"
import Employe from "@/types/employe"
import { useState } from "react"
import { useDebounce } from "use-debounce"
import { AddModal } from "../modal/addModal"
import { EditModal } from "../modal/EditModal"
import { useDeleteEmploye } from "@/services/useDeleteEmploye"
import { ResumeModal } from "../modal/resumeModal"
import { ChartModal } from "../modal/chartModal"
import { Separator } from "@radix-ui/react-dropdown-menu"
import { useGetStats } from "@/services/useGetStat"


export const DataTable =  () => {
    const [search, setSearch] = useState("")
    const [debouncedSearch] = useDebounce(search, 500);
    const [pagination, setPagination] = useState({
      pageIndex: 0,
      pageSize: 9,
    });
    
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})

    const [selectedEmploye, setSelectedEmploye] = useState<Employe | null>(null)
    const [openAdd, setOpenAdd] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)

    //DATA
    const { data: employes, error } = useGetEmployes({
      search: debouncedSearch,
      page: pagination.pageIndex + 1,
      perPage: pagination.pageSize,
    });
    const { deleteEmploye } = useDeleteEmploye();
    const {data: stats} = useGetStats()


    const columns: ColumnDef<Employe>[] = [
      {
        id: "index",
        enableHiding: false,
        header: "Num",
        cell: ({ row }) => {
          // Calcul de l'index en tenant compte de la pagination
          const index = row.index + 1 + (pagination.pageIndex * pagination.pageSize);
          return <div className="text-center text-muted-foreground">{index}</div>;
        },
      },
      {
        accessorKey: "nom",
        header: 'Nom',
        cell: ({ row }) => <div>{row.getValue("nom")}</div>,
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
        accessorKey: "salaire",
        header: () => <div className="text-right">Salaire</div>,
        cell: ({ row }) =>{
          const employe = row.original
          return  (
            <div className="text-right text-sm">
              <Badge>{employe.nombre_de_jours * employe.taux_journalier}</Badge>
            </div>
          )
        },
      },
      {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
          const employe = row.original
     
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Ouvrir menu</span>
                  <MoreHorizontal />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => {
                    setSelectedEmploye(employe)
                    setOpenEdit(true)
                  }}
                >
                  Modifier
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-500"
                  onClick={async() => {
                      await deleteEmploye(employe.numEmp)
                  }}
                >Supprimer</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
      },
    ]
  


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
        <div className="ml-2">
          <Button onClick={() => setOpenAdd(true)}>
            <PlusCircleIcon />
            Ajouter
          </Button>
        </div>
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
      <div className="flex items-center justify-between space-x-2 py-4">
        <p className="text-sm">Un total de <span className="underline">{employes?.pagination?.total} employé(e)s</span></p>
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
        <div>
          <ResumeModal max={stats?.statistics.maxSalary ?? 0} total={stats?.statistics.totalSalaries ?? 0} min={stats?.statistics.minSalary ?? 0} />
          <Separator className="my-4"/>
          <ChartModal max={stats?.statistics.maxSalary ?? 0} total={stats?.statistics.totalSalaries ?? 0} min={stats?.statistics.minSalary ?? 0}/>
        </div>
        
        <AddModal open={openAdd} setOpen={setOpenAdd} />
        {selectedEmploye && (<EditModal open={openEdit} setOpen={setOpenEdit} employe={selectedEmploye} />)}
      </main>
    )
}