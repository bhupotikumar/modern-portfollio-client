import { useState } from "react";

const AddSkill = ({ onSubmit }) => {
    const [form, setForm] = useState({
        title: "",
        skills: [],
    });

    const [currentSkill, setCurrentSkill] = useState({
        title: "",
        logoType: "file",
        logo: "",
        file: null,
        preview: null,
    });
    
    // Category title change
    const handleCategoryChange = (e) => {
        setForm({ ...form, title: e.target.value });
    };

    // Skill input change
    const handleSkillChange = (e) => {
        const { name, value } = e.target;
        setCurrentSkill({ ...currentSkill, [name]: value });
    };

    // File upload
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCurrentSkill({
                ...currentSkill,
                file,
                preview: URL.createObjectURL(file),
                logoType: "file",
            });
        }
    };

    // Add skill to form
    const addSkill = () => {
        if (!currentSkill.title) return alert("Skill title is required");

        if (currentSkill.logoType === "url" && !currentSkill.logo) return alert("Skill image URL is required");
        if (currentSkill.logoType === "file" && !currentSkill.file) return alert("Please upload a file");

        const newSkill = {
            title: currentSkill.title,
            logoType: currentSkill.logoType,
            logo: currentSkill.logoType === "url" ? currentSkill.logo : "",
            file: currentSkill.file || null,
        };

        setForm({ ...form, skills: [...form.skills, newSkill] });

        // Reset current skill
        setCurrentSkill({
            title: "",
            logoType: "file",
            logo: "",
            file: null,
            preview: null,
        });
    };

    // Remove skill
    const removeSkill = (index) => {
        setForm({
            ...form,
            skills: form.skills.filter((_, i) => i !== index),
        });
    };

    // Submit form
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.title) return alert("Category title is required");
        if (!form.skills.length) return alert("Add at least one skill");

        const formData = new FormData();
        formData.append("title", form.title);

        // Skills JSON without files
        const skillsJSON = form.skills.map(({ file, ...rest }) => rest);
        formData.append("skills", JSON.stringify(skillsJSON));

        // Append files
        form.skills.forEach((skill) => {
            if (skill.logoType === "file" && skill.file instanceof File) {
                formData.append("files", skill.file);
            }
        });

        // Call parent submit handler
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">

            {/* Category title */}
            <div>
                <label className="font-medium">Category Title</label>
                <input
                    type="text"
                    value={form.title}
                    onChange={handleCategoryChange}
                    className="input input-bordered w-full"
                    placeholder="Frontend"
                    required
                />
            </div>

            {/* Add Skill */}
            <div className="border p-4 rounded-xl space-y-3">
                <h3 className="font-semibold text-lg">Add Skill</h3>

                <input
                    type="text"
                    name="title"
                    value={currentSkill.title}
                    onChange={handleSkillChange}
                    placeholder="Skill name (React)"
                    className="input input-bordered w-full"
                />

                {/* Toggle File / URL */}
                <select
                    name="logoType"
                    value={currentSkill.logoType}
                    onChange={handleSkillChange}
                    className="select select-bordered w-full"
                >
                    <option value="file">Upload Image</option>
                    <option value="url">Image URL</option>
                </select>

                {/* File input */}
                {currentSkill.logoType === "file" && (
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="file-input file-input-bordered w-full"
                    />
                )}

                {/* URL input */}
                {currentSkill.logoType === "url" && (
                    <input
                        type="text"
                        name="logo"
                        value={currentSkill.logo}
                        onChange={handleSkillChange}
                        placeholder="Paste image URL"
                        className="input input-bordered w-full"
                    />
                )}

                {/* Preview */}
                {currentSkill.preview && (
                    <img
                        src={currentSkill.preview}
                        alt="preview"
                        className="w-16 h-16 object-cover rounded"
                    />
                )}

                <button type="button" onClick={addSkill} className="btn btn-primary">
                    Add Skill
                </button>
            </div>

            {/* Skill List */}
            <div className="space-y-2">
                {form.skills.map((skill, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between bg-base-200 p-3 rounded"
                    >
                        <div className="flex items-center gap-3">
                            <span>{skill.title}</span>
                            {skill.logoType === "url" && skill.logo && (
                                <img src={skill.logo} className="w-10 h-10" />
                            )}
                        </div>
                        <button
                            type="button"
                            onClick={() => removeSkill(index)}
                            className="btn btn-sm btn-error"
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>

            <button type="submit" className="btn btn-primary w-full">
                Save Category
            </button>
        </form>
    );
};

export default AddSkill;