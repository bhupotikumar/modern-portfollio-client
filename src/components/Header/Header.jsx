import { useEffect, useRef, useState } from 'react';
import useTheme from '../../utils/useTheme';
import { Link } from 'react-router';
import { GoSun } from 'react-icons/go';
import { MdDarkMode } from 'react-icons/md';
import useUser from '../../hooks/useUser';
import Navbar from './Navbar';

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
        <div className="primary-font navbar shadow-sm sticky top-0 left-0 z-100 bg-transparent backdrop-blur-2xl">
            <div className="navbar-start md:ml-4">
                <div className="dropdown relative" ref={dropdownRef}>
                    {/* Swap Hamburger/Close */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setMenuOpen(!menuOpen);
                        }}
                        className="mr-2 lg:hidden"
                    >
                        <div className="swap swap-rotate">
                            <input type="checkbox" checked={menuOpen} readOnly />

                            {/* Hamburger */}
                            <svg
                                className="swap-off w-5 h-5 fill-current border border-base-content/30 rounded"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                            >
                                <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>

                            {/* Close */}
                            <svg
                                className="swap-on w-5 h-5 fill-current border border-base-content/30 rounded"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                            >
                                <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                    </button>

                    {/* Dropdown Menu */}
                    {menuOpen && (
                        <div className="absolute top-12 left-0 w-52 p-3 rounded-2xl shadow-xl bg-base-100 border z-50 lg:hidden">
                            <Navbar />
                        </div>
                    )}
                </div>

                <Link to={"/"}
                    className="text-sm md:text-xl font-semibold md:font-bold"
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
            <div className="navbar-end md:mr-4">
                <label className="flex cursor-pointer gap-1 md:gap-2 items-center">
                    <GoSun />
                    <input
                        type="checkbox"
                        checked={theme === "dark"}
                        onChange={toggleTheme}
                        className="toggle"
                    />
                    <MdDarkMode />
                </label>
            </div>
        </div >
    );
};

export default Header;