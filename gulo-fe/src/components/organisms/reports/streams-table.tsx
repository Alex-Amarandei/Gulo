'use client';

import { useState } from 'react';

import { StreamsTableProps } from '@/interfaces/props';
import Stream from '@/interfaces/stream';
import { Button } from '@/lib/ui/atoms/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/lib/ui/organisms/table';
import {
  ColumnDef,
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
import { DateRange } from 'react-day-picker';

function getStreamedAmountForDateRange(stream: Stream, dateRange: DateRange | undefined) {
  // Your implementation here
  return 0; // Placeholder
}

function getRemainingStreamedAmount(stream: Stream) {
  // Your implementation here
  return 0; // Placeholder
}

const potentialColumns: ColumnDef<Stream>[] = [
  {
    accessorKey: 'alias',
    header: 'Alias',
  },
  {
    accessorKey: 'asset',
    header: 'Asset',
  },
  {
    accessorKey: 'remainingStreamedAmount',
    header: 'Remaining Streamed Amount',
    cell: ({ row }) => {
      const remainingAmount = getRemainingStreamedAmount(row.original);
      return (
        <div className='text-right font-medium'>
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(remainingAmount)}
        </div>
      );
    },
  },
  {
    accessorKey: 'depositAmount',
    header: 'Potential Amount',
    cell: ({ row }) => (
      <div className='text-right font-medium'>
        {new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(row.getValue('depositAmount'))}
      </div>
    ),
  },
  {
    accessorKey: 'sender',
    header: 'From',
  },
  {
    accessorKey: 'recipient',
    header: 'To',
  },
];

export function StreamsTable({ balanceType, streams, date, dateRange }: StreamsTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const actualColumns: ColumnDef<Stream>[] = [
    {
      accessorKey: 'alias',
      header: 'Alias',
    },
    {
      accessorKey: 'asset.symbol',
      header: 'Asset',
    },
    {
      accessorKey: 'streamedAmount',
      header: 'Streamed Amount',
      cell: ({ row }) => {
        const streamedAmount = getStreamedAmountForDateRange(row.original, dateRange);
        return (
          <div className='text-right font-medium'>
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(streamedAmount)}
          </div>
        );
      },
    },
    {
      accessorKey: 'sender',
      header: 'From',
    },
    {
      accessorKey: 'recipient',
      header: 'To',
    },
  ];

  const columns = balanceType === 'Actual' ? actualColumns : potentialColumns;

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

  return (
    <div className='w-full drop-shadow-xl'>
      <div className='rounded-md border border-sablier'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead key={header.id}>
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
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-24 text-center'>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-end space-x-2 py-4'>
        <div className='flex-1 text-sm text-muted-foreground'>
          {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
          selected.
        </div>
        <div className='space-x-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}>
            Previous
          </Button>
          <Button variant='outline' size='sm' onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
