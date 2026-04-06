import { useState, useEffect, useRef, useCallback } from "react";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 700);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 700);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return isMobile;
}

const PROFILE = {
  name: "Bhavdeep Singh",
  email: "bhavdeepmakkar@gmail.com",
  phone: "+91-9463448633",
  college: "IIIT Una — B.Tech IT (2024–28)",
  github: "github.com/bhavdeep",
  linkedin: "linkedin.com/in/bhavdeep",
};

const SYSTEM_PROMPT = `You are BhavdeepAI — the interactive AI persona of Bhavdeep Singh, a B.Tech IT student at IIIT Una (2024–28). You speak in first person as Bhavdeep himself. You are confident, technical, and a little witty — like a developer who knows their craft. Keep replies concise (3–6 sentences), terminal-friendly (no markdown headers, minimal formatting). 

Here is everything about you:
- Full Stack Developer & ML Engineer
- Skills: React, Node.js, Express, MongoDB, JWT, REST APIs, Python, PyTorch, TensorFlow, Scikit-learn, XGBoost, Docker, AWS, C, C++, JavaScript
- Projects: Finance Tracker (MERN, JWT, 25% latency improvement), Blockchain Voting System (Solidity, Web3, 50+ sessions), URL Shortener API (Node.js, 30% faster), Netflix Clone (React), Math Score Predictor (XGBoost, R²=0.88, Docker+AWS), Spam Email Classifier (NLP, TF-IDF, 95% accuracy)
- Seeking: Software Dev or ML Research Internship
- Hackathons: Hack the Hills, E-Summit 2025 at IIIT Una
- Certification: Node.js Beginner to Advanced, Udemy (36.5 hrs)
- JEE Advanced AIR 16,000
Never make up facts. If unsure, say so honestly. Always stay in character as Bhavdeep.`;

const ASCII_LOGO = `
  ██████╗ ██╗  ██╗ █████╗ ██╗   ██╗
  ██╔══██╗██║  ██║██╔══██╗██║   ██║
  ██████╔╝███████║███████║╚██╗ ██╔╝
  ██╔══██╗██╔══██║██╔══██║ ╚████╔╝ 
  ██████╔╝██║  ██║██║  ██║  ╚██╔╝  
  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝  `;

