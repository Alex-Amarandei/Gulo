import { StreamInfo } from '@/interfaces/stream-info';
import getBalance, { getRemainingAmount, getStreamedAmountForDateRange } from '@/utils/balances';
import { formatAddress, formatUsdAmount } from '@/utils/formats';
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
            href={`https://app.sablier.com/stream/${row.original.alias}`}
            target='_blank'
            rel='noopener noreferrer'
            style={{ color: `${row.original.color}`, opacity: 0.9 }}
            onClick={event => event.stopPropagation()}>
            <u>{row.original.alias}</u>
          </a>
        </span>
      ),
    },
    {
      accessorKey: 'asset.symbol',
      header: () => <span className='font-bold text-slate-100 text-center'>Asset</span>,
    },
    {
      id: 'currentAmount',
      accessorKey: 'streamedAmount',
      header: () => <span className='font-bold text-slate-100 text-center'>Streamed Amount</span>,
      cell: ({ row }) => {
        const streamedAmount = getStreamedAmountForDateRange(row.original, dateRange);

        return <div className='font-medium'>{formatUsdAmount(streamedAmount)}</div>;
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

export function getForecastColumns(date: Date | undefined): ColumnDef<StreamInfo>[] {
  return [
    {
      accessorKey: 'alias',
      header: () => <span className='font-extrabold text-slate-100 text-center'>Alias</span>,
      cell: ({ row }) => (
        <span className='font-extrabold'>
          <a
            href={`https://app.sablier.com/stream/${row.original.alias}`}
            target='_blank'
            rel='noopener noreferrer'
            style={{ color: `${row.original.color}`, opacity: 0.9 }}
            onClick={event => event.stopPropagation()}>
            <u>{row.original.alias}</u>
          </a>
        </span>
      ),
    },
    {
      accessorKey: 'asset.symbol',
      header: () => <span className='font-bold text-slate-100 text-center'>Asset</span>,
    },
    {
      id: 'currentAmount',
      accessorKey: 'currentAmount',
      header: () => <span className='font-bold text-slate-100 text-center'>Current Amount</span>,
      cell: ({ row }) => {
        const remainingAmount = getBalance([row.original], date);
        return <div className='font-medium'>{formatUsdAmount(Number(remainingAmount))}</div>;
      },
    },
    {
      id: 'forecastAmount',
      accessorKey: 'forecastAmount',
      header: () => <span className='font-bold text-slate-100 text-center'>Forecast Amount</span>,
      cell: ({ row }) => (
        <div className='font-medium'>
          {formatUsdAmount(Number(getRemainingAmount(row.original)))}
          {!row.original.cancelable && <strong className='text-sablier'> (sure)</strong>}
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
