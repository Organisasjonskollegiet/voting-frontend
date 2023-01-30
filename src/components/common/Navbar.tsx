import React from 'react';
import { Box, Flex, HStack, IconButton, useDisclosure, Stack, Image, Button, Divider } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { darkblue } from '../styles/colors';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router';
import Logo from '../../static/logo.svg';
import UserMenu from './UserMenu';
import { useAuth0 } from '@auth0/auth0-react';
import { useLocation } from 'react-router';

const Navbar: React.FC = () => {
  const { isAuthenticated } = useAuth0();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg="white" px="2rem" boxShadow="0px 4px 4px rgba(0, 0, 0, 0.05)" position="relative">
      <Flex as="nav" h="5.5rem" alignItems="center" justifyContent="space-between">
        <HomeButton />

        {!isAuthenticated ? (
          <LogInButton />
        ) : (
          <>
            <HStack as={'nav'} spacing="2em" display={{ base: 'none', md: 'flex' }}>
              <Links />
            </HStack>

            <UserMenu />

            <HamburgerTrigger isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
          </>
        )}
      </Flex>

      {isOpen && <HamburgerBody onClose={onClose} />}
    </Box>
  );
};

const LogInButton = () => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  const location = useLocation();

  const logIn = () => {
    if (isLoading || isAuthenticated) return;
    setTimeout(
      () =>
        loginWithRedirect({
          appState: {
            returnTo: location.pathname,
          },
        }),
      500
    );
  };

  return (
    <Button w="200px" size="md" colorScheme="orange" onClick={logIn}>
      Logg inn
    </Button>
  );
};

const HomeButton = () => {
  const navigate = useNavigate();

  return (
    <Box w="100px" justifyContent="start">
      <Image
        src={Logo}
        alt="Organisasjonskollegiet"
        h="3em"
        onClick={() => navigate('/', { replace: true })}
        _hover={{ cursor: 'pointer' }}
      />
    </Box>
  );
};

const Links = ({ onClose }: { onClose?: () => void }) => {
  const links: { text: string; link: string }[] = [
    { text: 'Mine møter', link: '/myMeetings' },
    { text: 'Opprett møte', link: '/meeting/new' },
    { text: 'Om oss', link: '/about' },
  ];

  return (
    <>
      {links.map((page) => (
        <NavLink style={{ fontWeight: 'bold' }} to={page.link} key={page.text}>
          <Button w="100%" justifyContent="left" variant="link" onClick={onClose}>
            {page.text}
          </Button>
        </NavLink>
      ))}
    </>
  );
};

const HamburgerTrigger = ({
  isOpen,
  onOpen,
  onClose,
}: {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}) => {
  return (
    <IconButton
      bg="white"
      size={'md'}
      icon={isOpen ? <CloseIcon color={darkblue} boxSize="1em" /> : <HamburgerIcon color={darkblue} boxSize="1.5em" />}
      aria-label={'Open Menu'}
      display={{ md: 'none' }}
      onClick={isOpen ? onClose : onOpen}
    />
  );
};

const HamburgerBody = ({ onClose }: { onClose: () => void }) => {
  const { logout } = useAuth0();
  return (
    <Box pb={4} display={{ md: 'none' }}>
      <Divider mb="1rem" />
      <Stack as={'nav'} spacing={2} pl="0.5em">
        <Links onClose={onClose} />
        <NavLink style={{ fontWeight: 'bold' }} to={"/myProfile"} key={"Min profil"}>
          <Button w="100%" justifyContent="left" variant="link" onClick={onClose}>
            {"Min profil"}
          </Button>
        </NavLink>
        <Button maxW="max-content" variant="link" onClick={() => logout({ returnTo: window.location.origin })}>
          Logg ut
        </Button>
      </Stack>
    </Box>
  );
};

export default Navbar;
