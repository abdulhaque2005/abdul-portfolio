import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, ChevronDown } from 'lucide-react';

// ─── Language Detection ───────────────────────────────────────────────────────
const hindiWords = ['kya', 'hai', 'hota', 'karo', 'batao', 'mujhe', 'mera', 'tera', 'aap', 'tum', 'hum', 'yaar', 'dost', 'bhai', 'kaise', 'kaisa', 'samjhao', 'batao', 'chahiye', 'nahi', 'nhi', 'accha', 'theek', 'bol', 'puch', 'kuch', 'sab', 'sirf', 'matlab', 'kyun', 'kab', 'kahan', 'dekho', 'lao', 'do', 'ho', 'ka', 'ki', 'ke', 'se', 'mein', 'par', 'aur'];
function isHindi(text) {
    const lower = text.toLowerCase();
    return hindiWords.some(w => lower.split(/\s+/).includes(w)) || /[\u0900-\u097F]/.test(text);
}

// ─── Knowledge Base ───────────────────────────────────────────────────────────
const KB = [
    // ── About ──
    {
        keys: ['name', 'kaun', 'who', 'tum', 'aap', 'you', 'abdul', 'about', 'bio', 'introduce', 'introduction', 'tell me', 'batao', 'kon ho'],
        en: `👋 I'm **Abdul Haque** — a passionate **Full Stack Developer** & Computer Science student!\n\nI specialize in the **MERN Stack** and modern UI/UX design. I build scalable, high-performance web apps by blending robust engineering with clean aesthetics. 🚀`,
        hi: `👋 Main **Abdul Haque** hoon — ek passionate **Full Stack Developer** aur Computer Science ka student!\n\nMain **MERN Stack** aur modern UI/UX design mein specialise karta hoon. Clean aur scalable web apps banata hoon! 🚀`,
    },
    // ── Skills ──
    {
        keys: ['skill', 'technology', 'tech', 'stack', 'language', 'kya aata', 'seekha', 'framework', 'tools'],
        en: `⚡ Abdul's Tech Stack:\n\n💻 **Languages:** JavaScript (ES6+), C, C++\n⚛️ **Frontend:** React.js, HTML5, CSS3, Tailwind CSS\n🟢 **Backend:** Node.js, Express.js\n🍃 **Database:** MongoDB\n🔧 **Tools:** Git, GitHub, Postman, Vercel, Render\n🎨 **Design:** Responsive UI/UX, REST APIs`,
        hi: `⚡ Abdul ke Skills:\n\n💻 **Languages:** JavaScript (ES6+), C, C++\n⚛️ **Frontend:** React.js, HTML5, CSS3, Tailwind CSS\n🟢 **Backend:** Node.js, Express.js\n🍃 **Database:** MongoDB\n🔧 **Tools:** Git, GitHub, Postman, Vercel, Render\n🎨 **Design:** Responsive UI/UX, REST APIs`,
    },
    // ── Projects ──
    {
        keys: ['project', 'work', 'kaam', 'banaya', 'built', 'portfolio work', 'banaaya'],
        en: `🚀 Abdul's Projects:\n\n1. **Razer Clone** — Pixel-perfect HTML/CSS clone\n   🔗 [Live](https://razer-website-1avbtm69x-abdul7.vercel.app/)\n\n2. **Mealawe App UI** — Food delivery frontend\n   🔗 [Live](https://mealawe-9b7udy2ko-abdul7.vercel.app/)\n\n3. **Speed Typing Test** — Real-time WPM tracker\n   🔗 [Live](https://typing-test-abdul7.vercel.app/)\n\n4. **Global Currency Tool** — Live exchange rates\n   🔗 [Live](https://convertrate23.netlify.app/convert_currn/currency/)`,
        hi: `🚀 Abdul ke Projects:\n\n1. **Razer Clone** — HTML/CSS se bana pixel-perfect clone\n   🔗 [Live dekho](https://razer-website-1avbtm69x-abdul7.vercel.app/)\n\n2. **Mealawe App UI** — Food delivery ka frontend\n   🔗 [Live dekho](https://mealawe-9b7udy2ko-abdul7.vercel.app/)\n\n3. **Speed Typing Test** — Real-time WPM tracker\n   🔗 [Live dekho](https://typing-test-abdul7.vercel.app/)\n\n4. **Global Currency Tool** — Live exchange rates\n   🔗 [Live dekho](https://convertrate23.netlify.app/convert_currn/currency/)`,
    },
    // ── Education ──
    {
        keys: ['education', 'study', 'padhai', 'college', 'university', 'degree', '10th', '12th', 'school', 'qualification'],
        en: `🎓 Abdul's Education:\n\n🏫 **B.E. Computer Science & Engineering**\n   Swaminarayan University — 1st Year (Enrolled)\n\n📘 **12th Grade** — 84% (Physics & Maths)\n📗 **10th Grade** — 71% (State Board)`,
        hi: `🎓 Abdul ki Padhai:\n\n🏫 **B.E. Computer Science & Engineering**\n   Swaminarayan University — 1st Year (Enrolled)\n\n📘 **12th Class** — 84% (Physics & Maths)\n📗 **10th Class** — 71% (State Board)`,
    },
    // ── Contact ──
    {
        keys: ['contact', 'reach', 'email', 'phone', 'number', 'call', 'message', 'connect',
            'location', 'address', 'milna', 'baat', 'whatsapp', 'touch', 'milao',
            'bata do', 'dena', 'chahiye', 'kaha milenge', 'kaise milun', 'gmail',
            'mobile', 'no.', 'no ', 'num', 'mob', 'contact kare', 'kaise baat'],
        en: `📬 Contact Abdul:\n\n📧 **Email:** abdulhaque4171@gmail.com\n📞 **Phone:** +91 7870929584\n📍 **Location:** Kalol, Gujarat, India\n💼 **LinkedIn:** [linkedin.com/in/abdul-haque-a08150398](https://www.linkedin.com/in/abdul-haque-a08150398)\n🐙 **GitHub:** [github.com/abdulhaque2005](https://github.com/abdulhaque2005)`,
        hi: `📬 Abdul se contact karo:\n\n📧 **Email:** abdulhaque4171@gmail.com\n📞 **Phone:** +91 7870929584\n📍 **Location:** Kalol, Gujarat, India\n💼 **LinkedIn:** [Profile link](https://www.linkedin.com/in/abdul-haque-a08150398)\n🐙 **GitHub:** [github.com/abdulhaque2005](https://github.com/abdulhaque2005)`,
    },
    // ── Resume ──
    {
        keys: ['resume', 'cv', 'download', 'pdf'],
        en: `📄 Download Abdul's Resume!\n\n➡️ Click the **"Download Resume"** button on the Hero section — a perfect PDF will be downloaded instantly! ✅`,
        hi: `📄 Abdul ka Resume download karo!\n\n➡️ Hero section pe **"Download Resume"** button click karo — ek dum sahi PDF download ho jayega! ✅`,
    },
    // ── GitHub ──
    {
        keys: ['github', 'repository', 'repo', 'open source', 'source code'],
        en: `🐙 Abdul's GitHub:\n👉 [github.com/abdulhaque2005](https://github.com/abdulhaque2005)\n\nAll projects & code available here!`,
        hi: `🐙 Abdul ka GitHub:\n👉 [github.com/abdulhaque2005](https://github.com/abdulhaque2005)\n\nSab projects ka code yahan milega!`,
    },

    // ════════ TECH KNOWLEDGE ════════
    // ── HTML ──
    {
        keys: ['html', 'html5', 'hypertext', 'markup'],
        en: `🌐 **HTML (HyperText Markup Language)**\n\nHTML is the **skeleton of every website**. It defines the structure using tags.\n\n\`\`\`html\n<h1>Hello World</h1>\n<p>This is a paragraph</p>\n<img src="pic.jpg" alt="image">\n\`\`\`\n\n📌 Key tags: \`<div>\`, \`<p>\`, \`<h1-h6>\`, \`<a>\`, \`<img>\`, \`<form>\`, \`<input>\`\n\n💡 HTML gives **structure** — CSS makes it beautiful!`,
        hi: `🌐 **HTML (HyperText Markup Language)**\n\nHTML har website ka **skeleton** (dhaancha) hota hai. Isme tags se structure banate hain.\n\n\`\`\`html\n<h1>Hello World</h1>\n<p>Yeh ek paragraph hai</p>\n<img src="pic.jpg" alt="image">\n\`\`\`\n\n📌 Main tags: \`<div>\`, \`<p>\`, \`<h1-h6>\`, \`<a>\`, \`<img>\`, \`<form>\`\n\n💡 HTML **structure** deta hai — CSS se sundar banta hai!`,
    },
    // ── CSS ──
    {
        keys: ['css', 'css3', 'style', 'styling', 'design', 'flexbox', 'grid'],
        en: `🎨 **CSS (Cascading Style Sheets)**\n\nCSS makes websites **beautiful**! It controls colors, fonts, layout & animations.\n\n\`\`\`css\nbody {\n  background: #000;\n  color: #fff;\n  font-family: Arial;\n}\n\n.card {\n  display: flex;\n  border-radius: 12px;\n  padding: 20px;\n}\n\`\`\`\n\n📌 Key concepts: Flexbox, Grid, Animations, Media Queries, Variables\n\n💡 Tailwind CSS is a utility-first CSS framework that Abdul uses!`,
        hi: `🎨 **CSS (Cascading Style Sheets)**\n\nCSS website ko **sundar** banata hai! Colors, fonts, layout aur animations control karta hai.\n\n\`\`\`css\nbody {\n  background: #000;\n  color: #fff;\n}\n\n.card {\n  display: flex;\n  border-radius: 12px;\n}\n\`\`\`\n\n📌 Main concepts: Flexbox, Grid, Animations, Media Queries\n\n💡 Abdul **Tailwind CSS** use karta hai — jo ek super fast CSS framework hai!`,
    },
    // ── JavaScript ──
    {
        keys: ['javascript', 'js', 'es6', 'ecmascript', 'vanilla js', 'script'],
        en: `⚡ **JavaScript (JS)**\n\nJavaScript makes websites **interactive & dynamic**! It's the programming language of the web.\n\n\`\`\`js\n// Variables\nconst name = "Abdul";\nlet age = 19;\n\n// Function\nfunction greet(name) {\n  return "Hello " + name;\n}\n\n// Arrow function\nconst add = (a, b) => a + b;\n\`\`\`\n\n📌 Key: Variables, Functions, DOM, Events, Promises, Async/Await, Fetch API`,
        hi: `⚡ **JavaScript (JS)**\n\nJavaScript website ko **interactive** banata hai! Web ka programming language hai.\n\n\`\`\`js\n// Variables\nconst name = "Abdul";\nlet age = 19;\n\n// Function\nfunction greet(name) {\n  return "Hello " + name;\n}\n\n// Arrow function\nconst add = (a, b) => a + b;\n\`\`\`\n\n📌 Main concepts: Variables, Functions, DOM, Events, Async/Await, Fetch API`,
    },
    // ── React basics ──
    {
        keys: ['react', 'reactjs', 'react.js', 'component', 'jsx', 'props', 'state'],
        en: `⚛️ **React.js**\n\nReact is a **JavaScript library** by Meta for building fast UIs using reusable components.\n\n\`\`\`jsx\nfunction Card({ name }) {\n  return <h2>Hello, {name}!</h2>;\n}\n// Usage\n<Card name="Abdul" />\n\`\`\`\n\n📌 Core concepts: **Components, JSX, Props, State, Hooks**\n\n💡 Type **hooks** to learn all React Hooks in detail!`,
        hi: `⚛️ **React.js**\n\nReact Meta ka **JavaScript library** hai — reusable components se fast UI banate hain.\n\n\`\`\`jsx\nfunction Card({ name }) {\n  return <h2>Hello, {name}!</h2>;\n}\n// Use karo aise\n<Card name="Abdul" />\n\`\`\`\n\n📌 Main concepts: **Components, JSX, Props, State, Hooks**\n\n💡 **hooks** type karo — saare React Hooks detail mein jaano!`,
    },
    // ── React Hooks ──
    {
        keys: ['hook', 'hooks', 'usestate', 'useeffect', 'useref', 'usecontext', 'usememo',
            'usecallback', 'usereducer', 'uselayouteffect', 'useid', 'kitne hook',
            'hook types', 'hook kitne', 'types of hook', 'hook kya hota'],
        en: `🪝 **React Hooks — All Types**\n\nHooks let you use state & lifecycle in **function components**.\n\n1. **useState** — Store & update state\n\`useState(initialValue)\` → \`[value, setValue]\`\n\n2. **useEffect** — Side effects (API calls, timers)\n\`\`\`js\nuseEffect(() => { fetchData(); }, []);\n\`\`\`\n\n3. **useRef** — Access DOM element / persist value\n\`\`\`js\nconst inputRef = useRef(null);\n\`\`\`\n\n4. **useContext** — Access global context (no prop drilling)\n\n5. **useMemo** — Cache expensive calculations\n\n6. **useCallback** — Cache functions to avoid re-renders\n\n7. **useReducer** — Complex state with actions (like Redux)\n\`\`\`js\nconst [state, dispatch] = useReducer(reducer, initial);\n\`\`\`\n\n8. **useLayoutEffect** — Like useEffect but fires before paint\n\n9. **useId** — Generate unique IDs for accessibility\n\n📌 **Total: 9 built-in React Hooks!**`,
        hi: `🪝 **React Hooks — Saare Types**\n\nHooks se **function components** mein state aur lifecycle use kar sakte ho.\n\n1. **useState** — State store aur update karo\n\`useState(value)\` → \`[value, setValue]\`\n\n2. **useEffect** — Side effects (API calls, timers)\n\`\`\`js\nuseEffect(() => { data fetch karo; }, []);\n\`\`\`\n\n3. **useRef** — DOM element access karo / value persist karo\n\`\`\`js\nconst ref = useRef(null);\n\`\`\`\n\n4. **useContext** — Global data access (prop drilling nahi)\n\n5. **useMemo** — Heavy calculations cache karo\n\n6. **useCallback** — Functions cache karo (re-render rokne ke liye)\n\n7. **useReducer** — Complex state actions ke saath\n\`\`\`js\nconst [state, dispatch] = useReducer(reducer, init);\n\`\`\`\n\n8. **useLayoutEffect** — useEffect jaisa, paint se pehle fire hota hai\n\n9. **useId** — Unique ID generate karo (accessibility ke liye)\n\n📌 **Total: React mein 9 built-in Hooks hain!**`,
    },
    // ── Node.js ──
    {
        keys: ['node', 'nodejs', 'node.js', 'backend', 'server', 'express'],
        en: `🟢 **Node.js & Express.js**\n\nNode.js lets you run **JavaScript on the server**. Express is a minimal web framework on top of Node.\n\n\`\`\`js\nconst express = require('express');\nconst app = express();\n\napp.get('/', (req, res) => {\n  res.send('Hello from server!');\n});\n\napp.listen(3000);\n\`\`\`\n\n📌 Used for: REST APIs, Authentication, Database connections\n\n💡 Abdul uses Node + Express for all his backend work!`,
        hi: `🟢 **Node.js & Express.js**\n\nNode.js se **JavaScript server pe** chalta hai. Express ek simple web framework hai.\n\n\`\`\`js\nconst express = require('express');\nconst app = express();\n\napp.get('/', (req, res) => {\n  res.send('Server se Hello!');\n});\n\napp.listen(3000);\n\`\`\`\n\n📌 Use hota hai: REST APIs, Authentication, Database connections\n\n💡 Abdul backend ke liye Node + Express use karta hai!`,
    },
    // ── MongoDB ──
    {
        keys: ['mongodb', 'mongo', 'database', 'db', 'nosql', 'mongoose'],
        en: `🍃 **MongoDB**\n\nMongoDB is a **NoSQL database** that stores data in flexible JSON-like documents.\n\n\`\`\`js\n// Example document\n{\n  name: "Abdul Haque",\n  skills: ["React", "Node", "MongoDB"],\n  age: 19\n}\n\`\`\`\n\n📌 Key: Collections, Documents, CRUD operations, Mongoose ODM\n\n💡 MongoDB + Express + React + Node = **MERN Stack** (Abdul's specialty!)`,
        hi: `🍃 **MongoDB**\n\nMongoDB ek **NoSQL database** hai jo data ko JSON jaisi documents mein store karta hai.\n\n\`\`\`js\n// Example document\n{\n  name: "Abdul Haque",\n  skills: ["React", "Node", "MongoDB"],\n  age: 19\n}\n\`\`\`\n\n📌 Main concepts: Collections, Documents, CRUD, Mongoose\n\n💡 MongoDB + Express + React + Node = **MERN Stack** — yahi Abdul ki specialty hai!`,
    },
    // ── Git ──
    {
        keys: ['git', 'github', 'version control', 'commit', 'push', 'pull', 'branch'],
        en: `🐙 **Git & GitHub**\n\nGit is a **version control system** — track changes in your code. GitHub is cloud hosting for Git repos.\n\n\`\`\`bash\ngit init          # Start a repo\ngit add .         # Stage changes\ngit commit -m "message"  # Save snapshot\ngit push origin main     # Upload to GitHub\n\`\`\`\n\n📌 Key: init, add, commit, push, pull, branch, merge\n\n🔗 Abdul's GitHub: [github.com/abdulhaque2005](https://github.com/abdulhaque2005)`,
        hi: `🐙 **Git & GitHub**\n\nGit ek **version control system** hai — code ke changes track karta hai. GitHub pe code cloud mein store hota hai.\n\n\`\`\`bash\ngit init          # Repo shuru karo\ngit add .         # Changes stage karo\ngit commit -m "message"  # Snapshot save karo\ngit push origin main     # GitHub pe upload karo\n\`\`\`\n\n📌 Main commands: init, add, commit, push, pull, branch\n\n🔗 Abdul ka GitHub: [github.com/abdulhaque2005](https://github.com/abdulhaque2005)`,
    },
    // ── API ──
    {
        keys: ['api', 'rest', 'restapi', 'fetch', 'axios', 'endpoint', 'http', 'request', 'response'],
        en: `📡 **REST API**\n\nREST API allows **communication between frontend and backend** using HTTP methods.\n\n\`\`\`js\n// Fetching data from API\nfetch('https://api.example.com/users')\n  .then(res => res.json())\n  .then(data => console.log(data));\n\n// HTTP Methods:\n// GET    → Read data\n// POST   → Create data\n// PUT    → Update data\n// DELETE → Delete data\n\`\`\`\n\n💡 Abdul uses REST APIs in his projects like the Currency Tool!`,
        hi: `📡 **REST API**\n\nREST API se **frontend aur backend ke beech communication** hoti hai HTTP methods se.\n\n\`\`\`js\n// API se data fetch karo\nfetch('https://api.example.com/users')\n  .then(res => res.json())\n  .then(data => console.log(data));\n\n// HTTP Methods:\n// GET    → Data padhna\n// POST   → Data banana\n// PUT    → Data update karna\n// DELETE → Data delete karna\n\`\`\`\n\n💡 Abdul ne Currency Tool project mein REST API use ki hai!`,
    },
    // ── Tailwind ──
    {
        keys: ['tailwind', 'tailwindcss', 'utility', 'class'],
        en: `🎨 **Tailwind CSS**\n\nTailwind is a **utility-first CSS framework** — design directly in HTML/JSX with classes!\n\n\`\`\`jsx\n<div className="flex items-center justify-center\n               bg-blue-500 text-white\n               rounded-xl p-6 shadow-lg\n               hover:bg-blue-600 transition">\n  Hello Tailwind!\n</div>\n\`\`\`\n\n💡 No custom CSS needed! Super fast development. Abdul uses it in his portfolio!`,
        hi: `🎨 **Tailwind CSS**\n\nTailwind ek **utility-first CSS framework** hai — seedha HTML/JSX mein classes se design karo!\n\n\`\`\`jsx\n<div className="flex items-center bg-blue-500\n               text-white rounded-xl p-6">\n  Hello Tailwind!\n</div>\n\`\`\`\n\n💡 Alag se CSS likhne ki zaroorat nahi! Super fast development. Abdul apne portfolio mein use karta hai!`,
    },
    // ── MERN ──
    {
        keys: ['mern', 'full stack', 'fullstack', 'mean', 'stack kya'],
        en: `🚀 **MERN Stack**\n\nMERN is a **Full Stack JavaScript framework** for building complete web apps!\n\n- **M** → MongoDB (Database)\n- **E** → Express.js (Backend Framework)\n- **R** → React.js (Frontend)\n- **N** → Node.js (Server Runtime)\n\n🔄 Flow: User → React → Express API → Node → MongoDB → back to React\n\n💡 Abdul specializes in the **MERN Stack**!`,
        hi: `🚀 **MERN Stack**\n\nMERN ek **Full Stack JavaScript framework** hai poori web app banane ke liye!\n\n- **M** → MongoDB (Database)\n- **E** → Express.js (Backend)\n- **R** → React.js (Frontend)\n- **N** → Node.js (Server)\n\n🔄 Flow: User → React → Express API → Node → MongoDB → wapas React\n\n💡 Abdul **MERN Stack** mein specialist hai!`,
    },
    // ── C / C++ ──
    {
        keys: ['c language', 'c++', 'cpp', 'c programming', 'pointer'],
        en: `💻 **C & C++**\n\nC is a **foundational programming language** — fast, low-level, great for systems.\nC++ adds **Object Oriented Programming (OOP)** on top of C.\n\n\`\`\`c\n#include <stdio.h>\nint main() {\n  printf("Hello World!\\n");\n  return 0;\n}\n\`\`\`\n\n📌 OOP concepts in C++: Classes, Objects, Inheritance, Polymorphism\n\n💡 Abdul knows both C and C++!`,
        hi: `💻 **C & C++**\n\nC ek **foundational programming language** hai — fast aur low-level.\nC++ mein C ke upar **OOP (Object Oriented Programming)** add hoti hai.\n\n\`\`\`c\n#include <stdio.h>\nint main() {\n  printf("Hello World!\\n");\n  return 0;\n}\n\`\`\`\n\n📌 C++ ke OOP concepts: Classes, Objects, Inheritance, Polymorphism\n\n💡 Abdul C aur C++ dono jaanta hai!`,
    },
    // ── Hello ──
    {
        keys: ['hello', 'hi', 'hey', 'hii', 'helo', 'namaste', 'salam', 'assalam', 'hola', 'good morning', 'good evening', 'sup'],
        en: `👋 Hey there! I'm **AH Assistant** — Abdul Haque's personal portfolio bot!\n\nAsk me anything:\n- 💻 Skills & Tech Stack\n- 🚀 Projects & Work\n- 🎓 Education\n- 📬 Contact Info\n- 📄 Resume Download\n- 🌐 HTML, CSS, JS, React & more tech!`,
        hi: `👋 Kya haal hai! Main **AH Assistant** hoon — Abdul Haque ka personal portfolio bot!\n\nMujhse kuch bhi poocho:\n- 💻 Skills aur Tech Stack\n- 🚀 Projects\n- 🎓 Education\n- 📬 Contact Info\n- 📄 Resume Download\n- 🌐 HTML, CSS, JS, React aur aur bhi tech!`,
    },
    // ── Help ──
    {
        keys: ['help', 'kya puch', 'option', 'menu', 'topic', 'what can'],
        en: `🤖 I can help you with:\n\n1. 👤 **About Abdul** — Who he is\n2. 💻 **Skills** — Full tech stack\n3. 🚀 **Projects** — What he built\n4. 🎓 **Education** — Study details\n5. 📬 **Contact** — Reach him\n6. 📄 **Resume** — Download PDF\n---\n🌐 **Tech Topics:**\n7. HTML, CSS, JavaScript\n8. React, Node.js, Express\n9. MongoDB, REST API\n10. Git, Tailwind, MERN Stack, C/C++\n\nJust type any topic! 👆`,
        hi: `🤖 Main in topics pe help kar sakta hoon:\n\n1. 👤 **Abdul ke baare mein** — kaun hain\n2. 💻 **Skills** — Full tech stack\n3. 🚀 **Projects** — Kya banaya\n4. 🎓 **Education** — Padhai\n5. 📬 **Contact** — Kaise mile\n6. 📄 **Resume** — PDF download\n---\n🌐 **Tech Topics:**\n7. HTML, CSS, JavaScript\n8. React, Node.js, Express\n9. MongoDB, REST API\n10. Git, Tailwind, MERN Stack, C/C++\n\nKoi bhi topic type karo! 👆`,
    },
];

