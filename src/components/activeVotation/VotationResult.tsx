import React, { useContext } from 'react';
import { Role } from '../../__generated__/graphql-types';
import { VStack, Text, Divider, Button, Box, Image, Heading } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import ResultsTable from './results_table/ResultsTable';
import Loading from '../common/Loading';
import StvResultTable from './results_table/StvResultTable';
import DownloadResultButton from './DownloadResultButton';
import { ActiveVotationContext } from '../../pages/ActiveVotation';
import Winners from '../../static/winners.svg';
import NoWinner from '../../static/noWinner.svg';
import { boxShadow } from '../styles/formStyles';
import { MeetingContext } from '../../pages/MeetingLobby';
import StartNextVotationButton from '../meetingLobby/StartNextVotationButton';
import WrapStack from '../common/layout/WrapStack';
import useScreenWidth from '../../hooks/ScreenWidth';
import { getAlternativesString } from './utils';

export interface VotationResultProps {
  backToVotationList: () => void;
  showResultsTable: boolean;
  loading: boolean;
}

const VotationResult: React.FC<VotationResultProps> = ({ backToVotationList, showResultsTable, loading }) => {
  const screenWidth = useScreenWidth();
  const pageBreapoint = 850;
  const { result, winners, votationId, isStv } = useContext(ActiveVotationContext);
  const { role, presentationMode, numberOfUpcomingVotations } = useContext(MeetingContext);

  const isThereAnyUpcomingVotations = numberOfUpcomingVotations && numberOfUpcomingVotations > 0;

  if (!winners && loading) return <Loading text="Henter resultat" />;
  if (!winners) return <></>;
  return (
    <VStack spacing="2em" w="100%">
      <WrapStack
        w="100%"
        bg="white"
        boxShadow={boxShadow}
        spacing={screenWidth < pageBreapoint ? '1rem' : 0}
        justifyContent="center"
        paddingX="3rem"
        paddingTop="3rem"
        paddingBottom={screenWidth < pageBreapoint ? '3rem' : undefined}
        minH="19rem"
        maxH="80vh"
        breakpoint={pageBreapoint}
      >
        <Box flex="1" alignSelf="center" marginTop="auto">
          <Image
            maxH={screenWidth < pageBreapoint ? '8rem' : undefined}
            src={winners.length > 0 ? Winners : NoWinner}
          />
        </Box>
        <VStack flex="1" margin="3rem">
          {winners.length > 0 ? (
            <>
              <Text>{`${winners.length > 1 ? 'Vinnerne' : 'Vinneren'} av valget er`}</Text>
              <Heading textAlign="center" size="xl">
                {getAlternativesString(winners)}
              </Heading>
            </>
          ) : (
            <>
              <Text fontWeight="bold" textAlign="center" fontSize="2.25em">
                Ingen vinner
              </Text>
              <Text textAlign="center">Ingen av alternativene oppnådde tilstrekkelig flertall</Text>
            </>
          )}
        </VStack>
      </WrapStack>
      {showResultsTable &&
        (isStv ? <StvResultTable result={result} /> : <ResultsTable result={result} votationId={votationId} />)}
      <Divider m="3em 0" />
      <WrapStack breakpoint={isThereAnyUpcomingVotations ? 650 : 450} w="100%" justifyContent="space-between">
        <Button variant="standard" onClick={backToVotationList} leftIcon={<ArrowBackIcon />}>
          <Text mt="0.25rem">Tilbake til voteringsliste</Text>
        </Button>
        {result && role === Role.Admin && !presentationMode && <DownloadResultButton />}
        {isThereAnyUpcomingVotations && role === Role.Admin && <StartNextVotationButton />}
      </WrapStack>
    </VStack>
  );
};

export default VotationResult;
