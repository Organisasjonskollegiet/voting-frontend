import React, { useEffect, useState } from 'react';
import AddVotationForm from './AddVotationForm';
import { v4 as uuid } from 'uuid';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { Button, HStack, useToast, VStack } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import {
  MajorityType,
  useCreateVotationsMutation,
  useDeleteAlternativesMutation,
  useDeleteVotationsMutation,
  useUpdateVotationsMutation,
  useVotationsByMeetingIdLazyQuery,
  VotationStatus,
  Votation as VotationResult,
} from '../../__generated__/graphql-types';
import { Votation, Alternative } from '../../types/types';
import Loading from '../atoms/Loading';

interface VotationListProps {
  votations: Votation[];
  updateVotations: (votations: Votation[]) => void;
  deleteVotation: (votation: Votation) => void;
  deleteAlternative: (id: string) => void;
  nextIndex: number;
  setNextIndex: (index: number) => void;
  activeVotationId: string;
  setActiveVotationId: (id: string) => void;
  onDragEnd: (result: DropResult) => void;
  meetingId: string;
  votationsMayExist: boolean;
}

const getEmptyAlternative = () => {
  return {
    id: uuid(),
    text: '',
    index: 0,
    existsInDb: false,
  };
};

const getEmptyVotation = (id?: string) => {
  return {
    id: id ?? uuid(),
    title: '',
    // key: key ?? uuid(),
    description: '',
    index: 1,
    alternatives: [getEmptyAlternative()],
    blankVotes: false,
    status: VotationStatus.Upcoming,
    hiddenVotes: true,
    severalVotes: false,
    majorityType: 'SIMPLE' as MajorityType,
    majorityThreshold: 50,
    existsInDb: false,
    isEdited: false,
  };
};

