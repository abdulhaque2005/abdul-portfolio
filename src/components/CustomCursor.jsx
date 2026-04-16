import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
    const [isMobile, setIsMobile] = useState(true);
    const [hovering, setHovering] = useState(false);
    
    // Hardware accelerated values outside react state
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    
    // Physics for smooth ring
    const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
    const springX = useSpring(cursorX, springConfig);
    const springY = useSpring(cursorY, springConfig);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const mq = window.matchMedia("(max-width: 768px)");
        setIsMobile(mq.matches);
        if (mq.matches) return;

        const handleMouseMove = (e) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseOver = (e) => {
            const t = e.target;
            if (t.closest && (
                t.closest('button') || 
                t.closest('a') || 
                t.closest('[role="button"]') || 
                t.closest('.cursor-pointer') ||
                t.tagName === 'INPUT' || 
                t.tagName === 'TEXTAREA'
            )) {
                setHovering(true);
            }
        };

        const handleMouseOut = () => {
            setHovering(false);
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        window.addEventListener('mouseover', handleMouseOver, { passive: true });
        window.addEventListener('mouseout', handleMouseOut, { passive: true });

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
            window.removeEventListener('mouseout', handleMouseOut);
        };
    }, []);

    if (isMobile) return null;

    return (
        <div className="pointer-events-none fixed inset-0 z-[99999]">
            {/* Ring - Uses Spring Physics */}
            <motion.div
                className="absolute top-0 left-0 rounded-full border-2"
                style={{
                    x: springX,
                    y: springY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    width: hovering ? 55 : 36,
                    height: hovering ? 55 : 36,
                    backgroundColor: hovering ? 'rgba(0, 255, 204, 0.15)' : 'transparent',
                    borderColor: hovering ? 'rgba(0, 255, 204, 0.9)' : 'rgba(124, 58, 237, 0.6)',
                    boxShadow: hovering ? '0 0 20px rgba(0, 255, 204, 0.4)' : '0 0 10px rgba(124, 58, 237, 0.2)'
                }}
                transition={{ duration: 0.2 }}
            />

            {/* Dot - Follows Instantly */}
            <motion.div
                className="absolute top-0 left-0 rounded-full"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    width: hovering ? 15 : 10,
                    height: hovering ? 15 : 10,
                    backgroundColor: hovering ? '#7c3aed' : '#00ffcc',
                    boxShadow: hovering ? '0 0 15px #7c3aed' : '0 0 10px #00ffcc'
                }}
                transition={{ duration: 0.2 }}
            />
        </div>
    );
};

export default CustomCursor;

