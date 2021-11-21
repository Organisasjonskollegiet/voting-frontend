import React, { useContext } from 'react';
import { Alternative as AlternativeType, AlternativeResult, Role } from '../../__generated__/graphql-types';
import { Center, VStack, Text, Divider, Button, HStack } from '@chakra-ui/react';
import Hammer from '../../static/hammer.svg';
import { ArrowBackIcon } from '@chakra-ui/icons';
import ResultsTable from './results_table/ResultsTable';
import Loading from '../common/Loading';
import AlternativesString from '../common/AlternativesString';
import StvResultTable from './results_table/StvResultTable';
import DownloadResultButton from './DownloadResultButton';
import { ActiveVotationContext } from '../../pages/ActiveVotation';
import { MeetingContext } from '../../pages/MeetingLobby';
import StartNextVotationButton from '../meetingLobby/StartNextVotationButton';

export interface VotationResultProps {
  winners: AlternativeType[] | AlternativeResult[] | null;
  backToVotationList: () => void;
  showResultsTable: boolean;
  loading: boolean;
}

const VotationResult: React.FC<VotationResultProps> = ({ winners, backToVotationList, showResultsTable, loading }) => {
  const { result, votationId, isStv } = useContext(ActiveVotationContext);
  const { role, presentationMode, numberOfUpcomingVotations } = useContext(MeetingContext);

  if (!winners && loading) return <Loading text="Henter resultat" asOverlay={false} />;
  if (!winners) return <></>;
  return (
    <VStack spacing="2em">
      <Center paddingLeft="34px">
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
      </Center>
      {showResultsTable &&
        (isStv ? <StvResultTable result={result} /> : <ResultsTable result={result} votationId={votationId} />)}
      <Divider m="3em 0" />
      <HStack w="100%" justifyContent="space-between">
        <Button borderRadius={'16em'} onClick={backToVotationList} leftIcon={<ArrowBackIcon />}>
          Tilbake til voteringsliste
        </Button>
        {result && role === Role.Admin && !presentationMode && <DownloadResultButton result={result} isStv={isStv} />}
        {numberOfUpcomingVotations && numberOfUpcomingVotations > 0 && <StartNextVotationButton />}
      </HStack>
    </VStack>
  );
};

export default VotationResult;
