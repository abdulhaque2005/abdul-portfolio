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
    const mouseRef = useRef({ x: 0, y: 0, isActive: false });
    const [radius, setRadius] = useState(250);

    useEffect(() => {
        const updateRadius = () => {
            setRadius(window.innerWidth < 768 ? 160 : 250);
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

            if (mouseRef.current.isActive) {
                const targetSpeedY = mouseRef.current.x * 0.03;
                const targetSpeedX = -mouseRef.current.y * 0.03;
                rotationRef.current.targetY += (targetSpeedY - rotationRef.current.targetY) * 0.05;
                rotationRef.current.targetX += (targetSpeedX - rotationRef.current.targetX) * 0.05;
            } else {
                rotationRef.current.targetY += (0.002 - rotationRef.current.targetY) * 0.02;
                rotationRef.current.targetX += (0.002 - rotationRef.current.targetX) * 0.02;
            }

            rotationRef.current.x += rotationRef.current.targetX;
            rotationRef.current.y += rotationRef.current.targetY;

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

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
        mouseRef.current = { x, y, isActive: true };
    };

    const handleMouseLeave = () => {
        mouseRef.current = { x: 0, y: 0, isActive: false };
    };

    const handleTouchStart = (e) => {
        const touch = e.touches[0];
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
        const y = ((touch.clientY - rect.top) / rect.height) * 2 - 1;
        mouseRef.current = { x, y, isActive: true };
    };

    const handleTouchMove = (e) => {
        const touch = e.touches[0];
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
        const y = ((touch.clientY - rect.top) / rect.height) * 2 - 1;
        mouseRef.current = { x, y, isActive: true };
    };

    const handleTouchEnd = () => {
        mouseRef.current = { ...mouseRef.current, isActive: false };
    };

    return (
        <section
            id="skills"
            className="section-padding relative flex flex-col items-center justify-center min-h-[400px] sm:min-h-[800px] overflow-hidden"
            style={{ backgroundColor: 'var(--bg-color)' }}
            onMouseMove={handleMouseMove}
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

            <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
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

                <div className="relative w-full max-w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] md:max-w-none md:w-[600px] md:h-[600px] flex items-center justify-center mt-8 touch-none">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl -z-10 animate-pulse-slow"></div>
                    {skillsData.map((skill, index) => (
                        <div
                            key={index}
                            ref={el => itemsRef.current[index] = el}
                            className="absolute top-1/2 left-1/2 flex flex-col items-center justify-center pointer-events-none"
                            style={{
                                transform: 'translate3d(0,0,0) scale(0)',
                                transition: 'background-color 0.3s'
                            }}
                        >
                            <div
                                className={`
                                    w-12 h-12 md:w-20 md:h-20 rounded-full 
                                    backdrop-blur-xl border
                                    flex items-center justify-center
                                    shadow-lg ${skill.color} transition-colors duration-300
                                `}
                                style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}
                            >
                                <img
                                    src={skill.img}
                                    alt={skill.name}
                                    className={`w-6 h-6 md:w-10 md:h-10 object-contain ${skill.invert ? 'invert-on-dark' : ''}`}
                                />
                            </div>
                            <span
                                className="mt-2 text-[10px] md:text-xs font-semibold px-2 py-0.5 rounded-full backdrop-blur-sm transition-colors duration-300"
                                style={{ color: 'var(--text-primary)', backgroundColor: 'var(--card-bg)' }}
                            >
                                {skill.name}
                            </span>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Skills;
