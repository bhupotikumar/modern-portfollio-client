import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import BlogCard from "../../components/BlogCard/BlogCard";
import publicApi from "../../api/publicApi";
import BlogDetails from "./BlogDetails";
import Skeleton from "../../components/Skeleton/Skeleton";

const BlogsPage = () => {
    const { slug } = useParams();
    const navigate = useNavigate();

    const [blogs, setBlogs] = useState([]);
    const [savedBlogs, setSavedBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [isOpen, setIsOpen] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState(null);

    // ✅ Fetch all blogs (ONLY once)
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                setLoading(true);

                const res = await publicApi.get("/api/blogs");

                // 🔥 protect against HTML response
                if (typeof res.data !== "object") {
                    throw new Error("Invalid API response");
                }

                setBlogs(res.data.blogs || []);
            } catch (err) {
                console.error("BLOG FETCH ERROR:", err);
                setError("Failed to load blogs");
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();

        const saved = JSON.parse(localStorage.getItem("savedBlogs")) || [];
        setSavedBlogs(saved);
    }, []);

    // ✅ Open modal based on URL slug
    useEffect(() => {
        if (!slug) return;

        const foundBlog = blogs.find(
            (b) => b.slug === slug || b._id === slug
        );

        if (foundBlog) {
            setSelectedBlog(foundBlog);
            setIsOpen(true);
        }
    }, [slug, blogs]);

    // ✅ Navigate instead of opening modal directly
    const handleClick = (blog) => {
        navigate(`/blogs/${blog.slug || blog._id}`);
    };

    // ✅ Close modal → go back
    const handleClose = () => {
        setIsOpen(false);
        setSelectedBlog(null);
        navigate("/blogs");
    };

    const handleSaveBlog = (blog) => {
        if (savedBlogs.some((saved) => saved._id === blog._id)) {
            alert("Blog is already saved.");
            return;
        }

        const updated = [...savedBlogs, blog];
        setSavedBlogs(updated);
        localStorage.setItem("savedBlogs", JSON.stringify(updated));
    };

    const handleRemoveSavedBlog = (blogId) => {
        const updated = savedBlogs.filter((b) => b._id !== blogId);
        setSavedBlogs(updated);
        localStorage.setItem("savedBlogs", JSON.stringify(updated));
    };

    const getShareUrl = (blog) => {
        if (!blog) return "";
        return `${window.location.origin}/blogs/${blog.slug || blog._id}`;
    };

    // ✅ Loading
    if (loading) {
        return <Skeleton varient={"blogs"} />;
    }

    // ✅ Error
    if (error) {
        return (
            <div className="text-center py-20 text-red-500">
                {error}
            </div>
        );
    }

    return (
        <div className="mb-2 md:mb-12">
            <h1 className="text-3xl font-bold my-6 text-center">
                Blogs
            </h1>

            {/* Empty state */}
            {blogs.length === 0 ? (
                <p className="text-center text-gray-500">
                    No blogs found.
                </p>
            ) : (
                <div className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Blog list */}
                    <div className="col-span-1 md:col-span-2 text-center mb-6 md:grid md:grid-cols-2 gap-4 md:gap-6">
                        {blogs.map((blog) => (
                            <BlogCard
                                key={blog._id}
                                blog={blog}
                                shareUrl={getShareUrl(blog)}
                                onSave={handleSaveBlog}
                                onClick={() => handleClick(blog)} // 🔥 navigate
                            />
                        ))}
                    </div>

                    {/* Saved Blogs */}
                    <div className="hidden md:block">
                        <h2 className="text-xl font-semibold mb-4">
                            Saved Blogs
                        </h2>

                        <div className="grid gap-4">
                            {savedBlogs.length === 0 ? (
                                <p className="text-gray-500">
                                    No saved blogs.
                                </p>
                            ) : (
                                savedBlogs.map((blog) => (
                                    <BlogCard
                                        key={blog._id}
                                        blog={blog}
                                        shareUrl={getShareUrl(blog)}
                                        varient="savedBlogCard"
                                        onClick={() => handleClick(blog)}
                                        onUnsave={() =>
                                            handleRemoveSavedBlog(blog._id)
                                        }
                                    />
                                ))
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* 🔥 Modal (URL-controlled) */}
            <BlogDetails
                isOpen={isOpen}
                onClose={handleClose}
                selectedSlug={selectedBlog?.slug}
                shareUrl={getShareUrl(selectedBlog)}
                modalTitle={selectedBlog?.title || "Blog Details"}
                onSave={handleSaveBlog}
            />
        </div>
    );
};

export default BlogsPage;