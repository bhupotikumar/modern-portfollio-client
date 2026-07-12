import React from "react";

/**
 * AnimatedButton - reusable gradient button with animated fill
 *
 * Props:
 *  - children: button text/content
 *  - as: tag/component (button, a, Link, NavLink)
 *  - className: extra Tailwind classes
 *  - gradient: Tailwind gradient classes (default: from-indigo-500 to-blue-500)
 *  - direction: animation direction ('ltr' | 'rtl' | 'diagonal')
 *  - ...props: other props (href, to, onClick)
 */

const AnimatedBtn = React.forwardRef((props, ref) => {
    const {
        children,
        as: Component = "button",
        className = "",
        gradient = "from-primary to-secondary",
        direction = "ltr",
        ...rest
    } = props;
    const baseClasses =
        "relative overflow-hidden btn btn-outline btn-primary bg-transparent hover:bg-transparent group";
    // Map direction to Tailwind classes
    const directionClasses = {
        ltr: {
            position: "left-0 top-0 w-0 h-full origin-left",
            grow: "group-hover:w-full",
            gradientDirection: "bg-gradient-to-r"
        },
        rtl: {
            position: "right-0 top-0 w-0 h-full origin-right",
            grow: "group-hover:w-full",
            gradientDirection: "bg-gradient-to-l"
        },
        ttb: {
            position: "top-0 left-0 w-full h-0 origin-top",
            grow: "group-hover:h-full",
            gradientDirection: "bg-gradient-to-b"
        },
        btt: {
            position: "bottom-0 left-0 w-full h-0 origin-bottom",
            grow: "group-hover:h-full",
            gradientDirection: "bg-gradient-to-t"
        },
        diagonal: {
            position: "top-0 left-0 w-0 h-full origin-left",
            grow: "group-hover:w-full",
            gradientDirection: "bg-gradient-to-br"
        }
    };

    const current = directionClasses[direction] || directionClasses.ltr;

    return (
        <Component
            ref={ref}
            className={`${baseClasses} ${className}`}
            {...rest}
        >
            {/* Animated gradient background */}
            <span
                className={`absolute ${current.position} ${current.gradientDirection} ${gradient} transition-all duration-500 ease-out ${current.grow}`}
            />
            {/* Button text */}
            <span className="relative z-10 transition-all duration-300 group-hover:text-primary-content">
                {children}
            </span>
        </Component>
    );
}
);
AnimatedBtn.displayName = "AnimatedBtn";
export default AnimatedBtn;