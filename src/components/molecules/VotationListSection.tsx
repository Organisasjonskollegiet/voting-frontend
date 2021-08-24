import React from 'react';
import AddVotationForm from './AddVotationForm';
import { Droppable } from 'react-beautiful-dnd';
import { Button, Heading, VStack } from '@chakra-ui/react';

import { Votation } from '../../types/types';

interface VotationListSectionProps {
  votations: Votation[];
  setActiveVotationId: (id: string) => void;
  activeVotationId: string;
  updateVotation: (votation: Votation) => void;
  handleDeleteVotation: (votation: Votation) => void;
  handleDeleteAlternative: (alternativeId: string, votationId: string) => void;
  duplicateVotation: (votation: Votation) => void;
  openVotation: () => void;
  showStartNextButton: boolean;
  heading?: string;
  droppableId: string;
  disabled: boolean;
}

const VotationListSection: React.FC<VotationListSectionProps> = ({
  votations,
  setActiveVotationId,
  activeVotationId,
  updateVotation,
  handleDeleteVotation,
  handleDeleteAlternative,
  duplicateVotation,
  openVotation,
  showStartNextButton,
  heading,
  droppableId,
  disabled,
}) => {
  return (
    <VStack spacing="16px" alignItems="start">
      {heading && (
        <Heading as="h1" fontSize="1em" mb="1.125em">
          {heading}
        </Heading>
      )}
      <Droppable droppableId={droppableId} isDropDisabled={disabled}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {votations.map((votation: Votation) => (
              <AddVotationForm
                toggleCollapsedVotation={() => setActiveVotationId(votation.id)}
                isActive={votation.id === activeVotationId}
                votation={votation}
                index={votation.index}
                key={votation.id}
                updateVotation={updateVotation}
                deleteVotation={handleDeleteVotation}
                deleteAlternative={handleDeleteAlternative}
                duplicateVotation={duplicateVotation}
                disabled={true}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      {showStartNextButton && (
        <Button onClick={openVotation} w={'250px'} bg="green" color="white" borderRadius={'16em'}>
          Start neste votering
        </Button>
      )}
    </VStack>
  );
};

export default VotationListSection;
