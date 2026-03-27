import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink, X, Eye, Award, Calendar, CheckCircle, Search } from 'lucide-react';
import certReact from '../assets/cert-react.jpg';
import certPython from '../assets/cert-python.png';

const certificates = [
    {
        id: 1,
        title: "HTML, CSS & JavaScript",
        issuer: "HRCalcy",
        date: "29 Dec 2025",
        desc: "Demonstrated proficiency in core web technologies: HTML5, CSS3, and JavaScript.",
        image: "/certificate1.png",
        link: "#",
        showVerify: false,
        tags: ["Web Dev", "Frontend"],
        color: "from-orange-500 to-amber-500"
    },
    {
        id: 2,
        title: "ReactJS for Beginners",
        issuer: "Simplilearn",
        date: "3 Feb 2026",
        desc: "Mastery of React concepts including Components, Hooks, and State Management.",
        image: certReact,
        link: "#",
        showVerify: true,
        tags: ["React", "UI/UX"],
        color: "from-blue-400 to-cyan-400"
    },
    {
        id: 3,
        title: "Python Interview Ready",
        issuer: "Simplilearn",
        date: "3 Feb 2026",
        desc: "Advanced preparation for Python development: Data Structures & Algorithms.",
        image: certPython,
        link: "#",
        showVerify: true,
        tags: ["Python", "DSA"],
        color: "from-emerald-400 to-green-500"
    }
];

const TiltCard = ({ children, onClick }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseXPos = useMotionValue(0);
    const mouseYPos = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

    // For Glint effect
    const glintX = useSpring(mouseXPos, { stiffness: 300, damping: 30 });
    const glintY = useSpring(mouseYPos, { stiffness: 300, damping: 30 });

    const handleMouseMove = (e) => {
        // Disable on touch devices/mobile to save heavy 3D calculations
        if (typeof window !== 'undefined' && window.innerWidth < 768) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const xPct = (e.clientX - rect.left) / width - 0.5;
        const yPct = (e.clientY - rect.top) / height - 0.5;
        x.set(xPct);
        y.set(yPct);

        // Update pixel values for glint
        mouseXPos.set(e.clientX - rect.left);
        mouseYPos.set(e.clientY - rect.top);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
                perspective: 1000
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            className="relative h-full transition-all duration-300 ease-out cursor-pointer hover:z-50 transform-gpu"
            whileHover={{ scale: 1.03 }}
        >
            {/* Dynamic Glint Shimmer */}
            <motion.div
                className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    background: useTransform(
                        [glintX, glintY],
                        ([latestX, latestY]) =>
                            `radial-gradient(circle at ${latestX}px ${latestY}px, rgba(255,255,255,0.15) 0%, transparent 60%)`
                    )
                }}
            />
            {children}
        </motion.div>
    );
};

