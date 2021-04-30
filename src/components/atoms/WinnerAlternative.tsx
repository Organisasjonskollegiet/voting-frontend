import React from 'react';
import { Alternative } from '../../__generated__/graphql-types';
import { Center, VStack, Text } from '@chakra-ui/react';

const WinnerAlternative: React.FC<Alternative> = ({text}) => {
 return (
   <VStack>
    <Center>
      <img src="hammer.svg" alt=""/>
    </Center>
    <Center>
      <Text>
        Vinner av valget er
      </Text>
      <Text >
        {text}
      </Text>
    </Center>
 </VStack>
 )
}

export default WinnerAlternative;