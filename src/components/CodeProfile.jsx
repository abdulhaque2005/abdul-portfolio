import React, { useState, useEffect } from 'react';
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

    html = html.replace(/('[^']*')|('[^']*$)/g, '<span class="text-[#a5d6ff]">$1$2</span>');
    html = html.replace(/\b(const|function|return|this|true)\b/g, '<span class="text-[#ff7b72]">$1</span>');
    html = html.replace(/\b(developer)\b/g, '<span class="text-[#d2a8ff]">$1</span>');
    html = html.replace(/([a-zA-Z0-9_]+)(?=:)/g, '<span class="text-[#7ee787]">$1</span>');
    html = html.replace(/\b(length)\b/g, '<span class="text-[#79c0ff]">$1</span>');

    return html;
};

const CodeProfile = () => {
    const [isVisible, setIsVisible] = useState(false);
    const { scrollY } = useScroll();

    const [charIndex, setCharIndex] = useState(0);

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
                setCharIndex(prev => prev + (isMobile ? 3 : 1));
            }, isMobile ? 80 : 30 + Math.random() * 40);
        } else {
            timeout = setTimeout(() => {
                setCharIndex(0);
            }, 4000);
        }

        return () => clearTimeout(timeout);
    }, [charIndex, isVisible]);

    const displayedText = FULL_CODE.substring(0, Math.max(0, charIndex));
    const lines = displayedText.split('\n');

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    key="code-profile-window"
                    initial={{ opacity: 0, scale: 0.9, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 50 }}
                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                    className="relative mt-12 z-40 w-full max-w-lg mx-auto block text-left"
                >
                    <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur-2xl opacity-20 animate-pulse"></div>

                    <div className={styles.window}>
                        <div className={styles.header}>
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]/50"></div>
                                <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]/50"></div>
                                <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]/50"></div>
                            </div>
                            <div className="flex-1 text-center pr-8">
                                <span className="text-xs font-mono text-gray-400">profile.tsx</span>
                            </div>
                        </div>

                        <div className="p-6 overflow-x-auto h-[320px] md:h-[360px]">
                            <div className="font-mono text-xs md:text-sm leading-relaxed text-[#c9d1d9] select-text">
                                {lines.map((line, i) => (
                                    <div className="flex" key={i}>
                                        <span className={styles.lineNum}>{i + 1}</span>
                                        <span
                                            className="whitespace-pre flex-1"
                                            dangerouslySetInnerHTML={{
                                                __html: getHighlightedText(line) + (i === lines.length - 1 ? '<span class="animate-pulse border-r-2 border-white ml-[1px]"></span>' : '')
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
