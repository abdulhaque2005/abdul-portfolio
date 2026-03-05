import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Youtube, FileText, Download, Zap } from 'lucide-react';
import DecryptText from './DecryptText';
import CodeProfile from './CodeProfile';
import Magnetic from './Magnetic';
import reactLogo from '../assets/react.svg';



const styles = {
    section: "relative flex flex-col justify-center min-h-screen px-4 pt-32 pb-12 overflow-hidden",
    glowBg: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-purple-900/20 rounded-full blur-[60px] md:blur-[120px] -z-10 pointer-events-none",
    imageContainer: "relative w-64 h-64 md:w-80 md:h-80 rounded-[40px] p-[3px] bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 mx-auto lg:mx-0 shadow-[0_0_50px_rgba(168,85,247,0.3)]",
    title: "text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-tight font-[Outfit]",
    btnPrimary: "group relative px-8 py-4 w-full sm:w-auto min-w-[160px] rounded-full text-white font-bold text-lg overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] bg-gradient-to-r from-blue-600 to-purple-600",
    btnSecondary: "group relative px-8 py-4 w-full sm:w-auto min-w-[160px] rounded-full font-bold text-lg overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] backdrop-blur-md border"
};

const HeroNew = ({ theme = 'dark' }) => {

    const downloadResume = () => {
        const link = document.createElement('a');
        link.href = '/resume.pdf';
        link.download = 'Abdul_Haque_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const isDark = theme === 'dark';

    const resumeBtnStyle = {
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        padding: '14px 30px',
        borderRadius: '999px',
        fontWeight: '700',
        fontSize: '1rem',
        cursor: 'pointer',
        border: isDark ? 'none' : '2px solid rgba(0,255,204,0.7)',
        background: isDark
            ? 'linear-gradient(135deg, #06080d 0%, #0f1520 100%)'
            : 'linear-gradient(135deg, #f0fffe 0%, #e0fbf7 100%)',
        color: '#00bb99',
        boxShadow: isDark
            ? '0 0 0 2px rgba(0,255,204,0.5), 0 0 20px rgba(0,255,204,0.15)'
            : '0 0 0 2px rgba(0,187,153,0.4), 0 4px 20px rgba(0,187,153,0.15)',
        transition: 'all 0.3s ease',
        letterSpacing: '0.5px',
        overflow: 'hidden',
    };

    const contactBtnStyle = {
        isDarkBg: isDark
            ? 'linear-gradient(135deg, #06080d 0%, #0f1520 100%)'
            : 'linear-gradient(135deg, #f5f0ff 0%, #ede8ff 100%)',
        isDarkColor: isDark ? '#a78bfa' : '#7c3aed',
        isDarkShadow: isDark
            ? '0 0 0 2px rgba(139,92,246,0.5), 0 0 20px rgba(139,92,246,0.15)'
            : '0 0 0 2px rgba(124,58,237,0.4), 0 4px 20px rgba(124,58,237,0.15)',
        isDarkBorder: isDark ? 'none' : '2px solid rgba(124,58,237,0.5)',
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
                            <span className="flex flex-col md:flex-row items-center lg:items-start justify-center lg:justify-start gap-1 md:gap-3 whitespace-nowrap w-full md:w-auto md:min-w-[320px]">
                                <span>Hi, I'm</span>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 animate-gradient inline-block w-full md:w-auto md:min-w-[300px] text-center md:text-left text-4xl sm:text-5xl md:text-7xl">
                                    <DecryptText text="Abdul Haque" speed={70} />
                                </span>
                            </span>
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="h-10 md:h-16 overflow-hidden"
                        >
                            <p className="text-2xl sm:text-3xl md:text-5xl font-medium tracking-wide text-center lg:text-left">
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
                                style={{
                                    position: 'relative',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    padding: '14px 30px',
                                    borderRadius: '999px',
                                    cursor: 'pointer',
                                    border: contactBtnStyle.isDarkBorder,
                                    background: contactBtnStyle.isDarkBg,
                                    color: contactBtnStyle.isDarkColor,
                                    boxShadow: contactBtnStyle.isDarkShadow,
                                    fontWeight: '700',
                                    fontSize: '1rem',
                                    letterSpacing: '0.5px',
                                    overflow: 'hidden',
                                }}
                                whileHover={{
                                    scale: 1.06,
                                    boxShadow: '0 0 0 2px rgba(139,92,246,0.95), 0 0 30px rgba(139,92,246,0.4), 0 0 80px rgba(59,130,246,0.25)',
                                    color: '#fff',
                                }}
                                whileTap={{ scale: 0.97 }}
                            >
                                <motion.span
                                    style={{
                                        position: 'absolute', inset: 0,
                                        background: 'linear-gradient(105deg, transparent 40%, rgba(167,139,250,0.15) 50%, transparent 60%)',
                                        backgroundSize: '200% 100%',
                                    }}
                                    animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
                                    transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
                                />
                                <motion.span
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

                        <Magnetic>
                            <motion.button
                                onClick={downloadResume}
                                style={resumeBtnStyle}
                                whileHover={{
                                    scale: 1.06,
                                    boxShadow: '0 0 0 2px rgba(0,255,204,0.9), 0 0 30px rgba(0,255,204,0.35), 0 0 80px rgba(168,85,247,0.25)',
                                    color: '#fff',
                                }}
                                whileTap={{ scale: 0.97 }}
                            >
                                <motion.span
                                    style={{
                                        position: 'absolute',
                                        inset: 0,
                                        background: 'linear-gradient(105deg, transparent 40%, rgba(0,255,204,0.15) 50%, transparent 60%)',
                                        backgroundSize: '200% 100%',
                                    }}
                                    animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
                                    transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
                                />
                                <motion.span
                                    style={{
                                        position: 'absolute',
                                        inset: '-2px',
                                        borderRadius: '999px',
                                        border: '2px solid rgba(0,255,204,0.4)',
                                    }}
                                    animate={{ opacity: [1, 0], scale: [1, 1.12] }}
                                    transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
                                />
                                <motion.span
                                    animate={{ y: [0, 3, 0] }}
                                    transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                                    style={{ display: 'flex', zIndex: 1 }}
                                >
                                    <Download size={20} strokeWidth={2.5} />
                                </motion.span>
                                <span style={{ position: 'relative', zIndex: 1 }}>Download Resume</span>
                            </motion.button>
                        </Magnetic>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.5, x: 50 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
                    className="relative mb-12 lg:mb-0 group flex-1 flex justify-center lg:justify-end w-full"
                >
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-[40px] blur-[40px] opacity-30 group-hover:opacity-60 transition-opacity duration-500"></div>

                    <motion.div
                        animate={{ y: [0, -20, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        className={styles.imageContainer}
                    >
                        <div className="w-full h-full rounded-[38px] overflow-hidden relative" style={{ backgroundColor: 'var(--card-bg)' }}>
                            <img
                                src="/profile_suit.jpg"
                                alt="Abdul Haque"
                                className="w-full h-full object-cover object-top hover:scale-110 transition-transform duration-700 ease-out"
                            />
                        </div>
                    </motion.div>
                </motion.div>

            </div>

            <CodeProfile />
        </section >
    );
};

export default HeroNew;
