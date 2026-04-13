import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Youtube, FileText, Download, Zap } from 'lucide-react';
import DecryptText from './DecryptText';
import CodeProfile from './CodeProfile';
import Magnetic from './Magnetic';
import reactLogo from '../assets/react.svg';



const styles = {
    section: "relative flex flex-col justify-center min-h-screen px-4 pt-32 pb-12 overflow-hidden",
    glowBg: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-purple-900/20 rounded-full blur-[60px] md:blur-[120px] -z-10 pointer-events-none hidden md:block",
    imageContainer: "relative w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-[40px] p-[3px] bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 mx-auto lg:mx-0 shadow-[0_0_50px_rgba(168,85,247,0.3)]",
    title: "text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-tight font-[Outfit]",
    btnPrimary: "group relative px-8 py-4 w-full sm:w-auto min-w-[160px] rounded-full text-white font-bold text-lg overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] bg-gradient-to-r from-blue-600 to-purple-600",
    btnSecondary: "group relative px-8 py-4 w-full sm:w-auto min-w-[160px] rounded-full font-bold text-lg overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] backdrop-blur-md border"
};

const HeroNew = ({ theme = 'dark' }) => {

    const isDark = theme === 'dark';

    const contactBtnStyle = {
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        padding: '12px 24px',
        borderRadius: '999px',
        fontWeight: '700',
        fontSize: '0.95rem',
        minWidth: '170px',
        height: '52px',
        justifyContent: 'center',
        cursor: 'pointer',
        border: isDark ? 'none' : '2px solid rgba(139,92,246,0.5)',
        background: isDark
            ? 'linear-gradient(135deg, #06080d 0%, #0f1520 100%)'
            : 'linear-gradient(135deg, #f5f0ff 0%, #ede8ff 100%)',
        color: isDark ? '#a78bfa' : '#7c3aed',
        boxShadow: isDark
            ? '0 0 0 2px rgba(139,92,246,0.5), 0 0 20px rgba(139,92,246,0.15)'
            : '0 0 0 2px rgba(124,58,237,0.4), 0 4px 20px rgba(124,58,237,0.15)',
        transition: 'all 0.3s ease',
        letterSpacing: '0.5px',
        overflow: 'hidden',
    };

    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const toRotate = ["Full Stack Developer", "MERN Stack Enthusiast"];
    const period = 2000;

    useEffect(() => {
        let i = loopNum % toRotate.length;
        let fullText = toRotate[i];

        const handleTyping = () => {
            setText(prev => {
                if (isDeleting) {
                    return fullText.substring(0, prev.length - 1);
                } else {
                    return fullText.substring(0, prev.length + 1);
                }
            });
        };

        let speed = 200;

        if (isDeleting) {
            speed = 100;
        }

        if (!isDeleting && text === fullText) {
            speed = 2000;
        } else if (isDeleting && text === '') {
            speed = 1000;
        }

        const timer = setTimeout(() => {
            if (!isDeleting && text === fullText) {
                setIsDeleting(true);
            } else if (isDeleting && text === '') {
                setIsDeleting(false);
                setLoopNum(prev => prev + 1);
            } else {
                handleTyping();
            }
        }, speed);

        return () => clearTimeout(timer);
    }, [text, isDeleting, loopNum]);

    return (
        <section className={styles.section} style={{ backgroundColor: 'var(--bg-color)' }}>

            <div className={styles.glowBg}></div>

            <div className="flex flex-col-reverse lg:flex-row items-center justify-between w-full max-w-7xl mx-auto gap-12 z-10 pt-10">

                <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 w-full">
                    <div className="space-y-4">
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className={styles.title}
                            style={{ color: 'var(--text-primary)' }}
                        >
                            <span className="flex flex-row items-center lg:items-start justify-center lg:justify-start gap-1 md:gap-3 w-full md:w-auto flex-nowrap whitespace-nowrap overflow-visible">
                                <span className="text-xl min-[400px]:text-2xl sm:text-4xl md:text-7xl">Hi, I'm</span>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 animate-gradient inline-block w-full md:w-auto text-center md:text-left text-xl min-[400px]:text-2xl sm:text-5xl md:text-7xl">
                                    <DecryptText text="Abdul Haque" speed={70} />
                                </span>
                            </span>
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="min-h-[40px] md:min-h-[64px] flex items-center justify-center lg:justify-start"
                        >
                            <p className="text-lg sm:text-3xl md:text-5xl font-medium tracking-wide text-center lg:text-left flex-wrap">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-cyan-400 via-purple-400 to-pink-500">
                                    {text}
                                </span>
                                <span className="animate-pulse text-pink-500">|</span>
                            </p>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="flex flex-col sm:flex-row gap-6 mt-8 justify-center lg:justify-start items-center w-full"
                    >
                        <Magnetic>
                            <motion.button
                                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                                style={contactBtnStyle}
                                whileHover={{
                                    scale: 1.06,
                                    boxShadow: isDark 
                                        ? '0 0 0 2px rgba(139,92,246,0.95), 0 0 30px rgba(139,92,246,0.4), 0 0 80px rgba(59,130,246,0.25)'
                                        : '0 0 0 2px rgba(124,58,237,0.95), 0 0 30px rgba(124,58,237,0.4)',
                                    color: isDark ? '#fff' : '#7c3aed',
                                }}
                                whileTap={{ scale: 0.97 }}
                            >
                                <motion.span
                                    className="hidden md:block"
                                    style={{
                                        position: 'absolute', inset: 0,
                                        background: 'linear-gradient(105deg, transparent 40%, rgba(167,139,250,0.15) 50%, transparent 60%)',
                                        backgroundSize: '200% 100%',
                                    }}
                                    animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
                                    transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
                                />
                                <motion.span
                                    className="hidden md:block"
                                    style={{
                                        position: 'absolute', inset: '-2px', borderRadius: '999px',
                                        border: '2px solid rgba(139,92,246,0.4)',
                                    }}
                                    animate={{ opacity: [1, 0], scale: [1, 1.12] }}
                                    transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
                                />
                                <motion.span
                                    animate={{ y: [0, -3, 0] }}
                                    transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                                    style={{ display: 'flex', zIndex: 1 }}
                                >
                                    <Zap size={20} strokeWidth={2.5} fill="currentColor" />
                                </motion.span>
                                <span style={{ position: 'relative', zIndex: 1 }}>Contact Me</span>
                            </motion.button>
                        </Magnetic>


                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.85, x: 60 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ duration: 1.2, type: "spring", stiffness: 60, damping: 20, mass: 1 }}
                    className="relative mb-12 lg:mb-0 lg:mt-0 mt-8 group flex-1 flex justify-center lg:justify-end w-full transform-gpu"
                >
                    {/* Animated Background Blob */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 via-purple-600 to-emerald-500 rounded-full blur-[40px] opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>

                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 mx-auto lg:mx-0 z-10"
                    >
                        {/* Spinning Conic Border Rings */}
                        <div className="absolute inset-0 rounded-full animate-[spin_6s_linear_infinite]" style={{ background: 'conic-gradient(from 0deg, transparent 0 280deg, #3b82f6 360deg)' }}></div>
                        <div className="absolute inset-0 rounded-full animate-[spin_8s_linear_infinite_reverse]" style={{ background: 'conic-gradient(from 0deg, transparent 0 280deg, #8b5cf6 360deg)' }}></div>
                        
                        {/* Inner Content Mask */}
                        <div className="absolute inset-[4px] rounded-full overflow-hidden bg-[var(--bg-color)] p-2">
                            <div className="w-full h-full rounded-full overflow-hidden relative">
                                <img
                                    src="/profile_suit.jpg"
                                    alt="Abdul Haque"
                                    className="w-full h-full object-cover object-top hover:scale-110 transition-transform duration-700 ease-out"
                                />
                                {/* Subtle inner glow overlay */}
                                <div className="absolute inset-0 rounded-full border-[2px] border-white/20 mix-blend-overlay pointer-events-none"></div>
                                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

            </div>

            <CodeProfile />
        </section >
    );
};

export default HeroNew;
