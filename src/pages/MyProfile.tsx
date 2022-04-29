import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import PageContainer from '../components/common/layout/PageContainer';
import ChangePasswordButton from '../components/profile/ChangePasswordButton';
import DeleteUser from '../components/profile/DeleteUser';

const MyProfile: React.FC = () => {
  return (
    <>
      <PageContainer>
        <VStack w="min(90%,800px)" spacing="8" mx="auto" pt="10vh" justify="flex-start" alignItems="center">
          <Heading fontSize="3xl">Min profil</Heading>
          <Box mb="5rem !important">
            <H2>Personlig data</H2>
            <Text maxW={500}>
              Den eneste personlige dataen vi har om deg er din epostaddresse. Epostaddressen din blir vi kun brukt for
              å sende deg en epost når du har blitt lagt til i et møte. Vi kommer aldri til å dele din personlige data.
            </Text>
            <Text mt="0.5rem" maxW="500">
              Møteadministratorer vil kunne se din epostaddresse i møter, for å kunne kontrollere hvem som deltar på
              møtet.
            </Text>
          </Box>
          <ChangePasswordButton />
          <DeleteUser />
        </VStack>
      </PageContainer>
    </>
  );
};

const H2: React.FC = ({ children }) => {
  return (
    <Heading as="h2" fontSize="2xl" pb="0.25rem">
      {children}
    </Heading>
  );
};

export default MyProfile;
