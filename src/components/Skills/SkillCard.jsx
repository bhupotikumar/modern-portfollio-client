const SkillCard = ({ skill }) => {
    return (
        <div className="hover-3d ml-16 font-body">
            <div className="flex flex-col  bg-transparent">
                <figure className='h-16 md:h-18 lg:h-26 p-2 md:p-4'>
                    <img
                        src={skill?.logo || ""}
                        alt={skill?.title || ""}
                        className="w-full h-full object-contain"
                    />
                </figure>
                <h3 className="md:text-xl font-semibold text-center">{skill?.title}</h3>
            </div>
        </div>
    );
};

export default SkillCard;