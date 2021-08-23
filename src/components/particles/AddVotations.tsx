import React, { useEffect, useState } from 'react';
import { Heading, VStack, Text, useToast, Center } from '@chakra-ui/react';
import AddMeetingVotationList from '../molecules/AddMeetingVotationList';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import {
  MajorityType,
  useCreateVotationsMutation,
  useUpdateVotationsMutation,
  useDeleteVotationsMutation,
  useDeleteAlternativesMutation,
  useVotationsByMeetingIdLazyQuery,
} from '../../__generated__/graphql-types';
import AddMeetingController from '../molecules/AddMeetingController';
import Loading from '../atoms/Loading';
import { h1Style } from './formStyles';
import { v4 as uuid } from 'uuid';
import { Votation, Alternative } from '../../types/types';

interface IProps {
  meetingId: string;
  onVotationsCreated: () => void;
  handlePrevious: () => void;
  isActive: boolean;
  votationsMayExist: boolean; // If votations may exists, we fetch votations from backend
}

const getEmptyVotation = () => {
  return [
    {
      id: uuid(),
      title: '',
      description: '',
      index: 1,
      alternatives: [
        {
          id: uuid(),
          text: '',
          index: 0,
          existsInDb: false,
        },
      ],
      blankVotes: false,
      hiddenVotes: true,
      severalVotes: false,
      majorityType: 'SIMPLE' as MajorityType,
      majorityThreshold: 50,
      existsInDb: false,
      isEdited: false,
    },
  ];
};

