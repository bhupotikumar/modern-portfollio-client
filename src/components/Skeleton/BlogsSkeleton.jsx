import React from "react";

const BlogsSkeleton = () => {
    return (
        <div className="w-11/12 mx-auto">
            {/* Title */}
            <div className="flex justify-center my-6">
                <div className="h-8 w-40 bg-base-300 rounded animate-pulse"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Blog List Skeleton (Left Side) */}
                <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div
                            key={i}
                            className="animate-pulse bg-base-200 rounded-xl p-4 shadow"
                        >
                            <div className="h-40 bg-base-300 rounded mb-4"></div>
                            <div className="h-4 bg-base-300 rounded w-3/4 mb-2"></div>
                            <div className="h-4 bg-base-300 rounded w-1/2"></div>
                        </div>
                    ))}
                </div>

                {/* Sidebar Skeleton (Right Side) */}
                <div className="hidden md:block">
                    <div className="h-6 w-32 bg-base-300 rounded mb-4 animate-pulse"></div>

                    {Array.from({ length: 4 }).map((_, i) => (
                        <div
                            key={i}
                            className="animate-pulse bg-base-200 rounded-lg p-3 mb-3"
                        >
                            <div className="h-4 bg-base-300 rounded w-3/4 mb-2"></div>
                            <div className="h-3 bg-base-300 rounded w-1/2"></div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default BlogsSkeleton;