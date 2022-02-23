import React, { useState, useContext } from 'react';
import { Center, VStack } from '@chakra-ui/react';
import ManageVotations from '../components/manageMeeting/organisms/ManageVotations';
import ManageParticipants from '../components/manageParticipants/organisms/ManageParticipants';
import { useAuth0 } from '@auth0/auth0-react';
import { useParams } from 'react-router';
import { outerContainer, centerContainer } from '../components/styles/containerStyles';
import PageContainer from '../components/common/PageContainer';
import ManageMeetingController from '../components/manageMeeting/molecules/ManageMeetingController';
import NavigationContextProvider, {
  NavigationContext,
} from '../components/manageMeeting/atoms/NavigationContextProvider';
import ManageMeetingInformation2 from '../components/manageMeeting/organisms/ManageMeetingInformation';

const ManageMeeting: React.FC = () => {
  const { user } = useAuth0();
  const existingId = useParams<{ meetingId: string }>();
  const [meetingId, setMeetingId] = useState<string>(existingId.meetingId);
  const { activeTab } = useContext(NavigationContext);

  return (
    <PageContainer>
      <Center sx={outerContainer}>
        <VStack spacing="10" align="left" maxWidth="800px" sx={centerContainer}>
          {activeTab === 0 && <ManageMeetingInformation2 {...{ meetingId, setMeetingId }} />}
          {activeTab === 1 && <ManageVotations meetingId={meetingId} />}
          {activeTab === 2 && (
            <>
              <ManageParticipants meetingId={meetingId} ownerEmail={user?.email} />
              <ManageMeetingController />
            </>
          )}
        </VStack>
      </Center>
    </PageContainer>
  );
};

const ManageMeetingWithContextProvider: React.FC = () => (
  <NavigationContextProvider>
    <ManageMeeting />
  </NavigationContextProvider>
);

export default ManageMeetingWithContextProvider;
