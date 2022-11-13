import React from 'react';
import InformationModal from '../../common/InformationModal';
import { Heading, Text } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import ExternalLink from '../../common/buttons/ExternalLink';

const VotationTypeInformation: React.FC = () => {
  return (
    <InformationModal title="Flertallsformer" ariaLabel="Informasjon om flertallsformer" alignWithText={true}>
      <Text mb="1rem">
        Administrator og teller får opp fordelingen av stemmer. De kan selv regne ut et resultat basert på andre regler
        enn de nedenfor.
      </Text>
      <Heading size="sm">Simpelt flertall</Heading>
      <Text mb="1rem">
        Alternativet med flest stemmer vinner. Blanke og avholdende stemmer telles ikke i utregningen.
      </Text>
      <Heading size="sm">Kvalifisert 50% flertall</Heading>
      <Text mb="1rem">
        Et alternativ trenger mer enn halvparten av stemmene til alle de registrerte brukere i stemmesystemet for å
        vinne. Hvis alle med stemmerett i organisasjonen er tilstede, er dette likt absolutt flertall. Både blanke og
        avholdende stemmer telles med i utregningen.
      </Text>

      <Heading size="sm">Kvalifisert 2/3 flertall</Heading>
      <Text mb="1rem">
        Et alternativ trenger mer enn to tredjedeler av stemmene til alle de registrerte brukere i stemmesystemet for å
        vinne. Både blanke og avholdende stemmer telles med i utregningen.
      </Text>
      <Heading size="sm">Preferansevalg</Heading>
      <Text mb="1rem">
        Velgerne rangerer de alternativene de ønsker i den rekkefølgen de foretrekker dem. Valget kan ha flere vinnere
        dersom dere ønsker det. Velgerne kan stemme blankt ved å ikke rangerer noen alternativer.
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
