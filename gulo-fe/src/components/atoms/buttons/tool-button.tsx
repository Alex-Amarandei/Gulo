import { ToolButtonProps } from '@/interfaces/props';

export default function ToolButton({ children, onClick }: ToolButtonProps) {
  return (
    <button
      className='text-slate-100 bg-gradient-to-br from-gray-600 to-gray-700 rounded-lg transform transition-transform duration-300 hover:scale-105 cursor-pointer px-4 py-2 mb-2'
      onClick={onClick}>
      <strong>{children}</strong>
    </button>
  );
}
