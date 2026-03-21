import React from 'react';

const SkillCard = ({ skill }) => {
    return (
        <div className="w-28 md:w-40 h-24 md:h-32 mr-6 md:mr-16 hover-3d drop-shadow-md drop-shadow-primary/50 mb-6">
            <div className="flex flex-col items-center p-2 md:p-4 bg-base-300">
                <img
                    src={skill.logo}
                    alt={skill.name}
                    className="w-12 md:w-16 h-12 md:h-16 object-contain mb-2"
                />
                <h3 className="text-base-content md:text-xl font-semibold text-center">{skill.name}</h3>
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

<div className="">
    {/* content */}
    <figure className="max-w-100 rounded-2xl">
        <img src="https://img.daisyui.com/images/stock/creditcard.webp" alt="3D card" />
    </figure>
    {/* 8 empty divs needed for the 3D effect */}
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
</div>