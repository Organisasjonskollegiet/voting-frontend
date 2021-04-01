import React from 'react';
import { useMutation } from '@apollo/client';
import { CAST_VOTE } from '../../services/graphql/api/mutations';
import { Button } from '@chakra-ui/react';

const UseMutationExample: React.FC = () => {
  // CAST_VOTE require the authenticated user to be particant that is eligible to vote of the votation.
  const [castVote, { loading: mutationLoading, error: mutationError, data }] = useMutation(CAST_VOTE, {
    onError: (error) => console.log(error.stack),
  });

  if (mutationError) console.log(mutationError);
  if (mutationLoading) console.log('loading');

  const votationId = 'eea0eae0-407d-4036-ba9a-4e1ebff3f39f';
  const alternativeId = '1f5a993a-57de-48c7-a7b0-898074a77fed';

  console.log(data);
  return (
    <Button onClick={() => castVote({ variables: { votationId, alternativeId } })} colorScheme="blue">
      Avgi stemme
    </Button>
  );
};

export default UseMutationExample;
