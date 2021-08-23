import React from 'react';
import { Center, VStack, Text, Divider, Button } from '@chakra-ui/react';
import Hammer from '../../static/hammer.svg';
import { ArrowBackIcon } from '@chakra-ui/icons';

export interface VotationResultProps {
  text: string;
  backToVotationList: () => void;
}

const VotationResult: React.FC<VotationResultProps> = ({ text, backToVotationList }) => {
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
      <Button borderRadius={'16em'} onClick={backToVotationList} leftIcon={<ArrowBackIcon />}>
        Gå tilbake til liste over voteringer
      </Button>
    </VStack>
  );
};

export default VotationResult;
