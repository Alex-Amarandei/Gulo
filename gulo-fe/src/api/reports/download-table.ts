import { BalanceType, DownloadType } from '@/constants/enums';
import { Stream } from '@/interfaces/stream';
import { DateRange } from 'react-day-picker';
import { toast } from 'sonner';

function saveTextAsFile(text: string, filename: string) {
  const blob = new Blob([text], { type: 'text/plain' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export async function downloadTable(
  streams: Stream[],
  balanceType: BalanceType,
  date: Date | undefined,
  dateRange: DateRange | undefined,
  downloadType: DownloadType,
) {
  const endpoint = 'https://mciqhau6bprq5w5h5wdcimegly0caohq.lambda-url.eu-central-1.on.aws/';

  const body = JSON.stringify(
    {
      streams,
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
    const response = await fetch(endpoint, options);

    if (!response.ok) {
      const errorMessage = `HTTP error! status: ${response.status}`;
      toast.error(errorMessage);
      return;
    }

    const data = await response.json();

    const dataString = JSON.stringify(data, null, 2);
    saveTextAsFile(dataString, 'response.json');

    toast.success('Request successful!');
    return data;
  } catch (error) {
    toast.error('An error occurred while processing your request.');
    throw error;
  }
}
