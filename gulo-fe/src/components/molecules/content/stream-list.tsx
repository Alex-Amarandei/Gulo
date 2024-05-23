import StreamModal from '@/components/atoms/stream-modal';
import { useStreams } from '@/components/contexts/streams-context';
import { StreamInfoListProps } from '@/interfaces/props';
import { StreamInfo } from '@/interfaces/stream-info';
import { formatDecimals } from '@/utils/format';
import { useEffect, useState } from 'react';

export default function StreamList({ streams }: StreamInfoListProps) {
  const [selectedStream, setSelectedStream] = useState<StreamInfo | null>(null);
  const { selectedStreams, setSelectedStreams } = useStreams();

  useEffect(() => {}, [selectedStreams]);

  const handleCardClick = (stream: StreamInfo) => {
    setSelectedStream(stream);
  };

  const handleCloseModal = () => {
    setSelectedStream(null);
  };

  const handleSelectStream = (
    stream: StreamInfo,
    event: React.MouseEvent<HTMLInputElement, MouseEvent> | React.ChangeEvent<HTMLInputElement>,
  ) => {
    event.stopPropagation();
    stream.isSelected = !stream.isSelected;

    if (stream.isSelected) {
      setSelectedStreams(selectedStreams.concat(stream));
    } else {
      setSelectedStreams(selectedStreams.filter(s => s.id !== stream.id));
    }
  };

  return (
    <div className="overflow-auto text-slate-100 p-4">
      {streams.map(stream => {
        return (
          <div
            key={stream.id}
            className="flex items-center p-4 mb-6 bg-gradient-to-br from-gray-700 to-gray-800 bg-opacity-90 rounded-lg shadow-2xl transform transition-transform duration-300 hover:scale-105 cursor-pointer"
            onClick={() => handleCardClick(stream)}>
            <input
              type="checkbox"
              checked={stream.isSelected}
              className="h-6 w-6 text-gray-800 rounded-lg focus:ring-0 focus:ring-transparent focus:ring-offset-0 border-none"
              onClick={event => handleSelectStream(stream, event)}
              onChange={() => {}}
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
            <img src={stream.nft} alt="SVG" className="w-1/4 h-1/2 object-contain ml-4 rounded-lg" />
          </div>
        );
      })}

      {selectedStream && <StreamModal stream={selectedStream} onClose={handleCloseModal} />}
    </div>
  );
}
