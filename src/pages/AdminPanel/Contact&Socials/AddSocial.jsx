import React, { useState } from 'react';

const AddSocial = ({ onsubmit }) => {
    const [preview, setPreview] = useState(null);
    const [form, setForm] = useState({
        platform: "",
        url: "",
        logoType: "file",
        logo: "",
        file: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "logoType") {
            setPreview(null);
            // Resetting logo and file specifically when type changes
            setForm(prev => ({
                ...prev,
                logoType: value,
                logo: "",
                file: null
            }));
        } else {
            setForm(prev => ({ ...prev, [name]: value }));
            if (name === "logo") setPreview(value);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setForm(prev => ({ ...prev, file, logoType: "file" }));
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.platform || !form.url) return alert("Platform and URL required");

        const formData = new FormData();
        formData.append("platform", form.platform);
        formData.append("url", form.url);
        formData.append("logoType", form.logoType);

        if (form.logoType === "file") {
            if (!form.file) return alert("Please upload a file");
            formData.append("image", form.file);
        } else {
            if (!form.logo) return alert("Please enter a URL");
            formData.append("logo", form.logo);
        }

        onsubmit(formData);

        // Optional: Reset form after submit
        setForm({ platform: "", url: "", logoType: "file", logo: "", file: null });
        setPreview(null);
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-4 items-center flex-wrap p-4 bg-gray-100/10 rounded">
            {/* Added || "" to all values to prevent uncontrolled input error */}
            <input
                type="text"
                name="platform"
                value={form.platform || ""}
                onChange={handleChange}
                placeholder="Platform (e.g. GitHub)"
                className="border p-2 rounded"
            />

            <input
                type="url"
                name="url"
                value={form.url || ""}
                onChange={handleChange}
                placeholder="https://..."
                className="border p-2 rounded w-64"
            />

            <select
                name="logoType"
                value={form.logoType || "file"}
                onChange={handleChange}
                className="border p-2 rounded"
            >
                <option value="file">Upload File</option>
                <option value="url">Image URL</option>
            </select>

            {form.logoType === "file" ? (
                <input
                    key="file-input" // Key helps React distinguish between the two inputs
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="text-sm"
                />
            ) : (
                <input
                    key="url-input" // Key helps React distinguish between the two inputs
                    type="text"
                    name="logo"
                    value={form.logo || ""}
                    onChange={handleChange}
                    placeholder="Logo URL"
                    className="border p-2 rounded"
                />
            )}

            {preview && <img src={preview} alt="preview" className="w-10 h-10 object-contain" />}

            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                Add Social
            </button>
        </form>
    );
};

export default AddSocial;