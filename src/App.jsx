import React, { Suspense, useState, useEffect, lazy } from 'react';
import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import { Github, Linkedin, Mail, Youtube } from 'lucide-react';
import { AnimatePresence, motion, useScroll } from 'framer-motion';
import { Routes, Route, useLocation, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Stars = lazy(() => import('./components/canvas/Stars'));
import NavBar from './components/NavBar';
import HeroNew from './components/HeroNew';
import About from './components/About';
import Education from './components/Education';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import Hackathons from './components/Hackathons';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import Magnetic from './components/Magnetic';
import ChatBot from './components/ChatBot';
import './App.css';

const Home = ({ theme }) => (
    <>
        <HeroNew theme={theme} />
        <About />
        <Skills />
        <Projects />
        <Hackathons />
        <Certificates />
        <Education />
        <Contact />
    </>
);

const seoData = {
    '/': { title: 'Abdul Haque | Full Stack Developer & UI/UX Expert', desc: 'Welcome to the portfolio of Abdul Haque. Explore my versatile projects, skills, and hackathon achievements in web development.' },
    '/about': { title: 'About the Developer | Full Stack Engineering Journey', desc: 'Learn more about my professional journey, transitioning from foundational coding concepts to architecting scalable, modern web applications.' },
    '/skills': { title: 'Expert C++, React & JavaScript Developer | Technical Skills', desc: 'Comprehensive technical skills profile featuring advanced proficiency in C++, JavaScript, React, Node.js, and modern UI/UX design tools.' },
    '/projects': { title: 'Innovative Web Applications & Full Stack Showcase', desc: 'Browse through a curated selection of full-stack projects, showcasing responsive frontend designs and robust backend engineering.' },
    '/hackathons': { title: 'Award-Winning Hackathon Solutions & Prototypes', desc: 'Discover high-impact hackathon projects and innovative prototype solutions built under extreme time constraints.' },
    '/certificates': { title: 'Verified Professional Certifications in C++, JavaScript & Web Dev', desc: 'Explore my validated credentials, including comprehensive certifications from HackerRank and Sololearn in C++, JavaScript, and Core Web Technologies.' },
    '/education': { title: 'Academic Qualifications & Software Engineering Background', desc: 'Review my academic foundation, continuous learning path, and educational background in software engineering.' },
    '/contact': { title: 'Hire a Professional Full Stack Developer | Get in Touch', desc: 'Looking for a dedicated software engineer or full stack developer? Reach out for collaborations, freelance opportunities, or full-time roles.' }
};

const RouteSEO = ({ pathname }) => {
    const data = seoData[pathname] || seoData['/'];
    return (
        <Helmet>
            <title>{data.title}</title>
            <meta name="description" content={data.desc} />
            <meta property="og:title" content={data.title} />
            <meta property="og:description" content={data.desc} />
            <link rel="canonical" href={`https://abdul-portfolio-rose.vercel.app${pathname}`} />
        </Helmet>
    );
};

function App() {
    const [loading, setLoading] = useState(true);
    const [theme, setTheme] = useState('dark');
    const { scrollYProgress } = useScroll();
    const location = useLocation();

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2500);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const id = location.pathname === '/' ? 'home' : location.pathname.substring(1);
        if (id === 'home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (id === 'about') {
            const element = document.getElementById('about');
            if (element) {
                const y = element.getBoundingClientRect().top + window.scrollY - 80;
                window.scrollTo({ top: y, behavior: 'smooth' });
            } else {
                 window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        } else {
            setTimeout(() => {
                const element = document.getElementById(id);
                if (element) {
                    const y = element.getBoundingClientRect().top + window.scrollY - 80;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                }
            }, 100);
        }
    }, [location.pathname]);

    return (
        <div className="app-wrapper bg-theme text-theme-primary font-sans min-h-screen transition-colors duration-300" data-theme={theme}>
            <RouteSEO pathname={location.pathname} />
            <CustomCursor />
            <ChatBot theme={theme} />
            <AnimatePresence mode="wait">
                {loading && <Preloader key="preloader" />}
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

                        <main className="content-wrapper flex-grow">
                            <AnimatePresence mode="wait">
                                <Routes location={location} key={location.pathname}>
                                    <Route path="/" element={<Home theme={theme} />} />
                                    <Route path="/about" element={<Home theme={theme} />} />
                                    <Route path="/skills" element={<Home theme={theme} />} />
                                    <Route path="/projects" element={<Home theme={theme} />} />
                                    <Route path="/hackathons" element={<Home theme={theme} />} />
                                    <Route path="/certificates" element={<Home theme={theme} />} />
                                    <Route path="/education" element={<Home theme={theme} />} />
                                    <Route path="/contact" element={<Home theme={theme} />} />
                                </Routes>
                            </AnimatePresence>
                        </main>

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
                                            {['About', 'Skills', 'Projects', 'Hackathons', 'Certificates', 'Education', 'Contact'].map((item) => (
                                                <li key={item}>
                                                    <Link
                                                        to={item.toLowerCase() === 'about' ? '/' : `/${item.toLowerCase()}`}
                                                        className="hover:text-blue-400 transition-colors cursor-none"
                                                        style={{ color: 'var(--text-secondary)' }}
                                                        onClick={() => {
                                                            if (item.toLowerCase() === 'about' && location.pathname === '/') {
                                                                window.scrollTo({ top: 0, behavior: 'smooth' });
                                                            }
                                                        }}
                                                    >
                                                        {item}
                                                    </Link>
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

