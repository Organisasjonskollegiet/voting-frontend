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
  useVotationsByMeetingIdQuery,
  VotationStatus,
  useUpdateVotationIndexesMutation,
  useVotationsUpdatedSubscription,
  VotationsUpdatedSubscription,
} from '../../__generated__/graphql-types';
import { Votation } from '../../types/types';
import Loading from '../common/Loading';
import EndedVotation from './votation/EndedVotation';
import OpenVotation from './votation/OpenVotation';
import VotationListButtonRow from './VotationListButtonRow';
import UpcomingVotationLists from './UpcomingVotationLists';
import {
  getEmptyVotation,
  prepareVotationsForCreation,
  prepareVotationsForUpdate,
  reorder,
  reorderSingleList,
} from './utils';
import ResultModal from '../myMeetings/ResultModal';
import MeetingController from './ManageMeetingControllerWithVotationValidation';
import useFormatVotations from '../../hooks/FormatVotations';

interface VotationListProps {
  meetingId: string;
  isMeetingLobby: boolean;
  role: Role | undefined;
  hideStartNextButton?: boolean;
  navigateToOpenVotation?: (openVotation: string | null) => void;
  setNumberOfUpcomingVotations?: (upcomingVotations: number) => void;
}

const VotationList: React.FC<VotationListProps> = ({
  meetingId,
  isMeetingLobby,
  role,
  hideStartNextButton,
  navigateToOpenVotation,
  setNumberOfUpcomingVotations,
}) => {
  const { data, loading, error } = useVotationsByMeetingIdQuery({
    variables: {
      meetingId,
    },
    fetchPolicy: 'no-cache',
  });

  const [updateVotations, updateVotationsResult] = useUpdateVotationsMutation();
  const [updateVotationIndexes] = useUpdateVotationIndexesMutation();
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
  const formatVotations = useFormatVotations();

  useEffect(() => {
    if (
      !nextVotation &&
      role === Role.Admin &&
      data?.meetingById?.votations &&
      data.meetingById.votations.length === 0
    ) {
      const emptyVotation = getEmptyVotation();
      setNextVotation(emptyVotation);
      setUpcomingVotations([]);
      setActiveVotationId(emptyVotation.id);
    }
  }, [data?.meetingById?.votations, role, ongoingVotation, nextVotation, upcomingVotations, endedVotations, loading]);

  // handles updates from the VotationsUpdated-subscriptions by merge the unchanged votations with the changed ones
  useEffect(() => {
    if (votationsUpdated === lastUpdate || !votationsUpdated?.votationsUpdated) return;
    setLastUpdate(votationsUpdated);

    const votations = votationsUpdated.votationsUpdated as Votation[];
    const changedVotationIds = votations.map((v) => (v ? v.id : ''));
    const updatedVotations = formatVotations(votations);

    const allVotations: Votation[] = [...(upcomingVotations || [])];
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
      if (upcomingVotations.length === 0) return;
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
    },
    [meetingId, toast, updateVotationIndexes]
  );

  const updateVotationsAfterDeletion = useCallback(
    async (votations: Votation[], deletedVotation: string, shouldUpdateIndexes: boolean) => {
      const indexOfNextVotation = getIndexOfNextVotation();
      // remaining upcoming votations
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
      if (setNumberOfUpcomingVotations) setNumberOfUpcomingVotations(remainingVotations.length);
      setActiveVotationId('');
    },
    [endedVotations, getIndexOfNextVotation, ongoingVotation, updateIndexes, role, setNumberOfUpcomingVotations]
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
      !data?.meetingById?.votations ||
      data.meetingById.votations.length === 0 ||
      ongoingVotation ||
      nextVotation ||
      upcomingVotations ||
      endedVotations
    )
      return;

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
      if (setNumberOfUpcomingVotations) setNumberOfUpcomingVotations(upcomingVotations.length);
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
  }, [
    data,
    formatVotations,
    isMeetingLobby,
    ongoingVotation,
    nextVotation,
    upcomingVotations,
    endedVotations,
    setNumberOfUpcomingVotations,
  ]);

  async function onDragEnd(result: DropResult) {
    if (!result.destination) return;

    if (
      result.destination.index === result.source.index &&
      result.destination.droppableId === result.source.droppableId
    )
      return;

    if (!nextVotation || !upcomingVotations) return;

    const { newNext, newUpcoming } = isMeetingLobby
      ? reorder(
          nextVotation,
          upcomingVotations,
          result.source.droppableId,
          result.destination.droppableId,
          result.source.index,
          result.destination.index
        )
      : reorderSingleList(
          [nextVotation, ...upcomingVotations],
          result.source.index,
          result.destination.index,
          endedVotations?.length
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
  const getIndexOfNewVotation = () => {
    const votations = [];
    if (nextVotation) votations.push(nextVotation);
    if (upcomingVotations) votations.push(...upcomingVotations);
    if (endedVotations) votations.push(...endedVotations);
    if (ongoingVotation) votations.push(ongoingVotation);
    return votations.length > 0 ? Math.max(...votations.map((votation) => votation.index)) + 1 : 0;
  };

  // creates a copy of the votation and puts it after the original
  const handleDuplicateVotation = async (votation: Votation) => {
    //if the votation has ended the duplicated votation should be put first
    const duplicatedVotationIndex =
      nextVotation && votation.index < nextVotation.index ? nextVotation.index : votation.index + 1;
    const duplicatedVotation = {
      ...votation,
      existsInDb: false,
      index: duplicatedVotationIndex,
      status: VotationStatus.Upcoming,
      alternatives: votation.alternatives.map((alt) => ({ ...alt, isWinner: false })),
    };

    const votations: Votation[] = [nextVotation, ...(upcomingVotations || [])].filter((v) => !!v) as Votation[];
    if (!nextVotation) {
      votations.unshift(duplicatedVotation);
    } else if (!upcomingVotations) {
      votations.push(duplicatedVotation);
    } else {
      const placementOfDuplicatedVotation = duplicatedVotationIndex - nextVotation.index;
      votations.splice(placementOfDuplicatedVotation, 0, duplicatedVotation);
    }

    await handleSave(votations).then(({ createdVotations }) => {
      setActiveVotationId(createdVotations[0].id);

      toast({
        title: 'Votering duplisert',
        description: 'Du finner voteringen under "Kommende voteringer" eller "Neste votering".',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
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

  const handleSave = async (votationsToSave?: Votation[]) => {
    const promises: Promise<Votation[]>[] = [];

    const votations = votationsToSave || [];
    if (votations.length === 0) {
      if (nextVotation) votations.push(nextVotation);
      if (upcomingVotations) votations.push(...upcomingVotations);
    }
    const validVotations = votations.filter((v) => v.title !== '');

    const startIndex = endedVotations?.length ?? 0;
    const votationsWithUpdatedIndexes = validVotations.map((v, index) => ({
      ...v,
      index: startIndex + index,
      isEdited: v.isEdited || v.index !== startIndex + index,
    }));

    const votationsToCreate = votationsWithUpdatedIndexes.filter((votation) => !votation.existsInDb);
    const votationsToUpdate = votationsWithUpdatedIndexes.filter(
      (votation) => votation.existsInDb && votation.isEdited
    );
    promises.push(handleCreateVotations(votationsToCreate), handleUpdateVotations(votationsToUpdate));
    const [createdVotations, updatedVotations] = await Promise.all(promises);

    toast({
      title: 'Voteringer oppdatert.',
      description: 'Voteringene har blitt opprettet',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });

    const untouchedVotations = votationsWithUpdatedIndexes.filter((v) => !v.isEdited && v.existsInDb);

    const newVotations = [...untouchedVotations, ...createdVotations, ...updatedVotations] as Votation[];

    // upcoming votations sorted
    const sortedNewVotations = newVotations.sort((a, b) => a.index - b.index);
    if (setNumberOfUpcomingVotations) setNumberOfUpcomingVotations(sortedNewVotations.length);
    if (sortedNewVotations.length > 0) {
      setNextVotation(sortedNewVotations[0]);
      setUpcomingVotations(sortedNewVotations.length > 1 ? sortedNewVotations.slice(1) : []);
    }

    return { createdVotations };
  };

  const checkIfAnyChanges = () => {
    const votations = [];
    if (nextVotation) votations.push(nextVotation);
    if (upcomingVotations) votations.push(...upcomingVotations);
    return votations.filter((v) => v.title !== '' && (!v.existsInDb || v.isEdited)).length > 0;
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

  const handleAddNewVotation = () => {
    const id = uuid();
    const nextVotationIndex = getIndexOfNewVotation();
    const newVotation = { ...getEmptyVotation(id), index: nextVotationIndex };
    if (!nextVotation) {
      setNextVotation(newVotation);
    } else if (upcomingVotations) {
      setUpcomingVotations([...upcomingVotations, newVotation]);
    } else {
      setUpcomingVotations([newVotation]);
    }
    setActiveVotationId(id);
  };

  return (
    <VStack w="100%" h="100%" alignItems="start" spacing="32px" onClick={() => setActiveVotationId('')}>
      {(createVotationsResult.loading || updateVotationsResult.loading) && (
        <Loading asOverlay text="Oppdaterer votering" />
      )}
      {(!endedVotations || (endedVotations && endedVotations.length === 0)) &&
        !ongoingVotation &&
        !nextVotation &&
        (!upcomingVotations || (upcomingVotations && upcomingVotations.length === 0)) && (
          <Text>Møtet har ingen voteringer enda</Text>
        )}
      {ongoingVotation && navigateToOpenVotation && (
        <VStack alignItems="start" spacing="16px">
          <Heading size="sm">{'Aktiv votering'}</Heading>
          <OpenVotation
            onClick={() => navigateToOpenVotation(ongoingVotation.id)}
            title={ongoingVotation.title}
            index={ongoingVotation.index}
          />
        </VStack>
      )}
      {nextVotation && upcomingVotations && (
        <DragDropContext onDragEnd={onDragEnd}>
          <UpcomingVotationLists
            isMeetingLobby={isMeetingLobby}
            droppableId={'top-list'}
            votations={[nextVotation, ...upcomingVotations]}
            {...{
              activeVotationId,
              setActiveVotationId,
              updateVotation,
              handleDeleteVotation,
              handleDeleteAlternative,
              checkIfAnyChanges,
            }}
            duplicateVotation={handleDuplicateVotation}
            handleSaveChanges={() => handleSave()}
            showStartNextButton={role === Role.Admin && !ongoingVotation && !hideStartNextButton}
            isAdmin={role === Role.Admin}
          />
        </DragDropContext>
      )}
      {role === Role.Admin && (
        <VotationListButtonRow
          handleAddNewVotation={handleAddNewVotation}
          saveIsDisabled={!checkIfAnyChanges()}
          handleSave={() => handleSave()}
        />
      )}
      {endedVotations && endedVotations.length > 0 && (
        <VStack spacing="16px" alignItems="start" w="100%">
          <Heading size="sm">Avsluttede voteringer</Heading>
          <Accordion allowToggle w="100%">
            {endedVotations.map((votation) => (
              <EndedVotation
                key={votation.id}
                role={role}
                votation={votation}
                duplicateVotation={handleDuplicateVotation}
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
      {!isMeetingLobby && <MeetingController {...{ handleSave, checkIfAnyChanges }} />}
    </VStack>
  );
};

export default VotationList;
