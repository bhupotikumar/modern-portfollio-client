import api from "../../../api/axios";
import Tab from "../../../components/admin/Tab/Tab";
import AddSkill from "./AddSkill";

const Skills = () => {
    const handleAddSkill = async (formData) => {
        try {
            const response = await api.post("/skills", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            alert("Skill category added successfully!");
            console.log("Response:", response.data);
        } catch (error) {
            console.error("Failed to add skill:", error);
            alert("Failed to add skill");
        }
    };

    return (
        <div>
            <Tab
                name="skills-tabs"
                tabs={[
                    { label: "All", content: <div>All Skills</div> },
                    { label: "Frontend", content: <div>Frontend Skills</div> },
                    { label: "Backend", content: <div>Backend Skills</div> },
                    { label: "Tools", content: <div>Tools Skills</div> },
                    { label: "Add New", content: <AddSkill onSubmit={handleAddSkill} /> },
                ]}
            />
        </div>
    );
};

export default Skills;