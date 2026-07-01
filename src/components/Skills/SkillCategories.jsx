import React from 'react';
import * as MarqueeBundle from "react-fast-marquee";
import FadeUp from '../Fade/FadeUp';
import SkillCard from './SkillCard';

const MarqueeComponent = MarqueeBundle.default?.default || MarqueeBundle.default || MarqueeBundle.Marquee || MarqueeBundle;

const SkillCategories = ({ category, index }) => {
    if (!category) return null;
    const { title, skills } = category;

    if (skills.length === 0) return null;
    const direction = index % 2 === 0 ? "left" : "right";

    return (
        <FadeUp>
            <div className="mt-6 md:mt-16">
                <h1 className='mb-2 text-center font-heading font-bold text-xl md:text-2xl lg:text-3xl'>{title} Skills</h1>
                <div className="border-b border-accent">
                    <MarqueeComponent
                        speed={100}
                        pauseOnHover={true}
                        autoFill={true}
                        direction={direction}
                        gradient={true}
                        className="overflow-hidden"
                    >
                        {skills?.map((skill) => (
                            <SkillCard key={skill._id} skill={skill} />
                        ))}
                    </MarqueeComponent>
                </div>
            </div>
        </FadeUp>
    );
};

export default SkillCategories;