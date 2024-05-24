import { StreamInfo } from '@/interfaces/stream-info';
import areAddressesEqual from '@/utils/adresses';
import { Address } from 'viem';

function isCircular(stream: StreamInfo): boolean {
  return stream.sender === stream.recipient;
}

function isOutgoing(stream: StreamInfo, address: Address | undefined): boolean {
  return stream.sender === address && !isCircular(stream);
}

export function hasNotStarted(stream: StreamInfo, timestamp: number): boolean {
  return timestamp < Number(stream.startTime);
}

export function isOutgoingCancelable(stream: StreamInfo, address: Address | undefined): boolean {
  return isOutgoing(stream, address) && stream.cancelable;
}

export function isOutgoingNonCancelable(stream: StreamInfo, address: Address | undefined): boolean {
  return isOutgoing(stream, address) && !stream.cancelable;
}

export function isCircularCancelable(stream: StreamInfo): boolean {
  return isCircular(stream) && stream.cancelable;
}

export function isLinear(stream: StreamInfo): boolean {
  return stream.category === 'LockupLinear';
}

export function hasCliff(stream: StreamInfo): boolean {
  return stream.cliffTime !== null;
}

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
