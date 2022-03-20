import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import PageContainer from '../components/common/layout/PageContainer';
import WrapStack from '../components/common/layout/WrapStack';
// import ChangePassword from '../components/profile/ChangePassword';
import ChangePasswordButton from '../components/profile/ChangePasswordButton';
import DeleteUser from '../components/profile/DeleteUser';

const MyProfile: React.FC = () => {
  return (
    <>
      <PageContainer>
        <Box w="min(90%,800px)" mx="auto" pt="10vh">
          <Heading pb="2rem" fontSize="3xl">
            Min profil
          </Heading>
          <WrapStack breakpoint={600} alignItems="start" spacing="8" justifyContent="space-between">
            <Box>
              <H2>Personlig data</H2>
              <Text maxW={500}>
                Den eneste personlige dataen vi har om deg er din epostaddresse. Epostaddressen din blir vi kun brukt
                for å sende deg en epost når du har blitt lagt til i et møte. Vi kommer aldri til å dele din personlige
                data.
              </Text>
              <Text mt="0.5rem" maxW="500">
                Møteadministratorer vil kunne se din epostaddresse i møter, for å kunne kontrollere hvem som deltar på
                møtet.
              </Text>
            </Box>
            <VStack alignItems="start" maxW={125}>
              <H2>Handlinger</H2>
              <ChangePasswordButton />
              <DeleteUser />
            </VStack>
          </WrapStack>
        </Box>
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
