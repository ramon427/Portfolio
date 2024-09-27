import { useState } from "react";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useMutation } from '@tanstack/react-query';
import { host } from "@/lib/utils.ts";
import { useAuth } from "@/components/providers/AuthProvider.tsx";

// Async function to submit the project data to the backend
const submitProject = async (projectData) => {
    const token = localStorage.getItem('authToken'); // Example of getting the token from local storage

    const response = await fetch(`${host}/api/projects`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(projectData)
    });

    if (!response.ok) {
        throw new Error('Response not ok');
    }

    return response.json();
};

const AddProject = ({ onProjectAdded }) => {
    const { authToken } = useAuth();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const mutation = useMutation({
        mutationFn: submitProject,
        onSuccess: (data) => {
            const newProject = { id: data.id, title, description, imageUrl };

            onProjectAdded(newProject);

            setTitle('');
            setDescription('');
            setImageUrl('');
        },
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        const projectData = { title, description, imageUrl };

        try {
            await mutation.mutateAsync(projectData);
        } catch (error) {
            console.log(error);
        }
    };

    if (!authToken) {
        return <p>You must be logged in to add a project.</p>;
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                <Input
                    type="text"
                    placeholder="Project Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </label>
            <label>
                <Input
                    type="text"
                    placeholder="Project Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </label>
            <label>
                <Input
                    type="text"
                    placeholder="Image URL"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    required
                />
            </label>
            <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? 'Submitting...' : 'Add Project'}
            </Button>
            {mutation.isError && <p>Error: {mutation.error.message}</p>}
        </form>
    );
};

export default AddProject;