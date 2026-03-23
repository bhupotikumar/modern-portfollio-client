import { Outlet } from "react-router";

const AdminPanel = () => {
    return (
        <div>
            <h1>Welcome Admin</h1>
            <Outlet />
        </div>
    );
};

export default AdminPanel;