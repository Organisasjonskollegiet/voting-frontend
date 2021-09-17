import React from 'react';
import InformationModal from '../../common/InformationModal';
import { Text } from '@chakra-ui/react';

const VotationTypeInformation: React.FC = () => {
  return (
    <InformationModal title="Stemmeformer" ariaLabel="Informasjon om stemmeformer" alignWithText={true}>
      <Text></Text>
    </InformationModal>
  );
};

export default VotationTypeInformation;