const AddVotations: React.FC<IProps> = ({
  isActive,
  meetingId,
  handlePrevious,
  onVotationsCreated,
  votationsMayExist,
}) => {
  const [createVotations, createVotationsResult] = useCreateVotationsMutation();

  const [updateVotations, updateVotationsResult] = useUpdateVotationsMutation();

  const [deleteVotations, deleteVotationsResult] = useDeleteVotationsMutation();

  const [deleteAlternatives, deleteAlternativesResult] = useDeleteAlternativesMutation();

  const [state, setState] = useState<{ votations: Votation[] }>({ votations: getEmptyVotation() });

  const [votationsToDelete, setVotationsToDelete] = useState<string[]>([]);

  const [alternativesToDelete, setAlternativesToDelete] = useState<string[]>([]);

  const [getVotationsByMeetingId, { data, loading, error }] = useVotationsByMeetingIdLazyQuery({
    variables: {
      meetingId,
    },
  });

  const toast = useToast();

  useEffect(() => {
    if (votationsMayExist) {
      getVotationsByMeetingId();
    }
  }, [votationsMayExist, getVotationsByMeetingId]);

  const votationsAreEmpty = () => {
    if (state.votations.length !== 1) return;
    const votation = state.votations[0];
    return votation.title === '' && votation.description === '';
  };

  useEffect(() => {
    if (data?.meetingById?.votations && data.meetingById.votations.length > 0 && votationsAreEmpty()) {
      const votations = data.meetingById.votations as Votation[];
      const formattedVotations = formatVotations(votations) ?? getEmptyVotation();
      setState({ votations: formattedVotations });
    }
    // eslint-disable-next-line
  }, [data]);

  useEffect(() => {
    if (!deleteVotationsResult.data?.deleteVotations || votationsToDelete.length === 0) return;
    setVotationsToDelete(
      votationsToDelete.filter((votation) => !deleteVotationsResult.data?.deleteVotations?.includes(votation))
    );
  }, [deleteVotationsResult.data?.deleteVotations, setVotationsToDelete, votationsToDelete]);

  useEffect(() => {
    if (!deleteAlternativesResult.data?.deleteAlternatives || alternativesToDelete.length === 0) return;
    const rest = alternativesToDelete.filter(
      (alternative) => !deleteAlternativesResult.data?.deleteAlternatives?.includes(alternative)
    );
    setAlternativesToDelete(rest);
    // eslint-disable-next-line
  }, [deleteAlternativesResult.data?.deleteAlternatives]);

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
    const untouchedVotations = state.votations.filter((v) => !v.isEdited && v.existsInDb);
    const votations = [...untouchedVotations, ...createdVotations, ...updatedVotations] as Votation[];
    setState({ votations: votations.sort((a, b) => a.index - b.index) });
    onVotationsCreated();
    // eslint-disable-next-line
  }, [createVotationsResult.data?.createVotations, updateVotationsResult.data?.updateVotations]);

  const formatVotations = (votations: Votation[]) => {
    if (!votations) return;
    return votations.map((votation) => {
      return {
        ...votation,
        existsInDb: true,
        isEdited: false,
        alternatives: votation.alternatives.map((alternative: Alternative, index: number) => {
          return {
            ...alternative,
            index: index,
            existsInDb: true,
          };
        }),
      };
    });
  };

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

    const votations = reorder(state.votations, result.source.index, result.destination.index);

    const updatedVotations: Votation[] = votations.map((votation, index) => {
      return {
        ...votation,
        index: index,
      };
    });

    setState({ votations: updatedVotations });
  }

  const onVotationsUpdated = (votations: Votation[]) => {
    setState({ votations });
  };

  const isValidVotation = (votation: Votation) => {
    return votation.title !== '';
  };

  const handleCreateVotations = (votations: Votation[]) => {
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
    console.log(preparedVotations);
    createVotations({ variables: { votations: preparedVotations, meetingId } });
  };

  const deleteVotation = (votation: Votation) => {
    if (votationsToDelete.includes(votation.id)) return;
    if (votation.existsInDb) setVotationsToDelete([...votationsToDelete, votation.id]);
    if (state.votations.length > 1) {
      setState({
        votations: state.votations.filter((v) => v.id !== votation.id),
      });
    } else {
      setState({
        votations: getEmptyVotation(),
      });
    }
  };

  const deleteAlternative = (id: string) => {
    if (alternativesToDelete.includes(id)) return;
    setAlternativesToDelete([...alternativesToDelete, id]);
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

  const handleNavigation = (nextIndex: number) => {
    if (nextIndex === 0) {
      handlePrevious();
    } else if (nextIndex === 2) {
      handleNext();
    }
  };

  const handleNext = () => {
    if (votationsToDelete.length > 0) {
      deleteVotations({
        variables: {
          ids: votationsToDelete,
        },
      });
    }
    const validVotations = state.votations.filter((votation) => {
      return isValidVotation(votation);
    });
    deleteAlternatives({
      variables: {
        ids: alternativesToDelete,
      },
    });
    if (validVotations.length === 0) {
      // this navigates to add participant page
      onVotationsCreated();
      return;
    }
    const votationsToCreate = validVotations.filter((votation) => !votation.existsInDb);
    const votationsToUpdate = validVotations.filter((votation) => votation.existsInDb && votation.isEdited);
    handleCreateVotations(votationsToCreate);
    handleUpdateVotations(votationsToUpdate);
  };

  if (!isActive) return <></>;

  if (error && !loading) {
    return (
      <Center mt="10vh">
        <Text>Det skjedde noe galt under innlastingen</Text>
      </Center>
    );
  }

  if (loading) {
    return <Loading asOverlay={false} text={'Henter voteringer'} />;
  }

  return (
    <>
      {(createVotationsResult.loading || updateVotationsResult.loading) && (
        <Loading asOverlay={true} text="Oppdaterer voteringer" />
      )}
      <VStack spacing="5" align="left">
        <Heading sx={h1Style} as="h1">
          Legg til voteringer
        </Heading>
        <Text fontSize="20px">
          Her kan du legge til informasjon om møtet. Voteringer kan også legges til på et senere tidspunkt.
        </Text>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="list">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <AddMeetingVotationList
                  votations={state.votations}
                  deleteVotation={deleteVotation}
                  updateVotations={onVotationsUpdated}
                  deleteAlternative={deleteAlternative}
                />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </VStack>
      <AddMeetingController handleNavigation={handleNavigation} showPrev={true} activeTab={1} />
    </>
  );
};

export default AddVotations;
