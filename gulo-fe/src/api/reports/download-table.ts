import { BalanceType, DownloadType } from '@/constants/enums';
import { Stream } from '@/interfaces/stream';
import { DateRange } from 'react-day-picker';
import { toast } from 'sonner';

// Utility function to save the response as a text file
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
  // Endpoint URL
  const endpoint = 'https://mciqhau6bprq5w5h5wdcimegly0caohq.lambda-url.eu-central-1.on.aws/';

  // Body of the POST request
  const body = JSON.stringify({
    streams,
    balanceType,
    date,
    dateRange,
    downloadType,
  });

  // POST request options
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  };

  try {
    // Sending the POST request
    const response = await fetch(endpoint, options);

    // Checking for a successful response
    if (!response.ok) {
      const errorMessage = `HTTP error! status: ${response.status}`;
      toast.error(errorMessage);
      return;
    }

    // Parsing the response
    const data = await response.json();

    // Convert data to string and save as .txt file
    const dataString = JSON.stringify(data, null, 2);
    saveTextAsFile(dataString, 'response.txt');

    // Returning the parsed response
    toast.success('Request successful!');
    return data;
  } catch (error) {
    // Handling any errors
    toast.error('An error occurred while processing your request.');
    throw error;
  }
}
