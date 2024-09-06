import {host} from "@/lib/utils.ts";

import {
    useQuery,
} from '@tanstack/react-query'

function Message() {
    return <h1>{getMessage()}</h1>
}

function getMessage() {
    const {isPending, error, data} = useQuery({
        queryKey: ['test'],
        queryFn: () =>
            fetch(`${host}/api/test`).then((res) =>
                res.text(),
            ),
    })

    if (isPending) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message

    return data;

}

export default Message;