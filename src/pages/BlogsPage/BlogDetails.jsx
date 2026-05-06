import React, { useEffect, useState } from 'react';
import Modal from '../../components/Modal/Modal';
import Likes from '../../components/Likes/Likes';
import Share from '../../components/Share/Share';
import { CiSaveDown2 } from 'react-icons/ci';
import publicApi from '../../api/publicApi';

const BlogDetails = ({ isOpen, onClose, onSave, shareUrl, selectedSlug, modalTitle }) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        if (!isOpen || !selectedSlug) return;

        const fetchBlog = async () => {
            try {
                setLoading(true);
                const res = await publicApi.get(`/api/blogs/${selectedSlug}`);

                if (typeof res.data !== "object") {
                    throw new Error("Invalid API response");
                }

                setBlog(res.data);
                console.log(res)
            } catch (err) {
                console.error("BLOG FETCH ERROR:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [isOpen, selectedSlug]);

    if (!isOpen) return null;
    if (loading) return "Loading";

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={modalTitle}>
            <div className='p-2 md:p-8'>
                {blog ? (
                    <p className='text-base md:text-lg'>{blog.content}</p>
                ) : (
                    <p>Loading blog...</p>
                )}
            </div>
            <div className="flex items-center justify-between mt-4 p-4 md:p-8">
                <div className="flex items-center gap-4">
                    <Likes likes={blog?.stats.likes} />
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
        </Modal>
    );
};

export default BlogDetails;