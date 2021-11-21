import React, { useContext, useState, useEffect } from 'react';
import { Alternative as AlternativeType, AlternativeResult, Role } from '../../__generated__/graphql-types';
import { Center, VStack, Text, Divider, Button, HStack, Box, Image } from '@chakra-ui/react';
import Hammer from '../../static/hammer.svg';
import { ArrowBackIcon } from '@chakra-ui/icons';
import ResultsTable from './results_table/ResultsTable';
import Loading from '../common/Loading';
import AlternativesString from '../common/AlternativesString';
import StvResultTable from './results_table/StvResultTable';
import DownloadResultButton from './DownloadResultButton';
import { ActiveVotationContext } from '../../pages/ActiveVotation';
import Winners from '../../static/winners.svg';
import { boxShadow } from '../styles/formStyles';
import { MeetingContext } from '../../pages/MeetingLobby';
import WrapStack from '../common/WrapStack';

export interface VotationResultProps {
  winners: AlternativeType[] | AlternativeResult[] | null;
  backToVotationList: () => void;
  showResultsTable: boolean;
  loading: boolean;
}

const VotationResult: React.FC<VotationResultProps> = ({ winners, backToVotationList, showResultsTable, loading }) => {
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setScreenWidth(window.innerWidth);
    });
  }, []);
  const { result, votationId, isStv } = useContext(ActiveVotationContext);
  const { role, presentationMode } = useContext(MeetingContext);
  useEffect(() => {
    console.log(screenWidth);
  }, [screenWidth]);
  if (!winners && loading) return <Loading text="Henter resultat" />;
  if (!winners) return <></>;
  return (
    <VStack spacing="2em" w="100%">
      <WrapStack
        w="100%"
        bg="white"
        boxShadow={boxShadow}
        spacing="1rem"
        justifyContent="center"
        paddingX="3rem"
        paddingTop="3rem"
        minH="19rem"
        maxH="80vh"
        breakpoint={850}
      >
        <Box flex="1" alignSelf="center" marginTop="auto">
          <Image maxH={screenWidth < 850 ? '8rem' : undefined} src={Winners} />
        </Box>
        <VStack flex="1" margin="3rem">
          <Text>{`${winners.length > 1 ? 'Vinnerne' : 'Vinneren'} av valget er`}</Text>
          <AlternativesString
            alternatives={winners.map((w: AlternativeType | AlternativeResult) => w.text)}
            fontSize="2.25em"
          />
        </VStack>
      </WrapStack>
      {/* <Center bg="white" paddingLeft="34px">
        <img src={Hammer} alt="hammer" />
      </Center>
      <Center fontWeight="bold">
        <VStack spacing="0">
          {winners.length > 0 ? (
            <>
              <Text>{`${winners.length > 1 ? 'Vinnerne' : 'Vinneren'} av valget er`}</Text>
              <AlternativesString
                alternatives={winners.map((w: AlternativeType | AlternativeResult) => w.text)}
                fontSize="2.25em"
              />
            </>
          ) : (
            <>
              <Text fontSize="2.25em">Ingen vinner</Text>
              <Text>Ingen av alternativene oppnådde tilstrekkelig flertall</Text>
            </>
          )}
        </VStack>
      </Center> */}
      {showResultsTable &&
        (isStv ? <StvResultTable result={result} /> : <ResultsTable result={result} votationId={votationId} />)}
      <Divider m="3em 0" />
      <HStack w="100%" justifyContent="space-between">
        <Button
          p="1.5em 4em"
          bg="transparent"
          borderRadius="16em"
          onClick={backToVotationList}
          leftIcon={<ArrowBackIcon />}
        >
          <Text mt="0.25rem">Tilbake til voteringsliste</Text>
        </Button>
        {result && role === Role.Admin && !presentationMode && <DownloadResultButton result={result} isStv={isStv} />}
      </HStack>
    </VStack>
  );
};

export default VotationResult;
