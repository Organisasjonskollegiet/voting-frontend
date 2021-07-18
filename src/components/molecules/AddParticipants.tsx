import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useAddParticipantsMutation, useDeleteParticipantsMutation } from '../../__generated__/graphql-types';
import { VStack, Heading, Text, useToast } from '@chakra-ui/react';
import AddMeetingController from './AddMeetingController';
import AddParticipantsForm from './AddParticipantsForm';
import Loading from '../atoms/Loading';
import { h1Style } from '../particles/formStyles';
import { ParticipantWorking } from '../../types/types';

interface IProps {
  meetingId: string | undefined;
  onParticipantsAdded: () => void;
  handlePrevious: (participants: ParticipantWorking[]) => void;
  previouslyAddedParticipants: ParticipantWorking[];
  isActive: boolean;
  ownerEmail: string | undefined;
}

const AddParticipants: React.FC<IProps> = ({
  isActive,
  meetingId,
  onParticipantsAdded,
  previouslyAddedParticipants,
  handlePrevious,
  ownerEmail,
}) => {
  const [participants, setParticipants] = useState<ParticipantWorking[]>([]);
  const [addParticipants, addParticipantsResult] = useAddParticipantsMutation();
  const [deleteParticipants] = useDeleteParticipantsMutation();
  const [participantsToAddOrUpdate, setParticipantsToAddOrUpdate] = useState<ParticipantWorking[]>([]);
  const [participantsToDelete, setParticipantsToDelete] = useState<string[]>([]);
  const toast = useToast();
  const history = useHistory();

  useEffect(() => {
    if (previouslyAddedParticipants.length > 0) {
      const participantEmails = participants.map((participant: ParticipantWorking) => participant.email);
      setParticipants([
        ...participants,
        ...previouslyAddedParticipants.filter((participant) => !participantEmails.includes(participant.email)),
      ]);
    }
    // eslint-disable-next-line
  }, [previouslyAddedParticipants]);

  const handleNext = () => {
    if (!meetingId) return;
    if (participantsToAddOrUpdate.length > 0) {
      addParticipants({
        variables: {
          meetingId,
          participants: participantsToAddOrUpdate.map((participant) => {
            return {
              email: participant.email,
              role: participant.role,
              isVotingEligible: participant.isVotingEligible,
            };
          }),
        },
      });
    }
    if (participantsToDelete.length > 0) {
      deleteParticipants({ variables: { meetingId, emails: participantsToDelete } });
    }
    history.push('/');
  };

  const handleAddOrUpdateParticipants = (addedOrUpdatedParticipants: ParticipantWorking[]) => {
    const nonUpdatedParticipants: ParticipantWorking[] = [];
    const addedOrUpdatedParticipantEmails = addedOrUpdatedParticipants.map((participant) => participant.email);
    participants.forEach((participant) => {
      if (!addedOrUpdatedParticipantEmails.includes(participant.email)) {
        nonUpdatedParticipants.push(participant);
      }
    });
    // If a participant currently on the delete-list is added, it should be removed from the delete-list
    setParticipantsToDelete(
      participantsToDelete.filter(
        (participantToDelete) => !addedOrUpdatedParticipantEmails.includes(participantToDelete)
      )
    );
    setParticipantsToAddOrUpdate([
      ...participantsToAddOrUpdate.filter(
        (participant) => !addedOrUpdatedParticipantEmails.includes(participant.email)
      ),
      ...addedOrUpdatedParticipants,
    ]);
    setParticipants([...nonUpdatedParticipants, ...addedOrUpdatedParticipants]);
  };

  const deleteParticipant = (participant: ParticipantWorking) => {
    setParticipants(participants.filter((existingParticipant) => existingParticipant.email !== participant.email));
    setParticipantsToAddOrUpdate(
      participantsToAddOrUpdate.filter((existingParticipant) => existingParticipant.email !== participant.email)
    );
    if (participant.existsInDb) setParticipantsToDelete([...participantsToDelete, participant.email]);
  };

  if (addParticipantsResult.data?.addParticipants) {
    const toastId = 'participants-toast';
    if (toast.isActive(toastId)) {
      toast({
        id: toastId,
        title: 'Deltakere lagt til.',
        description: 'Deltakerne har blitt lagt til møtet',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    }
    onParticipantsAdded();
  }

  if (!isActive) return <></>;

  return (
    <>
      {addParticipantsResult.loading && <Loading asOverlay={true} text="Legger til deltakere" />}
      <VStack spacing="5" align="left">
        <Heading sx={h1Style} as="h1">
          Inviter deltagere
        </Heading>
        <Text fontSize="20px">Her kan du invitere deltagere og gi redigeringstilgang</Text>
      </VStack>
      <AddParticipantsForm
        participants={participants}
        addOrUpdateParticipants={handleAddOrUpdateParticipants}
        deleteParticipant={deleteParticipant}
        ownerEmail={ownerEmail}
      />
      <AddMeetingController
        handleNext={handleNext}
        showPrev={true}
        activeTab={2}
        handlePrev={() => handlePrevious(participants)}
      />
    </>
  );
};

export default AddParticipants;
