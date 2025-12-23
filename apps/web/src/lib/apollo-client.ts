import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
    uri: `${process.env.API_URL || 'http://localhost:4000'}/graphql`,
    credentials: 'include',
});

// Function to get the current access token
let getAccessToken: (() => string | null) | null = null;

export function setAccessTokenGetter(getter: () => string | null) {
    getAccessToken = getter;
}

const authLink = setContext((_, { headers }) => {
    const token = getAccessToken?.();
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    };
});

export const apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    defaultOptions: {
        watchQuery: {
            fetchPolicy: 'cache-and-network',
        },
    },
});

