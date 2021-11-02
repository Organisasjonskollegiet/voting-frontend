import React from 'react';
import {
  Alternative as AlternativeType,
  AlternativeResult,
  GetStvResultQuery,
  GetVotationResultsQuery,
  VotationType,
} from '../../__generated__/graphql-types';
import { Center, VStack, Text, Divider, Button, HStack } from '@chakra-ui/react';
import Hammer from '../../static/hammer.svg';
import { ArrowBackIcon } from '@chakra-ui/icons';
import ResultsTable from './results_table/ResultsTable';
import Loading from '../common/Loading';
import AlternativesString from '../common/AlternativesString';
import StvResultTable from './results_table/StvResultTable';
import DownloadResultButton from '../DownloadResultButton';

export interface VotationResultProps {
  isAdmin: boolean;
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
        (type === VotationType.Stv ? (
          <StvResultTable result={stvResult} />
        ) : (
          <ResultsTable result={result} votationId={votationId} />
        ))}
      <Divider m="3em 0" />
      <HStack w="100%" justifyContent="space-around">
        {(result || stvResult) && (
          <DownloadResultButton isStv={type === VotationType.Stv} result={result} stvResult={stvResult} />
        )}
        <Button borderRadius={'16em'} onClick={backToVotationList} leftIcon={<ArrowBackIcon />}>
          Gå tilbake til liste over voteringer
        </Button>
      </HStack>
    </VStack>
  );
};

export default VotationResult;
