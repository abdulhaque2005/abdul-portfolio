import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, ChevronDown, Sparkles, RotateCcw } from 'lucide-react';

// ─── System Prompt with Abdul's Full Portfolio Context ──────────────────────────
const SYSTEM_PROMPT = `You are **AH Assistant** — the personal AI assistant embedded in Abdul Haque's portfolio website.

## WHO IS ABDUL HAQUE
- **Full Name:** Abdul Haque
- **Title:** Full Stack Architect & Computer Science Engineer
- **Philosophy:** "I don't just build apps. I architect immersive digital experiences that define the future."
- **Motto:** "Every line of code is a conscious step towards digital perfection."
- **Foundation:** Built on C/C++ logic — approaches development with a computational mind, optimizing algorithms and solving complex problems with high-precision logic.
- **Stack Mastery:** Combines competitive programming intuition with the MERN Stack (MongoDB, Express.js, React.js, Node.js) to build scalable, high-performance systems.

## EDUCATION
1. **Bachelor of Engineering (CSE)** — Swaminarayan University | 2025 - Present | CGPA: 9.00 (Specializing in System Architecture)
2. **Intermediate (+2 Science)** — +2 LBBS High School Palasi | 2023 - 2025 | Score: 85% (Physics, Chemistry, Maths)
3. **Matriculation (10th)** — +2 LBBS High School Palasi | 2022 - 2023 | Score: 73%

## TECHNICAL SKILLS
- **Logic Core:** C, C++ (Algorithms & Optimization, OOP, Data Structures)
- **Frontend:** React.js, HTML5, CSS3, Tailwind CSS, Framer Motion, Responsive Design
- **Backend:** Node.js, Express.js (REST APIs)
- **Database:** MongoDB
- **DevOps/Tools:** Git, GitHub, Postman, Vercel, Render
- **Design:** UI/UX Architecture, Modern Responsive Design
- **Other:** JavaScript (ES6+), TypeScript basics

## PROJECTS (with live links)
1. **StockPilot** — Full-stack MERN trading dashboard inspired by Zerodha with real-time watchlists, portfolio management, and secure authentication. [TypeScript, React, Node.js, MongoDB] → https://stockpilot-abdul7.vercel.app/login
2. **VectorMinds** — AI-powered currency arbitration platform for freelancers with real-time exchange rates, analytics, AI forecasts, and a financial simulator. [React, Vite, AI, API] → https://vector-minds.vercel.app/
3. **Mealawe Clone** — Functional clone of the Mealawe food platform with user-friendly navigation and responsive design. [HTML, CSS] → https://mealawe-9b7udy2ko-abdul7.vercel.app/
4. **Razer Website Clone** — High-fidelity clone of the Razer gaming website with dark mode aesthetics. [HTML, CSS] → https://razer-website-1avbtm69x-abdul7.vercel.app/
5. **Ethena Clone** — Pixel-perfect recreation of Ethena platform with modern UI/UX and smooth transitions. [HTML, CSS, Animation] → https://ethena-clone1-cmxl224lm-abdul7.vercel.app/
6. **Calculator App** — Sleek functional calculator. [React, CSS, JS] → https://calculator-abdul7.vercel.app/
7. **Todo Master** — Efficient task management application. [React, CSS, JS] → https://todoapp-project-p85bq6j4n-abdul7.vercel.app/
8. **Currency Converter** — Real-time currency exchange rate calculator. [HTML, CSS, JS, API] → https://convertrate23.netlify.app/convert_currn/currency/

## GAMES (with live links)
1. **Typing Master** — Speed typing test game → https://typing-test-abdul7.vercel.app/
2. **Counter Game** — Interactive 3D counter app → https://counter-game-pfcffxc2q-abdul7.vercel.app/
3. **Color Pick Game** — Hex code color guessing game → https://colour-game-one.vercel.app/

## CERTIFICATES
1. **HTML, CSS & JavaScript** — Issued by HRCalcy (29 Dec 2025)
2. **ReactJS for Beginners** — Issued by Simplilearn (3 Feb 2026)
3. **Python Interview Ready** — Issued by Simplilearn (3 Feb 2026)

## CONTACT INFO
- **Email:** abdulhaque4171@gmail.com
- **Phone:** +91 7870929584
- **Location:** Kalol, Gujarat (Originally from Bihar, India)
- **LinkedIn:** https://www.linkedin.com/in/abdul-haque-a08150398
- **GitHub:** https://github.com/abdulhaque2005
- **LeetCode:** https://leetcode.com/u/pDjnXUuCp8/

## YOUR BEHAVIOR RULES
1. You are AH Assistant — Abdul Haque's portfolio bot. Always answer as if you're representing Abdul.
2. If the user asks in Hindi/Hinglish, respond in Hindi/Hinglish. If in English, respond in English.
3. Be friendly, professional, and conversational. Use emojis sparingly but effectively.
4. For questions about Abdul, answer from the context above. Be specific with numbers, links, and details.
5. For general programming/tech questions, or completely unrelated questions (like cooking, politics, general knowledge, math, science, life advice, etc.), you MUST answer it accurately and fully to the best of your ability. 
6. After answering unrelated questions, you can optionally, gently steer the conversation back to Abdul's work if it feels natural, but the priority is ALWAYS to provide a helpful and complete answer to whatever the user actually asked. DO NOT refuse to answer just because it's not about Abdul.
7. Keep responses concise but informative. Use markdown formatting (**bold**, bullet points) for readability.
8. When sharing project links, always include them as clickable links.
9. If someone asks "who made you" or "who built you" — say Abdul Haque built this entire portfolio and the AI assistant within it.
10. Be enthusiastic about Abdul's achievements — he's a talented developer!
11. NEVER make up information about Abdul that isn't in the context above.
12. For resume/CV download — tell them to click the "Download Resume" button on the Hero section of the portfolio.`;

