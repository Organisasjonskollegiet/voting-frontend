import { Button, useToast } from '@chakra-ui/react';
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
      <Button onClick={() => getUpdatePasswordLink()}>Bytt passord</Button>
    </>
  );
};

export default ChangePasswordButton;
