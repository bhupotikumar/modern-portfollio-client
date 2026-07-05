import { useEffect, useState } from 'react';
import { NavLink } from 'react-router';

const Navbar = () => {

    const [links, setLinks] = useState([]);

    useEffect(() => {
        fetch("/navlinks.json")
            .then(res => {
                if (!res.ok) {
                    throw new Error("Failed to load navlinks.json");
                }
                return res.json();
            })
            .then(data => setLinks(data))
            .catch(err => console.error("Navbar JSON error:", err));
    }, []);

    return (
        <div className="flex flex-col lg:flex-row lg:items-center md:bg-transparent">
            {links.map(link => (
                <NavLink
                    key={link.id}
                    to={link.href}
                    end={link.href === "/"}
                    className={({ isActive }) =>
                        `
                        px-4 py-2 my-2 lg:my-0
                        rounded-lg text-neutral
                        transition-all duration-300
                        font-semibold
                        
                        ${isActive
                            ? "bg-secondary text-secondary-content"
                            : "hover:bg-base-content/20 hover:text-accent"
                        }
                        `
                    }
                >
                    {link.title}
                </NavLink>
            ))}
        </div>
    );
};

export default Navbar;