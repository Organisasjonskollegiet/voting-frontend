import { Button } from '@chakra-ui/react'
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useLocation } from 'react-router';



interface LogInButtonProps {
    label: string;
}

const LogInButton: React.FC<LogInButtonProps> = ({label}) => {
    const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
    const location = useLocation();
    
    return(
        <Button
            w="200px"
            size='md' 
            colorScheme="orange" 
            // isLoading = {isLoading}
            onClick={() => {
                if(!isLoading && !isAuthenticated){
                    setTimeout(
                        () =>
                          loginWithRedirect({
                            appState: {
                              returnTo: location.pathname,
                            },
                          }),
                        500
                      );
                }
              }}>{label}
        </Button>
    )
}
 
export default LogInButton;