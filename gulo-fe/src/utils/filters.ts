import Stream from '@/interfaces/stream';
import { StreamInfo } from '@/interfaces/stream-info';
import areAddressesEqual from '@/utils/adresses';
import { Address } from 'viem';

function isCircular(stream: Stream): boolean {
  return areAddressesEqual(stream.sender, stream.recipient);
}

function isIncoming(stream: Stream, address: Address | undefined): boolean {
  return areAddressesEqual(stream.recipient, address) && !isCircular(stream);
}

function isOutgoing(stream: Stream, address: Address | undefined): boolean {
  return areAddressesEqual(stream.sender, address) && !isCircular(stream);
}

export function hasNotStarted(stream: Stream, timestamp: number): boolean {
  return timestamp < Number(stream.startTime);
}

export function isOutgoingCancelable(stream: Stream, address: Address | undefined): boolean {
  return isOutgoing(stream, address) && stream.cancelable;
}

export function isOutgoingNonCancelable(stream: Stream, address: Address | undefined): boolean {
  return isOutgoing(stream, address) && !stream.cancelable;
}

export function isCircularCancelable(stream: Stream): boolean {
  return isCircular(stream) && stream.cancelable;
}

export function isLinear(stream: Stream): boolean {
  return stream.category === 'LockupLinear';
}

export function hasCliff(stream: Stream): boolean {
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
    stream.isSelected = isIncoming(stream, address);
    return stream.isSelected;
  });
};

export const selectOut = (streams: StreamInfo[], address: Address | undefined): StreamInfo[] => {
  return streams.filter(stream => {
    stream.isSelected = isOutgoing(stream, address);
    return stream.isSelected;
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
