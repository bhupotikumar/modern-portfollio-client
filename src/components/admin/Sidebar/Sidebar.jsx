import { ImHome } from 'react-icons/im';
import { GoProject, GoSidebarExpand, GoSkipFill } from 'react-icons/go';
import { NavLink } from 'react-router';
import { FiSettings } from 'react-icons/fi';
import { ImBlog } from "react-icons/im";
import { IoMdContacts } from "react-icons/io";
import Logout from '../auth/Logout/Logout';
import { CiLogout } from 'react-icons/ci';

const Sidebar = () => {
    return (
        <div className="drawer-side is-drawer-close:overflow-visible z-50">
            <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
            <div className="flex h-full min-h-screen flex-col justify-between bg-base-200 p-2 is-drawer-close:w-14 is-drawer-open:w-64 transition-all duration-300">
                
                {/* TOP SECTION */}
                <div className="menu w-full flex-1 gap-3 p-0">
                    <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-secondary btn-square text-2xl mb-2">
                        <GoSidebarExpand />
                    </label>

                    <NavLink to={"/admin"}
                        end
                        data-tip="Homepage"
                        className={({ isActive }) =>
                            `flex items-center gap-3 text-2xl p-2 rounded-lg transition-all ${isActive ? "bg-secondary text-white" : "hover:bg-base-300"
                            }`
                        }>
                        <ImHome />
                        <span className="is-drawer-close:hidden text-lg">Dashboard</span>
                    </NavLink>

                    <NavLink to={"/admin/projects"}
                        className={({ isActive }) =>
                            `flex items-center gap-3 text-2xl p-2 rounded-lg transition-all ${isActive ? "bg-secondary text-white" : "hover:bg-base-300"
                            }`
                        }>
                        <GoProject />
                        <span className="is-drawer-close:hidden text-lg">Projects</span>
                    </NavLink>

                    <NavLink to={"/admin/skills"}
                        className={({ isActive }) =>
                            `flex items-center gap-3 text-2xl p-2 rounded-lg transition-all ${isActive ? "bg-secondary text-white" : "hover:bg-base-300"
                            }`
                        }>
                        <GoSkipFill />
                        <span className="is-drawer-close:hidden text-lg">Skills</span>
                    </NavLink>

                    <NavLink to={"/admin/blogs"}
                        className={({ isActive }) =>
                            `flex items-center gap-3 text-2xl p-2 rounded-lg transition-all ${isActive ? "bg-secondary text-white" : "hover:bg-base-300"
                            }`
                        }>
                        <ImBlog />
                        <span className="is-drawer-close:hidden text-lg">Blogs</span>
                    </NavLink>

                    <NavLink to={"/admin/contacts"}
                        className={({ isActive }) =>
                            `flex items-center gap-3 text-2xl p-2 rounded-lg transition-all ${isActive ? "bg-secondary text-white" : "hover:bg-base-300"
                            }`
                        }>
                        <IoMdContacts />
                        <span className="is-drawer-close:hidden text-lg">Contacts & Socials</span>
                    </NavLink>

                    <NavLink to={"/admin/settings"}
                        className={({ isActive }) =>
                            `flex items-center gap-3 text-2xl p-2 rounded-lg transition-all ${isActive ? "bg-secondary text-white" : "hover:bg-base-300"
                            }`
                        }>
                        <FiSettings />
                        <span className="is-drawer-close:hidden text-lg">Settings</span>
                    </NavLink>
                </div>

                {/* BOTTOM SECTION */}
                <div className="w-full pt-4 border-t border-base-300">
                    <Logout className="flex items-center gap-3 text-2xl p-2 rounded-lg text-error hover:bg-error/10 transition-all w-full cursor-pointer">
                        <CiLogout />
                        <span className="is-drawer-close:hidden text-lg font-medium">Logout</span>
                    </Logout>
                </div>

            </div>
        </div>
    );
};

export default Sidebar;