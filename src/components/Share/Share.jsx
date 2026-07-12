import { useEffect, useRef, useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import {
    FaFacebook,
    FaInstagram,
    FaShareAlt,
    FaWhatsapp,
    FaLink,
} from "react-icons/fa";
import { SlSocialLinkedin } from "react-icons/sl";
import { shareBlog } from "../../utils/shareBlog";

const actions = [
    { id: 1, icon: <FaFacebook />, name: "facebook" },
    { id: 2, icon: <FaInstagram />, name: "instagram" },
    { id: 3, icon: <SlSocialLinkedin />, name: "linkedin" },
    { id: 4, icon: <FaWhatsapp />, name: "whatsapp" },
];

const Share = ({ blog }) => {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    // safer URL generation
    const url = blog
        ? `${window.location.origin}/blogs/${blog.slug || blog._id}`
        : "";

    const text = blog ? `${blog.title} ${url}` : "";

    // Native share (mobile)
    const handleShare = async (e) => {
        e.stopPropagation();

        if (!blog) return;

        try {
            await shareBlog({
                title: blog.title,
                url,
            });
        } catch (error) {
            console.error("Share failed:", error);
        }
    };

    // Copy link (better UX)
    const copyLink = async (e) => {
        e.stopPropagation();

        try {
            await navigator.clipboard.writeText(url);
            // replace later with toast
            console.log(" Link copied");
        } catch (err) {
            console.error("Copy failed:", err);
        }
    };

    // Social share (fixed)
    const handleActionClick = (name, e) => {
        e.stopPropagation();

        if (!url) return;

        const encodedUrl = encodeURIComponent(url);
        const encodedText = encodeURIComponent(text);

        let shareUrl = "";

        switch (name) {
            case "whatsapp":
                shareUrl = `https://wa.me/?text=${encodedText}`;
                break;

            case "facebook":
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
                break;

            case "linkedin":
                shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
                break;

            case "instagram":
                navigator.clipboard.writeText(url);
                alert("Link copied! Paste it on Instagram.");
                return;

            default:
                return;
        }

        window.open(shareUrl, "_blank", "noopener,noreferrer");
    };

    // Close outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const radius = 70;

    return (
        <div className="relative" onClick={(e) => e.stopPropagation()}>
            <div ref={ref} className="relative">

                {/* Floating Actions */}
                <AnimatePresence>
                    {open &&
                        actions.map((action, i) => {
                            const angle = 160 + i * 40;
                            const rad = (angle * Math.PI) / 180;

                            return (
                                <Motion.button
                                    key={action.id}
                                    onClick={(e) =>
                                        handleActionClick(action.name, e)
                                    }
                                    initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                                    animate={{
                                        opacity: 1,
                                        scale: 1,
                                        x: Math.cos(rad) * radius,
                                        y: Math.sin(rad) * radius,
                                    }}
                                    exit={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 20,
                                        delay: i * 0.05,
                                    }}
                                    className="absolute btn btn-circle btn-primary text-xl shadow-md shadow-base-content"
                                >
                                    {action.icon}
                                </Motion.button>
                            );
                        })}
                </AnimatePresence>

                {/* Main FAB */}
                <Motion.button
                    onClick={(e) => {
                        e.stopPropagation();

                        if (navigator.share && blog) {
                            handleShare(e);
                        } else {
                            setOpen((prev) => !prev);
                        }
                    }}
                    whileTap={{ scale: 0.9 }}
                    className="btn btn-primary btn-xs lg:btn-sm btn-circle shadow-xl selection:shadow-base-content"
                >
                    <Motion.span
                        animate={{ rotate: open ? 45 : 0 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <FaShareAlt className="text-sm lg:text-lg" />
                    </Motion.span>
                </Motion.button>

                {/* Copy Link */}
                {open && (
                    <Motion.button
                        onClick={copyLink}
                        className="absolute top-16 left-1/2 -translate-x-1/2 btn btn-sm shadow"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <FaLink className="mr-1" />
                        Copy Link
                    </Motion.button>
                )}
            </div>
        </div>
    );
};

export default Share;