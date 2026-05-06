import { Outlet, useLocation } from "react-router";
import Sidebar from "../../components/admin/Sidebar/Sidebar";
const AdminPanel = () => {
    const location = useLocation();

    const getTitle = () => {
        const path = location.pathname;

        if (path === "/admin") return "Dashboard";
        if (path.includes("/admin/projects")) return "Projects";
        if (path.includes("/admin/skills")) return "Skills";
        if (path.includes("/admin/blogs")) return "Blogs";
        if (path.includes("/admin/contacts")) return "Contacts & Socials";
        if (path.includes("/admin/settings")) return "Settings";
    }
    return (
        <div className="drawer drawer-open">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                <nav className="navbar w-full bg-base-300">

                    <div className="px-4 text-xl">{getTitle()}</div>
                </nav>
                <Outlet />
            </div>
            <Sidebar />
        </div>
    );
};

export default AdminPanel;