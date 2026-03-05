import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionTemplate, useMotionValue } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, MeshDistortMaterial, PerspectiveCamera, Sparkles as ThreeSparkles, Text3D } from '@react-three/drei';
import { GraduationCap, School, BookOpen, Calendar, MapPin, Award, Sparkles, Zap, ArrowDown } from 'lucide-react';
import * as THREE from 'three';


const AnimatedBackground = () => {
    const lightRef = useRef();
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (lightRef.current) {
            lightRef.current.position.x = Math.sin(time * 0.5) * 10;
            lightRef.current.position.z = Math.cos(time * 0.5) * 10;
        }
    });

    return (
        <group>
            <PerspectiveCamera makeDefault position={[0, 0, 18]} />
            <ambientLight intensity={0.4} />
            <pointLight ref={lightRef} position={[10, 10, 10]} intensity={2} color="#4f46e5" distance={50} />
            <pointLight position={[-10, -10, -5]} intensity={1} color="#c084fc" />

            <Stars radius={150} depth={100} count={isMobile ? 1000 : 7000} factor={4} saturation={0} fade speed={0.5} />
            <ThreeSparkles count={isMobile ? 50 : 200} scale={20} size={3} speed={0.4} opacity={0.6} color="#60a5fa" />

            <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
                <mesh position={[-7, 4, -8]} scale={4}>
                    <sphereGeometry args={[1, isMobile ? 32 : 64, isMobile ? 32 : 64]} />
                    <MeshDistortMaterial
                        color="#2563eb"
                        emissive="#1d4ed8"
                        emissiveIntensity={0.2}
                        speed={4}
                        distort={0.6}
                        roughness={0.1}
                        metalness={0.9}
                    />
                </mesh>
            </Float>

            <Float speed={1.5} rotationIntensity={1} floatIntensity={1.5}>
                <mesh position={[7, -5, -10]} scale={5}>
                    <sphereGeometry args={[1, isMobile ? 32 : 64, isMobile ? 32 : 64]} />
                    <MeshDistortMaterial
                        color="#7c3aed"
                        emissive="#6d28d9"
                        emissiveIntensity={0.2}
                        speed={3.5}
                        distort={0.5}
                        roughness={0.1}
                        metalness={0.8}
                    />
                </mesh>
            </Float>

            <Float speed={1.8} rotationIntensity={1.2} floatIntensity={1.8}>
                <mesh position={[-5, -16, -12]} scale={4.5}>
                    <sphereGeometry args={[1, isMobile ? 32 : 64, isMobile ? 32 : 64]} />
                    <MeshDistortMaterial
                        color="#f59e0b"
                        emissive="#d97706"
                        emissiveIntensity={0.2}
                        speed={3}
                        distort={0.5}
                        roughness={0.1}
                        metalness={0.8}
                    />
                </mesh>
            </Float>
        </group>
    );
};

