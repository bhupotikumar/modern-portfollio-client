import Tab from "../../../components/admin/Tab/Tab";
import ComingSoon from "../../../components/ComingSoon/ComingSoon";
import General from "./General";

const Settings = () => {
    return (
        <Tab
            name="settings-tab"
            tabs={[
                {
                    label: "General",
                    content: <General />
                },
                {
                    label: "Advanced",
                    content: <ComingSoon />
                }
            ]}
        />
    );
};

export default Settings;