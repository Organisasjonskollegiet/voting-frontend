import React from 'react';
import InformationModal from '../../common/InformationModal';
import { Heading, Text } from '@chakra-ui/react';

const VotationTypeInformation: React.FC = () => {
  const votationTypesMap: Map<string, string> = new Map([
    [
      'Simpelt flertall',
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio eligendi, vel officiis quod corrupti dicta laudantium accusamus odio tenetur minima. Veniam architecto voluptatum ab, quae voluptas beatae reprehenderitenim quia!',
    ],
    [
      'Kvalifisert flertall',
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil repudiandae magni dolorem quisquam quae nam consectetur, expedita, tempore maxime doloribus perferendis aut autem, consequatur saepe totam. Excepturi at totam iure.',
    ],
    ['Kvalifisert 2/3 flertall', ''],
    ['Preferansevalg', ''],
  ]);

  return (
    <InformationModal title="Stemmeformer" ariaLabel="Informasjon om stemmeformer" alignWithText={true}>
      {Array.from(votationTypesMap.keys()).map((title) => (
        <>
          <Heading as="h2" fontSize="1.1em">
            {title}
          </Heading>
          <Text mb="1em">{votationTypesMap.get(title)}</Text>
        </>
      ))}
    </InformationModal>
  );
};

export default VotationTypeInformation;
