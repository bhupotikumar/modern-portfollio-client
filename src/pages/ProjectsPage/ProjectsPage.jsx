import { useEffect, useState } from 'react';
import publicApi from '../../api/publicApi';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import Modal from '../../components/Modal/Modal';
import ProjectDetails from './ProjectDetails';
import Skeleton from '../../components/Skeleton/Skeleton';
import { Divider } from '../../components/Divider/Divider';

const ProjectsPage = () => {

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            setLoading(true);
            const response = await publicApi.get("/api/projects");
            setProjects(response.data);
            setLoading(false);
        };

        fetchProjects();
    }, []);

    const handleClick = (project) => {
        // Implement the logic to open the project details modal
        setSelectedProject(project);
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
        setSelectedProject(null);
    };

    if (loading || !projects) {
        return (
            <div className='w-11/12 mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-4 py-8'>
                {loading
                    ? [...Array(6)].map((_, i) => <Skeleton key={i} varient="projectCard" />)
                    : projects.map((project) => (
                        <ProjectCard
                            key={project._id}
                            project={project}
                            onClick={handleClick}
                        />
                    ))
                }
            </div>
        );
    }


    return (
        <div className='mx-auto py-2'>
            <h1 className='font-heading text-accent text-center text-xl md:text-2xl lg:text-3xl font-bold mt-0 mb-4'>Projects</h1>
            <div className='mb-12 p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch'>
                {projects.map((project) => (
                    <ProjectCard
                        key={project._id}
                        project={project}
                        onClick={handleClick} />
                ))}
            </div>
            <ProjectDetails
                isOpen={isOpen}
                onClose={handleClose}
                project={selectedProject}
                modalTitle={selectedProject ? selectedProject.title : "Project Details"}
            />
            <Divider />
        </div>
    );
};

export default ProjectsPage;