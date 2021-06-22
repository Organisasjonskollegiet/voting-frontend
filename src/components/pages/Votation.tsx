import React, { useState } from 'react';
import { Participant, Role, Status, useCastVoteMutation, useChangeVotationStatusMutation, useGetParticipantsByMeetingQuery, useGetVotationByIdQuery } from '../../__generated__/graphql-types';
import { Heading, Text, Button, Box, Center, VStack, Divider, Spinner, Link } from '@chakra-ui/react';
import AlternativeList from '../molecules/AlternativeList';
import { Alternative as AlternativeType } from '../../__generated__/graphql-types';
import Loading from '../atoms/Loading';
import { useAuth0 } from '@auth0/auth0-react';
import { useParams } from 'react-router';
import VotationResult from '../atoms/VotationResult';
import { darkblue } from '../particles/theme';

const subTitlesStyle = {
  fontStyle: 'normal',
  fontSize: '16px',
  fontWeight: 'bold',
  lineHeight: '150%',
} as React.CSSProperties;

const h1Style = {
  fontSize: '1.5em',
};

const Votation: React.FC = () => {
  
  const { meetingId, votationId } = useParams<{ meetingId: string, votationId: string }>();

  //Get votation data by query
  const { data: vData, loading: vLoading, error: vError } = useGetVotationByIdQuery({ variables: { votationId: votationId } });

  //Get participants by meeting
  const { data: mData, loading: mLoading, error: mError } = useGetParticipantsByMeetingQuery({variables: { meetingId: meetingId}})

  //Check if user has voted 
  const { user } = useAuth0();
  const [hasUserVoted, sethasUserVoted] = useState<boolean>(vData?.votationById?.hasVoted?.includes(user) || false);

  //Register vote
  const [selectedAlternativeId, setSelectedAlternativeId] = useState<string | null>(null);
  const handleSelect = (id: string | null) => setSelectedAlternativeId(id);
  
  const [castVote] = useCastVoteMutation();
  const submitVote = () => {
    if (selectedAlternativeId) {
      sethasUserVoted(true);
      castVote({ variables: { votationId: votationId, alternativeId: selectedAlternativeId } });
    }
  };

  //Close votation
  const [updateVotationStatus] = useChangeVotationStatusMutation();

  if (vLoading || mLoading) {
    return <>
        <Box h="57px" w="100vw" bgColor={darkblue}></Box>
        <Center mt="10vh">
          <Spinner size="xl" m="auto" />
        </Center>
      </>
  }

  if (vError || mError || vData?.votationById?.id === undefined) {
    return <>
      <Box h="57px" w="100vw" bgColor={darkblue}></Box>
      <Center mt="10vh">
        <Text>Det skjedde noe galt under innlastingen</Text>
      </Center>
    </>
  }

  //Check if user is admin
  const participants = mData?.meetingsById?.participants as Array<Participant>;
  participants.forEach((participant) => console.log(participant))
  const isUserAdmin = participants?.some((participant) => participant.user?.email === user.email && participant.role === Role.Admin)
  

  if ( ! mData?.meetingsById?.participants.includes(user)){
    return (
      <>
      <Box h="57px" w="100vw" bgColor={darkblue}></Box>
        <Center mt="40vh">
          <Text>Du har ikke tilgang til denne voteringen, <Link href="/" textDecoration="underline">gå tilbake til hjemmesiden.</Link>
          </Text>
        </Center>
      </>
    )
  }


  return (
    <Box>
      <Box h="57px" w="100vw" bgColor={darkblue}></Box>
      <Box pb="3em" w="80vw" maxW="max-content" m="auto" color={darkblue} mt="8vh">
        <Heading as="h1" sx={h1Style}>
          <span style={subTitlesStyle}>Sak {vData.votationById.id /* TODO: bytte ut med løpenummer */}</span> <br />
          {vData.votationById.title}
        </Heading>

        <Text mt="1em" mb="2em">
          {vData.votationById.description}
        </Text>

        {vData.votationById.status !== 'ENDED' ? (
          <Box>
            {!hasUserVoted ? (
              /* Show alternatives */
              <VStack spacing="1.5em" align="left">
                <Heading as="h2" sx={subTitlesStyle}>
                  Alternativer
                </Heading>
                <AlternativeList
                  alternatives={ (vData.votationById.alternatives as Array<AlternativeType>) || [] }
                  handleSelect={handleSelect}
                  blankVotes={ vData.votationById.blankVotes || false }
                />
              </VStack>
            ) : (
              <Box mt="4em">
                <Loading text={'Votering pågår'} />
              </Box>
            )}

            <Divider m="3em 0" />

            {/* Submit button */}
            <Center>
              {!hasUserVoted ? (
                <Button
                  onClick={ () => submitVote() }
                  type="submit"
                  p="1.5em 4em"
                  borderRadius="16em"
                  isDisabled={ selectedAlternativeId === null }
                >
                  Avgi Stemme
                </Button>
              ) : (
                <Heading as="h1" sx={ h1Style }>
                  Din stemme er registrert.
                </Heading>
              )}
            </Center>

            {/* Show number of votes */}
            <VStack mt="3em" spacing="0">
              <Center>
                <Text fontSize="2.25em" fontWeight="bold">
                  69 / 80
                </Text>
              </Center>
              <Center>
                <Heading as="h2" sx={ subTitlesStyle }>
                  stemmer
                </Heading>
              </Center>
            </VStack>

            {/* Close votation button for admin */
              isUserAdmin && (
                <Center mt="3em">
                  <Button
                    onClick={ () => updateVotationStatus({variables: { votation: {id: votationId, status: Status.Ended} } }) }
                    p="1.5em 4em"
                    borderRadius="16em"
                    bgColor="darkred"
                    color="white"
                  >
                  Steng avstemning
                  </Button>
                </Center>
              )
            }

          </Box>
        ) : (
          <Box mt="4em">
            <VotationResult
              text={
                //TODO: replace with the winning alternatives text property
                ''
              }
            />
          </Box>
        )}
      </Box>
    </Box> 
  );
};

export default Votation;
