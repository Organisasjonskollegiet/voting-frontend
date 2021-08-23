import React, { useEffect, useState } from 'react';
import AddVotationForm from './AddVotationForm';
import { v4 as uuid } from 'uuid';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { Button, VStack } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import {
  MajorityType,
  useCreateVotationsMutation,
  useDeleteAlternativesMutation,
  useDeleteVotationsMutation,
  useUpdateVotationsMutation,
  useVotationsByMeetingIdLazyQuery,
  VotationStatus,
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
      const votations = data.meetingById.votations as Votation[];
      const formattedVotations = formatVotations(votations) ?? [getEmptyVotation()];
      setNextVotationIndex(Math.max(...votations.map((votation) => votation.index)) + 1);
      setVotations(formattedVotations);
      setActiveVotationId(formattedVotations[formattedVotations.length - 1].id);
    }
    // eslint-disable-next-line
  }, [data]);

  const formatVotation = (votation: Votation) => {
    return {
      ...votation,
      existsInDb: true,
      isEdited: false,
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

  function onDragEnd(result: DropResult) {
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
      };
    });
    // TODO: lagre nye posisjoner i backend
    setVotations(updatedVotations);
  }

  const handleDeleteVotation = async (votationId: string, existsInDb: boolean, index: number) => {
    if (existsInDb) {
      // HANDLE ERROR
      await deleteVotations({
        variables: {
          ids: [votationId],
        },
      });
    }
    const remainingVotations = votations.filter((v) => v.id !== votationId);
    setVotations(remainingVotations.length > 0 ? remainingVotations : [getEmptyVotation()]);
    setActiveVotationId(
      remainingVotations.length > index
        ? remainingVotations[index].id
        : remainingVotations[remainingVotations.length - 1].id
    );
  };

  const handleDeleteAlternative = async (alternativeId: string, votationId: string) => {
    // HANDLE ERROR
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
    const newId = uuid();
    setVotations([...votations, { ...votation, id: newId, existsInDb: false, index: nextVotationIndex }]);
    setNextVotationIndex(nextVotationIndex + 1);
    setActiveVotationId(newId);
  };

  const handleUpdateVotation = async (votation: Votation) => {
    const preparedVotation = {
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
    const response = await updateVotations({
      variables: {
        votations: [preparedVotation],
      },
    });
    console.log(response);
  };

  const handleCreateVotation = async (votation: Votation) => {
    const preparedVotations = {
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
    const response = await createVotations({ variables: { votations: [preparedVotations], meetingId } });
    if (!response.data?.createVotations) return;
    const createdVotation = response.data.createVotations[0] as Votation;
    setVotations([...votations.filter((v) => v.id !== votation.id), formatVotation(createdVotation)]);
    setActiveVotationId(createdVotation.id);
  };

  const updateOrCreateIfValid = (votation: Votation) => {
    console.log('updating', votation.id);
    if (!votation.title) return;
    if (votation.existsInDb && votation.isEdited) {
      console.log('should edit');
      handleUpdateVotation(votation);
    } else if (votation.isEdited) {
      handleCreateVotation(votation);
    }
  };

  // TODO: Add loading for when deleting votation, alternative etc...

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
                  updateOrCreateIfValid={updateOrCreateIfValid}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
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
    </VStack>
  );
};

export default AddMeetingVotationList;
