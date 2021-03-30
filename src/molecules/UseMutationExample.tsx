import React from 'react';
import { useMutation } from '@apollo/client';
import { CAST_VOTE, ADD_USER } from '../grapgql/mutations'
import { Button } from   '@chakra-ui/react';

const UseMutationExample: React.FC = () => {

  // CAST_VOTE require the authenticated user to be particant that is eligible to vote of the votation.
  const [castVote, { loading: mutationLoading, error: mutationError, data }] = useMutation(ADD_USER, {onError: (error) => console.log(error.stack)});  

  if (mutationError) console.log(mutationError)

  const votationId = "eea0eae0-407d-4036-ba9a-4e1ebff3f39f"
  const alternativeId = "1f5a993a-57de-48c7-a7b0-898074a77fed"
  const username = "heeeeloo"
  const email = "heeleo@example.com"
  const user = {
    "username": "heelo",
    "email": "heelo@example.com"
  }
  
  console.log(data)
  return (
    <Button onClick={() => castVote({ variables: {user} })} colorScheme='blue'>Avgi stemme</Button>
  )
}

export default UseMutationExample;