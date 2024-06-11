import { BalanceType, DownloadType } from '@/constants/enums';
import { Stream, StreamActualRow, StreamForecastRow } from '@/interfaces/stream';
import { Maybe } from '@/utils/data';
import { DateRange } from 'react-day-picker';
import { Address } from 'viem';

import { downloadCsv, prepareForDownloadCsv } from './download-csv';
import { downloadJson, prepareForDownloadJson } from './download-json';

export function prepareForDownload(
  streams: Stream[],
  balanceType: BalanceType,
  downloadType: DownloadType,
  date?: Maybe<Date>,
  dateRange?: Maybe<DateRange>,
): Stream[] | StreamActualRow[] | StreamForecastRow[] {
  switch (downloadType) {
    case DownloadType.JSON:
      return prepareForDownloadJson(streams);
    case DownloadType.CSV:
      return prepareForDownloadCsv(streams, balanceType, date, dateRange);
    default:
      return [];
  }
}

export function download(data: any, address: Maybe<Address>, downloadType: DownloadType) {
  switch (downloadType) {
    case DownloadType.JSON:
      downloadJson(data, address);
      break;
    case DownloadType.CSV:
      downloadCsv(data, address);
      break;
    default:
      break;
  }
}
