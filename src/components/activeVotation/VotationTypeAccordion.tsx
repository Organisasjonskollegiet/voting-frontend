import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  HStack,
  VStack,
  Text,
  AccordionIcon,
} from '@chakra-ui/react';
import React from 'react';
import { VotationType } from '../../__generated__/graphql-types';
import VotationTypeInformation from '../votationList/forms/VotationTypeInformation';

interface VotationTypeAccordionProps {
  votationType: VotationType;
  majorityThreshold: number;
  numberOfWinners: number;
}

const votationTypeToString = new Map([
  [VotationType.Stv, 'Preferansevalg'],
  [VotationType.Simple, 'Simpelt flertall'],
  [VotationType.Qualified, 'Kvalifisert flertall'],
]);

const VotationTypeAccordion: React.FC<VotationTypeAccordionProps> = ({
  votationType,
  majorityThreshold,
  numberOfWinners,
}) => {
  return (
    <Accordion allowToggle>
      <AccordionItem maxWidth="250px">
        <AccordionButton>
          <HStack w="100%" justifyContent="space-between">
            <VStack alignItems="left">
              <HStack>
                <Text fontStyle="italic">Stemmeform</Text>
                <VotationTypeInformation />
              </HStack>
            </VStack>
            <AccordionIcon />
          </HStack>
        </AccordionButton>
        <AccordionPanel>
          <Text>{`${votationTypeToString.get(votationType)}`}</Text>
          {votationType === VotationType.Qualified && <Text>{`Flertall krevd: ${majorityThreshold}%`}</Text>}
          {votationType === VotationType.Stv && <Text>{`Antall vinnere: ${numberOfWinners}`}</Text>}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default VotationTypeAccordion;
