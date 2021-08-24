import React, { useEffect, useState } from 'react';
import AddVotationForm from './AddVotationForm';
import { v4 as uuid } from 'uuid';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { Box, Button, Center, Heading, HStack, useToast, VStack, Text } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import {
  MajorityType,
  useCreateVotationsMutation,
  useDeleteAlternativesMutation,
  useDeleteVotationsMutation,
  useUpdateVotationsMutation,
  useUpdateVotationStatusMutation,
  useVotationsByMeetingIdLazyQuery,
  VotationStatus,
} from '../../__generated__/graphql-types';
import { Votation, Alternative } from '../../types/types';
import Loading from '../atoms/Loading';
import { darkblue } from '../particles/theme';
import { collapsedStyle, highlightedStyle } from '../particles/formStyles';

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
}) => {
  return (
    <VStack spacing="16px" alignItems="start">
      {heading && (
        <Heading as="h1" fontSize="1em" mb="1.125em">
          {heading}
        </Heading>
      )}
      <Droppable droppableId={droppableId}>
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
