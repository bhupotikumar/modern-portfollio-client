import { useState } from "react";

const AddProject = ({ onSubmit }) => {
    const [form, setForm] = useState({
        title: "",
        description: "",
        image: null,
        tech: [],
        liveLink: "",
        githubLink: "",
        featured: false,
    });

    const [imagePreview, setImagePreview] = useState(null);
    const [techInput, setTechInput] = useState("");

    // Handle input change
    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;

        if (type === "file") {
            const file = files[0];
            setForm({ ...form, image: file });
            setImagePreview(URL.createObjectURL(file));
        } else if (type === "checkbox") {
            setForm({ ...form, [name]: checked });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    // Handle tech stack input (tags)
    const handleTechKeyDown = (e) => {
        if (e.key === "Enter" && techInput.trim()) {
            e.preventDefault();
            if (!form.tech.includes(techInput.trim())) {
                setForm({ ...form, tech: [...form.tech, techInput.trim()] });
            }
            setTechInput("");
        }
    };

    const removeTech = (tech) => {
        setForm({ ...form, tech: form.tech.filter(t => t !== tech) });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        onSubmit(form);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6"
        >
            <div>
                <label className="block font-medium mb-1">Project Title</label>
                <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="My Project"
                    className="input input-info w-full"
                    required
                />
            </div>

            <div>
                <label className="block font-medium mb-1">Description</label>
                <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Project description..."
                    className="textarea textarea-info w-full"
                    rows={4}
                    required
                />
            </div>

            <div>
                <label className="block font-medium mb-1">Project Image</label>
                <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                    required
                    className="file-input input-info w-full"
                />
                {imagePreview && (
                    <img
                        src={imagePreview}
                        alt="Preview"
                        className="mt-2 h-40 object-cover rounded"
                    />
                )}
            </div>

            {/* Tech Stack */}
            <div>
                <label className="block font-medium mb-1">Tech Stack</label>
                <input
                    type="text"
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    onKeyDown={handleTechKeyDown}
                    placeholder="Type and press Enter"
                    className="input input-info w-full"
                />
                <div className="flex flex-wrap gap-2 mt-2">
                    {form.tech.map((tech) => (
                        <span
                            key={tech}
                            className="bg-secondary text-secondary-content px-3 py-1 rounded-full flex items-center gap-1"
                        >
                            {tech}{" "}
                            <button
                                type="button"
                                onClick={() => removeTech(tech)}
                                className="text-error font-bold"
                            >
                                ×
                            </button>
                        </span>
                    ))}
                </div>
            </div>

            {/* Live Demo & GitHub */}
            <div className="grid md:grid-cols-2 gap-4">
                <div>
                    <label className="block font-medium mb-1">Live Demo URL</label>
                    <input
                        type="url"
                        name="liveLink"
                        value={form.liveLink}
                        onChange={handleChange}
                        placeholder="https://live-demo.com"
                        className="input input-info w-full"
                    />
                </div>
                <div>
                    <label className="block font-medium mb-1">GitHub URL</label>
                    <input
                        type="url"
                        name="githubLink"
                        value={form.githubLink}
                        onChange={handleChange}
                        placeholder="https://github.com/username/project"
                        className="input input-info w-full"
                    />
                </div>
            </div>

            {/* Featured */}
            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    name="featured"
                    checked={form.featured}
                    onChange={handleChange}
                    className="checkbox checkbox-info"
                    id="featured"
                />
                <label htmlFor="featured" className="font-medium">
                    Featured Project
                </label>
            </div>

            {/* Submit */}
            <button type="submit" className="btn btn-primary w-full text-lg">
                Add Project
            </button>
        </form>
    );
};

export default AddProject;