import { BiSolidEdit } from "react-icons/bi";
import { AiTwotoneDelete } from "react-icons/ai";


const ProjectCard = ({ project }) => {
    return (
        <div>
            <div
                className='flex items-center justify-between shadow-md/20 border border-base-content/20 shadow-base-content rounded p-2 my-4'
            >

                <h1 className="w-1/2 lg:w-1/3">{project.id}. {project.title}</h1>
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
                    <div className="relative group">
                        <button className="btn btn-info p-1 text-2xl">
                            <BiSolidEdit />
                        </button>

                        <span className="absolute -top-6 left-1/2 -translate-x-1/2
                     opacity-0 group-hover:opacity-100
                     transition text-xs bg-black text-white
                     px-2 py-1 rounded whitespace-nowrap">
                            Edit
                        </span>
                    </div>
                    <div className="relative group">
                        <button className="btn btn-error p-1 text-2xl">
                            <AiTwotoneDelete />
                        </button>

                        <span className="absolute -top-6 left-1/2 -translate-x-1/2
                     opacity-0 group-hover:opacity-100
                     transition text-xs bg-black text-white
                     px-2 py-1 rounded whitespace-nowrap">
                            Delete
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;