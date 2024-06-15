import React from 'react';

import {
  DisablingPhysicsIcon,
  EnablingPhysicsIcon,
  GraphToolbarButton,
} from '@/components/atoms/buttons/floating/graph-toolbar-button';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface GraphToolbarProps {
  enablePhysics: () => void;
  disablePhysics: () => void;
  openModal: () => void;
}

const InfoIcon = () => (
  <span>
    <FontAwesomeIcon icon={faInfoCircle} className='text-slate-100 text-2xl' />
  </span>
);

const GraphToolbar: React.FC<GraphToolbarProps> = ({ enablePhysics, disablePhysics, openModal }) => {
  return (
    <div className='fixed top-50 right-10 flex flex-col items-end space-y-20 z-50 focus:ring-0 focus:ring-transparent focus:outline-none'>
      <GraphToolbarButton
        firstIcon={<EnablingPhysicsIcon />}
        secondIcon={<DisablingPhysicsIcon />}
        onFirstClick={enablePhysics}
        onSecondClick={disablePhysics}
      />
      <GraphToolbarButton
        firstIcon={<InfoIcon />}
        secondIcon={<InfoIcon />}
        onFirstClick={openModal}
        onSecondClick={openModal}
      />
    </div>
  );
};

export default GraphToolbar;
