import { useEffect, useState } from 'react';
import Tab from '../../../components/admin/Tab/Tab';
import ItemCard from '../../../components/admin/ItemCard/ItemCard';
import AddProject from './AddProject';
import api from '../../../api/axios';
import EditProject from './EditProject';
import DeleteConfirm from '../../../components/admin/DeleteConfirm/DeleteConfirm';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [filter, setFilter] = useState("all");
    const [loading, setLoading] = useState(true);
    const [selectedProject, setSelectedProject] = useState(null);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    useEffect(() => {
        const fetchProjects = async () => {
            setLoading(true);
            try {
                const res = await api.get("/api/projects");
                setProjects(Array.isArray(res.data) ? res.data : []);
            } catch (error) {
                console.error("Failed to fetch featured projects:", error);
                setProjects([]);
            }
            finally {
                setLoading(false);
            }
        }
        fetchProjects();
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
            formData.append("liveLink", form.liveLink || "");
            formData.append("githubLink", form.githubLink || "");

            if (form.tech.length > 0) {
                formData.append("tech", form.tech.join(","));
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

    const handleEdit = (project) => {
        setSelectedProject(project);
        setIsEditOpen(true);
    };
    const handleDeleteClick = (project) => {
        setSelectedProject(project);
        setIsDeleteOpen(true);
    };
    const handleDeleteConfirm = async () => {
        try {
            await api.delete(`/api/projects/${selectedProject._id}`);

            // ✅ remove from UI instantly (optimistic update)
            setProjects(prev =>
                prev.filter(p => p._id !== selectedProject._id)
            );

            setIsDeleteOpen(false);
            setSelectedProject(null);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Tab
            name='projects-tabs'
            tabs={[
                {
                    label: "Projects",
                    content: <div>
                        {loading ? "Loading..." : ""}
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
                        {filteredProjects.map((project) => (
                            <ItemCard
                                key={project._id}
                                title={project.title}
                                description={project.description}
                                updatedAt={project.updatedAt}
                                onEdit={() => handleEdit(project)}
                                onDelete={() => handleDeleteClick(project)}
                            />
                        ))}
                        <EditProject
                            isOpen={isEditOpen}
                            onClose={() => setIsEditOpen(false)}
                            project={selectedProject}
                            onUpdate={(updatedProject) => {
                                setProjects(prev =>
                                    prev.map(p =>
                                        p._id === updatedProject._id ? updatedProject : p
                                    )
                                );
                            }}
                        />

                        <DeleteConfirm
                            isOpen={isDeleteOpen}
                            onClose={() => setIsDeleteOpen(false)}
                            onConfirm={handleDeleteConfirm}
                            message="Are you sure you want to delete this project? This action cannot be undone."
                        />
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