import React from 'react';
import InformationModal from '../../common/InformationModal';
import { Heading, Link, Text, VStack } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';

const VotationTypeInformation: React.FC = () => {
  return (
    <InformationModal title="Stemmeformer" ariaLabel="Informasjon om stemmeformer" alignWithText={true}>
      <Heading as="h2" fontSize="1.1rem">
        Simpelt Flertall
      </Heading>
      <Text mb="1rem">Alternativet med flest stemmer vinner.</Text>
      <Heading as="h2" fontSize="1.1rem">
        Kvalifisert flertall
      </Heading>
      <Text mb="1rem">Et alternativ trenger mer enn halvparten stemmene for å vinne.</Text>

      <Heading as="h2" fontSize="1.1rem">
        Kvalifisert 2/3 flertall
      </Heading>
      <Text mb="1rem">Et alternativ trenger mer enn 2/3 av stemmene for å vinne.</Text>

      <Heading as="h2" fontSize="1.1rem">
        Preferansevalg
      </Heading>
      <Text mb="1rem">
        Velgerne rangerer alternativene i den rekkefølgen de foretrekker dem. Her har man mulighet til å velge flere
        vinnere.
      </Text>
      <Text>
        Hvordan resultatet blir utregnet kan du se her:{' '}
        <Link href="https://www.youtube.com/watch?v=bLH_w5kHJpA" color="black" isExternal>
          Single transferable vote <ExternalLinkIcon mx="2px" />
        </Link>
      </Text>
    </InformationModal>
  );
};

export default VotationTypeInformation;