const Certificates = () => {
    const [selectedCert, setSelectedCert] = useState(null);

    return (
        <section id="certificates" className="py-24 relative overflow-hidden transition-colors duration-300" style={{ backgroundColor: 'var(--bg-color)' }}>

            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] right-[5%] w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-blue-500/5 rounded-full blur-[60px] md:blur-[100px] animate-pulse hidden md:block" />
                <div className="absolute bottom-[10%] left-[5%] w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-purple-500/5 rounded-full blur-[60px] md:blur-[100px] animate-pulse hidden md:block" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6 backdrop-blur-md bg-blue-500/10 border-blue-500/20 text-blue-500 text-sm font-bold tracking-wide uppercase">
                        <Award size={16} /> Certifications
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight" style={{ color: 'var(--text-primary)' }}>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">Certificates</span>
                    </h2>
                    <p className="max-w-2xl mx-auto text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        Validated expertise. Click on any certificate to view details.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto px-4">
                    {certificates.map((cert) => (
                        <div key={cert.id} className="h-full">
                            <TiltCard onClick={() => setSelectedCert(cert)}>
                                <div
                                    className="relative h-full flex flex-col rounded-3xl border overflow-hidden transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-blue-500/20 group"
                                    style={{
                                        backgroundColor: 'var(--card-bg)',
                                        borderColor: 'var(--border-color)',
                                        transform: "translateZ(20px)"
                                    }}
                                >
                                    <div className={`absolute inset-0 bg-gradient-to-br ${cert.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                                    <div className="relative aspect-[16/10] overflow-hidden border-b bg-white/5" style={{ borderColor: 'var(--border-color)' }}>
                                        <div className={`absolute inset-0 bg-gradient-to-br ${cert.color} opacity-10 mix-blend-overlay z-0`} />

                                        <motion.img
                                            src={cert.image}
                                            alt={cert.title}
                                            className="w-full h-full object-contain p-8 transform transition-transform duration-500 group-hover:scale-105"
                                        />

                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm z-10">
                                            <span className="px-8 py-3 rounded-full bg-blue-600/90 text-white font-black flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.4)] border border-blue-400/30">
                                                <Eye size={20} /> VIEW DETAILS
                                            </span>
                                        </div>

                                        <div className="absolute top-4 right-4 z-20">
                                            <span className="px-3 py-1.5 rounded-full text-[10px] font-black tracking-tighter bg-white/90 text-black shadow-lg flex items-center gap-1.5 backdrop-blur-md">
                                                <CheckCircle size={12} className="text-emerald-500 animate-pulse" /> {cert.issuer}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-8 flex flex-col flex-grow relative z-10">
                                        <div className="flex gap-2 mb-4 flex-wrap">
                                            {cert.tags.map((tag, i) => (
                                                <span key={i} className="px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border bg-white/5"
                                                    style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        <h3 className="text-2xl font-bold mb-3 leading-tight group-hover:text-blue-500 transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>
                                            {cert.title}
                                        </h3>

                                        <p className="text-sm leading-relaxed mb-6 line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
                                            {cert.desc}
                                        </p>

                                        <div className="mt-auto flex items-center justify-between pt-5 border-t" style={{ borderColor: 'var(--border-color)' }}>
                                            <div className="flex items-center gap-2 text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                                                <Calendar size={16} />
                                                {cert.date}
                                            </div>
                                            <CheckCircle size={18} className="text-emerald-500/40 group-hover:text-emerald-400 group-hover:scale-110 transition-all duration-300" />
                                        </div>
                                    </div>
                                </div>
                            </TiltCard>
                        </div>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {selectedCert && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9999] flex items-center justify-center px-4 pb-10 pt-28 bg-black/95 backdrop-blur-xl"
                    >

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 z-0"
                            onClick={() => setSelectedCert(null)}
                            aria-hidden="true"
                        />

                        <motion.div
                            layoutId={`cert-modal-${selectedCert.id}`}
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="relative z-10 w-full max-w-5xl flex flex-col items-center justify-center outline-none"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="w-full flex items-center justify-between mb-4 px-2">
                                <motion.h3
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="text-xl md:text-2xl font-bold text-white flex items-center gap-3"
                                >
                                    <Award className="text-blue-500" />
                                    {selectedCert.title}
                                </motion.h3>
                                <motion.button
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.2 }}
                                    onClick={() => setSelectedCert(null)}
                                    className="p-2 rounded-full bg-white/10 text-white hover:bg-red-500 hover:rotate-90 transition-all duration-300 border border-white/10"
                                    title="Close"
                                >
                                    <X size={24} />
                                </motion.button>
                            </div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.15, duration: 0.3 }}
                                className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#0d1117]"
                            >
                                <img
                                    src={selectedCert.image}
                                    alt={selectedCert.title}
                                    className="w-full h-auto max-h-[70vh] object-contain mx-auto bg-black/50"
                                    style={{ imageRendering: 'high-quality' }}
                                />

                                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 opacity-0 hover:opacity-100 transition-opacity duration-300 flex justify-between items-end">
                                    <div className="text-white/80 text-sm font-medium">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded text-xs border border-blue-500/30">
                                                {selectedCert.issuer}
                                            </span>
                                            <span className="text-slate-400">•</span>
                                            <span>{selectedCert.date}</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Certificates;
