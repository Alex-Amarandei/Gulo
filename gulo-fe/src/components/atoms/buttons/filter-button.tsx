import { useState } from 'react';

import { FilterButtonProps } from '@/interfaces/props';

export default function FilterButton({ first, second, onFirstClick, onSecondClick }: FilterButtonProps) {
  const [label, setLabel] = useState(first);

  const handleClick = () => {
    label === first ? onFirstClick() : onSecondClick();
    setLabel(prevLabel => (prevLabel === first ? second : first));
  };

  return (
    <button
      onClick={handleClick}
      className='text-slate-100 bg-gradient-to-br from-gray-600 to-gray-700 rounded-lg transform transition-transform duration-300 hover:scale-105 cursor-pointer px-4 py-2 mb-2'>
      <strong>{label}</strong>
    </button>
  );
}
