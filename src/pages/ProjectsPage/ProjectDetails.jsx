import { Link } from 'react-router';
import Modal from '../../components/Modal/Modal';
import { getImageUrl } from '../../utils/getImageUrl';
import AnimatedBtn from '../../components/AnimatedBtn/AnimatedBtn';

const ProjectDetails = ({ isOpen, onClose, project, modalTitle }) => {
    
    const { title: title, description, image, githubLink, liveLink, tech } = project || {};

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={modalTitle}>
            {project ? (
                <div>
                    <figure className='w-full h-96 border rounded-xl overflow-hidden'>
                        <img src={getImageUrl(image)} alt={title} className='w-full h-full object-cover mb-4' />
                    </figure>
                    <div className="w-full space-y-3 mt-4">
                        {tech && (
                            <div className="flex flex-wrap justify-center gap-2 mb-4">
                                {tech.map((t, index) => (
                                    <span key={index} className="outline outline-purple-500 px-2 py-1 rounded">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        )}
                        <p className='p-4'>{description}</p>
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