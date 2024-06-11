import { BalanceType, DownloadType } from '@/constants/enums';
import { Stream, StreamActualRow, StreamForecastRow } from '@/interfaces/stream';
import getBalance, { getRemainingAmount, getStreamedAmountForDateRange } from '@/utils/balances';
import { Maybe } from '@/utils/data';
import { formatUsdAmount, getFileName } from '@/utils/formats';
import { saveAs } from 'file-saver';
import { DateRange } from 'react-day-picker';
import { Address } from 'viem';

function prepareForActual(streams: Stream[], dateRange: Maybe<DateRange>): StreamActualRow[] {
  return streams.map(stream => {
    return {
      alias: stream.alias,
      asset: stream.asset.symbol,
      from: stream.sender,
      to: stream.recipient,
      streamedAmount: formatUsdAmount(getStreamedAmountForDateRange(stream, dateRange)),
      color: stream.color,
    };
  });
}

function prepareForForecast(streams: Stream[], date: Maybe<Date>): StreamForecastRow[] {
  return streams.map(stream => {
    return {
      alias: stream.alias,
      asset: stream.asset.symbol,
      from: stream.sender,
      to: stream.recipient,
      currentAmount: formatUsdAmount(Number(getBalance([stream], date))),
      forecastAmount: formatUsdAmount(Number(getRemainingAmount(stream))),
      sure: !stream.cancelable,
      color: stream.color,
    };
  });
}

export function prepareForDownloadXlsx(
  streams: Stream[],
  balanceType: BalanceType,
  date?: Maybe<Date>,
  dateRange?: Maybe<DateRange>,
): StreamActualRow[] | StreamForecastRow[] {
  switch (balanceType) {
    case BalanceType.Actual:
      return prepareForActual(streams, dateRange);
    case BalanceType.Forecast:
      return prepareForForecast(streams, date);
    default:
      return [];
  }
}

export function downloadXlsx(data: any, address: Maybe<Address>) {
  const base64String = data.fileContent;
  const binaryString = atob(base64String);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);

  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  const blob = new Blob([bytes], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

  saveAs(blob, getFileName(address, DownloadType.XLSX));
}
