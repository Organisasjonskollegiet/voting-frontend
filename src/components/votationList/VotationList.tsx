import React, { useEffect, useState, useCallback } from 'react';
import { v4 as uuid } from 'uuid';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Center, Heading, useToast, VStack, Text, Accordion } from '@chakra-ui/react';
import {
  Role,
  useCreateVotationsMutation,
  useDeleteAlternativesMutation,
  useDeleteVotationMutation,
  useVotationDeletedSubscription,
  useUpdateVotationsMutation,
  useUpdateVotationStatusMutation,
  useVotationsByMeetingIdLazyQuery,
  VotationStatus,
  useUpdateVotationIndexesMutation,
  useVotationsUpdatedSubscription,
  VotationsUpdatedSubscription,
} from '../../__generated__/graphql-types';
import { Votation, Alternative } from '../../types/types';
import Loading from '../common/Loading';
import EndedVotation from './EndedVotation';
import OpenVotation from './OpenVotation';
import VotationListButtonRow from './VotationListButtonRow';
import UpcomingVotationLists from './UpcomingVotationLists';
import {
  getEmptyAlternative,
  getEmptyVotation,
  prepareVotationsForCreation,
  prepareVotationsForUpdate,
  reorder,
} from './utils';
import ResultModal from '../myMeetings/ResultModal';
// import VotationTypeAccordion from '../activeVotation/VotationTypeAccordion';

interface VotationListProps {
  meetingId: string;
  votationsMayExist: boolean;
  isMeetingLobby: boolean;
  role: Role | undefined;
  hideStartNextButton?: boolean;
  navigateToOpenVotation?: (openVotation: string | null) => void;
}

