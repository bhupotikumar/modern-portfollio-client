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
        <div className="font-heading navbar shadow-sm sticky top-0 left-0 z-100 bg-transparent backdrop-blur-2xl">
            <div className="navbar-start md:ml-4">
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
                        <div className="absolute top-12 left-0 w-52 p-3 rounded-2xl shadow-xl bg-base-100 border z-50 lg:hidden">
                            <Navbar />
                        </div>
                    )}
                </div>

                <Link to={"/"}
                    className="font-accent text-lg md:text-xl font-bold text-neutral"
                >
                    {loading || !user ? <div className="relative h-8 w-32 bg-base-content/20 rounded animate-pulse">
                        {/* shimmer */}
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="w-full h-full bg-linear-to-r from-transparent via-base-content/10 to-transparent animate-[shimmer_1.5s_infinite]"></div>
                        </div>
                    </div> : user?.name?.name}
                </Link>
            </div>

            {/* Navbar Center */}
            <div className="navbar-center hidden lg:flex">
                <Navbar />
            </div>

            {/* Navbar End */}
            <div className="navbar-end flex items-center gap-2 sm:gap-3 md:gap-4">
                <label className="flex cursor-pointer items-center gap-1.5 sm:gap-2">
                    <GoSun className="size-4 sm:size-5" />

                    <input
                        type="checkbox"
                        checked={theme === "dark"}
                        onChange={toggleTheme}
                        className="toggle toggle-sm sm:toggle md:toggle-md"
                        aria-label="Toggle dark mode"
                    />

                    <MdDarkMode className="size-4 sm:size-5" />
                </label>
            </div>
        </div >
    );
};

export default Header;