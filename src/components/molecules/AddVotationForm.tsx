import React, { useState } from 'react';
import { VStack, Divider, HStack, Text, IconButton, Box, Tooltip } from '@chakra-ui/react';
import DeleteIcon from '../../static/deleteIcon.svg';
import DuplicateIcon from '../../static/duplicateIcon.svg';
import { VotationType } from '../../__generated__/graphql-types';
import { Draggable } from 'react-beautiful-dnd';
import AlternativesForm from '../atoms/AlternativesForm';
import VotationTypeSelect from '../atoms/VotationTypeSelect';
import VotationCheckboxes from '../atoms/VotationCheckboxes';
import VotationInfoForm from '../atoms/VotationInfoForm';
import { collapsedStyle, highlightedStyle, containerStyle } from '../particles/formStyles';
import { Votation } from '../../types/types';
import DeleteAlertDialog, { DeleteAlternative } from '../atoms/DeleteAlertDialog';
import { DragHandleIcon } from '@chakra-ui/icons';
import { expandAndLift } from '../particles/styles';

interface IProps {
  index: number;
  isActive: boolean;
  votation: Votation;
  toggleCollapsedVotation: () => void;
  updateVotation: (votation: Votation) => void;
  deleteVotation: (votation: Votation) => void;
  duplicateVotation: (votation: Votation) => void;
  deleteAlternative: (alternativeId: string, votationId: string) => void;
  isAdmin: boolean;
}

const AddVotationForm: React.FC<IProps> = ({
  votation,
  index,
  isActive,
  toggleCollapsedVotation,
  updateVotation,
  deleteVotation,
  duplicateVotation,
  deleteAlternative,
  isAdmin,
}) => {
  const [votationDialogIsOpen, setVotationDialogIsOpen] = useState(false);

  const handleConfirmDelete = () => {
    deleteVotation(votation);
  };

  const updateVotationType = (newType: VotationType, newMajorityThreshold = 50) => {
    updateVotation({
      ...votation,
      isEdited: true,
      type: newType,
      majorityThreshold: newMajorityThreshold,
    });
  };

  const updateNumberOfWinners = (newNumberOfWinners: number) => {
    console.log({ newNumberOfWinners });

    updateVotation({
      ...votation,
      isEdited: true,
      numberOfWinners: newNumberOfWinners,
    });
  };

  if (!isActive || !isAdmin) {
    return (
      <Draggable isDragDisabled={!isAdmin} draggableId={votation.id} index={index}>
        {(provided) => (
          <HStack
            w="90vw"
            maxWidth="800px"
            ref={provided.innerRef}
            {...provided.draggableProps}
            justify="space-between"
            marginBottom="16px"
            sx={collapsedStyle}
            cursor="pointer"
            onClick={toggleCollapsedVotation}
            _hover={expandAndLift}
          >
            <HStack spacing="8">
              <Text sx={highlightedStyle}>{`${index + 1}`}</Text>
              <Text>{votation.title}</Text>
            </HStack>
            {isAdmin && (
              <Box {...provided.dragHandleProps}>
                <DragHandleIcon />
              </Box>
            )}
          </HStack>
        )}
      </Draggable>
    );
  }

  return (
    <Draggable isDragDisabled={true} draggableId={votation.id} index={index}>
      {(provided) => (
        <VStack
          sx={containerStyle}
          ref={provided.innerRef}
          {...provided.draggableProps}
          width="90vw"
          maxWidth="800px"
          spacing="5"
        >
          <HStack flexWrap={'wrap'} spacing="10" width="100%" align="start">
            <VStack spacing="7" flex="2">
              <VotationInfoForm votation={votation} updateVotation={updateVotation} />
              <AlternativesForm
                votation={votation}
                updateVotation={updateVotation}
                deleteAlternative={deleteAlternative}
              />
            </VStack>
            <VStack flex="1" spacing="7" align="left">
              <VotationTypeSelect
                votation={votation}
                updateVotationType={updateVotationType}
                updateNumberOfWinners={updateNumberOfWinners}
              />
              <VotationCheckboxes votation={votation} updateVotation={updateVotation} />
            </VStack>
          </HStack>
          <Divider m="3em 0" />
          <Box align="right" width="100%">
            <Tooltip label="Slett votering">
              <IconButton
                aria-label="Slett votering"
                bg={'white'}
                onClick={() => setVotationDialogIsOpen(true)}
                icon={<img alt="delete" src={DeleteIcon} />}
              />
            </Tooltip>
            <Tooltip label="Dupliser votering">
              <IconButton
                aria-label="Dupliser votering"
                bg={'white'}
                onClick={() => duplicateVotation(votation)}
                icon={<img alt="duplicate" src={DuplicateIcon} />}
              />
            </Tooltip>
          </Box>
          <DeleteAlertDialog
            dialogIsOpen={votationDialogIsOpen}
            handleConfirmDelete={handleConfirmDelete}
            handleCancelDelete={() => setVotationDialogIsOpen(false)}
            type={DeleteAlternative.VOTATION}
          />
        </VStack>
      )}
    </Draggable>
  );
};

export default AddVotationForm;
