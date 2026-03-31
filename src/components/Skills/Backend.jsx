import Marquee from 'react-fast-marquee';
import SkillCard from './SkillCard';

const Backend = ({ backendData }) => {
    if (!backendData) return null;

    const { title, skills } = backendData;

    return (
        <div>
            <h1 className='text-center font-bold text-xl md:text-2xl lg:text-3xl my-2 md:my-4'>{title} Skills</h1>
            <div className="w-full">
                <Marquee
                direction='right'
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

export default Backend;