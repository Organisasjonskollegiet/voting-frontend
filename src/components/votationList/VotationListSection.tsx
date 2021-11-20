import React from 'react';
import VotationForm from './forms/VotationForm';
import { Droppable } from 'react-beautiful-dnd';
import { Heading, VStack } from '@chakra-ui/react';

import { Votation } from '../../types/types';
import StartNextVotationButton from '../meetingLobby/StartNextVotationButton';

export interface VotationListSectionProps {
  votations: Votation[];
  setActiveVotationId: (id: string) => void;
  activeVotationId: string;
  updateVotation: (votation: Votation) => void;
  handleDeleteVotation: (votation: Votation) => void;
  handleDeleteAlternative: (alternativeId: string, votationId: string) => void;
  duplicateVotation: (votation: Votation) => void;
  checkIfAnyChanges: () => boolean;
  handleSaveChanges: () => Promise<void>;
  showStartNextButton: boolean;
  heading?: string;
  droppableId?: string;
  isAdmin: boolean;
}

const VotationListSection: React.FC<VotationListSectionProps> = ({
  votations,
  setActiveVotationId,
  activeVotationId,
  updateVotation,
  handleDeleteVotation,
  handleDeleteAlternative,
  duplicateVotation,
  checkIfAnyChanges,
  handleSaveChanges,
  showStartNextButton,
  heading,
  droppableId,
  isAdmin,
}) => {
  return (
    <VStack spacing="16px" alignItems="start">
      {heading && votations.length > 0 && (
        <Heading as="h1" fontSize="1em" mb="1.125em">
          {heading}
        </Heading>
      )}
      <Droppable droppableId={droppableId ?? 'votation-list'} isDropDisabled={!isAdmin}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {votations.map((votation: Votation, index: number) => (
              <VotationForm
                toggleCollapsedVotation={() => setActiveVotationId(votation.id)}
                isActive={votation.id === activeVotationId}
                votation={votation}
                index={index}
                key={votation.id}
                updateVotation={updateVotation}
                deleteVotation={handleDeleteVotation}
                deleteAlternative={handleDeleteAlternative}
                duplicateVotation={duplicateVotation}
                isAdmin={isAdmin}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      {showStartNextButton && votations.length > 0 && votations[0].existsInDb && (
        <StartNextVotationButton checkIfAnyChanges={checkIfAnyChanges} handleSaveChanges={handleSaveChanges} />
      )}
    </VStack>
  );
};
export default VotationListSection;
