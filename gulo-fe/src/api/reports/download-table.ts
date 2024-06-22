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
  email?: string,
) {
  const apiGatewayEndpoint = process.env.API_GATEWAY_ENDPOINT + '/reports';

  const body = JSON.stringify(
    {
      streams: prepareForDownload(streams, balanceType, downloadType, date, dateRange),
      balanceType,
      date,
      dateRange,
      downloadType,
      email,
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
    if (apiGatewayEndpoint === undefined) {
      toast.error("Oops. That's on us. Please try again later. 🙏");
      return;
    }

    const response = await fetch(apiGatewayEndpoint, options);

    if (!response.ok) {
      toast.error('There was a problem generating your file. Please hang on for a minute! ⏱️');
      return;
    }

    const data = await response.json();
    const address = getAccount(WAGMI_CONFIG).address;

    if (email === undefined) {
      download(data, address, downloadType);
    }

    toast.success('File generated successfully! 📝');
    return data;
  } catch (error) {
    toast.error("Oops. That's on us. Please try again later. 🙏");
    throw error;
  }
}
