import { formatDistanceToNow } from 'date-fns';
import Likes from '../Likes/Likes';
import Comments from '../Comments/Comments';
import Share from '../Share/Share';
import { FaRemoveFormat, FaSave } from 'react-icons/fa';
import { AiOutlineDelete, AiTwotoneDelete } from 'react-icons/ai';
import { BiSave } from 'react-icons/bi';
import { CiSaveDown2 } from "react-icons/ci";
import FadeUp from '../Fade/FadeUp';

const BlogCard = ({ blog, varient, onSave, onUnsave, onClick, shareUrl }) => {
    const { title, category, timestamps, excerpt, stats } = blog;

    switch (varient) {
        case 'savedBlogCard':
            return (
                <div onClick={onClick}
                    className="text-neutral flex justify-between items-center p-2 rounded shadow-xl shadow-base-content/20">
                    <h2 className="text-sm lg:text-base font-bold mb-2 p-2 text-wrap">{title}</h2>
                    <div className="flex justify-between items-center mb-2">
                        <span className="bg-secondary/20 text-primary text-xs font-medium mr-2 px-2.5 py-0.5 rounded hidden lg:block">{category}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2 lg:gap-4">
                            <Likes
                                likes={stats?.likes}
                            />
                        </div>

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onUnsave(blog._id);
                            }}
                            className="bg-error hover:bg-error text-base text-primary-content btn btn-xs lg:btn-sm"
                        >
                            <AiTwotoneDelete />
                        </button>
                        <Share blog={blog} url={shareUrl} />
                    </div>
                </div>
            );
        default:
            return (
                <FadeUp>
                    <div
                        onClick={onClick}
                        className="p-2 md:p-4 rounded shadow-xl shadow-base-content/20">
                        <h2 className="text-base lg:text-lg font-bold mb-1 md:mb-2 text-wrap text-left">{title}</h2>
                        <div className="flex justify-between items-center mb-2">
                            <span className="bg-secondary/20 text-primary text-xs font-medium mr-2 px-2.5 py-0.5 rounded">{category}</span>
                            <small className="text-xs md:text-sm text-neutral/70">{formatDistanceToNow(new Date(timestamps.createdAt), { addSuffix: true })}</small>
                        </div>
                        <p className="text-xs md:text-base text-left">{excerpt}</p>
                        <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center gap-2 md:gap-4">
                                <Likes likes={stats?.likes} />
                                {/* <Comments /> */}
                            </div>
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onSave(blog);
                                    }}
                                    className="bg-info hover:bg-primary text-primary-content text-xs md:text-base btn btn-xs lg:btn-sm"
                                >
                                    <CiSaveDown2 className='invert' />
                                </button>
                                <Share blog={blog} url={shareUrl} />
                            </div>
                        </div>
                    </div>
                </FadeUp>
            );
    }
};

export default BlogCard;