import React, { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
    const dotRef = useRef(null);
    const ringRef = useRef(null);
    const [isHovering, setIsHovering] = useState(false);

    // Track mouse position
    const mouse = useRef({ x: 0, y: 0 });
    // Track ring position for smooth follow
    const ring = useRef({ x: 0, y: 0 });

    useEffect(() => {
        // Only run on desktop
        if (window.matchMedia("(max-width: 768px)").matches) return;

        const handleMouseMove = (e) => {
            mouse.current = { x: e.clientX, y: e.clientY };

            // Update dot instantly
            if (dotRef.current) {
                dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
            }
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

        // Animation loop for the smooth ring
        let animationFrameId;
        const render = () => {
            // Lerp (Linear Interpolation) for smooth trailing effect
            ring.current.x += (mouse.current.x - ring.current.x) * 0.15;
            ring.current.y += (mouse.current.y - ring.current.y) * 0.15;

            if (ringRef.current) {
                ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%, -50%)`;
            }

            animationFrameId = requestAnimationFrame(render);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseover', handleMouseOver);
        
        // Start animation loop
        render();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="hidden md:block">
            {/* Ring */}
            <div
                ref={ringRef}
                className="fixed top-0 left-0 z-[9998] pointer-events-none rounded-full border-2 transition-all duration-200 ease-out"
                style={{
                    width: isHovering ? '55px' : '36px',
                    height: isHovering ? '55px' : '36px',
                    backgroundColor: isHovering ? "rgba(0, 255, 204, 0.15)" : "transparent",
                    borderColor: isHovering ? "rgba(0, 255, 204, 0.9)" : "rgba(124, 58, 237, 0.6)",
                    boxShadow: isHovering ? "0 0 20px rgba(0, 255, 204, 0.4)" : "0 0 10px rgba(124, 58, 237, 0.2)",
                    willChange: 'transform, width, height',
                }}
            />

            {/* Dot */}
            <div
                ref={dotRef}
                className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full transition-all duration-200 ease-out"
                style={{
                    width: '10px',
                    height: '10px',
                    backgroundColor: isHovering ? "#7c3aed" : "#00ffcc",
                    transform: isHovering ? 'scale(1.5)' : 'scale(1)',
                    boxShadow: isHovering ? "0 0 10px #7c3aed" : "0 0 10px #00ffcc",
                    willChange: 'transform, background-color',
                }}
            />
        </div>
    );
};

export default CustomCursor;
