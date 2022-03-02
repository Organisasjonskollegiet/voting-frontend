import { Box, Button, Heading, Text } from '@chakra-ui/react';
import PageContainer from '../components/common/PageContainer';
import ChangePassword from '../components/profile/ChangePassword';
import DeleteUser from '../components/profile/DeleteUser';

const MyProfile: React.FC = () => {
  return (
    <>
      <PageContainer>
        <Box>
          <Heading as="h1">Personlig data</Heading>
          <Text>
            Den eneste personlige dataen vi har om deg er din epostaddresse. Epostaddressen din blir kun brukt for å
            sende deg en epost når du har blitt lagt til i et møte. Vi kommer aldri til å dele din personlige data.{' '}
          </Text>
        </Box>
        <Box>
          <Heading>Bytt passord</Heading>
          <ChangePassword />
        </Box>
        <Box>
          <Heading>Slett bruker</Heading>
          <DeleteUser />
        </Box>
      </PageContainer>
    </>
  );
};

export default MyProfile;
