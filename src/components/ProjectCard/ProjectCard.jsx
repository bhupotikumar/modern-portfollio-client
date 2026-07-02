import React, { useState } from 'react';
import FadeUp from '../Fade/FadeUp';

const ProjectCard = ({ project, onClick }) => {
    const { title, description, image } = project || {};
    const [loaded, setLoaded] = useState(false);
    console.log(image);

    return (
        <FadeUp>
            <div
                className="card bg-secondary shadow-xl overflow-hidden cursor-pointer"
                onClick={() => onClick(project)}
            >
                <figure className="group relative w-full h-72 overflow-hidden bg-base-300">
                    {/* IMAGE */}
                    <img
                        src={image}
                        alt={title}
                        loading="lazy"
                        decoding="async"
                        onLoad={() => setLoaded(true)}
                        className={`bg-primary absolute inset-0 w-full h-full object-cover transition-all duration-600 ease-out
        ${loaded ? "opacity-100 scale-100" : "opacity-100 scale-105"}
        group-hover:scale-110
    `}
                    />

                    {/* DARK OVERLAY */}
                    <div className="
                        absolute inset-0 
                        bg-linear-to-t from-secondary/60 via-secondary/20 to-transparent
                        opacity-0 group-hover:opacity-100
                        transition duration-500
                    " />

                    {/* DESCRIPTION */}
                    <div className="
                        absolute inset-0 flex items-end
                        p-4
                        opacity-0 translate-y-6
                        group-hover:opacity-100 group-hover:translate-y-0
                        transition-all duration-500 ease-out
                    ">
                        <p className="text-secondary-content text-sm md:text-base line-clamp-4">
                            {description}
                        </p>
                    </div>

                </figure>

                <div className="card-body m-0 p-4">
                    <h2 className="card-title mx-auto text-center text-neutral">
                        {title}
                    </h2>
                </div>
            </div>
        </FadeUp>
    );
};

export default ProjectCard;