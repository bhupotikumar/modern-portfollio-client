import { useEffect, useState } from 'react';
import api from '../../../api/axios';
import Modal from '../Modal/Modal';

const EditProject = ({ isOpen, onClose, project, onUpdate }) => {
    const [form, setForm] = useState({
        title: "",
        slug: "",
        description: "",
        tech: [],
        liveLink: "",
        githubLink: "",
        featured: false,
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (project) {
            setForm({
                title: project.title || "",
                description: project.description || "",
                slug: project.slug || "",
                tech: project.tech || [],
                liveLink: project.liveLink || "",
                githubLink: project.githubLink || "",
                featured: project.featured || false,
            });
        }
    }, [project]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await api.put(`/api/projects/${project._id}`, form);

            onUpdate(res.data);
            onClose();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (!project) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Edit Project">
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                />
                <input
                    type="text"
                    name="slug"
                    value={form.slug}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                />
                <input
                    type="text"
                    name="tech"
                    value={form.tech}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                />

                <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    className="textarea textarea-bordered w-full"
                />

                <div className="flex">
                    <input
                        type="text"
                        name="liveLink"
                        value={form.liveLink}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                    />
                    <input
                        type="text"
                        name="githubLink"
                        value={form.githubLink}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                    />
                </div>

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

export default EditProject;