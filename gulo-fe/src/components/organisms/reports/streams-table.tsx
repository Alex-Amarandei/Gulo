import { getActualColumns, getForecastColumns } from '@/components/atoms/data/columns';
import { StreamsTableProps } from '@/interfaces/props';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/lib/ui/organisms/table';
import getBalance, { getRemainingAmount, getStreamedAmountForDateRange } from '@/utils/balances';
import { formatUsdAmount } from '@/utils/formats';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

export function StreamsTable({ balanceType, streams, date, dateRange }: StreamsTableProps) {
  const columns = balanceType === 'Actual' ? getActualColumns(dateRange) : getForecastColumns(date);

  const table = useReactTable({
    data: streams,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
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
        <Table key='table'>
          <TableHeader key='table-header'>
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
          <TableBody key='table-body'>
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
              <TableRow key='no-results-row'>
                <TableCell
                  key='no-results-cell'
                  colSpan={columns.length}
                  className='h-24 text-center font-extrabold text-slate-100'>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter key='table-footer'>
            <TableRow key='footer-row'>
              {columns.map((column, index) => (
                <TableCell key={`footer-cell-${column.id}-${index}`} className='font-bold text-slate-100 text-center'>
                  {column.id === 'currentAmount'
                    ? `Total: ${formatUsdAmount(totals.currentAmount)}`
                    : column.id === 'forecastAmount'
                      ? `Total: ${formatUsdAmount(totals.forecastAmount)}`
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
