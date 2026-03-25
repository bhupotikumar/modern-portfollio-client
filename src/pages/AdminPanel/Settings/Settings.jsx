import Tab from "../../../components/admin/Tab/Tab";
import General from "./General";

const Settings = () => {
    return (
        <Tab
        name="settings-tab"
        tabs={[
            {
                label: "General",
                content:<General />
            },
            {
                label: "Advanced",
                content: <h1>this is under development</h1>
            }
        ]}
        />
    );
};

export default Settings;