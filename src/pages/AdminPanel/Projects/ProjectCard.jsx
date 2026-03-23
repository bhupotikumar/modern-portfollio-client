import { BiSolidEdit } from "react-icons/bi";
import { AiTwotoneDelete } from "react-icons/ai";


const ProjectCard = ({ project }) => {
    return (
        <div>
            <div
                className='flex items-center justify-between shadow-md/20 border border-base-content/20 shadow-base-content rounded p-2 my-4'
            >

                <h1>{project.id}. {project.title}</h1>
                <div className="relative group max-w-xs">
                    <p className="ml-4 truncate">
                        {project.description}
                    </p>

                    <div className="absolute left-4 top-full mt-2 
                  hidden group-hover:block 
                  bg-black text-white text-sm 
                  px-3 py-2 rounded shadow-lg 
                  z-50 w-64">
                        {project.description}
                    </div>
                </div>
                <div className="flex items-center gap-3 ">
                    <button className="btn btn-info p-2 text-2xl">
                        <BiSolidEdit />
                    </button>
                    <button className="btn text-2xl btn-error p-2">
                        <AiTwotoneDelete />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;