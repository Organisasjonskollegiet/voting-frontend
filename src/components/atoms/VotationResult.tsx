import React from 'react';
import { Alternative as AlternativeType } from '../../__generated__/graphql-types';
import { Center, VStack, Text, Divider, Button } from '@chakra-ui/react';
import Hammer from '../../static/hammer.svg';
import { ArrowBackIcon } from '@chakra-ui/icons';

export interface VotationResultProps {
  winners: AlternativeType[] | null;
  backToVotationList: () => void;
}

const VotationResult: React.FC<VotationResultProps> = ({ winners, backToVotationList }) => {
  return (
    <VStack spacing="2em">
      <Center paddingLeft="34px">
        <img src={Hammer} alt="" />
      </Center>
      <Center fontWeight="bold">
        <VStack spacing="0">
          {winners ? (
            <>
              <Text>{`${winners.length > 1 ? 'Vinnerene' : 'Vinneren'} av valget er`}</Text>
              {winners.map((w) => (
                <Text fontSize="2.25em">{w.text}</Text>
              ))}
            </>
          ) : (
            <>
              <Text fontSize="2.25em">Uavgjort</Text>
              <Text>Ingen av alternativnene oppnådde flertall</Text>
            </>
          )}
        </VStack>
      </Center>
      <Divider m="3em 0" />
      <Button borderRadius={'16em'} onClick={backToVotationList} leftIcon={<ArrowBackIcon />}>
        Gå tilbake til liste over voteringer
      </Button>
    </VStack>
  );
};

export default VotationResult;
