import { useEffect, useState } from "react";
import api from "../../../api/axios";
const AddSkill = ({ onSubmit }) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        title: "",
        logo: "",
        logoType: "file",
        categoryId: "",
        file: null,
    });

    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            try {
                const res = await api.get("/api/categories");
                setCategories(Array.isArray(res.data) ? res.data : []);
            } catch (error) {
                console.error("Failed to fetch categories:", error);
                setCategories([]);
            } finally {
                setLoading(false);
            }
        }
        fetchCategories();
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "logoType") {
            setForm((prev) => ({
                ...prev,
                logoType: value,
                logo: "",
            }));
            return;
        }

        if (name === "logo") {
            setForm((prev) => ({
                ...prev,
                logo: prev.logoType === "file" ? files[0] : value,
            }));
            return;
        }

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    // Submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        onSubmit(form);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="border p-4 rounded-xl space-y-3">
                <h3 className="font-semibold text-lg text-primary-content">Add Skill</h3>

                <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Skill name (React)"
                    required
                    className="input input-info input-bordered w-full"
                />

                {/* Toggle File / URL */}
                <select
                    name="logoType"
                    value={form.logoType}
                    onChange={handleChange}
                    className="select select-info select-bordered w-full"
                >
                    <option value="file">Upload Image</option>
                    <option value="url">Image URL</option>
                </select>

                {/* File input */}
                {form.logoType === "file" && (
                    <input
                        type="file"
                        name="logo"
                        accept="image/*"
                        onChange={handleChange}
                        className="file-input input-info file-input-bordered w-full"
                    />
                )}

                {/* URL input */}
                {form.logoType === "url" && (
                    <input
                        type="text"
                        name="logo"
                        value={form.logo}
                        onChange={handleChange}
                        placeholder="Paste image URL"
                        className="input input-info input-bordered w-full"
                    />
                )}

                {/* Preview */}
                {form.logo && (
                    <img
                        src={
                            form.logoType === "file"
                                ? URL.createObjectURL(form.logo)
                                : form.logo
                        }
                        alt="preview"
                        className="w-16 h-16 object-cover rounded"
                    />
                )}

                {/* Category selector */}
                <label className="text-lg font-semibold mr-4">Select Category</label>
                <select
                    name="categoryId"
                    value={form.categoryId}
                    onChange={handleChange}
                    className="select select-info select-bordered w-full"
                >
                    <option value="">Select Category</option>

                    {categories.map((category) => (
                        <option
                            key={category._id}
                            value={category._id}
                        >
                            {category.title}
                        </option>
                    ))}
                </select>
            </div>
            <button type="submit" className="btn btn-primary w-full">
                Save Skill
            </button>
        </form>
    );
};

export default AddSkill;