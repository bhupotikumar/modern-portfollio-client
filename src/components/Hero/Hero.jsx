import { useRef, useState } from "react";
import SocialLinks from "../SocialLinks/SocialLinks";
import AnimatedBtn from "../AnimatedBtn/AnimatedBtn";
import TypingText from "../TypingText/TypingText";
import useUser from "../../hooks/useUser";
import { getImageUrl } from "../../utils/getImageUrl";
import heroBg from "../../assets/hero-bg.jpg";
import Skeleton from "../Skeleton/Skeleton";

const Hero = () => {
    const { user, loading } = useUser();
    const videoRef = useRef(null);

    const [hovered, setHovered] = useState(false);
    const [isMuted, setIsMuted] = useState(true);

    // cursor glow state
    const cursorRef = useRef({ x: 0, y: 0 });
    const glowRef = useRef(null);
    let rafId = useRef(null);

    const nameValue = user?.name?.name || "";
    const titleValue = user?.title?.title || "";
    const descriptionValue = user?.description?.description || "";
    const photoValue = user?.photo?.photo || "/placeholder.jpg";
    const rawVideo = user?.intro?.video;

    const introSrc =
        typeof rawVideo === "string" && rawVideo.trim()
            ? rawVideo.startsWith("http")
                ? rawVideo
                : getImageUrl(rawVideo)
            : null;

    const isDataReady = !loading && !!nameValue;

    const handleEnter = async () => {
        setHovered(true);
        if (videoRef.current) {
            try {
                videoRef.current.muted = isMuted;
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
        <section
            onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();

                cursorRef.current = {
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top,
                };

                if (!rafId.current) {
                    rafId.current = requestAnimationFrame(() => {
                        if (glowRef.current) {
                            glowRef.current.style.transform = `translate(${cursorRef.current.x - 150}px, ${cursorRef.current.y - 200}px)`;
                        }
                        rafId.current = null;
                    });
                }
            }}
            className="relative min-h-[94vh] md:h-[90vh] w-full mx-auto flex flex-col md:flex-row items-center overflow-hidden"
        >
            {/* GLOW CURSOR */}
            <div
                ref={glowRef}
                className="pointer-events-none absolute z-50"
                style={{
                    width: 500,
                    height: 500,
                    borderRadius: 2000,
                    background:
                        "radial-gradient(circle, rgba(0,255,255,0.3), transparent 100%)",
                    filter: "blur(100px)",
                    transform: "translate(0px,0px)",
                }}
            />

            {/* BACKGROUND */}
            <div className="absolute inset-0 z-10 blur-xs">
                <img
                    src={heroBg}
                    alt="bg"
                    className="w-full h-full object-cover opacity-50 scale-100 blur-none animate-[float_20s_linear_infinite]"
                />

                {/* gradient */}
                <div className="absolute inset-0 bg-linear-to-br from-base-content/10 via-base-100/40 to-base-100"></div>

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
                    src={user?.photo.photoType === 'file' ? getImageUrl(photoValue) : photoValue}
                    alt="Profile"
                    className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-1000 ease-in-out rounded-xl
  ${hovered ? "scale-110 opacity-0 blur-lg" : "scale-100 opacity-100 blur-0"}`}
                    style={{
                        WebkitMaskImage: "linear-gradient(to bottom, black 80%, transparent 100%)",
                        maskImage: "linear-gradient(to bottom, black 70%, transparent 100%)",
                        WebkitMaskRepeat: "no-repeat",
                        maskRepeat: "no-repeat"
                    }}
                />

                {introSrc && (
                    <video
                        ref={videoRef}
                        src={introSrc}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500
                        ${hovered ? "opacity-100" : "opacity-0"}`}
                        playsInline
                        loop
                        muted={isMuted}
                        preload="auto"
                    />
                )}

                <button
                    onClick={toggleMute}
                    className={`absolute top-6 right-6 z-50 p-4 rounded-full backdrop-blur-xl border border-white/20 transition-all duration-500
                    ${hovered ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"} 
                    ${isMuted ? "bg-black/40 text-white" : "bg-primary text-white shadow-lg"}`}
                >
                    <span className="text-[10px] font-black uppercase tracking-widest">
                        {isMuted ? "🔈 Unmute" : "🔊 Sound On"}
                    </span>
                </button>
            </div>

            {/* CONTENT SECTION (GLASS) */}
            <div
                className="relative z-10 flex-1 md:w-auto p-4 md:p-6 rounded-2xl
                animate-[float_6s_ease-in-out_infinite]"
            >
                <div className="w-full">
                    <div className="font-black leading-none mb-3 md:mb-10 text-center md:text-left">
                        <span className="text-2xl md:text-2xl lg:text-3xl">Hi, I'm</span>

                        <h1 className="bg-linear-to-r from-primary to-accent text-transparent bg-clip-text text-4xl md:text-3xl lg:text-6xl p-0 m-0">
                            {isDataReady ? (
                                <TypingText text={nameValue} speed={70} />
                            ) : (
                                <span className="opacity-0">Loading...</span>
                            )}
                        </h1>

                        <h2 className="text-xl md:text-2xl lg:text-3xl text-base-content/80">
                            {isDataReady ? (
                                <TypingText text={titleValue} speed={70} />
                            ) : (
                                <span className="opacity-0">Loading...</span>
                            )}
                        </h2>
                    </div>

                    <p className="text-center md:text-left text-lg md:text-xl text-base-content/80 leading-relaxed mb-4 md:mb-10 p-2 border border-base-content/20 backdrop-blur-xl shadow-xl rounded-lg">
                        {descriptionValue || loading}
                    </p>

                    <div className="flex items-center justify-center md:justify-start mb-2 md:mb-12">
                        <AnimatedBtn className="btn-primary btn-lg backdrop-blur-md bg-primary/80 border border-white/20 border-r-0 rounded-r-none">
                            Download CV
                        </AnimatedBtn>

                        <AnimatedBtn
                            direction="rtl"
                            className="btn-outline btn-lg backdrop-blur-md border-white/20 border-l-0 rounded-l-none"
                        >
                            Hire Me
                        </AnimatedBtn>
                    </div>

                    <div>
                        <h1 className="text-center md:text-left text-xl py-2">
                            Connect with me
                        </h1>

                        <div className="flex justify-center md:justify-start gap-4">
                            <SocialLinks />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;