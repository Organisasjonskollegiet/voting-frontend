import React, { useContext } from 'react';
import { Alternative as AlternativeType, AlternativeResult, Role } from '../../__generated__/graphql-types';
import { Center, VStack, Text, Divider, Button, HStack, Box } from '@chakra-ui/react';
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

export interface VotationResultProps {
  winners: AlternativeType[] | AlternativeResult[] | null;
  backToVotationList: () => void;
  showResultsTable: boolean;
  loading: boolean;
}

const VotationResult: React.FC<VotationResultProps> = ({ winners, backToVotationList, showResultsTable, loading }) => {
  const { result, stvResult, votationId, isStv, role } = useContext(ActiveVotationContext);

  if (!winners && loading) return <Loading text="Henter resultat" asOverlay={false} />;
  if (!winners) return <></>;
  return (
    <VStack spacing="2em">
      <HStack bg="white" boxShadow={boxShadow} justifyContent="center" paddingX="3rem" minH="19rem">
        <Box alignSelf="center" marginTop="auto" flex="1">
          <img src={Winners} />
        </Box>
        <VStack flex="1" justifyContent="center">
          <Text>{`${winners.length > 1 ? 'Vinnerne' : 'Vinneren'} av valget er`}</Text>
          <AlternativesString
            alternatives={winners.map((w: AlternativeType | AlternativeResult) => w.text)}
            fontSize="2.25em"
          />
        </VStack>
      </HStack>
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
        (isStv ? <StvResultTable result={stvResult} /> : <ResultsTable result={result} votationId={votationId} />)}
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
        {/* <Button borderRadius={'16em'} onClick={backToVotationList} leftIcon={<ArrowBackIcon />}>
          Gå tilbake til liste over voteringer
        </Button> */}
        {(result || stvResult) && role === Role.Admin && <DownloadResultButton />}
      </HStack>
    </VStack>
  );
};

export default VotationResult;
