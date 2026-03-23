import { useEffect, useState } from 'react';
import FeaturedProjectCard from './FeaturedProjectCard';

const FeaturedProjects = () => {
    const [featuredProjects, setFeaturedProjects] = useState([]);
    useEffect(() => {
        fetch("/projects.json")
            .then(res => res.json())
            .then(data => {
                const featured = data.filter((project) => project.featured);
                setFeaturedProjects(featured);
            })
            .catch(err => console.error(err));
    }, []);
    return (
        <div className='my-12'>
            <div className="sticky top-16 mb-2">
                <h1 className='text-2xl md:text-3xl lg:text-3xl font-bold p-2 text-center'>Featured Projects</h1>
                <p className='text-center mb-6'>A glimpse of my favorite works.</p>
            </div>
            <div className="w-3/5 flex flex-col justify-center items-center gap-12 mx-auto">
                {featuredProjects.map((project, index) => (
                    <div
                        key={project.id}
                        className="w-full sticky top-28 rounded-lg hover-3d"
                        style={{
                            top: `${120 + index * 30}px`,
                            transform: `translateX(${index * 10}px)`,
                            zIndex: featuredProjects.length + index
                        }}
                    >
                        <FeaturedProjectCard project={project} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeaturedProjects;