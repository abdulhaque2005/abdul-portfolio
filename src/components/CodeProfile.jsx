import React, { useState, useEffect, useMemo } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';

const styles = {
    window: "relative rounded-xl overflow-hidden bg-[#0d1117] border border-[#30363d] shadow-2xl ring-1 ring-white/10",
    header: "flex items-center px-4 py-3 bg-[#161b22] border-b border-[#30363d]",
    lineNum: "text-gray-600 select-none w-8 text-right pr-3 border-r border-[#30363d] mr-3"
};

const FULL_CODE = `const developer = {
  name: 'Abdul Haque',
  role: 'Full Stack Developer',
  skills: ['React', 'Node.js', 'Next.js', 'Three.js'],
  hardWorker: true,
  quickLearner: true,
  problemSolver: true,
  hireable: function() {
    return (
      this.hardWorker &&
      this.problemSolver &&
      this.skills.length >= 5
    );
  }
};`;

const getHighlightedText = (text) => {
    if (!text) return "";
    let html = text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

    // Enhanced regex for better highlighting
    html = html.replace(/('[^']*')|("[^"]*")/g, '<span class="text-[#a5d6ff]">$1$2</span>'); // Strings
    html = html.replace(/\b(const|function|return|this|true|let|import|export|from)\b/g, '<span class="text-[#ff7b72]">$1</span>'); // Keywords
    html = html.replace(/\b(developer|skills|hardWorker|quickLearner|problemSolver|hireable)\b/g, '<span class="text-[#d2a8ff] font-bold">$1</span>'); // Object keys/Vars
    html = html.replace(/(\w+)(?=\s*:)/g, '<span class="text-[#7ee787] font-medium">$1</span>'); // Property names
    html = html.replace(/\b(length|push|map|filter)\b/g, '<span class="text-[#79c0ff]">$1</span>'); // Built-ins
    html = html.replace(/\/\/.*$/gm, '<span class="text-gray-500 italic">$0</span>'); // Comments
    html = html.replace(/\b(\d+)\b/g, '<span class="text-[#d2a8ff]">$1</span>'); // Numbers

    return html;
};

const CodeProfile = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [activeTab, setActiveTab] = useState('profile.tsx');
    const [isCopied, setIsCopied] = useState(false);
    const { scrollY } = useScroll();
    const [charIndex, setCharIndex] = useState(0);

    // Pre-calculate highlighted lines once to save CPU
    const highlightedCodeLines = useMemo(() => {
        return FULL_CODE.split('\n').map(line => getHighlightedText(line));
    }, []);

    const handleCopy = () => {
        navigator.clipboard.writeText(FULL_CODE);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (latest > 100) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    });

    useEffect(() => {
        if (!isVisible) return;

        let timeout;
        const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

        if (charIndex < FULL_CODE.length) {
            timeout = setTimeout(() => {
                setCharIndex(prev => prev + (isMobile ? 5 : 1));
            }, isMobile ? 60 : 30 + Math.random() * 40);
        } else {
            timeout = setTimeout(() => {
                setCharIndex(0);
            }, 4000);
        }

        return () => clearTimeout(timeout);
    }, [charIndex, isVisible]);

    // Calculate which lines and how much of each line to show
    const currentLines = useMemo(() => {
        const textSoFar = FULL_CODE.substring(0, charIndex);
        const linesNames = textSoFar.split('\n');
        return linesNames.map((lineText, i) => {
            // If it's a fully typed line, use the pre-highlighted version
            if (i < linesNames.length - 1) {
                return highlightedCodeLines[i];
            }
            // If it's the current line, highlight just its typed part
            return getHighlightedText(lineText);
        });
    }, [charIndex, highlightedCodeLines]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    key="code-profile-window"
                    initial={{ opacity: 0, scale: 0.9, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 50 }}
                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                    className="relative mt-12 z-40 w-full max-w-lg mx-auto block text-left font-[Inter]"
                >
                    <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur-2xl opacity-20 animate-pulse hidden md:block"></div>

                    <div className={styles.window}>
                        <div className={styles.header}>
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-[#ff5f56] shadow-[0_0_8px_rgba(255,95,86,0.3)]"></div>
                                <div className="w-3 h-3 rounded-full bg-[#ffbd2e] shadow-[0_0_8px_rgba(255,189,46,0.3)]"></div>
                                <div className="w-3 h-3 rounded-full bg-[#27c93f] shadow-[0_0_8px_rgba(39,201,63,0.3)]"></div>
                            </div>

                            <div className="flex-1 flex px-4 ml-4">
                                <button
                                    onClick={() => setActiveTab('profile.tsx')}
                                    className={`px-4 py-1.5 text-[10px] uppercase tracking-widest font-bold border-b-2 transition-colors duration-300 ${activeTab === 'profile.tsx' ? 'border-blue-500 text-blue-400 bg-[#1d242e]' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
                                >
                                    profile.tsx
                                </button>
                                <button
                                    onClick={() => setActiveTab('skills.json')}
                                    className={`px-4 py-1.5 text-[10px] uppercase tracking-widest font-bold border-b-2 transition-colors duration-300 ${activeTab === 'skills.json' ? 'border-blue-500 text-blue-400 bg-[#1d242e]' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
                                >
                                    skills.json
                                </button>
                            </div>

                            <button
                                onClick={handleCopy}
                                className="text-gray-500 hover:text-blue-400 transition-colors p-1 rounded-md hover:bg-white/5 active:scale-90"
                                title="Copy code"
                            >
                                {isCopied ? <span className="text-[10px] text-emerald-400 font-bold">COPIED!</span> : <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>}
                            </button>
                        </div>

                        <div className="p-6 overflow-hidden h-[340px] md:h-[380px] bg-[#0d1117]/80 backdrop-blur-sm">
                            <div className="font-mono text-xs md:text-sm leading-relaxed text-[#c9d1d9] select-text">
                                {currentLines.map((lineHtml, i) => (
                                    <div className="flex group/line hover:bg-white/5 transition-colors duration-200" key={i}>
                                        <span className={`${styles.lineNum} group-hover/line:text-gray-400 transition-colors`}>{i + 1}</span>
                                        <span
                                            className="whitespace-pre flex-1"
                                            dangerouslySetInnerHTML={{
                                                __html: lineHtml + (i === currentLines.length - 1 ? '<span class="animate-[pulse_1s_infinite] border-r-2 border-blue-500 ml-[1px]"></span>' : '')
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CodeProfile;

