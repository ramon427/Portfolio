import { useAuth } from "@/components/providers/AuthProvider.tsx";
import { useQuery } from "@tanstack/react-query";
import { host } from "@/lib/utils.ts";
import Collection from "@/components/ui/collection.tsx";
import Project from "@/components/component/project.tsx";
import { useState, useEffect } from "react";

function ProjectList() {
    const { authToken } = useAuth();
    const [projects, setProjects] = useState([]);

    const handleProjectAdded = (newProject) => {
        setProjects((prevProjects) => [...prevProjects, newProject]);
    };

    const { isLoading, error, data } = useQuery({
        queryKey: ['projects'],
        queryFn: async () => {
            const response = await fetch(`${host}/api/projects`, {
                method: 'GET',
                headers: {
                    'Authorization': authToken ? `Bearer ${authToken}` : ''
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        },
        enabled: !!authToken,
    });

    useEffect(() => {
        if (data) {
            const projectsData = Array.isArray(data) ? data : [];
            setProjects(projectsData);
        }
    }, [data]);

    if (isLoading) return <h1>Loading...</h1>;

    if (error) return <h1>An error has occurred: {error.message}</h1>;

    return (
        <Collection onProjectAdded={handleProjectAdded}>
            {projects.map(item => (
                <Project key={item.id} title={item.title} imageUrl={item.imageUrl} description={item.description} />
            ))}
        </Collection>
    );
}

export default ProjectList;