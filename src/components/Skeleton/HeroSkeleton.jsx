import React from "react";

const HeroSkeleton = () => {
    return (
        <section className="relative min-h-[94vh] md:h-[90vh] w-full mx-auto flex flex-col md:flex-row items-center overflow-hidden">

            {/* BACKGROUND */}
            <div className="absolute inset-0 z-0">
                <div className="w-full h-full bg-base-100"></div>

                {/* adaptive glow */}
                <div className="absolute inset-0 opacity-30 dark:opacity-20
                    bg-[radial-gradient(circle_at_20%_30%,rgba(0,255,255,0.25),transparent_50%),radial-gradient(circle_at_80%_70%,rgba(255,0,255,0.25),transparent_50%)]">
                </div>
            </div>

            {/* MEDIA SKELETON */}
            <div className="relative z-10 w-full md:flex-1 h-80 md:h-[70vh] rounded-xl overflow-hidden">

                <div className="w-full h-full rounded-xl backdrop-blur-xl border border-base-content/10 bg-base-content/5 relative overflow-hidden">

                    {/* shimmer */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="w-full h-full bg-linear-to-r from-transparent via-base-content/10 to-transparent animate-[shimmer_1s_infinite]"></div>
                    </div>
                </div>

                {/* fake mute button */}
                <div className="absolute top-6 right-6 w-24 h-10 rounded-full border border-base-content/10 bg-base-content/10 backdrop-blur-xl"></div>
            </div>

            {/* CONTENT */}
            <div className="relative z-10 flex-1 md:w-auto p-4 md:p-6 rounded-2xl">

                {/* TITLE AREA */}
                <div className="mb-6 md:mb-10 space-y-4 text-center md:text-left">

                    <div className="h-8 w-28 rounded bg-base-content/20"></div>

                    <div className="h-10 md:h-14 w-3/4 rounded bg-base-content/30"></div>

                    <div className="h-6 md:h-8 w-1/2 rounded bg-base-content/20"></div>
                </div>

                {/* DESCRIPTION */}
                <div className="space-y-3 mb-6 md:mb-10">
                    <div className="h-4 w-full rounded bg-base-content/10"></div>
                    <div className="h-4 w-5/6 rounded bg-base-content/10"></div>
                    <div className="h-4 w-4/6 rounded bg-base-content/10"></div>
                </div>

                {/* BUTTONS */}
                <div className="flex items-center justify-center md:justify-start mb-8 gap-2">
                    <div className="h-12 w-36 rounded-l-xl bg-primary/40"></div>
                    <div className="h-12 w-32 rounded-r-xl bg-base-content/20"></div>
                </div>

                {/* SOCIAL */}
                <div className="space-y-3">
                    <div className="h-6 mt-16 w-40 rounded bg-base-content/20 mx-auto md:mx-0"></div>

                    <div className="flex justify-center md:justify-start gap-4 ">
                        {[...Array(4)].map((_, i) => (
                            <div
                                key={i}
                                className="relative overflow-hidden w-14 h-14 rounded-full bg-base-content/20 "

                            >
                                {/* shimmer */}
                                <div className="absolute inset-0 overflow-hidden">
                                    <div className="w-full h-full bg-linear-to-r from-transparent via-base-content/10 to-transparent animate-[shimmer_1.5s_infinite]"></div>
                                </div>
                            </div>

                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSkeleton;