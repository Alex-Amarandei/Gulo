import { useStreams } from '../contexts/streams-context';

export default function BalanceWidget() {
  const { streams, selectedStreams } = useStreams();

  return (
    <div className="text-slate-100">
      {streams.map(stream => (
        <p key={stream.alias}>{`${stream.alias} ${stream.isSelected}`}</p>
      ))}
      <hr />
      {selectedStreams.map(stream => (
        <p key={stream.alias}>{`${stream.alias} ${stream.isSelected}`}</p>
      ))}
    </div>
  );
}
