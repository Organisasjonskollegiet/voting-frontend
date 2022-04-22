import { Box, Button, Flex, Text, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import { useDeleteMeMutation } from '../../__generated__/graphql-types';
import CustomAlertDialog, { DialogType } from '../common/CustomAlertDialog';

const DeleteUser: React.FC = () => {
  const [deleteUser] = useDeleteMeMutation();

  const { isOpen, onOpen, onClose } = useDisclosure();

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
        handleConfirm={() => deleteUser()}
        type={DialogType.USER}
        confirmColor={'#e53e3e'}
      />
    </Flex>
  );
};

export default DeleteUser;
