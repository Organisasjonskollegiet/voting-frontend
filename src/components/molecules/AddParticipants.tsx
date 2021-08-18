import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { VStack, Heading, Text } from '@chakra-ui/react';
import AddMeetingController from './AddMeetingController';
import AddParticipantsForm from './AddParticipantsForm';
import { h1Style } from '../particles/formStyles';
import { ParticipantWorking } from '../../types/types';

interface IProps {
  meetingId: string | undefined;
  handlePrevious: (participants: ParticipantWorking[]) => void;
  previouslyAddedParticipants: ParticipantWorking[];
  isActive: boolean;
  ownerEmail: string | undefined;
}

const AddParticipants: React.FC<IProps> = ({
  isActive,
  meetingId,
  previouslyAddedParticipants,
  handlePrevious,
  ownerEmail,
}) => {
  const [participants, setParticipants] = useState<ParticipantWorking[]>([]);
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
    history.push('/');
  };


  if (!isActive) return <></>;

  return (
    <>
      <VStack spacing="5" align="left">
        <Heading sx={h1Style} as="h1">
          Inviter deltagere
        </Heading>
        <Text fontSize="20px">Her kan du invitere deltagere og gi redigeringstilgang</Text>
      </VStack>
      <AddParticipantsForm
        meetingId={meetingId}
        participants={participants}
        setParticipants={setParticipants}
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
