import Marquee from 'react-fast-marquee';
import SkillCard from './SkillCard';

const CurrentLearning = ({ currentLearningData }) => {
    if (!currentLearningData) return null;

    const { title, skills } = currentLearningData;

    return (
        <div>
            <h1 className='text-center font-bold text-3xl my-4'>{title} Skills</h1>
            <div className="w-full">
                <Marquee
                    speed={100}
                    pauseOnHover={true}
                    autoFill={true}
                    delay={1}>
                    {skills.map((skill) => (
                        <SkillCard skill={skill} />
                    ))}
                </Marquee>
            </div>
        </div>
    );
};

export default CurrentLearning;