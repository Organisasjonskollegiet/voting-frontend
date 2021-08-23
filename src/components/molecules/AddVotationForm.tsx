import React, { useState } from 'react';
import { VStack, Divider, HStack, Text, IconButton, Box } from '@chakra-ui/react';
import DeleteIcon from '../../static/deleteIcon.svg';
import DuplicateIcon from '../../static/duplicateIcon.svg';
import { MajorityType } from '../../__generated__/graphql-types';
import { Draggable } from 'react-beautiful-dnd';
import AlternativesForm from '../atoms/AlternativesForm';
import VotationTypeSelect from '../atoms/VotationTypeSelect';
import VotationCheckboxes from '../atoms/VotationCheckboxes';
import VotationInfoForm from '../atoms/VotationInfoForm';
import { collapsedStyle, highlightedStyle, containerStyle } from '../particles/formStyles';
import { Votation } from '../../types/types';
import DeleteAlertDialog from '../atoms/DeleteAlertDialog';
import { DragHandleIcon } from '@chakra-ui/icons';

interface IProps {
  index: number;
  isActive: boolean;
  votation: Votation;
  toggleCollapsedVotation: () => void;
  updateVotation: (votation: Votation) => void;
  deleteVotation: (votation: Votation) => void;
  duplicateVotation: (votation: Votation) => void;
  deleteAlternative: (id: string) => void;
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
}) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  const handleConfirmDelete = () => {
    deleteVotation(votation);
  };

  const updateVotationFromSelect = (value: string) => {
    switch (value) {
      case 'SIMPLE':
        updateVotation({ ...votation, isEdited: true, majorityType: 'SIMPLE' as MajorityType });
        break;
      case 'QUALIFIED50':
        updateVotation({
          ...votation,
          isEdited: true,
          majorityType: 'QUALIFIED' as MajorityType,
          majorityThreshold: 50,
        });
        break;
      case 'QUALIFIED67':
        updateVotation({
          ...votation,
          isEdited: true,
          majorityType: 'QUALIFIED' as MajorityType,
          majorityThreshold: 67,
        });
        break;
      default:
        break;
    }
  };

  if (!isActive) {
    return (
      <Draggable draggableId={votation.id} index={index}>
        {(provided) => (
          <HStack
            ref={provided.innerRef}
            {...provided.draggableProps}
            justify="space-between"
            marginBottom="16px"
            sx={collapsedStyle}
            onClick={toggleCollapsedVotation}
          >
            <HStack spacing="8">
              <Text sx={highlightedStyle}>{`${index + 1}`}</Text>
              <Text>{votation.title}</Text>
            </HStack>
            <Box {...provided.dragHandleProps}>
              <DragHandleIcon />
            </Box>
          </HStack>
        )}
      </Draggable>
    );
  }

  return (
    <Draggable isDragDisabled={true} draggableId={votation.id} index={index}>
      {(provided) => (
        <VStack sx={containerStyle} ref={provided.innerRef} {...provided.draggableProps} width="100%" spacing="5">
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
              <VotationTypeSelect votation={votation} updateVotationFromSelect={updateVotationFromSelect} />
              <VotationCheckboxes votation={votation} updateVotation={updateVotation} />
            </VStack>
          </HStack>
          <Divider m="3em 0" />
          <Box align="right" width="100%">
            <IconButton
              aria-label="Slett votering"
              bg={'white'}
              onClick={() => setDialogIsOpen(true)}
              icon={<img alt="delete" src={DeleteIcon} />}
            />
            <IconButton
              aria-label="Dupliser votering"
              bg={'white'}
              onClick={() => duplicateVotation(votation)}
              icon={<img alt="duplicate" src={DuplicateIcon} />}
            />
          </Box>
          <DeleteAlertDialog
            dialogIsOpen={dialogIsOpen}
            handleConfirmDelete={handleConfirmDelete}
            handleCancelDelete={() => setDialogIsOpen(false)}
            type="votation"
          />
        </VStack>
      )}
    </Draggable>
  );
};

export default AddVotationForm;
