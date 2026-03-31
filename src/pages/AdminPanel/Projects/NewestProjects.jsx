import { useEffect, useState } from 'react';
import api from '../../../api/axios';
import { formatDistanceToNow } from 'date-fns';

const NewestProjects = () => {
    const [newProjects, setNewProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await api.get("/api/projects");

                const projects = Array.isArray(res.data) ? res.data : [];

                const newest = projects
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // newest first
                    .slice(0, 3); // take first 3

                setNewProjects(newest);

            } catch (error) {
                console.error("Failed to fetch newest projects:", error);
                setNewProjects([]);
            }
        };

        fetchProjects();
    }, []);

    return (
        <div className=''>
            {newProjects.map((project) => (
                <div key={project._id}
                className='flex justify-between items-center'
                >
                    <h2>{project.title}</h2>
                    <small className="text-right text-sm text-gray-300">
                        {formatDistanceToNow(new Date(project.updatedAt), {
                            addSuffix: true,
                        })}
                    </small>
                </div>
            ))}
        </div>
    );
};

export default NewestProjects;