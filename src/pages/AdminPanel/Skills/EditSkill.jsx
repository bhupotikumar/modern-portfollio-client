import { useEffect, useState } from "react";
import api from "../../../api/axios.js";
import Modal from "../Modal/Modal";

const EditSkill = ({ isOpen, onClose, skill, onSuccess }) => {
    const [title, setTitle] = useState("");
    const [logo, setLogo] = useState("");
    const [logoType, setLogoType] = useState("url");
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (skill) {
            setTitle(skill.title || "");
            setLogo(skill.logo || "");
            setLogoType(skill.logoType || "url");
            setFile(null);
        }
    }, [skill]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim()) return;

        try {
            setLoading(true);

            const formData = new FormData();
            formData.append("title", title);
            formData.append("logoType", logoType);

            if (logoType === "file" && file) {
                formData.append("file", file);
            } else {
                formData.append("logo", logo);
            }

            await api.put(`/api/skills/${skill._id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            onSuccess();
            onClose();
        } catch (error) {
            console.error("Update failed:", error);
        } finally {
            setLoading(false);
        }
    };

    if (!skill) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Edit Skill">
            <form onSubmit={handleSubmit} className="space-y-4">

                {/* Title */}
                <div>
                    <label className="label">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="input input-bordered w-full"
                        placeholder="Enter skill title"
                    />
                </div>

                {/* Logo Type */}
                <div>
                    <label className="label">Logo Type</label>
                    <select
                        value={logoType}
                        onChange={(e) => setLogoType(e.target.value)}
                        className="select select-bordered w-full"
                    >
                        <option value="url">URL</option>
                        <option value="file">File</option>
                    </select>
                </div>

                {/* Logo Input */}
                <div>
                    <label className="label">Logo</label>

                    {logoType === "url" ? (
                        <input
                            type="text"
                            value={logo}
                            onChange={(e) => setLogo(e.target.value)}
                            className="input input-bordered w-full"
                            placeholder="Enter image URL"
                        />
                    ) : (
                        <input
                            type="file"
                            onChange={(e) => setFile(e.target.files[0])}
                            className="file-input file-input-bordered w-full"
                        />
                    )}
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="btn"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                    >
                        {loading ? "Saving..." : "Save"}
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default EditSkill;