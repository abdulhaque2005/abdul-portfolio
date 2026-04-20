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
1. **StreamVibe** — A premium dark-themed movie streaming platform UI designed in Figma, featuring cinematic hero sections, interactive movie carousels, IMDB ratings, and a sleek navigation system inspired by Netflix and Disney+. [Figma, UI/UX, Prototype, Design] → https://www.figma.com/proto/qr5DiegZeQnRjJwMYILjd5/Untitled
2. **Flight Booking UI** — A highly interactive flight booking UI/UX prototype in Figma featuring an end-to-end user flow from flight search to seat selection and checkout. [Figma, UI/UX, App Design] → https://www.figma.com/proto/5rG3z7Qj6ozOMFbUswTPmB/Untitled?node-id=7-1448
3. **Jollo Delivery App** — A premium, full-scale food delivery application prototype in Figma with engaging onboarding, dynamic browsing, interactive carts, and seamless checkout flows. [Figma, UI/UX, Design] → https://www.figma.com/proto/YdzumJt9YVmVzsVxQgGr3E/Untitled
4. **StockPilot** — Full-stack MERN trading dashboard inspired by Zerodha with real-time watchlists, portfolio management, and secure authentication. [TypeScript, React, Node.js, MongoDB] → https://stockpilot-abdul7.vercel.app/login
5. **VectorMinds** — AI-powered currency arbitration platform for freelancers with real-time exchange rates, analytics, AI forecasts, and a financial simulator. [React, Vite, AI, API] → https://vector-minds.vercel.app/
6. **Mealawe Clone** — Functional clone of the Mealawe food platform with user-friendly navigation and responsive design. [HTML, CSS] → https://mealawe-9b7udy2ko-abdul7.vercel.app/
7. **Razer Website Clone** — High-fidelity clone of the Razer gaming website with dark mode aesthetics. [HTML, CSS] → https://razer-website-1avbtm69x-abdul7.vercel.app/
8. **Ethena Clone** — Pixel-perfect recreation of Ethena platform with modern UI/UX and smooth transitions. [HTML, CSS, Animation] → https://ethena-clone1-cmxl224lm-abdul7.vercel.app/
9. **Calculator App** — Sleek functional calculator. [React, CSS, JS] → https://calculator-abdul7.vercel.app/
10. **Todo Master** — Efficient task management application. [React, CSS, JS] → https://todoapp-project-p85bq6j4n-abdul7.vercel.app/
11. **Currency Converter** — Real-time currency exchange rate calculator. [HTML, CSS, JS, API] → https://convertrate23.netlify.app/convert_currn/currency/

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
11. NEVER make up information about Abdul that isn't in the context above.`;

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


    return "🤖 **Notice:** The AI servers are currently hitting free-tier rate limits (too many requests!).\n\nWhile we wait for the servers to cool down, I can still tell you about Abdul's:\n- **Skills**\n- **Projects**\n- **Education**\n- **Contact Info**\n\nJust tap a quick reply or ask about these topics!";
}

