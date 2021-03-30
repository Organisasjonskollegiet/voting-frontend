import { FC } from 'react';
import UseQueryExample from './pages/UseQueryExample'
import UseMutationExample from './molecules/UseMutationExample';
import { Button, Center } from '@chakra-ui/react';
import { useAuth0 } from "@auth0/auth0-react";
import ClipLoader from "react-spinners/ClipLoader";




const App: FC = () => {
    const { isAuthenticated, loginWithRedirect, logout, isLoading, user } = useAuth0();

    if (isAuthenticated) console.log(user)
    if (isLoading) return <Center><ClipLoader /></Center>

    return (
        <Center>
            <p>{!isAuthenticated ? 'Vennligst logg inn' : `Welcome ${user.name}`}</p>
            <Button colorScheme="blue" onClick={isAuthenticated ? () => logout({ returnTo: window.location.origin }) : () => loginWithRedirect()}>{isAuthenticated ? "Log out" : "Log in"}</Button>
            <UseQueryExample />
            <UseMutationExample />
        </Center>
    );
};

export default App;
