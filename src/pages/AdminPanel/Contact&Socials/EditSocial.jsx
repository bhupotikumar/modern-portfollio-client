import React from "react";
import { useEffect, useState } from 'react';
import Modal from '../Modal/Modal';
import api from '../../../api/axios';

const EditSocial = ({ isOpen, onClose, social, onUpdate }) => {
    const [form, setForm] = useState({
        platform: "",
        url: "",
        logoType: "file",
        logo: "",
        image: null,
    });

    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (social) {
            const newForm = {
                platform: social.platform || "",
                url: social.url || "",
                logoType: social.logoType || "file",
                logo: social.logoType === "url" ? social.logo : "",
                image: null,
            };
            // which can occur when calling setState synchronously inside an effect.
            const t = setTimeout(() => {
                setForm(newForm);
                setImagePreview(social.logo || null);
            }, 0);

            return () => clearTimeout(t);
        }
    }, [social]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "logoType") {
            setImagePreview(null);
            setForm(prev => ({
                ...prev,
                logoType: value, // Use the new value directly
                logo: "",
                image: null
            }));
        } else {
            setForm(prev => ({ ...prev, [name]: value }));
            if (name === "logo") setImagePreview(value);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setForm(prev => ({ ...prev, image: file }));
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append("platform", form.platform);
        formData.append("url", form.url);
        formData.append("logoType", form.logoType);

        if (form.logoType === "file") {
            if (form.image) {
                formData.append("image", form.image);
            }
        } else {
            formData.append("logo", form.logo);
        }

        try {
            const res = await api.put(`/api/socials/${social._id}`, formData);
            onUpdate(res.data);
            onClose();
        } catch (error) {
            console.error("Update failed:", error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };

    if (!social) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Edit Social">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-medium mb-1">Platform</label>
                    <input
                        type="text"
                        name="platform"
                        value={form.platform || ""} // Ensure string
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md py-2 px-3"
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1">URL</label>
                    <input
                        type="text"
                        name="url"
                        value={form.url || ""} // Ensure string
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md py-2 px-3"
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1">Logo Type</label>
                    <select
                        name="logoType"
                        value={form.logoType || "file"} // Ensure string
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md py-2 px-3"
                    >
                        <option value="file">Upload File</option>
                        <option value="url">Image URL</option>
                    </select>
                </div>

                <div>
                    <label className="block font-medium mb-1">
                        {form.logoType === "file" ? "Upload Image" : "Image URL"}
                    </label>

                    {/* Unique keys tell React these are totally different inputs */}
                    {form.logoType === "file" ? (
                        <input
                            key="edit-file-input"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="w-full border border-gray-300 rounded-md py-2 px-3"
                        />
                    ) : (
                        <input
                            key="edit-url-input"
                            type="text"
                            name="logo"
                            value={form.logo || ""} // Ensure string
                            onChange={handleChange}
                            placeholder="https://..."
                            className="w-full border border-gray-300 rounded-md py-2 px-3"
                        />
                    )}

                    {imagePreview && (
                        <div className="mt-3">
                            <img src={imagePreview} alt="Preview" className="w-12 h-12 object-contain border rounded bg-white" />
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md disabled:opacity-50"
                >
                    {loading ? "Updating..." : "Update Social"}
                </button>
            </form>
        </Modal>
    );
};

export default EditSocial;