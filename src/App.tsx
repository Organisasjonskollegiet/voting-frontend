import React, { FC } from 'react';
import FetchDataTemplate from './components/FetchDataTemplate'
import { Button, Center } from '@chakra-ui/react';
import { useAuth0 } from "@auth0/auth0-react";
import ClipLoader from "react-spinners/ClipLoader";


const App: FC = () => {
    const { isAuthenticated, loginWithRedirect, logout, isLoading, user } = useAuth0();

    if (isLoading) return <Center><ClipLoader /></Center>

    return (
        <Center>
            <p>{!isAuthenticated ? 'Vennligst logg inn' : `Welcome ${user.name}`}</p>
            <Button colorScheme="blue" onClick={isAuthenticated ? () => logout({ returnTo: window.location.origin }) : () => loginWithRedirect()}>{isAuthenticated ? "Log out" : "Log in"}</Button>
            <FetchDataTemplate />
        </Center>
    );
};

export default App;
