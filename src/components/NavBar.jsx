import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Magnetic from './Magnetic';


const styles = {
    navFixed: "fixed top-0 left-0 w-full z-[999] transition-all duration-500",
    navScrolled: "backdrop-blur-md md:backdrop-blur-2xl border-b py-4 shadow-2xl",
    navTransparent: "bg-transparent py-6",
    logoWrapper: "relative group w-14 h-14 md:w-16 md:h-16 flex items-center justify-center shrink-0",
    navLink: "relative px-5 py-2.5 text-sm font-medium transition-all duration-300 rounded-full hover:bg-white/10 font-[Plus_Jakarta_Sans] tracking-wide group"
};

const NavBar = ({ theme, toggleTheme }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('about');

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);

            const sections = ['about', 'skills', 'projects', 'hackathons', 'certificates', 'education', 'contact'];
            const scrollPosition = window.scrollY + 200;

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const offsetTop = element.offsetTop;
                    const offsetBottom = offsetTop + element.offsetHeight;

                    if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id) => {
        setIsOpen(false);
        setActiveSection(id);
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav
            className={`${styles.navFixed} ${scrolled ? styles.navScrolled : styles.navTransparent}`}
            style={{
                backgroundColor: scrolled ? 'var(--card-bg)' : 'transparent',
                borderColor: 'var(--border-color)'
            }}
        >
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">

                <div
                    className="cursor-pointer z-50 shrink-0"
                    onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setIsOpen(false); }}
                >
                    <Magnetic strength={0.2}>
                        <div className={styles.logoWrapper}>
                            <motion.div
                                className="relative w-full h-full flex items-center justify-center rounded-2xl overflow-hidden group shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:shadow-[0_0_40px_rgba(168,85,247,0.8)] transition-all duration-300 cursor-pointer border border-white/10"
                                whileHover={{ scale: 1.1, rotateZ: 5, rotateX: 10 }}
                                whileTap={{ scale: 0.95 }}
                                style={{ perspective: "1000px" }}
                            >
                                <motion.div
                                    className="absolute hidden md:block w-[250%] h-[250%] bg-[conic-gradient(from_0deg,transparent_0_180deg,#8b5cf6_270deg,#3b82f6_360deg)] opacity-100"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                />

                                <div
                                    className={`absolute inset-[3px] rounded-[13px] flex items-center justify-center z-10 transition-colors duration-500 border-t border-b border-white/5 ${theme === 'light' ? 'bg-white group-hover:bg-slate-50' : 'bg-black/90 group-hover:bg-black'}`}
                                >
                                    <div className={`absolute inset-0 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${theme === 'light' ? 'bg-blue-400/20' : 'bg-blue-500/20'}`}></div>

                                    <div className="relative font-black text-3xl md:text-4xl flex items-center justify-center font-[Outfit] italic tracking-tighter" style={{ letterSpacing: '-3px' }}>
                                        <motion.span
                                            className={`drop-shadow-[0_2px_5px_rgba(255,255,255,0.7)] relative z-20 -mr-2 ${theme === 'light' ? 'text-slate-800' : 'text-white'}`}
                                            initial={{ y: 0 }}
                                            whileHover={{ y: -4, scale: 1.15, skewX: -10 }}
                                            transition={{ type: "spring", stiffness: 400 }}
                                        >
                                            A
                                        </motion.span>
                                        <motion.span
                                            className="text-transparent bg-clip-text bg-gradient-to-b from-blue-400 to-purple-600 drop-shadow-[0_2px_10px_rgba(168,85,247,0.8)] relative z-10"
                                            initial={{ y: 0 }}
                                            whileHover={{ y: 4, scale: 1.15, skewX: 10 }}
                                            transition={{ type: "spring", stiffness: 400 }}
                                        >
                                            H
                                        </motion.span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </Magnetic>
                </div>

                <div className="hidden lg:flex items-center p-1.5 rounded-full backdrop-blur-2xl border shadow-2xl shadow-blue-900/20 ring-1 ring-white/5"
                    style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}>

                    <div className="flex items-center px-1 gap-1 relative">
                        {['About', 'Skills', 'Projects', 'Hackathons', 'Certificates', 'Education', 'Contact'].map((item) => {
                            const sectionId = item.toLowerCase();
                            const isActive = activeSection === sectionId;
                            return (
                                <button
                                    key={item}
                                    onClick={() => scrollToSection(sectionId)}
                                    className="relative px-5 py-2.5 text-sm font-semibold transition-all duration-300 rounded-full font-[Plus_Jakarta_Sans] tracking-wide"
                                    style={{ color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)' }}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="active-nav-pill"
                                            className={`absolute inset-0 rounded-full z-0 ${theme === 'light' ? 'bg-blue-500/10 ring-1 ring-blue-500/30' : 'bg-blue-500/20 ring-1 ring-blue-500/50'}`}
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    <span className="relative z-10 hover:text-[var(--accent-primary)] transition-colors">{item}</span>
                                </button>
                            );
                        })}
                    </div>

                    <div className="h-6 w-px mx-3" style={{ backgroundColor: 'var(--border-color)' }}></div>

                    <div className="h-6 w-px mx-3" style={{ backgroundColor: 'var(--border-color)' }}></div>

                    <button
                        onClick={toggleTheme}
                        className="mr-3 p-2 rounded-full hover:bg-white/10 transition-colors relative group"
                        style={{ color: 'var(--text-secondary)' }}
                        aria-label="Toggle Theme"
                    >
                        <div className="relative w-5 h-5">
                            <Sun size={20} className={`absolute top-0 left-0 transition-all duration-500 ${theme === 'dark' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'}`} />
                            <Moon size={20} className={`absolute top-0 left-0 transition-all duration-500 ${theme === 'light' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-0'}`} />
                        </div>
                    </button>


                </div>

                <div className="lg:hidden flex items-center gap-4">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-xl transition-colors hover:bg-white/10"
                        style={{ color: 'var(--text-primary)' }}
                    >
                        {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
                    </button>

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="relative z-50 p-2 rounded-xl transition-colors hover:bg-white/10"
                        style={{ color: 'var(--text-primary)' }}
                    >
                        {isOpen ? <X size={26} /> : <Menu size={26} />}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: -20, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="absolute top-full left-0 w-full backdrop-blur-xl border-b shadow-2xl lg:hidden overflow-hidden"
                        style={{ backgroundColor: 'var(--bg-color)', borderColor: 'var(--border-color)' }}
                    >
                        <div className="p-6 flex flex-col gap-3">
                            {['About', 'Skills', 'Projects', 'Hackathons', 'Certificates', 'Education', 'Contact'].map((item, index) => {
                                const sectionId = item.toLowerCase();
                                const isActive = activeSection === sectionId;
                                return (
                                    <motion.button
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        key={item}
                                        onClick={() => scrollToSection(sectionId)}
                                        className="text-left py-4 px-6 rounded-2xl transition-all border font-[Outfit] text-xl font-bold flex items-center justify-between hover:bg-[var(--border-color)]"
                                        style={{
                                            backgroundColor: isActive ? (theme === 'light' ? 'rgba(59,130,246,0.05)' : 'rgba(59,130,246,0.1)') : 'transparent',
                                            borderColor: isActive ? 'rgba(59,130,246,0.3)' : 'transparent',
                                            color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)'
                                        }}
                                    >
                                        {item}
                                        {isActive && <motion.div layoutId="mobile-indicator" className="w-2 h-2 rounded-full bg-[var(--accent-primary)]" />}
                                    </motion.button>
                                );
                            })}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="mt-4"
                            >
                                <button
                                    className="px-8 py-3.5 rounded-full font-semibold relative overflow-hidden transition-all duration-500 ease-out active:scale-95 w-full text-center text-lg shadow-xl text-white"
                                    style={{
                                        background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                                        boxShadow: '0 4px 15px -3px rgba(59, 130, 246, 0.3)'
                                    }}
                                    onClick={() => scrollToSection('contact')}
                                >
                                    Let's Talk
                                </button>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default NavBar;
