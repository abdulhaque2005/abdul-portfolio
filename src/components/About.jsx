import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ArrowUpRight, Code2 } from 'lucide-react';
import { SiCplusplus, SiReact, SiNodedotjs, SiMongodb, SiGithub, SiLinkedin, SiLeetcode, SiGmail } from 'react-icons/si';

const TiltCard = ({ children, className = "", variants }) => {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseXPos = useMotionValue(0);
    const mouseYPos = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);

    // For Glint effect
    const glintX = useSpring(mouseXPos, { stiffness: 300, damping: 30 });
    const glintY = useSpring(mouseYPos, { stiffness: 300, damping: 30 });

    function handleMouseMove(e) {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXVal = e.clientX - rect.left;
        const mouseYVal = e.clientY - rect.top;
        const xPct = mouseXVal / width - 0.5;
        const yPct = mouseYVal / height - 0.5;
        x.set(xPct);
        y.set(yPct);
        mouseXPos.set(mouseXVal);
        mouseYPos.set(mouseYVal);
    }

    return (
        <motion.div
            ref={ref}
            variants={variants}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => {
                x.set(0);
                y.set(0);
            }}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
                perspective: 1000
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            className={`relative group transform-gpu ${className}`}
        >
            <div style={{ transform: "translateZ(30px)" }} className="h-full relative overflow-hidden">
                {/* Dynamic Glint Shimmer */}
                <motion.div 
                    className="absolute inset-0 z-30 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[inherit]"
                    style={{
                        background: useTransform(
                            [glintX, glintY],
                            ([latestX, latestY]) => 
                                `radial-gradient(circle at ${latestX}px ${latestY}px, rgba(255,255,255,0.08) 0%, transparent 60%)`
                        )
                    }}
                />
                {children}
            </div>
        </motion.div>
    );
};