// ─── Format Message (Markdown → HTML) ─────────────────────────────────────────
function formatMessage(text, isDark) {
    let f = text;
    
    const codeBg = isDark ? 'rgba(0,0,0,0.5)' : '#f1f5f9';
    const codeBorder = isDark ? 'rgba(0,255,204,0.15)' : '#e2e8f0';
    const codeColor = isDark ? '#a5f3fc' : '#0ea5e9';
    const inlineBg = isDark ? 'rgba(0,255,204,0.12)' : '#e0f2fe';
    const inlineColor = isDark ? '#00ffcc' : '#0284c7';
    const linkColor = isDark ? '#00ffcc' : '#0284c7';

    // Code blocks
    f = f.replace(/```[\w]*\n?([\s\S]*?)```/g, `<pre style="background:${codeBg};border:1px solid ${codeBorder};border-radius:8px;padding:12px;font-family:monospace;font-size:0.8rem;overflow-x:auto;color:${codeColor};margin:8px 0;line-height:1.6;box-shadow:inset 0 2px 4px rgba(0,0,0,0.05);">$1</pre>`);
    // Inline code
    f = f.replace(/`([^`]+)`/g, `<code style="background:${inlineBg};padding:2px 6px;border-radius:6px;font-family:monospace;font-size:0.85em;color:${inlineColor}; font-weight: 500;">$1</code>`);
    // Bold
    f = f.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Italic
    f = f.replace(/\*(.*?)\*/g, '<em>$1</em>');
    // Links
    f = f.replace(/\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g, `<a href="$2" target="_blank" rel="noopener" style="color:${linkColor};text-decoration:none;font-weight:600;border-bottom:1px solid ${linkColor};padding-bottom:1px;">$1</a>`);
    // Bare URLs
    f = f.replace(/(?<!\"|>)(https?:\/\/[^\s<]+)/g, `<a href="$1" target="_blank" rel="noopener" style="color:${linkColor};text-decoration:none;border-bottom:1px solid ${linkColor};">$1</a>`);
    // Line breaks
    f = f.replace(/\n/g, '<br/>');
    return f;
}

// ─── AH Logo ─────────────────────────────────────────────────────────────────
const AHLogo = ({ size = 28, isDark = true, style = {} }) => (
    <div style={{
        width: size, height: size, borderRadius: '50%',
        background: isDark ? 'linear-gradient(135deg, #06b6d4, #7c3aed)' : 'linear-gradient(135deg, #0284c7, #4f46e5)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
        boxShadow: isDark ? '0 0 12px rgba(6, 182, 212, 0.4)' : '0 4px 10px rgba(2, 132, 199, 0.3)',
        position: 'relative',
        ...style
    }}>
        <span style={{
            fontSize: size * 0.4,
            fontWeight: 800,
            color: '#fff',
            fontFamily: 'Outfit, sans-serif',
            letterSpacing: '-0.5px',
            lineHeight: 1,
        }}>AH</span>
    </div>
);

// ─── Quick Replies ────────────────────────────────────────────────────────────
const QUICK_REPLIES = ['About Abdul', 'Skills', 'Projects', 'Contact', 'Education'];

const MessageBubble = React.memo(({ msg, isDark }) => {
    const isUser = msg.from === 'user';
    
    return (
        <motion.div initial={{ opacity: 0, y: 15, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.3, type: "spring", stiffness: 250, damping: 20 }}
            style={{ display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start', alignItems: 'flex-end', gap: 10 }}>
            {!isUser && <AHLogo size={30} isDark={isDark} style={{ marginBottom: 4 }} />}
            <div style={{
                maxWidth: '82%', padding: '12px 16px',
                borderRadius: isUser ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                background: isUser 
                    ? (isDark ? 'linear-gradient(135deg, #00bfff, #7c3aed)' : 'linear-gradient(135deg, #0284c7, #4f46e5)')
                    : (isDark ? 'rgba(30, 36, 48, 0.85)' : '#ffffff'),
                color: isUser ? '#ffffff' : (isDark ? '#e2e8f0' : '#334155'),
                fontSize: '0.88rem', lineHeight: 1.6, fontWeight: isUser ? 500 : 400,
                border: isUser ? 'none' : (isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.06)'),
                boxShadow: isUser 
                    ? (isDark ? '0 4px 15px rgba(124,58,237,0.2)' : '0 4px 15px rgba(79,70,229,0.25)')
                    : (isDark ? '0 4px 15px rgba(0,0,0,0.2)' : '0 2px 10px rgba(0,0,0,0.04)'),
            }}
                dangerouslySetInnerHTML={{ __html: formatMessage(msg.text, isDark) }} />
        </motion.div>
    );
});

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

            // Update conversation history
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
                aria-label={open ? "Close AI Assistant" : "Open AI Assistant"}
                onClick={() => setOpen(o => !o)}
                style={{
                    position: 'fixed', bottom: 'clamp(20px, 4vh, 28px)', right: 'clamp(16px, 4vw, 28px)', zIndex: 9999,
                    width: 'clamp(56px, 12vw, 64px)', height: 'clamp(56px, 12vw, 64px)', borderRadius: '50%',
                    border: isDark ? '2px solid rgba(0,255,204,0.3)' : '2px solid rgba(2,132,199,0.2)',
                    cursor: 'pointer',
                    background: isDark ? 'linear-gradient(135deg, #06080d, #111a2e)' : 'linear-gradient(135deg, #ffffff, #f8fafc)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: isDark ? '0 10px 25px rgba(0,0,0,0.5)' : '0 10px 25px rgba(0,0,0,0.1)',
                }}
                animate={{ 
                    boxShadow: open 
                        ? (isDark ? '0 0 0 4px rgba(0,255,204,0.15)' : '0 0 0 4px rgba(2,132,199,0.15)') 
                        : (isDark ? ['0 0 0 0px rgba(0,255,204,0.4)', '0 0 0 15px rgba(0,255,204,0)', '0 0 0 0px rgba(0,255,204,0)'] : ['0 0 0 0px rgba(2,132,199,0.3)', '0 0 0 15px rgba(2,132,199,0)', '0 0 0 0px rgba(2,132,199,0)']) 
                }}
                transition={{ duration: 2, repeat: open ? 0 : Infinity }}
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            >
                <AnimatePresence mode="wait">
                    {open
                        ? <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                            <ChevronDown size={28} color={isDark ? "#00ffcc" : "#0284c7"} strokeWidth={2.5} />
                        </motion.span>
                        : <motion.span key="logo" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} transition={{ duration: 0.2 }}>
                            <Sparkles size={24} color={isDark ? "#00ffcc" : "#0284c7"} />
                        </motion.span>
                    }
                </AnimatePresence>
            </motion.button>

            {/* ── Chat Window ── */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        key="chatwindow"
                        initial={{ opacity: 0, y: 40, scale: 0.95, transformOrigin: 'bottom right' }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 40, scale: 0.95 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        style={{
                            position: 'fixed', bottom: 'clamp(95px, 15vh, 115px)', right: 'clamp(16px, 4vw, 28px)', zIndex: 9998,
                            width: 'min(400px, calc(100vw - 32px))', maxHeight: 'min(650px, calc(100vh - 120px))',
                            borderRadius: '24px', overflow: 'hidden',
                            display: 'flex', flexDirection: 'column',
                            background: isDark ? '#06080d' : '#f8fafc',
                            border: isDark ? '1px solid rgba(0,255,204,0.15)' : '1px solid rgba(0,0,0,0.08)',
                            boxShadow: isDark 
                                ? '0 0 40px rgba(0,255,204,0.05), 0 20px 60px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.05)' 
                                : '0 20px 50px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.02), inset 0 1px 0 rgba(255,255,255,1)',
                            transform: 'translateZ(0)',
                            willChange: 'transform, opacity',
                        }}
                    >
                        {/* Header */}
                        <div style={{ 
                            padding: '18px 20px', 
                            background: isDark ? 'linear-gradient(to right, rgba(6,8,13,1), rgba(15,23,42,1))' : '#ffffff', 
                            borderBottom: isDark ? '1px solid rgba(0,255,204,0.1)' : '1px solid rgba(0,0,0,0.06)', 
                            display: 'flex', alignItems: 'center', gap: 14,
                            boxShadow: isDark ? '0 4px 20px rgba(0,0,0,0.4)' : 'none',
                            zIndex: 10
                        }}>
                            <AHLogo size={44} isDark={isDark} />
                            <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: 700, color: isDark ? '#ffffff' : '#0f172a', fontSize: '1.05rem', fontFamily: 'Outfit, sans-serif', display: 'flex', alignItems: 'center', gap: 8, letterSpacing: '0.2px' }}>
                                    AH Assistant
                                    <span style={{ fontSize: '0.6rem', padding: '2px 8px', borderRadius: 20, background: isDark ? 'rgba(0,255,204,0.15)' : 'rgba(2,132,199,0.1)', color: isDark ? '#00ffcc' : '#0284c7', fontWeight: 800, letterSpacing: '0.5px', border: isDark ? '1px solid rgba(0,255,204,0.3)' : '1px solid rgba(2,132,199,0.2)' }}>AI</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981', display: 'inline-block' }} />
                                    <span style={{ fontSize: '0.75rem', color: isDark ? '#94a3b8' : '#64748b', fontWeight: 500 }}>Powered by Gemini</span>
                                </div>
                            </div>
                            <button aria-label="Reset chat logs" onClick={resetChat} title="Reset chat" style={{ background: 'none', border: 'none', cursor: 'pointer', color: isDark ? '#64748b' : '#94a3b8', padding: 6, transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = isDark ? '#fff' : '#0f172a'} onMouseLeave={e => e.target.style.color = isDark ? '#64748b' : '#94a3b8'}>
                                <RotateCcw size={18} />
                            </button>
                            <button aria-label="Close chat window" onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: isDark ? '#64748b' : '#94a3b8', padding: 6, transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = isDark ? '#fff' : '#0f172a'} onMouseLeave={e => e.target.style.color = isDark ? '#64748b' : '#94a3b8'}>
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div style={{ 
                            flex: 1, overflowY: 'auto', padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: 16, 
                            scrollbarWidth: 'thin', scrollbarColor: isDark ? 'rgba(0,255,204,0.15) transparent' : 'rgba(0,0,0,0.1) transparent',
                            background: isDark ? 'transparent' : '#f8fafc'
                        }}>
                            {messages.map(msg => (
                                <MessageBubble key={msg.id} msg={msg} isDark={isDark} />
                            ))}

                            <AnimatePresence>
                                {typing && (
                                    <motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                        <AHLogo size={30} isDark={isDark} />
                                        <div style={{ padding: '14px 18px', borderRadius: '20px 20px 20px 4px', background: isDark ? 'rgba(30, 36, 48, 0.85)' : '#ffffff', border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.06)', display: 'flex', gap: 6, alignItems: 'center', boxShadow: isDark ? '0 4px 15px rgba(0,0,0,0.2)' : '0 2px 10px rgba(0,0,0,0.04)' }}>
                                            {[0, 1, 2].map(i => (
                                                <motion.span key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: isDark ? '#00ffcc' : '#0284c7', display: 'block' }}
                                                    animate={{ y: [0, -6, 0], opacity: [0.5, 1, 0.5] }} transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }} />
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            <div ref={bottomRef} style={{ height: 1 }} />
                        </div>

                        {/* Input & Quick Replies Area */}
                        <div style={{ 
                            background: isDark ? '#06080d' : '#ffffff', 
                            borderTop: isDark ? '1px solid rgba(0,255,204,0.1)' : '1px solid rgba(0,0,0,0.06)',
                            paddingTop: '12px'
                        }}>
                            {/* Quick Replies */}
                            <div style={{ padding: '0 16px 12px', display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                                {QUICK_REPLIES.map(qr => (
                                    <motion.button key={qr} onClick={() => sendMessage(qr)}
                                        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                                        style={{ 
                                            padding: '6px 14px', borderRadius: 20, 
                                            border: isDark ? '1px solid rgba(0,255,204,0.2)' : '1px solid rgba(2,132,199,0.2)', 
                                            background: isDark ? 'rgba(0,255,204,0.05)' : 'rgba(2,132,199,0.05)', 
                                            color: isDark ? '#00ffcc' : '#0284c7', 
                                            fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' 
                                        }}
                                    >{qr}</motion.button>
                                ))}
                            </div>

                            {/* Input Field Area */}
                            <div style={{ padding: '0 16px 16px', display: 'flex', gap: 10, alignItems: 'center' }}>
                                <div style={{ 
                                    flex: 1, display: 'flex', alignItems: 'center',
                                    padding: '6px 6px 6px 16px', borderRadius: 100, 
                                    background: isDark ? 'rgba(255,255,255,0.04)' : '#f1f5f9', 
                                    border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent', 
                                    transition: 'all 0.3s ease',
                                    boxShadow: isDark ? 'inset 0 2px 4px rgba(0,0,0,0.2)' : 'inset 0 2px 4px rgba(0,0,0,0.02)'
                                }}>
                                    <input ref={inputRef} aria-label="Type your message" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                                        placeholder="Ask anything..."
                                        disabled={typing}
                                        style={{ 
                                            flex: 1, background: 'transparent', border: 'none', 
                                            color: isDark ? '#f8fafc' : '#0f172a', 
                                            fontSize: '0.95rem', outline: 'none', fontFamily: 'inherit',
                                            fontWeight: 500, opacity: typing ? 0.5 : 1 
                                        }}
                                    />
                                    <motion.button aria-label="Send message" onClick={() => sendMessage()} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                                        disabled={typing || !input.trim()}
                                        style={{ 
                                            width: 36, height: 36, borderRadius: '50%', border: 'none', 
                                            background: (typing || !input.trim()) 
                                                ? (isDark ? 'rgba(255,255,255,0.1)' : '#cbd5e1') 
                                                : (isDark ? '#00ffcc' : '#0284c7'), 
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', 
                                            cursor: (typing || !input.trim()) ? 'default' : 'pointer', flexShrink: 0,
                                            boxShadow: (!typing && input.trim()) ? (isDark ? '0 0 15px rgba(0,255,204,0.4)' : '0 2px 8px rgba(2,132,199,0.4)') : 'none',
                                            transition: 'background-color 0.3s'
                                        }}>
                                        <Send size={16} color={(!typing && input.trim()) ? (isDark ? '#000' : '#fff') : (isDark ? '#94a3b8' : '#fff')} style={{ marginLeft: 2 }} strokeWidth={2.5} />
                                    </motion.button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ChatBot;
