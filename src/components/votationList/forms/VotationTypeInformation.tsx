import React from 'react';
import InformationModal from '../../common/InformationModal';
import { Heading, Link, Text } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';

const VotationTypeInformation: React.FC = () => {
  return (
    <InformationModal title="Flertallsformer" ariaLabel="Informasjon om stemmeformer" alignWithText={true}>
      <Heading as="h2" fontSize="1.1rem">
        Simpelt flertall
      </Heading>
      <Text mb="1rem">
        Alternativet med flest stemmer vinner. <br />
        Blanke stemmer telles ikke.
      </Text>
      <Heading as="h2" fontSize="1.1rem">
        Kvalifisert flertall
      </Heading>
      <Text mb="1rem">
        Et alternativ trenger stemmene fra mer enn halvparten av de stemmeberettigede tilstede for å vinne.
      </Text>

      <Heading as="h2" fontSize="1.1rem">
        Kvalifisert 2/3 flertall
      </Heading>
      <Text mb="1rem">
        Et alternativ trenger stemmene fra mer enn to tredjedeler av de stemmeberettigede tilstede for å vinne.
      </Text>
      <Heading as="h2" fontSize="1.1rem">
        Preferansevalg
      </Heading>
      <Text mb="1rem">
        Velgerne rangerer de alternativene de ønsker i den rekkefølgen de foretrekker dem. Her har man mulighet til å
        velge flere vinnere. <br />
        Man kan stemme blankt ved å ikke rangerer noen alternativer.
      </Text>
      <Text>
        Hvordan resultatet ved preferansevalg blir utregnet kan du se her:{' '}
        <Link
          href="https://www.youtube.com/watch?v=bLH_w5kHJpA"
          textDecoration="underline"
          fontStyle="italic"
          isExternal
        >
          Single transferable vote <ExternalLinkIcon mx="2px" />
        </Link>
      </Text>
    </InformationModal>
  );
};

export default VotationTypeInformation;
