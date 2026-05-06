import React from "react";

const ProjectSkeletonCard = ({ index, total }) => {
    return (
        <div
            className="border border-black w-full sticky top-28 rounded-lg"
            style={{
                top: `${120 + index * 30}px`,
                transform: `translateX(${index * 10}px)`,
                zIndex: total + index,
            }}
        >
            <div className="relative card bg-base-100 w-full md:h-96 shadow-xl shadow-base-content/20 flex flex-col md:flex-row border border-base-content/10 overflow-hidden">

                {/* IMAGE */}
                <div className="w-full md:w-2/3 h-52 md:h-full relative bg-base-content/10">

                    {/* shimmer */}
                    <div className="absolute inset-0">
                        <div className="w-full h-full bg-gradient-to-r from-transparent via-base-content/10 to-transparent animate-[shimmer_1.6s_infinite]" />
                    </div>
                </div>

                {/* CONTENT */}
                <div className="flex flex-col justify-between w-full md:w-1/2 p-3 md:p-4 space-y-3">

                    {/* title */}
                    <div className="h-5 md:h-6 w-2/3 rounded bg-base-content/30"></div>

                    {/* description */}
                    <div className="space-y-2">
                        <div className="h-3 md:h-4 w-full rounded bg-base-content/10"></div>
                        <div className="h-3 md:h-4 w-5/6 rounded bg-base-content/10"></div>
                    </div>

                    <div className="divider my-1 md:my-3"></div>

                    {/* tech stack */}
                    <div className="hidden md:block space-y-2">
                        <div className="h-4 w-24 rounded bg-base-content/20"></div>

                        <div className="flex flex-wrap gap-2">
                            {[...Array(4)].map((_, i) => (
                                <div
                                    key={i}
                                    className="h-6 w-16 rounded-full bg-base-content/20"
                                ></div>
                            ))}
                        </div>
                    </div>

                    <div className="divider my-1 md:my-3"></div>

                    {/* buttons */}
                    <div className="flex justify-center md:justify-end gap-3">
                        <div className="h-8 md:h-10 w-20 md:w-28 rounded bg-base-content/20"></div>
                        <div className="h-8 md:h-10 w-24 md:w-32 rounded bg-primary/40"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const FeaturedProjectSkeleton = () => {
    const count = 3; // number of stacked cards

    return (
        <div className="md:my-12">

            {/* HEADER */}
            <div className="sticky top-16 mb-2 text-center space-y-2">
                <div className="h-7 md:h-8 w-56 mx-auto rounded bg-base-content/30"></div>
                <div className="h-4 w-64 mx-auto rounded bg-base-content/10"></div>
            </div>

            {/* STACK */}
            <div className="w-11/12 lg:w-8/12 flex flex-col justify-center items-center gap-12 mx-auto">

                {[...Array(count)].map((_, i) => (
                    // <div><h1>HIIIIII</h1></div>
                    <ProjectSkeletonCard key={i} index={i} total={count} />
                ))}

            </div>
        </div>
    );
};

export default FeaturedProjectSkeleton;