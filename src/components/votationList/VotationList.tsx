import React, { useEffect, useState, useCallback } from 'react';
import { v4 as uuid } from 'uuid';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Center, Heading, useToast, VStack, Text, Accordion } from '@chakra-ui/react';
import {
  Role,
  useCreateVotationsMutation,
  useDeleteAlternativesMutation,
  useDeleteVotationsMutation,
  useUpdateVotationsMutation,
  useUpdateVotationStatusMutation,
  useVotationsByMeetingIdLazyQuery,
  VotationStatus,
  useUpdateVotationIndexesMutation,
} from '../../__generated__/graphql-types';
import { Votation, Alternative } from '../../types/types';
import Loading from '../common/Loading';
import EndedVotation from './endedVotations/EndedVotation';
import OpenVotation from './OpenVotation';
import VotationListButtonRow from './VotationListButtonRow';
import UpcomingVotationLists from './UpcomingVotationLists';
import { getEmptyAlternative, getEmptyVotation } from './utils';
// import VotationTypeAccordion from '../activeVotation/VotationTypeAccordion';

interface VotationListProps {
  meetingId: string;
  votationsMayExist: boolean;
  isMeetingLobby: boolean;
  role: Role | undefined;
  hideOpenVotationButton: boolean;
  navigateToOpenVotation?: (openVotation: string | null) => void;
}

