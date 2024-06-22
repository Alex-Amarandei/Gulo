import {
  DisablingPhysicsIcon,
  EnablingPhysicsIcon,
  GraphToolbarButton,
  InfoIcon,
} from '@/components/atoms/buttons/floating/graph-toolbar-button';
import { GraphToolbarProps } from '@/interfaces/props';

export const GraphToolbar = ({ enablePhysics, disablePhysics, openModal }: GraphToolbarProps) => {
  return (
    <div className='fixed top-50 right-10 flex flex-col items-end space-y-20 z-50 focus:ring-0 focus:ring-transparent focus:outline-none'>
      <GraphToolbarButton
        firstIcon={<EnablingPhysicsIcon />}
        secondIcon={<DisablingPhysicsIcon />}
        onFirstClick={enablePhysics}
        onSecondClick={disablePhysics}
      />
      {openModal && (
        <GraphToolbarButton
          firstIcon={<InfoIcon />}
          secondIcon={<InfoIcon />}
          onFirstClick={openModal}
          onSecondClick={openModal}
        />
      )}
    </div>
  );
};
