import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';


const styles = {
    ring: "fixed top-0 left-0 z-[9998] pointer-events-none rounded-full border border-white/50 mix-blend-difference",
    dot: "fixed top-0 left-0 z-[9999] pointer-events-none rounded-full bg-white mix-blend-difference"
};

const CustomCursor = () => {
    const [isHovering, setIsHovering] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const ringX = useSpring(mouseX, { stiffness: 100, damping: 20 });
    const ringY = useSpring(mouseY, { stiffness: 100, damping: 20 });

    const dotX = useSpring(mouseX, { stiffness: 1000, damping: 50 });
    const dotY = useSpring(mouseY, { stiffness: 1000, damping: 50 });

    useEffect(() => {
        const mouseMove = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleMouseOver = (e) => {
            if (
                e.target.tagName === 'BUTTON' ||
                e.target.tagName === 'A' ||
                e.target.closest('button') ||
                e.target.closest('a') ||
                e.target.classList.contains('cursor-pointer') ||
                window.getComputedStyle(e.target).cursor === 'pointer'
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener("mousemove", mouseMove);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", mouseMove);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, [mouseX, mouseY]);

    return (
        <div className="hidden md:block">
            <motion.div
                className={styles.ring}
                style={{
                    x: ringX,
                    y: ringY,
                    translateX: "-50%",
                    translateY: "-50%"
                }}
                animate={{
                    width: isHovering ? 64 : 32,
                    height: isHovering ? 64 : 32,
                    backgroundColor: isHovering ? "rgba(255, 255, 255, 0.1)" : "transparent",
                    borderColor: isHovering ? "rgba(255, 255, 255, 0.8)" : "rgba(255, 255, 255, 0.4)",
                }}
                transition={{
                    type: "tween",
                    duration: 0.3
                }}
            />

            <motion.div
                className={styles.dot}
                style={{
                    x: dotX,
                    y: dotY,
                    translateX: "-50%",
                    translateY: "-50%"
                }}
                animate={{
                    width: isHovering ? 8 : 8,
                    height: isHovering ? 8 : 8,
                    scale: isHovering ? 0 : 1
                }}
            />
        </div>
    );
};

export default CustomCursor;
