import React, { useEffect, useRef, useState } from 'react';
import { VStack, Divider, IconButton, Box, Tooltip } from '@chakra-ui/react';
import DuplicateIcon from '../../../static/duplicateIcon.svg';
import { VotationType } from '../../../__generated__/graphql-types';
import { Draggable } from 'react-beautiful-dnd';
import AlternativesForm from './AlternativesForm';
import VotationTypeSelect from './VotationTypeSelect';
import VotationCheckboxes from './VotationCheckboxes';
import VotationInfoForm from './VotationInfoForm';
import { containerStyle } from '../../styles/formStyles';
import { Votation } from '../../../types/types';
import CustomAlertDialog, { DialogType } from '../../common/CustomAlertDialog';
import DeleteButton from '../../common/buttons/DeleteButton';
import CollapsedVotationForm from './CollapsedVotationForm';
import WrapStack from '../../common/layout/WrapStack';

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

  const ref = useRef<HTMLDivElement>(null);

  const handleConfirmDelete = () => {
    deleteVotation(votation);
  };

  useEffect(() => {
    if (isActive && ref && ref.current) ref.current.scrollIntoView({ behavior: 'smooth' });
  }, [isActive]);

  const updateVotationType = (newType: VotationType, newMajorityThreshold = 50) => {
    updateVotation({
      ...votation,
      isEdited: true,
      type: newType,
      majorityThreshold: newMajorityThreshold,
    });
  };

  const updateNumberOfWinners = (newNumberOfWinners: number) => {
    updateVotation({
      ...votation,
      isEdited: true,
      numberOfWinners: newNumberOfWinners,
    });
  };

  if (!isActive || !isAdmin) {
    return (
      <CollapsedVotationForm
        isAdmin={isAdmin}
        votation={votation}
        toggleCollapsedVotation={toggleCollapsedVotation}
        index={index}
      />
    );
  }

  return (
    <Draggable isDragDisabled={true} draggableId={votation.id} index={index}>
      {(provided) => (
        <Box ref={provided.innerRef} {...provided.draggableProps} onClick={(e) => e.stopPropagation()}>
          <VStack
            style={{ scrollMargin: '7rem' }}
            ref={ref}
            sx={containerStyle}
            width="90vw"
            maxWidth="800px"
            spacing="5"
          >
            <WrapStack breakpoint={690} width="100%" align="start">
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
            </WrapStack>
            <Divider m="3em 0" />
            <Box alignItems={'end'} width="100%">
              <DeleteButton onClick={() => setVotationDialogIsOpen(true)} label="Slett votering" />
              <Tooltip label="Dupliser votering">
                <IconButton
                  aria-label="Dupliser votering"
                  bg={'white'}
                  onClick={() => duplicateVotation(votation)}
                  icon={<img alt="duplicate" src={DuplicateIcon} />}
                />
              </Tooltip>
            </Box>
            <CustomAlertDialog
              dialogIsOpen={votationDialogIsOpen}
              handleConfirm={handleConfirmDelete}
              handleCancel={() => setVotationDialogIsOpen(false)}
              type={DialogType.VOTATION}
              confirmColor="red.500"
            />
          </VStack>
        </Box>
      )}
    </Draggable>
  );
};

export default AddVotationForm;
