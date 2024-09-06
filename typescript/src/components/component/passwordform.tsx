import React, {useState} from "react";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";

import {
    useMutation,
} from '@tanstack/react-query'
import {host} from "@/lib/utils.ts";

const submitPassword = async (password: string): Promise<any> => {
    const response = await fetch(`${host}/api/password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return response.json();
};

const PasswordForm = () => {
    const [password, setPassword] = useState('');

    const mutation = useMutation({
        mutationFn: submitPassword,
        onSuccess: (data) => {
            console.log('Success:', data);
        },
        onError: (error) => {
            console.error('Error:', error);
        },
    });
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            await mutation.mutateAsync(password);
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