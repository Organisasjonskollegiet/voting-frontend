import React from 'react';
import {
  Alternative as AlternativeType,
  AlternativeResult,
  GetStvResultQuery,
  GetVotationResultsQuery,
  VotationType,
} from '../../__generated__/graphql-types';
import { Center, VStack, Text, Divider, Button } from '@chakra-ui/react';
import Hammer from '../../static/hammer.svg';
import { ArrowBackIcon } from '@chakra-ui/icons';
import ResultsTable from './ResultsTable';
import Loading from '../common/Loading';
import AlternativesString from '../common/AlternativesString';
import StvResultTable from './StvResultTable';

export interface VotationResultProps {
  winners: AlternativeType[] | AlternativeResult[] | null;
  result: GetVotationResultsQuery | null | undefined;
  votationId: string;
  backToVotationList: () => void;
  showResultsTable: boolean;
  loading: boolean;
  type: VotationType;
  stvResult: GetStvResultQuery | undefined;
}

const VotationResult: React.FC<VotationResultProps> = ({
  winners,
  backToVotationList,
  result,
  votationId,
  showResultsTable,
  loading,
  type,
  stvResult,
}) => {
  if (loading || !winners) return <Loading text="Henter resultat" asOverlay={false} />;
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
              <Text>Ingen av alternativnene oppnådde tilstrekkelig flertall</Text>
            </>
          )}
        </VStack>
      </Center>
      {showResultsTable &&
        (type === VotationType.Stv ? (
          <StvResultTable result={stvResult} />
        ) : (
          <ResultsTable result={result} votationId={votationId} />
        ))}
      <Divider m="3em 0" />
      <Button borderRadius={'16em'} onClick={backToVotationList} leftIcon={<ArrowBackIcon />}>
        Gå tilbake til liste over voteringer
      </Button>
    </VStack>
  );
};

export default VotationResult;
