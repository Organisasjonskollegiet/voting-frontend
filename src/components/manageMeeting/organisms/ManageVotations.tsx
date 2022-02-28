import React from 'react';
import { Heading, VStack, Text } from '@chakra-ui/react';
import VotationList from '../../votationList/VotationList';
import { Role } from '../../../__generated__/graphql-types';
interface IProps {
  meetingId: string;
}

const ManageVotations: React.FC<IProps> = ({ meetingId }) => {
  return (
    <>
      <VStack spacing="5" w="100%" maxWidth="800px" align="left">
        <Heading size="lg">Legg til voteringer</Heading>
        <Text fontSize="lg">
          Her kan du legge til voteringer. Voteringer kan også legges til på et senere tidspunkt.
        </Text>
        <VotationList hideStartNextButton={true} role={Role.Admin} isMeetingLobby={false} meetingId={meetingId} />
      </VStack>
    </>
  );
};

export default ManageVotations;
