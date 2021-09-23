import React from 'react';
import { Heading, VStack, Text } from '@chakra-ui/react';
import VotationList from '../votationList/VotationList';
import { Role } from '../../__generated__/graphql-types';
import ManageMeetingController from './ManageMeetingController';
import { h1Style } from '../styles/formStyles';
interface IProps {
  meetingId: string;
  onVotationsCreated: () => void;
  handlePrevious: () => void;
  isActive: boolean;
  votationsMayExist: boolean; // If votations may exists, we fetch votations from backend
}

const ManageVotations: React.FC<IProps> = ({
  isActive,
  meetingId,
  handlePrevious,
  onVotationsCreated,
  votationsMayExist,
}) => {
  const handleNavigation = (nextIndex: number) => {
    if (nextIndex === 0) {
      handlePrevious();
    } else if (nextIndex === 2) {
      handleNext();
    }
  };

  const handleNext = () => {
    onVotationsCreated();
  };

  if (!isActive) return <></>;

  return (
    <>
      <VStack spacing="5" w="90vw" maxWidth="800px" align="left">
        <Heading sx={h1Style} as="h1">
          Legg til voteringer
        </Heading>
        <Text fontSize="20px">
          Her kan du legge til voteringer. Voteringer kan også legges til på et senere tidspunkt.
        </Text>
        <VotationList
          hideOpenVotationButton={true}
          role={Role.Admin}
          isMeetingLobby={false}
          meetingId={meetingId}
          votationsMayExist={votationsMayExist}
        />
      </VStack>
      <ManageMeetingController handleNavigation={handleNavigation} showPrev={true} activeTab={1} />
    </>
  );
};

export default ManageVotations;
