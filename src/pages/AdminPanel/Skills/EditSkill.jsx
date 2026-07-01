import { useState } from "react";
import api from "../../../api/axios.js";
import Modal from "../Modal/Modal";

const EditSkill = ({ isOpen, onClose, skill, onSuccess }) => {
    // Initialize strictly with empty strings
    const [title, setTitle] = useState(skill?.title || "");
    const [logo, setLogo] = useState(skill?.logo || "");
    const [logoType, setLogoType] = useState(skill?.logoType || "url");
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("title", title);
            formData.append("logoType", logoType);

            if (logoType === "file" && file) {
                // Ensure this matches your backend upload.array("files")
                formData.append("logo", file);
            } else {
                formData.append("logo", logo);
            }

            await api.put(`/api/skills/${skill._id}`, formData);

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
                        value={title || ""}
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
                        onChange={(e) => {
                            const newType = e.target.value;
                            setLogoType(newType);
                            // If switching to URL and current logo is a local file path, 
                            // you might want to clear it or keep it. 
                            // But ensuring it's at least an empty string is key:
                            if (newType === "url" && !logo) setLogo("");
                        }}
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
                            key="url-input" // Add this key
                            type="text"
                            value={logo || ""}
                            onChange={(e) => setLogo(e.target.value)}
                            className="input input-bordered w-full"
                            placeholder="Enter image URL"
                        />
                    ) : (
                        <input
                            key="file-input" // Add this key
                            type="file"
                            onChange={(e) => setFile(e.target.files[0])}
                            className="file-input file-input-bordered w-full"
                        />
                    )}
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-2">
                    <button type="button" onClick={onClose} className="btn">Cancel</button>
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? "Saving..." : "Save"}
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default EditSkill;