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
    const mouseXPos = useMotionValue(0);
    const mouseYPos = useMotionValue(0);

    const xSpring = useSpring(x, { stiffness: 150, damping: 20 });
    const ySpring = useSpring(y, { stiffness: 150, damping: 20 });

    const rotateX = useTransform(ySpring, [-0.5, 0.5], ["12deg", "-12deg"]);
    const rotateY = useTransform(xSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

    // For Glint effect
    const glintX = useSpring(mouseXPos, { stiffness: 300, damping: 30 });
    const glintY = useSpring(mouseYPos, { stiffness: 300, damping: 30 });

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
        mouseXPos.set(mouseX);
        mouseYPos.set(mouseY);
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
                perspective: 1000
            }}
            className={`${className} group cursor-pointer transform-gpu`}
        >
            <div style={{ transform: "translateZ(50px)" }} className="relative h-full">
                {/* Dynamic Glint Shimmer */}
                <motion.div
                    className="absolute inset-0 z-30 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[inherit]"
                    style={{
                        background: useTransform(
                            [glintX, glintY],
                            ([latestX, latestY]) =>
                                `radial-gradient(circle at ${latestX}px ${latestY}px, rgba(255,255,255,0.1) 0%, transparent 60%)`
                        )
                    }}
                />
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

            <div className="absolute inset-0 z-0 h-full w-full hidden md:block">
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
                            {/* Animated Timeline Point */}
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                viewport={{ once: true, margin: "-100px" }}
                                className="absolute left-[20px] sm:left-[30px] md:left-1/2 top-0 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 z-20"
                            >
                                <div className="relative">
                                    <div className={`w-10 h-10 rounded-full border-2 border-${item.color}-500/50 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.4)] backdrop-blur-md`} style={{ backgroundColor: 'var(--bg-color)' }}>
                                        <div 
                                            className={`w-3.5 h-3.5 rounded-full bg-${item.color}-500`} 
                                            style={{ boxShadow: `0 0 15px ${item.themeHex}` }}
                                        />
                                    </div>
                                    {/* Pulsing Outer Glow */}
                                    <div className={`absolute -inset-2 rounded-full bg-${item.color}-500/20 blur-md animate-ping`} />
                                </div>
                            </motion.div>

                            <div className={`w-full md:w-1/2 md:pl-0 md:pr-0 pl-12 sm:pl-16 pr-2 sm:pr-4 md:${index % 2 === 0 ? 'pr-12' : 'pl-12'}`}>
                                <TiltCard className="group relative w-full perspective-1000">
                                    <motion.div
                                        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50, rotateY: index % 2 === 0 ? 15 : -15 }}
                                        whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        transition={{ duration: 1, type: "spring", stiffness: 60, damping: 20 }}
                                        className="relative backdrop-blur-xl border p-8 md:p-10 rounded-[2rem] shadow-2xl transition-all duration-500 hover:border-blue-500/30 overflow-hidden transform-gpu"
                                        style={{
                                            backgroundColor: 'var(--card-bg)',
                                            borderColor: 'var(--border-color)'
                                        }}
                                    >
                                        <div className={`absolute inset-0 rounded-[2rem] bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-[0.08] transition-opacity duration-700`} />

                                        {/* Premium Badge for 'Current' status */}
                                        {item.current && (
                                            <div className="absolute top-6 right-8">
                                                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-[10px] font-black uppercase tracking-widest text-blue-400 animate-pulse">
                                                    <Zap size={10} fill="currentColor" /> Ongoing
                                                </span>
                                            </div>
                                        )}

                                        <div className="flex justify-between items-start mb-8">
                                            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br border flex items-center justify-center text-${item.color}-400 shadow-2xl relative overflow-hidden group-hover:scale-110 transition-transform duration-500`} style={{ borderColor: 'var(--subtle-border)', background: 'var(--subtle-bg)' }}>
                                                <div className={`absolute inset-0 bg-${item.color}-500/10 blur-xl`} />
                                                <div className="relative z-10">{item.icon}</div>
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <span className={`text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-gray-500/15 to-transparent select-none leading-none`}>
                                                    0{item.id}
                                                </span>
                                            </div>
                                        </div>

                                        <h3 className="text-2xl sm:text-[2rem] font-bold mb-3 tracking-tight leading-tight group-hover:text-blue-400 transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>
                                            {item.degree}
                                        </h3>
                                        <div className={`text-${item.color}-400/80 font-semibold mb-6 flex items-center gap-2.5 text-sm md:text-base`}>
                                            <div className={`w-2 h-2 rounded-full bg-${item.color}-500`} />
                                            {item.institution}
                                        </div>

                                        <p className="leading-relaxed mb-8 text-sm md:text-[15px] font-medium opacity-80" style={{ color: 'var(--text-secondary)' }}>
                                            {item.details}
                                        </p>

                                        {item.tags && (
                                            <div className="flex flex-wrap gap-2.5 mb-8">
                                                {item.tags.map((tag, idx) => (
                                                    <span key={idx} className={`px-3.5 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-lg border hover:text-blue-400 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all duration-300`} style={{ backgroundColor: 'var(--subtle-bg)', borderColor: 'var(--subtle-border)', color: 'var(--text-secondary)' }}>
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        <div className="grid grid-cols-2 gap-6 border-t pt-8" style={{ borderColor: 'var(--border-color)' }}>
                                            <div>
                                                <div className="text-[10px] uppercase font-black tracking-[0.2em] mb-2 opacity-50" style={{ color: 'var(--text-secondary)' }}>Academic Period</div>
                                                <div className="font-mono text-sm font-bold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                                                    <Calendar size={14} className="text-blue-500/50" /> {item.period}
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-[10px] uppercase font-black tracking-[0.2em] mb-2 opacity-50" style={{ color: 'var(--text-secondary)' }}>Performance</div>
                                                <div className={`text-${item.color}-400 font-black text-xl flex items-center justify-end gap-2`}>
                                                    <Award size={18} /> {item.score}
                                                </div>
                                            </div>
                                        </div>

                                    </motion.div>
                                </TiltCard>
                            </div>

                            <div className="hidden md:flex flex-col w-1/2 items-center justify-center pointer-events-none">
                                <motion.div
                                    initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                                    whileInView={{ opacity: 0.6, x: 0 }}
                                    viewport={{ once: true }}
                                    className={`w-full ${index % 2 === 0 ? 'pl-24' : 'pr-24 text-right'}`}
                                >
                                    <span className={`text-[11px] font-black tracking-[0.3em] text-${item.color}-500/60 block mb-3 uppercase`}>Institutional Hub</span>
                                    <div className="text-2xl font-light py-4 px-6 rounded-2xl border inline-flex items-center gap-4 backdrop-blur-sm" style={{ color: 'var(--text-primary)', borderColor: 'var(--subtle-border)', backgroundColor: 'var(--subtle-bg)' }}>
                                        {index % 2 === 0 ? (
                                            <>
                                                <div className={`w-10 h-10 rounded-xl bg-${item.color}-500/10 flex items-center justify-center text-${item.color}-400`}><MapPin size={22} /></div>
                                                {item.location}
                                            </>
                                        ) : (
                                            <>
                                                {item.location}
                                                <div className={`w-10 h-10 rounded-xl bg-${item.color}-500/10 flex items-center justify-center text-${item.color}-400`}><MapPin size={22} /></div>
                                            </>
                                        )}
                                    </div>
                                </motion.div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Education;
