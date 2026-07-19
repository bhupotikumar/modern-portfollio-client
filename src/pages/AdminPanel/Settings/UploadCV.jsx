import { useState } from "react";
import api from "../../../api/axios";

export const UploadCV = () => {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleFileChange = (e) => setFile(e.target.files[0]);

    const handleUpload = async () => {
        if (!file) return alert("Please select a file first");

        try {
            setUploading(true);
            const formData = new FormData();
            formData.append("cv", file);

            await api.post("/api/cv", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            alert("CV updated successfully!");
        } catch (err) {
            alert(err.response?.data?.message || "Upload operation failed.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="p-4 border border-base-300 rounded">
            <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} className="file-input" />
            <button onClick={handleUpload} disabled={uploading} className="btn btn-primary mt-2">
                {uploading ? "Uploading..." : "Replace Live CV"}
            </button>
        </div>
    );
};
