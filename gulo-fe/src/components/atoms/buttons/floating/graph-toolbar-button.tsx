import { useState } from 'react';

import { faInfoCircle, faMagnet, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface GraphToolbarButtonProps {
  firstIcon: JSX.Element;
  secondIcon: JSX.Element;
  onFirstClick: () => void;
  onSecondClick: () => void;
}

const GraphToolbarButton: React.FC<GraphToolbarButtonProps> = ({
  firstIcon,
  secondIcon,
  onFirstClick,
  onSecondClick,
}) => {
  const [isFirst, setIsFirst] = useState(true);

  const handleClick = () => {
    if (isFirst) {
      onFirstClick();
    } else {
      onSecondClick();
    }
    setIsFirst(!isFirst);
  };

  return (
    <button
      onClick={handleClick}
      className='fixed top-100 right-10 z-50 text-slate-100 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full transform transition-transform duration-300 hover:scale-105 cursor-pointer py-4 px-5 focus:ring-0 focus:ring-transparent focus:outline-none'>
      {isFirst ? firstIcon : secondIcon}
    </button>
  );
};

const EnablingPhysicsIcon = () => (
  <span className='flex items-center'>
    <FontAwesomeIcon icon={faMagnet} className='text-slate-100 text-2xl' />
  </span>
);

const DisablingPhysicsIcon = () => (
  <span className='flex items-center'>
    <FontAwesomeIcon icon={faMagnet} className='text-slate-100 text-2xl' />
    <FontAwesomeIcon icon={faTimes} className='text-slate-100 text-2xl ml-1' />
  </span>
);

const InfoIcon = () => (
  <span className='flex items-center'>
    <FontAwesomeIcon icon={faInfoCircle} className='text-slate-100 text-2xl' />
  </span>
);

export { DisablingPhysicsIcon, EnablingPhysicsIcon, GraphToolbarButton, InfoIcon };
