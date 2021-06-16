import React, { ReactNode } from "react"
import { Box, Flex, Avatar, HStack, Link, IconButton, useDisclosure, Stack, Image } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { darkblue, offwhite } from "../particles/theme";

const links: Map<string, string> = new Map([
  ["Mine møter", "/meetings"],
  ["Min profil", "/profile"],
  ["Opprett møte", "/meeting/new"]
]);
const pageArray = Array.from(links.keys());

const NavLink = ({ children, link }: { children: ReactNode, link: string}) => (
  <Link
    color={{base: offwhite, md: darkblue }}
    fontWeight="bold"
    _hover={{color: {base: '#c6ccd5', md: '#9ca6b6' }}}
    href={link}>
    {children}
  </Link>
);

const Navbar: React.FC = () => {

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
      <Box bg={{ base: darkblue, md: "white" }} px="50px" boxShadow="0px 4px 4px rgba(0, 0, 0, 0.05)">
        <Flex h="5.5em" alignItems={'center'} justifyContent={'space-between'}>
          
          <Image 
            display={{ base: 'none', md: 'flex' }} 
            src="Orgkol_logo.svg" 
            alt="organisasjonskollegiet"
            h="3em"
            />

          <HStack
            as={'nav'}
            spacing="5.5em"
            display={{ base: 'none', md: 'flex' }}
          >
            {pageArray.map((page) => (
              <NavLink key={page} link={links.get(page) || ""}>{page}</NavLink>
            ))}
          </HStack>
        
          
          <Flex alignItems={'center'} display={{ base: 'none', md: 'flex' }}>
            <Avatar size="sm"></Avatar>
          </Flex>

          {/* Button to toggle hamburger menu */}
          <IconButton
            bg={darkblue}
            size={'md'}
            icon={isOpen ? <CloseIcon color="white" boxSize="1em"/> : <HamburgerIcon color="white" boxSize="1.5em"/>}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
        </Flex>

        {/* The hamburger menu */}
        {isOpen && (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4} pl="0.5em">
              {pageArray.map((page) => (
                <NavLink key={page} link={links.get(page) || ""}>{page}</NavLink>
              ))}
            </Stack>
          </Box>
        )}
      </Box>
  );
};

export default Navbar;

