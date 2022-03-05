import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ModalOverlay,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Votation } from '../../types/types';
import { Result, useGetVotationResultsLazyQuery, VotationType } from '../../__generated__/graphql-types';
import DisplayResults from '../activeVotation/checkResults/DisplayResults';
import DownloadResultButton from '../activeVotation/DownloadResultButton';
import Loading from '../common/Loading';
import ReturnToPreviousButton from '../common/ReturnToPreviousButton';
import { darkblue, offwhite } from '../styles/colors';
import { getCorrectVotationResult } from '../activeVotation/utils';
import { ActiveVotationContext } from '../../pages/ActiveVotation';

interface ResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  votation: Votation | null;
}

const ResultModal: React.FC<ResultModalProps> = ({ isOpen, onClose, votation }) => {
  const [getResult, { data: votationResultResponse, loading: votationResultLoading }] = useGetVotationResultsLazyQuery({
    fetchPolicy: 'cache-and-network',
  });

  const [result, setResult] = useState<Result | null>(null);

  useEffect(() => {
    if (!votation || !votationResultResponse || result?.votationId === votation.id) return;
    setResult(getCorrectVotationResult(votationResultResponse));
  }, [votation, result, votationResultResponse]);

  useEffect(() => {
    if (!votation || votation.id === result?.votationId) return;
    getResult({ variables: { votationId: votation.id } });
  }, [votation, result, getResult]);

  if (!votation) return <></>;

  const winners = result ? result.alternatives.filter((a) => a.isWinner).map((a) => a.text) : null;

  return (
    <ActiveVotationContext.Provider
      value={{
        result,
        winners,
        votationId: votation.id,
        isStv: votation.type === VotationType.Stv,
      }}
    >
      <Modal isOpen={isOpen} onClose={onClose} size="4xl">
        <ModalOverlay />
        <ModalContent mx="2rem" bg={offwhite} textColor={darkblue} p="2em">
          <ModalHeader>{`Resultat for ${votation?.title}`}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {votationResultLoading && <Loading text="Laster resultat" asOverlay />}
            {votation && <DisplayResults />}
          </ModalBody>

          <ModalFooter justifyContent="space-between">
            <ReturnToPreviousButton onClick={onClose} text="Tilbake"></ReturnToPreviousButton>
            {votation && <DownloadResultButton />}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ActiveVotationContext.Provider>
  );
};

export default ResultModal;
