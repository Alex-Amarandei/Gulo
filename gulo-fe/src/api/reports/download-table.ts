import { download, prepareForDownload } from '@/api/reports/handlers/handle-download';
import { BalanceType, DownloadType } from '@/constants/enums';
import { Stream } from '@/interfaces/stream';
import WAGMI_CONFIG from '@/utils/configs';
import { Maybe } from '@/utils/data';
import { getAccount } from '@wagmi/core';
import dotenv from 'dotenv';
import { DateRange } from 'react-day-picker';
import { toast } from 'sonner';

dotenv.config();

export async function downloadTable(
  streams: Stream[],
  balanceType: BalanceType,
  date: Maybe<Date>,
  dateRange: Maybe<DateRange>,
  downloadType: DownloadType,
) {
  const body = JSON.stringify(
    {
      streams: prepareForDownload(streams, balanceType, downloadType, date, dateRange),
      balanceType,
      date,
      dateRange,
      downloadType,
    },
    (_, value) => (typeof value === 'bigint' ? value.toString() : value),
  );

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  };

  try {
    const lambdaEndpoint = process.env.LAMBDA_ENDPOINT;

    if (lambdaEndpoint === undefined) {
      toast.error("Oops. It's on us! Please try again in a few minutes.");
      return;
    }

    const response = await fetch(lambdaEndpoint, options);

    if (!response.ok) {
      const errorMessage = `HTTP error! status: ${response.status}`;
      toast.error(errorMessage);
      return;
    }

    const data = await response.json();
    const address = getAccount(WAGMI_CONFIG).address;

    download(data, address, downloadType);

    toast.success('File generated successfully!');
    return data;
  } catch (error) {
    toast.error("Oops. It's on us! Please try again in a few minutes.");
    throw error;
  }
}
