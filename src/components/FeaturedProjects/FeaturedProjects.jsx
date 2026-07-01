import { useEffect, useState } from 'react';
import FeaturedProjectCard from './FeaturedProjectCard';
import publicApi from '../../api/publicApi.js';
import Skeleton from '../Skeleton/Skeleton.jsx';

const FeaturedProjects = () => {
    const [featuredProjects, setFeaturedProjects] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
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
        fetchFeaturedProjects();
    }, []);

    if (loading || !featuredProjects)
        return (
            <div className="rounded-xl shadow bg-gray-800 animate-pulse">
                <Skeleton varient="featuredProjects" />
            </div>
        );;

    return (
            <div className='md:my-12'>
                <div className="sticky top-16 mb-2">
                    <h1 className='text-2xl md:text-3xl lg:text-3xl font-bold p-2 text-center'>Featured Projects</h1>
                    <p className='text-center mb-6'>A glimpse of my favorite works.</p>
                </div>
                <div className="w-11/12 lg:w-8/12 flex flex-col justify-center items-center gap-12 mx-auto">
                    {(featuredProjects || []).map((project, index) => (
                        <div
                            key={project._id}
                            className="w-full sticky top-28 rounded-lg hover-3d"
                            style={{
                                top: `${115 + index * 10}px`,
                                // transform: `translate(${index * 10}px)`,
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