const AddMeetingVotationList: React.FC<VotationListProps> = ({
  // votations,
  // updateVotations,
  // deleteVotation,
  // deleteAlternative,
  // nextIndex,
  // setNextIndex,
  // activeVotationId,
  // setActiveVotationId,
  // onDragEnd,
  meetingId,
  votationsMayExist,
}) => {
  const [getVotationsByMeetingId, { data, loading, error }] = useVotationsByMeetingIdLazyQuery({
    variables: {
      meetingId,
    },
  });

  const [updateVotations, updateVotationsResult] = useUpdateVotationsMutation();

  const [createVotations, createVotationsResult] = useCreateVotationsMutation();

  const [deleteVotations, deleteVotationsResult] = useDeleteVotationsMutation();

  const [nextVotationIndex, setNextVotationIndex] = useState<number>(0);

  const [votations, setVotations] = useState<Votation[]>([getEmptyVotation()]);

  const [activeVotationId, setActiveVotationId] = useState<string>(votations[0].id);

  const [deleteAlternatives, deleteAlternativesResult] = useDeleteAlternativesMutation();

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
    if (data?.meetingById?.votations && data.meetingById.votations.length > 0 && votationsAreEmpty()) {
      const votations = data.meetingById.votations.map((v) => {
        return {
          ...v,
          key: v!.id,
        };
      }) as Votation[];
      const formattedVotations = formatVotations(votations) ?? [getEmptyVotation()];
      setNextVotationIndex(Math.max(...votations.map((votation) => votation.index)) + 1);
      setVotations(formattedVotations);
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
      duration: 9000,
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
  // useEffect(() => {
  //   const votationsFromResponse = updateVotationsResult.data?.updateVotations as Votation[];
  //   const updatedVotations = votations.map((votation) => {
  //     const index = votationsFromResponse.map((v) => v.id).indexOf(votation.id);
  //     if (
  //       index === -1 ||
  //       (votationsFromResponse.length > index && !votationsAreEqual(votation, votationsFromResponse[index]))
  //     ) {
  //       return votation;
  //     } else {
  //       return formatVotation(votationsFromResponse[index]);
  //     }
  //   });
  //   setVotations(updatedVotations);
  // }, [updateVotationsResult.data?.updateVotations, votations]);

  const formatVotation = (votation: Votation) => {
    return {
      ...votation,
      existsInDb: true,
      isEdited: false,
      // key: key,
      alternatives:
        votation.alternatives.length > 0
          ? votation.alternatives.map((alternative: Alternative, index: number) => {
              return {
                ...alternative,
                index: index,
                existsInDb: true,
              };
            })
          : [getEmptyAlternative()],
    };
  };

  const formatVotations = (votations: Votation[]) => {
    if (!votations) return;
    return votations.map((votation) => formatVotation(votation));
  };

  // useEffect(() => {
  //   const alternativeIds = votations.
  //   if (deleteAlternativesResult.data?.deleteAlternatives && deleteAlternativesResult.data.deleteAlternatives.filter(a => a && ) return;
  //   const rest = alternativesToDelete.filter(
  //     (alternative) => !deleteAlternativesResult.data?.deleteAlternatives?.includes(alternative)
  //   );
  //   setAlternativesToDelete(rest);
  //   // eslint-disable-next-line
  // }, [deleteAlternativesResult.data?.deleteAlternatives]);

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

    const updatedVotations: Votation[] = reorderedVotations.map((votation, index) => {
      return {
        ...votation,
        index: index,
        isEdited: false,
      };
    });
    setVotations(updatedVotations);
    // const filteredVotations = updatedVotations.filter((v) => v.title !== '' && v.id);
    // handleUpdateVotation(filteredVotations);
  }

  const handleDeleteVotation = async (votation: Votation) => {
    try {
      if (votation.existsInDb) {
        await deleteVotations({
          variables: {
            ids: [votation.id],
          },
        });
      }
      const remainingVotations = votations.filter((v) => v.id !== votation.id);
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
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Det oppstod et problem.',
        description: `Vi kunne ikke slette voteringen. Prøv å laste inn siden på nytt.`,
        status: 'error',
        duration: 9000,
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
    } catch (error) {
      toast({
        title: 'Det oppstod et problem.',
        description: `Vi kunne ikke slette alternativet. Prøv å laste inn siden på nytt.`,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  // const [activeVotationId, setActiveVotationId] = useState<string>(votations[0].id);
  // const [nextIndex, setNextIndex] = useState<number>(Math.max(...votations.map((votation) => votation.index)) + 1);

  const updateVotation = (votation: Votation) => {
    const votationsCopy = Array.from(votations);
    const indexOfUpdatedVotation = votations.findIndex((v) => v.id === votation.id);
    votationsCopy[indexOfUpdatedVotation] = votation;
    setVotations(votationsCopy);
  };

  const duplicateVotation = (votation: Votation) => {
    const newKey = uuid();
    setVotations([...votations, { ...votation, id: '', existsInDb: false, index: nextVotationIndex }]);
    setNextVotationIndex(nextVotationIndex + 1);
    setActiveVotationId(newKey);
  };

  const alternativesAreEqual = (a: Alternative, b: Alternative) => {
    return a.id === b.id && a.text === b.text;
  };

  const alternativeListsAreEqual = (a: Alternative[], b: Alternative[]) => {
    let areEqual = true;
    a.forEach((a) => {
      const index = b.map((b) => b.id).indexOf(a.id);
      if (index === -1) {
        areEqual = false;
      } else {
        areEqual = areEqual && alternativesAreEqual(a, b[index]);
      }
    });
    return a.length === b.length && areEqual;
  };

  const votationsAreEqual = (a: Votation, b: Votation) => {
    return (
      a.id === b.id &&
      a.title === b.title &&
      a.description === b.description &&
      a.index === b.index &&
      a.blankVotes === b.blankVotes &&
      a.hiddenVotes === b.hiddenVotes &&
      a.severalVotes === b.severalVotes &&
      a.majorityType === b.majorityType &&
      a.majorityThreshold === b.majorityThreshold &&
      alternativeListsAreEqual(a.alternatives, b.alternatives)
    );
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
        severalVotes: votation.severalVotes,
        majorityType: votation.majorityType,
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
  // const handleUpdateVotation = async (votationsToUpdate: Votation[]) => {
  //   const preparedVotations = votationsToUpdate.map((votation) => {
  //     return {
  //       id: votation.id,
  //       title: votation.title,
  //       description: votation.description,
  //       index: votation.index,
  //       blankVotes: votation.blankVotes,
  //       hiddenVotes: votation.hiddenVotes,
  //       severalVotes: votation.severalVotes,
  //       majorityType: votation.majorityType,
  //       majorityThreshold: votation.majorityThreshold,
  //       alternatives: votation.alternatives
  //         .map((alternative) => {
  //           return {
  //             id: alternative.id,
  //             text: alternative.text,
  //           };
  //         })
  //         .filter((alternative) => alternative.text !== ''),
  //     };
  //   });
  //   try {
  //     console.log(preparedVotations);
  //     const response = await updateVotations({
  //       variables: {
  //         votations: preparedVotations,
  //       },
  //     });
  //     // const votationsFromResponse = response.data?.updateVotations as Votation[];
  //     // const idsUpdated = votationsFromResponse.map((v) => v.id);
  //     // const updatedVotations = votations.map((votation) => {
  //     //   const index = votationsFromResponse.map((v) => v.id).indexOf(votation.id);
  //     //   if (
  //     //     index === -1 ||
  //     //     (votationsFromResponse.length > index && !votationsAreEqual(votation, votationsFromResponse[index]))
  //     //   ) {
  //     //     return votation;
  //     //   } else {
  //     //     return formatVotation(votationsFromResponse[index]);
  //     //   }
  //     // });
  //     // setVotations([
  //     //   ...votations.filter((v) => !idsUpdated.includes(v.id)),
  //     //   ...(formatVotations(votationsFromResponse) ?? []),
  //     // ]);
  //   } catch (error) {
  //     toast({
  //       title: 'Det oppstod et problem.',
  //       description: `Vi kunne ikke oppdatere voteringene. Prøv å laste inn siden på nytt.`,
  //       status: 'error',
  //       duration: 9000,
  //       isClosable: true,
  //     });
  //   }
  // };

  const handleCreateVotations = async (votations: Votation[]) => {
    const preparedVotations = votations.map((votation) => {
      return {
        title: votation.title,
        description: votation.description,
        index: votation.index,
        blankVotes: votation.blankVotes,
        hiddenVotes: votation.hiddenVotes,
        severalVotes: votation.severalVotes,
        majorityType: votation.majorityType,
        majorityThreshold: votation.majorityThreshold,
        alternatives: votation.alternatives
          .map((alternative) => alternative.text)
          .filter((alternative) => alternative !== ''),
      };
    });
    createVotations({ variables: { votations: preparedVotations, meetingId } });
  };

  const handleSave = () => {
    const validVotations = votations.filter((v) => v.title !== '');
    const votationsToCreate = validVotations.filter((votation) => !votation.existsInDb);
    const votationsToUpdate = validVotations.filter((votation) => votation.existsInDb && votation.isEdited);
    handleCreateVotations(votationsToCreate);
    handleUpdateVotations(votationsToUpdate);
  };

  // const updateOrCreateIfValid = (votation: Votation) => {
  //   if (!votation.title) return;
  //   if (votation.existsInDb && votation.isEdited && !createVotationsResult.loading) {
  //     setVotations(
  //       [
  //         ...votations.filter((v) => v.id !== votation.id),
  //         {
  //           ...votation,
  //           isEdited: false,
  //           alternatives: votation.alternatives.map((a) => {
  //             return {
  //               ...a,
  //               existsInDb: true,
  //             };
  //           }),
  //         },
  //       ].sort((a, b) => a.index - b.index)
  //     );
  //     handleUpdateVotation([votation]);
  //   } else if (votation.isEdited && !createVotationsResult.loading) {
  //     handleCreateVotation(votation);
  //   }
  // };

  return (
    <VStack w="100%" alignItems="start">
      {createVotationsResult.loading && <Loading asOverlay={true} text="Oppretter votering" />}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="list">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {votations.map((votation: Votation, index: number) => (
                <AddVotationForm
                  toggleCollapsedVotation={() => setActiveVotationId(votation.id)}
                  isActive={votation.id === activeVotationId}
                  votation={votation}
                  index={index}
                  key={votation.id}
                  updateVotation={updateVotation}
                  deleteVotation={handleDeleteVotation}
                  deleteAlternative={handleDeleteAlternative}
                  duplicateVotation={duplicateVotation}
                  // updateOrCreateIfValid={updateOrCreateIfValid}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <HStack w="100%" justifyContent="space-between">
        <Button
          w={'250px'}
          rightIcon={<AddIcon w={3} h={3} />}
          borderRadius={'16em'}
          onClick={() => {
            const id = uuid();
            setVotations([...votations, { ...getEmptyVotation(id), index: nextVotationIndex }]);
            setNextVotationIndex(nextVotationIndex + 1);
            setActiveVotationId(id);
          }}
        >
          Legg til votering
        </Button>
        <Button bg="gray.500" color="white" w={'250px'} borderRadius={'16em'} onClick={handleSave}>
          Lagre endringer
        </Button>
      </HStack>
    </VStack>
  );
};

export default AddMeetingVotationList;
