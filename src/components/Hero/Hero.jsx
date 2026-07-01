import { useRef, useState } from "react";
import SocialLinks from "../SocialLinks/SocialLinks";
import AnimatedBtn from "../AnimatedBtn/AnimatedBtn";
import TypingText from "../TypingText/TypingText";
import useUser from "../../hooks/useUser";
import heroBg from "../../assets/hero-bg.jpg";
import Skeleton from "../Skeleton/Skeleton";
import { Link } from "react-router";
import FadeUp from "../Fade/FadeUp";

const Hero = () => {
    const { user, loading } = useUser();
    const videoRef = useRef(null);

    const [hovered, setHovered] = useState(false);
    const [isMuted, setIsMuted] = useState(false);

    const nameValue = user?.name?.name || "";
    const titleValue = user?.title?.title || "";
    const descriptionValue = user?.description?.description || "";
    const photoValue = user?.photo || "/placeholder.jpg";
    const rawVideo = user?.intro?.video;
    const introSrc =
        typeof rawVideo === "string" && rawVideo.trim()
            ? rawVideo
            : null;

    const handleEnter = async () => {
        setHovered(true);
        if (videoRef.current) {
            try {
                setIsMuted(false);
                await videoRef.current.play();
            } catch {
                videoRef.current.muted = true;
                await videoRef.current.play();
            }
        }
    };

    const handleLeave = () => {
        setHovered(false);
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    };

    const toggleMute = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (videoRef.current) {
            const newMutedState = !isMuted;
            videoRef.current.muted = newMutedState;
            setIsMuted(newMutedState);
        }
    };

    // Skeleton loader while fetching user data
    if (loading || !user) {
        return (
            <Skeleton varient="hero" />
        );
    }

    return (
        <FadeUp>
            <section
                className="relative min-h-[94vh] md:h-[90vh] w-full mx-auto flex flex-col md:flex-row items-center overflow-hidden"
            >
                {/* BACKGROUND */}
                <div className="absolute inset-0 z-10 blur-xs">
                    <img
                        src={heroBg}
                        alt="bg"
                        className="w-full h-full object-cover opacity-50 scale-100 blur-none animate-[float_20s_linear_infinite]"
                    />

                    {/* gradient */}
                    <div className="absolute inset-0 bg-linear-to-br from-neutral via-accent/20 to-primary/10"></div>

                    {/* glow accents */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(0,255,255,0.2),transparent_50%),radial-gradient(circle_at_80%_70%,rgba(255,0,255,0.2),transparent_50%)]"></div>
                </div>

                {/* MEDIA SECTION (GLASS) */}
                <div
                    className="relative z-10 w-full md:flex-1 h-96 md:h-[70vh] overflow-hidden group rounded-xl 
                cursor-pointer animate-[float_6s_ease-in-out_infinite]"
                    onMouseEnter={handleEnter}
                    onMouseLeave={handleLeave}
                >
                    <img
                        src={photoValue}
                        alt="Profile"
                        className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-1000 ease-in-out rounded-xl
    
    ${introSrc
                                ? hovered
                                    ? "scale-110 opacity-0 blur-lg"
                                    : "scale-100 opacity-100 blur-0"
                                : "scale-100 opacity-100 blur-0"
                            }
    `}
                        style={{
                            WebkitMaskImage:
                                "linear-gradient(to bottom, black 80%, transparent 100%)",
                            maskImage:
                                "linear-gradient(to bottom, black 70%, transparent 100%)",
                            WebkitMaskRepeat: "no-repeat",
                            maskRepeat: "no-repeat"
                        }}
                    />

                    {introSrc && (
                        <video
                            ref={videoRef}
                            src={introSrc}
                            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out rounded-xl
        
        ${hovered
                                    ? "opacity-100 scale-100"
                                    : "opacity-0 scale-105"
                                }
        `}
                            playsInline
                            loop
                            muted={isMuted}
                            preload="auto"
                            onPlay={() => {
                                if (videoRef.current) {
                                    setIsMuted(videoRef.current.muted);
                                }
                            }}
                        />
                    )}

                    <button
                        onClick={toggleMute}
                        className={`absolute top-6 right-6 z-50 p-4 rounded-full backdrop-blur-xl transition-all duration-500
                    ${hovered ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"} 
                    ${isMuted ? "bg-secondary/40 text-secondary-content" : "bg-primary text-primary-content shadow-lg"}`}
                    >
                        <span className="text-[10px] font-black uppercase tracking-widest">
                            {isMuted ? "🔈 Unmute" : "🔊 Sound On"}
                        </span>
                    </button>
                </div>

                {/* CONTENT SECTION (GLASS) */}
                <div
                    className="relative z-50 flex-1 md:w-auto p-1 md:p-4 lg:p-6 rounded-lg md:rounded-2xl
                animate-[float_6s_ease-in-out_infinite]"
                >
                    <div className="w-full">
                        <div className="font-accent font-extrabold text-neutral leading-none mb-0 md:mb-6 lg:mb-10 text-center md:text-left">
                            <span className="text-2xl md:text-2xl lg:text-3xl">Hi, I'm</span>

                            <h2 className="font-heading bg-linear-to-r from-primary to-secondary text-transparent bg-clip-text text-4xl md:text-3xl lg:text-6xl p-0 m-0"
                                style={{
                                    WebkitTextStroke: "1px var(--color-neutral)",
                                }}>
                                <TypingText text={nameValue} pause={2000} speed={70} />
                            </h2>

                            <h1 className="md:mt-3 text-xl md:text-2xl lg:text-3xl text-neutral">
                                <TypingText text={titleValue} pause={1000} speed={70} />
                            </h1>
                        </div>

                        <p className="text-center md:text-justify text-base md:text-xl text-base-content leading-relaxed mb-4 md:mb-10 p-2 border border-accent backdrop-blur-xl shadow-xl rounded-lg">
                            {descriptionValue}
                        </p>

                        <div className="flex items-center justify-center md:justify-start mb-2 md:mb-12">
                            <AnimatedBtn
                                className="btn-primary btn-md md:btn-lg backdrop-blur-md border border-accent border-r-0 rounded-r-none text-secondary hover:text-primary-content"
                                as="a"
                                href={`${import.meta.env.VITE_API_URL}/api/cv`}
                                rel="noopener noreferrer"
                            >
                                Download CV
                            </AnimatedBtn>

                            <AnimatedBtn
                                as={Link}
                                to="/contact"
                                direction="rtl"
                                className="btn-outline btn-md md:btn-lg backdrop-blur-md border border-accent border-l-0 rounded-l-none text-secondary hover:text-primary-content"
                            >
                                Hire Me
                            </AnimatedBtn>
                        </div>

                        <div>
                            <h1 className="font-heading text-center md:text-left text-xl py-2">
                                Connect with me
                            </h1>

                            <div className="p-4 md:p-0 flex justify-center md:justify-start gap-4">
                                <SocialLinks />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </FadeUp>
    );
};

export default Hero;