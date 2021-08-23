import React from 'react';
import { Center, VStack, Text } from '@chakra-ui/react';
import Hammer from '../../static/hammer.svg';

export interface VotationResultProps {
  text?: string;
}

const VotationResult: React.FC<VotationResultProps> = ({ text }) => {
  return (
    <VStack spacing="2em">
      <Center paddingLeft="34px">
        <img src={Hammer} alt="" />
      </Center>
      <Center fontWeight="bold">
        <VStack spacing="0">
          {text ? (
            <>
              <Text>Vinner av valget er</Text>
              <Text fontSize="2.25em">{text}</Text>
            </>
          ) : (
            <>
              <Text fontSize="2.25em">Uavgjort</Text>
              <Text>Ingen av alternativnene oppnådde flertall</Text>
            </>
          )}
        </VStack>
      </Center>
    </VStack>
  );
};

export default VotationResult;
