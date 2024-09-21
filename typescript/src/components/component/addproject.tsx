import {useAuth} from "@/components/providers/AuthProvider.tsx";
import Box from "../ui/box";
import {host} from "@/lib/utils.ts";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useState} from "react";
import {useMutation} from "@tanstack/react-query";

const submitProject = async (data: {title: string, imageUrl: string, description: string}): Promise<any> => {
    const response = await fetch(`${host}/api/password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({password}),
    });

    if (!response.ok) {
        throw new Error('Response not ok');
    }

    return response.json();
};

function AddProject() {
    const [title, setTitle] = useState('');

    const mutation = useMutation({
        mutationFn: submitProject,
    });

    const handleSubmit = async event => {
        event.preventDefault();

        try {
            const result = await mutation.mutateAsync(password);
            if (result && result.token) {
                setAuthToken(result.token);
            }

        } catch (error) {
            console.log(error);
        }
    };

    if (authToken) {
        return <Box>
            <form onSubmit={handleSubmit}>
                <label>
                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <Button type="submit" disabled={mutation.isPending}>
                    {mutation.isPending ? 'Submitting...' : 'Submit'}
                </Button>
                {mutation.isError && <p>Error: {mutation.error.message}</p>}
                {mutation.isSuccess && <p>{mutation.data.message}</p>}
            </form>
        </Box>
    }

    return <></>
}

export default AddProject;