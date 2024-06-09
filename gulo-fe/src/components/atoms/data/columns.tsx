import { StreamInfo } from '@/interfaces/stream-info';
import getBalance, { getRemainingAmount, getStreamedAmountForDateRange } from '@/utils/balances';
import { formatAddress } from '@/utils/formats';
import { ColumnDef } from '@tanstack/react-table';
import { DateRange } from 'react-day-picker';

export function getActualColumns(dateRange: DateRange | undefined): ColumnDef<StreamInfo>[] {
  return [
    {
      accessorKey: 'alias',
      header: () => <span className='font-bold text-slate-100 text-center'>Alias</span>,
      cell: ({ row }) => (
        <span className='font-extrabold'>
          <a
            href={`https://app.sablier.com/stream/${row.original.alias.toUpperCase()}`}
            target='_blank'
            rel='noopener noreferrer'
            style={{ color: `${row.original.color}` }}
            onClick={event => event.stopPropagation()}>
            <u>{row.original.alias.toUpperCase()}</u>
          </a>
        </span>
      ),
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
      cell: ({ row }) => (
        <span className='font-extrabold'>
          <a
            href={`https://app.sablier.com/stream/${row.original.alias.toUpperCase()}`}
            target='_blank'
            rel='noopener noreferrer'
            style={{ color: `${row.original.color}` }}
            onClick={event => event.stopPropagation()}>
            <u>{row.original.alias.toUpperCase()}</u>
          </a>
        </span>
      ),
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
      accessorKey: 'intactAmount',
      header: () => <span className='font-bold text-slate-100 text-center'>Potential Amount</span>,
      cell: ({ row }) => (
        <div className='font-medium'>
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(Number(getRemainingAmount(row.original)))}
          {!row.original.cancelable && <strong> (sealed)</strong>}
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
