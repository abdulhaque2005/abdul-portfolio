import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X, Github, Monitor, Gamepad2, ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';

const projects = [
    {
        title: "StockPilot",
        desc: "A full-stack MERN trading dashboard inspired by Zerodha, featuring real-time watchlists, portfolio management, and secure authentication.",
        tags: ["TypeScript", "React", "Node.js", "MongoDB"],
        link: "https://stockpilot-abdul7.vercel.app/login",
        github: "https://github.com/abdulhaque2005/CoreInventory-oddo-x-indus",
        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=1000"
    },
    {
        title: "VectorMinds",
        desc: "AI-powered currency arbitration platform for freelancers with real-time exchange rates, analytics, AI forecasts, and a financial simulator.",
        tags: ["React", "Vite", "AI", "API"],
        link: "https://vector-minds.vercel.app/",
        github: "https://github.com/abdulhaque2005/vector-minds",
        image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=1000"
    },
    {
        title: "Mealawe Clone",
        desc: "Functional clone of the Mealawe food platform with a focus on user-friendly navigation and responsive design.",
        tags: ["HTML", "CSS", "Responsive"],
        link: "https://mealawe-9b7udy2ko-abdul7.vercel.app/",
        github: "https://github.com/abdulhaque2005/mealawe_clone",
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1000"
    },
    {
        title: "Razer Website Clone",
        desc: "High-fidelity clone of the Razer gaming website featuring dark mode aesthetics and meticulous layout replication.",
        tags: ["HTML", "CSS", "UI Clone"],
        link: "https://razer-website-1avbtm69x-abdul7.vercel.app/",
        github: "https://github.com/abdulhaque2005/razer_clone",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1000"
    },
    {
        title: "Ethena Clone",
        desc: "Pixel-perfect recreation of Ethena platform featuring modern UI/UX, smooth transitions, and professional aesthetics.",
        tags: ["HTML", "CSS", "Animation"],
        link: "https://ethena-clone1-cmxl224lm-abdul7.vercel.app/",
        github: "https://github.com/abdulhaque2005/React_project",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJAB7lC4utCQB0VrWcK829zdM8KZWOL5MKvQ&s"
    },
    {
        title: "Calculator App",
        desc: "A sleek and functional calculator for everyday computations.",
        tags: ["React", "CSS", "JS"],
        link: "https://calculator-abdul7.vercel.app/",
        github: "https://github.com/abdulhaque2005/React_project/tree/main/vite-project",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREkhA4QUYqg3GKOoWmVYhf4KCUfZbr7exp4w&s"
    },
    {
        title: "Todo Master",
        desc: "Efficient task management application to keep your day organized.",
        tags: ["React", "CSS", "JS"],
        link: "https://todoapp-project-p85bq6j4n-abdul7.vercel.app/",
        github: "https://github.com/abdulhaque2005/React_project/tree/main/Todoproject",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiU4IjSMOl-iE34Ikjr1TfaCHSWOFXr4ahHA&s"
    },
    {
        title: "Currency Converter",
        desc: "Real-time currency exchange rate calculator for global financial updates.",
        tags: ["HTML", "CSS", "JS", "API"],
        link: "https://convertrate23.netlify.app/convert_currn/currency/",
        github: "https://github.com/abdulhaque2005/Convert_Currn",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKOtVHmkhcyf-ZovYd-iMUNaUnai3Nr3ndBA&s"
    }
];

const games = [
    {
        title: "Typing Master",
        desc: "Challenge your typing speed and accuracy in this fast-paced typing test.",
        tags: ["JS", "Game", "Speed"],
        link: "https://typing-test-abdul7.vercel.app/",
        image: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
        title: "Counter Game",
        desc: "Interactive 3D counter application for tracking numbers with style.",
        tags: ["JS", "Game", "Logic"],
        link: "https://counter-game-pfcffxc2q-abdul7.vercel.app/",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop"
    },
    {
        title: "Color Pick Game",
        desc: "Test your hex code knowledge with this interactive color guessing game.",
        tags: ["JS", "Game", "Colors"],
        link: "https://colour-game-one.vercel.app/",
        image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop"
    }
];