const COMMANDS = {
  help: () => [
    { type: "header", text: "// AVAILABLE COMMANDS" },
    { type: "blank" },
    { type: "cmd-row", cmd: "about", desc: "Who is Bhavdeep?" },
    { type: "cmd-row", cmd: "projects", desc: "All projects (Web + ML)" },
    { type: "cmd-row", cmd: "web", desc: "Web development stack & projects" },
    { type: "cmd-row", cmd: "ml", desc: "ML/AI stack & projects" },
    { type: "cmd-row", cmd: "skills", desc: "Full tech skill matrix" },
    { type: "cmd-row", cmd: "contact", desc: "Reach out to Bhavdeep" },
    { type: "cmd-row", cmd: "resume", desc: "Download resume" },
    { type: "cmd-row", cmd: "clear", desc: "Clear terminal" },
    { type: "blank" },
    { type: "dim", text: "  Or just type anything — BhavdeepAI will answer." },
    { type: "blank" },
  ],

  about: () => [
    { type: "header", text: "// ABOUT BHAVDEEP SINGH" },
    { type: "blank" },
    { type: "info", text: "  Name    →  Bhavdeep Singh" },
    { type: "info", text: "  College →  IIIT Una — B.Tech IT (2024–28)" },
    { type: "info", text: "  JEE     →  AIR 16,000 (Advanced)" },
    { type: "info", text: "  Tracks  →  Full Stack Dev  +  ML/AI Engineering" },
    { type: "blank" },
    { type: "subheader", text: "  MISSION" },
    { type: "accent", text: '  "Building scalable systems and intelligent machines — not toy projects."' },
    { type: "blank" },
    { type: "subheader", text: "  CURRENTLY" },
    { type: "bullet", text: "Seeking Software Dev / ML Research Internship" },
    { type: "bullet", text: "Shipped 6+ full-stack & ML systems" },
    { type: "bullet", text: "Active in hackathons @ IIIT Una" },
    { type: "blank" },
    { type: "dim", text: '  → Type "projects" to see the work. Or ask me anything.' },
    { type: "blank" },
  ],

  skills: () => [
    { type: "header", text: "// SKILL MATRIX" },
    { type: "blank" },
    { type: "subheader", text: "  LANGUAGES" },
    { type: "tags", tags: [{ label: "JavaScript", color: "yellow" }, { label: "Python", color: "cyan" }, { label: "C++", color: "green" }, { label: "C", color: "green" }] },
    { type: "blank" },
    { type: "subheader", text: "  FRONTEND" },
    { type: "tags", tags: [{ label: "React.js", color: "cyan" }, { label: "HTML5", color: "orange" }, { label: "CSS3", color: "orange" }, { label: "Tailwind CSS", color: "cyan" }] },
    { type: "blank" },
    { type: "subheader", text: "  BACKEND" },
    { type: "tags", tags: [{ label: "Node.js", color: "green" }, { label: "Express.js", color: "green" }, { label: "REST APIs", color: "green" }, { label: "JWT", color: "yellow" }, { label: "MVC", color: "yellow" }] },
    { type: "blank" },
    { type: "subheader", text: "  ML / AI" },
    { type: "tags", tags: [{ label: "PyTorch", color: "orange" }, { label: "TensorFlow", color: "orange" }, { label: "Scikit-learn", color: "cyan" }, { label: "XGBoost", color: "cyan" }, { label: "Pandas", color: "cyan" }, { label: "NumPy", color: "cyan" }] },
    { type: "blank" },
    { type: "subheader", text: "  DATABASE" },
    { type: "tags", tags: [{ label: "MongoDB", color: "green" }, { label: "SQL", color: "green" }, { label: "Schema Design", color: "yellow" }, { label: "Indexing", color: "yellow" }] },
    { type: "blank" },
    { type: "subheader", text: "  DEVOPS & TOOLS" },
    { type: "tags", tags: [{ label: "Docker", color: "cyan" }, { label: "AWS", color: "orange" }, { label: "Git", color: "yellow" }, { label: "Postman", color: "orange" }, { label: "Jupyter", color: "yellow" }] },
    { type: "blank" },
  ],

  web: () => [
    { type: "header", text: "// WEB DEVELOPMENT MODULE" },
    { type: "blank" },
    { type: "subheader", text: "  STACK" },
    { type: "tags", tags: [{ label: "React.js", color: "cyan" }, { label: "Node.js", color: "green" }, { label: "Express", color: "green" }, { label: "MongoDB", color: "green" }, { label: "JWT", color: "yellow" }] },
    { type: "blank" },
    { type: "subheader", text: "  PROJECTS" },
    { type: "blank" },
    { type: "project", title: "Finance Tracker", badge: "MERN", color: "orange", lines: ["JWT auth · 10+ REST endpoints · MongoDB query opt (-25% latency)", "Interactive dashboards · CSV export · 5+ features"] },
    { type: "blank" },
    { type: "project", title: "Blockchain Voting System", badge: "WEB3", color: "cyan", lines: ["Solidity smart contracts · wallet-based auth · duplicate-vote prevention", "Real-time results via on-chain events · 50+ simulated sessions"] },
    { type: "blank" },
    { type: "project", title: "URL Shortener API", badge: "API", color: "green", lines: ["Hashing + expiry + redirect · DB indexing → 30% faster lookups", "Structured edge-case testing for invalid/expired URLs"] },
    { type: "blank" },
    { type: "project", title: "Netflix Clone", badge: "REACT", color: "orange", lines: ["Responsive UI · live API · reusable components + hooks"] },
    { type: "blank" },
  ],

  ml: () => [
    { type: "header", text: "// ML / AI MODULE" },
    { type: "blank" },
    { type: "subheader", text: "  STACK" },
    { type: "tags", tags: [{ label: "Python", color: "cyan" }, { label: "PyTorch", color: "orange" }, { label: "TensorFlow", color: "orange" }, { label: "Scikit-learn", color: "cyan" }, { label: "XGBoost", color: "cyan" }, { label: "Docker", color: "green" }, { label: "AWS", color: "yellow" }] },
    { type: "blank" },
    { type: "subheader", text: "  PROJECTS" },
    { type: "blank" },
    { type: "project", title: "Math Score Predictor", badge: "REGRESSION", color: "cyan", lines: ["1000+ records · 5+ algorithms · R² = 0.88", "Modular pipeline · Dockerised · deployed on AWS Elastic Beanstalk"] },
    { type: "blank" },
    { type: "project", title: "Spam Email Classifier", badge: "NLP", color: "green", lines: ["5000+ emails · TF-IDF (3000+ features) · 95% accuracy", "Text cleaning · tokenisation · Logistic Regression"] },
    { type: "blank" },
    { type: "subheader", text: "  CONCEPTS" },
    { type: "tags", tags: [{ label: "Regression", color: "yellow" }, { label: "Classification", color: "yellow" }, { label: "Feature Engineering", color: "cyan" }, { label: "Model Eval", color: "cyan" }, { label: "Hyperparameter Tuning", color: "orange" }, { label: "CNNs", color: "orange" }] },
    { type: "blank" },
  ],

  projects: () => [
    { type: "header", text: "// ALL PROJECTS" },
    { type: "blank" },
    { type: "track", text: "⬡  WEB DEVELOPMENT", color: "orange" },
    { type: "blank" },
    { type: "project", title: "Finance Tracker", badge: "MERN", color: "orange", lines: ["JWT auth · 10+ endpoints · MongoDB query optimisation (-25% latency)", "Dashboards · CSV export · 5+ core features"] },
    { type: "blank" },
    { type: "project", title: "Blockchain Voting System", badge: "WEB3", color: "cyan", lines: ["On-chain integrity · wallet auth · 50+ simulated sessions"] },
    { type: "blank" },
    { type: "project", title: "URL Shortener API", badge: "API", color: "green", lines: ["Hashing · expiry logic · 30% faster redirects via indexing"] },
    { type: "blank" },
    { type: "project", title: "Netflix Clone", badge: "REACT", color: "orange", lines: ["Live API data · responsive UI · reusable hooks & components"] },
    { type: "blank" },
    { type: "track", text: "◈  ML / AI", color: "cyan" },
    { type: "blank" },
    { type: "project", title: "Math Score Predictor", badge: "END-TO-END ML", color: "cyan", lines: ["XGBoost · R²=0.88 · Docker + AWS Elastic Beanstalk deployment"] },
    { type: "blank" },
    { type: "project", title: "Spam Email Classifier", badge: "NLP", color: "green", lines: ["TF-IDF · 3000+ features · Logistic Regression · 95% accuracy"] },
    { type: "blank" },
  ],

  contact: () => [
    { type: "header", text: "// CONTACT" },
    { type: "blank" },
    { type: "contact-row", icon: "✉", label: "Email", value: PROFILE.email, link: `mailto:${PROFILE.email}` },
    { type: "contact-row", icon: "⬡", label: "LinkedIn", value: PROFILE.linkedin, link: `https://${PROFILE.linkedin}` },
    { type: "contact-row", icon: "◉", label: "GitHub", value: PROFILE.github, link: `https://${PROFILE.github}` },
    { type: "contact-row", icon: "☎", label: "Phone", value: PROFILE.phone, link: `tel:${PROFILE.phone}` },
    { type: "blank" },
    { type: "accent", text: "  Open to: Software Dev Internship · ML Research · Collaboration" },
    { type: "blank" },
    { type: "dim", text: '  → Or just ask me anything right here. I respond in milliseconds 😄' },
    { type: "blank" },
  ],

  resume: () => [
    { type: "header", text: "// RESUME" },
    { type: "blank" },
    { type: "info", text: "  Two resume tracks available:" },
    { type: "blank" },
    { type: "bullet", text: "Software Development Resume" },
    { type: "item", text: "MERN Stack · REST APIs · Backend Systems" },
    { type: "blank" },
    { type: "bullet", text: "ML / AI Research Resume" },
    { type: "item", text: "End-to-End Pipelines · Docker · AWS · PyTorch" },
    { type: "blank" },
    { type: "accent", text: "  → Add your Google Drive / PDF links to go live." },
    { type: "blank" },
  ],
};

