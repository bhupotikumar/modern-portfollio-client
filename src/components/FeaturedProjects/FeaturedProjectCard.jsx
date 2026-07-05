import { useState } from "react";
import AnimatedBtn from "../AnimatedBtn/AnimatedBtn";
import FadeUp from "../Fade/FadeUp";
import { Divider } from "../Divider/Divider";

const FeaturedProjectCard = ({ project, onClick }) => {
    const { title, description, tech, image, liveLink, githubLink } = project;

    const [loaded, setLoaded] = useState(false);

    return (
        <FadeUp>
            <div className="relative z-10 mx-auto card bg-primary text-primary-content w-full md:h-96 flex flex-col items-center justify-center md:gap-4 md:flex-row overflow-hidden border border-base-content"
                onClick={() => onClick(project)}
            >

                {/* IMAGE SECTION */}
                <figure className="w-full md:w-2/3 h-72 md:h-full bg-secondary overflow-hidden">
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
                    <div className="my-1 md:my-4">
                        <h2 className="font-heading md:text-xl font-bold text-center md:text-left mx-auto">
                            {title}
                        </h2>

                        <p className="text-xs md:text-sm">{description}</p>

                        <div className="hidden my-4 md:block">
                            <h2 className="font-semibold text-xl">Stack:</h2>

                            <div className="mt-2">
                                {tech.map((t) => (
                                    <div
                                        key={t}
                                        className="badge badge-outline badge-secondary border-base-content mr-4"
                                    >
                                        {t}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <Divider />
                    </div>

                    {/* BUTTONS */}
                    <div className="flex justify-center md:justify-end gap-2 md:gap-6 mb-1 md:mr-1 font-accent items-center">
                        <AnimatedBtn
                            direction="btt"
                            as="a"
                            href={githubLink || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent opening the modal

                                if (!githubLink) {
                                    e.preventDefault();
                                    alert("This is a private project.");
                                }
                            }}
                            className={`btn btn-md btn-secondary text-lg md:text-xl ${!githubLink ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                        >
                            Github
                        </AnimatedBtn>

                        <AnimatedBtn
                            direction="btt"
                            as="a"
                            href={liveLink || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent opening the modal

                                if (!liveLink) {
                                    e.preventDefault();
                                    alert("Live demo is not available.");
                                }
                            }}
                            className={`btn btn-md btn-secondary text-lg md:text-xl ${!liveLink ? "opacity-50 cursor-not-allowed" : ""
                                }`}
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