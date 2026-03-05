import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ArrowUpRight, Code2 } from 'lucide-react';
import { SiCplusplus, SiReact, SiNodedotjs, SiMongodb, SiGithub, SiLinkedin, SiLeetcode, SiGmail } from 'react-icons/si';

const TiltCard = ({ children, className = "", variants }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    function handleMouseMove({ currentTarget, clientX, clientY }) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        const xPct = (clientX - left) / width - 0.5;
        const yPct = (clientY - top) / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    }

    const rotateX = useTransform(mouseY, [-0.5, 0.5], [9, -9]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-9, 9]);

    return (
        <motion.div
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
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            className={`perspective-1000 ${className}`}
        >
            <div style={{ transform: "translateZ(20px)" }} className="h-full">
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

    const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    return (
        <section id="about" ref={containerRef} className="py-24 relative overflow-hidden min-h-screen flex items-center perspective-container" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-primary)' }}>

            <div className="absolute top-0 right-0 w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full blur-[60px] md:blur-[120px] pointer-events-none opacity-20 animate-pulse" style={{ background: 'radial-gradient(circle, var(--accent-primary) 0%, transparent 70%)' }} />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full blur-[60px] md:blur-[120px] pointer-events-none opacity-20 animate-pulse delay-700" style={{ background: 'radial-gradient(circle, var(--accent-secondary) 0%, transparent 70%)' }} />

            <div className="max-w-4xl mx-auto text-center px-6">

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 flex flex-col items-center"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight font-[Outfit]" style={{ color: 'var(--text-primary)' }}>
                        About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Me</span>
                    </h2>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="h-1.5 w-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg shadow-purple-500/20"
                    />
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="space-y-8 text-lg md:text-xl leading-relaxed font-light"
                    style={{ color: 'var(--text-secondary)' }}
                >
                    <TiltCard
                        variants={itemVariants}
                        className="p-1 rounded-3xl relative overflow-hidden group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-20 group-hover:opacity-100 transition-opacity duration-500 animate-gradient-xy"></div>
                        <div className="absolute inset-[2px] rounded-[22px] bg-[var(--card-bg)] z-10 backdrop-blur-xl"></div>

                        <div className="relative z-20 p-8 flex flex-col items-center justify-center h-full">
                            <p className="text-lg md:text-xl font-light opacity-80 mb-2">I don't just write code.</p>
                            <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-text-shimmer bg-[200%_auto]">
                                I architect digital experiences that define the future.
                            </h3>
                        </div>
                    </TiltCard>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                        <TiltCard
                            variants={itemVariants}
                            className="p-6 rounded-2xl border backdrop-blur-sm group hover:border-blue-400/50 transition-colors duration-300"
                        >
                            <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                            <div style={{ backgroundColor: 'rgba(var(--bg-color), 0.5)' }} className="h-full rounded-xl p-4">
                                <SiCplusplus className="text-4xl mb-4 text-[#00599C] group-hover:animate-pulse" size={40} />
                                <h4 className="font-bold text-xl mb-2" style={{ color: 'var(--text-primary)' }}>The Logic Core</h4>
                                <p className="font-light text-sm md:text-base">
                                    My foundation is built on <span className="font-semibold text-[#00599C]">C/C++</span>. I approach development with a <span className="text-purple-400 font-semibold">computational mind</span>—optimizing algorithms, managing memory, and solving complex problems with precision logic.
                                </p>
                            </div>
                        </TiltCard>

                        <TiltCard
                            variants={itemVariants}
                            className="p-6 rounded-2xl border backdrop-blur-sm group hover:border-purple-400/50 transition-colors duration-300"
                        >
                            <div className="absolute inset-0 bg-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                            <div style={{ backgroundColor: 'rgba(var(--bg-color), 0.5)' }} className="h-full rounded-xl p-4">
                                <div className="flex gap-3 mb-4">
                                    <SiReact className="text-3xl text-[#61DAFB] group-hover:animate-spin-slow" />
                                    <SiNodedotjs className="text-3xl text-[#339933]" />
                                    <SiMongodb className="text-3xl text-[#47A248]" />
                                </div>
                                <h4 className="font-bold text-xl mb-2" style={{ color: 'var(--text-primary)' }}>Full Stack Architect</h4>
                                <p className="font-light text-sm md:text-base">
                                    Mastering the <span className="font-semibold text-white">MERN Stack</span> is just the beginning. I fuse <span className="text-[#FFA116] font-semibold">LeetCode</span> problem-solving skills with modern web tech to build scalable, high-performance applications that stand out.
                                </p>
                            </div>
                        </TiltCard>
                    </div>

                    <TiltCard
                        variants={itemVariants}
                        className="p-8 rounded-3xl border backdrop-blur-sm relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-[var(--card-bg)] opacity-90" />
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Code2 size={100} />
                        </div>
                        <p className="relative z-10 font-light text-lg">
                            From solving intricate <span className="font-semibold text-[#FFA116]">LeetCode</span> challenges to deploying production-grade systems, I bridge the gap between abstract logic and tangible user experiences. Every line of code I write is a step towards perfection.
                        </p>
                    </TiltCard>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
                    whileHover={{ scale: 1.05 }}
                    className="mt-16 inline-flex flex-col items-center gap-6 p-8 rounded-[2rem] border relative overflow-hidden group cursor-pointer"
                    style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="text-center relative z-10">
                        <h4 className="font-bold text-2xl mb-1" style={{ color: 'var(--text-primary)' }}>Let's Build Something Amazing</h4>
                        <p className="text-sm font-medium tracking-wide uppercase opacity-70" style={{ color: 'var(--text-secondary)' }}>Open for opportunities</p>
                    </div>
                    <div className="flex gap-6 relative z-10">
                        <a
                            href="https://github.com/abdulhaque2005"
                            target="_blank"
                            rel="noreferrer"
                            className="p-4 rounded-full border transition-all duration-300 hover:scale-125 hover:rotate-6 hover:text-white hover:bg-black"
                            style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                            title="GitHub"
                        >
                            <SiGithub size={24} />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/abdul-haque-a08150398"
                            target="_blank"
                            rel="noreferrer"
                            className="p-4 rounded-full border transition-all duration-300 hover:scale-125 hover:rotate-6 hover:text-white hover:bg-[#0077b5]"
                            style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                            title="LinkedIn"
                        >
                            <SiLinkedin size={24} />
                        </a>
                        <a
                            href="https://leetcode.com/u/pDjnXUuCp8/"
                            target="_blank"
                            rel="noreferrer"
                            className="p-4 rounded-full border transition-all duration-300 hover:scale-125 hover:rotate-6 hover:text-white hover:bg-[#FFA116]"
                            style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                            title="LeetCode Profile"
                        >
                            <SiLeetcode size={24} />
                        </a>
                        <a
                            href="mailto:abdulhaque4171@gmail.com"
                            target="_blank"
                            rel="noreferrer"
                            className="p-4 rounded-full border transition-all duration-300 hover:scale-125 hover:rotate-6 hover:text-white hover:bg-[#EA4335]"
                            style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                            title="Email"
                        >
                            <SiGmail size={24} />
                        </a>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default About;
