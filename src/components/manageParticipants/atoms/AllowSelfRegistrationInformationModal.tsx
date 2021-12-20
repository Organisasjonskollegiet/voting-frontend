import React from 'react';
import { Text } from '@chakra-ui/react';
import InformationModal from '../../common/InformationModal';

const AllowSelfRegistrationInformationModal: React.FC = () => {
  return (
    <InformationModal ariaLabel="Selvregistrering" title="Selvregistrering">
      <Text>
        Når man tillater selvregistrering vil alle innloggede brukere som besøker en bestemt link bli lagt til som
        deltakere på møtet.
      </Text>
      <Text>
        Linken man kan besøke er på formatet <Text as="u">www.vedtatt.no/meeting/:møteId/register</Text>
      </Text>
      <Text>
        Ved å besøke "Selvregistrering"-fanen man finner øverst på siden med voteringslisten, får man som administrator
        opp en QR-kode, i tillegg til mulighet til å kopiere linken. Ved å scanne QR-koden med mobilen vil man
        automatisk bli tatt til rett side, og lagt til i møtet. QR-koden kan man vise på storskjem, eller man kan ta
        skjermbilde av den og printe det ut, for å distribuere det til deltakerne på møtet.
      </Text>
    </InformationModal>
  );
};

export default AllowSelfRegistrationInformationModal;
