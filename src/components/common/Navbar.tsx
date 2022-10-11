import React, { ReactNode } from 'react';
import { Box, Flex, HStack, IconButton, useDisclosure, Stack, Image, Button, Divider } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { darkblue } from '../styles/colors';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router';
import Logo from '../../static/logo.svg';
import UserMenu from './UserMenu';
import { useAuth0 } from '@auth0/auth0-react';
import LogInButton from './buttons/LogInButton';

const links: Map<string, string> = new Map([
  ['Mine møter', '/myMeetings'],
  // ['Min profil', '/profile'],
  ['Opprett møte', '/meeting/new'],
  ['Om oss', '/about'],
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
  const { logout, isAuthenticated, } = useAuth0();
  const navigate = useNavigate();

  if(!isAuthenticated){
    return (
      <Box bg="white" px="2rem" boxShadow="0px 4px 4px rgba(0, 0, 0, 0.05)" position="relative">
        <Flex as="nav" h="5.5rem" alignItems="center" justifyContent="space-between">
          <Box w="100px" justifyContent="start">
            <Image
              _hover={{ cursor: 'pointer' }}
              onClick={() => 
                (isAuthenticated) ? navigate('/myMeetings', { replace: true }):navigate('/', { replace: true }) }
              src={Logo}
              alt="Organisasjonskollegiet"
              h="3em"
            />
          </Box>
          <LogInButton label='Log In'/>
        </Flex>
      </Box>
        );
  }
  else{
    return (
      <Box bg="white" px="2rem" boxShadow="0px 4px 4px rgba(0, 0, 0, 0.05)" position="relative">
        <Flex as="nav" h="5.5rem" alignItems="center" justifyContent="space-between">
          <Box w="100px" justifyContent="start">
            <Image
              _hover={{ cursor: 'pointer' }}
              onClick={() => 
                (isAuthenticated) ? navigate('/myMeetings', { replace: true }):navigate('/', { replace: true }) }
              src={Logo}
              alt="Organisasjonskollegiet"
              h="3em"
            />
          </Box>
  
          <HStack as={'nav'} spacing="2em" display={{ base: 'none', md: 'flex' }}>
            {pageNames.map((page) => (
              <NavigationLink key={page} link={links.get(page) || ''} onClose={onClose}>
                {page}
              </NavigationLink>
            ))}
          </HStack>
  
          <UserMenu />
  
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
  }
  
};

export default Navbar;
