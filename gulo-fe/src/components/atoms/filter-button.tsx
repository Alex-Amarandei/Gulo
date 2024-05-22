import { FilterButtonProps } from '@/interfaces/props';

export default function FilterButton({ text, onClick }: FilterButtonProps) {
  return (
    <button
      onClick={onClick}
      className="text-slate-100 bg-gradient-to-br from-gray-600 to-gray-700 rounded-lg transform transition-transform duration-300 hover:scale-105 cursor-pointer p-2 mb-2">
      <strong>{text}</strong>
    </button>
  );
}
