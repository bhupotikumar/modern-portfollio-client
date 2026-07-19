import { useState } from "react";
import api from "../../../api/axios";

const AddBlog = () => {
    const [form, setForm] = useState({
        title: "",
        excerpt: "",
        content: "",
        category: "",
        tags: "",
        featured: false,
        status: "draft",
        seo: {
            metaTitle: "",
            metaDescription: ""
        }
    });

    const [loading, setLoading] = useState(false);

    // handle inputs
    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;
        if (type === "checkbox") {
            setForm(prev => ({ ...prev, [name]: checked }));

        } else {
            setForm(prev => ({ ...prev, [name]: value }));
        }
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

    // submit handler
    const handleSubmit = async (statusType) => {
        try {
            setLoading(true);

            const formData = new FormData();

            formData.append("title", form.title);
            formData.append("excerpt", form.excerpt);
            formData.append("content", form.content);
            formData.append("category", form.category);
            formData.append("featured", form.featured);
            formData.append("status", statusType);

            // tags
            const tagsArray = form.tags.split(",").map(tag => tag.trim());
            tagsArray.forEach(tag => formData.append("tags", tag));

            // FIXED SEO
            formData.append("seo", JSON.stringify(form.seo));

            const res = await api.post("/api/blogs", formData);

            const data = res.data;

            if (res.status !== 201) {
                throw new Error(data.message || "Failed to create blog");
            }

            alert("Blog created successfully!");

            setForm({
                title: "",
                excerpt: "",
                content: "",
                category: "",
                tags: "",
                featured: false,
                status: "draft",
                seo: { metaTitle: "", metaDescription: "" }
            });
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="space-y-6">

            {/* Title */}
            <div>
                <label className="block text-sm font-medium">Blog Title</label>
                <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    className="input input-info w-full"
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
                    className="input input-info w-full"
                />
            </div>

            {/* Content */}
            <div>
                <label className="block text-sm font-medium">Content</label>
                <textarea
                    name="content"
                    value={form.content}
                    onChange={handleChange}
                    className="textarea textarea-info w-full"
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
                    className="input input-info w-full"
                />
                <input
                    type="text"
                    name="tags"
                    value={form.tags}
                    onChange={handleChange}
                    placeholder="React, JS"
                    className="input input-info w-full"
                />
            </div>

            {/* Featured */}
            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    name="featured"
                    checked={form.featured}
                    onChange={handleChange}
                    className="checkbox checkbox-info"
                />
                <span className="">Featured</span>
            </div>

            {/* SEO */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                    type="text"
                    name="metaTitle"
                    value={form.seo.metaTitle}
                    onChange={handleSeoChange}
                    placeholder="SEO Title"
                    className="input input-info"
                />
                <input
                    type="text"
                    name="metaDescription"
                    value={form.seo.metaDescription}
                    onChange={handleSeoChange}
                    placeholder="SEO Description"
                    className="input input-info"
                />
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
                <button
                    type="button"
                    onClick={() => handleSubmit("draft")}
                    className="btn btn-outline"
                    disabled={loading}
                >
                    Save Draft
                </button>

                <button
                    type="button"
                    onClick={() => handleSubmit("published")}
                    className="btn btn-primary"
                    disabled={loading}
                >
                    {loading ? "Publishing..." : "Publish"}
                </button>
            </div>
        </form>
    );
};

export default AddBlog;