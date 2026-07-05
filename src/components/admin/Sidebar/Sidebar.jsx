import { ImHome } from 'react-icons/im';
import { GoProject, GoSidebarExpand, GoSkipFill } from 'react-icons/go';
import { NavLink } from 'react-router';
import { FiSettings } from 'react-icons/fi';
import { ImBlog } from "react-icons/im";
import { IoMdContacts } from "react-icons/io";


const Sidebar = () => {
    return (
        <div className="drawer-side is-drawer-close:overflow-visible">
            <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
            <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
                <div className="menu w-full grow gap-3">
                    <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-secondary btn-square text-2xl">
                        <GoSidebarExpand />
                    </label>
                    <NavLink to={"/admin"}
                        end
                        data-tip="Homepage"
                        className={({ isActive }) =>
                            `flex items-center gap-3 text-2xl p-2 rounded-lg transition-all ${isActive ? "bg-secondary text-white" : "hover:bg-base-200"
                            }`
                        }>
                        <ImHome />
                        <span className="is-drawer-close:hidden text-lg">Dashboard</span>
                    </NavLink>
                    <NavLink to={"/admin/projects"}
                        className={({ isActive }) =>
                            `flex items-center gap-3 text-2xl p-2 rounded-lg transition-all ${isActive ? "bg-secondary text-white" : "hover:bg-base-200"
                            }`
                        }>
                        <GoProject />
                        <span className="is-drawer-close:hidden text-lg">Projects</span>
                    </NavLink>
                    <NavLink to={"/admin/skills"}
                        className={({ isActive }) =>
                            `flex items-center gap-3 text-2xl p-2 rounded-lg transition-all ${isActive ? "bg-secondary text-white" : "hover:bg-base-200"
                            }`
                        }>
                        <GoSkipFill />
                        <span className="is-drawer-close:hidden text-lg">Skills</span>
                    </NavLink>
                    <NavLink to={"/admin/blogs"}
                        className={({ isActive }) =>
                            `flex items-center gap-3 text-2xl p-2 rounded-lg transition-all ${isActive ? "bg-secondary text-white" : "hover:bg-base-200"
                            }`
                        }>
                        < ImBlog />
                        <span className="is-drawer-close:hidden text-lg">Blogs</span>
                    </NavLink>
                    <NavLink to={"/admin/contacts"}
                        className={({ isActive }) =>
                            `flex items-center gap-3 text-2xl p-2 rounded-lg transition-all ${isActive ? "bg-secondary text-white" : "hover:bg-base-200"
                            }`
                        }>
                        < IoMdContacts />
                        <span className="is-drawer-close:hidden text-lg">Contacts & Socials</span>
                    </NavLink>
                    <NavLink to={"/admin/settings"}
                        className={({ isActive }) =>
                            `flex items-center gap-3 text-2xl p-2 rounded-lg transition-all ${isActive ? "bg-secondary text-white" : "hover:bg-base-200"
                            }`
                        }>
                        <FiSettings />
                        <span className="is-drawer-close:hidden text-lg">Settings</span>
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;