const SpotlightCard = ({ children, className = "", onClick }) => {
    const divRef = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e) => {
        if (!divRef.current) return;
        const rect = divRef.current.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setOpacity(1)}
            onMouseLeave={() => setOpacity(0)}
            onClick={onClick}
            className={`relative overflow-hidden rounded-2xl border backdrop-blur-sm transition-all duration-300 ${className}`}
            style={{
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--border-color)'
            }}
        >
            <div
                className="pointer-events-none absolute -inset-px transition duration-300 z-10"
                style={{
                    opacity,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(59, 130, 246, 0.15), transparent 40%)`,
                }}
            />
            {children}
        </div>
    );
};

const Projects = () => {
    const [selectedProject, setSelectedProject] = useState(null);
    const [currAngle, setCurrAngle] = useState(0);
    const [showAll, setShowAll] = useState(false);

    const visibleProjects = showAll ? projects : projects.slice(0, 6);


    return (
        <section id="projects" className="py-24 relative overflow-hidden transition-colors duration-300" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-primary)' }}>
            <div className="w-full max-w-7xl mx-auto px-4 min-[400px]:px-6 relative z-10">

                <div className="mb-20 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6 bg-blue-500/5 border-blue-500/20 text-blue-500 text-xs font-bold tracking-widest uppercase">
                        <Monitor size={14} /> Development
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold mb-6">
                        Real World <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Projects</span>
                    </h2>
                </div>

                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10 max-w-7xl mx-auto"
                >
                    <AnimatePresence mode="popLayout">
                        {visibleProjects.map((project, index) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9, filter: "blur(12px)" }}
                                transition={{
                                    duration: 0.7,
                                    delay: index * 0.08,
                                    type: "spring",
                                    stiffness: 70,
                                    damping: 22,
                                    mass: 0.8
                                }}
                                key={project.title}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => setSelectedProject(project)}
                                className="group relative h-[420px] md:h-[400px] w-full cursor-pointer perspective-1000 rounded-3xl z-10 transition-all duration-700 hover:-translate-y-3 hover:shadow-[0_25px_50px_-12px_rgba(59,130,246,0.3)] transform-gpu"
                            >
                                {/* Animated Gradient Border on Hover */}
                                <div className="absolute -inset-[2px] rounded-3xl bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 opacity-0 group-hover:opacity-40 blur-sm transition-opacity duration-700 -z-20"></div>
                                <div className="absolute inset-0 rounded-3xl bg-[var(--card-bg)] z-[-15] shadow-inner"></div>

                                {/* Inner Card Container for clipping */}
                                <div className="h-full w-full rounded-3xl overflow-hidden border relative flex flex-col backdrop-blur-xl" style={{ borderColor: 'var(--subtle-border)', backgroundColor: 'var(--card-inner-bg)' }}>
                                    {/* ── Desktop/Tablet Interactive Door ── */}
                                    <div className="absolute inset-0 z-20 hidden sm:flex transition-all duration-700 ease-out group-hover:opacity-0 group-hover:pointer-events-none transform-style-3d">
                                        <div className="h-full w-1/2 backdrop-blur-2xl rounded-l-3xl flex items-center justify-end overflow-hidden transition-transform duration-700 group-hover:-translate-x-full relative" style={{ backgroundColor: 'var(--door-bg)', borderRight: '1px solid var(--subtle-border)' }}>
                                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                                            <span className="mr-2 text-3xl md:text-4xl font-black uppercase tracking-tighter" style={{ color: 'var(--door-text)', textShadow: '0 0 10px rgba(128,128,128,0.1)' }}>View</span>
                                        </div>
                                        <div className="h-full w-1/2 backdrop-blur-2xl rounded-r-3xl flex items-center justify-start overflow-hidden transition-transform duration-700 group-hover:translate-x-full relative" style={{ backgroundColor: 'var(--door-bg)', borderLeft: '1px solid var(--subtle-border)' }}>
                                            <div className="absolute inset-0 bg-gradient-to-bl from-white/10 to-transparent"></div>
                                            <span className="ml-2 text-3xl md:text-4xl font-black uppercase tracking-tighter" style={{ color: 'var(--door-text)', textShadow: '0 0 10px rgba(128,128,128,0.1)' }}>Detail</span>
                                        </div>

                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 md:w-16 md:h-16 rounded-full border-4 border-emerald-500/30 bg-black/80 backdrop-blur-md flex items-center justify-center z-30 transition-all duration-300 group-hover:scale-110 shadow-[0_0_20px_rgba(16,185,129,0.5)]">
                                            <div className="absolute inset-0 rounded-full animate-ping bg-emerald-500/20"></div>
                                            <ArrowUpRight className="text-emerald-400 group-hover:rotate-45 transition-transform duration-500" size={28} md:size={32} strokeWidth={3} />
                                        </div>
                                    </div>

                                    {/* ── Main Card Content ── */}
                                    <div className="h-full w-full rounded-3xl overflow-hidden border bg-[var(--card-bg)] shadow-2xl relative flex flex-col" style={{ borderColor: 'var(--subtle-border)' }}>
                                        <div className="h-52 md:h-48 overflow-hidden relative">
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                                            <img
                                                src={project.image}
                                                alt={project.title}
                                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                            />
                                            {/* Mobile Indicator */}
                                            <div className="absolute bottom-4 left-4 z-20 sm:hidden">
                                                <div className="flex gap-2">
                                                    {project.tags.slice(0, 2).map(tag => (
                                                        <span key={tag} className="text-[10px] font-bold px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded-full border border-blue-500/30 backdrop-blur-md">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-6 flex flex-col flex-1 relative z-10 group-hover:-translate-y-2 transition-transform duration-500">
                                            <div className="flex justify-between items-start mb-3">
                                                <h3 className="text-2xl font-bold transition-colors duration-500" style={{ color: 'var(--text-primary)' }}>
                                                    {project.title}
                                                </h3>
                                            </div>
                                            <p className="text-[14px] opacity-70 mb-5 line-clamp-3 leading-relaxed transition-opacity duration-500 group-hover:opacity-100" style={{ color: 'var(--text-secondary)' }}>
                                                {project.desc}
                                            </p>

                                            <div className="mt-auto grid grid-cols-2 gap-3 relative z-30">
                                                <a
                                                    href={project.link}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600/20 hover:bg-blue-600 border border-blue-500/30 hover:text-white font-bold text-xs tracking-wider transition-all duration-300 hover:shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                                                    style={{ color: 'var(--accent-primary)' }}
                                                >
                                                    <Monitor size={14} className="group-hover:animate-pulse" /> LIVE
                                                </a>
                                                {project.github ? (
                                                    <a
                                                        href={project.github}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        onClick={(e) => e.stopPropagation()}
                                                        className="flex items-center justify-center gap-2 py-3 rounded-xl border hover:bg-white hover:text-black font-bold text-xs tracking-wider transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                                                        style={{ borderColor: 'var(--subtle-border)', color: 'var(--text-secondary)' }}
                                                    >
                                                        <Github size={14} /> CODE
                                                    </a>
                                                ) : (
                                                    <div className="flex items-center justify-center gap-2 py-3 rounded-xl border opacity-40 text-xs font-bold cursor-not-allowed" style={{ borderColor: 'var(--subtle-border)', color: 'var(--text-secondary)' }}>
                                                        PRIVATE
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Ambient Glow Aura */}
                                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500 -z-10"></div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {projects.length > 6 && (
                    <div className="flex justify-center mb-32 mt-6">
                        <motion.button
                            onClick={() => setShowAll(!showAll)}
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.97 }}
                            className="group relative flex items-center gap-4 px-12 py-5 rounded-full font-bold text-base tracking-wider transition-all duration-500 overflow-hidden cursor-pointer"
                            style={{
                                background: 'linear-gradient(135deg, rgba(59,130,246,0.15), rgba(139,92,246,0.15))',
                                border: '1.5px solid rgba(99,102,241,0.3)',
                                color: 'var(--text-primary)',
                                boxShadow: '0 0 40px -10px rgba(99,102,241,0.3), inset 0 1px 0 rgba(255,255,255,0.05)'
                            }}
                        >
                            {/* Animated glow ring */}
                            <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ boxShadow: '0 0 50px 5px rgba(99,102,241,0.25), inset 0 0 30px rgba(59,130,246,0.1)' }} />
                            {/* Sweep effect on hover */}
                            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />

                            <span className="relative z-10 flex items-center gap-3">
                                {showAll ? (
                                    <>
                                        <span className="w-10 h-10 rounded-full bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center group-hover:bg-indigo-500/30 transition-colors duration-300">
                                            <ChevronUp size={20} className="text-indigo-400 group-hover:text-white transition-colors" />
                                        </span>
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Show Less</span>
                                    </>
                                ) : (
                                    <>
                                        <span className="w-10 h-10 rounded-full bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center group-hover:bg-indigo-500/30 transition-colors duration-300 relative">
                                            <ChevronDown size={20} className="text-indigo-400 group-hover:text-white transition-colors animate-bounce" />
                                            <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-blue-500 rounded-full animate-ping opacity-75" />
                                            <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-blue-400 rounded-full" />
                                        </span>
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">View More Projects</span>
                                        <span className="text-xs px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 font-bold">{projects.length - 6}+</span>
                                    </>
                                )}
                            </span>
                        </motion.button>
                    </div>
                )}

                <div className="mb-10 text-center border-t pt-20" style={{ borderColor: 'var(--border-color)' }}>
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6 bg-green-500/5 border-green-500/20 text-green-500 text-xs font-bold tracking-widest uppercase">
                        <Gamepad2 size={14} /> Entertainment
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Fun</span> Games
                    </h2>
                </div>

                <div className="relative w-full max-w-4xl mx-auto h-[450px] md:h-[500px] flex items-center justify-center perspective-1000 mb-20">
                    <motion.button
                        whileHover={{ scale: 1.2, rotate: -10, boxShadow: "0 0 25px rgba(168, 85, 247, 0.6)" }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setCurrAngle(prev => prev - 1)}
                        className="absolute left-2 min-[400px]:left-4 md:-left-16 z-30 w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-purple-500/50 flex items-center justify-center backdrop-blur-xl shadow-[0_0_15px_rgba(168,85,247,0.3)] group"
                        style={{ zIndex: 50, backgroundColor: 'var(--card-bg)', color: 'var(--text-primary)' }}
                    >
                        <ChevronLeft size={32} className="group-hover:-translate-x-1 transition-transform text-purple-400 group-hover:text-white" />
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.2, rotate: 10, boxShadow: "0 0 25px rgba(59, 130, 246, 0.6)" }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setCurrAngle(prev => prev + 1)}
                        className="absolute right-2 min-[400px]:right-4 md:-right-16 z-30 w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-blue-500/50 flex items-center justify-center backdrop-blur-xl shadow-[0_0_15px_rgba(59,130,246,0.3)] group"
                        style={{ zIndex: 50, backgroundColor: 'var(--card-bg)', color: 'var(--text-primary)' }}
                    >
                        <ChevronRight size={32} className="group-hover:translate-x-1 transition-transform text-blue-400 group-hover:text-white" />
                    </motion.button>

                    <div className="relative w-full h-full flex items-center justify-center transform-style-3d">
                        <AnimatePresence mode='popLayout'>
                            {games.map((game, index) => {
                                const effectiveIdx = (index - (currAngle % 3) + 3000) % 3;

                                let x = 0;
                                let scale = 1;
                                let zIndex = 10;
                                let opacity = 1;
                                let rotateY = 0;
                                let blur = '0px';

                                if (effectiveIdx === 0) {
                                    x = '0%'; scale = 1.05; zIndex = 20; opacity = 1; rotateY = 0; blur = '0px';
                                } else if (effectiveIdx === 1) {
                                    x = '55%'; scale = 0.85; zIndex = 10; opacity = 0.6; rotateY = -15; blur = '2px';
                                } else {
                                    x = '-55%'; scale = 0.85; zIndex = 10; opacity = 0.6; rotateY = 15; blur = '2px';
                                }

                                return (
                                    <motion.div
                                        key={index}
                                        className={`absolute w-[290px] min-[400px]:w-[320px] md:w-[360px] h-[420px] md:h-[480px] rounded-3xl overflow-hidden border shadow-2xl transition-all duration-500 ${effectiveIdx === 0 ? 'gajab-card cursor-grab active:cursor-grabbing' : 'pointer-events-none'}`}
                                        style={{
                                            backgroundColor: 'var(--card-bg)',
                                            borderColor: effectiveIdx === 0 ? '#4ade80' : 'var(--border-color)',
                                            boxShadow: effectiveIdx === 0 ? '0 0 50px -10px rgba(74, 222, 128, 0.4)' : 'none',
                                            zIndex: zIndex
                                        }}
                                        initial={false}
                                        animate={{
                                            x,
                                            scale: effectiveIdx === 0 ? (window.innerWidth < 768 ? 1 : 1.05) : 0.85,
                                            zIndex,
                                            opacity,
                                            rotateY,
                                            filter: `blur(${blur})`,
                                        }}
                                        transition={{ type: "spring", stiffness: 300, damping: 30, mass: 1.2 }}
                                        drag={effectiveIdx === 0 ? "x" : false}
                                        dragConstraints={{ left: 0, right: 0 }}
                                        dragElastic={0.2}
                                        onDragEnd={(e, { offset, velocity }) => {
                                            const swipe = Math.abs(offset.x) * velocity.x;
                                            if (swipe < -100) {
                                                setCurrAngle(prev => prev + 1);
                                            } else if (swipe > 100) {
                                                setCurrAngle(prev => prev - 1);
                                            }
                                        }}
                                    >
                                        {effectiveIdx === 0 && (
                                            <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 via-emerald-500/10 to-transparent opacity-60 animate-pulse pointer-events-none z-0" />
                                        )}
                                        <div className="h-2/3 relative group overflow-hidden bg-black">
                                            <div className="absolute inset-0 bg-gradient-to-t from-[var(--card-bg)] to-transparent z-10" />
                                            <img
                                                src={game.image}
                                                alt={game.title}
                                                className="w-full h-full object-cover"
                                            />
                                            {effectiveIdx === 0 && (
                                                <div className="absolute top-4 right-4 z-20">
                                                    <span className="px-3 py-1 text-[10px] font-bold bg-green-500 text-black rounded-full animate-pulse">PLAYABLE</span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="h-1/3 p-6 flex flex-col justify-between relative z-20 transition-colors duration-300" style={{ backgroundColor: 'var(--card-bg)' }}>
                                            <div>
                                                <h3 className="text-xl font-bold mb-1 truncate" style={{ color: 'var(--text-primary)' }}>{game.title}</h3>
                                                <p className="text-xs line-clamp-2" style={{ color: 'var(--text-secondary)' }}>{game.desc}</p>
                                            </div>

                                            {effectiveIdx === 0 ? (
                                                <motion.a
                                                    href={game.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(34, 197, 94, 0.6)" }}
                                                    whileTap={{ scale: 0.95 }}
                                                    className="mt-2 w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 text-black font-bold text-sm transition-all shadow-lg flex items-center justify-center gap-2 relative overflow-hidden group/play"
                                                >
                                                    <span className="absolute inset-0 bg-white/20 translate-y-full group-hover/play:translate-y-0 transition-transform duration-300 transform skew-y-12"></span>
                                                    <Gamepad2 size={16} className="relative z-10" /> <span className="relative z-10">PLAY NOW</span>
                                                </motion.a>
                                            ) : (
                                                <button className="mt-2 w-full py-3 rounded-xl border text-slate-500 font-bold text-sm cursor-not-allowed" style={{ borderColor: 'var(--border-color)' }}>
                                                    Select to Play
                                                </button>
                                            )}
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>

                        <div className="absolute bottom-[-60px] w-[80%] h-[40px] bg-[radial-gradient(ellipse_at_center,_rgba(34,197,94,0.3)_0%,_transparent_70%)] blur-xl opacity-60 animate-pulse pointer-events-none hidden md:block" />
                    </div>
                </div>

            </div>

            <AnimatePresence>
                {selectedProject && (
                    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="w-full max-w-4xl rounded-3xl border overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
                            style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}
                        >
                            <div className="w-full md:w-1/2 h-64 md:h-auto bg-black relative">
                                <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-contain" />
                                <button
                                    onClick={() => setSelectedProject(null)}
                                    className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-red-500 transition-colors md:hidden"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="w-full md:w-1/2 p-8 flex flex-col overflow-y-auto relative">
                                <button
                                    onClick={() => setSelectedProject(null)}
                                    className="absolute top-4 right-4 p-2 bg-slate-800 text-slate-400 rounded-full hover:bg-slate-700 hover:text-white transition-colors hidden md:block"
                                >
                                    <X size={20} />
                                </button>

                                <h3 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{selectedProject.title}</h3>
                                <p className="mb-6 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{selectedProject.desc}</p>

                                <div className="flex flex-wrap gap-2 mb-8">
                                    {selectedProject.tags.map(tag => (
                                        <span key={tag} className="text-xs font-bold px-2 py-1 bg-blue-500/10 text-blue-400 rounded">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="mt-auto space-y-3">
                                    <a
                                        href={selectedProject.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-colors"
                                    >
                                        <Monitor size={18} /> Visit Live Website
                                    </a>

                                    {selectedProject.github && (
                                        <a
                                            href={selectedProject.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full py-3 border border-slate-700 hover:bg-slate-800 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-colors"
                                        >
                                            <Github size={18} /> Source Code
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

        </section>
    );
};

export default Projects;
