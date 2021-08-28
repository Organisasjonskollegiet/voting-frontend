import React from 'react';
import { FormControl, FormLabel, Input, Select } from '@chakra-ui/react';
import { labelStyle } from '../particles/formStyles';
import { boxShadow } from '../particles/formStyles';
import { Votation } from '../../types/types';
import { VotationType } from '../../__generated__/graphql-types';

interface IProps {
  votation: Votation;
  updateVotationType: (type: VotationType, majorityThreshold?: number) => void;
}

enum VotationQualifiedType {
  Qualified50 = 'QUALIFIED50',
  Qualified67 = 'QUALIFIED67',
}

const VotationTypeSelect: React.FC<IProps> = ({ votation, updateVotationType }) => {
  const handleChangeType = (type: string) => {
    if (Object.values(VotationQualifiedType).includes(type as VotationQualifiedType)) {
      updateVotationType(VotationType.Qualified, type === VotationQualifiedType.Qualified67 ? 67 : 50);
    } else {
      updateVotationType(type as VotationType);
    }
  };

  return (
    <>
      <FormControl>
        <FormLabel sx={labelStyle}>Stemmeform</FormLabel>
        <Select boxShadow={boxShadow} value={votation.type} onChange={(event) => handleChangeType(event.target.value)}>
          <option value={VotationType.Simple}>Simpelt flertall</option>
          <option value={VotationQualifiedType.Qualified50}>Kvalifisert flertall</option>
          <option value={VotationQualifiedType.Qualified67}>Kvalifisert 2/3 flertall</option>
          <option value={VotationType.Stv}>Preferansevalg</option>
        </Select>
      </FormControl>
      {votation.type === VotationType.Stv && (
        <FormControl>
          <FormLabel sx={labelStyle}>Velg terskel</FormLabel>
          <Input
            type="number"
            value={votation.majorityThreshold}
            onChange={(e) => updateVotationType(votation.type, Number(e.target.value))}
          />
        </FormControl>
      )}
    </>
  );
};

export default VotationTypeSelect;
