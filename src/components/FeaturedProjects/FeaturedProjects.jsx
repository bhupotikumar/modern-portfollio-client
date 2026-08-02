import { useEffect, useState } from 'react';
import FeaturedProjectCard from './FeaturedProjectCard';
import publicApi from '../../api/publicApi.js';
import Skeleton from '../Skeleton/Skeleton.jsx';
import ProjectDetails from '../../pages/ProjectsPage/ProjectDetails.jsx';
import { Divider } from '../Divider/Divider.jsx';

const FeaturedProjects = () => {
    const [featuredProjects, setFeaturedProjects] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchFeaturedProjects = async () => {
            setLoading(true);
            try {
                const res = await publicApi.get("/api/projects");
                const filteredProjects = Array.isArray(res.data) ? res.data.filter(project => project.featured) : [];
                setFeaturedProjects(filteredProjects);
            } catch (err) {
                console.error("Failed to fetch featured projects:", err);
                setFeaturedProjects([]);
            } finally {
                setLoading(false);
            }
        };
        fetchFeaturedProjects();
    }, []);

    const handleClick = (project) => {
        setSelectedProject(project);
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
        setSelectedProject(null);
    };


    if (loading)
        return (
            <div className=" animate-pulse">
                <Skeleton varient="featuredProjects" />
            </div>
        );

    return (
        <div className='my-12 md:my-12'>
            <div className="sticky top-16 mb-2">
                <h1 className='text-xl md:text-2xl lg:text-3xl font-heading font-bold p-2 text-center text-accent'>Featured Projects</h1>
                <p className='text-center mb-2 md:mb-6'>A glimpse of my favorite works.</p>
            </div>
            <div className="w-11/12 lg:w-8/12 flex flex-col justify-center items-center gap-8 md:gap-12 mx-auto">
                {(featuredProjects || []).map((project, index) => (
                    <div
                        key={project._id}
                        className="w-full sticky top-28 hover-3d shadow-lg shadow-base-content/50 rounded-xl"
                        style={{
                            top: `${110 + index * 15}px`,
                            // transform: `translate(${index * 10}px)`,
                            zIndex: (featuredProjects?.length || 0) + index,
                        }}
                    >
                        <FeaturedProjectCard
                            project={project}
                            onClick={handleClick}
                        />
                    </div>
                ))}
            </div>
            <ProjectDetails
                isOpen={isOpen}
                onClose={handleClose}
                project={selectedProject}
                modalTitle={selectedProject ? selectedProject.title : "Project Details"}
            />
        </div>
    );
};

export default FeaturedProjects;