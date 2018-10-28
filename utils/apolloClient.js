import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import {getToken} from "../storage";

const httpLink = createHttpLink({
    uri: 'http://192.168.1.7:8080/graphql',
});

const authLink = setContext(async (_, { headers }) => {
    const token = await getToken();
    return {
        headers: {
            ...headers,
            authorization: token,
        }
    }
});

export default new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});
