import { StreamInfo } from '@/interfaces/stream-info';
import getBalance, { getStreamedAmountForDateRange } from '@/utils/balances';
import { formatAddress, rebase } from '@/utils/formats';
import { ColumnDef } from '@tanstack/react-table';
import BigNumber from 'bignumber.js';
import { DateRange } from 'react-day-picker';

export function getActualColumns(dateRange: DateRange | undefined): ColumnDef<StreamInfo>[] {
  return [
    {
      accessorKey: 'alias',
      header: () => <span className='font-bold text-slate-100 text-center'>Alias</span>,
      cell: ({ row }) => <span className={`font-extrabold`}>{row.original.alias.toUpperCase()}</span>,
    },
    {
      accessorKey: 'asset.symbol',
      header: () => <span className='font-bold text-slate-100 text-center'>Asset</span>,
    },
    {
      accessorKey: 'streamedAmount',
      header: () => <span className='font-bold text-slate-100 text-center'>Streamed Amount</span>,
      cell: ({ row }) => {
        const streamedAmount = getStreamedAmountForDateRange(row.original, dateRange);

        return (
          <div className='font-medium'>
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
      header: () => <span className='font-bold text-slate-100 text-center'>From</span>,
      cell: ({ row }) => <span>{formatAddress(row.original.sender)}</span>,
    },
    {
      accessorKey: 'recipient',
      header: () => <span className='font-bold text-slate-100 text-center'>To</span>,
      cell: ({ row }) => <span>{formatAddress(row.original.recipient)}</span>,
    },
  ];
}

export function getPotentialColumns(date: Date | undefined): ColumnDef<StreamInfo>[] {
  return [
    {
      accessorKey: 'alias',
      header: () => <span className='font-extrabold text-slate-100 text-center'>Alias</span>,
      cell: ({ row }) => <span className='font-extrabold'>{row.original.alias.toUpperCase()}</span>,
    },
    {
      accessorKey: 'asset.symbol',
      header: () => <span className='font-bold text-slate-100 text-center'>Asset</span>,
    },
    {
      accessorKey: 'remainingStreamedAmount',
      header: () => <span className='font-bold text-slate-100 text-center'>Remaining Streamed Amount</span>,
      cell: ({ row }) => {
        const remainingAmount = getBalance([row.original], date);
        return (
          <div className='font-medium'>
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(Number(remainingAmount))}
          </div>
        );
      },
    },
    {
      accessorKey: 'depositAmount',
      header: () => <span className='font-bold text-slate-100 text-center'>Potential Amount</span>,
      cell: ({ row }) => (
        <div className='font-medium'>
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(Number(rebase(BigNumber(row.original.depositAmount))))}
        </div>
      ),
    },
    {
      accessorKey: 'sender',
      header: () => <span className='font-bold text-slate-100 text-center'>From</span>,
      cell: ({ row }) => <span>{formatAddress(row.original.sender)}</span>,
    },
    {
      accessorKey: 'recipient',
      header: () => <span className='font-bold text-slate-100 text-center'>To</span>,
      cell: ({ row }) => <span>{formatAddress(row.original.recipient)}</span>,
    },
  ];
}
