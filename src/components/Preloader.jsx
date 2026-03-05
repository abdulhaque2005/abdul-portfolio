import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = () => {
    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 1 }}
                exit={{
                    opacity: 0,
                    transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] }
                }}
                className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden"
            >
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000_90%)] z-10"></div>
                    <motion.div
                        className="absolute inset-[-50%] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 contrast-150"
                        animate={{ x: ["-10%", "10%"], y: ["-10%", "10%"] }}
                        transition={{ duration: 10, repeat: Infinity, repeatType: "mirror" }}
                    />
                    {[...Array(40)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute bg-white rounded-full"
                            style={{
                                width: Math.random() * 2 + 'px',
                                height: Math.random() * 2 + 'px',
                                top: Math.random() * 100 + '%',
                                left: Math.random() * 100 + '%',
                            }}
                            animate={{ opacity: [0, 0.8, 0] }}
                            transition={{ duration: Math.random() * 3 + 2, repeat: Infinity }}
                        />
                    ))}
                </div>

                <div className="relative z-10 flex flex-col items-center justify-center">

                    <div className="relative w-[600px] h-[600px] flex items-center justify-center">

                        {[...Array(12)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute top-1/2 left-1/2 w-[300px] h-[2px] bg-gradient-to-r from-transparent via-cyan-100 to-transparent origin-left opacity-30 blur-[1px]"
                                style={{ rotate: i * 30 }}
                                animate={{
                                    rotate: i * 30 + 360,
                                    scaleX: [1, 1.5, 1],
                                    opacity: [0.1, 0.4, 0.1]
                                }}
                                transition={{ duration: 20, ease: "linear", repeat: Infinity }}
                            />
                        ))}

                        <motion.div
                            className="absolute w-40 h-40 rounded-full shadow-[0_0_100px_rgba(255,255,255,0.5)] z-10"
                            style={{
                                background: "conic-gradient(from 0deg, transparent 0%, white 10%, transparent 20%, white 40%, transparent 50%, white 60%, transparent 80%, white 90%, transparent 100%)",
                                maskImage: "radial-gradient(circle, transparent 65%, black 70%)"
                            }}
                            animate={{ rotate: 360 }}
                            transition={{ duration: 10, ease: "linear", repeat: Infinity }}
                        />

                        <motion.div
                            className="absolute w-[280px] h-[280px] opacity-80 z-20"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 5, ease: "linear", repeat: Infinity }}
                        >
                            <div className="absolute top-0 left-1/2 w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_15px_cyan]"></div>
                        </motion.div>
                        <motion.div
                            className="absolute w-[340px] h-[340px] opacity-60 z-20"
                            animate={{ rotate: -360 }}
                            transition={{ duration: 7, ease: "linear", repeat: Infinity }}
                        >
                            <div className="absolute top-0 left-1/2 w-1 h-1 bg-white rounded-full shadow-[0_0_10px_white]"></div>
                        </motion.div>

                        <motion.div
                            className="absolute w-44 h-44 rounded-full border border-cyan-500/30 blur-sm z-0"
                            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <motion.div
                            className="absolute w-44 h-44 rounded-full border border-purple-500/30 blur-sm z-0"
                            animate={{ scale: [1.1, 1, 1.1], opacity: [0.3, 0.6, 0.3] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        />

                        <div className="absolute w-36 h-36 bg-black rounded-full z-20 flex items-center justify-center">
                            <div className="absolute inset-0 rounded-full shadow-[inset_0_0_40px_rgba(0,0,0,1)]"></div>

                            <motion.h1
                                className="relative z-30 text-5xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-400 to-slate-800"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 2, ease: "easeOut" }}
                            >
                                AH
                            </motion.h1>
                        </div>

                        <motion.div
                            className="absolute w-[150%] h-[1px] bg-gradient-to-r from-transparent via-blue-400 to-transparent blur-[2px] z-30"
                            initial={{ scaleX: 0, opacity: 0 }}
                            animate={{ scaleX: 1, opacity: 1, rotate: [0, 2, -2, 0] }}
                            transition={{ delay: 0.5, duration: 3, ease: "easeInOut", repeat: Infinity }}
                        />

                    </div>

                    <div className="absolute bottom-24 overflow-hidden flex flex-col items-center">
                        <motion.div
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            transition={{ delay: 1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                            className="flex flex-col items-center"
                        >
                            <span className="text-[10px] tracking-[1em] text-white/40 uppercase mb-2">Eclipse Sequence</span>
                            <span className="text-xl tracking-[0.2em] font-light text-white uppercase">Init Portfolio</span>
                        </motion.div>

                        <div className="flex gap-4 mt-6">
                            <motion.div
                                className="h-[1px] w-12 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
                                animate={{ scaleX: [0, 1, 0], opacity: [0, 1, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                            <div className="flex gap-1 text-[8px] text-cyan-500/50 font-mono tracking-widest">
                                <motion.span animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 0.2, repeat: Infinity }}>[1]</motion.span>
                                <motion.span animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 0.3, repeat: Infinity }}>[0]</motion.span>
                                <motion.span animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 0.4, repeat: Infinity }}>[1]</motion.span>
                            </div>
                            <motion.div
                                className="h-[1px] w-12 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
                                animate={{ scaleX: [0, 1, 0], opacity: [0, 1, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                        </div>
                    </div>

                    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
                        <motion.div
                            className="absolute font-mono text-cyan-500 text-[8px] sm:text-xs whitespace-pre select-none tracking-widest leading-relaxed break-all p-4"
                            initial={{ y: "100%" }}
                            animate={{ y: "-100%" }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        >
                            {`
Initializing neural link...
[OK] Core modules loaded.
[OK] Establishing secure connection.
> sys.mount("/dev/portfolio")
> Loading assets: [===================] 100%
[WARN] Unauthorized access detected.
> bypass_security()
[OK] Access granted.
Welcome, user.
Loading visual cortex...
MERN Stack protocols active.
C++ Backend nodes ready.
`
                            }
                        </motion.div>
                    </div>

                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default Preloader;
