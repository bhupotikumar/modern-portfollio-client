import { useEffect, useState } from "react";
import publicApi from "../../api/publicApi";
import SkillCategories from "./SkillCategories";
import SkillSkeleton from "../Skeleton/SkillSkeleton";

const Skills = () => {
    const [loading, setLoading] = useState(true);
    const [skillsCategories, setSkillsCategories] = useState([]);

    const categoryOrder = {
        "Frontend": 1,
        "Backend": 2,
        "Tools": 3,
        "Others": 4
    };

    const fetchSkillsCategories = async () => {
        setLoading(true);
        try {
            const res = await publicApi.get("/api/skills");
            const data = Array.isArray(res.data) ? res.data : [];

            // 2. Sort the data based on the categoryOrder map
            const sortedData = data.sort((a, b) => {
                // Get the weight of the category title (default to 99 if not found)
                const orderA = categoryOrder[a.title] || 99;
                const orderB = categoryOrder[b.title] || 99;

                return orderA - orderB;
            });

            setSkillsCategories(sortedData);
        } catch (err) {
            console.error("Failed to fetch skills categories:", err);
            setSkillsCategories([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSkillsCategories();
    }, []);

    if (loading || !skillsCategories) {
        return (
            <SkillSkeleton />
        );
    }


    return (
        <div className="md:mt-12">
            {skillsCategories.map((category, index) => {
                return <SkillCategories
                    key={category._id}
                    category={category}
                    index={index}
                />;
            })}
        </div>
    );
};

export default Skills;