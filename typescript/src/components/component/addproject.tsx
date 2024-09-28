import { useState } from "react";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useMutation } from '@tanstack/react-query';
import { host } from "@/lib/utils.ts";
import { useAuth } from "@/components/providers/AuthProvider.tsx";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "../ui/card";
import {Label} from "@radix-ui/react-label";
const submitProject = async (projectData) => {
    const token = localStorage.getItem('authToken');

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
        <Card className="h-full">
            <CardHeader>
                <CardTitle>Create project</CardTitle>
                <CardDescription>Deploy your new project in one-click.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="title">Project Title</Label>
                            <Input
                                id="title"
                                placeholder="Project Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="description">Project Description</Label>
                            <Input
                                id="description"
                                placeholder="Project Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="imageUrl">Image URL</Label>
                            <Input
                                id="imageUrl"
                                placeholder="Image URL"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <CardFooter className="flex justify-between mt-4">
                        <Button variant="outline" onClick={() => { setTitle(''); setDescription(''); setImageUrl(''); }}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={mutation.isPending}>
                            {mutation.isPending ? 'Submitting...' : 'Add Project'}
                        </Button>
                    </CardFooter>
                    {mutation.isError && <p className="text-red-500 mt-2">Error: {mutation.error.message}</p>}
                </form>
            </CardContent>
        </Card>
    );
};

export default AddProject;