import { useState } from 'react';
import api from '../../../api/axios';
import Modal from '../Modal/Modal';

const EditProject = ({ isOpen, onClose, project, onUpdate }) => {

    const [form, setForm] = useState(() => project || {
        title: "",
        description: "",
        tech: [],
        liveLink: "",
        githubLink: "",
        featured: false,
        image: null,
    });

    const [loading, setLoading] = useState(false);

    // Handle input change
    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;

        if (type === "file") {
            const file = files[0];
            setForm({ ...form, image: file });
        } else if (type === "checkbox") {
            setForm({ ...form, [name]: checked });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    // update handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData();

            formData.append("title", form.title);
            formData.append("description", form.description);
            formData.append("liveLink", form.liveLink || "");
            formData.append("githubLink", form.githubLink || "");
            formData.append("featured", form.featured);

            if (Array.isArray(form.tech)) {
                formData.append("tech", form.tech.join(","));
            } else {
                formData.append("tech", form.tech);
            }

            if (form.image) {
                formData.append("image", form.image);
            }

            const res = await api.put(
                `/api/projects/${project.id}`,
                formData
            );

            onUpdate(res.data);

            console.log("Project updated:", res.data);

            onClose();
        } catch (error) {
            console.error(error);
            alert("Failed to update project.");
        } finally {
            setLoading(false);
        }
    };

    if (!project) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Edit Project" width="max-w-4xl">
            <form onSubmit={handleSubmit} className="space-y-4">
                <label className="block font-medium">Title</label>
                <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                />
                <label className="block font-medium">Tech</label>
                <input
                    type="text"
                    name="tech"
                    value={form.tech}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                />

                <label className="block font-medium">Description</label>
                <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    className="textarea textarea-bordered w-full"
                />

                <div className="">
                    <div className="">
                        <label className="">Live Link</label>
                        <input
                            type="text"
                            name="liveLink"
                            value={form.liveLink}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div className="">
                        <label className="block font-medium">GitHub Link</label>
                        <input
                            type="text"
                            name="githubLink"
                            value={form.githubLink}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                        />
                    </div>
                </div>
                {/* Image */}
                <div className="">
                    <div>
                        <label className="block font-medium">Set new image</label>
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleChange}
                            className="file-input file-input-bordered w-full"
                        />
                    </div>

                    {/* Featured */}
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="featured"
                            checked={form.featured}
                            onChange={handleChange}
                            className="checkbox checkbox-primary"
                            id="featured"
                        />
                        <label htmlFor="featured" className="font-medium">
                            Featured Project
                        </label>
                    </div>
                </div>

                <div className="flex justify-end gap-3">
                    <button type="button" onClick={onClose} className="btn">
                        Cancel
                    </button>
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? "Updating..." : "Update"}
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default EditProject;