const TiltCard = ({ children, className }) => {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const xSpring = useSpring(x, { stiffness: 300, damping: 30 });
    const ySpring = useSpring(y, { stiffness: 300, damping: 30 });

    const rotateX = useTransform(ySpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(xSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className={className}
        >
            <div style={{ transform: "translateZ(50px)" }}>
                {children}
            </div>
        </motion.div>
    );
};


const Education = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const educationData = [
        {
            id: 1,
            degree: "Bachelor of Engineering",
            institution: "CodingGita x Swaminryan University",
            location: "Kalol, Gujarat",
            period: "2025 - Present",
            score: "CGPA: 9.00",
            icon: <GraduationCap size={32} />,
            color: "blue",
            themeHex: "#3b82f6",
            gradient: "from-blue-600 via-cyan-500 to-blue-700",
            details: "Specializing in System Architecture, Algorithm Design, and Full-Stack Development. Leading technical workshops and open-source contributions.",
            tags: ["Algorithms", "React", "Node.js"],
            current: true,
        },
        {
            id: 2,
            degree: "Intermediate (+2 Science)",
            institution: "+2 LBBS High School Palasi",
            location: "Araria, Bihar",
            period: "2023 - 2025",
            score: "85%",
            icon: <School size={28} />,
            color: "purple",
            themeHex: "#a855f7",
            gradient: "from-purple-600 via-fuchsia-500 to-purple-700",
            details: "Major in Physics, Chemistry, & Mathematics. Secured District Rank 1 in Science Exhibition. Active member of the coding club.",
            tags: ["Physics", "Maths", "Logic"],
            current: false,
        },
        {
            id: 3,
            degree: "Matriculation",
            institution: "+2 LBBS High School Palasi",
            location: "Araria, Bihar",
            period: "2022 - 2023",
            score: "73%",
            icon: <BookOpen size={28} />,
            color: "amber",
            themeHex: "#f59e0b",
            gradient: "from-amber-500 via-orange-500 to-red-500",
            details: "Foundation in Computer Science basics. Participated in multiple inter-school debate and quiz competitions.",
            tags: ["Science", "Maths", "English"],
            current: false,
        }
    ];

    return (
        <section id="education" ref={containerRef} className="py-24 relative overflow-hidden min-h-screen flex flex-col justify-center transition-colors duration-300" style={{ backgroundColor: 'var(--bg-color)' }}>

            <div className="absolute inset-0 z-0 h-full w-full">
                <Canvas dpr={[1, 2]}>
                    <AnimatedBackground />
                </Canvas>
            </div>

            <div
                className="absolute inset-0 z-0 pointer-events-none transition-colors duration-300"
                style={{
                    background: 'radial-gradient(circle at center, transparent 0%, var(--bg-color) 100%)'
                }}
            />

            <div className="container mx-auto px-6 relative z-10">

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center mb-32 text-center"
                >
                    <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-bold tracking-widest uppercase mb-8 backdrop-blur-md">
                        <Sparkles size={16} />
                        Academic Pathway
                    </div>

                    <h2 className="text-[3.5rem] leading-none sm:text-7xl md:text-9xl font-black tracking-tighter mb-6" style={{ color: 'var(--text-primary)' }}>
                        EDU<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">CATION</span>
                    </h2>

                    <p className="text-lg max-w-2xl leading-relaxed font-light" style={{ color: 'var(--text-secondary)' }}>
                        A chronological timeline of my academic milestones, showcasing consistent growth and technical excellence.
                    </p>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="mt-12 animate-bounce"
                        style={{ color: 'var(--text-secondary)' }}
                    >
                        <ArrowDown size={32} />
                    </motion.div>
                </motion.div>

                <div className="relative flex flex-col gap-32 max-w-6xl mx-auto">

                    <div className="absolute left-[20px] sm:left-[30px] md:left-1/2 top-0 bottom-0 w-[3px] bg-gradient-to-b from-transparent via-blue-500/50 to-transparent transform md:-translate-x-1/2 shadow-[0_0_15px_rgba(59,130,246,0.5)]" />

                    {educationData.map((item, index) => (
                        <div
                            key={item.id}
                            className={`flex flex-col md:${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center justify-center gap-8 md:gap-24 relative w-full`}
                        >
                            <div className="absolute left-[20px] sm:left-[30px] md:left-1/2 top-0 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 w-8 h-8 rounded-full border-2 border-blue-500/50 flex items-center justify-center z-10 shadow-[0_0_20px_rgba(59,130,246,0.5)] backdrop-blur-md" style={{ backgroundColor: 'var(--bg-color)' }}>
                                <div className={`w-3 h-3 rounded-full bg-${item.color}-500`} />
                            </div>

                            <div className={`w-full md:w-1/2 md:pl-0 md:pr-0 pl-12 sm:pl-16 pr-2 sm:pr-4 md:${index % 2 === 0 ? 'pr-12' : 'pl-12'}`}>
                                <TiltCard className="group relative w-full perspective-1000">
                                    <motion.div
                                        initial={{ opacity: 0, rotateX: 20, y: 50 }}
                                        whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                                        className="relative backdrop-blur-xl border p-8 md:p-10 rounded-3xl shadow-2xl hover:border-white/20 transition-all duration-300"
                                        style={{
                                            backgroundColor: 'var(--card-bg)',
                                            borderColor: 'var(--border-color)'
                                        }}
                                    >
                                        <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${item.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-500`} />

                                        <div className="flex justify-between items-start mb-6">
                                            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 flex items-center justify-center text-${item.color}-400 shadow-inner`}>
                                                {item.icon}
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <span className={`text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-gray-500/20 to-transparent select-none`}>
                                                    0{item.id}
                                                </span>
                                            </div>
                                        </div>

                                        <h3 className="text-2xl sm:text-3xl font-bold mb-2 leading-tight" style={{ color: 'var(--text-primary)' }}>
                                            {item.degree}
                                        </h3>
                                        <div className={`text-${item.color}-400 font-medium mb-6 flex items-center gap-2`}>
                                            <School size={16} />
                                            {item.institution}
                                        </div>

                                        <p className="leading-relaxed mb-6 text-sm md:text-base font-medium" style={{ color: 'var(--text-secondary)' }}>
                                            {item.details}
                                        </p>

                                        {item.tags && (
                                            <div className="flex flex-wrap gap-2 mb-6">
                                                {item.tags.map((tag, idx) => (
                                                    <span key={idx} className={`px-3 py-1 text-xs font-bold rounded-full bg-${item.color}-500/10 text-${item.color}-400 border border-${item.color}-500/30 shadow-[0_0_10px_rgba(0,0,0,0.2)] backdrop-blur-md`}>
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        <div className="grid grid-cols-2 gap-4 border-t pt-6" style={{ borderColor: 'var(--border-color)' }}>
                                            <div>
                                                <div className="text-xs uppercase tracking-widest mb-1" style={{ color: 'var(--text-secondary)' }}>Period</div>
                                                <div className="font-mono text-sm" style={{ color: 'var(--text-primary)' }}>{item.period}</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-xs uppercase tracking-widest mb-1" style={{ color: 'var(--text-secondary)' }}>Grade</div>
                                                <div className={`text-${item.color}-400 font-bold text-lg`}>{item.score}</div>
                                            </div>
                                        </div>

                                    </motion.div>
                                </TiltCard>
                            </div>

                            <div className="hidden md:flex flex-col w-1/2 items-center justify-center opacity-40">
                                {index % 2 === 0 ? (
                                    <div className="text-right w-full pr-12">
                                        <span className="text-sm font-mono text-blue-500/50 block mb-2">LOCATION</span>
                                        <div className="text-2xl font-light flex items-center justify-end gap-3" style={{ color: 'var(--text-primary)' }}>
                                            {item.location} <MapPin size={20} className="text-blue-500" />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-left w-full pl-12">
                                        <span className="text-sm font-mono text-purple-500/50 block mb-2">LOCATION</span>
                                        <div className="text-2xl font-light flex items-center gap-3" style={{ color: 'var(--text-primary)' }}>
                                            <MapPin size={20} className="text-purple-500" /> {item.location}
                                        </div>
                                    </div>
                                )}
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Education;
