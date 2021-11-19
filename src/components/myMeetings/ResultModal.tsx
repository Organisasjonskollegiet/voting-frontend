import {
  Modal,
  VStack,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ModalOverlay,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Votation } from '../../types/types';
import {
  useGetStvResultLazyQuery,
  useGetVotationResultsLazyQuery,
  VotationType,
} from '../../__generated__/graphql-types';
import DisplayResults from '../activeVotation/checkResults/DisplayResults';
import DownloadResultButton from '../activeVotation/DownloadResultButton';
import Loading from '../common/Loading';
import ReturnToPreviousButton from '../common/ReturnToPreviousButton';
import { darkblue, offwhite } from '../styles/colors';

interface ResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  votation: Votation | null;
}

const ResultModal: React.FC<ResultModalProps> = ({ isOpen, onClose, votation }) => {
  const [getResult, { data: result, loading: votationResultLoading }] = useGetVotationResultsLazyQuery({
    fetchPolicy: 'cache-and-network',
  });

  const [getStvResult, { data: stvResult, loading: stvResultLoading }] = useGetStvResultLazyQuery({});

  const [idOfVotationResult, setIdOfVotationResult] = useState<string | null>(null);

  useEffect(() => {
    if (!votation || (votation.id === idOfVotationResult && (result || stvResult))) return;
    if (votation.type === VotationType.Stv) {
      getStvResult({ variables: { votationId: votation.id } });
    } else {
      getResult({ variables: { votationId: votation.id } });
    }
    setIdOfVotationResult(votation.id);
  }, [votation, result, stvResult, getStvResult, getResult, idOfVotationResult]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl">
      <ModalOverlay />
      <ModalContent mx="2rem" bg={offwhite} textColor={darkblue} p="2em">
        <ModalHeader>{`Resultat for ${votation?.title}`}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {(votationResultLoading || stvResultLoading) && <Loading text="Laster resultat" asOverlay />}
          {votation && (
            <VStack>
              <DisplayResults
                stvResult={stvResult}
                result={result}
                isStv={votation.type === VotationType.Stv}
                votationId={votation.id}
              />
            </VStack>
          )}
        </ModalBody>

        <ModalFooter justifyContent="space-between">
          <ReturnToPreviousButton onClick={onClose} text="Tilbake"></ReturnToPreviousButton>
          {votation && (
            <DownloadResultButton result={result} stvResult={stvResult} isStv={votation.type === VotationType.Stv} />
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ResultModal;
