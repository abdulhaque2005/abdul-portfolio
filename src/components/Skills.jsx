import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const skillsData = [
    {
        name: "JavaScript",
        img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
        level: "Advanced",
        color: "shadow-yellow-500/50",
        bg: "from-yellow-500/20 to-yellow-500/5"
    },

    {
        name: "React.js",
        img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        level: "Advanced",
        color: "shadow-cyan-400/50",
        bg: "from-cyan-500/20 to-cyan-500/5"
    },

    {
        name: "C",
        img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
        level: "Intermediate",
        color: "shadow-blue-500/50",
        bg: "from-blue-500/20 to-blue-500/5"
    },
    {
        name: "C++",
        img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
        level: "Intermediate",
        color: "shadow-blue-400/50",
        bg: "from-blue-400/20 to-blue-400/5"
    },
    {
        name: "Redux",
        img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
        level: "Intermediate",
        color: "shadow-purple-500/50",
        bg: "from-purple-500/20 to-purple-500/5"
    },
    {
        name: "Node.js",
        img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
        level: "Intermediate",
        color: "shadow-green-500/50",
        bg: "from-green-500/20 to-green-500/5"
    },
    {
        name: "MongoDB",
        img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
        level: "Intermediate",
        color: "shadow-green-400/50",
        bg: "from-green-400/20 to-green-400/5"
    },
    {
        name: "HTML5",
        img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
        level: "Expert",
        color: "shadow-orange-500/50",
        bg: "from-orange-500/20 to-orange-500/5"
    },
    {
        name: "CSS3",
        img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
        level: "Expert",
        color: "shadow-blue-600/50",
        bg: "from-blue-600/20 to-blue-600/5"
    },
    {
        name: "Bootstrap",
        img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
        level: "Advanced",
        color: "shadow-purple-400/50",
        bg: "from-purple-500/20 to-purple-500/5"
    },
    {
        name: "GitHub",
        img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
        level: "Advanced",
        color: "shadow-gray-400/50",
        bg: "from-gray-500/20 to-gray-500/5",
        invert: true
    },
    {
        name: "Figma",
        img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
        level: "Intermediate",
        color: "shadow-pink-500/50",
        bg: "from-pink-500/20 to-pink-500/5"
    },
    {
        name: "Tailwind",
        img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
        level: "Advanced",
        color: "shadow-cyan-500/50",
        bg: "from-cyan-500/20 to-cyan-500/5"
    },
    {
        name: "Postman",
        img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg",
        level: "Advanced",
        color: "shadow-orange-500/50",
        bg: "from-orange-500/20 to-orange-500/5"
    },
    {
        name: "REST API",
        img: "https://unpkg.com/simple-icons@v14/icons/swagger.svg",
        level: "Advanced",
        color: "shadow-green-500/50",
        bg: "from-green-500/20 to-green-500/5",
        invert: true
    },
    {
        name: "Netlify",
        img: "https://www.vectorlogo.zone/logos/netlify/netlify-icon.svg",
        level: "Advanced",
        color: "shadow-teal-400/50",
        bg: "from-teal-400/20 to-teal-400/5"
    },
    {
        name: "Vercel",
        img: "https://unpkg.com/simple-icons@v14/icons/vercel.svg",
        level: "Advanced",
        color: "shadow-white/50",
        bg: "from-gray-500/20 to-gray-500/5",
        invert: true
    },
    {
        name: "Render",
        img: "https://unpkg.com/simple-icons@v14/icons/render.svg",
        level: "Intermediate",
        color: "shadow-indigo-500/50",
        bg: "from-indigo-500/20 to-indigo-500/5",
        invert: true
    }
];

