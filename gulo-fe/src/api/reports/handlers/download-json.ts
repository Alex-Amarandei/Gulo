import { saveTextAsFile } from '@/api/utils/io';
import { DownloadType } from '@/constants/enums';
import { Stream } from '@/interfaces/stream';
import { Maybe } from '@/utils/data';
import { getFileName } from '@/utils/formats';
import { Address } from 'viem';

export function prepareForDownloadJson(streams: Stream[]) {
  return streams;
}

export function downloadJson(data: any, address: Maybe<Address>) {
  const dataString = JSON.stringify(data, null, 2);
  saveTextAsFile(dataString, getFileName(address, DownloadType.JSON));
}
