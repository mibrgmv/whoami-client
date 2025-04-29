import {useAuth} from '../AuthContext';

export const createAuthenticatedFetch = (getAccessToken: () => Promise<string | null>) => {
    return async (url: string, options: RequestInit = {}): Promise<Response> => {
        const requestOptions = {...options};

        requestOptions.headers = requestOptions.headers
            ? {...requestOptions.headers}
            : {};

        if (!url.includes('/login') && !url.includes('/refresh') && !url.includes('/register')) {
            try {
                const token = await getAccessToken();

                if (token) {
                    (requestOptions.headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
                }
            } catch (error) {
                console.error('Error getting access token:', error);
            }
        }

        const response = await fetch(url, requestOptions);

        return response;
    };
};

export const useApiClient = () => {
    const {getAccessToken} = useAuth();

    const authenticatedFetch = createAuthenticatedFetch(getAccessToken);

    return {
        fetch: authenticatedFetch
    };
};