import { useAuth0 } from '@auth0/auth0-react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  useDisclosure,
  Box,
  Popover,
  PopoverTrigger,
  Button,
  Avatar,
  PopoverContent,
  VStack,
  Text,
  Divider,
} from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { darkblue } from '../styles/colors';
import { boxShadow } from '../styles/formStyles';

const UserMenu: React.VFC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { logout, user } = useAuth0();
  const navigate = useNavigate();

  return (
    <>
      <Box display={{ base: 'none', md: 'flex' }}>
        <Popover {...{ isOpen, onOpen, onClose }}>
          <PopoverTrigger>
            <Button rightIcon={<ChevronDownIcon />} bg="transparent" _hover={{ backgroundColor: 'transparent' }}>
              <Avatar background={darkblue} size="sm" />
            </Button>
          </PopoverTrigger>
          <PopoverContent boxShadow={boxShadow} marginX="1rem" _focus={{ border: 'none' }} p="1rem">
            <VStack alignItems="start">
              <Text opacity="0.5">{user?.email}</Text>
              <Divider />
              <VStack alignItems="start" spacing="4">
                <Button
                  sx={transparentButton}
                  onClick={() => {
                    onClose();
                    navigate('/myProfile');
                  }}
                >
                  <Text marginX="-16px" fontWeight="normal">
                    Min profil
                  </Text>
                </Button>
                <MenuButton onClick={() => logout({ returnTo: window.location.origin })}>Logg ut</MenuButton>
              </VStack>
            </VStack>
          </PopoverContent>
        </Popover>
      </Box>
    </>
  );
};

export default UserMenu;

interface MenuButtonProps {
  onClick: () => void;
}

const MenuButton: React.FC<MenuButtonProps> = ({ children, onClick }) => {
  return (
    <Button onClick={onClick} sx={transparentButton}>
      <Text marginX="-16px" fontWeight="normal">
        {children}
      </Text>
    </Button>
  );
};

const transparentButton = {
  _hover: { bg: 'transparent' },
  width: 'fit-content',
  height: 'fit-content',
  padding: '0',
  background: 'transparent',
} as React.CSSProperties;
