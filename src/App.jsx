import React, { Suspense, useState, useEffect, lazy } from 'react';
import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import { Github, Linkedin, Mail, Youtube } from 'lucide-react';
import { AnimatePresence, motion, useScroll } from 'framer-motion';



const Stars = lazy(() => import('./components/canvas/Stars'));
import NavBar from './components/NavBar';
import HeroNew from './components/HeroNew';
import About from './components/About';
import Education from './components/Education';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import Magnetic from './components/Magnetic';
import ChatBot from './components/ChatBot';
import './App.css';

function App() {
    const [loading, setLoading] = useState(true);
    const [theme, setTheme] = useState('dark');
    const { scrollYProgress } = useScroll();

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="app-wrapper bg-theme text-theme-primary font-sans min-h-screen transition-colors duration-300" data-theme={theme}>
            <CustomCursor />
            <ChatBot theme={theme} />
            <AnimatePresence>
                {loading && <Preloader />}
            </AnimatePresence>

            <motion.div
                className="fixed top-0 left-0 right-0 h-1 z-[1000] origin-left bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 will-change-transform"
                style={{ scaleX: scrollYProgress }}
            />

            <div className="fixed inset-0 z-0 pointer-events-none">
                {!loading && (
                    <Canvas camera={{ position: [0, 0, 1] }} dpr={[1, 1.5]} performance={{ min: 0.5 }}>
                        <Suspense fallback={null}>
                            <Stars />
                            <Preload all />
                        </Suspense>
                    </Canvas>
                )}
            </div>

            {
                !loading && (
                    <div className="relative z-10 flex flex-col min-h-screen animate-fade-in-up">
                        <NavBar theme={theme} toggleTheme={toggleTheme} />

                        <HeroNew theme={theme} />

                        <div className="content-wrapper flex-grow">
                            <About />
                            <Skills />
                            <Projects />
                            <Certificates />
                            <Education />
                            <Contact />
                        </div>

                        <footer className="footer-section border-t pt-16 pb-8 relative z-20 transition-colors duration-300" style={{ backgroundColor: 'var(--bg-color)', borderColor: 'var(--border-color)' }}>
                            <div className="container mx-auto px-6">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 border-b pb-12 text-center md:text-left" style={{ borderColor: 'var(--border-color)' }}>

                                    <div className="space-y-4">
                                        <div className="text-3xl font-bold tracking-tighter">
                                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 font-['Outfit']">AH</span>
                                        </div>
                                        <p className="leading-relaxed max-w-xs mx-auto md:mx-0" style={{ color: 'var(--text-secondary)' }}>
                                            Building digital experiences that combine modern technology with exceptional design.
                                        </p>
                                    </div>

                                    <div>
                                        <h4 className="text-lg font-bold mb-6" style={{ color: 'var(--text-primary)' }}>Quick Links</h4>
                                        <ul className="space-y-3">
                                            {['About', 'Skills', 'Projects', 'Certificates', 'Education', 'Contact'].map((item) => (
                                                <li key={item}>
                                                    <button
                                                        onClick={() => document.getElementById(item.toLowerCase()).scrollIntoView({ behavior: 'smooth' })}
                                                        className="hover:text-blue-400 transition-colors cursor-none"
                                                        style={{ color: 'var(--text-secondary)' }}
                                                    >
                                                        {item}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div>
                                        <h4 className="text-lg font-bold mb-6" style={{ color: 'var(--text-primary)' }}>Connect</h4>
                                        <div className="flex gap-4 justify-center md:justify-start">
                                            <Magnetic strength={0.2} className="inline-block">
                                                <a
                                                    href="https://github.com/abdulhaque2005"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-600 hover:text-white transition-all transform hover:-translate-y-1 block"
                                                    style={{ backgroundColor: 'var(--card-bg)', color: 'var(--text-secondary)' }}
                                                >
                                                    <Github size={20} />
                                                </a>
                                            </Magnetic>
                                            <Magnetic strength={0.2} className="inline-block">
                                                <a
                                                    href="https://www.linkedin.com/in/abdul-haque-a08150398"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all transform hover:-translate-y-1 block"
                                                    style={{ backgroundColor: 'var(--card-bg)', color: 'var(--text-secondary)' }}
                                                >
                                                    <Linkedin size={20} />
                                                </a>
                                            </Magnetic>
                                            <Magnetic strength={0.2} className="inline-block">
                                                <a
                                                    href="https://www.youtube.com/@01_sigma_boy"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-red-600 hover:text-white transition-all transform hover:-translate-y-1 block"
                                                    style={{ backgroundColor: 'var(--card-bg)', color: 'var(--text-secondary)' }}
                                                >
                                                    <Youtube size={20} />
                                                </a>
                                            </Magnetic>
                                            <Magnetic strength={0.2} className="inline-block">
                                                <a
                                                    href="mailto:abdulhaque4171@gmail.com"
                                                    className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-purple-600 hover:text-white transition-all transform hover:-translate-y-1 block"
                                                    style={{ backgroundColor: 'var(--card-bg)', color: 'var(--text-secondary)' }}
                                                >
                                                    <Mail size={20} />
                                                </a>
                                            </Magnetic>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-center items-center text-base" style={{ color: 'var(--text-secondary)' }}>
                                    <p>&copy; {new Date().getFullYear()} Abdul Haque. All rights reserved.</p>
                                </div>
                            </div>
                        </footer>
                    </div>
                )
            }
        </div>
    );
}

export default App;
