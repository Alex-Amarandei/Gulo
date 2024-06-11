import { saveTextAsFile } from '@/api/utils/io';
import { BalanceType, DownloadType } from '@/constants/enums';
import { Stream, StreamActualRow, StreamForecastRow } from '@/interfaces/stream';
import getBalance, { getRemainingAmount, getStreamedAmountForDateRange } from '@/utils/balances';
import { Maybe } from '@/utils/data';
import { formatUsdAmount, getFileName } from '@/utils/formats';
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
    };
  });
}

export function prepareForDownloadCsv(
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

export function downloadCsv(data: any, address: Maybe<Address>) {
  const base64String = data.fileContent;
  const csvString = atob(base64String);

  saveTextAsFile(csvString, getFileName(address, DownloadType.CSV));
}
