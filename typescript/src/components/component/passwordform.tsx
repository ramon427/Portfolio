import {useState} from "react";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import { useNavigate } from 'react-router-dom';
import {useMutation} from '@tanstack/react-query'
import {host} from "@/lib/utils.ts";
import {useAuth} from "@/components/providers/AuthProvider.tsx";

const submitPassword = async (password: string): Promise<any> => {
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

const PasswordForm = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const {setAuthToken} = useAuth();

    const mutation = useMutation({
        mutationFn: submitPassword,
        onSuccess: (data) => {
            if (data && data.token) {
                setAuthToken(data.token);
                navigate('/');
            }
        },
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


    return (
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
    );
};

export default PasswordForm;