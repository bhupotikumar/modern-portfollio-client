import React from "react";

const FooterSkeleton = () => {
    return (
        <footer>

            {/* MAIN FOOTER */}
            <div className="footer sm:footer-horizontal p-4 md:p-10 flex flex-col-reverse md:flex-row items-center justify-between gap-6 bg-base-content/5">

                {/* LEFT SIDE */}
                <aside className="text-center md:text-left md:gap-4 w-full md:w-auto">

                    {/* name + title */}
                    <div className="space-y-2 mb-3">
                        <div className="h-6 md:h-8 w-40 md:w-56 rounded bg-base-content/30"></div>
                        <div className="h-4 md:h-5 w-28 md:w-40 rounded bg-base-content/20"></div>
                    </div>

                    {/* description */}
                    <div className="space-y-2 max-w-md mx-auto md:mx-0 mb-3">
                        <div className="h-4 w-full rounded bg-base-content/10"></div>
                        <div className="h-4 w-5/6 rounded bg-base-content/10"></div>
                    </div>

                    {/* social icons */}
                    <div className="flex justify-center md:justify-start gap-4 mt-3">
                        {[...Array(4)].map((_, i) => (
                            <div
                                key={i}
                                className="w-14 h-14 rounded-full bg-base-content/20"
                            />
                        ))}
                    </div>
                </aside>

                {/* RIGHT SIDE IMAGE */}
                <figure className="w-32 h-32 md:w-72 md:h-72 rounded-full border border-base-content/10 overflow-hidden relative bg-base-content/10">

                    {/* shimmer */}
                    <div className="absolute inset-0">
                        <div className="w-full h-full bg-linear-to-r from-transparent via-base-content/10 to-transparent animate-[shimmer_1.6s_infinite]" />
                    </div>
                </figure>
            </div>

            {/* BOTTOM BAR */}
            <div className="footer footer-center p-4 bg-base-content text-base-100 border-t border-base-content/20">

                <div className="h-3 md:h-4 w-60 md:w-96 rounded bg-base-100/20"></div>

            </div>
        </footer>
    );
};

export default FooterSkeleton;