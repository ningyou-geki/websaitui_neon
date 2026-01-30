"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

interface FloatingWrapperProps {
    children: ReactNode;
    isAntigravity: boolean;
    className?: string; // To allow passing through layout classes
    delay?: number; // Random delay seed
}

export default function FloatingWrapper({
    children,
    isAntigravity,
    className = "",
    delay = 0,
}: FloatingWrapperProps) {
    const controls = useAnimation();
    const [randomSeed] = useState(() => Math.random());

    useEffect(() => {
        if (isAntigravity) {
            // Start floating
            controls.start({
                y: [0, -20 - randomSeed * 20, 10 + randomSeed * 10, 0],
                rotate: [0, -2 + randomSeed * 4, 1 - randomSeed * 2, 0],
                transition: {
                    duration: 6 + randomSeed * 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatType: "mirror", // Go back and forth smoothly
                    delay: delay * 0.5,
                },
            });
        } else {
            // Return to normal
            controls.start({
                y: 0,
                rotate: 0,
                transition: { duration: 1, ease: "easeOut" },
            });
        }
    }, [isAntigravity, controls, randomSeed, delay]);

    return (
        <motion.div
            animate={controls}
            className={className}
            style={{ transformOrigin: "center center" }}
        >
            {children}
        </motion.div>
    );
}
