import React from 'react';

const SkillCard = ({ skill }) => {
    return (
        <div className="w-16 flex flex-col items-center mr-22">
            <img
                src={skill.logo}
                alt={skill.name}
                className="w-full h-full object-contain mb-2"
            />
            <h3 className="text-xl font-bold text-center">{skill.name}</h3>
        </div>
    );
};

export default SkillCard;