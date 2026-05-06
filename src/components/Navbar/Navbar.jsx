import { useEffect, useState } from 'react';
import { NavLink } from 'react-router';

const Navbar = () => {

    const [links, setLinks] = useState([]);

    useEffect(() => {
        fetch("/navlinks.json")   // 🔥 FIXED
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
        <div>
            {links.map(link => (
                <NavLink
                    key={link.id}
                    to={link.href}
                    end={link.href === "/"}
                    className={({ isActive }) =>
                        `nav-link mx-2 font-semibold ${isActive ? "active" : ""}`
                    }
                >
                    {link.title}
                </NavLink>
            ))}
        </div>
    );
};

export default Navbar;