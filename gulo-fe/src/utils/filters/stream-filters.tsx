import { StreamInfo } from '@/interfaces/stream-info';
import { Address } from 'viem';

export const filterSelectAll = (streams: StreamInfo[]): StreamInfo[] => {
  return streams.map(stream => {
    stream.isSelected = true;
    return stream;
  });
};

export const filterUnselectAll = (streams: StreamInfo[]): StreamInfo[] => {
  streams.forEach(stream => {
    stream.isSelected = false;
  });

  return [];
};

export const filterUncancelable = (streams: StreamInfo[]): StreamInfo[] => {
  return streams.filter(stream => {
    stream.isSelected = stream.cancelable === false;
    return stream.cancelable === false;
  });
};

export const filterToMe = (streams: StreamInfo[], account: Address): StreamInfo[] => {
  return streams.filter(stream => {
    stream.isSelected = stream.recipient === account;
    return stream.recipient === account;
  });
};

export const filterFromMe = (streams: StreamInfo[], account: Address): StreamInfo[] => {
  return streams.filter(stream => {
    stream.isSelected = stream.sender === account;
    return stream.sender === account;
  });
};
