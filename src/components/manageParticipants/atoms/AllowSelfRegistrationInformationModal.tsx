import React from 'react';
import { Text, VStack } from '@chakra-ui/react';
import InformationModal from '../../common/InformationModal';

const AllowSelfRegistrationInformationModal: React.FC = () => {
  return (
    <InformationModal ariaLabel="Selvregistrering" title="Selvregistrering">
      <VStack spacing="5">
        <Text>
          Når man tillater selvregistrering vil alle innloggede brukere som besøker en bestemt link bli lagt til som
          deltakere på møtet.
        </Text>
        <Text>
          <i>
            Ved å besøke "Selvregistrering"-fanen i et møte får man som administator opp en QR-kode, i tillegg til
            mulighet til å kopiere linken.{' '}
          </i>
          Ved å scanne QR-koden med mobilen vil man automatisk bli tatt til rett side, og lagt til i møtet. QR-koden kan
          man vise på storskjem, eller man kan ta skjermbilde av den og printe det ut, for å distribuere det til
          deltakerne på møtet.
        </Text>
      </VStack>
    </InformationModal>
  );
};

export default AllowSelfRegistrationInformationModal;
