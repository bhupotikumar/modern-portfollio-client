import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { GoSun } from 'react-icons/go';
import { MdDarkMode } from 'react-icons/md';
import useUser from '../../hooks/useUser';
import Navbar from './Navbar';
import useTheme from '../../utils/useTheme';
import { IoClose, IoMenu } from "react-icons/io5";


const Header = () => {
    const { theme, toggleTheme } = useTheme();
    const [menuOpen, setMenuOpen] = useState(false);
    const dropdownRef = useRef(null);

    const closeMenu = () => setMenuOpen(false);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const { user, loading } = useUser();

    return (
        <div className="font-heading navbar shadow-sm shadow-base-content/50 sticky top-0 left-0 z-100 bg-base-100/20 backdrop-blur-2xl">
            <div className="navbar-start md:ml-4 flex-1">
                <div className="dropdown relative" ref={dropdownRef}>
                    {/* Swap Hamburger/Close */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setMenuOpen(!menuOpen);
                        }}
                        className="relative flex mr-2 md:mr-4 h-10 w-10 items-center justify-center lg:hidden text-neutral"
                    >
                        {menuOpen ? (
                            <IoClose className="size-7" />
                        ) : (
                            <IoMenu className="size-7" />
                        )}
                    </button>

                    {/* Dropdown Menu */}
                    {menuOpen && (
                        <div className="absolute top-12 left-0 w-52 p-3 rounded-2xl shadow-xl bg-base-100 z-50 lg:hidden">
                            <Navbar closeMenu={closeMenu} />
                        </div>
                    )}
                </div>

                <Link to={"/"}
                    className="font-accent text-lg md:text-xl font-bold text-primary hover:text-accent transition-colors duration-300"
                >
                    {loading || !user ? <div className="relative h-8 w-32 bg-base-100/20 rounded animate-pulse">
                        {/* shimmer */}
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="w-full h-full bg-linear-to-r from-transparent via-base-content/10 to-transparent"></div>
                        </div>
                    </div> : user?.name?.name}
                </Link>
            </div>

            {/* Navbar Center */}
            <div className="navbar-center hidden lg:flex">
                <Navbar />
            </div>

            {/* Navbar End */}
            <div className="navbar-end ml-auto md:mr-4 w-22 flex justify-center items-center float-right">
                <label className="flex cursor-pointer items-center gap-1.5 sm:gap-2">
                    <GoSun className="size-4 sm:size-5" />

                    <input
                        type="checkbox"
                        checked={theme === "dark"}
                        onChange={toggleTheme}
                        className="toggle toggle-accent toggle-sm sm:toggle md:toggle-md"
                        aria-label="Toggle dark mode"
                    />

                    <MdDarkMode className="size-4 sm:size-5" />
                </label>
            </div>
        </div >
    );
};

export default Header;