import { getImageUrl } from '../../utils/getImageUrl';

const SkillCard = ({ skill }) => {
    return (
        <div className="w-28 md:w-44 h-24 md:h-38 mr-6 md:mr-16 hover-3d shadow-lg shadow-base-content/20 mb-6 border border-base-content/20 rounded-md p-4">
            <div className="flex flex-col items-center bg-transparent h-full justify-between object-cover">
                <figure className='w-12 h-12 md:w-16 md:h-16'>
                    <img
                        src={skill.logoType === 'file' ? getImageUrl(skill.logo) : skill.logo}
                        alt={skill.title}
                        className="w-full h-full object-contain"
                    />
                </figure>
                <h3 className="text-base-content md:text-xl font-semibold text-center">{skill.title}</h3>
            </div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
};

export default SkillCard;