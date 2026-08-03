import { Link } from 'react-router';
import Modal from '../../components/Modal/Modal';
import AnimatedBtn from '../../components/AnimatedBtn/AnimatedBtn';

const ProjectDetails = ({ isOpen, onClose, project, modalTitle }) => {
    
    const { title: title, description, image, githubLink, liveLink, tech } = project || {};

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={modalTitle}>
            {project ? (
                <div className=''>
                    <figure className='w-full h-52 lg:h-96 rounded-xl overflow-hidden'>
                        <img src={image} alt={title} className='w-full h-full object-cover mb-4' />
                    </figure>
                    <div className="w-full space-y-3 mt-2 md:mt-4">
                        {tech && (
                            <div className="flex flex-wrap justify-center gap-2 mb-2 md:mb-4">
                                {tech.map((t, index) => (
                                    <span key={index} className="outline outline-secondary px-2 py-1 rounded text-xs lg:text-base">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        )}
                        <p className='p-2 md:p-4 text-wrap text-sm md:text-base'>{description}</p>
                        <div className="w-full flex z-50 pointer-events-auto">
                            <AnimatedBtn
                                direction="btt"
                                as={Link}
                                to={githubLink}
                                target="_blank"
                                className="flex-1 btn-sm md:btn-lg border-0 rounded-none"
                            >
                                Github
                            </AnimatedBtn>
                            <AnimatedBtn
                                direction="btt"
                                as={Link}
                                to={liveLink}
                                target="_blank"
                                className="flex-1 btn-sm md:btn-lg border-0 rounded-none"
                            >
                                Live Demo
                            </AnimatedBtn>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Project not found.</p>
            )}
        </Modal>
    );
};

export default ProjectDetails;