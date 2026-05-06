const ProjectsSkeleton = () => {
    return (
        <div className="card bg-base-100 shadow-xl border border-base-content/20 overflow-hidden">

            {/* Image Skeleton */}
            <div className="w-full h-72 relative overflow-hidden">
                <div className="absolute inset-0 bg-base-content/10 animate-pulse" />

                {/* Shimmer effect */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="
                        w-full h-full
                        bg-linear-to-r from-transparent via-white/20 to-transparent
                        animate-[shimmer_1.5s_infinite]
                    " />
                </div>
            </div>

            {/* Body */}
            <div className="p-4 flex justify-center">
                <div className="h-6 w-2/3 bg-base-content/20 rounded animate-pulse"></div>
            </div>
        </div>
    );
};

export default ProjectsSkeleton;