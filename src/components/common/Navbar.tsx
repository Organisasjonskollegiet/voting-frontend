import React, { ReactNode } from 'react';
import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  Stack,
  Image,
  Button,
  Divider,
  Avatar,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Text,
  VStack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { darkblue } from '../styles/colors';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router';
import Logo from '../../static/logo.svg';
import { useAuth0 } from '@auth0/auth0-react';
import { boxShadow } from '../styles/formStyles';

const links: Map<string, string> = new Map([
  ['Mine møter', '/'],
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
  const { logout, user } = useAuth0();
  const navigate = useNavigate();

  return (
    <Box bg="white" px="2rem" boxShadow="0px 4px 4px rgba(0, 0, 0, 0.05)" position="relative">
      <Flex as="nav" h="5.5rem" alignItems="center" justifyContent="space-between">
        <Box w="100px" justifyContent="start">
          <Image
            _hover={{ cursor: 'pointer' }}
            onClick={() => navigate('/', { replace: true })}
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

        <Box display={{ base: 'none', md: 'flex' }}>
          <Popover>
            <PopoverTrigger>
              <Button rightIcon={<ChevronDownIcon />} bg="transparent" _hover={{ backgroundColor: 'transparent' }}>
                <Avatar background={darkblue} size="sm" />
              </Button>
            </PopoverTrigger>
            <PopoverContent boxShadow={boxShadow} marginX="1rem" _focus={{ border: 'none' }} p="1rem">
              <VStack alignItems="start">
                <Text opacity="0.5">{user?.email}</Text>
                <Divider />
                <Button
                  onClick={() => logout({ returnTo: window.location.origin })}
                  _hover={{ bg: 'transparent' }}
                  w="fit-content"
                  h="fit-content"
                  p="0"
                  bg="transparent"
                >
                  <Text marginX="-16px" fontWeight="normal">
                    Logg ut
                  </Text>
                </Button>
              </VStack>
            </PopoverContent>
          </Popover>
        </Box>

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