const QUICK_REPLIES = ['About', 'Skills', 'Projects', 'Contact', 'HTML', 'CSS', 'React', 'Hooks', 'MERN'];

function getReply(input) {
    const lower = input.toLowerCase();
    const hindi = isHindi(input);
    for (const item of KB) {
        if (item.keys.some(k => lower.includes(k))) {
            return hindi ? item.hi : item.en;
        }
    }
    return hindi
        ? `🤔 Yeh mere knowledge mein nahi hai abhi!\n\nTry karo: **skills**, **projects**, **react**, **html**, **contact** — main zaroor bataunga! 😊`
        : `🤔 I don't have info on that yet!\n\nTry: **skills**, **projects**, **react**, **html**, **contact** and I'll answer right away! 😊`;
}

function formatMessage(text) {
    let f = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    f = f.replace(/`([^`]+)`/g, '<code style="background:rgba(0,255,204,0.1);padding:1px 5px;border-radius:4px;font-family:monospace;font-size:0.9em;color:#00ffcc;">$1</code>');
    f = f.replace(/```[\w]*\n?([\s\S]*?)```/g, '<pre style="background:rgba(0,0,0,0.4);border:1px solid rgba(0,255,204,0.15);border-radius:8px;padding:10px;font-family:monospace;font-size:0.78rem;overflow-x:auto;color:#a5f3fc;margin:6px 0;line-height:1.5;">$1</pre>');
    f = f.replace(/\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g, '<a href="$2" target="_blank" rel="noopener" style="color:#00ffcc;text-decoration:underline;">$1</a>');
    f = f.replace(/\n/g, '<br/>');
    return f;
}

// ─── AH Logo ─────────────────────────────────────────────────────────────────
const AHLogo = ({ size = 28, style = {} }) => (
    <div style={{
        width: size, height: size, borderRadius: '50%',
        background: 'linear-gradient(135deg,#00ffcc,#7c3aed)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0, ...style
    }}>
        <span style={{ fontSize: size * 0.38, fontWeight: 900, color: '#000', fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.5px', lineHeight: 1 }}>AH</span>
    </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────
const ChatBot = ({ theme = 'dark' }) => {
    const isDark = theme === 'dark';
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([{
        from: 'bot',
        text: isHindi('namaste')
            ? `👋 Hello! Main **AH Assistant** hoon — Abdul Haque ka personal bot!\n\nPoocho mujhse kuch bhi — skills, projects, HTML, CSS, React... sab bataunga! 😊`
            : `👋 Hey! I'm **AH Assistant** — Abdul Haque's personal portfolio bot!\n\nAsk me anything — skills, projects, HTML, CSS, React & more! 🚀`,
        id: 0,
    }]);
    const [input, setInput] = useState('');
    const [typing, setTyping] = useState(false);
    const bottomRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, typing]);
    useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 300); }, [open]);

    const sendMessage = (text) => {
        const userText = (text || input).trim();
        if (!userText) return;
        setInput('');
        setMessages(prev => [...prev, { from: 'user', text: userText, id: Date.now() }]);
        setTyping(true);
        setTimeout(() => {
            setTyping(false);
            setMessages(prev => [...prev, { from: 'bot', text: getReply(userText), id: Date.now() + 1 }]);
        }, 750);
    };

    return (
        <>
            {/* ── Floating Button ── */}
            <motion.button
                onClick={() => setOpen(o => !o)}
                style={{
                    position: 'fixed', bottom: 28, right: 28, zIndex: 9999,
                    width: 62, height: 62, borderRadius: '50%',
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
                            <span style={{ fontSize: '1rem', fontWeight: 900, color: '#00ffcc', fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '-0.5px' }}>AH</span>
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
                            position: 'fixed', bottom: 104, right: 28, zIndex: 9998,
                            width: 360, maxHeight: 580,
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
                                <div style={{ fontWeight: 700, color: isDark ? '#fff' : '#111', fontSize: '0.95rem', fontFamily: 'Space Grotesk,sans-serif' }}>AH Assistant</div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                    <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 6px #4ade80', display: 'inline-block' }} />
                                    <span style={{ fontSize: '0.71rem', color: '#6b7f96' }}>Always online · Knows everything!</span>
                                </div>
                            </div>
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
                                        <div style={{ padding: '10px 14px', borderRadius: '18px 18px 18px 4px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)', display: 'flex', gap: 5, alignItems: 'center' }}>
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
                        <div style={{ padding: '8px 12px', display: 'flex', flexWrap: 'wrap', gap: 6, borderTop: '1px solid rgba(255,255,255,0.04)' }}>
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
                                placeholder="Ask in Hindi or English..."
                                style={{ flex: 1, padding: '10px 14px', borderRadius: 12, background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)', border: isDark ? '1px solid rgba(0,255,204,0.18)' : '1px solid rgba(0,255,204,0.4)', color: isDark ? '#eef2f7' : '#111', fontSize: '0.83rem', outline: 'none', fontFamily: 'inherit', transition: 'border-color 0.2s', fontWeight: isDark ? 400 : 500 }}
                                onFocus={e => e.target.style.borderColor = 'rgba(0,255,204,0.8)'}
                                onBlur={e => e.target.style.borderColor = isDark ? 'rgba(0,255,204,0.18)' : 'rgba(0,255,204,0.4)'} />
                            <motion.button onClick={() => sendMessage()} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.93 }}
                                style={{ width: 40, height: 40, borderRadius: 12, border: 'none', background: 'linear-gradient(135deg,#00ffcc,#7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
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