async function callGemini(messages) {
    const apiKeysString = import.meta.env.VITE_GEMINI_API_KEY;

    if (!apiKeysString || apiKeysString === 'YOUR_GEMINI_API_KEY_HERE') {
        return '⚠️ AI is not configured yet. The portfolio owner needs to add a Gemini API key. In the meantime, try asking about **skills**, **projects**, **education**, or **contact**!';
    }

    // Support multiple keys separated by commas to avoid rate limits
    const apiKeys = apiKeysString.split(',').map(k => k.trim()).filter(k => k);
    if (apiKeys.length === 0) {
        return '⚠️ Invalid API Key configuration.';
    }

    const contents = [];

    // Add conversation history
    for (const msg of messages) {
        contents.push({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.text }]
        });
    }

    const models = ['gemini-2.5-flash', 'gemini-2.0-flash'];
    let lastError = null;
    let authFail = false;

    // Try each key
    for (const apiKey of apiKeys) {
        // Try each model with the current key
        for (const model of models) {
            try {
                const res = await fetch(
                    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            system_instruction: {
                                parts: [{ text: SYSTEM_PROMPT }]
                            },
                            contents,
                            generationConfig: {
                                temperature: 0.7,
                                topP: 0.9,
                                topK: 40,
                                maxOutputTokens: 800,
                            },
                            safetySettings: [
                                { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
                                { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
                                { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
                                { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
                            ]
                        }),
                    }
                );

                if (res.status === 429) {
                    lastError = 'rate_limit';
                    continue; // Try next model, or if models exhausted, next key
                }
                
                if (res.status === 400 || res.status === 403) {
                    authFail = true;
                    lastError = 'auth';
                    // Don't break completely, maybe just this key is bad. Try next key.
                    break; 
                }

                if (!res.ok) {
                    const errData = await res.json().catch(() => ({}));
                    console.error(`Gemini API Error (${model} with key ${apiKey.substring(0, 5)}...):`, errData);
                    lastError = 'api_error';
                    continue; 
                }

                const data = await res.json();
                const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

                if (!text) {
                    return "🤔 I couldn't generate a response. Please try rephrasing your question!";
                }

                return text;
            } catch (fetchErr) {
                console.error(`Error with model ${model}:`, fetchErr);
                lastError = 'network';
                continue;
            }
        }
    }

    if (lastError === 'rate_limit') {
        return getLocalFallbackResponse(messages[messages.length - 1].text);
    }
    if (authFail) return '⚠️ API Key is invalid or restricted. Please check your Gemini API key.';
    
    return '😅 Oops, something went wrong with the AI API. Please try again in a moment!';
}

