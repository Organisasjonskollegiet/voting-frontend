import React from 'react';
import { Center, VStack, Text, Divider, Button } from '@chakra-ui/react';
import Hammer from '../../static/hammer.svg';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { Role } from '../../__generated__/graphql-types';

export interface VotationResultProps {
  text: string;
  backToVotationList: () => void;
  openNextVotation: () => void;
  role: Role | null;
}

const VotationResult: React.FC<VotationResultProps> = ({ text, backToVotationList, openNextVotation, role }) => {
  return (
    <VStack spacing="2em">
      <Center paddingLeft="34px">
        <img src={Hammer} alt="" />
      </Center>
      <Center fontWeight="bold">
        <VStack spacing="0">
          <Text>Vinner av valget er</Text>
          <Text fontSize="2.25em">{text}</Text>
        </VStack>
      </Center>
      <Divider m="3em 0" />
      {role === Role.Admin && (
        <Button w="250px" borderRadius={'16em'} onClick={openNextVotation}>
          Åpne neste votering
        </Button>
      )}
      <Button
        variant="ghost"
        borderRadius={'16em'}
        bg="white"
        fontSize="0.9em"
        fontWeight={'normal'}
        onClick={backToVotationList}
        leftIcon={<ArrowBackIcon />}
      >
        <Text decoration="underline">Tilbake til liste over voteringer</Text>
      </Button>
    </VStack>
  );
};

export default VotationResult;
