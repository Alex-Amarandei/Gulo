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

export const filterToMe = (streams: StreamInfo[], address: Address): StreamInfo[] => {
  const addressInLowerCase = address.toLowerCase();

  return streams.filter(stream => {
    const recipientInLowerCase = stream.recipient.toLowerCase();
    stream.isSelected = recipientInLowerCase === addressInLowerCase;
    return recipientInLowerCase === addressInLowerCase;
  });
};

export const filterFromMe = (streams: StreamInfo[], address: Address): StreamInfo[] => {
  const addressInLowerCase = address.toLowerCase();

  return streams.filter(stream => {
    const senderInLowerCase = stream.sender.toLowerCase();

    stream.isSelected = senderInLowerCase === addressInLowerCase;
    return senderInLowerCase === addressInLowerCase;
  });
};
