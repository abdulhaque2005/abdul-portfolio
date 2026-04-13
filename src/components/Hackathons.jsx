import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, MapPin, Calendar, Clock, X, Eye, Zap, Sparkles, ArrowRight, Github, ExternalLink, Code2 } from 'lucide-react';

const hackathons = [
    {
        id: 1,
        title: "Haxplore — CodeFest'26",
        organizer: "IIT BHU (Banaras Hindu University)",
        platform: "Unstop",
        date: "March 2026",
        duration: "36 Hours",
        location: "Online",
        projectName: "StockPilot",
        projectDesc: "AI-powered Inventory Management System with Ultra-Premium HUD interface, cyberpunk aesthetics, and intelligent warehouse workflows.",
        desc: "Participated in Haxplore, the flagship hackathon of CodeFest'26 organized by IIT-BHU. Built StockPilot — a next-gen AI-powered Inventory Management System with futuristic cyberpunk HUD interface, real-time analytics, and smart operations engine.",
        image: "/cert-haxplore.png",
        liveUrl: "https://stockpilot-abdul7.vercel.app/login",
        githubUrl: "https://github.com/abdulhaque2005/Stock_Pilot1",
        tech: ["Next.js 15", "TypeScript", "Supabase", "Tailwind CSS", "Zustand", "Framer Motion"],
        tags: ["Hackathon", "IIT-BHU", "CodeFest"],
        color: "from-blue-500 to-cyan-400",
        accent: "#3b82f6",
        glow: "rgba(59,130,246,0.3)"
    },
    {
        id: 2,
        title: "Doppelganger",
        organizer: "OpenPools.in",
        platform: "OpenPools",
        date: "March 2026",
        duration: "30 Hours",
        location: "Online",
        projectName: "Vector Minds",
        projectDesc: "A collaborative platform built during the Doppelganger sprint, transforming Professional DNA into real-world solutions with React and modern web technologies.",
        desc: "Participated in Doppelganger, a 30-hour build sprint on OpenPools. Built Vector Minds — a collaborative platform showcasing creativity and building impactful products with modern React ecosystem.",
        image: "/cert-doppelganger.png",
        liveUrl: "https://vector-minds.vercel.app/",
        githubUrl: "https://github.com/abdulhaque2005/vector-minds",
        tech: ["React", "Vite", "JavaScript", "Tailwind CSS", "Node.js"],
        tags: ["Build Sprint", "OpenPools", "30hrs"],
        color: "from-purple-600 to-pink-500",
        accent: "#a855f7",
        glow: "rgba(168,85,247,0.3)"
    }
];

