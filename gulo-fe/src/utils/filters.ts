import { Stream } from '@/interfaces/stream';
import areAddressesEqual from '@/utils/adresses';
import { Address } from 'viem';

export function isCircular(stream: Stream): boolean {
  return areAddressesEqual(stream.sender, stream.recipient);
}

export function isIncoming(stream: Stream, address: Address | undefined): boolean {
  return areAddressesEqual(stream.recipient, address) && !isCircular(stream);
}

export function isOutgoing(stream: Stream, address: Address | undefined): boolean {
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

export function isCanceled(stream: Stream): boolean {
  return stream.canceled;
}

export function hasCliff(stream: Stream): boolean {
  return stream.cliffTime !== null;
}

export const selectAll = (streams: Stream[]): Stream[] => {
  return streams.map(stream => {
    stream.isSelected = true;
    return stream;
  });
};

export const selectNone = (streams: Stream[]): Stream[] => {
  streams.forEach(stream => {
    stream.isSelected = false;
  });

  return [];
};

export const selectCircular = (streams: Stream[]): Stream[] => {
  return streams.filter(stream => {
    stream.isSelected = isCircular(stream);
    return isCircular(stream);
  });
};

export const selectNonCircular = (streams: Stream[]): Stream[] => {
  return streams.filter(stream => {
    stream.isSelected = !isCircular(stream);
    return !isCircular(stream);
  });
};

export const selectIn = (streams: Stream[], address: Address | undefined): Stream[] => {
  return streams.filter(stream => {
    stream.isSelected = isIncoming(stream, address);
    return stream.isSelected;
  });
};

export const selectOut = (streams: Stream[], address: Address | undefined): Stream[] => {
  return streams.filter(stream => {
    stream.isSelected = isOutgoing(stream, address);
    return stream.isSelected;
  });
};

export const selectCancelable = (streams: Stream[]): Stream[] => {
  return streams.filter(stream => {
    stream.isSelected = stream.cancelable === true;
    return stream.cancelable === true;
  });
};

export const selectNonCancelable = (streams: Stream[]): Stream[] => {
  return streams.filter(stream => {
    stream.isSelected = stream.cancelable === false;
    return stream.cancelable === false;
  });
};

export const filterNonCircular = (streams: Stream[]): Stream[] => {
  return streams.filter(stream => {
    return !isCircular(stream);
  });
};
