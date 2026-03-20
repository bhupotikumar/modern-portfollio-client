import React from 'react';
import { Link } from 'react-router';

const FeaturedProjectCard = ({ project }) => {
    const { title, slug, description, techStack, image, liveDemo, github } = project;
    return (
        <div className="mx-auto card bg-base-100 w-full h-96 shadow-lg shadow-gray-500 items-center justify-center gap-4 md:flex-row">
            <figure className='w-2/3 h-full'>
                <img
                    className='w-full h-full object-cover'
                    src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                    alt={title} />
            </figure>
            <div className="flex flex-col justify-between w-1/2 h-full">
                <div className="w-full flex justify-end">
                    <div className="badge badge-outline badge-secondary">{slug}</div>
                </div>
                <div className="my-4">
                    <h2 className="card-title text-xl font-bold">{title}</h2>
                    <p>{description}</p>
                    <div className="divider"></div>
                    <div className="">
                        <h2 className='font-semibold text-xl'>Stack:</h2>
                        <div className="mt-2">
                            {techStack.map((tech) => (
                                <div key={tech} className="badge badge-outline badge-primary mr-4">{tech}</div>
                            ))}
                        </div>
                    </div>
                    <div className="divider"></div>
                </div>
                <div className="flex justify-end gap-6 mb-1 mr-1 items-center">
                    <Link to={github} target='_blank' className="btn btn-primary w-5/12">Github</Link>
                    <Link to={liveDemo} target='_blank' className="btn btn-primary w-5/12">Live Demo</Link>
                </div>
            </div>
        </div>
    );
};

export default FeaturedProjectCard;