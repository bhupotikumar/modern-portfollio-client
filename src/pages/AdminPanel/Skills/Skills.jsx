import { useEffect, useMemo, useState } from "react";
import api from "../../../api/axios";
import Tab from "../../../components/admin/Tab/Tab";
import AddSkill from "./AddSkill";
import EditSkill from "./EditSkill";
import DeleteConfirm from "../Projects/DeleteConfirm";
import SkillCard from "./SkillCard";

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

    // add skill + refresh
    const handleAddSkill = async (formData) => {
        try {
            await api.post("/api/skills", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            await fetchSkills();
            alert("Skill category added successfully!");
        } catch (error) {
            console.error("Failed to add skill:", error);
            alert("Failed to add skill");
        }
    };

    useEffect(() => {
        fetchSkills();
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
                        label: "All",
                        content: (
                            <div className="">
                                {mergedCategories.flatMap((cat) =>
                                    cat.skills.map((skill) => (
                                        <SkillCard key={skill._id} skill={skill} category={cat} getFileUrl={getFileUrl} handleEdit={handleEdit} handleDelete={handleDelete} />
                                    ))
                                )}
                            </div>
                        ),
                    },

                    // dynamic category tabs
                    ...mergedCategories.map((category) => ({
                        label: category.title,
                        content: (
                            <div className="">
                                {category.skills.length === 0 ? (
                                    <p>No skills yet</p>
                                ) : (
                                    category.skills.map((skill) => (
                                        <SkillCard key={skill._id} skill={skill} category={category} getFileUrl={getFileUrl} handleEdit={handleEdit} handleDelete={handleDelete} />
                                    ))
                                )}
                            </div>
                        ),
                    })),

                    // add new tab
                    {
                        label: "Add New",
                        content: <AddSkill onSubmit={handleAddSkill} />,
                    },
                ]}
            />
            <EditSkill
                isOpen={editOpen}
                onClose={() => setEditOpen(false)}
                skill={selectedSkill}
                categoryId={selectedCategoryId}
                onSuccess={fetchSkills}
            />

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