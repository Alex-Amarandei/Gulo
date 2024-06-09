'use client';

import { useState } from 'react';

import { getActualColumns, getForecastColumns } from '@/components/atoms/data/columns';
import { StreamsTableProps } from '@/interfaces/props';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/lib/ui/organisms/table';
import getBalance, { getRemainingAmount, getStreamedAmountForDateRange } from '@/utils/balances';
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

export function StreamsTable({ balanceType, streams, date, dateRange }: StreamsTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const columns = balanceType === 'Actual' ? getActualColumns(dateRange) : getForecastColumns(date);

  const table = useReactTable({
    data: streams,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const totals = table.getRowModel().rows.reduce(
    (acc, row) => {
      if (balanceType === 'Actual') {
        acc.currentAmount += getStreamedAmountForDateRange(row.original, dateRange);
      } else if (balanceType === 'Forecast') {
        acc.currentAmount += Number(getBalance([row.original], date));
      }
      acc.forecastAmount += Number(getRemainingAmount(row.original));
      return acc;
    },
    { currentAmount: 0, forecastAmount: 0 },
  );

  return (
    <div className='w-full'>
      <div className='border-none shadow-2xl text-slate-100 font-xl'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead key={header.id} className='font-bold text-slate-100 text-center shadow-xl'>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell className='text-center py-6 shadow-sm' key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-24 text-center font-extrabold text-slate-100'>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              {columns.map(column => (
                <TableCell key={column.id} className='font-bold text-slate-100 text-center'>
                  {column.id === 'currentAmount'
                    ? `Total: ${new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      }).format(totals.currentAmount)}`
                    : column.id === 'forecastAmount'
                      ? `Total: ${new Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: 'USD',
                        }).format(totals.forecastAmount)}`
                      : null}
                </TableCell>
              ))}
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
}
