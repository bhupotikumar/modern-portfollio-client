import { useEffect, useState } from "react";
import Frontend from "./Frontend";
import Backend from "./Backend";
import Tools from "./Tools";
import CurrentLearning from "./CurrentLearning";

const Skills = () => {
    const [skillsData, setSkillsData] = useState([]);

    useEffect(() => {
        fetch("/skills.json")
            .then((res) => res.json())
            .then((data) => setSkillsData(data));
    }, []);

    const frontendData = skillsData.find((s) => s.id === "frontend");
    const backendData = skillsData.find((s) => s.id === "backend");
    const toolsData = skillsData.find((s) => s.id === "tools");
    const currentLearningData = skillsData.find((s) => s.id === "current-learning");

    return (
        <div className="mt-12">
            <Frontend frontendData={frontendData} />
            <Backend backendData={backendData} />
            <Tools toolsData={toolsData} />
            <CurrentLearning currentLearningData={currentLearningData} />
        </div>
    );
};

export default Skills;