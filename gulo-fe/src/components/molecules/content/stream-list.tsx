import StreamModal from '@/components/atoms/stream-modal';
import { StreamInfoListProps } from '@/interfaces/props';
import { StreamInfo } from '@/interfaces/stream-info';
import { formatDecimals } from '@/utils/convert/format';
import { useState } from 'react';

export default function StreamList({ streams }: StreamInfoListProps) {
  const [selectedStream, setSelectedStream] = useState<StreamInfo | null>(null);

  const handleCardClick = (stream: StreamInfo) => {
    setSelectedStream(stream);
  };

  const handleCloseModal = () => {
    setSelectedStream(null);
  };

  return (
    <div className="overflow-auto text-white p-4">
      {streams.map((stream) => {
        return (
          <div
            key={stream.id}
            className="flex items-center p-4 mb-6 bg-gradient-to-br from-gray-700 to-gray-800 bg-opacity-90 rounded-lg shadow-2xl transform transition-transform duration-300 hover:scale-105 cursor-pointer"
            onClick={() => handleCardClick(stream)}
          >
            <input
              type="checkbox"
              className="h-6 w-6 text-gray-800 border-gray-600 checked:ring-gray-800 focus:ring-gray-800"
            />
            <div className="flex-grow mx-4 pl-6">
              <h3 className="text-lg font-bold mb-2">{stream.alias}</h3>
              <p className="text-sm">
                <strong>Deposited Amount:</strong> {formatDecimals(stream.depositAmount)} {stream.asset.symbol}
              </p>
              <p className="text-sm">
                <strong>Withdrawn Amount:</strong> {formatDecimals(stream.withdrawnAmount)} {stream.asset.symbol}
              </p>
              <p className="text-sm">
                <strong>Is Cancelable:</strong> {stream.cancelable ? 'Yes' : 'No'}
              </p>
            </div>
            <img src={stream.nft} alt="SVG" className="w-1/4 h-1/2 object-contain ml-4" />
          </div>
        );
      })}

      {selectedStream && <StreamModal stream={selectedStream} onClose={handleCloseModal} />}
    </div>
  );
}
