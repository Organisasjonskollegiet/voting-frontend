import { Box, Button, Flex, Text, useDisclosure, useToast } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDeleteMeMutation } from '../../__generated__/graphql-types';
import { useAuth0 } from '@auth0/auth0-react';
import CustomAlertDialog, { DialogType } from '../common/CustomAlertDialog';

const DeleteUser: React.FC = () => {
  const [deleteUser, { error }] = useDeleteMeMutation();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { logout } = useAuth0();
  const toast = useToast();

  useEffect(() => {
    if (error) {
      toast({
        title: 'Kunne ikke slette brukeren.',
        description: "Det oppstod et problem med å slette brukeren. Prøv på nytt eller ta kontakt med Organisasjonskollegiet.",
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }, [error,toast]);

  return (
    <Flex
      bgColor="rgba(255, 100, 0, 0.1)"
      w="100%"
      flexDirection="row"
      p="1.5rem"
      justifyContent="space-between"
      borderRadius="5px"
      gap="1rem"
      alignItems="center"
      shadow="0px 0px 8px rgba(0,0,0,0.1)"
    >
      <Box color="darkred">
        <Text as="span" fontWeight="bold" display="block" color="inherit">
          Slett bruker
        </Text>
        <Text as="span" color="inherit">
          Ved sletting vil du også bli fjernet fra alle møter du er en del av.
        </Text>
      </Box>
      <Button colorScheme="red" onClick={onOpen} minW="min-content" w="130px">
        Slett bruker
      </Button>
      <CustomAlertDialog
        dialogIsOpen={isOpen}
        handleCancel={onClose}
        handleConfirm={() => {
          deleteUser({onCompleted : ()=>{
            logout({ returnTo: window.location.origin });
          }});
        }}
        type={DialogType.USER}
        confirmColor={'#e53e3e'}
      />
    </Flex>
  );
};

export default DeleteUser;
