import { useEffect, useState } from "react";
import api from "../../../api/axios";
import Modal from "../Modal/Modal";
const EditBlog = ({ isOpen, onClose, blog, onUpdate }) => {

    const [form, setForm] = useState({
        title: "",
        excerpt: "",
        content: "",
        category: "",
        tags: "",
        image: null,
        featured: false,
        status: "draft",
        seo: {
            metaTitle: "",
            metaDescription: ""
        }
    });

    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);

    // 🔥 Fetch blog data
    useEffect(() => {
        if (blog) {
            setForm({
                title: blog.title || "",
                excerpt: blog.excerpt || "",
                content: blog.content || "",
                category: blog.category || "",
                tags: blog.tags?.join(", ") || "",
                image: null,
                featured: blog.featured || false,
                status: blog.status || "draft",
                seo: {
                    metaTitle: blog.seo?.metaTitle || "",
                    metaDescription: blog.seo?.metaDescription || ""
                }
            });
            setImagePreview(blog.imageUrl || null);
        }
    }, [blog]);

    // handle input
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    // SEO handler
    const handleSeoChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            seo: {
                ...prev.seo,
                [name]: value
            }
        }));
    };

    // 🔥 Update handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await api.put(`/api/blogs/${blog._id}`, form);
            onUpdate(res.data);
            onClose();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (!blog) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Edit Blog">
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Title */}
                <div>
                    <label className="block text-sm font-medium">Blog Title</label>
                    <input
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                {/* Excerpt */}
                <div>
                    <label className="block text-sm font-medium">Excerpt</label>
                    <input
                        type="text"
                        name="excerpt"
                        value={form.excerpt}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                    />
                </div>

                {/* Content */}
                <div>
                    <label className="block text-sm font-medium">Content</label>
                    <textarea
                        name="content"
                        value={form.content}
                        onChange={handleChange}
                        className="textarea textarea-bordered w-full"
                        rows="8"
                    />
                </div>

                {/* Category + Tags */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        placeholder="Category"
                        className="input input-bordered w-full"
                    />
                    <input
                        type="text"
                        name="tags"
                        value={form.tags}
                        onChange={handleChange}
                        placeholder="React, JS"
                        className="input input-bordered w-full"
                    />
                </div>

                {/* Image */}
                <div>
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleChange}
                        className="file-input file-input-bordered w-full"
                    />
                    {imagePreview && (
                        <img src={imagePreview} className="mt-2 h-40 rounded" />
                    )}
                </div>

                {/* Featured */}
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        name="featured"
                        checked={form.featured}
                        onChange={handleChange}
                        className="checkbox"
                    />
                    <span>Featured</span>
                </div>

                {/* SEO */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="metaTitle"
                        value={form.seo.metaTitle}
                        onChange={handleSeoChange}
                        placeholder="SEO Title"
                        className="input input-bordered"
                    />
                    <input
                        type="text"
                        name="metaDescription"
                        value={form.seo.metaDescription}
                        onChange={handleSeoChange}
                        placeholder="SEO Description"
                        className="input input-bordered"
                    />
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-3">
                    <button type="button" onClick={onClose} className="btn">
                        Cancel
                    </button>
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? "Saving..." : "Save"}
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default EditBlog;