import { useEffect, useMemo, useState } from "react";
import api from "../../../api/axios";
import Tab from "../../../components/admin/Tab/Tab";
import AddSkill from "./AddSkill";
import EditSkill from "./EditSkill";
import DeleteConfirm from "../../../components/admin/DeleteConfirm/DeleteConfirm";
import ItemCard from "../../../components/admin/ItemCard/ItemCard";
import Categories from "./Categories";

const Skills = () => {
    const [skillsCategory, setSkillsCategory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedSkill, setSelectedSkill] = useState(null);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);

    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    // helper for file URL
    const getFileUrl = (path) => {
        if (!path) return "/placeholder.png";
        return `${import.meta.env.VITE_API_URL}${path}`;
    };

    // fetch function (reusable)
    const fetchSkills = async () => {
        setLoading(true);
        try {
            const res = await api.get("/api/skills");
            setSkillsCategory(res.data || []);
        } catch (error) {
            console.error("Failed to fetch skills:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // defer the fetch to avoid setting state synchronously during effect
        const t = setTimeout(() => fetchSkills(), 0);
        return () => clearTimeout(t);
    }, []);

    // merge duplicate categories (memoized)
    const mergedCategories = useMemo(() => {
        return Object.values(
            skillsCategory.reduce((acc, category) => {
                if (!acc[category.title]) {
                    acc[category.title] = {
                        ...category,
                        skills: [...(category.skills || [])],
                    };
                } else {
                    acc[category.title].skills.push(...(category.skills || []));
                }
                return acc;
            }, {})
        );
    }, [skillsCategory]);

    const handleEdit = (skill, categoryId) => {
        setSelectedSkill(skill);
        setSelectedCategoryId(categoryId);
        setEditOpen(true);
    };
    const handleDelete = (skill, categoryId) => {
        setSelectedSkill(skill);
        setSelectedCategoryId(categoryId);
        setDeleteOpen(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            await api.delete(`/api/skills/${selectedSkill._id}`);

            // Remove the deleted skill from state
            setSkillsCategory(prevCategories =>
                prevCategories.map(category => ({
                    ...category,
                    skills: category.skills.filter(s => s._id !== selectedSkill._id),
                }))
            );

            setDeleteOpen(false);
            setSelectedSkill(null);
        } catch (err) {
            console.error(err);
        }
    };

    const handleAddSkill = async (form) => {
        try {
            const formData = new FormData();
            formData.append("title", form.title);
            formData.append("logo", form.logo);
            formData.append("logoType", form.logoType);
            formData.append("categoryId", form.categoryId);

            const res = await api.post("/api/skills", formData);
            alert("added", res.data.title);

        } catch (error) {
            console.log("Axios error:", error);
            alert(error.response?.data?.message || "Failed to add skill");
        }
    };

    // loading UI
    if (loading) {
        return <div className="p-4">Loading...</div>;
    }

    return (
        <div>
            <Tab
                name="skills-tabs"
                tabs={[
                    {
                        label: "All Skills",
                        content: (
                            <div className="">
                                {mergedCategories.flatMap((cat) =>
                                    cat.skills.map((skill) => (
                                        <ItemCard
                                            key={skill._id}
                                            skill={skill}
                                            getFileUrl={getFileUrl}
                                            onEdit={() => handleEdit(skill, cat._id)}
                                            onDelete={() => handleDelete(skill, cat._id)}
                                            title={skill.title}
                                            description={cat.title}
                                            updatedAt={skill.updatedAt}
                                        />
                                    ))
                                )}
                            </div>
                        ),
                    },

                    // add new skill tab
                    {
                        label: "Add New Skill",
                        content: <AddSkill onSubmit={handleAddSkill} />,
                    },

                    // Categories tab
                    {
                        label: "Categories",
                        content: <Categories />,
                    },
                ]}
            />
            {selectedSkill && (
                <EditSkill
                    isOpen={editOpen}
                    onClose={() => {
                        setEditOpen(false);
                        setSelectedSkill(null); // Clear skill on close
                    }}
                    skill={selectedSkill}
                    categoryId={selectedCategoryId}
                    onSuccess={fetchSkills}
                />
            )}

            <DeleteConfirm
                isOpen={deleteOpen}
                onClose={() => setDeleteOpen(false)}
                onConfirm={handleDeleteConfirm}
                message="Are you sure you want to delete this skill? This action cannot be undone."
            />
        </div>
    );
};

export default Skills;