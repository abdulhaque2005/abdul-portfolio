import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';
import { Send, Mail, MapPin, Phone, Github, Linkedin, Youtube, Copy, Check, Sparkles, Code } from 'lucide-react';
import Magnetic from './Magnetic';

const Contact = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [copiedEmail, setCopiedEmail] = useState(false);
    const [copiedPhone, setCopiedPhone] = useState(false);
    const [currentTime, setCurrentTime] = useState("");

    const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

    useEffect(() => {
        const updateTime = () => {
            const timeString = new Date().toLocaleTimeString('en-US', {
                timeZone: 'Asia/Kolkata',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true,
            });
            setCurrentTime(`${timeString} IST`);
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleFormMouseMove = ({ currentTarget, clientX, clientY }) => {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(async () => {
            try {
                const data = new FormData();
                data.append("Name", formData.name);
                data.append("Email", formData.email);
                data.append("Subject", formData.subject);
                data.append("Message", formData.message);

                data.append("_subject", formData.subject ? `[Portfolio] ${formData.subject}` : "New Portfolio Submission!");
                data.append("_replyto", formData.email);
                data.append("_template", "box");

                await fetch("https://formsubmit.co/ajax/be9c439f7f52be21755d579565984970", {
                    method: "POST",
                    body: data,
                    headers: { 'Accept': 'application/json' }
                });

                setIsSuccess(true);
                setFormData({ name: "", email: "", subject: "", message: "" });
                setTimeout(() => setIsSuccess(false), 5000);
            } catch (error) {
                console.error(error);
            } finally {
                setIsSubmitting(false);
            }
        }, 1500);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText("abdulhaque4171@gmail.com");
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
    };

    const copyPhoneToClipboard = () => {
        navigator.clipboard.writeText("+91 7870929584");
        setCopiedPhone(true);
        setTimeout(() => setCopiedPhone(false), 2000);
    };

    const use3DTilt = () => {
        const x = useMotionValue(0);
        const y = useMotionValue(0);
        const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
        const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

        const handleMouseMove = (e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const width = rect.width;
            const height = rect.height;
            const mouseXFromCenter = e.clientX - rect.left - width / 2;
            const mouseYFromCenter = e.clientY - rect.top - height / 2;
            x.set(mouseXFromCenter / 25);
            y.set(mouseYFromCenter / 25);
        };

        const handleMouseLeave = () => {
            x.set(0);
            y.set(0);
        };

        return { handleMouseMove, handleMouseLeave, style: { rotateX: useTransform(mouseY, (value) => value * -1), rotateY: mouseX } };
    };

    const tiltProps = use3DTilt();

    return (
        <section id="contact" className="py-20 relative overflow-hidden transition-colors duration-300" style={{ backgroundColor: 'var(--bg-color)' }}>

            <div className="absolute inset-0 opacity-40 pointer-events-none hidden md:block">
                <div className="absolute -top-[30%] -left-[10%] w-[70vw] h-[70vw] bg-purple-500/20 rounded-full blur-[60px] md:blur-[120px] animate-pulse" />
                <div className="absolute top-[20%] -right-[10%] w-[60vw] h-[60vw] bg-blue-500/20 rounded-full blur-[60px] md:blur-[120px] animate-pulse delay-1000" />
                <div className="absolute -bottom-[20%] left-[20%] w-[50vw] h-[50vw] bg-pink-500/10 rounded-full blur-[60px] md:blur-[120px] animate-pulse delay-2000" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-block mb-4 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-500 text-sm font-bold tracking-wide uppercase shadow-[0_0_10px_rgba(59,130,246,0.2)]"
                    >
                        Contact Me
                    </motion.div>
                    <h2 className="text-5xl md:text-7xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                        Let's Work Together
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 max-w-6xl mx-auto">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="md:col-span-2 md:row-span-2 relative group rounded-[24px] overflow-hidden border"
                        style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}
                        onMouseMove={handleFormMouseMove}
                    >
                        <motion.div
                            className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition duration-300"
                            style={{
                                background: useMotionTemplate`
                                    radial-gradient(
                                        650px circle at ${mouseX}px ${mouseY}px,
                                        rgba(59, 130, 246, 0.15),
                                        transparent 80%
                                    )
                                `
                            }}
                        />

                        <motion.div
                            className="pointer-events-none absolute -inset-px rounded-[24px] opacity-0 group-hover:opacity-100 transition duration-300"
                            style={{
                                background: useMotionTemplate`
                                    radial-gradient(
                                        600px circle at ${mouseX}px ${mouseY}px,
                                        rgba(59, 130, 246, 0.4),
                                        transparent 40%
                                    )
                                `,
                                maskImage: 'linear-gradient(black, black)',
                                WebkitMaskImage: 'linear-gradient(black, black)',
                                maskComposite: 'exclude',
                                WebkitMaskComposite: 'xor',
                                padding: '1px',
                            }}
                        />

                        <div className="relative h-full p-6 md:p-8 flex flex-col backdrop-blur-sm rounded-[24px]">

                            <div className="absolute top-0 right-0 p-6 opacity-40 pointer-events-none group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
                                <Sparkles className="text-blue-400" size={56} strokeWidth={0.8} />
                            </div>

                            <div className="mb-6 relative z-10">
                                <h3 className="text-2xl font-bold mb-2 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                                    Send a Message
                                </h3>
                                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Got a project or proposal? Fill out the form.</p>
                            </div>

                            {isSuccess ? (
                                <div className="flex-1 flex flex-col items-center justify-center text-center h-full min-h-[300px]">
                                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center text-green-500 mb-6 animate-bounce shadow-[0_0_20px_rgba(34,197,94,0.5)] border border-green-500/30">
                                        <Check size={40} strokeWidth={3} />
                                    </div>
                                    <h4 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Received!</h4>
                                    <p style={{ color: 'var(--text-secondary)' }}>I'll get back to you shortly.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-4 relative z-10">

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="relative group/input">
                                            <input
                                                type="text"
                                                id="name-input"
                                                name="name"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                required
                                                placeholder=" "
                                                className="peer w-full rounded-2xl px-5 pt-6 pb-2 outline-none transition-all duration-300 border-2 hover:border-blue-500/30 focus:border-blue-500 focus:bg-blue-500/5 focus:shadow-[0_0_30px_rgba(59,130,246,0.15)] bg-transparent"
                                                style={{ color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}
                                            />
                                            <label htmlFor="name-input" className="absolute left-5 top-4 text-xs font-semibold uppercase tracking-wider transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-placeholder-shown:font-normal peer-focus:top-4 peer-focus:-translate-y-2 peer-focus:text-xs peer-focus:font-semibold peer-focus:text-blue-500 pointer-events-none" style={{ color: 'var(--text-secondary)' }}>
                                                Name
                                            </label>
                                        </div>
                                        <div className="relative group/input">
                                            <input
                                                type="email"
                                                id="email-input"
                                                name="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                required
                                                placeholder=" "
                                                className="peer w-full rounded-2xl px-5 pt-6 pb-2 outline-none transition-all duration-300 border-2 hover:border-blue-500/30 focus:border-blue-500 focus:bg-blue-500/5 focus:shadow-[0_0_30px_rgba(59,130,246,0.15)] bg-transparent"
                                                style={{ color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}
                                            />
                                            <label htmlFor="email-input" className="absolute left-5 top-4 text-xs font-semibold uppercase tracking-wider transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-placeholder-shown:font-normal peer-focus:top-4 peer-focus:-translate-y-2 peer-focus:text-xs peer-focus:font-semibold peer-focus:text-blue-500 pointer-events-none" style={{ color: 'var(--text-secondary)' }}>
                                                Email Address
                                            </label>
                                        </div>
                                    </div>

                                    <div className="relative group/input mt-2">
                                        <input
                                            type="text"
                                            id="subject-input"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                            required
                                            placeholder=" "
                                            className="peer w-full rounded-2xl px-5 pt-6 pb-2 outline-none transition-all duration-300 border-2 hover:border-blue-500/30 focus:border-blue-500 focus:bg-blue-500/5 focus:shadow-[0_0_30px_rgba(59,130,246,0.15)] bg-transparent"
                                            style={{ color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}
                                        />
                                        <label htmlFor="subject-input" className="absolute left-5 top-4 text-xs font-semibold uppercase tracking-wider transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-sm peer-placeholder-shown:font-normal peer-focus:top-4 peer-focus:-translate-y-2 peer-focus:text-xs peer-focus:font-semibold peer-focus:text-blue-500 pointer-events-none" style={{ color: 'var(--text-secondary)' }}>
                                            Subject / Project Type
                                        </label>
                                    </div>

                                    <div className="relative group/input flex-1 flex flex-col mt-2">
                                        <textarea
                                            id="message-input"
                                            name="message"
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            required
                                            placeholder=" "
                                            className="peer w-full rounded-2xl px-5 pt-8 pb-4 outline-none transition-all duration-300 border-2 hover:border-blue-500/30 focus:border-blue-500 focus:bg-blue-500/5 focus:shadow-[0_0_30px_rgba(59,130,246,0.15)] resize-none flex-1 min-h-[140px] bg-transparent"
                                            style={{ color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}
                                        ></textarea>
                                        <label htmlFor="message-input" className="absolute left-5 top-6 text-xs font-semibold uppercase tracking-wider transition-all duration-300 peer-placeholder-shown:top-8 peer-placeholder-shown:text-sm peer-placeholder-shown:font-normal peer-focus:top-3 peer-focus:text-xs peer-focus:font-semibold peer-focus:text-blue-500 pointer-events-none" style={{ color: 'var(--text-secondary)' }}>
                                            How can I help you?
                                        </label>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-black text-lg rounded-2xl mt-4 hover:shadow-[0_0_40px_rgba(168,85,247,0.4)] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 group relative overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></div>
                                        <span className="relative z-10 flex items-center gap-2 drop-shadow-md">
                                            {isSubmitting ? 'Sending...' : 'Send Message'}
                                            <Send size={20} className="group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:scale-110 transition-all duration-300" />
                                        </span>
                                    </button>
                                </form>
                            )}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="md:col-span-2 md:row-span-1 rounded-[24px] border p-6 flex flex-col justify-between relative overflow-hidden group transition-colors"
                        style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}
                    >
                        <div className="absolute top-0 right-0 p-32 bg-purple-600/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-purple-600/30 transition-colors"></div>

                        <div className="flex justify-between items-start mb-4 relative z-10">
                            <div>
                                <h3 className="text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Connect</h3>
                                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Socials & Direct Line.</p>
                            </div>
                            <div className="hidden md:flex items-center gap-1 rounded-full border p-1" style={{ backgroundColor: 'var(--bg-color)', borderColor: 'var(--border-color)' }}>
                                <a href="tel:7870929584" className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-green-500/10 transition-all text-green-500">
                                    <Phone size={14} /> Call
                                </a>
                                <div className="w-px h-4 bg-gray-500/30 mx-1"></div>
                                <button onClick={copyPhoneToClipboard} className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-blue-500/10 hover:text-blue-500 transition-all" style={{ color: 'var(--text-secondary)' }}>
                                    {copiedPhone ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                                    <span className={copiedPhone ? "text-green-500" : ""}>{copiedPhone ? 'Copied' : '+91 7870929584'}</span>
                                </button>
                            </div>
                        </div>

                        <div className="flex gap-3 mt-auto relative z-10 w-full">
                            <Magnetic className="flex-1">
                                <a href="https://github.com/abdulhaque2005" target="_blank" className="w-full h-20 rounded-2xl flex flex-col items-center justify-center gap-1 hover:scale-105 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(255,255,255,0.1)] transition-all duration-300 border group/icon block" style={{ backgroundColor: 'var(--bg-color)', borderColor: 'var(--border-color)' }}>
                                    <Github size={24} className="text-gray-500 group-hover/icon:text-black dark:group-hover/icon:text-white transition-colors mx-auto" />
                                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1 text-center block w-full">Github</span>
                                </a>
                            </Magnetic>
                            <Magnetic className="flex-1">
                                <a href="https://www.linkedin.com/in/abdul-haque-a08150398" target="_blank" className="w-full h-20 rounded-2xl flex flex-col items-center justify-center gap-1 hover:scale-105 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(37,99,235,0.2)] transition-all duration-300 border group/icon block" style={{ backgroundColor: 'var(--bg-color)', borderColor: 'var(--border-color)' }}>
                                    <Linkedin size={24} className="text-gray-500 group-hover/icon:text-blue-600 transition-colors mx-auto" />
                                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1 text-center block w-full">LinkedIn</span>
                                </a>
                            </Magnetic>
                            <Magnetic className="flex-1">
                                <a href="https://www.youtube.com/@01_sigma_boy" target="_blank" className="w-full h-20 rounded-2xl flex flex-col items-center justify-center gap-1 hover:scale-105 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(220,38,38,0.2)] transition-all duration-300 border group/icon block" style={{ backgroundColor: 'var(--bg-color)', borderColor: 'var(--border-color)' }}>
                                    <Youtube size={24} className="text-gray-500 group-hover/icon:text-red-600 transition-colors mx-auto" />
                                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1 text-center block w-full">YouTube</span>
                                </a>
                            </Magnetic>
                            <Magnetic className="flex-1">
                                <a href="https://leetcode.com/u/pDjnXUuCp8/" target="_blank" className="w-full h-20 rounded-2xl flex flex-col items-center justify-center gap-1 hover:scale-105 hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(234,179,8,0.2)] transition-all duration-300 border group/icon block" style={{ backgroundColor: 'var(--bg-color)', borderColor: 'var(--border-color)' }}>
                                    <Code size={24} className="text-gray-500 group-hover/icon:text-yellow-500 transition-colors mx-auto" />
                                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1 text-center block w-full">LeetCode</span>
                                </a>
                            </Magnetic>
                        </div>
                        <div className="md:hidden mt-3 flex items-center justify-between gap-1 w-full p-1 rounded-xl border" style={{ backgroundColor: 'var(--bg-color)', borderColor: 'var(--border-color)' }}>
                            <a href="tel:7870929584" className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium text-green-500 hover:bg-green-500/10 transition-all">
                                <Phone size={16} /> Call
                            </a>
                            <div className="w-px h-6 bg-gray-500/30"></div>
                            <button onClick={copyPhoneToClipboard} className="flex-[1.5] flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium hover:bg-blue-500/10 hover:text-blue-500 transition-all" style={{ color: 'var(--text-secondary)' }}>
                                {copiedPhone ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                                <span className={copiedPhone ? "text-green-500" : ""}>{copiedPhone ? 'Copied!' : '+91 7870929584'}</span>
                            </button>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        onClick={copyToClipboard}
                        className="md:col-span-1 md:row-span-1 rounded-[24px] p-6 flex flex-col justify-between cursor-pointer hover:-translate-y-2 transition-transform relative overflow-hidden group border shadow-xl hover:shadow-blue-500/20"
                        style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}
                    >
                        <div className="absolute right-0 top-0 w-32 h-32 bg-blue-500/10 rounded-full blur-[40px] group-hover:bg-blue-500/30 transition-colors"></div>

                        <div className="relative z-10">
                            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 border shadow-inner group-hover:scale-110 transition-transform" style={{ backgroundColor: 'var(--bg-color)', borderColor: 'var(--border-color)' }}>
                                <Mail size={24} className="text-blue-500 group-hover:text-purple-500 transition-colors" />
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold leading-tight break-all" style={{ color: 'var(--text-primary)' }}>
                                abdulhaque
                                <span style={{ color: 'var(--text-secondary)' }} className="text-sm block mt-1">4171@gmail.com</span>
                            </h3>
                        </div>
                        <div className="relative z-10 flex items-center gap-2 text-xs font-bold uppercase tracking-widest mt-6 group-hover:text-blue-500 transition-colors" style={{ color: 'var(--text-secondary)' }}>
                            {copiedEmail ? <><Check size={14} className="text-green-500" /> <span className="text-green-500">Copied</span></> : <><Copy size={14} /> Copy Address</>}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        onMouseMove={tiltProps.handleMouseMove}
                        onMouseLeave={tiltProps.handleMouseLeave}
                        style={{ ...tiltProps.style, backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}
                        className="md:col-span-1 md:row-span-1 rounded-[24px] border p-6 flex flex-col items-center justify-center text-center relative overflow-hidden group hover:border-purple-500/30 transition-colors"
                    >
                        <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, var(--text-secondary) 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/30 transition-colors duration-500"></div>

                        <div className="relative z-10 w-full flex flex-col items-center">
                            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-5 border shadow-[0_0_20px_rgba(168,85,247,0.15)] group-hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] mx-auto group-hover:scale-110 transition-all duration-500 bg-gradient-to-br from-[var(--bg-color)] to-[var(--card-bg)]" style={{ borderColor: 'var(--border-color)' }}>
                                <MapPin size={28} className="text-purple-500 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                            </div>

                            <h3 className="text-2xl font-black tracking-wide" style={{ color: 'var(--text-primary)' }}>INDIA</h3>

                            <div className="mt-4 flex flex-col w-full gap-2">
                                <div className="flex items-center justify-between w-full px-4 py-2 rounded-xl backdrop-blur-md border border-white/5 bg-black/5" style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}>
                                    <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-secondary)' }}>Local Time</span>
                                    <span className="text-xs font-mono font-bold text-blue-400">{currentTime}</span>
                                </div>
                                <div className="flex items-center justify-between w-full px-4 py-2 rounded-xl backdrop-blur-md border border-white/5 bg-black/5" style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}>
                                    <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-secondary)' }}>Status</span>
                                    <span className="flex items-center gap-1.5 text-xs font-bold text-green-500">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                        </span>
                                        AVAILABLE
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};



export default Contact;
