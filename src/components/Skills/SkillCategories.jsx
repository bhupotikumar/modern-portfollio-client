import React from 'react';
import * as MarqueeBundle from "react-fast-marquee";
import FadeUp from '../Fade/FadeUp';
import SkillCard from './SkillCard';
import { Divider } from '../Divider/Divider';

const MarqueeComponent = MarqueeBundle.default?.default || MarqueeBundle.default || MarqueeBundle.Marquee || MarqueeBundle;

const SkillCategories = ({ category, index }) => {
    if (!category) return null;
    const { title, skills } = category;

    if (skills.length === 0) return null;
    const direction = index % 2 === 0 ? "left" : "right";

    return (
        <FadeUp>
            <div className="mt-6 md:mt-16">
                <h1 className='mb-2 text-center font-heading text-accent font-bold text-xl md:text-2xl lg:text-3xl'>{title} Skills</h1>
                <div className="relative overflow-hidden">
                    {/* LEFT FADE */}
                    <div className="absolute left-0 top-0 h-full w-24 z-10 pointer-events-none
        bg-linear-to-r from-base-100 to-transparent" />
                    {/* RIGHT FADE */}
                    <div className="absolute right-0 top-0 h-full w-24 z-10 pointer-events-none
        bg-linear-to-l from-base-100 to-transparent" />

                    <MarqueeComponent
                        speed={100}
                        pauseOnHover={true}
                        autoFill={true}
                        direction={direction}
                        gradient={false}
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