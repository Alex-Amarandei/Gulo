import { StreamInfo } from '@/interfaces/stream-info';
import { isCircular } from '@/utils/balances';
import { Address } from 'viem';



import areAddressesEqual from './adresses';


export const selectAll = (streams: StreamInfo[]): StreamInfo[] => {
  return streams.map(stream => {
    stream.isSelected = true;
    return stream;
  });
};

export const selectNone = (streams: StreamInfo[]): StreamInfo[] => {
  streams.forEach(stream => {
    stream.isSelected = false;
  });

  return [];
};

export const selectCircular = (streams: StreamInfo[]): StreamInfo[] => {
  return streams.filter(stream => {
    stream.isSelected = isCircular(stream);
    return isCircular(stream);
  });
};

export const selectNonCircular = (streams: StreamInfo[]): StreamInfo[] => {
  return streams.filter(stream => {
    stream.isSelected = !isCircular(stream);
    return !isCircular(stream);
  });
};

export const selectIn = (streams: StreamInfo[], address: Address | undefined): StreamInfo[] => {
  return streams.filter(stream => {
    const areEqual = areAddressesEqual(stream.recipient, address);
    stream.isSelected = areEqual;
    return areEqual;
  });
};

export const selectOut = (streams: StreamInfo[], address: Address | undefined): StreamInfo[] => {
  return streams.filter(stream => {
    const areEqual = areAddressesEqual(stream.sender, address);
    stream.isSelected = areEqual;
    return areEqual;
  });
};

export const selectCancelable = (streams: StreamInfo[]): StreamInfo[] => {
  return streams.filter(stream => {
    stream.isSelected = stream.cancelable === true;
    return stream.cancelable === true;
  });
};

export const selectNonCancelable = (streams: StreamInfo[]): StreamInfo[] => {
  return streams.filter(stream => {
    stream.isSelected = stream.cancelable === false;
    return stream.cancelable === false;
  });
};