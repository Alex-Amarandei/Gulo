import { InfoModalProps } from '@/interfaces/props';

export default function InfoModal({ onClose }: InfoModalProps) {
  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-opacity-90 bg-gray-900 flex items-center justify-center z-50"
      onClick={handleOverlayClick}>
      <div className="relative bg-orange-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-5 text-slate-100 p-6 rounded-lg max-w-lg w-full shadow-xl">
        <button
          className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-800 transition-colors sablier-orange"
          onClick={onClose}
          aria-label="Close">
          <svg
            className="w-6 h-6 sablier-orange"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h3 className="text-xl font-bold mb-2">Info Modal</h3>
        <p className="text-sm">This is an info modal.</p>
      </div>
    </div>
  );
}
