import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function Magnetic({ children, className = "", strength = 0.5 }) {
    const ref = useRef(null);
    
    // Performance optimized motion values (no React re-renders on move)
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth spring physics
    const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
    const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

    const handleMouse = (e) => {
        if (!ref.current) return;
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        
        x.set(middleX * strength);
        y.set(middleY * strength);
    };

    const reset = () => {
        x.set(0);
        y.set(0);
    };

    // Disable on touch devices/mobile to save calculations
    useEffect(() => {
        const isMobile = window.innerWidth < 768;
        if (isMobile) {
            x.set(0);
            y.set(0);
        }
    }, []);

    return (
        <motion.div
            style={{ position: "relative", x: springX, y: springY }}
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            className={`cursor-pointer ${className}`}
        >
            {children}
        </motion.div>
    );
}

