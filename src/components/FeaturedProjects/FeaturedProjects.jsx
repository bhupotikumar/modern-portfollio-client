import { useEffect, useState } from 'react';
import FeaturedProjectCard from './FeaturedProjectCard';
import publicApi from '../../api/publicApi.js';

const FeaturedProjects = () => {
    const [featuredProjects, setFeaturedProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchFeaturedProjects = async () => {
        setLoading(true);
        try {
            const res = await publicApi.get("/api/projects");

            setFeaturedProjects(Array.isArray(res.data) ? res.data : []);
        } catch (err) {
            console.error("Failed to fetch featured projects:", err);
            setFeaturedProjects([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFeaturedProjects();
    }, []);

    if (loading) return <p>Loading...</p>
    return (
        <div className='my-12'>
            <div className="sticky top-16 mb-2">
                <h1 className='text-2xl md:text-3xl lg:text-3xl font-bold p-2 text-center'>Featured Projects</h1>
                <p className='text-center mb-6'>A glimpse of my favorite works.</p>
            </div>
            <div className="w-3/5 flex flex-col justify-center items-center gap-12 mx-auto">
                {(featuredProjects || []).map((project, index) => (
                    <div
                        key={project._id}
                        className="w-full sticky top-28 rounded-lg hover-3d"
                        style={{
                            top: `${120 + index * 30}px`,
                            transform: `translateX(${index * 10}px)`,
                            zIndex: (featuredProjects?.length || 0) + index,
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