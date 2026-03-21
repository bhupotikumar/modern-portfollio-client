import React from 'react';
import { Link } from 'react-router';
import AnimatedBtn from '../AnimatedBtn/AnimatedBtn';

const FeaturedProjectCard = ({ project }) => {
    const { title, slug, description, techStack, image, liveDemo, github } = project;
    return (
        <div className="relative z-10 mx-auto card bg-base-100 w-full h-96 shadow-xl shadow-base-content/20 items-center justify-center gap-4 md:flex-row border-2 border-base-content/20">
            <figure className='w-2/3 h-full'>
                <img
                    className='w-full h-full object-cover'
                    src={image}
                    alt={title} />
            </figure>
            <div className="flex flex-col justify-between w-1/2 h-full">
                <div className="w-full flex justify-end">
                    <div className="badge badge-outline badge-secondary p-4 text-base border-2 border-base-content/20">{slug}</div>
                </div>
                <div className="my-4 text-base-content">
                    <h2 className="card-title text-xl font-bold">{title}</h2>
                    <p>{description}</p>
                    <div className="divider"></div>
                    <div className="">
                        <h2 className='font-semibold text-xl'>Stack:</h2>
                        <div className="mt-2">
                            {techStack.map((tech) => (
                                <div key={tech} className="badge badge-outline badge-primary text-base-content border-primary mr-4">{tech}</div>
                            ))}
                        </div>
                    </div>
                    <div className="divider"></div>
                </div>
                <div className="flex justify-end gap-6 mb-1 mr-1 items-center pointer-events-auto">
                    <AnimatedBtn
                        direction="btt"
                        as={Link}
                        to={github}
                        target="_blank">
                        Github
                    </AnimatedBtn>
                    <AnimatedBtn
                        direction="btt"
                        as={Link}
                        to={liveDemo}
                        target="_blank">
                        Live Demo
                    </AnimatedBtn>
                </div>
            </div>
        </div>
    );
};

export default FeaturedProjectCard;