// ─── Local Fallback Logic (When API is rate-limited) ─────────────────────────
function getLocalFallbackResponse(userText) {
    const text = userText.toLowerCase();
    
    if (text.includes('hi') || text.includes('hello') || text.includes('hey') || text.includes('namaste') || text.includes('haal')) {
        return "👋 Hey! I'm AH Assistant. The AI servers are slightly busy right now due to high traffic, but I can still tell you about Abdul's **Skills**, **Projects**, **Education**, or **Contact info**! What would you like to know?";
    }
    
    if (text.includes('skill') || text.includes('tech') || text.includes('stack')) {
        return "💻 **Abdul's Core Skills:**\n- **Logic Core:** C, C++ (Algorithms & Optimization)\n- **Frontend:** React.js, HTML5, CSS3, Tailwind CSS, Framer Motion\n- **Backend:** Node.js, Express.js\n- **Database:** MongoDB\n- **Tools:** Git, GitHub, Vercel, Postman\n\nHe is a MERN Stack Enthusiast built on strong C/C++ logic! 🚀";
    }
    
    if (text.includes('project') || text.includes('work') || text.includes('build')) {
        return "🚀 **Key Projects:**\n1. **StockPilot**: Full-stack MERN trading dashboard inspired by Zerodha.\n2. **VectorMinds**: AI-powered currency arbitration platform for freelancers.\n3. **Clones**: High-fidelity clones of Razer, Ethena, and Mealawe.\n\nYou can see them live in the Projects section above!";
    }
    
    if (text.includes('education') || text.includes('study') || text.includes('college') || text.includes('degree')) {
        return "📚 **Education:**\n- **B.E. (Computer Science)** — Swaminarayan University (2025 - Present) | CGPA: 9.00\n- **Intermediate (+2 Science)** — Score: 85%\n- **Matriculation (10th)** — Score: 73%\n\nCurrently specializing in System Architecture.";
    }
    
    if (text.includes('contact') || text.includes('email') || text.includes('phone') || text.includes('hire') || text.includes('reach')) {
        return "📬 **Contact Info:**\n- **Email:** abdulhaque4171@gmail.com\n- **Phone:** +91 7870929584\n- **LinkedIn:** [Abdul Haque](https://www.linkedin.com/in/abdul-haque-a08150398)\n- **GitHub:** [abdulhaque2005](https://github.com/abdulhaque2005)\n\nFeel free to reach out for collaborations! ⚡";
    }
    
    if (text.includes('resume') || text.includes('cv')) {
        return "📄 You can download Abdul's Resume by clicking the **Download Resume** button in the Hero section at the top of the page!";
    }

    return "🤖 **Notice:** The AI servers are currently hitting free-tier rate limits (too many requests!).\n\nWhile we wait for the servers to cool down, I can still tell you about Abdul's:\n- **Skills**\n- **Projects**\n- **Education**\n- **Contact Info**\n\nJust tap a quick reply or ask about these topics!";
}

