import { Button } from '@chakra-ui/react';
import React from 'react';

const DeleteUser: React.FC = () => {
  const deleteUser = () => {
    //TODO: implement
  };

  return (
    <>
      <Button colorScheme="red" onClick={() => deleteUser()}>
        Slett bruker
      </Button>
    </>
  );
};

export default DeleteUser;
