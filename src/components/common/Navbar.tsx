import React, { ReactNode } from 'react';
import {
  Box,
  Flex,
  /*Avatar,*/ HStack,
  IconButton,
  useDisclosure,
  Stack,
  Image,
  Button,
  Divider,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { darkblue } from '../styles/theme';
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router';
import Logo from '../../static/logo.svg';
import { useAuth0 } from '@auth0/auth0-react';

const links: Map<string, string> = new Map([
  ['Mine møter', '/'],
  // ['Min profil', '/profile'],
  ['Opprett møte', '/meeting/new'],
]);
const pageNames = Array.from(links.keys());

const NavigationLink = ({ children, link, onClose }: { children: ReactNode; link: string; onClose: () => void }) => (
  <NavLink style={{ fontWeight: 'bold' }} to={link}>
    <Button w="100%" justifyContent="left" variant="link" onClick={onClose}>
      {children}
    </Button>
  </NavLink>
);

const Navbar: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { logout } = useAuth0();
  const history = useHistory();

  return (
    <Box bg="white" px="5%" boxShadow="0px 4px 4px rgba(0, 0, 0, 0.05)" zIndex="2" position="relative">
      <Flex as="nav" h="5.5rem" alignItems="center" justifyContent="space-between">
        <Image
          _hover={{ cursor: 'pointer' }}
          onClick={() => history.push('/')}
          src={Logo}
          alt="Organisasjonskollegiet"
          h="3em"
          w="100px"
        />

        <HStack as={'nav'} spacing="3.5em" display={{ base: 'none', md: 'flex' }}>
          {pageNames.map((page) => (
            <NavigationLink key={page} link={links.get(page) || ''} onClose={onClose}>
              {page}
            </NavigationLink>
          ))}
        </HStack>

        {/* <Box display={{ base: 'none', md: 'flex' }}> */}
        {/* <Link to={links.get('Min profil') || ''}>
            <Avatar size="sm" />
          </Link> */}
        <Button
          w="100px"
          onClick={() => logout({ returnTo: window.location.origin })}
          display={{ base: 'none', md: 'flex' }}
        >
          Logg ut
        </Button>
        {/* </Box> */}

        {/* Button to toggle hamburger menu */}
        <IconButton
          bg="white"
          size={'md'}
          icon={
            isOpen ? <CloseIcon color={darkblue} boxSize="1em" /> : <HamburgerIcon color={darkblue} boxSize="1.5em" />
          }
          aria-label={'Open Menu'}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
      </Flex>

      {/* The hamburger menu */}
      {isOpen && (
        <Box pb={4} display={{ md: 'none' }}>
          <Divider mb="1rem" />
          <Stack as={'nav'} spacing={2} pl="0.5em">
            {pageNames.map((page) => (
              <NavigationLink key={page} link={links.get(page) || ''} onClose={onClose}>
                {page}
              </NavigationLink>
            ))}
            <Button maxW="max-content" variant="link" onClick={() => logout({ returnTo: window.location.origin })}>
              Logg ut
            </Button>
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default Navbar;