// ─── Format Message (Markdown → HTML) ─────────────────────────────────────────
function formatMessage(text) {
    let f = text;
    // Code blocks
    f = f.replace(/```[\w]*\n?([\s\S]*?)```/g, '<pre style="background:rgba(0,0,0,0.4);border:1px solid rgba(0,255,204,0.15);border-radius:8px;padding:10px;font-family:monospace;font-size:0.78rem;overflow-x:auto;color:#a5f3fc;margin:6px 0;line-height:1.5;">$1</pre>');
    // Inline code
    f = f.replace(/`([^`]+)`/g, '<code style="background:rgba(0,255,204,0.1);padding:1px 5px;border-radius:4px;font-family:monospace;font-size:0.9em;color:#00ffcc;">$1</code>');
    // Bold
    f = f.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Italic
    f = f.replace(/\*(.*?)\*/g, '<em>$1</em>');
    // Links
    f = f.replace(/\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g, '<a href="$2" target="_blank" rel="noopener" style="color:#00ffcc;text-decoration:underline;">$1</a>');
    // Bare URLs
    f = f.replace(/(?<!\"|>)(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener" style="color:#00ffcc;text-decoration:underline;">$1</a>');
    // Line breaks
    f = f.replace(/\n/g, '<br/>');
    return f;
}

// ─── AH Logo ─────────────────────────────────────────────────────────────────
const AHLogo = ({ size = 28, style = {} }) => (
    <div style={{
        width: size, height: size, borderRadius: '50%',
        background: 'linear-gradient(135deg, #06b6d4, #7c3aed)', /* Cyan to Purple */
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
        boxShadow: '0 0 10px rgba(6, 182, 212, 0.5), inset 0 0 5px rgba(255, 255, 255, 0.4)',
        position: 'relative',
        ...style
    }}>
        <span style={{ 
            fontSize: size * 0.4, 
            fontWeight: 900, 
            color: '#fff', 
            fontFamily: 'Space Grotesk, sans-serif', 
            letterSpacing: '-0.5px', 
            lineHeight: 1,
            textShadow: '0 2px 4px rgba(0,0,0,0.5)'
        }}>AH</span>
    </div>
);

// ─── Quick Replies ────────────────────────────────────────────────────────────
const QUICK_REPLIES = ['About Abdul', 'Skills', 'Projects', 'Contact', 'Education'];

// ─── Main Component ───────────────────────────────────────────────────────────
const ChatBot = ({ theme = 'dark' }) => {
    const isDark = theme === 'dark';
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([{
        from: 'bot',
        text: `👋 Hey! I'm **AH Assistant** — Abdul Haque's AI-powered portfolio bot!\n\nI know everything about Abdul's skills, projects, education, and more. Ask me anything in **Hindi** or **English**! 🚀`,
        id: 0,
    }]);
    const [input, setInput] = useState('');
    const [typing, setTyping] = useState(false);
    const [conversationHistory, setConversationHistory] = useState([]);
    const bottomRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, typing]);
    useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 300); }, [open]);

    const sendMessage = async (text) => {
        const userText = (text || input).trim();
        if (!userText || typing) return;
        setInput('');

        // Add user message to UI
        setMessages(prev => [...prev, { from: 'user', text: userText, id: Date.now() }]);
        setTyping(true);

        // Build conversation history for context
        const newHistory = [...conversationHistory, { role: 'user', text: userText }];

        try {
            const reply = await callGemini(newHistory);

            // Update conversation history (keep last 20 messages for context window)
            const updatedHistory = [...newHistory, { role: 'model', text: reply }];
            if (updatedHistory.length > 20) {
                setConversationHistory(updatedHistory.slice(-20));
            } else {
                setConversationHistory(updatedHistory);
            }

            setTyping(false);
            setMessages(prev => [...prev, { from: 'bot', text: reply, id: Date.now() + 1 }]);
        } catch (err) {
            setTyping(false);
            setMessages(prev => [...prev, {
                from: 'bot',
                text: '😅 Something went wrong. Please try again!',
                id: Date.now() + 1
            }]);
        }
    };

    const resetChat = () => {
        setMessages([{
            from: 'bot',
            text: `👋 Chat reset! Ask me anything about Abdul — skills, projects, education, contact info — I'm here to help! 🚀`,
            id: Date.now(),
        }]);
        setConversationHistory([]);
    };

    return (
        <>
            {/* ── Floating Button ── */}
            <motion.button
                onClick={() => setOpen(o => !o)}
                style={{
                    position: 'fixed', bottom: 'clamp(20px, 4vh, 28px)', right: 'clamp(16px, 4vw, 28px)', zIndex: 9999,
                    width: 'clamp(50px, 12vw, 62px)', height: 'clamp(50px, 12vw, 62px)', borderRadius: '50%',
                    border: isDark ? '2px solid rgba(0,255,204,0.4)' : '2px solid rgba(20,184,166,0.5)',
                    cursor: 'pointer',
                    background: isDark ? 'linear-gradient(135deg, #06080d, #0f1a2e)' : 'linear-gradient(135deg, #f0fdfa, #ccfbf1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 0 0 0 rgba(0,255,204,0.4)',
                }}
                animate={{ boxShadow: open ? '0 0 0 4px rgba(0,255,204,0.25)' : ['0 0 0 0px rgba(0,255,204,0.5)', '0 0 0 14px rgba(0,255,204,0)', '0 0 0 0px rgba(0,255,204,0)'] }}
                transition={{ duration: 1.8, repeat: open ? 0 : Infinity }}
                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.93 }}
            >
                <AnimatePresence mode="wait">
                    {open
                        ? <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                            <ChevronDown size={26} color="#00ffcc" strokeWidth={2.5} />
                        </motion.span>
                        : <motion.span key="logo" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} transition={{ duration: 0.2 }}>
                            <Sparkles size={22} color="#00ffcc" />
                        </motion.span>
                    }
                </AnimatePresence>
            </motion.button>

            {/* ── Chat Window ── */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        key="chatwindow"
                        initial={{ opacity: 0, y: 30, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 30, scale: 0.95 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                        style={{
                            position: 'fixed', bottom: 'clamp(85px, 14vh, 104px)', right: 'clamp(16px, 4vw, 28px)', zIndex: 9998,
                            width: 'min(380px, calc(100vw - 32px))', maxHeight: 'min(600px, calc(100vh - 120px))',
                            borderRadius: 20, overflow: 'hidden',
                            display: 'flex', flexDirection: 'column',
                            background: isDark ? 'rgba(6,8,13,0.97)' : 'rgba(255,255,255,0.97)',
                            border: isDark ? '1px solid rgba(0,255,204,0.2)' : '1px solid rgba(0,255,204,0.5)',
                            boxShadow: isDark ? '0 0 40px rgba(0,255,204,0.1), 0 20px 60px rgba(0,0,0,0.7)' : '0 0 40px rgba(0,255,204,0.2), 0 20px 40px rgba(0,0,0,0.15)',
                            backdropFilter: 'blur(20px)',
                        }}
                    >
                        {/* Header */}
                        <div style={{ padding: '14px 16px', background: isDark ? 'linear-gradient(135deg,rgba(0,255,204,0.1),rgba(124,58,237,0.1))' : 'linear-gradient(135deg,rgba(0,255,204,0.3),rgba(124,58,237,0.15))', borderBottom: isDark ? '1px solid rgba(0,255,204,0.12)' : '1px solid rgba(0,255,204,0.3)', display: 'flex', alignItems: 'center', gap: 12 }}>
                            <AHLogo size={40} />
                            <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: 700, color: isDark ? '#fff' : '#111', fontSize: '0.95rem', fontFamily: 'Space Grotesk,sans-serif', display: 'flex', alignItems: 'center', gap: 6 }}>
                                    AH Assistant
                                    <span style={{ fontSize: '0.55rem', padding: '1px 6px', borderRadius: 20, background: 'linear-gradient(135deg,#00ffcc,#7c3aed)', color: '#000', fontWeight: 800, letterSpacing: '0.5px' }}>AI</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                    <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 6px #4ade80', display: 'inline-block' }} />
                                    <span style={{ fontSize: '0.71rem', color: '#6b7f96' }}>Powered by Gemini AI</span>
                                </div>
                            </div>
                            <button onClick={resetChat} title="Reset chat" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7f96', padding: 4, marginRight: 4 }}>
                                <RotateCcw size={16} />
                            </button>
                            <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7f96', padding: 4 }}>
                                <X size={18} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div style={{ flex: 1, overflowY: 'auto', padding: '14px 12px', display: 'flex', flexDirection: 'column', gap: 12, scrollbarWidth: 'thin', scrollbarColor: 'rgba(0,255,204,0.15) transparent' }}>
                            {messages.map(msg => (
                                <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.22 }}
                                    style={{ display: 'flex', justifyContent: msg.from === 'user' ? 'flex-end' : 'flex-start', alignItems: 'flex-end', gap: 8 }}>
                                    {msg.from === 'bot' && <AHLogo size={26} />}
                                    <div style={{
                                        maxWidth: '78%', padding: '10px 13px',
                                        borderRadius: msg.from === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                                        background: msg.from === 'user' ? 'linear-gradient(135deg,#00bfff,#7c3aed)' : (isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'),
                                        color: msg.from === 'user' ? '#fff' : (isDark ? '#d1d5db' : '#333'),
                                        fontSize: '0.82rem', lineHeight: 1.65, fontWeight: msg.from === 'user' ? 600 : 500,
                                        border: msg.from === 'bot' ? (isDark ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(0,0,0,0.08)') : 'none',
                                    }}
                                        dangerouslySetInnerHTML={{ __html: formatMessage(msg.text) }} />
                                </motion.div>
                            ))}

                            <AnimatePresence>
                                {typing && (
                                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <AHLogo size={26} />
                                        <div style={{ padding: '10px 14px', borderRadius: '18px 18px 18px 4px', background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)', border: isDark ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(0,0,0,0.08)', display: 'flex', gap: 5, alignItems: 'center' }}>
                                            {[0, 1, 2].map(i => (
                                                <motion.span key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: '#00ffcc', display: 'block' }}
                                                    animate={{ y: [0, -5, 0] }} transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.15 }} />
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            <div ref={bottomRef} />
                        </div>

                        {/* Quick Replies */}
                        <div style={{ padding: '8px 12px', display: 'flex', flexWrap: 'wrap', gap: 6, borderTop: isDark ? '1px solid rgba(255,255,255,0.04)' : '1px solid rgba(0,0,0,0.06)' }}>
                            {QUICK_REPLIES.map(qr => (
                                <button key={qr} onClick={() => sendMessage(qr)}
                                    style={{ padding: '4px 11px', borderRadius: 20, border: '1px solid rgba(0,255,204,0.28)', background: 'rgba(0,255,204,0.06)', color: '#00ffcc', fontSize: '0.71rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.18s' }}
                                    onMouseEnter={e => { e.target.style.background = 'rgba(0,255,204,0.18)'; e.target.style.borderColor = '#00ffcc'; }}
                                    onMouseLeave={e => { e.target.style.background = 'rgba(0,255,204,0.06)'; e.target.style.borderColor = 'rgba(0,255,204,0.28)'; }}
                                >{qr}</button>
                            ))}
                        </div>

                        {/* Input */}
                        <div style={{ padding: '10px 12px', borderTop: isDark ? '1px solid rgba(0,255,204,0.1)' : '1px solid rgba(0,255,204,0.3)', display: 'flex', gap: 10, alignItems: 'center' }}>
                            <input ref={inputRef} value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                                placeholder="Ask anything in Hindi or English..."
                                disabled={typing}
                                style={{ flex: 1, padding: '10px 14px', borderRadius: 12, background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)', border: isDark ? '1px solid rgba(0,255,204,0.18)' : '1px solid rgba(0,255,204,0.4)', color: isDark ? '#eef2f7' : '#111', fontSize: '1rem', outline: 'none', fontFamily: 'inherit', transition: 'border-color 0.2s', fontWeight: isDark ? 400 : 500, opacity: typing ? 0.5 : 1 }}
                                onFocus={e => e.target.style.borderColor = 'rgba(0,255,204,0.8)'}
                                onBlur={e => e.target.style.borderColor = isDark ? 'rgba(0,255,204,0.18)' : 'rgba(0,255,204,0.4)'} />
                            <motion.button onClick={() => sendMessage()} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.93 }}
                                disabled={typing}
                                style={{ width: 40, height: 40, borderRadius: 12, border: 'none', background: typing ? 'rgba(0,255,204,0.3)' : 'linear-gradient(135deg,#00ffcc,#7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: typing ? 'not-allowed' : 'pointer', flexShrink: 0 }}>
                                <Send size={16} color="#000" strokeWidth={2.5} />
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ChatBot;
