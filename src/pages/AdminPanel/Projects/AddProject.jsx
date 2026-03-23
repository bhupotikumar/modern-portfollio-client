import { useState } from "react";

const AddProject = ({ onSubmit }) => {
    const [form, setForm] = useState({
        title: "",
        slug: "",
        description: "",
        image: null,
        techStack: [],
        liveDemo: "",
        github: "",
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
            if (!form.techStack.includes(techInput.trim())) {
                setForm({ ...form, techStack: [...form.techStack, techInput.trim()] });
            }
            setTechInput("");
        }
    };

    const removeTech = (tech) => {
        setForm({ ...form, techStack: form.techStack.filter(t => t !== tech) });
    };

    // Handle form submission
    const handleSubmit = (e) => {
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
                    className="input input-bordered w-full"
                    required
                />
            </div>

            <div>
                <label className="block font-medium mb-1">Slug</label>
                <input
                    type="text"
                    name="slug"
                    value={form.slug}
                    onChange={handleChange}
                    placeholder="my-project"
                    className="input input-bordered w-full"
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
                    className="textarea textarea-bordered w-full"
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
                    className="file-input file-input-bordered w-full"
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
                    className="input input-bordered w-full"
                />
                <div className="flex flex-wrap gap-2 mt-2">
                    {form.techStack.map((tech) => (
                        <span
                            key={tech}
                            className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full flex items-center gap-1"
                        >
                            {tech}{" "}
                            <button
                                type="button"
                                onClick={() => removeTech(tech)}
                                className="text-red-500 font-bold"
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
                        name="liveDemo"
                        value={form.liveDemo}
                        onChange={handleChange}
                        placeholder="https://example.com"
                        className="input input-bordered w-full"
                    />
                </div>
                <div>
                    <label className="block font-medium mb-1">GitHub URL</label>
                    <input
                        type="url"
                        name="github"
                        value={form.github}
                        onChange={handleChange}
                        placeholder="https://github.com/username/project"
                        className="input input-bordered w-full"
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
                    className="checkbox checkbox-primary"
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