const VotationList: React.FC<VotationListProps> = ({
  meetingId,
  votationsMayExist,
  isMeetingLobby,
  role,
  hideOpenVotationButton,
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

  const [createVotations, createVotationsResult] = useCreateVotationsMutation();

  const [deleteVotations] = useDeleteVotationsMutation();

  const [ongoingVotation, setOngoingVotation] = useState<Votation>();

  const [nextVotation, setNextVotation] = useState<Votation | null>();

  const [upcomingVotations, setUpcomingVotations] = useState<Votation[]>();

  const [endedVotations, setEndedVotations] = useState<Votation[]>();

  const [activeVotationId, setActiveVotationId] = useState<string>('');

  const [deleteAlternatives] = useDeleteAlternativesMutation();

  const [updateVotationStatus, updateVotationStatusResult] = useUpdateVotationStatusMutation();

  const toast = useToast();

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

  // If there may exist votations (you are editing meeting or already
  // been on add votations page), fetch votations from the backend
  useEffect(() => {
    if (votationsMayExist) {
      getVotationsByMeetingId();
    }
  }, [votationsMayExist, getVotationsByMeetingId]);

  useEffect(() => {
    if (updateVotationStatusResult.data?.updateVotationStatus) {
      const openedToastId = 'votationOpened';
      const maxOneToastId = 'maxOneOpenVotation';
      if (
        updateVotationStatusResult.data?.updateVotationStatus.__typename === 'Votation' &&
        !toast.isActive(openedToastId)
      ) {
        toast({
          id: openedToastId,
          title: 'Voteringen ble åpnet.',
          status: 'success',
          duration: 4000,
          isClosable: true,
        });
      } else if (
        updateVotationStatusResult.data?.updateVotationStatus.__typename === 'MaxOneOpenVotationError' &&
        !toast.isActive(maxOneToastId)
      ) {
        toast({
          id: maxOneToastId,
          title: 'Kunne ikke åpne votering.',
          description: updateVotationStatusResult.data?.updateVotationStatus.message,
          status: 'error',
          duration: 4000,
          isClosable: true,
        });
      }
    }
  }, [updateVotationStatusResult.data?.updateVotationStatus, toast]);

  const alternativeMapper = (alternative: Alternative, index: number) => {
    return {
      ...alternative,
      index: index,
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
          ? alternatives.map(alternativeMapper)
          : votation.alternatives.length > 0
          ? votation.alternatives.map(alternativeMapper)
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
      data?.meetingById?.votations &&
      data.meetingById.votations.length > 0 &&
      !ongoingVotation &&
      !nextVotation &&
      !upcomingVotations &&
      !endedVotations
    ) {
      const votations = data.meetingById.votations as Votation[];
      const winners = data.resultsOfPublishedVotations as Votation[];
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
      setNextVotation(upcomingVotations.slice(0, 1)[0]);
      setUpcomingVotations(upcomingVotations.slice(1));
      setEndedVotations(
        sortedVotations.filter(
          (v) => v.status === VotationStatus.PublishedResult || v.status === VotationStatus.Invalid
        )
      );
      if (upcomingVotations.length > 0) {
        setActiveVotationId(upcomingVotations[0].id);
      }
    }
  }, [data, formatVotations, isMeetingLobby, ongoingVotation, nextVotation, upcomingVotations, endedVotations]);

  const reorder = (
    next: Votation,
    upcoming: Votation[],
    startList: string,
    endList: string,
    startIndex: number,
    endIndex: number
  ) => {
    // if the votation moved is the next votation...
    if (startList === 'next') {
      // ...and its moved to top of upcoming, its still the next votation
      if (endList === 'upcoming' && endIndex === 0) {
        return { newNext: next, newUpcoming: upcoming };
        // if not it should me moved, and the first upcoming should be set as next votation
      } else if (endList === 'upcoming') {
        const newUpcoming = Array.from(upcoming);
        const [newNext] = newUpcoming.splice(startIndex, 1);
        newUpcoming.splice(endIndex, 0, next);
        return { newNext, newUpcoming };
      }
      // if the votation is moved from upcoming...
    } else {
      // to next, but not to the top, it should be put on top of upcoming
      if (endList === 'next' && endIndex !== 0) {
        const newUpcoming = Array.from(upcoming);
        const [removed] = newUpcoming.splice(startIndex, 1);
        newUpcoming.splice(0, 0, removed);
        return { newNext: next, newUpcoming };
        // if it goes on top of next it should be set next and next bumped down
      } else if (endList === 'next') {
        const newUpcoming = Array.from(upcoming);
        const [newNext] = newUpcoming.splice(startIndex, 1);
        newUpcoming.splice(0, 0, next);
        return { newNext, newUpcoming };
        // if it goes elsewhere it should move there
      } else {
        const newUpcoming = Array.from(upcoming);
        const [removed] = newUpcoming.splice(startIndex, 1);
        newUpcoming.splice(endIndex, 0, removed);
        return { newNext: next, newUpcoming };
      }
    }
    return { newNext: next, newUpcoming: upcoming };
  };

  /**
   * @returns the index of what is going to be the nextVotation
   */
  const getIndexOfNextVotation = () => {
    // the index the coming nextVotation will have must be larger than
    // all ended votations and the ongoing one
    return ongoingVotation
      ? ongoingVotation.index + 1
      : endedVotations && endedVotations.length > 0
      ? endedVotations[endedVotations.length - 1].index + 1
      : 0;
  };

  async function onDragEnd(result: DropResult) {
    if (!result.destination) {
      return;
    }

    if (
      result.destination.index === result.source.index &&
      result.destination.droppableId === result.source.droppableId
    ) {
      return;
    }

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
      ...newUpcoming.map((v, index) => {
        return {
          ...v,
          index: indexOfNextVotation + 1 + index,
        };
      }),
    ]);
    await updateIndexes(updatedVotations);
  }

  // updates the indexes of the votations in backend
  const updateIndexes = async (votations: Votation[]) => {
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
        await updateVotationIndexes({ variables: { votations: upcomingVotations } });
      } catch (error) {
        toast({
          title: 'Kunne ikke oppdatere rekkefølge på voteringer.',
          description: 'Last inn siden på nytt, og prøv igjen.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  const handleDeleteVotation = async (votation: Votation) => {
    try {
      if (votation.existsInDb) {
        await deleteVotations({
          variables: {
            ids: [votation.id],
          },
        });
      }
      const votations = [];
      if (nextVotation) votations.push(nextVotation);
      if (upcomingVotations) votations.push(...upcomingVotations);
      const indexOfNextVotation = getIndexOfNextVotation();
      const remainingVotations = votations
        .filter((v) => v.id !== votation.id)
        .sort((a, b) => a.index - b.index)
        .map((v, index) => {
          return {
            ...v,
            index: indexOfNextVotation + index,
          };
        });
      await updateIndexes(remainingVotations);
      const keyOfEmptyVotation = uuid();
      setNextVotation(
        remainingVotations.length > 0
          ? remainingVotations[0]
          : ongoingVotation || (endedVotations && endedVotations?.length > 0)
          ? null
          : getEmptyVotation(keyOfEmptyVotation)
      );
      setUpcomingVotations(remainingVotations.length > 1 ? remainingVotations.slice(1) : []);
      setActiveVotationId('');
      toast({
        title: 'Votering slettet.',
        description: `${votation.title} ble slettet`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Det oppstod et problem.',
        description: `Vi kunne ikke slette voteringen. Prøv å laste inn siden på nytt.`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleDeleteAlternative = async (alternativeId: string, votationId: string) => {
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
        .map((v) => {
          return { ...v, alternatives: v.alternatives.filter((a) => a.id !== alternativeId) };
        });
      if (updatedVotation.length > 0) {
        updateVotation(updatedVotation[0]);
      }
      toast({
        title: 'Alternativ slettet.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Det oppstod et problem.',
        description: `Vi kunne ikke slette alternativet. Prøv å laste inn siden på nytt.`,
        status: 'error',
        duration: 5000,
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
      duration: 5000,
      isClosable: true,
    });
  };

  const handleUpdateVotations = async (votations: Votation[]) => {
    const preparedVotations = votations.map((votation) => {
      return {
        id: votation.id,
        title: votation.title,
        description: votation.description,
        index: votation.index,
        blankVotes: votation.blankVotes,
        hiddenVotes: votation.hiddenVotes,
        type: votation.type,
        numberOfWinners: votation.numberOfWinners,
        majorityThreshold: votation.majorityThreshold,
        alternatives: votation.alternatives
          .map((alternative) => {
            return {
              id: alternative.id,
              text: alternative.text,
            };
          })
          .filter((alternative) => alternative.text !== ''),
      };
    });

    const updateResponse = await updateVotations({ variables: { votations: preparedVotations } });
    const updateResults = updateResponse.data?.updateVotations as Votation[];
    return formatVotations(updateResults) as Votation[];
  };

  const handleCreateVotations = async (votations: Votation[]) => {
    const preparedVotations = votations.map((votation) => {
      return {
        title: votation.title,
        description: votation.description,
        index: votation.index,
        blankVotes: votation.blankVotes,
        hiddenVotes: votation.hiddenVotes,
        type: votation.type,
        numberOfWinners: votation.numberOfWinners,
        majorityThreshold: votation.majorityThreshold,
        alternatives: votation.alternatives
          .map((alternative) => alternative.text)
          .filter((alternative) => alternative !== ''),
      };
    });
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
      duration: 5000,
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
        <Loading asOverlay={true} text="Oppdaterer votering" />
      )}
      {loading && <Loading text="Henter voteringer" asOverlay={true} />}
      {ongoingVotation && navigateToOpenVotation && (
        <>
          <Heading as="h1" fontSize="1em">
            {'Aktiv votering'}
          </Heading>
          <OpenVotation
            onClick={() => navigateToOpenVotation(ongoingVotation.id)}
            isAdmin={role === Role.Admin}
            votationTitle={ongoingVotation.title}
            index={ongoingVotation.index}
            isActive={true}
          />
        </>
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
            showStartNextButton={role === Role.Admin && !hideOpenVotationButton}
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
          <Heading as="h1" fontSize="1em" mb="1.125em">
            Avsluttede voteringer
          </Heading>
          <Accordion allowToggle>
            {endedVotations.map((votation) => (
              <EndedVotation key={votation.id} role={role} votation={votation} duplicateVotation={duplicateVotation} />
            ))}
          </Accordion>
        </VStack>
      )}
    </VStack>
  );
};

export default VotationList;
