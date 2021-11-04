import React from 'react';
import {
  Flex,
  FormControl,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
} from '@chakra-ui/react';
import { labelStyle } from '../../styles/formStyles';
import { boxShadow } from '../../styles/formStyles';
import { Votation } from '../../../types/types';
import { VotationType } from '../../../__generated__/graphql-types';
import VotationTypeInformation from './VotationTypeInformation';

interface IProps {
  votation: Votation;
  updateVotationType: (type: VotationType, majorityThreshold?: number) => void;
  updateNumberOfWinners: (newNumberOfWinners: number) => void;
}

enum VotationQualifiedType {
  Qualified50 = 'QUALIFIED50',
  Qualified67 = 'QUALIFIED67',
}

const VotationTypeSelect: React.FC<IProps> = ({ votation, updateVotationType, updateNumberOfWinners }) => {
  const handleChangeType = (type: string) => {
    if (type !== VotationType.Stv) {
      updateNumberOfWinners(1);
    }

    if (Object.values(VotationQualifiedType).includes(type as VotationQualifiedType)) {
      updateVotationType(VotationType.Qualified, type === VotationQualifiedType.Qualified67 ? 67 : 50);
    } else {
      updateVotationType(type as VotationType);
    }
  };

  const getSelectStartValue = () => {
    if (votation.type === VotationType.Qualified) {
      return votation.majorityThreshold === 67 ? VotationQualifiedType.Qualified67 : VotationQualifiedType.Qualified50;
    }
    return votation.type;
  };

  return (
    <>
      <FormControl>
        <FormLabel sx={labelStyle} mr="0">
          <Flex justifyContent="space-between" alignItems="flex-end">
            <span>Flertallsform</span>
            <VotationTypeInformation />
          </Flex>
        </FormLabel>

        <Select
          boxShadow={boxShadow}
          value={getSelectStartValue() as string}
          _hover={{ cursor: 'pointer' }}
          onChange={(event) => handleChangeType(event.target.value)}
        >
          <option value={VotationType.Simple}>Simpelt flertall</option>
          <option value={VotationQualifiedType.Qualified50}>Kvalifisert flertall</option>
          <option value={VotationQualifiedType.Qualified67}>Kvalifisert 2/3 flertall</option>
          <option value={VotationType.Stv}>Preferansevalg</option>
        </Select>
      </FormControl>
      {votation.type === VotationType.Stv && (
        <FormControl>
          <FormLabel sx={labelStyle}>Antall vinnere </FormLabel>
          <NumberInput
            defaultValue={votation.numberOfWinners}
            min={1}
            max={20}
            onChange={(value) => updateNumberOfWinners(Number(value))}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
      )}
    </>
  );
};

export default VotationTypeSelect;
