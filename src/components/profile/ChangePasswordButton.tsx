import { Button, Flex, useToast, Box, Text } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUpdateMyPasswordLazyQuery } from '../../__generated__/graphql-types';
import Loading from '../common/Loading';

const ChangePasswordButton: React.VFC = () => {
  const toast = useToast();

  const navigate = useNavigate();
  const [updateMyPassword, { loading }] = useUpdateMyPasswordLazyQuery();

  const getUpdatePasswordLink = async () => {
    await updateMyPassword().then((res) => {
      res.data?.updateMyPassword
        ? navigate(res.data?.updateMyPassword, { replace: true })
        : toast({
            title: 'Det skjedde noe feil',
            isClosable: true,
            duration: 3000,
          });
    });
  };

  return (
    <>
      {loading && <Loading text="" asOverlay />}
      <Flex
        bgColor="rgba(255, 255, 0, 0.2)"
        w="100%"
        flexDirection="row"
        p="1.5rem"
        justifyContent="space-between"
        borderRadius="5px"
        gap="1rem"
        alignItems="center"
        shadow="0px 0px 8px rgba(0,0,0,0.1)"
      >
        <Box color="#946102">
          <Text as="span" fontWeight="bold" display="block" color="inherit">
            Bytt passord
          </Text>
          <Text as="span" color="inherit">
            Det er lurt å ha et sterkt og unikt passord, som du ikke bruker andre steder.
          </Text>
        </Box>
        <Button colorScheme="yellow" color="#fff" onClick={() => getUpdatePasswordLink()} minW="min-content" w="130px">
          Bytt passord
        </Button>
      </Flex>
    </>
  );
};

export default ChangePasswordButton;
