import React, { useEffect, useRef } from 'react';

const CustomCursor = () => {
    const dotRef = useRef(null);
    const ringRef = useRef(null);

    useEffect(() => {
        // Only run on desktop
        if (typeof window === 'undefined') return;
        const mq = window.matchMedia("(max-width: 768px)");
        if (mq.matches) return;

        // All state tracked in plain vars — zero React re-renders
        let mx = -100, my = -100;   // mouse position
        let rx = -100, ry = -100;   // ring position
        let hovering = false;
        let rafId = 0;

        // Cache element refs locally for perf
        const dot = dotRef.current;
        const ring = ringRef.current;
        if (!dot || !ring) return;

        // Pre-set initial styles
        dot.style.willChange = 'transform';
        ring.style.willChange = 'transform';

        const handleMouseMove = (e) => {
            mx = e.clientX;
            my = e.clientY;

            // Dot follows instantly
            const s = hovering ? 1.5 : 1;
            dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%) scale(${s})`;

            // Hover detection — cheap check inside mousemove (no separate listener)
            const t = e.target;
            const isClickable = !!(
                t.closest('button') ||
                t.closest('a') ||
                t.closest('[role="button"]') ||
                t.closest('.cursor-pointer') ||
                t.tagName === 'INPUT' ||
                t.tagName === 'TEXTAREA'
            );

            if (isClickable !== hovering) {
                hovering = isClickable;
                // Apply hover styles directly — no setState, no re-render
                ring.style.width = hovering ? '55px' : '36px';
                ring.style.height = hovering ? '55px' : '36px';
                ring.style.backgroundColor = hovering ? 'rgba(0, 255, 204, 0.15)' : 'transparent';
                ring.style.borderColor = hovering ? 'rgba(0, 255, 204, 0.9)' : 'rgba(124, 58, 237, 0.6)';
                ring.style.boxShadow = hovering ? '0 0 20px rgba(0, 255, 204, 0.4)' : '0 0 10px rgba(124, 58, 237, 0.2)';
                dot.style.backgroundColor = hovering ? '#7c3aed' : '#00ffcc';
                dot.style.boxShadow = hovering ? '0 0 10px #7c3aed' : '0 0 10px #00ffcc';
            }
        };

        // Smooth ring follow — 60fps rAF loop
        const render = () => {
            rx += (mx - rx) * 0.2;
            ry += (my - ry) * 0.2;
            ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
            rafId = requestAnimationFrame(render);
        };

        // Use passive listener for better scroll performance
        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        rafId = requestAnimationFrame(render);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(rafId);
        };
    }, []);

    return (
        <div className="hidden md:block">
            {/* Ring */}
            <div
                ref={ringRef}
                className="fixed top-0 left-0 z-[99999] pointer-events-none rounded-full border-2"
                style={{
                    width: '36px',
                    height: '36px',
                    backgroundColor: 'transparent',
                    borderColor: 'rgba(124, 58, 237, 0.6)',
                    boxShadow: '0 0 10px rgba(124, 58, 237, 0.2)',
                    transition: 'width 0.2s, height 0.2s, background-color 0.2s, border-color 0.2s, box-shadow 0.2s',
                }}
            />

            {/* Dot */}
            <div
                ref={dotRef}
                className="fixed top-0 left-0 z-[99999] pointer-events-none rounded-full"
                style={{
                    width: '10px',
                    height: '10px',
                    backgroundColor: '#00ffcc',
                    boxShadow: '0 0 10px #00ffcc',
                    transition: 'background-color 0.2s, box-shadow 0.2s',
                }}
            />
        </div>
    );
};

export default CustomCursor;

