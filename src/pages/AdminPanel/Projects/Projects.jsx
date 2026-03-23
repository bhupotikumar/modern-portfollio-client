import { useEffect, useState } from 'react';
import Tab from '../../../components/admin/Tab/Tab';
import ProjectCard from './ProjectCard';
import AddProject from './AddProject';
import api from '../../../api/axios';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        fetch("/projects.json")
            .then(res => res.json())
            .then(data => {
                setProjects(data);
            })
            .catch(err => console.error("Fetch error:", err));
    }, []);

    const filteredProjects = filter === "featured"
        ? projects.filter(project => project.featured)
        : projects;

    const featuredCount = projects.filter(project => project.featured).length;

    const handleAddProject = async (form) => {
        try {
            const formData = new FormData();

            formData.append("title", form.title);
            formData.append("description", form.description);
            if (form.slug) formData.append("slug", form.slug); // optional
            if (form.image) formData.append("image", form.image);
            formData.append("featured", form.featured);
            formData.append("liveLink", form.liveDemo || "");
            formData.append("githubLink", form.github || "");

            if (form.techStack.length > 0) {
                formData.append("tech", form.techStack.join(","));
            }

            const res = await api.post("/api/projects", formData, {
                headers: {
                    "Content-Type": "multipart/form-data", // important for file uploads
                },
            });

            console.log("Project created:", res.data);
            alert("Project added successfully!");
        } catch (error) {
            console.error(error);
            alert("Failed to add project");
        }
    };

    return (
        <Tab
            name='projects-tabs'
            tabs={[
                {
                    label: "Projects",
                    content: <div>
                        <div className="flex gap-3 mb-4">
                            <button
                                onClick={() => setFilter("all")}
                                className={`btn ${filter === "all" ? "btn-primary" : "btn-ghost"}`}
                            >
                                All ({projects.length})
                            </button>

                            <button
                                onClick={() => setFilter("featured")}
                                className={`btn ${filter === "featured" ? "btn-primary" : "btn-ghost"}`}
                            >
                                Featured ({featuredCount})
                            </button>
                        </div>
                        {filteredProjects.map(project => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>
                },
                {
                    label: "Add New",
                    content: <AddProject onSubmit={handleAddProject} />
                }
            ]} />
    );
};

export default Projects;