import { useAuth } from "@/components/providers/AuthProvider.tsx";
import { useQuery } from "@tanstack/react-query";
import { host } from "@/lib/utils.ts";
import Collection from "@/components/ui/collection.tsx";
import Project from "@/components/component/project.tsx";

function ProjectList() {
    const { authToken } = useAuth();

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
            return response.json(); // Ensure we parse the JSON correctly
        },
        enabled: !!authToken,
    });

    if (isLoading) return <h1>Loading...</h1>;

    if (error) return <h1>An error has occurred: {error.message}</h1>;

    // Add a check to ensure data is an array before mapping
    const projects = Array.isArray(data) ? data : [];

    return (
        <Collection>
            {projects.map(item => (
                <Project key={item.id} title={item.title} imageUrl={item.imageUrl} description={item.description} />
            ))}
        </Collection>
    );
}

export default ProjectList;
