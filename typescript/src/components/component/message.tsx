import {host} from "@/lib/utils.ts";

import {useQuery} from '@tanstack/react-query'
import {useAuth} from "@/components/providers/AuthProvider.tsx";

function Message() {
    const { authToken } = useAuth();

    const { isLoading, error, data } = useQuery({
        queryKey: ['test'],
        queryFn: async () => {
            const response = await fetch(`${host}/api/test`, {
                method: 'GET',
                headers: {
                    'Authorization': authToken ? `Bearer ${authToken}` : ''
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        },
        enabled: !!authToken,
    });

    if (isLoading) return <h1>Loading...</h1>;

    if (error) return <h1>An error has occurred: {error.message}</h1>;

    return <h1>{data}</h1>;
}

export default Message;