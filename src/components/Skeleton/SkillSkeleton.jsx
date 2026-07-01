import React from "react";
import Marquee from "react-fast-marquee";

const SkillSkeletonCard = () => {
    return (
        <div className="w-28 md:w-40 h-24 md:h-32 mr-6 md:mr-16 mb-6 rounded-md border border-base-content/10 bg-base-content/5 backdrop-blur-xl overflow-hidden relative">

            {/* shimmer layer */}
            <div className="absolute inset-0">
                <div className="w-full h-full bg-linear-to-r from-transparent via-base-content/10 to-transparent animate-[shimmer_1.6s_infinite]" />
            </div>

            <div className="flex flex-col items-center justify-center h-full p-2 md:p-4 space-y-2">

                {/* logo */}
                <div className="w-12 md:w-16 h-12 md:h-16 rounded-full bg-base-content/20"></div>

                {/* title */}
                <div className="h-3 md:h-4 w-16 md:w-24 rounded bg-base-content/20"></div>
            </div>
        </div>
    );
};

const SkillSkeletonRow = ({ index }) => {
    const direction = index % 2 === 0 ? "left" : "right";

    return (
        <div className="mb-6 md:mb-10">

            {/* title */}
            <div className="flex justify-center mb-3 md:mb-5">
                <div className="h-6 md:h-8 w-40 md:w-60 rounded bg-base-content/20"></div>
            </div>

            {/* marquee skeleton */}
            <Marquee
                speed={100}
                pauseOnHover={false}
                autoFill={true}
                direction={direction}
            >
                {[...Array(8)].map((_, i) => (
                    <SkillSkeletonCard key={i} />
                ))}
            </Marquee>
        </div>
    );
};

const SkillSkeleton = () => {
    return (
        <section className="w-full py-6 md:py-10">

            {[...Array(3)].map((_, i) => (
                <SkillSkeletonRow key={i} index={i} />
            ))}

        </section>
    );
};

export default SkillSkeleton;