const SkillCard = ({ skill }) => {
    return (
        <div className="hover-3d ml-16">
            <div className="flex flex-col  bg-transparent">
                <figure className='h-26 p-4'>
                    <img
                        src={skill?.logo || ""}
                        alt={skill?.title || ""}
                        className="w-full h-full object-contain"
                    />
                </figure>
                <h3 className="text-base-content md:text-xl font-semibold text-center">{skill?.title}</h3>
            </div>
        </div>
    );
};

export default SkillCard;