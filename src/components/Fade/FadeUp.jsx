import { motion as Motion } from "framer-motion";

const FadeUp = ({ children }) => {
    return (
        <Motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{
                once: true,
                amount: 0.15,
                margin: "0px 0px -80px 0px"
            }}
            transition={{
                duration: 0.5,
                ease: "easeOut",
            }}
            style={{
                willChange: "transform, opacity"
            }}
        >
            {children}
        </Motion.div>
    );
};

export default FadeUp;