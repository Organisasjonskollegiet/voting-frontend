import React, { useState } from 'react';
import { VStack, Button, Heading, useToast } from '@chakra-ui/react';
import {
  Role,
  useUpdateVotationStatusMutation,
  VotationStatus,
  GetVotationResultsQuery,
  GetStvResultQuery,
  AlternativeResult,
  Alternative as AlternativeType,
} from '../../__generated__/graphql-types';
import { useHistory } from 'react-router';
import ResultsTable from './results_table/ResultsTable';
import CustomAlertDialog, { DialogType } from '../common/CustomAlertDialog';
import StvResultTable from './results_table/StvResultTable';
import AlternativesString from '../common/AlternativesString';
import { green } from '../styles/theme';
import Loading from '../common/Loading';
import { DownloadIcon } from '@chakra-ui/icons';
import FileSaver from 'file-saver';
import { getRoundedPercentage } from './utils';

interface CheckResultsProps {
  votationId: string;
  meetingId: string;
  role: Role;
  isStv: boolean;
  result: GetVotationResultsQuery | null | undefined;
  stvResult: GetStvResultQuery | null | undefined;
  winners: AlternativeType[] | AlternativeResult[] | null;
  loading: boolean;
}

const CheckResults: React.FC<CheckResultsProps> = ({
  votationId,
  meetingId,
  role,
  isStv,
  result,
  stvResult,
  winners,
  loading,
}) => {
  const [updateVotationStatus] = useUpdateVotationStatusMutation();
  const [invalidateVotationDialogOpen, setInvalidateVotationDialogOpen] = useState(false);
  const history = useHistory();
  const toast = useToast();

  const handleInvalidResult = async () => {
    setInvalidateVotationDialogOpen(false);
    await updateVotationStatus({ variables: { votationId, status: VotationStatus.Invalid } });
    history.push(`/meeting/${meetingId}`);
  };

  console.log(stvResult);

  const getStvOverview = () => {
    if (!stvResult?.getStvResult) throw new Error('Fant ikke resultat.');
    return `Antall stemmer som krevdes for å vinne: ${stvResult.getStvResult.quota} \n
    Antall stemmeberettigede deltakere: ${stvResult.getStvResult.votingEligibleCount} \n
    Antall avgitte stemmer: ${stvResult.getStvResult.voteCount}`;
  };

  const getStvRoundResultFileContent = (
    index: number,
    eliminated: string,
    alternatives: { text: string; votes: number }[]
  ) => {
    const header = `Runde ${index + 1}`;
    return '';
  };

  const getStvResultFileContent = () => {
    const overView = getStvOverview();

    return '';
  };

  const getAlternativeResultString = (text: string, votes: number) => {
    if (!result?.getVotationResults) return '';
    return `${text}, ${votes}, ${
      result.getVotationResults.voteCount > 0
        ? getRoundedPercentage(votes / result.getVotationResults.voteCount).toString()
        : '0'
    }, ${
      result.getVotationResults.votingEligibleCount > 0
        ? getRoundedPercentage(votes / result.getVotationResults.votingEligibleCount).toString()
        : '0'
    } \n`;
  };

  const getResultFileContent = () => {
    if (isStv) {
      return '';
    }
    if (!result?.getVotationResults) throw new Error('Fant ikke resultatene fra voteringen.');
    const header = 'Alternativ, Antall stemmer, % av stemmene, % av stemmeberettigede \n';
    const alternativesContent = [...result.getVotationResults.alternatives]
      .sort((a, b) => (b?.votes ?? 0) - (a?.votes ?? 0))
      .map((a) => (a ? getAlternativeResultString(a.text, a.votes) : ''))
      .reduce((p, c) => p + c);
    const blankVotes = result.getVotationResults.blankVotes
      ? getAlternativeResultString('Blanke stemmer', result.getVotationResults.blankVoteCount)
      : '';
    return header + alternativesContent + blankVotes;
  };

  const saveResult = () => {
    try {
      const content = getResultFileContent();
      const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
      FileSaver.saveAs(blob, 'resultat.csv');
    } catch (error) {
      toast({
        title: 'Kunne ikke laste ned resultater.',
        description: 'Vi fant ikke resultatene fra voteringen.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if ((!result || !result.getVotationResults) && (!stvResult || !stvResult.getStvResult) && loading) {
    return <Loading text="Henter resultater" asOverlay={false} />;
  }

  return (
    <VStack spacing="2rem">
      <Button onClick={saveResult} aria-label="Last ned" leftIcon={<DownloadIcon />}>
        Last ned resultat
      </Button>
      <VStack alignSelf="flex-start" alignItems="flex-start">
        {winners && winners.length > 0 ? (
          <>
            <Heading fontSize="16px" as="h3">
              {`${winners.length > 1 ? 'Vinnerne' : 'Vinneren'} er:`}
            </Heading>
            <VStack alignItems="start">
              <AlternativesString
                fontSize="24px"
                color={green}
                alternatives={winners.map((a: AlternativeType | AlternativeResult) => a.text)}
              />
            </VStack>
          </>
        ) : (
          <Heading fontSize="24px" as="h3">
            Voteringen hadde ingen vinner
          </Heading>
        )}
      </VStack>
      {!isStv ? <ResultsTable result={result} votationId={votationId} /> : <StvResultTable result={stvResult} />}
      {role === Role.Admin && (
        <Button mt="10em" p="1.5em 4em" borderRadius="16em" onClick={() => setInvalidateVotationDialogOpen(true)}>
          Erklær resultat ugyldig
        </Button>
      )}
      <CustomAlertDialog
        dialogIsOpen={invalidateVotationDialogOpen}
        handleCancel={() => setInvalidateVotationDialogOpen(false)}
        handleConfirm={handleInvalidResult}
        type={DialogType.INVALIDATE}
      />
    </VStack>
  );
};

export default CheckResults;