const Hackathons = () => {
    const [selectedHack, setSelectedHack] = useState(null);

    const handleLinkClick = (e, url) => {
        e.stopPropagation();
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <section id="hackathons" className="py-24 relative overflow-hidden transition-colors duration-300" style={{ backgroundColor: 'var(--bg-color)' }}>
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] rounded-full hidden md:block" style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.03) 0%, transparent 70%)' }} />
                <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] rounded-full hidden md:block" style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.03) 0%, transparent 70%)' }} />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6 backdrop-blur-md bg-purple-500/10 border-purple-500/20 text-purple-500 text-sm font-bold tracking-wide uppercase">
                        <Trophy size={16} /> Hackathons
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight" style={{ color: 'var(--text-primary)' }}>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">Hackathon</span> Journey
                    </h2>
                    <p className="max-w-2xl mx-auto text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        Competing, building, and pushing boundaries in time-pressured environments.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {hackathons.map((hack, index) => (
                        <motion.div
                            key={hack.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15, duration: 0.6 }}
                            whileHover={{ y: -8 }}
                            onClick={() => setSelectedHack(hack)}
                            className="group relative rounded-3xl border overflow-hidden cursor-pointer transition-all duration-500"
                            style={{
                                backgroundColor: 'var(--card-bg)',
                                borderColor: 'var(--border-color)',
                            }}
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${hack.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                            <div className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-700 -z-10" style={{ background: `radial-gradient(circle, ${hack.glow}, transparent 70%)` }} />

                            <div className="relative aspect-[16/10] overflow-hidden border-b" style={{ borderColor: 'var(--border-color)' }}>
                                <div className={`absolute inset-0 bg-gradient-to-br ${hack.color} opacity-10 mix-blend-overlay z-0`} />
                                <img
                                    src={hack.image}
                                    alt={hack.title}
                                    className="w-full h-full object-contain p-6 transform group-hover:scale-105 transition-transform duration-700"
                                />

                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center backdrop-blur-sm z-10">
                                    <motion.span
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        whileInView={{ scale: 1, opacity: 1 }}
                                        className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold flex items-center gap-2 shadow-2xl shadow-purple-500/30"
                                    >
                                        <Eye size={18} /> VIEW DETAILS
                                    </motion.span>
                                </div>

                                <div className="absolute top-4 left-4 z-20">
                                    <span className="px-3 py-1.5 rounded-xl text-[10px] font-black tracking-wider bg-white/95 text-black shadow-lg flex items-center gap-1.5">
                                        <Trophy size={12} className="text-amber-500" /> {hack.platform}
                                    </span>
                                </div>

                                <div className="absolute top-4 right-4 z-20">
                                    <span className="px-3 py-1.5 rounded-xl text-[10px] font-black tracking-wider flex items-center gap-1.5 shadow-lg" style={{ background: hack.accent, color: 'white' }}>
                                        <Clock size={11} /> {hack.duration}
                                    </span>
                                </div>
                            </div>

                            <div className="p-7 flex flex-col">
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {hack.tags.map((tag, i) => (
                                        <span key={i} className="px-2.5 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border bg-white/5"
                                            style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <h3 className="text-xl font-bold mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300" style={{ color: 'var(--text-primary)' }}>
                                    {hack.title}
                                </h3>

                                {/* Project Name Badge */}
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold" style={{ background: `${hack.accent}20`, color: hack.accent }}>
                                        <Code2 size={12} /> {hack.projectName}
                                    </span>
                                </div>

                                <p className="text-sm mb-4 line-clamp-2 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                    {hack.desc}
                                </p>

                                {/* Tech Stack Pills */}
                                <div className="flex flex-wrap gap-1.5 mb-4">
                                    {hack.tech.slice(0, 4).map((t, i) => (
                                        <span key={i} className="px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider"
                                            style={{ background: 'var(--bg-color)', color: 'var(--text-secondary)', border: '1px solid var(--border-color)' }}>
                                            {t}
                                        </span>
                                    ))}
                                    {hack.tech.length > 4 && (
                                        <span className="px-2 py-0.5 rounded-md text-[9px] font-bold tracking-wider"
                                            style={{ color: hack.accent }}>
                                            +{hack.tech.length - 4} more
                                        </span>
                                    )}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex items-center gap-2 mb-4">
                                    <button
                                        onClick={(e) => handleLinkClick(e, hack.liveUrl)}
                                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                                        style={{ background: `linear-gradient(135deg, ${hack.accent}, ${hack.accent}cc)`, boxShadow: `0 4px 15px ${hack.glow}` }}
                                    >
                                        <ExternalLink size={13} /> Live Demo
                                    </button>
                                    <button
                                        onClick={(e) => handleLinkClick(e, hack.githubUrl)}
                                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border transition-all duration-300 hover:scale-105"
                                        style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)', backgroundColor: 'var(--bg-color)' }}
                                    >
                                        <Github size={13} /> GitHub
                                    </button>
                                </div>

                                <div className="flex items-center justify-between mt-auto pt-4 border-t" style={{ borderColor: 'var(--border-color)' }}>
                                    <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--text-secondary)' }}>
                                        <span className="flex items-center gap-1.5">
                                            <Calendar size={13} /> {hack.date}
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <MapPin size={13} /> {hack.location}
                                        </span>
                                    </div>
                                    <motion.span
                                        className="flex items-center gap-1 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        style={{ color: hack.accent }}
                                    >
                                        Details <ArrowRight size={12} />
                                    </motion.span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {selectedHack && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8"
                        style={{ backgroundColor: 'rgba(0,0,0,0.92)' }}
                    >
                        <motion.div
                            className="absolute inset-0 z-0 bg-black/80 backdrop-blur-sm"
                            onClick={() => setSelectedHack(null)}
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.85, y: 40 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.85, y: 40 }}
                            transition={{ type: "spring", damping: 20, stiffness: 250, mass: 0.8 }}
                            className="relative z-10 w-full max-w-5xl rounded-3xl overflow-hidden mt-10 md:mt-14"
                            onClick={(e) => e.stopPropagation()}
                            style={{ backgroundColor: '#0a0a0a' }}
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${selectedHack.color} opacity-5`} />

                            {/* Certificate Image */}
                            <div className="flex items-center justify-center p-2 sm:p-4 relative">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.15, duration: 0.5 }}
                                    className="relative rounded-2xl overflow-hidden aspect-auto w-full flex items-center justify-center bg-black/40"
                                >
                                    <img
                                        src={selectedHack.image}
                                        alt={selectedHack.title}
                                        className="w-full h-auto max-h-[50vh] object-contain p-2 md:p-4"
                                    />
                                    <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 pointer-events-none" />
                                    
                                    {/* CLOSE BUTTON PROMINENT */}
                                    <motion.button
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.3, type: "spring" }}
                                        onClick={() => setSelectedHack(null)}
                                        className="absolute top-4 right-4 md:top-6 md:right-6 z-[1000] w-10 h-10 md:w-12 md:h-12 bg-red-500/90 hover:bg-red-600 rounded-full flex items-center justify-center text-white shadow-xl hover:scale-110 transition-all duration-300 backdrop-blur-md border border-white/20"
                                    >
                                        <X size={24} className="pointer-events-none" />
                                    </motion.button>
                                </motion.div>
                            </div>

                            {/* Project Details Section */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.25, duration: 0.5 }}
                                className="px-6 pb-6 relative"
                            >
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                    <div>
                                        <h3 className="text-xl md:text-2xl font-bold text-white mb-1">{selectedHack.title}</h3>
                                        <p className="text-sm text-white/50 flex items-center gap-2">
                                            <Code2 size={14} style={{ color: selectedHack.accent }} />
                                            Project: <span className="font-bold" style={{ color: selectedHack.accent }}>{selectedHack.projectName}</span>
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <a
                                            href={selectedHack.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                                            style={{ background: `linear-gradient(135deg, ${selectedHack.accent}, ${selectedHack.accent}cc)`, boxShadow: `0 4px 15px ${selectedHack.glow}` }}
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <ExternalLink size={14} /> Live Demo
                                        </a>
                                        <a
                                            href={selectedHack.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold border border-white/20 text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 hover:scale-105"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <Github size={14} /> Source Code
                                        </a>
                                    </div>
                                </div>

                                {/* Tech Stack in modal */}
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {selectedHack.tech.map((t, i) => (
                                        <span key={i} className="px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border border-white/10 text-white/60 bg-white/5">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Hackathons;
