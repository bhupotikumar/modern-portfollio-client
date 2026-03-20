import Marquee from 'react-fast-marquee';
import SkillCard from './SkillCard';

const Frontend = ({ frontendData }) => {
    if (!frontendData) return null;
    const { title, skills } = frontendData;
    return (
        <div>
            <h1 className='text-center font-bold text-xl md:text-2xl lg:text-3xl my-2 md:my-4'>{title} Skills</h1>
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

export default Frontend;