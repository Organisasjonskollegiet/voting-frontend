import React from 'react';
import InformationModal from '../../common/InformationModal';
import { Heading, Text } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import ExternalLink from '../../common/buttons/ExternalLink';

const VotationTypeInformation: React.FC = () => {
  return (
    <InformationModal title="Flertallsformer" ariaLabel="Informasjon om flertallsformer" alignWithText={true}>
      <Heading size="sm">Simpelt flertall</Heading>
      <Text mb="1rem">
        Alternativet med flest stemmer vinner. <br />
        Blanke stemmer telles ikke.
      </Text>
      <Heading size="sm">Kvalifisert flertall</Heading>
      <Text mb="1rem">
        Et alternativ trenger stemmene fra mer enn halvparten av de stemmeberettigede tilstede for å vinne.
      </Text>

      <Heading size="sm">Kvalifisert 2/3 flertall</Heading>
      <Text mb="1rem">
        Et alternativ trenger stemmene fra mer enn to tredjedeler av de stemmeberettigede tilstede for å vinne.
      </Text>
      <Heading size="sm">Preferansevalg</Heading>
      <Text mb="1rem">
        Velgerne rangerer de alternativene de ønsker i den rekkefølgen de foretrekker dem. Her har man mulighet til å
        velge flere vinnere. <br />
        Man kan stemme blankt ved å ikke rangerer noen alternativer.
      </Text>
      <Text>
        Hvordan resultatet ved preferansevalg blir utregnet kan du se her:{' '}
        <ExternalLink href="https://www.youtube.com/watch?v=bLH_w5kHJpA">
          Single transferable vote <ExternalLinkIcon mx="2px" />
        </ExternalLink>
      </Text>
    </InformationModal>
  );
};

export default VotationTypeInformation;
