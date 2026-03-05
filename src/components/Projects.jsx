import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X, Github, Monitor, Gamepad2, ChevronLeft, ChevronRight } from 'lucide-react';

const projects = [
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


    return (
        <section id="projects" className="py-24 relative overflow-hidden transition-colors duration-300" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-primary)' }}>
            <div className="container mx-auto px-6 relative z-10">

                <div className="mb-20 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6 bg-blue-500/5 border-blue-500/20 text-blue-500 text-xs font-bold tracking-widest uppercase">
                        <Monitor size={14} /> Development
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold mb-6">
                        Real World <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Projects</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32 max-w-7xl mx-auto">
                    {projects.map((project, index) => (
                        <div key={index} onClick={() => setSelectedProject(project)} className="group relative h-[400px] w-full cursor-pointer perspective-1000 overflow-hidden rounded-2xl z-10 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10">
                            <div className="absolute inset-0 z-20 hidden md:flex transition-all duration-700 ease-out group-hover:opacity-0 group-hover:pointer-events-none transform-style-3d">
                                <div className="h-full w-1/2 bg-black/40 backdrop-blur-xl border-r border-white/10 rounded-l-2xl flex items-center justify-end overflow-hidden transition-transform duration-700 group-hover:-translate-x-full relative">
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                                    <span className="mr-2 text-4xl font-black text-white/10 uppercase tracking-tighter" style={{ textShadow: "0 0 10px rgba(255,255,255,0.1)" }}>View</span>
                                </div>
                                <div className="h-full w-1/2 bg-black/40 backdrop-blur-xl border-l border-white/10 rounded-r-2xl flex items-center justify-start overflow-hidden transition-transform duration-700 group-hover:translate-x-full relative">
                                    <div className="absolute inset-0 bg-gradient-to-bl from-white/10 to-transparent"></div>
                                    <span className="ml-2 text-4xl font-black text-white/10 uppercase tracking-tighter" style={{ textShadow: "0 0 10px rgba(255,255,255,0.1)" }}>Project</span>
                                </div>

                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border-4 border-emerald-500/30 bg-black/80 backdrop-blur-md flex items-center justify-center z-30 transition-all duration-300 group-hover:scale-110 shadow-[0_0_20px_rgba(16,185,129,0.5)]">
                                    <div className="absolute inset-0 rounded-full animate-ping bg-emerald-500/20"></div>
                                    <ArrowUpRight className="text-emerald-400 group-hover:rotate-45 transition-transform duration-500" size={32} strokeWidth={3} />
                                </div>
                            </div>

                            <div className="h-full w-full rounded-2xl overflow-hidden border border-white/10 bg-[var(--card-bg)] shadow-2xl relative">
                                <div className="h-48 overflow-hidden relative">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                    />
                                </div>

                                <div className="p-6 flex flex-col h-[calc(100%-12rem)] relative z-10 group-hover:translate-y-[-10px] transition-transform duration-500">
                                    <h3 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                                        {project.title}
                                    </h3>
                                    <p className="text-base opacity-80 mb-4 line-clamp-3 leading-relaxed">
                                        {project.desc}
                                    </p>

                                    <div className="mt-auto grid grid-cols-2 gap-4">
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-base shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all transform hover:-translate-y-1"
                                        >
                                            <Monitor size={16} /> Live Demo
                                        </a>
                                        {project.github ? (
                                            <a
                                                href={project.github}
                                                target="_blank"
                                                rel="noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                                className="flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-base transition-all transform hover:-translate-y-1 block border"
                                                style={{
                                                    backgroundColor: 'var(--card-bg)',
                                                    color: 'var(--text-primary)',
                                                    borderColor: 'var(--border-color)'
                                                }}
                                            >
                                                <Github size={16} /> Source
                                            </a>
                                        ) : (
                                            <button
                                                disabled
                                                className="flex items-center justify-center gap-2 py-2.5 rounded-xl border font-bold text-base cursor-not-allowed"
                                                style={{
                                                    backgroundColor: 'var(--card-bg)',
                                                    color: 'var(--text-secondary)',
                                                    borderColor: 'var(--border-color)',
                                                    opacity: 0.5
                                                }}
                                            >
                                                <Github size={16} /> Private
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10 group-hover:animate-pulse"></div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mb-10 text-center border-t border-white/10 pt-20">
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
                        className="absolute left-0 md:-left-16 z-30 w-14 h-14 rounded-full border-2 border-purple-500/50 flex items-center justify-center bg-black/40 backdrop-blur-xl text-white shadow-[0_0_15px_rgba(168,85,247,0.3)] group"
                        style={{ zIndex: 50 }}
                    >
                        <ChevronLeft size={32} className="group-hover:-translate-x-1 transition-transform text-purple-400 group-hover:text-white" />
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.2, rotate: 10, boxShadow: "0 0 25px rgba(59, 130, 246, 0.6)" }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setCurrAngle(prev => prev + 1)}
                        className="absolute right-0 md:-right-16 z-30 w-14 h-14 rounded-full border-2 border-blue-500/50 flex items-center justify-center bg-black/40 backdrop-blur-xl text-white shadow-[0_0_15px_rgba(59,130,246,0.3)] group"
                        style={{ zIndex: 50 }}
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
                                        className={`absolute w-[280px] md:w-[360px] h-[420px] md:h-[480px] rounded-3xl overflow-hidden border shadow-2xl transition-all duration-500 ${effectiveIdx === 0 ? 'gajab-card cursor-grab active:cursor-grabbing' : 'pointer-events-none'}`}
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

                        <div className="absolute bottom-[-60px] w-[80%] h-[40px] bg-[radial-gradient(ellipse_at_center,_rgba(34,197,94,0.3)_0%,_transparent_70%)] blur-xl opacity-60 animate-pulse pointer-events-none" />
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
