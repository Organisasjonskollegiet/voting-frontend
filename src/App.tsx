import React, { FC } from 'react';
import FetchDataTemplate from './components/FetchDataTemplate'
import { Button, Center } from '@chakra-ui/react';
import { ApolloProvider } from '@apollo/client';
import { client } from './apollo/client';

const App: FC = () => {

    return (
        <ApolloProvider client={client}>
            <Center>
                <Button colorScheme="blue">Hello World</Button>
                <FetchDataTemplate />
            </Center>
        </ApolloProvider>
    );
};

export default App;
