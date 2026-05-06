import BlogsSkeleton from "./BlogsSkeleton";
import FeaturedProjectSkeleton from "./FeaturedProjectSkeleton";
import FooterSkeleton from "./FooterSkeleton";
import HeroSkeleton from "./HeroSkeleton";
import ProjectsSkeleton from "./ProjectsSkeleton";
import SkillSkeleton from "./SkillSkeleton";

const Skeleton = ({ varient }) => {
    switch (varient) {
        case 'hero':
            return (
                <div className="rounded-xl shadow bg-gray-800 animate-pulse">
                    <HeroSkeleton />
                </div>
            );

        case 'skill':
            return (
                <div className="rounded-xl shadow bg-gray-800 animate-pulse">
                    <SkillSkeleton />
                </div>
            );

        case 'footer':
            return (
                <div className="rounded-xl shadow bg-gray-800 animate-pulse">
                    <FooterSkeleton />
                </div>
            );

        case 'projectCard':
            return (
                <div className="rounded-xl shadow bg-gray-800 animate-pulse">
                    <ProjectsSkeleton />
                </div>
            );

        case 'featuredProjects':
            return (
                <div className="rounded-xl shadow bg-gray-800 animate-pulse">
                    <FeaturedProjectSkeleton />
                </div>
            );

        case 'blogs':
            return (
                <div className="">
                    <BlogsSkeleton />
                </div>
            );

        default:
            return (
                <div className="flex w-52 flex-col gap-4">
                    <div className="skeleton h-32 w-full"></div>
                    <div className="skeleton h-4 w-28"></div>
                    <div className="skeleton h-4 w-full"></div>
                    <div className="skeleton h-4 w-full"></div>
                </div>
            );
    }
};

export default Skeleton;