const Skills = () => {
    const itemsRef = useRef([]);
    const requestRef = useRef();
    const rotationRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
    const mouseRef = useRef({ x: 0, y: 0, lastX: 0, lastY: 0, dx: 0, dy: 0, isActive: false, isDragging: false });
    const [radius, setRadius] = useState(250);

    useEffect(() => {
        const updateRadius = () => {
            if (window.innerWidth < 480) setRadius(120);
            else if (window.innerWidth < 768) setRadius(160);
            else setRadius(250);
        };
        updateRadius();
        window.addEventListener('resize', updateRadius);
        return () => window.removeEventListener('resize', updateRadius);
    }, []);

    useEffect(() => {
        const basePoints = [];
        const phi = Math.PI * (3 - Math.sqrt(5));

        for (let i = 0; i < skillsData.length; i++) {
            const y = 1 - (i / (skillsData.length - 1)) * 2;
            const r = Math.sqrt(1 - y * y);
            const theta = phi * i;
            const x = Math.cos(theta) * r;
            const z = Math.sin(theta) * r;

            basePoints.push({
                x: x * radius,
                y: y * radius,
                z: z * radius
            });
        }

        const animate = () => {
            if (!itemsRef.current.length) {
                requestRef.current = requestAnimationFrame(animate);
                return;
            }

            if (mouseRef.current.isDragging) {
                const targetSpeedY = mouseRef.current.dx * 0.005;
                const targetSpeedX = -mouseRef.current.dy * 0.005;
                rotationRef.current.targetY += (targetSpeedY - rotationRef.current.targetY) * 0.2;
                rotationRef.current.targetX += (targetSpeedX - rotationRef.current.targetX) * 0.2;
                
                // Reset dx/dy after applying to prevent continuous acceleration if mouse stops but button is still down
                mouseRef.current.dx *= 0.8;
                mouseRef.current.dy *= 0.8;
            } else {
                // Apply friction/inertia
                rotationRef.current.targetY *= 0.95;
                rotationRef.current.targetX *= 0.95;
                
                // Add a very slight base rotation if speed is too low
                if (Math.abs(rotationRef.current.targetY) < 0.001) rotationRef.current.targetY += 0.001;
                if (Math.abs(rotationRef.current.targetX) < 0.001) rotationRef.current.targetX += 0.001;
            }

            rotationRef.current.y += rotationRef.current.targetY;
            rotationRef.current.x += rotationRef.current.targetX;

            const rx = rotationRef.current.x;
            const ry = rotationRef.current.y;

            const sinX = Math.sin(rx);
            const cosX = Math.cos(rx);
            const sinY = Math.sin(ry);
            const cosY = Math.cos(ry);

            basePoints.forEach((point, index) => {
                const item = itemsRef.current[index];
                if (!item) return;

                let x1 = point.x * cosY - point.z * sinY;
                let z1 = point.z * cosY + point.x * sinY;
                let y1 = point.y * cosX - z1 * sinX;
                let z2 = z1 * cosX + point.y * sinX;

                const perspective = 800;
                const scale = perspective / (perspective - z2);

                const opacity = Math.max(0.2, (z2 + radius) / (2 * radius));
                const zIndex = Math.floor(z2);

                item.style.transform = `translate3d(${x1}px, ${y1}px, 0) scale(${scale})`;
                item.style.zIndex = zIndex;
                item.style.opacity = opacity;
            });

            requestRef.current = requestAnimationFrame(animate);
        };

        requestRef.current = requestAnimationFrame(animate);

        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [radius]);

    const handleMouseDown = (e) => {
        mouseRef.current.isDragging = true;
        mouseRef.current.lastX = e.clientX;
        mouseRef.current.lastY = e.clientY;
    };

    const handleMouseMove = (e) => {
        if (mouseRef.current.isDragging) {
            mouseRef.current.dx = e.clientX - mouseRef.current.lastX;
            mouseRef.current.dy = e.clientY - mouseRef.current.lastY;
            mouseRef.current.lastX = e.clientX;
            mouseRef.current.lastY = e.clientY;
        }
        mouseRef.current.isActive = true;
    };

    const handleMouseUp = () => {
        mouseRef.current.isDragging = false;
    };

    const handleMouseLeave = () => {
        mouseRef.current.isDragging = false;
        mouseRef.current.isActive = false;
    };

    const handleTouchStart = (e) => {
        const touch = e.touches[0];
        mouseRef.current.isDragging = true;
        mouseRef.current.lastX = touch.clientX;
        mouseRef.current.lastY = touch.clientY;
        mouseRef.current.isActive = true;
    };

    const handleTouchMove = (e) => {
        if (mouseRef.current.isDragging) {
            const touch = e.touches[0];
            mouseRef.current.dx = touch.clientX - mouseRef.current.lastX;
            mouseRef.current.dy = touch.clientY - mouseRef.current.lastY;
            mouseRef.current.lastX = touch.clientX;
            mouseRef.current.lastY = touch.clientY;
        }
    };

    const handleTouchEnd = () => {
        mouseRef.current.isDragging = false;
        mouseRef.current.isActive = false;
    };

    return (
        <section
            id="skills"
            className="py-24 relative flex flex-col items-center justify-center min-h-screen overflow-hidden"
            style={{ backgroundColor: 'var(--bg-color)' }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchEnd}
        >
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[20%] right-[10%] w-64 h-64 md:w-96 md:h-96 bg-purple-900/10 rounded-full blur-[60px] md:blur-[100px] animate-pulse"></div>
                <div className="absolute bottom-[20%] left-[10%] w-64 h-64 md:w-96 md:h-96 bg-blue-900/10 rounded-full blur-[60px] md:blur-[100px] animate-pulse delay-[2000ms]"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight leading-tight font-[Outfit]" style={{ color: 'var(--text-primary)' }}>
                        My Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Skills</span>
                    </h2>
                    <div className="mx-auto h-1.5 w-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg shadow-purple-500/20"></div>
                </motion.div>

                {/* ── Desktop View (3D Sphere) ── */}
                <div className="hidden md:flex relative w-full max-w-[600px] h-[600px] items-center justify-center mt-8 touch-none">
                    {/* Dynamic Interactive Glow Sphere */}
                    <motion.div 
                        className="absolute inset-20 rounded-full blur-[100px] opacity-40 -z-10 transition-colors duration-1000 transform-gpu"
                        animate={{ 
                            backgroundColor: rotationRef.current.targetY > 0.01 ? 'rgba(59, 130, 246, 0.4)' : 'rgba(139, 92, 246, 0.4)',
                            scale: [1, 1.05, 1] 
                        }}
                        transition={{ 
                            backgroundColor: { duration: 1.5 },
                            scale: { duration: 6, repeat: Infinity, ease: "easeInOut" }
                        }}
                    ></motion.div>
                    
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl -z-10 animate-pulse-slow"></div>
                    {skillsData.map((skill, index) => (
                        <div
                            key={index}
                            ref={el => itemsRef.current[index] = el}
                            className="absolute top-1/2 left-1/2 flex flex-col items-center justify-center pointer-events-none transform-gpu"
                            style={{
                                transform: 'translate3d(0,0,0) scale(0)',
                                transition: 'background-color 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)'
                            }}
                        >
                            <div
                                className={`
                                    w-24 h-24 rounded-full 
                                    backdrop-blur-xl border
                                    flex items-center justify-center
                                    shadow-lg ${skill.color} transition-all duration-500 transform-gpu
                                `}
                                style={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', borderColor: 'rgba(56, 189, 248, 0.3)' }}
                            >
                                <img
                                    src={skill.img}
                                    alt={skill.name}
                                    className={`w-12 h-12 object-contain ${skill.invert ? 'invert-on-dark' : ''} group-hover:scale-110 transition-transform duration-500`}
                                />
                            </div>
                            <span
                                className="mt-2 text-xs font-semibold px-2 py-0.5 rounded-full backdrop-blur-sm transition-colors duration-300"
                                style={{ color: 'var(--text-primary)', backgroundColor: 'var(--card-bg)' }}
                            >
                                {skill.name}
                            </span>
                        </div>
                    ))}
                </div>

                {/* ── Mobile View (High-Level Premium Grid) ── */}
                <motion.div 
                    className="flex md:hidden grid grid-cols-2 sm:grid-cols-3 gap-6 w-full max-w-lg mt-4 px-2"
                    style={{ perspective: "1000px" }}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={{
                        hidden: { opacity: 0 },
                        show: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.12,
                                delayChildren: 0.2
                            }
                        }
                    }}
                >
                    {skillsData.map((skill, index) => (
                        <motion.div
                            key={index}
                            variants={{
                                hidden: { 
                                    opacity: 0, 
                                    rotateX: -45, 
                                    rotateY: 20, 
                                    y: 50,
                                    scale: 0.8
                                },
                                show: { 
                                    opacity: 1, 
                                    rotateX: 0, 
                                    rotateY: 0, 
                                    y: 0,
                                    scale: 1,
                                    transition: {
                                        type: "spring",
                                        damping: 15,
                                        stiffness: 100
                                    }
                                }
                            }}
                            whileTap={{ 
                                scale: 0.92,
                                rotateX: 10,
                                transition: { type: "spring", stiffness: 400, damping: 10 }
                            }}
                            className="relative group p-5 rounded-[2rem] border flex flex-col items-center justify-center gap-4 overflow-hidden"
                            style={{ 
                                backgroundColor: 'rgba(255, 255, 255, 0.02)', 
                                borderColor: 'rgba(255, 255, 255, 0.08)',
                                backdropFilter: 'blur(12px)',
                            }}
                        >
                            {/* Dynamic Ambient Glow */}
                            <div 
                                className={`absolute -inset-2 opacity-20 blur-2xl transition-opacity duration-500 group-hover:opacity-40 animate-pulse-slow ${skill.color.split(' ')[0].replace('shadow-', 'bg-')}`}
                                style={{ zIndex: -1 }}
                            ></div>

                            {/* Glass Shimmer Effect */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                                <div className="absolute inset-[-100%] bg-gradient-to-tr from-transparent via-white/10 to-transparent rotate-45 animate-shimmer"></div>
                            </div>

                            <div className={`
                                relative p-4 rounded-2xl 
                                bg-gradient-to-br from-white/10 to-transparent 
                                border border-white/20 shadow-2xl 
                                transition-all duration-300
                                ${skill.color}
                            `}>
                                <img
                                    src={skill.img}
                                    alt={skill.name}
                                    className={`w-12 h-12 object-contain ${skill.invert ? 'invert-on-dark' : ''}`}
                                />
                            </div>

                            <div className="flex flex-col items-center gap-1">
                                <span className="text-[13px] font-black tracking-widest uppercase opacity-90" style={{ color: 'var(--text-primary)' }}>
                                    {skill.name}
                                </span>
                                <div className="h-1 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-50"></div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
};

export default Skills;
