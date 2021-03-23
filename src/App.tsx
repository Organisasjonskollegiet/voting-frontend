import React, { FC } from 'react';
import { Button, Center } from '@chakra-ui/react';
import { useAuth0 } from "@auth0/auth0-react";
import ClipLoader from "react-spinners/ClipLoader";

const App: FC = () => {
    const { isAuthenticated, loginWithRedirect, logout, isLoading, user } = useAuth0();

    if (isLoading) return <Center><ClipLoader /></Center>

    return (
        <Center>
            <Button colorScheme="blue" onClick={isAuthenticated ? () => logout({ returnTo: window.location.origin }) : () => loginWithRedirect()}>{isAuthenticated ? "Log out" : "Log in"}</Button>
        </Center>
    );
};

export default App;
