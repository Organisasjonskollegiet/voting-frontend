import { FC } from 'react';
import Auth0ProviderWithHistory from './Auth0ProviderWithHistory';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PageExample from './pages/PageExample';
import { ChakraProvider } from '@chakra-ui/react';
import ApolloWrapper from './apollo/wrapper';


const App: FC = () => {

    return (
        <Router>
            <ChakraProvider>
                <Auth0ProviderWithHistory>
                    <ApolloWrapper>
                        <Switch>
                            <Route path="/">
                                <PageExample />
                            </Route>
                        </Switch>
                    </ApolloWrapper>
                </Auth0ProviderWithHistory>
            </ChakraProvider>
        </Router>
    );
};

export default App;
