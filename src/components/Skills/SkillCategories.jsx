import SkillCard from './SkillCard';
import Marquee from 'react-fast-marquee';

const SkillCategories = ({ category, index }) => {
    if (!category) return null;
    const { title, skills } = category;

    const direction = index % 2 === 0 ? "left" : "right";

    return (
        <div>
            <h1 className='text-center font-bold text-xl md:text-2xl lg:text-3xl my-2 md:my-4'>{title} Skills</h1>
            <div className="w-full">
                <Marquee
                    speed={100}
                    pauseOnHover={true}
                    autoFill={true}
                    direction={direction}
                >
                    {skills.map((skill) => (
                        <SkillCard key={skill._id} skill={skill} />
                    ))}
                </Marquee>
            </div>
        </div>
    );
};

export default SkillCategories;