import { useEffect, useState } from "react";
import publicApi from "../../api/publicApi";
import SkillCategories from "./SkillCategories";
import Skeleton from "../Skeleton/Skeleton";

const Skills = () => {
    const [loading, setLoading] = useState(true);
    const [skillsCategories, setSkillsCategories] = useState([]);

    useEffect(() => {
        let isMounted = true;

        const loadSkills = async () => {
            setLoading(true);
            try {
                const res = await publicApi.get("/api/categories");
                const data = Array.isArray(res.data) ? res.data : [];

                if (isMounted) {
                    setSkillsCategories(data);
                }
            } catch (err) {
                console.error("Failed to fetch skills categories:", err);
                if (isMounted) {
                    setSkillsCategories([]);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        loadSkills();

        return () => {
            isMounted = false;
        };
    }, []);

    if (loading || !skillsCategories) {
        return (
            <Skeleton variant="skill" />
        );
    }


    return (
        <div className="md:mt-12">
            {skillsCategories.map((category, index) => {
                return <SkillCategories
                    key={category._id}
                    category={category}
                    index={index}
                />
            })}
        </div>
    );
};

export default Skills;