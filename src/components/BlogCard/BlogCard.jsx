import { formatDistanceToNow } from 'date-fns';
import Likes from '../Likes/Likes';
import Comments from '../Comments/Comments';
import Share from '../Share/Share';
import { FaRemoveFormat, FaSave } from 'react-icons/fa';
import { AiOutlineDelete, AiTwotoneDelete } from 'react-icons/ai';
import { BiSave } from 'react-icons/bi';
import { CiSaveDown2 } from "react-icons/ci";

const BlogCard = ({ blog, varient, onSave, onUnsave, onClick, shareUrl }) => {
    const { title, category, timestamps, excerpt, stats } = blog;

    switch (varient) {
        case 'savedBlogCard':
            return (
                <div onClick={onClick}
                    className="flex justify-between items-center p-2 border border-base-content/20 rounded shadow-xl shadow-base-content/20">
                    <h2 className="text-lg font-bold mb-2 p-2 text-wrap">{title}</h2>
                    <div className="flex justify-between items-center mb-2">
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded hidden lg:block">{category}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-4">
                            <Likes
                                likes={stats.likes}
                            />
                        </div>

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onUnsave(blog._id);
                            }}
                            className="bg-red-500 hover:bg-red-700 text-xl text-white font-bold p-2 rounded"
                        >
                            <AiTwotoneDelete />
                        </button>
                        <Share blog={blog} url={shareUrl} />
                    </div>
                </div>
            );
        default:
            return (
                <div
                    onClick={onClick}
                    className="p-4 border border-base-content/20 rounded shadow-xl shadow-base-content/20">
                    <h2 className="text-xl md:text-2xl font-bold mb-2 text-wrap text-left">{title}</h2>
                    <div className="flex justify-between items-center mb-2">
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">{category}</span>
                        <small className="text-sm text-gray-500">{formatDistanceToNow(new Date(timestamps.createdAt), { addSuffix: true })}</small>
                    </div>
                    <p className="text-base text-left">{excerpt}</p>
                    <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-4">
                            <Likes likes={stats.likes} />
                            {/* <Comments /> */}
                        </div>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onSave(blog);
                                }}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 text-xl rounded"
                            >
                                <CiSaveDown2 />
                            </button>
                            <Share blog={blog} url={shareUrl} />
                        </div>
                    </div>
                </div>
            );
    }
};

export default BlogCard;