import React, { ReactNode } from 'react';
import { Box, Flex, Avatar, HStack, IconButton, useDisclosure, Stack, Image } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { darkblue, lightblue } from '../particles/theme';
import { Link, NavLink } from 'react-router-dom';

const links: Map<string, string> = new Map([
  ['Mine møter', '/'],
  ['Min profil', '/profile'],
  ['Opprett møte', '/meeting/new'],
]);
const pageNames = Array.from(links.keys());

const NavigationLink = ({ children, link }: { children: ReactNode; link: string }) => (
  <Box color={{ base: lightblue, md: darkblue }} _hover={{ color: { base: '#c6ccd5', md: '#9ca6b6' } }}>
    <NavLink style={{ fontWeight: 'bold' }} to={link}>
      {children}
    </NavLink>
  </Box>
);

const Navbar: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg={{ base: darkblue, md: 'white' }} px="50px" boxShadow="0px 4px 4px rgba(0, 0, 0, 0.05)" zIndex="2" position="relative">
      <Flex as="nav" h="5.5em" alignItems="center" justifyContent="space-between">
        <Image display={{ base: 'none', md: 'flex' }} src="Orgkol_logo.svg" alt="Organisasjonskollegiet" h="3em" />

        <HStack as={'nav'} spacing="5.5em" display={{ base: 'none', md: 'flex' }}>
          {pageNames.map((page) => (
            <NavigationLink key={page} link={links.get(page) || ''}>
              {page}
            </NavigationLink>
          ))}
        </HStack>

        <Box display={{ base: 'none', md: 'flex' }}>
          <Link to={links.get('Min profil') || ''}>
            <Avatar size="sm" />
          </Link>
        </Box>

        {/* Button to toggle hamburger menu */}
        <IconButton
          bg={darkblue}
          size={'md'}
          icon={isOpen ? <CloseIcon color="white" boxSize="1em" /> : <HamburgerIcon color="white" boxSize="1.5em" />}
          aria-label={'Open Menu'}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
      </Flex>

      {/* The hamburger menu */}
      {isOpen && (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as={'nav'} spacing={4} pl="0.5em">
            {pageNames.map((page) => (
              <NavigationLink key={page} link={links.get(page) || ''}>
                {page}
              </NavigationLink>
            ))}
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default Navbar;
