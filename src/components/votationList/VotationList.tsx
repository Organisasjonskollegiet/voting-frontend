import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Box, Button, Center, Heading, HStack, useToast, VStack, Text, Accordion } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import {
  VotationType,
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
import { darkblue } from '../styles/theme';
import VotationListSection from './VotationListSection';
import EndedVotation from './endedVotations/EndedVotation';
import OpenVotation from './OpenVotation';

interface VotationListProps {
  meetingId: string;
  votationsMayExist: boolean;
  isMeetingLobby: boolean;
  role: Role | undefined;
  hideOpenVotationButton: boolean;
  navigateToOpenVotation?: (openVotation: string | null) => void;
}

const getEmptyAlternative = () => {
  return {
    id: uuid(),
    text: '',
    index: 0,
    existsInDb: false,
  };
};

const getEmptyVotation = (id?: string, index?: number) => {
  return {
    id: id ?? uuid(),
    title: '',
    description: '',
    index: index ?? 0,
    alternatives: [getEmptyAlternative()],
    blankVotes: false,
    status: VotationStatus.Upcoming,
    hiddenVotes: true,
    type: 'SIMPLE' as VotationType,
    numberOfWinners: 1,
    majorityThreshold: 50,
    existsInDb: false,
    isEdited: false,
  };
};

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
  });

  const [updateVotations, updateVotationsResult] = useUpdateVotationsMutation();

  const [updateVotationIndexes] = useUpdateVotationIndexesMutation();

  const [createVotations, createVotationsResult] = useCreateVotationsMutation();

  const [deleteVotations] = useDeleteVotationsMutation();

  const [votations, setVotations] = useState<Votation[]>([getEmptyVotation()]);

  const [activeVotationId, setActiveVotationId] = useState<string>(votations[0].id);

  const [deleteAlternatives] = useDeleteAlternativesMutation();

  const [updateVotationStatus, updateVotationStatusResult] = useUpdateVotationStatusMutation();

  const toast = useToast();

  const votationsAreEmpty = () => {
    if (votations.length !== 1) return;
    const votation = votations[0];
    return votation.title === '' && votation.description === '';
  };

  // If there may exist votations (you are editing meeting or already been on add votations page), fetch votations from the backend
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

  useEffect(() => {
    if (data?.meetingById?.votations && data.meetingById.votations.length > 0 && votationsAreEmpty()) {
      const votations = data.meetingById.votations as Votation[];
      const winners = data.resultsOfPublishedVotations as Votation[];
      const formattedVotations = formatVotations(votations, winners) ?? [getEmptyVotation()];
      const nextVotationIndex = Math.max(...votations.map((votation) => votation.index)) + 1;
      const shouldAddEmpty =
        !isMeetingLobby && formattedVotations.filter((v) => v.status === VotationStatus.Upcoming).length === 0;
      if (shouldAddEmpty) {
        formattedVotations.push(getEmptyVotation(uuid(), nextVotationIndex));
      }
      setVotations(formattedVotations.sort((a, b) => a.index - b.index));
      setActiveVotationId(formattedVotations[formattedVotations.length - 1].id);
    }
    // eslint-disable-next-line
  }, [data]);

  useEffect(() => {
    if (!createVotationsResult.data?.createVotations || !updateVotationsResult.data?.updateVotations) return;
    toast({
      title: 'Voteringer oppdatert.',
      description: 'Voteringene har blitt opprettet',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
    const createResults = createVotationsResult.data.createVotations as Votation[];
    const updateResults = updateVotationsResult.data.updateVotations as Votation[];
    const createdVotations = formatVotations(createResults) as Votation[];
    const updatedVotations = formatVotations(updateResults) as Votation[];
    const untouchedVotations = votations.filter((v) => !v.isEdited && v.existsInDb);
    const newVotations = [...untouchedVotations, ...createdVotations, ...updatedVotations] as Votation[];
    setVotations(newVotations.sort((a, b) => a.index - b.index));
    // eslint-disable-next-line
  }, [createVotationsResult.data?.createVotations, updateVotationsResult.data?.updateVotations]);

  const alternativeMapper = (alternative: Alternative, index: number) => {
    return {
      ...alternative,
      index: index,
      existsInDb: true,
    };
  };

  const formatVotation = (votation: Votation, alternatives?: Alternative[]) => {
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
  };

  const formatVotations = (votations: Votation[], winners?: Votation[]) => {
    if (!votations) return;
    return votations.map((votation) => {
      if (winners && votation.status === VotationStatus.PublishedResult) {
        const indexOfVotation = winners.map((v) => v.id).indexOf(votation.id);
        if (indexOfVotation !== -1) return formatVotation(votation, winners[indexOfVotation].alternatives);
      }
      return formatVotation(votation);
    });
  };

  const reorder = (list: Votation[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  async function onDragEnd(result: DropResult) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const reorderedVotations = reorder(votations, result.source.index, result.destination.index);

    const updatedVotations: Votation[] = reorderedVotations.map((v, index) => {
      return {
        ...v,
        index,
      };
    });
    await updateIndexes(updatedVotations);
    setVotations(updatedVotations);
  }

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
      const remainingVotations = votations
        .filter((v) => v.id !== votation.id)
        .sort((a, b) => a.index - b.index)
        .map((v, index) => {
          return {
            ...v,
            index,
          };
        });
      await updateIndexes(remainingVotations);
      const keyOfEmptyVotation = uuid();
      setVotations(remainingVotations.length > 0 ? remainingVotations : [getEmptyVotation(keyOfEmptyVotation)]);
      setActiveVotationId(
        remainingVotations.length > votation.index
          ? votations[votation.index].id
          : remainingVotations.length > 0
          ? votations[remainingVotations.length - 1].id
          : keyOfEmptyVotation
      );
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

  const updateVotation = (votation: Votation) => {
    const votationsCopy = Array.from(votations);
    const indexOfUpdatedVotation = votations.findIndex((v) => v.id === votation.id);
    votationsCopy[indexOfUpdatedVotation] = votation;
    setVotations(votationsCopy);
  };

  const duplicateVotation = (votation: Votation) => {
    const newId = uuid();
    const nextVotationIndex = Math.max(...votations.map((votation) => votation.index)) + 1;
    const newDuplicatedVotation = {
      ...votation,
      id: newId,
      existsInDb: false,
      index: nextVotationIndex,
      status: VotationStatus.Upcoming,
      alternatives: votation.alternatives.map((alt) => ({ ...alt, isWinner: false })),
    };
    setVotations([...votations, newDuplicatedVotation]);
    setActiveVotationId(newId);
    toast({
      title: 'Votering duplisert',
      description: 'Du finner voteringen under "Kommende voteringer" eller "Neste votering".',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

  const handleUpdateVotations = (votations: Votation[]) => {
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
    updateVotations({ variables: { votations: preparedVotations } });
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
    createVotations({ variables: { votations: preparedVotations, meetingId } });
  };

  const handleSave = (votations: Votation[]) => {
    const validVotations = votations.filter((v) => v.title !== '');
    const votationsToCreate = validVotations.filter((votation) => !votation.existsInDb);
    const votationsToUpdate = validVotations.filter((votation) => votation.existsInDb && votation.isEdited);
    handleCreateVotations(votationsToCreate);
    handleUpdateVotations(votationsToUpdate);
  };

  if (error) {
    return (
      <>
        <Box h="57px" w="100vw" bgColor={darkblue}></Box>
        <Center mt="10vh">
          <Text>Det skjedde noe galt under innlastingen</Text>
        </Center>
      </>
    );
  }

  const checkIfAnyChanges = () => {
    return votations.filter((v) => v.title !== '' && (!v.existsInDb || v.isEdited)).length > 0;
  };

  const startVotation = () => {
    updateVotationStatus({ variables: { votationId: upcomingVotations[0].id, status: VotationStatus.Open } });
  };

  const openVotation = votations.find(
    (v) => v.status === VotationStatus.Open || v.status === VotationStatus.CheckingResult
  );
  const upcomingVotations = votations.filter((v) => v.status === VotationStatus.Upcoming);

  const endedVotations = votations.filter(
    (v) => v.status === VotationStatus.PublishedResult || v.status === VotationStatus.Invalid
  );

  return (
    <VStack w="100%" h="100%" alignItems="start" spacing="32px">
      {createVotationsResult.loading && <Loading asOverlay={true} text="Oppretter votering" />}
      {loading && <Loading text="Henter voteringer" asOverlay={true} />}
      {openVotation && navigateToOpenVotation && (
        <>
          <Heading as="h1" fontSize="1em">
            {'Aktiv votering'}
          </Heading>
          <OpenVotation
            onClick={() => navigateToOpenVotation(openVotation.id)}
            isAdmin={role === Role.Admin}
            votationTitle={openVotation.title}
            index={openVotation.index}
            isActive={true}
          />
        </>
      )}
      {upcomingVotations.length > 0 && (
        <DragDropContext onDragEnd={onDragEnd}>
          {isMeetingLobby ? (
            <>
              <VotationListSection
                droppableId={'top-list'}
                votations={upcomingVotations.slice(0, 1)}
                setActiveVotationId={setActiveVotationId}
                activeVotationId={activeVotationId}
                updateVotation={updateVotation}
                handleDeleteVotation={handleDeleteVotation}
                handleDeleteAlternative={handleDeleteAlternative}
                duplicateVotation={duplicateVotation}
                handleStartVotation={startVotation}
                checkIfAnyChanges={checkIfAnyChanges}
                handleSaveChanges={() => handleSave(votations)}
                showStartNextButton={role === Role.Admin && !hideOpenVotationButton}
                heading={'Neste votering'}
                isAdmin={role === Role.Admin}
              />
              <VotationListSection
                droppableId={'bottom-list'}
                votations={upcomingVotations.slice(1)}
                setActiveVotationId={setActiveVotationId}
                activeVotationId={activeVotationId}
                updateVotation={updateVotation}
                handleDeleteVotation={handleDeleteVotation}
                handleDeleteAlternative={handleDeleteAlternative}
                duplicateVotation={duplicateVotation}
                handleStartVotation={startVotation}
                checkIfAnyChanges={checkIfAnyChanges}
                handleSaveChanges={() => handleSave(votations)}
                showStartNextButton={false}
                heading={'Kommende voteringer'}
                isAdmin={role === Role.Admin}
              />
            </>
          ) : (
            <VotationListSection
              droppableId={'list'}
              votations={upcomingVotations}
              setActiveVotationId={setActiveVotationId}
              activeVotationId={activeVotationId}
              updateVotation={updateVotation}
              handleDeleteVotation={handleDeleteVotation}
              handleDeleteAlternative={handleDeleteAlternative}
              duplicateVotation={duplicateVotation}
              handleStartVotation={startVotation}
              checkIfAnyChanges={checkIfAnyChanges}
              handleSaveChanges={() => handleSave(votations)}
              showStartNextButton={false}
              heading={'Kommende voteringer'}
              isAdmin={role === Role.Admin}
            />
          )}
        </DragDropContext>
      )}
      {role === Role.Admin && (
        <HStack w="100%" justifyContent="space-between">
          <Button
            w={'250px'}
            rightIcon={<AddIcon w={3} h={3} />}
            borderRadius={'16em'}
            onClick={() => {
              const id = uuid();
              const nextVotationIndex = Math.max(...votations.map((votation) => votation.index)) + 1;
              setVotations([...votations, { ...getEmptyVotation(id), index: nextVotationIndex }]);
              setActiveVotationId(id);
            }}
          >
            Legg til votering
          </Button>
          <Button
            disabled={!checkIfAnyChanges()}
            bg="gray.500"
            color="white"
            w={'250px'}
            borderRadius={'16em'}
            onClick={() => handleSave(votations)}
          >
            Lagre endringer
          </Button>
        </HStack>
      )}
      {endedVotations.length > 0 && (
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
