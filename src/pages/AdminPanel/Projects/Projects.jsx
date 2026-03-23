import { useEffect, useState } from 'react';
import Tab from '../../../components/admin/Tab/Tab';
import ProjectCard from './ProjectCard';

const Projects = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetch("/projects.json")
            .then(res => res.json())
            .then(data => {
                setProjects(data);
            })
            .catch(err => console.error("Fetch error:", err));
    }, []);

    return (
        <Tab
            name='projects-tabs'
            tabs={[
                {
                    label: "Projects",
                    content: <div>
                        <h1>You have {projects.length} projects.</h1>
                        {projects.map(project => <ProjectCard key={project.id} project={project} />
                        )}
                    </div>
                },
                {
                    label: "Add New",
                    content: <div>Add project form here</div>
                }
            ]} />
    );
};

export default Projects;