// ── Render a single output "block" ──────────────────────────────────────────
function Block({ block, isMobile }) {
  const tagColors = { green: "#00ff88", cyan: "#00e5ff", orange: "#ff6b2b", yellow: "#ffd60a", red: "#ff3b5c" };
  const fs = isMobile ? "0.72rem" : "0.77rem";
  const fsSmall = isMobile ? "0.65rem" : "0.72rem";

  switch (block.type) {
    case "blank": return <div style={{ height: "0.5rem" }} />;
    case "ascii":
      return <pre style={{ color: "rgba(0,255,136,0.45)", fontSize: isMobile ? "0.38rem" : "0.52rem", lineHeight: 1.3, letterSpacing: "0.03em", marginBottom: "0.5rem", overflowX: "auto" }}>{block.text}</pre>;
    case "header":
      return <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: isMobile ? "0.78rem" : "0.88rem", color: "#00ff88", letterSpacing: "0.05em", textShadow: "0 0 18px rgba(0,255,136,0.4)", marginBottom: "0.1rem" }}>{block.text}</div>;
    case "subheader":
      return <div style={{ fontSize: "0.62rem", color: "#00e5ff", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "0.2rem" }}>{block.text}</div>;
    case "separator":
      return <div style={{ color: "#1e3a4a", fontSize: "0.7rem", letterSpacing: "-0.05em" }}>{block.text || "─".repeat(isMobile ? 30 : 60)}</div>;
    case "info":
      return <div style={{ fontSize: fs, color: "#e8f4f8", lineHeight: 1.7 }}>{block.text}</div>;
    case "dim":
      return <div style={{ fontSize: fsSmall, color: "#3a6070", lineHeight: 1.7 }}>{block.text}</div>;
    case "accent":
      return <div style={{ fontSize: fs, color: "#00e5ff", lineHeight: 1.7 }}>{block.text}</div>;
    case "green":
      return <div style={{ fontSize: fs, color: "#00ff88", lineHeight: 1.7 }}>{block.text}</div>;
    case "yellow":
      return <div style={{ fontSize: fs, color: "#ffd60a", lineHeight: 1.7 }}>{block.text}</div>;
    case "orange":
      return <div style={{ fontSize: fs, color: "#ff6b2b", lineHeight: 1.7 }}>{block.text}</div>;
    case "bullet":
      return <div style={{ fontSize: fs, color: "#e8f4f8", lineHeight: 1.7 }}><span style={{ color: "rgba(0,255,136,0.55)" }}>  ▸ </span>{block.text}</div>;
    case "item":
      return <div style={{ fontSize: fsSmall, color: "#3a6070", lineHeight: 1.7, paddingLeft: "1.8rem" }}>{block.text}</div>;
    case "track":
      return (
        <div style={{ fontSize: fsSmall, fontWeight: 700, color: block.color === "orange" ? "#ff6b2b" : "#00e5ff", letterSpacing: "0.1em", borderLeft: `2px solid ${block.color === "orange" ? "#ff6b2b" : "#00e5ff"}`, paddingLeft: "0.75rem", textTransform: "uppercase" }}>
          {block.text}
        </div>
      );
    case "tags":
      return (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", paddingLeft: "1rem" }}>
          {block.tags.map((t, i) => (
            <span key={i} style={{ fontSize: "0.6rem", color: "#020408", background: tagColors[t.color] || "#00ff88", padding: "0.1rem 0.5rem", borderRadius: "1px", letterSpacing: "0.06em", fontWeight: 700 }}>{t.label}</span>
          ))}
        </div>
      );
    case "cmd-row":
      return (
        <div style={{ fontSize: fs, lineHeight: 1.9, display: "flex", gap: isMobile ? "0.6rem" : "1.2rem", flexWrap: isMobile ? "wrap" : "nowrap" }}>
          <span style={{ color: "#00ff88", minWidth: isMobile ? "5.5rem" : "7rem" }}>&gt; {block.cmd}</span>
          {!isMobile && <span style={{ color: "#3a6070" }}>─</span>}
          <span style={{ color: "#b8d4dc" }}>{block.desc}</span>
        </div>
      );
    case "project":
      const pColor = block.color === "orange" ? "#ff6b2b" : block.color === "green" ? "#00ff88" : "#00e5ff";
      return (
        <div style={{ borderLeft: `1px solid ${pColor}44`, paddingLeft: "1rem", marginLeft: "0.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.2rem", flexWrap: "wrap" }}>
            <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: isMobile ? "0.78rem" : "0.82rem", color: "#e8f4f8" }}>{block.title}</span>
            <span style={{ fontSize: "0.58rem", color: "#020408", background: pColor, padding: "0.05rem 0.45rem", letterSpacing: "0.08em", fontWeight: 700, flexShrink: 0 }}>{block.badge}</span>
          </div>
          {block.lines.map((l, i) => (
            <div key={i} style={{ fontSize: isMobile ? "0.68rem" : "0.71rem", color: "#3a6070", lineHeight: 1.75 }}>
              <span style={{ color: pColor + "55" }}>  · </span>{l}
            </div>
          ))}
        </div>
      );
    case "contact-row":
      return (
        <div style={{ display: "flex", alignItems: isMobile ? "flex-start" : "baseline", flexDirection: isMobile ? "column" : "row", gap: isMobile ? "0.1rem" : "1rem", padding: "0.35rem 0", fontSize: fs, borderBottom: "1px solid #0d2030" }}>
          <div style={{ display: "flex", gap: "0.6rem", alignItems: "center" }}>
            <span style={{ color: "#00e5ff", width: "1rem", textAlign: "center" }}>{block.icon}</span>
            <span style={{ color: "#3a6070", minWidth: isMobile ? "4rem" : "5.5rem", fontSize: "0.62rem", letterSpacing: "0.08em", textTransform: "uppercase" }}>{block.label}</span>
          </div>
          <a href={block.link} target="_blank" rel="noreferrer" style={{ color: "#00e5ff", textDecoration: "none", fontWeight: 600, paddingLeft: isMobile ? "1.6rem" : 0, fontSize: isMobile ? "0.68rem" : fs, wordBreak: "break-all" }}
            onMouseEnter={e => e.target.style.textDecoration = "underline"}
            onMouseLeave={e => e.target.style.textDecoration = "none"}>
            {block.value}
          </a>
        </div>
      );
    case "ai":
      return (
        <div style={{ borderLeft: "2px solid #00e5ff", paddingLeft: "1rem", margin: "0.6rem 0", background: "rgba(0,229,255,0.02)", paddingTop: "0.35rem", paddingBottom: "0.35rem" }}>
          <div style={{ fontSize: "0.58rem", letterSpacing: "0.15em", color: "#00e5ff", textTransform: "uppercase", marginBottom: "0.35rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span>◈</span> BHAVDEEP<span style={{ color: "#3a6070" }}>AI</span>
          </div>
          <div style={{ fontSize: fs, color: "#b8d4dc", lineHeight: 1.85, whiteSpace: "pre-wrap" }}>{block.text}</div>
        </div>
      );
    case "thinking":
      return (
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "rgba(0,229,255,0.5)", fontSize: fsSmall, padding: "0.3rem 0" }}>
          <span>◈</span>
          <span>BhavdeepAI is thinking</span>
          <span>
            {[0, 1, 2].map(i => (
              <span key={i} style={{ animation: `think 1.2s ease ${i * 0.2}s infinite`, opacity: 0, display: "inline-block" }}>.</span>
            ))}
          </span>
        </div>
      );
    case "cmd-echo":
      return <div style={{ fontSize: isMobile ? "0.75rem" : "0.8rem", color: "#00ff88" }}><span style={{ color: "rgba(0,255,136,0.5)" }}>❯ </span>{block.text}</div>;
    case "error":
      return <div style={{ fontSize: fs, color: "#ff3b5c" }}>{block.text}</div>;
    default:
      return <div style={{ fontSize: fs, color: "#e8f4f8" }}>{block.text || ""}</div>;
  }
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function BhavdeepAI() {
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [booted, setBooted] = useState(false);
  const [cmdHistory, setCmdHistory] = useState([]);
  const [histIdx, setHistIdx] = useState(-1);
  const outputRef = useRef(null);
  const inputRef = useRef(null);

  const scrollBottom = useCallback(() => {
    setTimeout(() => {
      if (outputRef.current) outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }, 30);
  }, []);

  const push = useCallback((blocks) => {
    setHistory(h => [...h, ...blocks]);
    scrollBottom();
  }, [scrollBottom]);

  // Boot sequence
  useEffect(() => {
    if (booted) return;
    setBooted(true);
    const bootLines = [
      { type: "ascii", text: ASCII_LOGO },
      { type: "green", text: "  BhavdeepAI v1.0  —  Interactive Portfolio Terminal" },
      { type: "separator" },
      { type: "blank" },
      { type: "dim", text: "  Initializing modules..." },
      { type: "dim", text: "  [██████████] WebDev         ✔ loaded" },
      { type: "dim", text: "  [██████████] ML/DL/NLP      ✔ loaded" },
      { type: "dim", text: "  [██████████] Claude AI API  ✔ connected" },
      { type: "blank" },
      { type: "green", text: "  System ready. Welcome." },
      { type: "blank" },
      { type: "info", text: "  You're not just browsing a portfolio." },
      { type: "accent", text: '  You\'re interacting with an AI system built around Bhavdeep Singh.' },
      { type: "blank" },
      { type: "dim", text: '  Type "help" to see commands, or ask me anything directly.' },
      { type: "blank" },
      { type: "separator" },
      { type: "blank" },
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i < bootLines.length) {
        setHistory(h => [...h, bootLines[i]]);
        i++;
        scrollBottom();
      } else {
        clearInterval(interval);
      }
    }, 60);
    return () => clearInterval(interval);
  }, [booted, scrollBottom]);

  // Focus terminal on click anywhere
  const focusInput = () => inputRef.current?.focus();

  // Run a built-in command
  const runCommand = useCallback((cmd) => {
    const echo = { type: "cmd-echo", text: cmd };
    if (cmd === "clear") {
      setHistory([]);
      return;
    }
    const fn = COMMANDS[cmd];
    if (fn) {
      push([echo, ...fn()]);
    } else {
      push([echo, { type: "error", text: `  command not found: ${cmd}` }, { type: "dim", text: '  Type "help" for available commands.' }, { type: "blank" }]);
    }
    setCmdHistory(h => [cmd, ...h]);
    setHistIdx(-1);
    scrollBottom();
  }, [push, scrollBottom]);

  // AI free-form query
  const askAI = useCallback(async (question) => {
    push([
      { type: "cmd-echo", text: question },
      { type: "thinking" },
    ]);
    setLoading(true);

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: [{ role: "user", content: question }],
        }),
      });
      const data = await res.json();
      const text = data?.content?.[0]?.text || "Sorry, I couldn't process that.";

      setHistory(h => {
        const updated = [...h];
        const thinkIdx = updated.findLastIndex(b => b.type === "thinking");
        if (thinkIdx !== -1) updated[thinkIdx] = { type: "ai", text };
        return updated;
      });
    } catch {
      setHistory(h => {
        const updated = [...h];
        const thinkIdx = updated.findLastIndex(b => b.type === "thinking");
        if (thinkIdx !== -1) updated[thinkIdx] = { type: "error", text: "  ✕ Connection error. Check your API key." };
        return updated;
      });
    }

    push([{ type: "blank" }]);
    setLoading(false);
    scrollBottom();
  }, [push, scrollBottom]);

  // Handle submit
  const handleSubmit = useCallback(() => {
    const val = input.trim();
    if (!val) return;
    setInput("");
    setCmdHistory(h => [val, ...h]);
    setHistIdx(-1);

    const lower = val.toLowerCase();
    if (COMMANDS[lower]) {
      runCommand(lower);
    } else {
      askAI(val);
    }
  }, [input, runCommand, askAI]);

  // Keyboard handling
  const handleKeyDown = (e) => {
    if (e.key === "Enter") { handleSubmit(); return; }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(histIdx + 1, cmdHistory.length - 1);
      setHistIdx(next);
      setInput(cmdHistory[next] || "");
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(histIdx - 1, -1);
      setHistIdx(next);
      setInput(next === -1 ? "" : cmdHistory[next] || "");
    }
    if (e.key === "Tab") {
      e.preventDefault();
      const cmds = Object.keys(COMMANDS);
      const match = cmds.find(c => c.startsWith(input.toLowerCase()));
      if (match) setInput(match);
    }
  };

  const isMobile = useIsMobile();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const mobileRunCommand = useCallback((cmd) => {
    setDrawerOpen(false);
    runCommand(cmd);
    setTimeout(() => inputRef.current?.focus(), 100);
  }, [runCommand]);

  const SIDEBAR_ITEMS = [
    { icon: "?", cmd: "help" }, { icon: "◉", cmd: "about" }, { icon: "⬡", cmd: "projects" },
    { icon: "◈", cmd: "skills" }, { icon: "⬡", cmd: "web" }, { icon: "⬡", cmd: "ml" },
    { icon: "✉", cmd: "contact" }, { icon: "↓", cmd: "resume" }, { icon: "✕", cmd: "clear" },
  ];

  return (
    <div onClick={focusInput} style={{ height: "100vh", display: "flex", flexDirection: "column", background: "#020408", fontFamily: "'JetBrains Mono', monospace", cursor: "text", overflow: "hidden", position: "relative" }}>

      {/* Scanlines */}
      <div style={{ position: "fixed", inset: 0, backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.07) 2px, rgba(0,0,0,0.07) 4px)", pointerEvents: "none", zIndex: 50 }} />
      {/* Vignette */}
      <div style={{ position: "fixed", inset: 0, background: "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.7) 100%)", pointerEvents: "none", zIndex: 49 }} />

      {/* ── MOBILE DRAWER OVERLAY ── */}
      {isMobile && drawerOpen && (
        <div
          onClick={(e) => { e.stopPropagation(); setDrawerOpen(false); }}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 200 }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "#060c12", borderTop: "1px solid #0d2030", padding: "1rem", maxHeight: "70vh", overflowY: "auto" }}
          >
            <div style={{ fontSize: "0.58rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#1e3a4a", marginBottom: "0.8rem", paddingBottom: "0.4rem", borderBottom: "1px solid #0d2030" }}>// commands</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.4rem" }}>
              {SIDEBAR_ITEMS.map((item, i) => (
                <button key={i} onClick={() => mobileRunCommand(item.cmd)}
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem", background: "rgba(0,229,255,0.04)", border: "1px solid #0d2030", color: "rgba(0,229,255,0.7)", fontFamily: "'JetBrains Mono',monospace", fontSize: "0.72rem", padding: "0.65rem 0.5rem", cursor: "pointer", borderRadius: "2px" }}>
                  <span style={{ color: "rgba(0,255,136,0.6)" }}>{item.icon}</span>
                  {item.cmd}
                </button>
              ))}
            </div>
            <div style={{ marginTop: "0.8rem", fontSize: "0.6rem", color: "#1e3a4a", textAlign: "center" }}>tap a command · or type freely below</div>
          </div>
        </div>
      )}

      {/* ── TOP BAR ── */}
      <div style={{ flexShrink: 0, borderBottom: "1px solid #0d2030", padding: isMobile ? "0.5rem 1rem" : "0.55rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", background: "#060c12", zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: isMobile ? "0.8rem" : "1.2rem" }}>
          <div style={{ display: "flex", gap: "0.4rem" }}>
            {[["#ff5f57","rgba(255,95,87,0.6)"],["#febc2e","rgba(254,188,46,0.6)"],["#28c840","rgba(40,200,64,0.6)"]].map(([bg,shadow],i) => (
              <div key={i} style={{ width: isMobile ? 10 : 12, height: isMobile ? 10 : 12, borderRadius: "50%", background: bg, boxShadow: `0 0 6px ${shadow}` }} />
            ))}
          </div>
          <span style={{ fontSize: isMobile ? "0.62rem" : "0.7rem", letterSpacing: "0.1em", color: "#3a6070" }}>
            bhavdeep<span style={{ color: "#00ff88" }}>AI</span>
            {!isMobile && <><span>@portfolio ~ </span><span style={{ color: "#00ff88" }}>v1.0</span></>}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: isMobile ? "0.6rem" : "1.5rem" }}>
          {!isMobile && <span style={{ fontSize: "0.6rem", color: "#1e3a4a", letterSpacing: "0.06em" }}>bash · zsh · fish</span>}
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: isMobile ? "0.56rem" : "0.62rem", letterSpacing: "0.08em", color: "#00ff88", border: "1px solid rgba(0,255,136,0.2)", padding: isMobile ? "0.15rem 0.5rem" : "0.18rem 0.65rem" }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#00ff88", animation: "blink 1.5s ease infinite" }} />
            {isMobile ? "ONLINE" : "SYSTEM ONLINE"}
          </div>
          {isMobile && (
            <button onClick={(e) => { e.stopPropagation(); setDrawerOpen(o => !o); }}
              style={{ background: "rgba(0,229,255,0.07)", border: "1px solid #0d2030", color: "#00e5ff", fontFamily: "'JetBrains Mono',monospace", fontSize: "0.62rem", padding: "0.3rem 0.65rem", cursor: "pointer", letterSpacing: "0.06em" }}>
              ⬡ cmds
            </button>
          )}
        </div>
      </div>

      {/* ── BODY ── */}
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: isMobile ? "1fr" : "210px 1fr", overflow: "hidden" }}>

        {/* ── SIDEBAR (desktop only) ── */}
        {!isMobile && (
          <div style={{ borderRight: "1px solid #0d2030", background: "#060c12", overflowY: "auto", display: "flex", flexDirection: "column", padding: "1.2rem 0" }}>
            <div style={{ padding: "0 1rem", marginBottom: "1.5rem" }}>
              <div style={{ fontSize: "0.53rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#1e3a4a", marginBottom: "0.7rem", paddingBottom: "0.35rem", borderBottom: "1px solid #0d2030" }}>// commands</div>
              {SIDEBAR_ITEMS.map((item, ii) => (
                <button key={ii} onClick={(e) => { e.stopPropagation(); runCommand(item.cmd); }}
                  style={{ display: "flex", alignItems: "center", gap: "0.55rem", width: "100%", background: "transparent", border: "none", color: "rgba(0,229,255,0.5)", fontFamily: "'JetBrains Mono',monospace", fontSize: "0.72rem", padding: "0.42rem 0.5rem", cursor: "pointer", textAlign: "left", borderRadius: "2px", transition: "all 0.15s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(0,229,255,0.05)"; e.currentTarget.style.color = "#00e5ff"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(0,229,255,0.5)"; }}>
                  <span style={{ color: "rgba(0,255,136,0.5)", width: "1rem", textAlign: "center", fontSize: "0.78rem" }}>{item.icon}</span>
                  <span style={{ color: "rgba(0,255,136,0.45)", marginRight: "0.1rem" }}>&gt; </span>
                  {item.cmd}
                </button>
              ))}
            </div>
            <div style={{ padding: "0 1rem", marginTop: "auto", borderTop: "1px solid #0d2030", paddingTop: "1rem" }}>
              <div style={{ fontSize: "0.56rem", color: "#1e3a4a", lineHeight: 2, letterSpacing: "0.04em" }}>
                <div><span style={{ color: "rgba(0,255,136,0.4)" }}>↑↓</span> command history</div>
                <div><span style={{ color: "rgba(0,255,136,0.4)" }}>Tab</span>  autocomplete</div>
                <div><span style={{ color: "rgba(0,255,136,0.4)" }}>Ask</span>  anything freely</div>
              </div>
            </div>
          </div>
        )}

        {/* ── TERMINAL OUTPUT ── */}
        <div style={{ display: "flex", flexDirection: "column", overflow: "hidden", background: "#020408" }}>
          <div ref={outputRef} onClick={focusInput} style={{ flex: 1, overflowY: "auto", padding: isMobile ? "1rem" : "1.5rem 2rem", scrollbarWidth: "thin", scrollbarColor: "#1e3a4a transparent" }}>
            <style>{`
              @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;600;700&family=Syne:wght@700;800&display=swap');
              @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.2} }
              @keyframes think { 0%,100%{opacity:0.2} 50%{opacity:1} }
              @keyframes fadeIn { from{opacity:0;transform:translateY(3px)} to{opacity:1;transform:none} }
              ::-webkit-scrollbar { width: 3px; }
              ::-webkit-scrollbar-thumb { background: #1e3a4a; }
              ::-webkit-scrollbar-track { background: transparent; }
            `}</style>
            {history.map((block, i) => (
              <div key={i} style={{ animation: "fadeIn 0.2s ease both" }}>
                <Block block={block} isMobile={isMobile} />
              </div>
            ))}
          </div>

          {/* ── INPUT BAR ── */}
          <div style={{ flexShrink: 0, borderTop: "1px solid #0d2030", background: "#060c12", padding: isMobile ? "0.65rem 1rem" : "0.7rem 2rem", display: "flex", alignItems: "center", gap: isMobile ? "0.5rem" : "0.75rem" }}>
            <span style={{ color: "#00ff88", fontSize: isMobile ? "0.72rem" : "0.82rem", textShadow: "0 0 12px rgba(0,255,136,0.5)", whiteSpace: "nowrap" }}>
              {isMobile ? <><span style={{ color: "#ffd60a" }}>❯</span></> : <>bhavdeep@AI <span style={{ color: "rgba(0,255,136,0.4)" }}>~</span> <span style={{ color: "#ffd60a" }}>❯</span></>}
            </span>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
              placeholder={loading ? "BhavdeepAI thinking..." : isMobile ? "type a command or question..." : "type a command or ask anything..."}
              autoFocus={!isMobile}
              style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: "#e8f4f8", fontFamily: "'JetBrains Mono',monospace", fontSize: isMobile ? "0.78rem" : "0.82rem", caretColor: "#00ff88", minWidth: 0 }}
            />
            {isMobile ? (
              <button
                onClick={(e) => { e.stopPropagation(); handleSubmit(); }}
                style={{ background: "#00ff88", border: "none", color: "#020408", fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, fontSize: "0.68rem", padding: "0.45rem 0.8rem", cursor: "pointer", flexShrink: 0, letterSpacing: "0.05em" }}>
                ↵
              </button>
            ) : (
              <span style={{ fontSize: "0.58rem", color: "#1e3a4a", letterSpacing: "0.06em", whiteSpace: "nowrap" }}>
                {loading ? "⟳ streaming..." : "↵ enter · ↑↓ history · Tab autocomplete"}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