const About = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.8, type: "spring", stiffness: 100, damping: 15 }
        }
    };

    return (
        <section id="about" ref={containerRef} className="py-24 relative overflow-hidden min-h-screen flex items-center perspective-container" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-primary)' }}>

            {/* Floating Background Geometry */}
            <motion.div 
                style={{ y, rotate }}
                className="absolute top-1/4 -right-20 w-80 h-80 rounded-[3rem] border-2 border-blue-500/10 rotate-12 -z-10 blur-[1px]"
            />
            <motion.div 
                style={{ y: useTransform(scrollYProgress, [0, 1], [-100, 100]), rotate: useTransform(scrollYProgress, [0, 1], [0, -45]) }}
                className="absolute bottom-1/4 -left-20 w-64 h-64 rounded-full border-2 border-purple-500/10 -z-10 blur-[2px]"
            />

            <div className="absolute top-0 right-0 w-[400px] h-[400px] md:w-[800px] md:h-[800px] rounded-full blur-[80px] md:blur-[150px] pointer-events-none opacity-15 animate-pulse-slow" style={{ background: 'radial-gradient(circle, var(--accent-primary) 0%, transparent 75%)' }} />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] md:w-[800px] md:h-[800px] rounded-full blur-[80px] md:blur-[150px] pointer-events-none opacity-15 animate-pulse-slow delay-1000" style={{ background: 'radial-gradient(circle, var(--accent-secondary) 0%, transparent 75%)' }} />

            <div className="w-full max-w-5xl mx-auto text-center px-4 sm:px-8">

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-20 flex flex-col items-center"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black tracking-[0.3em] uppercase mb-8 backdrop-blur-md">
                        <Code2 size={14} /> Introduction
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter font-[Outfit]" style={{ color: 'var(--text-primary)' }}>
                        ABOUT <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">ME</span>
                    </h2>
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: 120 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="h-1.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                    />
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="space-y-10"
                >
                    <TiltCard
                        variants={itemVariants}
                        className="rounded-[2.5rem] relative overflow-hidden group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl"></div>
                        <div className="absolute inset-0 rounded-[2.5rem] border border-white/10 group-hover:border-white/20 transition-colors duration-500 z-10 backdrop-blur-3xl" style={{ backgroundColor: 'rgba(15, 23, 42, 0.5)' }}></div>

                        <div className="relative z-20 p-10 md:p-14 flex flex-col items-center justify-center">
                            <p className="text-xs md:text-sm font-black tracking-[0.4em] uppercase opacity-40 mb-4 text-blue-400">Philosophy</p>
                            <h3 className="text-2xl md:text-[2.75rem] font-bold tracking-tight leading-[1.1] text-center max-w-3xl mx-auto" style={{ color: 'var(--text-primary)' }}>
                                I don’t just build apps. I architect <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">immersive digital worlds</span> that define the future.
                            </h3>
                        </div>
                    </TiltCard>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <TiltCard
                            variants={itemVariants}
                            className="rounded-3xl border border-white/5 backdrop-blur-2xl group transition-all duration-500 overflow-hidden"
                            style={{ backgroundColor: 'rgba(15, 23, 42, 0.4)' }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="p-8 md:p-10 text-left relative z-10">
                                <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-8 border border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                                    <SiCplusplus size={32} className="group-hover:scale-110 transition-transform duration-500" />
                                </div>
                                <h4 className="font-black text-2xl mb-4 tracking-tight" style={{ color: 'var(--text-primary)' }}>The Logic Core</h4>
                                <p className="font-medium text-[15px] leading-relaxed opacity-70" style={{ color: 'var(--text-secondary)' }}>
                                    My foundation is built on <span className="font-bold text-blue-400">C/C++</span>. I approach development with a computational mind—optimizing algorithms and solving complex problems with high-precision logic.
                                </p>
                            </div>
                        </TiltCard>

                        <TiltCard
                            variants={itemVariants}
                            className="rounded-3xl border border-white/5 backdrop-blur-2xl group transition-all duration-500 overflow-hidden"
                            style={{ backgroundColor: 'rgba(15, 23, 42, 0.4)' }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="p-8 md:p-10 text-left relative z-10">
                                <div className="flex gap-4 mb-8">
                                    <div className="w-14 h-14 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 border border-purple-500/20 shadow-[0_0_20px_rgba(168,85,247,0.2)]">
                                        <SiReact size={28} className="group-hover:rotate-[30deg] transition-transform duration-500" />
                                    </div>
                                    <div className="w-14 h-14 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                                        <SiNodedotjs size={28} />
                                    </div>
                                </div>
                                <h4 className="font-black text-2xl mb-4 tracking-tight" style={{ color: 'var(--text-primary)' }}>Full Stack Architect</h4>
                                <p className="font-medium text-[15px] leading-relaxed opacity-70" style={{ color: 'var(--text-secondary)' }}>
                                    Mastering the <span className="font-bold text-purple-400">MERN Stack</span> is only the start. I combine competitive programming intuition with modern tech to build scalable, high-performance systems.
                                </p>
                            </div>
                        </TiltCard>
                    </div>

                    <TiltCard
                        variants={itemVariants}
                        className="rounded-3xl border border-white/5 backdrop-blur-2xl group relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-[0.03] rotate-12 pointer-events-none">
                            <Code2 size={120} />
                        </div>
                        <div className="p-10 md:p-12 relative z-10 text-center">
                            <p className="font-medium text-[17px] leading-loose max-w-4xl mx-auto italic opacity-80" style={{ color: 'var(--text-secondary)' }}>
                                "From solving intricate <span className="font-bold text-[#FFA116] not-italic">LeetCode</span> challenges to deploying production-grade systems, I bridge the gap between abstract logic and tangible user experiences. Every line of code I write is a conscious step towards digital perfection."
                            </p>
                        </div>
                    </TiltCard>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8, type: "spring", stiffness: 100 }}
                    className="mt-24 space-y-10 flex flex-col items-center"
                >
                    <div className="text-center">
                        <h4 className="font-black text-3xl md:text-4xl mb-3 tracking-tighter" style={{ color: 'var(--text-primary)' }}>Ready to collaborate?</h4>
                        <p className="text-xs md:text-sm font-black tracking-[0.3em] uppercase opacity-40 text-blue-400">Open for new opportunities</p>
                    </div>
                    
                    <div className="flex flex-wrap gap-6 justify-center">
                        {[
                            { icon: SiGithub, color: "#fff", link: "https://github.com/abdulhaque2005", label: "GitHub" },
                            { icon: SiLinkedin, color: "#0077b5", link: "https://www.linkedin.com/in/abdul-haque-a08150398", label: "LinkedIn" },
                            { icon: SiLeetcode, color: "#FFA116", link: "https://leetcode.com/u/pDjnXUuCp8/", label: "LeetCode" },
                            { icon: SiGmail, color: "#EA4335", link: "mailto:abdulhaque4171@gmail.com", label: "Gmail" }
                        ].map((social, i) => (
                            <motion.a
                                key={i}
                                href={social.link}
                                target="_blank"
                                rel="noreferrer"
                                whileHover={{ y: -8, scale: 1.15, rotate: 8 }}
                                whileTap={{ scale: 0.95 }}
                                className="p-5 rounded-3xl border border-white/5 bg-white/[0.03] backdrop-blur-md transition-all duration-300 hover:border-white/20 shadow-xl group/btn"
                                style={{ color: social.color }}
                                title={social.label}
                            >
                                <social.icon size={28} className="group-hover/btn:drop-shadow-[0_0_10px_currentColor]" />
                            </motion.a>
                        ))}
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default About;
