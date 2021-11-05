import React, { createContext, useCallback, useEffect, useState } from 'react';
import { Center, Box, Heading, Text, VStack, Divider, HStack } from '@chakra-ui/react';
import { useParams, useHistory } from 'react-router';
import {
  useVotationOpenedForMeetingSubscription,
  useGetMeetingForLobbyQuery,
  Role,
  VotationStatus,
  useGetParticipantQuery,
} from '../__generated__/graphql-types';
import Loading from '../components/common/Loading';
import { h1Style } from '../components/styles/formStyles';
import VotationList from '../components/votationList/VotationList';
import ParticipantModal from '../components/manageParticipants/organisms/ParticipantModal';
import ReturnToPreviousButton from '../components/common/ReturnToPreviousButton';
import LobbyNavigation from '../components/meetingLobby/LobbyNavigation';
import PageContainer from '../components/common/PageContainer';
import ActiveVotation from './ActiveVotation';

export type MeetingContextState = {
  role: Role;
  meetingId: string;
  presentationMode: boolean;
  isVotingEligible: boolean;
};

const contextDefualtValues: MeetingContextState = {
  role: Role.Participant,
  meetingId: '',
  presentationMode: false,
  isVotingEligible: false,
};

export const MeetingContext = createContext<MeetingContextState>(contextDefualtValues);

const MeetingLobby: React.FC = () => {
  const { meetingId } = useParams<{ meetingId: string }>();
  const { data, loading, error } = useGetMeetingForLobbyQuery({
    variables: {
      meetingId,
    },
  });

  const [location, setLocation] = useState<'lobby' | 'activeVotation'>('lobby');
  const [isVotingEligible, setIsVotingEligible] = useState(false);

  const { data: participantResult, error: participantError } = useGetParticipantQuery({ variables: { meetingId } });
  const [role, setRole] = useState<Role>();
  const [openVotation, setOpenVotation] = useState<string | null>(null);
  const { data: votationOpened } = useVotationOpenedForMeetingSubscription({
    variables: {
      meetingId,
    },
  });

  const history = useHistory();

  const [presentationMode, setPresentationMode] = useState(false);

  useEffect(() => {
    if (!participantResult?.myParticipant) return;
    setRole(participantResult.myParticipant.role);
    setIsVotingEligible(participantResult.myParticipant.isVotingEligible);
  }, [participantResult]);

  const navigateToOpenVotation = useCallback((openVotation: string | null) => {
    if (openVotation) setLocation('activeVotation');
  }, []);

  const handleOpenVotation = useCallback((openVotation: string) => {
    setOpenVotation(openVotation);
    setLocation('activeVotation');
  }, []);

  // handle votation being open initially
  useEffect(() => {
    if (!data?.getOpenVotation) return;
    handleOpenVotation(data.getOpenVotation);
  }, [data?.getOpenVotation, role, handleOpenVotation]);

  // handle votation opening
  useEffect(() => {
    if (!votationOpened?.votationOpenedForMeeting) return;
    handleOpenVotation(votationOpened.votationOpenedForMeeting);
  }, [votationOpened, handleOpenVotation]);

  const backToMyMeetings = () => {
    history.push('/');
  };

  const returnToVotationList = (status: VotationStatus) => {
    if (status !== VotationStatus.Open && status !== VotationStatus.CheckingResult) {
      setOpenVotation(null);
    }
    setLocation('lobby');
  };

  if (loading) {
    return <Loading asOverlay={false} text={'Henter møte'} />;
  }

  if (error || participantError) {
    return (
      <Center mt="10vh">
        <Text>Det skjedde noe galt under innlastingen</Text>
      </Center>
    );
  }

  return (
    <MeetingContext.Provider
      value={{
        role: role ?? Role.Participant,
        meetingId,
        presentationMode,
        isVotingEligible,
      }}
    >
      <PageContainer>
        <Box color="gray.500" pb="2em" display="flex" flexDirection="column" alignItems="center">
          {role === Role.Admin && (
            <LobbyNavigation
              togglePresentationMode={() => setPresentationMode(!presentationMode)}
              openVotation={openVotation}
              location={location}
              setLocation={setLocation}
            />
          )}
          {location === 'activeVotation' && openVotation ? (
            <ActiveVotation backToVotationList={returnToVotationList} votationId={openVotation} />
          ) : (
            <VStack w="90vw" maxWidth="800px" alignItems="left" spacing="3em" mt="10vh">
              <VStack alignItems="left">
                <Heading sx={h1Style} as="h1">
                  {data?.meetingById?.title}
                </Heading>
                <VStack align="start">
                  <Text mb="1.125em">Når en avstemning åpner, vil du bli tatt direkte til den.</Text>
                  <VotationList
                    navigateToOpenVotation={navigateToOpenVotation}
                    hideOpenVotationButton={!!openVotation}
                    role={role}
                    isMeetingLobby={true}
                    votationsMayExist={true}
                    meetingId={meetingId}
                  />
                </VStack>
              </VStack>
              <VStack alignItems="left" spacing="1em">
                <Divider />
                <HStack justifyContent="space-between">
                  <ReturnToPreviousButton onClick={backToMyMeetings} text="Tiltake til møteoversikt" />
                  {role === Role.Admin && (
                    <ParticipantModal meetingId={meetingId} ownerEmail={data?.meetingById?.owner?.email} />
                  )}
                </HStack>
              </VStack>
            </VStack>
          )}
        </Box>
      </PageContainer>
    </MeetingContext.Provider>
  );
};

export default MeetingLobby;