const VotationList: React.FC<VotationListProps> = ({
  meetingId,
  votationsMayExist,
  isMeetingLobby,
  role,
  hideStartNextButton,
  navigateToOpenVotation,
}) => {
  const [getVotationsByMeetingId, { data, loading, error }] = useVotationsByMeetingIdLazyQuery({
    variables: {
      meetingId,
    },
    fetchPolicy: 'no-cache',
  });

  const [updateVotations, updateVotationsResult] = useUpdateVotationsMutation();
  const [updateVotationIndexes] = useUpdateVotationIndexesMutation();
  const [updateVotationStatus, updateVotationStatusResult] = useUpdateVotationStatusMutation();
  const [createVotations, createVotationsResult] = useCreateVotationsMutation();
  const [deleteVotation] = useDeleteVotationMutation();
  const [ongoingVotation, setOngoingVotation] = useState<Votation>();
  const [nextVotation, setNextVotation] = useState<Votation | null>();
  const [upcomingVotations, setUpcomingVotations] = useState<Votation[]>();
  const [endedVotations, setEndedVotations] = useState<Votation[]>();
  const [activeVotationId, setActiveVotationId] = useState<string>('');
  const [showResultOf, setShowResultOf] = useState<Votation | null>(null);
  const [deleteAlternatives] = useDeleteAlternativesMutation();
  const { data: votationsUpdated } = useVotationsUpdatedSubscription({ variables: { meetingId } });
  const [lastUpdate, setLastUpdate] = useState<VotationsUpdatedSubscription | undefined>();
  const { data: deletedVotation } = useVotationDeletedSubscription({
    variables: {
      meetingId,
    },
  });
  const toast = useToast();

  const alternativeMapper = (alternative: Alternative) => {
    return {
      ...alternative,
      existsInDb: true,
    };
  };

  /**
   * @description adds existsInDb and isEdited to the votations. If the results of the
   * votation is published, alternatives prop is used and alternatives include isWinner.
   * If the results are not published, the alternatives from the votation is used.
   * If the votations has no alternatives, an empty alternative is added.
   * @param votation
   * @param alternatives is set only if the votationstatus is published, and includes
   * isWinner
   * @returns
   */
  const formatVotation = useCallback((votation: Votation, alternatives?: Alternative[]) => {
    return {
      ...votation,
      existsInDb: true,
      isEdited: false,
      alternatives:
        alternatives && alternatives.length > 0
          ? alternatives.sort((a, b) => a.index - b.index).map(alternativeMapper)
          : votation.alternatives.length > 0
          ? votation.alternatives.sort((a, b) => a.index - b.index).map(alternativeMapper)
          : [getEmptyAlternative()],
    };
  }, []);

  /**
   * @description formats all votations and couple it with its results if the
   * votation results are published.
   * @param votations votations from meetingById.votations
   * @param winners list of result from resultsOfPublishedVotations containing
   * votationId and alternatives including whether they are winners or not.
   * @returns votations formatted correctly for further use and editing
   */
  const formatVotations = useCallback(
    (votations: Votation[], winners?: Votation[]) => {
      if (!votations) return;
      return votations.map((votation) => {
        if (winners && votation.status === VotationStatus.PublishedResult) {
          const indexOfVotation = winners.map((v) => v.id).indexOf(votation.id);
          if (indexOfVotation !== -1) return formatVotation(votation, winners[indexOfVotation].alternatives);
        }
        return formatVotation(votation);
      });
    },
    [formatVotation]
  );

  useEffect(() => {
    if (
      !nextVotation &&
      role === Role.Admin &&
      ((data?.meetingById?.votations && data.meetingById.votations.length === 0) || !votationsMayExist)
    ) {
      const emptyVotation = getEmptyVotation();
      setNextVotation(emptyVotation);
      setUpcomingVotations([]);
      setActiveVotationId(emptyVotation.id);
    }
  }, [
    data?.meetingById?.votations,
    votationsMayExist,
    role,
    ongoingVotation,
    nextVotation,
    upcomingVotations,
    endedVotations,
    loading,
  ]);

  useEffect(() => {
    if (votationsUpdated === lastUpdate || !votationsUpdated?.votationsUpdated) return;
    setLastUpdate(votationsUpdated);
    const changedVotationIds = votationsUpdated.votationsUpdated.map((v) => (v ? v.id : ''));
    const votations = votationsUpdated.votationsUpdated as Votation[];
    const updatedVotations = formatVotations(votations);
    const allVotations = [];
    if (upcomingVotations) allVotations.push(...upcomingVotations);
    if (nextVotation) allVotations.push(nextVotation);
    const unchangedVotations = allVotations.filter((v) => !changedVotationIds.includes(v.id));
    const updatedVotationList = [...(updatedVotations ?? []), ...unchangedVotations].sort(
      (a, b) => (a?.index ?? 0) - (b?.index ?? 0)
    ) as Votation[];
    if (updatedVotationList.length > 0) {
      setNextVotation(updatedVotationList[0]);
      setUpcomingVotations(updatedVotationList.slice(1));
    }
  }, [votationsUpdated, nextVotation, upcomingVotations, lastUpdate, formatVotations]);

  // If there may exist votations (you are editing meeting or already
  // been on add votations page), fetch votations from the backend
  useEffect(() => {
    if (votationsMayExist) {
      getVotationsByMeetingId();
    }
  }, [votationsMayExist, getVotationsByMeetingId]);

  useEffect(() => {
    if (updateVotationStatusResult.data?.updateVotationStatus) {
      let responseTitle,
        responseDescription,
        responseStatus: 'success' | 'error' = 'error';

      if (updateVotationStatusResult.data?.updateVotationStatus.__typename === 'Votation') {
        responseTitle = 'Voteringen ble åpnet.';
        responseStatus = 'success';
      } else if (updateVotationStatusResult.data?.updateVotationStatus.__typename === 'MaxOneOpenVotationError') {
        responseTitle = 'Kunne ikke åpne votering.';
        responseDescription = updateVotationStatusResult.data?.updateVotationStatus.message;
      }

      const toastId = 'votationOpenedResponse';
      if (!toast.isActive(toastId)) {
        toast({
          id: toastId,
          title: responseTitle,
          description: responseDescription,
          status: responseStatus,
          duration: 4000,
          isClosable: true,
        });
      }
    }
  }, [updateVotationStatusResult.data?.updateVotationStatus, toast]);

  /**
   * @returns the index of what is going to be the nextVotation
   */
  const getIndexOfNextVotation = useCallback(() => {
    // the index the coming nextVotation will have must be larger than
    // all ended votations and the ongoing one
    return ongoingVotation
      ? ongoingVotation.index + 1
      : endedVotations && endedVotations.length > 0
      ? endedVotations[endedVotations.length - 1].index + 1
      : 0;
  }, [ongoingVotation, endedVotations]);

  // updates the indexes of the votations in backend
  const updateIndexes = useCallback(
    async (votations: Votation[]) => {
      const upcomingVotations = votations
        .filter((v) => v.status === VotationStatus.Upcoming)
        .map((v) => {
          return {
            id: v.id,
            index: v.index,
          };
        });
      if (upcomingVotations.length > 0) {
        try {
          await updateVotationIndexes({ variables: { meetingId, votations: upcomingVotations } });
        } catch (error) {
          toast({
            title: 'Kunne ikke oppdatere rekkefølge på voteringer.',
            description: 'Last inn siden på nytt, og prøv igjen.',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        }
      }
    },
    [meetingId, toast, updateVotationIndexes]
  );

  const updateVotationsAfterDeletion = useCallback(
    async (votations: Votation[], deletedVotation: string, shouldUpdateIndexes: boolean) => {
      const indexOfNextVotation = getIndexOfNextVotation();
      const remainingVotations = votations
        .filter((v) => v.id !== deletedVotation)
        .sort((a, b) => a.index - b.index)
        .map((v, index) => {
          return {
            ...v,
            index: indexOfNextVotation + index,
          };
        });
      if (shouldUpdateIndexes && role === Role.Admin) await updateIndexes(remainingVotations);
      const keyOfEmptyVotation = uuid();
      setNextVotation(
        remainingVotations.length > 0
          ? remainingVotations[0]
          : !ongoingVotation && (!endedVotations || endedVotations?.length === 0) && role === Role.Admin
          ? getEmptyVotation(keyOfEmptyVotation)
          : null
      );
      setUpcomingVotations(remainingVotations.length > 1 ? remainingVotations.slice(1) : []);
      setActiveVotationId('');
    },
    [endedVotations, getIndexOfNextVotation, ongoingVotation, updateIndexes, role]
  );

  useEffect(() => {
    if (!deletedVotation?.votationDeleted) return;
    const allVotations = [];
    if (nextVotation) allVotations.push(nextVotation);
    if (upcomingVotations) allVotations.push(...upcomingVotations);
    if (!allVotations.map((v) => v.id).includes(deletedVotation.votationDeleted)) return;
    updateVotationsAfterDeletion(allVotations, deletedVotation.votationDeleted, false);
  }, [deletedVotation?.votationDeleted, nextVotation, upcomingVotations, updateVotationsAfterDeletion]);

  useEffect(() => {
    if (
      data?.meetingById?.votations &&
      data.meetingById.votations.length > 0 &&
      !ongoingVotation &&
      !nextVotation &&
      !upcomingVotations &&
      !endedVotations
    ) {
      const votations = data.meetingById.votations as Votation[];
      const winners = data.resultsOfPublishedVotations as Votation[];
      try {
        const formattedVotations = formatVotations(votations, winners) ?? [getEmptyVotation()];
        const nextVotationIndex = Math.max(...votations.map((votation) => votation.index)) + 1;
        const shouldAddEmpty = formattedVotations.length === 0;
        if (shouldAddEmpty) {
          formattedVotations.push(getEmptyVotation(uuid(), nextVotationIndex));
        }
        const sortedVotations = formattedVotations.sort((a, b) => a.index - b.index);
        const upcomingVotations = sortedVotations.filter((v) => v.status === VotationStatus.Upcoming);
        const ongoingVotation = sortedVotations.find(
          (v) => v.status === VotationStatus.Open || v.status === VotationStatus.CheckingResult
        );
        setOngoingVotation(ongoingVotation);
        setNextVotation(upcomingVotations.slice(0, 1)[0] ?? null);
        setUpcomingVotations(upcomingVotations.slice(1));
        setEndedVotations(
          sortedVotations.filter(
            (v) => v.status === VotationStatus.PublishedResult || v.status === VotationStatus.Invalid
          )
        );
        if (upcomingVotations.length > 0) {
          setActiveVotationId(upcomingVotations[0].id);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, [data, formatVotations, isMeetingLobby, ongoingVotation, nextVotation, upcomingVotations, endedVotations]);

  async function onDragEnd(result: DropResult) {
    if (!result.destination) return;

    if (
      result.destination.index === result.source.index &&
      result.destination.droppableId === result.source.droppableId
    )
      return;

    if (!nextVotation || !upcomingVotations) return;

    const { newNext, newUpcoming } = reorder(
      nextVotation,
      upcomingVotations,
      result.source.droppableId,
      result.destination.droppableId,
      result.source.index,
      result.destination.index
    );

    // the index the coming nextVotation will have must be larger than
    // all ended votations and the ongoing one
    const indexOfNextVotation = getIndexOfNextVotation();

    const updatedVotations: Votation[] = [newNext, ...newUpcoming].map((v, index) => {
      return {
        ...v,
        index: indexOfNextVotation + index,
      };
    });
    setNextVotation({ ...newNext, index: indexOfNextVotation });
    setUpcomingVotations([
      ...newUpcoming.map((v, index) => ({
        ...v,
        index: indexOfNextVotation + 1 + index,
      })),
    ]);
    await updateIndexes(updatedVotations);
  }

  const handleDeleteVotation = async (votation: Votation) => {
    let responseTitle,
      responseDescription,
      responseStatus: 'success' | 'error' = 'error';
    try {
      if (votation.existsInDb) {
        await deleteVotation({
          variables: {
            votationId: votation.id,
          },
        });
      }
      const votations = [];
      if (nextVotation) votations.push(nextVotation);
      if (upcomingVotations) votations.push(...upcomingVotations);
      updateVotationsAfterDeletion(votations, votation.id, true);

      responseTitle = 'Votering slettet.';
      responseDescription = `${votation.title} ble slettet`;
      responseStatus = 'success';
    } catch (error) {
      responseTitle = 'Det oppstod et problem.';
      responseDescription = 'Vi kunne ikke slette voteringen. Prøv å laste inn siden på nytt.';
    } finally {
      toast({
        title: responseTitle,
        description: responseDescription,
        status: responseStatus,
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDeleteAlternative = async (alternativeId: string, votationId: string) => {
    let responseTitle,
      responseDescription,
      responseStatus: 'success' | 'error' = 'error';
    try {
      await deleteAlternatives({
        variables: {
          ids: [alternativeId],
        },
      });
      const votations = [];
      if (nextVotation) votations.push(nextVotation);
      if (upcomingVotations) votations.push(...upcomingVotations);
      const updatedVotation = votations
        .filter((v) => v.id === votationId)
        .map((v) => ({ ...v, alternatives: v.alternatives.filter((a) => a.id !== alternativeId) }));
      if (updatedVotation.length > 0) {
        updateVotation(updatedVotation[0]);
      }
      responseTitle = 'Alternativ slettet.';
      responseStatus = 'success';
    } catch (error) {
      responseTitle = 'Det oppstod et problem.';
      responseDescription = 'Vi kune ikke slette alternativet. Prøv å laste inn siden på nytt.';
    } finally {
      toast({
        title: responseTitle,
        description: responseDescription,
        status: responseStatus,
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // update the state with an edited votation
  const updateVotation = (votation: Votation) => {
    if (votation.id === nextVotation?.id) setNextVotation(votation);
    if (!upcomingVotations) return;
    const votationsCopy = Array.from(upcomingVotations);
    const indexOfUpdatedVotation = upcomingVotations.findIndex((v) => v.id === votation.id);
    votationsCopy[indexOfUpdatedVotation] = votation;
    setUpcomingVotations(votationsCopy);
  };

  /**
   * @returns the index of the next votation to be created
   */
  const getNextVotationIndex = () => {
    const votations = [];
    if (nextVotation) votations.push(nextVotation);
    if (upcomingVotations) votations.push(...upcomingVotations);
    if (endedVotations) votations.push(...endedVotations);
    if (ongoingVotation) votations.push(ongoingVotation);
    return votations.length > 0 ? Math.max(...votations.map((votation) => votation.index)) + 1 : 0;
  };

  // copys a votation and adds the votation last in line
  const duplicateVotation = (votation: Votation) => {
    const newId = uuid();
    const nextVotationIndex = getNextVotationIndex();
    const newDuplicatedVotation = {
      ...votation,
      id: newId,
      existsInDb: false,
      index: nextVotationIndex,
      status: VotationStatus.Upcoming,
      alternatives: votation.alternatives.map((alt) => ({ ...alt, isWinner: false })),
    };
    if (!nextVotation) {
      setNextVotation(newDuplicatedVotation);
    } else if (upcomingVotations) {
      setUpcomingVotations(Array.from([...upcomingVotations, newDuplicatedVotation]));
    } else {
      setUpcomingVotations(Array.from([newDuplicatedVotation]));
    }
    setActiveVotationId(newId);
    toast({
      title: 'Votering duplisert',
      description: 'Du finner voteringen under "Kommende voteringer" eller "Neste votering".',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleUpdateVotations = async (votations: Votation[]) => {
    const preparedVotations = prepareVotationsForUpdate(votations);
    const updateResponse = await updateVotations({ variables: { meetingId, votations: preparedVotations } });
    const updateResults = updateResponse.data?.updateVotations as Votation[];
    return formatVotations(updateResults) as Votation[];
  };

  const handleCreateVotations = async (votations: Votation[]) => {
    const preparedVotations = prepareVotationsForCreation(votations);
    const createResponse = await createVotations({ variables: { votations: preparedVotations, meetingId } });
    const createResults = createResponse.data?.createVotations as Votation[];
    return formatVotations(createResults) as Votation[];
  };

  const handleSave = async () => {
    const votations = [];
    const promises: Promise<Votation[]>[] = [];
    if (nextVotation) votations.push(nextVotation);
    if (upcomingVotations) votations.push(...upcomingVotations);
    const validVotations = votations.filter((v) => v.title !== '');
    const votationsToCreate = validVotations.filter((votation) => !votation.existsInDb);
    const votationsToUpdate = validVotations.filter((votation) => votation.existsInDb && votation.isEdited);
    promises.push(handleCreateVotations(votationsToCreate), handleUpdateVotations(votationsToUpdate));
    const [createdVotations, updatedVotations] = await Promise.all(promises);
    toast({
      title: 'Voteringer oppdatert.',
      description: 'Voteringene har blitt opprettet',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    const untouchedVotations = votations.filter((v) => !v.isEdited && v.existsInDb);
    const newVotations = [...untouchedVotations, ...createdVotations, ...updatedVotations] as Votation[];
    const sortedNewVotations = newVotations.sort((a, b) => a.index - b.index);
    if (sortedNewVotations.length > 0) {
      setNextVotation(sortedNewVotations[0]);
      setUpcomingVotations(sortedNewVotations.length > 1 ? sortedNewVotations.slice(1) : []);
    }
  };

  const checkIfAnyChanges = () => {
    const votations = [];
    if (nextVotation) votations.push(nextVotation);
    if (upcomingVotations) votations.push(...upcomingVotations);
    return votations.filter((v) => v.title !== '' && (!v.existsInDb || v.isEdited)).length > 0;
  };

  const startVotation = () => {
    if (!nextVotation) return;
    if (nextVotation.alternatives.filter((a) => a.existsInDb || a.text !== '').length === 0) {
      toast({
        title: 'Kunne ikke åpne votering.',
        description: 'Kan ikke åpne voteringen da den ikke har noen alternativer.',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    } else {
      updateVotationStatus({ variables: { votationId: nextVotation.id, status: VotationStatus.Open } });
    }
  };

  if (loading) {
    return <Loading text={'Henter voteringer'} />;
  }

  if (error) {
    return (
      <>
        <Center mt="10vh">
          <Text>Det skjedde noe galt under innlastingen</Text>
        </Center>
      </>
    );
  }

  return (
    <VStack w="100%" h="100%" alignItems="start" spacing="32px" onClick={() => setActiveVotationId('')}>
      {(createVotationsResult.loading || updateVotationsResult.loading) && (
        <Loading asOverlay text="Oppdaterer votering" />
      )}
      {ongoingVotation && navigateToOpenVotation && (
        <VStack alignItems="start" spacing="16px">
          <Heading size="sm">{'Aktiv votering'}</Heading>
          <OpenVotation
            onClick={() => navigateToOpenVotation(ongoingVotation.id)}
            isAdmin={role === Role.Admin}
            votationTitle={ongoingVotation.title}
            index={ongoingVotation.index}
            isActive={true}
          />
        </VStack>
      )}
      {nextVotation && upcomingVotations && (
        <DragDropContext onDragEnd={onDragEnd}>
          <UpcomingVotationLists
            isMeetingLobby={isMeetingLobby}
            droppableId={'top-list'}
            votations={[nextVotation, ...upcomingVotations]}
            setActiveVotationId={setActiveVotationId}
            activeVotationId={activeVotationId}
            updateVotation={updateVotation}
            handleDeleteVotation={handleDeleteVotation}
            handleDeleteAlternative={handleDeleteAlternative}
            duplicateVotation={duplicateVotation}
            handleStartVotation={startVotation}
            checkIfAnyChanges={checkIfAnyChanges}
            handleSaveChanges={() => handleSave()}
            showStartNextButton={role === Role.Admin && !ongoingVotation && !hideStartNextButton}
            heading={'Neste votering'}
            isAdmin={role === Role.Admin}
          />
        </DragDropContext>
      )}
      {role === Role.Admin && (
        <VotationListButtonRow
          handleAddNewVotation={() => {
            const id = uuid();
            const nextVotationIndex = getNextVotationIndex();
            const newVotation = { ...getEmptyVotation(id), index: nextVotationIndex };
            if (!nextVotation) {
              setNextVotation(newVotation);
            } else if (upcomingVotations) {
              setUpcomingVotations([...upcomingVotations, newVotation]);
            } else {
              setUpcomingVotations([newVotation]);
            }
            setActiveVotationId(id);
          }}
          saveIsDisabled={!checkIfAnyChanges()}
          handleSave={() => handleSave()}
        />
      )}
      {endedVotations && endedVotations.length > 0 && (
        <VStack spacing="16px" alignItems="start">
          <Heading size="sm">Avsluttede voteringer</Heading>
          <Accordion allowToggle>
            {endedVotations.map((votation) => (
              <EndedVotation
                key={votation.id}
                role={role}
                votation={votation}
                duplicateVotation={duplicateVotation}
                onClick={() => {
                  if (votation.status === VotationStatus.PublishedResult) setShowResultOf(votation);
                }}
              />
            ))}
          </Accordion>
        </VStack>
      )}
      {(role === Role.Admin || role === Role.Counter) && isMeetingLobby && (
        <ResultModal isOpen={!!showResultOf} onClose={() => setShowResultOf(null)} votation={showResultOf} />
      )}
    </VStack>
  );
};

export default VotationList;
