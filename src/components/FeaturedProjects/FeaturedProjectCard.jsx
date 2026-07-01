import { useState } from "react";
import AnimatedBtn from "../AnimatedBtn/AnimatedBtn";
import FadeUp from "../Fade/FadeUp";

const FeaturedProjectCard = ({ project }) => {
    const { title, description, tech, image, liveLink, githubLink } = project;

    const [loaded, setLoaded] = useState(false);

    return (
        <FadeUp>
            <div className="relative z-10 mx-auto card bg-base-100 w-full md:h-96 shadow-xl shadow-base-content/20 flex flex-col items-center justify-center md:gap-4 md:flex-row border-2 border-base-content/20">

                {/* IMAGE SECTION */}
                <figure className="w-full md:w-2/3 h-full bg-base-300 overflow-hidden">
                    <img
                        className={`w-full h-full object-cover transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"
                            }`}
                        src={image}
                        alt={title}
                        loading="lazy"
                        decoding="async"
                        onLoad={() => setLoaded(true)}
                    />
                </figure>

                {/* CONTENT */}
                <div className="flex flex-col justify-between w-full md:w-1/2 md:h-full text-center md:text-left p-2">
                    <div className="my-1 md:my-4 text-base-content">
                        <h2 className="text-base md:text-xl font-bold text-center md:text-left mx-auto">
                            {title}
                        </h2>

                        <p className="text-xs md:text-base">{description}</p>

                        <div className="divider my-0 md:my-4"></div>

                        <div className="hidden md:block">
                            <h2 className="font-semibold text-xl">Stack:</h2>

                            <div className="mt-2">
                                {tech.map((t) => (
                                    <div
                                        key={t}
                                        className="badge badge-outline badge-primary text-base-content border-primary mr-4"
                                    >
                                        {t}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="divider my-0 md:my-4"></div>
                    </div>

                    {/* BUTTONS */}
                    <div className="flex justify-center md:justify-end gap-2 md:gap-6 mb-1 md:mr-1 items-center pointer-events-auto">
                        <AnimatedBtn
                            direction="btt"
                            as="a"
                            href={githubLink || "#"}
                            target="_blank"
                            onClick={(e) => {
                                if (!githubLink) e.preventDefault();
                            }}
                            className={`btn-sm md:btn-md ${!githubLink ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                            Github
                        </AnimatedBtn>

                        <AnimatedBtn
                            direction="btt"
                            as="a"
                            href={liveLink || "#"}
                            onClick={(e) => {
                                if (!liveLink) e.preventDefault();
                            }}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`btn-sm md:btn-md ${!liveLink ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                            Live Demo
                        </AnimatedBtn>
                    </div>
                </div>
            </div>
        </FadeUp>
    );
};

export default FeaturedProjectCard;