import { useEffect, useState } from "react";
import api from "../../../api/axios.js";
import Tab from "../../../components/admin/Tab/Tab.jsx";
import AddBlog from "./AddBlog.jsx";
import ItemCard from "../../../components/admin/ItemCard/ItemCard.jsx";
import DeleteConfirm from "../../../components/admin/DeleteConfirm/DeleteConfirm.jsx";
import EditBlog from "./EditBlog.jsx";

const Blogs = () => {

    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    useEffect(() => {
        const fetchBlogs = async () => {
            setLoading(true);
            try {
                const response = await api.get("/api/blogs");
                setBlogs(response.data.blogs || []);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching blogs:", error);
            }
        };

        fetchBlogs();
    }, []);

    const handleEdit = (blog) => {
        setSelectedBlog(blog);
        setIsEditOpen(true);
    };
    const handleDeleteClick = (blog) => {
        setSelectedBlog(blog);
        setIsDeleteOpen(true);
    };
    const handleDeleteConfirm = async () => {
        try {
            await api.delete(`/api/blogs/${selectedBlog._id}`);

            setBlogs(prev =>
                prev.filter(b => b._id !== selectedBlog._id)
            );

            setIsDeleteOpen(false);
            setSelectedBlog(null);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Tab
            name='blogs-tabs'
            tabs={[
                {
                    label: "Blogs",
                    content: <div>
                        {loading ? "Loading..." : Array.isArray(blogs) ? blogs.map(blog => (
                            <ItemCard
                                key={blog._id}
                                title={blog.title}
                                description={blog.excerpt}
                                updatedAt={blog.timestamps?.updatedAt}
                                onEdit={() => handleEdit(blog)}
                                onDelete={() => handleDeleteClick(blog)}
                            />
                        )) : "No blogs found"}
                        <EditBlog
                            isOpen={isEditOpen}
                            onClose={() => setIsEditOpen(false)}
                            blog={selectedBlog}
                            onUpdate={(updatedBlog) => {
                                setBlogs(prev =>
                                    prev.map(b =>
                                        b._id === updatedBlog._id ? updatedBlog : b
                                    )
                                );
                            }}
                        />

                        <DeleteConfirm
                            isOpen={isDeleteOpen}
                            onClose={() => setIsDeleteOpen(false)}
                            onConfirm={handleDeleteConfirm}
                            message="Are you sure you want to delete this blog? This action cannot be undone."
                        />
                    </div>
                },
                {
                    label: "Create Blog",
                    content: <AddBlog />
                }
            ]} />

    );
};

export default Blogs;