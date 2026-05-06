import { Link } from 'react-router';
import AnimatedBtn from '../AnimatedBtn/AnimatedBtn';
import { getImageUrl } from '../../utils/getImageUrl';

const FeaturedProjectCard = ({ project }) => {
    const { title, description, tech, image, liveLink, githubLink } = project;
    return (
        <div className="relative z-10 mx-auto card bg-base-100 w-full md:h-96 shadow-xl shadow-base-content/20 flex flex-col items-center justify-center md:gap-4 md:flex-row border-2 border-base-content/20">
            <figure className='w-full md:w-2/3 h-full'>
                <img
                    className='w-full h-full object-cover'
                    src={getImageUrl(image)}
                    alt={title} />
            </figure>
            <div className="flex flex-col justify-between w-full md:w-1/2 md:h-full text-center md:text-left p-2">
                <div className="my-1 md:my-4 text-base-content">
                    <h2 className="text-base md:text-xl font-bold text-center md:text-left mx-auto">{title}</h2>
                    <p className='text-xs md:text-base'>{description}</p>
                    <div className="divider my-0 md:my-4"></div>
                    <div className="hidden md:block">
                        <h2 className='font-semibold text-xl'>Stack:</h2>
                        <div className="mt-2">
                            {tech.map((tech) => (
                                <div key={tech} className="badge badge-outline badge-primary text-base-content border-primary mr-4">{tech}</div>
                            ))}
                        </div>
                    </div>
                    <div className="divider my-0 md:my-4"></div>
                </div>
                <div className="flex justify-center md:justify-end gap-2 md:gap-6 mb-1 md:mr-1 items-center pointer-events-auto">
                    <AnimatedBtn
                        direction="btt"
                        as={Link}
                        to={githubLink}
                        target="_blank"
                        className="btn-sm md:btn-md"
                    >
                        Github
                    </AnimatedBtn>
                    <AnimatedBtn
                        direction="btt"
                        as={Link}
                        to={liveLink}
                        target="_blank"
                        className="btn-sm md:btn-md"
                    >
                        Live Demo
                    </AnimatedBtn>
                </div>
            </div>
        </div>
    );
};

export default FeaturedProjectCard;