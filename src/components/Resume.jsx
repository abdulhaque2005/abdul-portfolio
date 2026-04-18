import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Download, ExternalLink, Maximize2, X } from 'lucide-react';

// Local resume path
const RESUME_PATH = '/resume.pdf';

const Resume = () => {
    const [isFullscreen, setIsFullscreen] = useState(false);



    return (
        <section
            id="resume"
            className="py-24 relative overflow-hidden min-h-screen flex flex-col items-center"
            style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-primary)' }}
        >
            {/* Background Glow Effects */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] md:w-[800px] md:h-[800px] rounded-full blur-[100px] md:blur-[150px] pointer-events-none opacity-10" style={{ background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)' }} />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] md:w-[800px] md:h-[800px] rounded-full blur-[100px] md:blur-[150px] pointer-events-none opacity-10" style={{ background: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)' }} />

            {/* Animated geometric shapes */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="absolute top-20 -right-20 w-64 h-64 border border-blue-500/10 rounded-[3rem] pointer-events-none"
            />
            <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-20 -left-20 w-48 h-48 border border-purple-500/10 rounded-full pointer-events-none"
            />

            <div className="w-full max-w-5xl mx-auto px-4 sm:px-8 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 flex flex-col items-center text-center"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black tracking-[0.3em] uppercase mb-8 backdrop-blur-md">
                        <FileText size={14} /> Professional Resume
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter font-[Outfit]" style={{ color: 'var(--text-primary)' }}>
                        MY <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">RESUME</span>
                    </h2>
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: 120 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="h-1.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                    />
                    <p className="mt-6 text-sm md:text-base max-w-xl opacity-60 leading-relaxed font-medium">
                        A comprehensive overview of my education, skills, experience, and achievements.
                    </p>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex flex-wrap gap-4 justify-center mb-10"
                >
                    <motion.a
                        href={RESUME_PATH}
                        download="Abdul_Haque_Resume.pdf"
                        whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(59,130,246,0.4)" }}
                        whileTap={{ scale: 0.95 }}
                        className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-sm tracking-wider transition-all duration-300 text-white relative overflow-hidden"
                        style={{
                            background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                            boxShadow: '0 4px 20px -5px rgba(59, 130, 246, 0.4)'
                        }}
                    >
                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                        <Download size={18} className="relative z-10" />
                        <span className="relative z-10">Download PDF</span>
                    </motion.a>

                    <motion.button
                        onClick={() => setIsFullscreen(true)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-sm tracking-wider transition-all duration-300 border backdrop-blur-xl cursor-pointer"
                        style={{
                            backgroundColor: 'rgba(255,255,255,0.05)',
                            borderColor: 'rgba(255,255,255,0.15)',
                            color: 'var(--text-primary)'
                        }}
                    >
                        <Maximize2 size={18} />
                        <span>Full Screen</span>
                    </motion.button>

                    <motion.a
                        href={RESUME_PATH}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-sm tracking-wider transition-all duration-300 border backdrop-blur-xl"
                        style={{
                            backgroundColor: 'rgba(255,255,255,0.05)',
                            borderColor: 'rgba(255,255,255,0.15)',
                            color: 'var(--text-primary)'
                        }}
                    >
                        <ExternalLink size={18} />
                        <span>Open in New Tab</span>
                    </motion.a>
                </motion.div>

                {/* Resume Viewer */}
                <motion.div
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, type: "spring", stiffness: 80 }}
                    className="relative group"
                >
                    {/* Outer glow ring */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />

                    {/* PDF Container */}
                    <div
                        className="relative rounded-3xl overflow-hidden border backdrop-blur-xl"
                        style={{
                            backgroundColor: 'var(--card-bg)',
                            borderColor: 'var(--border-color)'
                        }}
                    >
                        {/* Top bar */}
                        <div
                            className="flex items-center justify-between px-6 py-4 border-b"
                            style={{
                                backgroundColor: 'rgba(15, 23, 42, 0.8)',
                                borderColor: 'var(--border-color)'
                            }}
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                                </div>
                                <span className="text-xs font-semibold opacity-50 ml-2 hidden sm:inline" style={{ color: 'var(--text-secondary)' }}>
                                    Abdul_Haque_Resume.pdf
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <a
                                    href={RESUME_PATH}
                                    download="Abdul_Haque_Resume.pdf"
                                    className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                                    style={{ color: 'var(--text-secondary)' }}
                                    title="Download"
                                >
                                    <Download size={16} />
                                </a>
                                <button
                                    onClick={() => setIsFullscreen(true)}
                                    className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                                    style={{ color: 'var(--text-secondary)' }}
                                    title="Fullscreen"
                                >
                                    <Maximize2 size={16} />
                                </button>
                            </div>
                        </div>

                        {/* Google Drive PDF Embed */}
                        <div className="w-full bg-[#1a1a2e]" style={{ height: 'calc(100vh - 200px)', minHeight: '600px' }}>
                            <iframe
                                src={`${RESUME_PATH}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`}
                                title="Abdul Haque Resume"
                                className="w-full h-full border-0"
                                style={{ backgroundColor: '#1a1a2e' }}
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="mt-12 text-center"
                >
                    <p className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase opacity-30" style={{ color: 'var(--text-secondary)' }}>
                        Interested? Let's connect and build something amazing together.
                    </p>
                </motion.div>
            </div>

            {/* ========= FULLSCREEN MODAL ========= */}
            <AnimatePresence>
                {isFullscreen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[99999] bg-black flex flex-col"
                    >
                        {/* Fullscreen Top Bar */}
                        <div className="flex items-center justify-between px-4 sm:px-8 py-4 bg-[#0a0a1a] border-b border-white/10 shrink-0">
                            <div className="flex items-center gap-3">
                                <FileText size={20} className="text-blue-400" />
                                <span className="text-sm font-bold text-white/80 hidden sm:inline">Abdul Haque — Resume</span>
                            </div>

                            <div className="flex items-center gap-3">
                                {/* Download button in fullscreen */}
                                <a
                                    href={RESUME_PATH}
                                    download="Abdul_Haque_Resume.pdf"
                                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold tracking-wider transition-all duration-200 shadow-lg shadow-blue-500/20"
                                >
                                    <Download size={16} />
                                    <span className="hidden sm:inline">Download</span>
                                </a>

                                {/* BIG CLOSE BUTTON */}
                                <button
                                    onClick={() => setIsFullscreen(false)}
                                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold tracking-wider transition-all duration-200 shadow-lg shadow-red-500/30 hover:shadow-red-500/50 hover:scale-105 active:scale-95"
                                >
                                    <X size={18} strokeWidth={3} />
                                    <span>Close</span>
                                </button>
                            </div>
                        </div>

                        {/* Fullscreen PDF */}
                        <div className="flex-1 relative">
                            <iframe
                                src={`${RESUME_PATH}#toolbar=1&navpanes=0&scrollbar=1&view=FitH`}
                                title="Abdul Haque Resume Fullscreen"
                                className="w-full h-full border-0"
                            />
                        </div>

                        {/* Floating close button - always visible corner */}
                        <button
                            onClick={() => setIsFullscreen(false)}
                            className="fixed top-20 right-4 sm:right-8 z-[100000] w-12 h-12 rounded-full bg-red-600/90 hover:bg-red-500 text-white flex items-center justify-center shadow-2xl shadow-red-500/40 hover:shadow-red-500/60 hover:scale-110 active:scale-90 transition-all duration-200 backdrop-blur-xl border border-red-400/30"
                            title="Close Fullscreen"
                        >
                            <X size={24} strokeWidth={3} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Resume;
