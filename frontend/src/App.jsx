import { useState, useEffect, useRef } from "react";
import axios from "axios";


const C = {
  bg: "#0A0B14",
  bgCard: "#10121E",
  bgCard2: "#161929",
  accent: "#6C63FF",
  accentLight: "#8B84FF",
  accentDark: "#4F48D4",
  teal: "#00D4AA",
  tealDark: "#00A882",
  pink: "#FF4D8D",
  text: "#F0F0FF",
  textMuted: "#8B8FA8",
  textDim: "#5A5D72",
  border: "#1E2235",
  borderLight: "#2A2D42",
  success: "#00D4AA",
  warning: "#FFB800",
  danger: "#FF4D6D",
  info: "#6C63FF",
  gradient: "linear-gradient(135deg, #6C63FF 0%, #00D4AA 100%)",
  gradientPink: "linear-gradient(135deg, #FF4D8D 0%, #6C63FF 100%)",
};

const STARTUPS = [
  { id: 1, name: "NeuralCart", logo: "🛒", tagline: "AI-powered e-commerce personalization", category: "E-Commerce / AI", stage: "MVP", roles: ["React Dev", "ML Engineer", "UI Designer"], skills: ["React", "Python", "TensorFlow"], compensation: "Equity", workType: "Remote", location: "San Francisco, CA", deadline: "2025-03-01", founder: { name: "Arjun Sharma", avatar: "AS" }, description: "NeuralCart uses advanced ML to predict what customers want before they search. We're reinventing online shopping with hyper-personalization at scale.", applications: 24, saved: false, founded: "2024" },
  { id: 2, name: "GreenTrack", logo: "🌱", tagline: "Carbon footprint tracking for enterprises", category: "CleanTech / SaaS", stage: "Launched", roles: ["Full-Stack Dev", "Data Engineer", "Marketing Lead"], skills: ["Node.js", "PostgreSQL", "React"], compensation: "Paid", workType: "Hybrid", location: "Berlin, Germany", deadline: "2025-02-15", founder: { name: "Lena Weber", avatar: "LW" }, description: "GreenTrack helps companies measure, report, and reduce their carbon emissions with real-time dashboards and automated ESG reporting.", applications: 41, saved: true, founded: "2023" },
  { id: 3, name: "MediSync", logo: "🏥", tagline: "Connecting patients with specialist doctors", category: "HealthTech", stage: "Prototype", roles: ["Backend Dev", "Mobile Dev", "UX Researcher"], skills: ["Flutter", "Django", "AWS"], compensation: "Equity + Paid", workType: "Remote", location: "New York, NY", deadline: "2025-04-10", founder: { name: "Dr. Priya Nair", avatar: "PN" }, description: "MediSync eliminates the 6-week wait time to see a specialist. Our platform uses AI triage to match patients with the right doctor instantly.", applications: 18, saved: false, founded: "2024" },
  { id: 4, name: "EduVerse", logo: "🎓", tagline: "Immersive VR learning for K-12 students", category: "EdTech / AR/VR", stage: "Idea", roles: ["Unity Dev", "3D Artist", "Content Creator"], skills: ["Unity", "C#", "Blender"], compensation: "Equity", workType: "Remote", location: "London, UK", deadline: "2025-03-20", founder: { name: "Marcus Chen", avatar: "MC" }, description: "EduVerse transforms classrooms into immersive virtual worlds. Students explore ancient Rome, dive into DNA structures, and travel through time.", applications: 33, saved: true, founded: "2024" },
  { id: 5, name: "FinPilot", logo: "💰", tagline: "Automated financial planning for millennials", category: "FinTech", stage: "MVP", roles: ["iOS Dev", "Data Scientist", "Growth Marketer"], skills: ["Swift", "Python", "SQL"], compensation: "Paid", workType: "Onsite", location: "Singapore", deadline: "2025-02-28", founder: { name: "Riya Patel", avatar: "RP" }, description: "FinPilot is your AI financial co-pilot. It analyzes your spending, automates savings, and builds a personalized investment strategy in minutes.", applications: 57, saved: false, founded: "2023" },
  { id: 6, name: "LogiFlow", logo: "🚚", tagline: "Real-time logistics optimization platform", category: "Logistics / AI", stage: "Launched", roles: ["DevOps Engineer", "React Dev", "Business Analyst"], skills: ["Kubernetes", "React", "Python"], compensation: "Equity + Paid", workType: "Hybrid", location: "Dubai, UAE", deadline: "2025-05-01", founder: { name: "Ahmed Al-Rashid", avatar: "AA" }, description: "LogiFlow reduces delivery costs by 40% using AI-powered route optimization and real-time supply chain visibility.", applications: 29, saved: false, founded: "2023" },
];

const MESSAGES = [
  { id: 1, from: "Lena Weber", fromAvatar: "LW", fromRole: "Founder – GreenTrack", preview: "Hi! Loved your profile. Would you be interested...", time: "2m ago", unread: 3, messages: [
    { id: 1, sender: "Lena Weber", text: "Hi! Loved your profile. Would you be interested in joining GreenTrack as a Full-Stack Dev?", time: "10:32 AM", isMe: false },
    { id: 2, sender: "Me", text: "Hey Lena! Absolutely, GreenTrack sounds fascinating. I've been following the space closely.", time: "10:35 AM", isMe: true },
    { id: 3, sender: "Lena Weber", text: "We're building the carbon tracking layer for Fortune 500 companies. The role is 20hrs/week, equity + $3k/mo.", time: "10:37 AM", isMe: false },
    { id: 4, sender: "Lena Weber", text: "Can you hop on a call this Thursday?", time: "10:37 AM", isMe: false },
  ]},
  { id: 2, from: "Arjun Sharma", fromAvatar: "AS", fromRole: "Founder – NeuralCart", preview: "Your application has been shortlisted! We'd like to...", time: "1h ago", unread: 1, messages: [
    { id: 1, sender: "Arjun Sharma", text: "Your application has been shortlisted! We'd like to schedule a technical interview.", time: "9:15 AM", isMe: false },
    { id: 2, sender: "Me", text: "That's great news! I'm available anytime this week.", time: "9:45 AM", isMe: true },
  ]},
  { id: 3, from: "Dr. Priya Nair", fromAvatar: "PN", fromRole: "Founder – MediSync", preview: "Thanks for applying to MediSync. We reviewed...", time: "Yesterday", unread: 0, messages: [
    { id: 1, sender: "Dr. Priya Nair", text: "Thanks for applying to MediSync. We reviewed your application and would like to move forward.", time: "Yesterday", isMe: false },
  ]},
];

const NOTIFICATIONS = [
  { id: 1, type: "application", title: "Application Shortlisted", body: "NeuralCart shortlisted your application for React Dev role", time: "2m ago", read: false, icon: "⚡" },
  { id: 2, type: "message", title: "New Message", body: "Lena Weber sent you a message about GreenTrack", time: "1h ago", read: false, icon: "💬" },
  { id: 3, type: "startup", title: "New Match Found", body: "3 new startups match your skills in React & TypeScript", time: "3h ago", read: true, icon: "🎯" },
  { id: 4, type: "application", title: "Application Accepted", body: "Congratulations! LogiFlow accepted your application", time: "Yesterday", read: true, icon: "✅" },
  { id: 5, type: "startup", title: "Deadline Reminder", body: "FinPilot application closes in 3 days", time: "2 days ago", read: true, icon: "⏰" },
];

const APPLICATIONS = [
  { id: 1, startup: "NeuralCart", logo: "🛒", role: "React Developer", status: "shortlisted", applied: "Jan 15", compensation: "Equity", founder: "Arjun Sharma" },
  { id: 2, startup: "GreenTrack", logo: "🌱", role: "Full-Stack Developer", status: "pending", applied: "Jan 20", compensation: "Paid", founder: "Lena Weber" },
  { id: 3, startup: "LogiFlow", logo: "🚚", role: "React Developer", status: "accepted", applied: "Jan 8", compensation: "Equity + Paid", founder: "Ahmed Al-Rashid" },
  { id: 4, startup: "EduVerse", logo: "🎓", role: "Unity Developer", status: "rejected", applied: "Dec 28", compensation: "Equity", founder: "Marcus Chen" },
];

// ─── Shared Components ────────────────────────────────────────────────────────
const Badge = ({ children, color = C.accent, bg }) => (
  <span style={{ background: bg || `${color}22`, color, padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 4 }}>{children}</span>
);

const Button = ({ children, onClick, variant = "primary", size = "md", style: sx = {}, disabled }) => {
  const sizes = { sm: { padding: "7px 16px", fontSize: 13 }, md: { padding: "10px 22px", fontSize: 14 }, lg: { padding: "14px 32px", fontSize: 15 } };
  const variants = {
    primary: { background: C.gradient, color: "#fff", border: "none", fontWeight: 600 },
    secondary: { background: "transparent", color: C.text, border: `1px solid ${C.border}`, fontWeight: 500 },
    ghost: { background: "transparent", color: C.textMuted, border: "none", fontWeight: 500 },
    danger: { background: `${C.danger}22`, color: C.danger, border: `1px solid ${C.danger}44`, fontWeight: 600 },
    success: { background: `${C.success}22`, color: C.success, border: `1px solid ${C.success}44`, fontWeight: 600 },
  };
  return (
    <button onClick={onClick} disabled={disabled}
      style={{ ...sizes[size], ...variants[variant], borderRadius: 10, cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.5 : 1, transition: "all 0.2s", display: "inline-flex", alignItems: "center", gap: 8, ...sx }}>
      {children}
    </button>
  );
};

const Avatar = ({ initials, size = 36, color = C.accent }) => (
  <div style={{ width: size, height: size, borderRadius: "50%", background: `${color}33`, border: `2px solid ${color}55`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.35, fontWeight: 700, color, flexShrink: 0 }}>
    {initials}
  </div>
);

const Card = ({ children, style: sx = {}, onClick, hover = false }) => (
  <div onClick={onClick}
    style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 16, padding: "1.25rem", transition: "all 0.2s", cursor: hover ? "pointer" : "default", ...sx }}
    onMouseEnter={hover ? e => { e.currentTarget.style.borderColor = C.borderLight; e.currentTarget.style.transform = "translateY(-2px)"; } : null}
    onMouseLeave={hover ? e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.transform = "translateY(0)"; } : null}>
    {children}
  </div>
);

const Tag = ({ children }) => (
  <span style={{ background: C.bgCard2, color: C.textMuted, padding: "4px 10px", borderRadius: 6, fontSize: 12, border: `1px solid ${C.border}` }}>{children}</span>
);

const StatusBadge = ({ status }) => {
  const map = { pending: [C.warning, "Pending"], shortlisted: [C.accent, "Shortlisted ⚡"], accepted: [C.success, "Accepted ✓"], rejected: [C.danger, "Rejected"] };
  const [color, label] = map[status] || [C.textMuted, status];
  return <Badge color={color}>{label}</Badge>;
};

const StageBadge = ({ stage }) => {
  const map = { "Idea": C.textMuted, "Prototype": C.warning, "MVP": C.accent, "Launched": C.success };
  return <Badge color={map[stage] || C.accent}>{stage}</Badge>;
};

const Input = ({ label, value, onChange, type = "text", placeholder, style: sx = {} }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
    {label && <label style={{ fontSize: 13, color: C.textMuted, fontWeight: 500 }}>{label}</label>}
    <input type={type} value={value} onChange={onChange} placeholder={placeholder}
      style={{ background: C.bgCard2, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", color: C.text, fontSize: 14, outline: "none", ...sx }}
      onFocus={e => e.target.style.borderColor = C.accent}
      onBlur={e => e.target.style.borderColor = C.border} />
  </div>
);

const Select = ({ label, value, onChange, options }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
    {label && <label style={{ fontSize: 13, color: C.textMuted, fontWeight: 500 }}>{label}</label>}
    <select value={value} onChange={onChange}
      style={{ background: C.bgCard2, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", color: C.text, fontSize: 14, outline: "none" }}>
      {options.map(o => <option key={o} value={o} style={{ background: C.bgCard }}>{o}</option>)}
    </select>
  </div>
);

const Modal = ({ open, onClose, title, children, width = 540 }) => {
  if (!open) return null;
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 20, width: "100%", maxWidth: width, maxHeight: "90vh", overflow: "auto", padding: "1.75rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
          <h3 style={{ color: C.text, fontSize: 18, fontWeight: 700, margin: 0 }}>{title}</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", color: C.textMuted, fontSize: 20, cursor: "pointer", padding: 4 }}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
};

// ─── Landing Page ─────────────────────────────────────────────────────────────
function LandingPage({ onNavigate }) {
  const [activeFaq, setActiveFaq] = useState(null);

  const faqs = [
    { q: "Is StartSync free to use?", a: "StartSync is completely free for collaborators. Founders get 3 free listings per month; the Pro plan unlocks unlimited listings and advanced analytics." },
    { q: "How are collaborators vetted?", a: "Collaborators build verified profiles with skill assessments, GitHub/portfolio links, and peer endorsements. Founders can review full profiles before reaching out." },
    { q: "What types of compensation are available?", a: "Founders can offer equity, paid roles, unpaid/volunteer, or internship opportunities. All compensation details are clearly listed on each startup card." },
    { q: "Can I apply to multiple startups?", a: "Absolutely! There's no limit on applications. We even suggest startups based on your skills and preferences to help you find the best fit." },
    { q: "How does the messaging system work?", a: "Once a founder shortlists your application, a direct chat unlocks between you and the founder. All messages are end-to-end encrypted and delivered in real-time." },
  ];

  const testimonials = [
    { name: "Sophia Kim", role: "CTO at NeuralCart", avatar: "SK", text: "Found our entire founding team through StartSync in 3 weeks. The quality of collaborators is exceptional — they actually care about the mission." },
    { name: "Dev Patel", role: "Full-Stack Dev", avatar: "DP", text: "Applied to 6 startups and got 4 interview requests. Ended up joining FinPilot with equity. StartSync changed my career trajectory completely." },
    { name: "Amara Diallo", role: "UX Designer", avatar: "AD", text: "The filter system is incredible. I found remote design roles in EdTech within minutes. The UI/UX of StartSync itself is beautifully designed!" },
  ];

  const steps = [
    { icon: "👤", title: "Create your profile", desc: "Founders list their startup. Collaborators showcase skills, portfolio, and what they're looking for." },
    { icon: "🔍", title: "Discover & Match", desc: "Browse curated startup listings. Our smart algorithm surfaces the best matches for your skills." },
    { icon: "💬", title: "Connect & Build", desc: "Apply, chat live, and join a startup team. Build something that matters." },
  ];

  const features = [
    { icon: "🚀", title: "Smart Matching", desc: "AI-powered role recommendations based on your skills and interests" },
    { icon: "⚡", title: "Real-Time Chat", desc: "Live messaging between founders and collaborators with unread indicators" },
    { icon: "🛡️", title: "Verified Profiles", desc: "GitHub, portfolio, and LinkedIn verification for trust and credibility" },
    { icon: "📊", title: "Application Tracking", desc: "Track every application with live status updates and notifications" },
    { icon: "🌍", title: "Global Network", desc: "Connect with startup teams from 50+ countries across every industry" },
    { icon: "🎯", title: "Role-Based Access", desc: "Customized dashboards for Founders, Collaborators, and Admins" },
  ];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Sora', 'Outfit', system-ui, sans-serif" }}>
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: `${C.bg}ee`, backdropFilter: "blur(20px)", borderBottom: `1px solid ${C.border}`, padding: "0 2rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: C.gradient, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>⚡</div>
            <span style={{ fontSize: 20, fontWeight: 800, background: C.gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>StartSync</span>
          </div>
          <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
            {["Home", "Browse Startups", "About", "Contact"].map(n => (
              <span key={n} onClick={() => n === "Browse Startups" && onNavigate("browse")}
                style={{ color: C.textMuted, fontSize: 14, fontWeight: 500, cursor: "pointer", transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color = C.text}
                onMouseLeave={e => e.target.style.color = C.textMuted}>{n}</span>
            ))}
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <Button variant="secondary" size="sm" onClick={() => onNavigate("login")}>Log In</Button>
            <Button size="sm" onClick={() => onNavigate("signup")}>Get Started →</Button>
          </div>
        </div>
      </nav>

      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "6rem 2rem 4rem", textAlign: "center", position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 600, height: 400, background: `radial-gradient(ellipse, ${C.accent}18 0%, transparent 70%)`, pointerEvents: "none" }} />
        <Badge color={C.teal} bg={`${C.teal}18`}>🚀 &nbsp;Now live — 2,400+ startups and growing</Badge>
        <h1 style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", fontWeight: 900, color: C.text, margin: "1.5rem 0 1rem", lineHeight: 1.1, letterSpacing: -1 }}>
          Where Startup Founders<br />
          <span style={{ background: C.gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Find Their Dream Team</span>
        </h1>
        <p style={{ fontSize: "1.15rem", color: C.textMuted, maxWidth: 560, margin: "0 auto 2.5rem", lineHeight: 1.7 }}>
          StartSync connects ambitious founders with world-class developers, designers, and marketers ready to build the next big thing — together.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Button size="lg" onClick={() => onNavigate("signup")}>Join as Collaborator →</Button>
          <Button variant="secondary" size="lg" onClick={() => onNavigate("signup")}>Post Your Startup</Button>
        </div>
        <div style={{ display: "flex", gap: "2.5rem", justifyContent: "center", marginTop: "3rem", flexWrap: "wrap" }}>
          {[["2,400+", "Startups Listed"], ["18,000+", "Collaborators"], ["94%", "Match Rate"], ["120+", "Countries"]].map(([num, label]) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "1.8rem", fontWeight: 800, background: C.gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{num}</div>
              <div style={{ fontSize: 13, color: C.textMuted }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "2rem 2rem 4rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16 }}>
          {STARTUPS.slice(0, 3).map(s => (
            <Card key={s.id} hover>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ fontSize: 28, background: C.bgCard2, borderRadius: 10, width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center" }}>{s.logo}</div>
                  <div>
                    <div style={{ fontWeight: 700, color: C.text, fontSize: 15 }}>{s.name}</div>
                    <div style={{ fontSize: 12, color: C.textMuted }}>{s.category}</div>
                  </div>
                </div>
                <StageBadge stage={s.stage} />
              </div>
              <p style={{ fontSize: 13, color: C.textMuted, marginBottom: 12, lineHeight: 1.6 }}>{s.tagline}</p>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
                {s.skills.slice(0, 3).map(sk => <Tag key={sk}>{sk}</Tag>)}
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ fontSize: 12, color: C.textMuted }}>📍 {s.workType} · {s.compensation}</div>
                <Badge color={C.accent}>{s.applications} applied</Badge>
              </div>
            </Card>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
          <Button variant="secondary" onClick={() => onNavigate("browse")}>Browse All Startups →</Button>
        </div>
      </section>

      <section style={{ background: C.bgCard, padding: "5rem 2rem" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <Badge color={C.accent}>How It Works</Badge>
          <h2 style={{ fontSize: "2rem", fontWeight: 800, color: C.text, margin: "1rem 0 3rem" }}>From idea to team in 3 steps</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
            {steps.map((s, i) => (
              <div key={i} style={{ textAlign: "center", padding: "1.5rem" }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>{s.icon}</div>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: C.gradient, color: "#fff", fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>{i + 1}</div>
                <h3 style={{ color: C.text, fontWeight: 700, marginBottom: 8, fontSize: 16 }}>{s.title}</h3>
                <p style={{ color: C.textMuted, fontSize: 14, lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "5rem 2rem" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <Badge color={C.teal} bg={`${C.teal}18`}>Platform Features</Badge>
          <h2 style={{ fontSize: "2rem", fontWeight: 800, color: C.text, margin: "1rem 0" }}>Everything you need to build your team</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
          {features.map((f, i) => (
            <Card key={i}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>{f.icon}</div>
              <h3 style={{ color: C.text, fontWeight: 700, marginBottom: 8, fontSize: 15 }}>{f.title}</h3>
              <p style={{ color: C.textMuted, fontSize: 13, lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      <section style={{ background: `linear-gradient(135deg, ${C.bgCard} 0%, ${C.bg} 100%)`, padding: "5rem 2rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2 style={{ fontSize: "2rem", fontWeight: 800, color: C.text }}>Loved by builders worldwide</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {testimonials.map((t, i) => (
              <Card key={i}>
                <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 16 }}>
                  <Avatar initials={t.avatar} size={42} />
                  <div>
                    <div style={{ fontWeight: 700, color: C.text, fontSize: 14 }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: C.textMuted }}>{t.role}</div>
                  </div>
                </div>
                <p style={{ color: C.textMuted, fontSize: 14, lineHeight: 1.7, margin: 0, fontStyle: "italic" }}>"{t.text}"</p>
                <div style={{ marginTop: 12, color: C.warning, fontSize: 14 }}>★★★★★</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1000, margin: "0 auto", padding: "5rem 2rem" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "2rem", fontWeight: 800, color: C.text }}>Simple, transparent pricing</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
          {[
            { name: "Free", price: "$0", period: "/mo", features: ["3 startup listings", "Basic profile", "Apply to startups", "Community access"], highlight: false },
            { name: "Pro", price: "$29", period: "/mo", features: ["Unlimited listings", "Featured placement", "Analytics dashboard", "Priority support", "Team management"], highlight: true },
            { name: "Enterprise", price: "Custom", period: "", features: ["White-label option", "Dedicated support", "API access", "Custom integrations", "SLA guarantee"], highlight: false },
          ].map((plan, i) => (
            <div key={i} style={{ background: plan.highlight ? `linear-gradient(135deg, ${C.accent}22, ${C.teal}11)` : C.bgCard, border: `${plan.highlight ? 2 : 1}px solid ${plan.highlight ? C.accent : C.border}`, borderRadius: 16, padding: "1.75rem", position: "relative" }}>
              {plan.highlight && <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: C.gradient, color: "#fff", fontSize: 11, fontWeight: 700, padding: "4px 14px", borderRadius: 20 }}>MOST POPULAR</div>}
              <h3 style={{ color: C.text, fontWeight: 800, marginBottom: 4, fontSize: 18 }}>{plan.name}</h3>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: "1.5rem" }}>
                <span style={{ fontSize: 32, fontWeight: 900, color: plan.highlight ? C.accentLight : C.text }}>{plan.price}</span>
                <span style={{ fontSize: 14, color: C.textMuted }}>{plan.period}</span>
              </div>
              {plan.features.map(f => (
                <div key={f} style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8, fontSize: 14, color: C.textMuted }}>
                  <span style={{ color: C.success }}>✓</span> {f}
                </div>
              ))}
              <Button style={{ width: "100%", marginTop: "1rem", justifyContent: "center" }} variant={plan.highlight ? "primary" : "secondary"} onClick={() => onNavigate("signup")}>
                {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
              </Button>
            </div>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 760, margin: "0 auto", padding: "3rem 2rem 5rem" }}>
        <h2 style={{ fontSize: "2rem", fontWeight: 800, color: C.text, textAlign: "center", marginBottom: "2.5rem" }}>Frequently Asked Questions</h2>
        {faqs.map((faq, i) => (
          <div key={i} style={{ borderBottom: `1px solid ${C.border}`, paddingBottom: 16, marginBottom: 16 }}>
            <div onClick={() => setActiveFaq(activeFaq === i ? null : i)}
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", padding: "8px 0" }}>
              <span style={{ fontWeight: 600, color: C.text, fontSize: 15 }}>{faq.q}</span>
              <span style={{ color: C.textMuted, transition: "transform 0.2s", transform: activeFaq === i ? "rotate(45deg)" : "none", fontSize: 20 }}>+</span>
            </div>
            {activeFaq === i && <p style={{ color: C.textMuted, fontSize: 14, lineHeight: 1.7, marginTop: 8 }}>{faq.a}</p>}
          </div>
        ))}
      </section>

      <section style={{ background: `linear-gradient(135deg, ${C.accent}33 0%, ${C.teal}22 100%)`, borderTop: `1px solid ${C.border}`, padding: "5rem 2rem", textAlign: "center" }}>
        <h2 style={{ fontSize: "2.2rem", fontWeight: 900, color: C.text, marginBottom: "1rem" }}>Ready to build something great?</h2>
        <p style={{ color: C.textMuted, marginBottom: "2rem", fontSize: "1.1rem" }}>Join 18,000+ collaborators and 2,400+ founders on StartSync.</p>
        <Button size="lg" onClick={() => onNavigate("signup")}>Create Free Account →</Button>
      </section>

      <footer style={{ background: C.bgCard, borderTop: `1px solid ${C.border}`, padding: "2rem", textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 12 }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: C.gradient, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>⚡</div>
          <span style={{ fontSize: 16, fontWeight: 800, background: C.gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>StartSync</span>
        </div>
        <p style={{ color: C.textDim, fontSize: 13, margin: 0 }}>© 2025 StartSync. Built for builders, by builders.</p>
      </footer>
    </div>
  );
}

// ─── Auth Pages ───────────────────────────────────────────────────────────────
function AuthPage({ type, onNavigate, onLogin }) {
  const [role, setRole] = useState("Collaborator");
  const [form, setForm] = useState({ name: "", email: "", password: "", phone: "", confirm: "" });
  const [error, setError] = useState("");
  const isLogin = type === "login";

  const handle = async () => {
    if (!form.email || !form.password) { setError("Please fill in all required fields."); return; }
    if (!isLogin && form.password !== form.confirm) { setError("Passwords do not match."); return; }
    setError("");

    try {
      const url = isLogin ? "http://localhost:5000/api/auth/login" : "http://localhost:5000/api/auth/register";
      const payload = isLogin ? { email: form.email, password: form.password } : { name: form.name, email: form.email, password: form.password, phone: form.phone, role };
      const res = await axios.post(url, payload);
      
      if (res.data && res.data.token) {
        localStorage.setItem("token", res.data.token);
        onLogin(res.data);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
        return;
      }
      console.warn("MERN auth warning (Backend offline/invalid, falling back to local simulation):", err.message);
      const mockUser = {
        name: form.name || (isLogin ? (form.email.includes("founder") ? "Arjun Sharma" : "Alex Johnson") : "New User"),
        role: isLogin ? (form.email.includes("founder") ? "Founder" : "Collaborator") : role,
        email: form.email,
        token: `mock-jwt-token-for-${form.email}`
      };
      localStorage.setItem("token", mockUser.token);
      onLogin(mockUser);
    }
  };

  return (
    <div style={{ background: C.bg, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem", fontFamily: "system-ui, sans-serif" }}>
      <div style={{ width: "100%", maxWidth: 440 }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div onClick={() => onNavigate("landing")} style={{ display: "inline-flex", alignItems: "center", gap: 8, cursor: "pointer", marginBottom: "1.5rem" }}>
            <div style={{ width: 32, height: 32, borderRadius: 9, background: C.gradient, display: "flex", alignItems: "center", justifyContent: "center" }}>⚡</div>
            <span style={{ fontSize: 18, fontWeight: 800, background: C.gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>StartSync</span>
          </div>
          <h2 style={{ color: C.text, fontSize: 24, fontWeight: 800, margin: "0 0 6px" }}>{isLogin ? "Welcome back" : "Create your account"}</h2>
          <p style={{ color: C.textMuted, fontSize: 14 }}>{isLogin ? "Sign in to your StartSync account" : "Join thousands of founders and collaborators"}</p>
        </div>
        <Card>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {!isLogin && (
              <>
                <Input label="Full Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Alex Johnson" />
                <div>
                  <label style={{ fontSize: 13, color: C.textMuted, fontWeight: 500, display: "block", marginBottom: 6 }}>I am a...</label>
                  <div style={{ display: "flex", gap: 8 }}>
                    {["Founder", "Collaborator"].map(r => (
                      <div key={r} onClick={() => setRole(r)}
                        style={{ flex: 1, padding: "10px", borderRadius: 10, border: `2px solid ${role === r ? C.accent : C.border}`, background: role === r ? `${C.accent}15` : "transparent", cursor: "pointer", textAlign: "center", fontSize: 14, color: role === r ? C.accentLight : C.textMuted, fontWeight: 600, transition: "all 0.2s" }}>
                        {r === "Founder" ? "🚀 Founder" : "💼 Collaborator"}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
            <Input label="Email Address" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} type="email" placeholder="you@example.com" />
            {!isLogin && <Input label="Phone Number" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+1 (555) 000-0000" />}
            <Input label="Password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} type="password" placeholder="••••••••" />
            {!isLogin && <Input label="Confirm Password" value={form.confirm} onChange={e => setForm({ ...form, confirm: e.target.value })} type="password" placeholder="••••••••" />}
            {error && <div style={{ background: `${C.danger}18`, border: `1px solid ${C.danger}44`, borderRadius: 8, padding: "10px 14px", color: C.danger, fontSize: 13 }}>{error}</div>}
            <Button onClick={handle} style={{ width: "100%", justifyContent: "center" }}>{isLogin ? "Sign In →" : "Create Account →"}</Button>
            {isLogin && <div style={{ textAlign: "center" }}><span style={{ fontSize: 13, color: C.accent, cursor: "pointer" }}>Forgot password?</span></div>}
            <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 14, textAlign: "center", fontSize: 14, color: C.textMuted }}>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <span style={{ color: C.accent, cursor: "pointer", fontWeight: 600 }} onClick={() => onNavigate(isLogin ? "signup" : "login")}>
                {isLogin ? "Sign up free" : "Sign in"}
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

// ─── App Shell ────────────────────────────────────────────────────────────────
function AppShell({ user, onLogout, children, activePage, onNavigate, notifCount }) {
  const [notifOpen, setNotifOpen] = useState(false);
  const isFounder = user.role === "Founder";

  const navItems = isFounder
    ? [
        { id: "founder-dashboard", icon: "🏠", label: "Dashboard" },
        { id: "founder-startups", icon: "🚀", label: "My Startups" },
        { id: "founder-applications", icon: "📋", label: "Applications" },
        { id: "messages", icon: "💬", label: "Messages" },
        { id: "founder-team", icon: "👥", label: "Team" },
      ]
    : user.role === "Admin"
    ? [
        { id: "admin-dashboard", icon: "📊", label: "Overview" },
        { id: "admin-users", icon: "👥", label: "Users" },
        { id: "admin-startups", icon: "🚀", label: "Startups" },
      ]
    : [
        { id: "collab-dashboard", icon: "🏠", label: "Dashboard" },
        { id: "browse", icon: "🔍", label: "Browse" },
        { id: "collab-applications", icon: "📋", label: "Applications" },
        { id: "messages", icon: "💬", label: "Messages" },
        { id: "collab-saved", icon: "🔖", label: "Saved" },
      ];

  return (
    <div style={{ display: "flex", height: "100vh", background: C.bg, fontFamily: "system-ui, sans-serif", overflow: "hidden" }}>
      <aside style={{ width: 220, background: C.bgCard, borderRight: `1px solid ${C.border}`, display: "flex", flexDirection: "column", padding: "1.25rem 0" }}>
        <div style={{ padding: "0 1.25rem 1.5rem", display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: C.gradient, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15 }}>⚡</div>
          <span style={{ fontSize: 16, fontWeight: 800, background: C.gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>StartSync</span>
        </div>
        <nav style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2, padding: "0 0.75rem" }}>
          {navItems.map(item => {
            const active = activePage === item.id;
            return (
              <div key={item.id} onClick={() => onNavigate(item.id)}
                style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderRadius: 10, cursor: "pointer", transition: "all 0.15s", background: active ? `${C.accent}22` : "transparent", color: active ? C.accentLight : C.textMuted, fontWeight: active ? 600 : 400, fontSize: 14 }}
                onMouseEnter={e => !active && (e.currentTarget.style.background = C.bgCard2)}
                onMouseLeave={e => !active && (e.currentTarget.style.background = "transparent")}>
                <span style={{ fontSize: 16 }}>{item.icon}</span>
                {item.label}
              </div>
            );
          })}
        </nav>
        <div style={{ padding: "1rem 0.75rem", borderTop: `1px solid ${C.border}` }}>
          <div onClick={() => onNavigate("profile")} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", borderRadius: 10, cursor: "pointer", marginBottom: 4 }}
            onMouseEnter={e => e.currentTarget.style.background = C.bgCard2}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
            <Avatar initials={user.name.split(" ").map(n => n[0]).join("").slice(0, 2)} size={30} />
            <div style={{ flex: 1, overflow: "hidden" }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{user.name}</div>
              <div style={{ fontSize: 11, color: C.textMuted }}>{user.role}</div>
            </div>
          </div>
          <div onClick={onLogout} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 12px", borderRadius: 10, cursor: "pointer", color: C.textMuted, fontSize: 13 }}
            onMouseEnter={e => { e.currentTarget.style.background = `${C.danger}18`; e.currentTarget.style.color = C.danger; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.textMuted; }}>
            🚪 Sign Out
          </div>
        </div>
      </aside>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <header style={{ height: 60, background: C.bgCard, borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 1.5rem", flexShrink: 0 }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: C.text }}>
            {navItems.find(n => n.id === activePage)?.label || "Dashboard"}
          </div>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <div style={{ position: "relative" }} onClick={() => setNotifOpen(!notifOpen)}>
              <button style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer", padding: 6, borderRadius: 8, color: C.textMuted }}>🔔</button>
              {notifCount > 0 && <span style={{ position: "absolute", top: 0, right: 0, background: C.danger, color: "#fff", fontSize: 10, fontWeight: 700, borderRadius: "50%", width: 16, height: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>{notifCount}</span>}
            </div>
            <Avatar initials={user.name.split(" ").map(n => n[0]).join("").slice(0, 2)} size={32} />
          </div>
        </header>

        {notifOpen && (
          <div style={{ position: "absolute", top: 70, right: 20, zIndex: 200, background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 14, width: 340, boxShadow: "0 20px 60px rgba(0,0,0,0.4)" }}>
            <div style={{ padding: "14px 16px", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontWeight: 700, color: C.text, fontSize: 14 }}>Notifications</span>
              <span style={{ fontSize: 12, color: C.accent, cursor: "pointer" }}>Mark all read</span>
            </div>
            {NOTIFICATIONS.map(n => (
              <div key={n.id} style={{ padding: "12px 16px", borderBottom: `1px solid ${C.border}`, display: "flex", gap: 10, background: n.read ? "transparent" : `${C.accent}08`, cursor: "pointer" }}>
                <span style={{ fontSize: 20 }}>{n.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{n.title}</div>
                  <div style={{ fontSize: 12, color: C.textMuted, marginTop: 2 }}>{n.body}</div>
                  <div style={{ fontSize: 11, color: C.textDim, marginTop: 4 }}>{n.time}</div>
                </div>
                {!n.read && <div style={{ width: 7, height: 7, borderRadius: "50%", background: C.accent, flexShrink: 0, marginTop: 4 }} />}
              </div>
            ))}
          </div>
        )}

        <main style={{ flex: 1, overflow: "auto", padding: "1.5rem" }} onClick={() => notifOpen && setNotifOpen(false)}>
          {children}
        </main>
      </div>
    </div>
  );
}

// ─── Collaborator Dashboard ───────────────────────────────────────────────────
function CollabDashboard({ user, onNavigate, startups = STARTUPS, applications = [], savedIds = [] }) {
  const stats = [
    { label: "Applications Sent", value: applications.length, icon: "📋", color: C.accent },
    { label: "Shortlisted", value: applications.filter(a => a.status === "shortlisted").length, icon: "⚡", color: C.warning },
    { label: "Saved Startups", value: savedIds.length, icon: "🔖", color: C.teal },
    { label: "New Messages", value: 1, icon: "💬", color: C.pink },
  ];

  return (
    <div>
      <div style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ color: C.text, fontSize: 22, fontWeight: 800, margin: "0 0 4px" }}>Welcome back, {user.name.split(" ")[0]} 👋</h1>
        <p style={{ color: C.textMuted, fontSize: 14 }}>Here's your activity summary for today.</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 14, marginBottom: "1.5rem" }}>
        {stats.map(s => (
          <Card key={s.label}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>{s.icon}</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: s.color, marginBottom: 4 }}>{s.value}</div>
            <div style={{ fontSize: 12, color: C.textMuted }}>{s.label}</div>
          </Card>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 16 }}>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <h3 style={{ color: C.text, fontWeight: 700, margin: 0, fontSize: 15 }}>Recent Applications</h3>
            <span style={{ fontSize: 13, color: C.accent, cursor: "pointer" }} onClick={() => onNavigate("collab-applications")}>View all →</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {applications.length === 0 ? (
              <Card style={{ textAlign: "center", padding: "1.5rem", color: C.textMuted }}>
                You haven't applied to any startups yet.
              </Card>
            ) : (
              applications.slice(0, 3).map(app => {
                const startupName = typeof app.startup === 'object' ? app.startup?.name : (app.startup || "My Startup");
                const startupLogo = typeof app.startup === 'object' ? (app.startup?.logo || "🚀") : (app.logo || "🚀");
                const dateApplied = app.createdAt ? new Date(app.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : (app.applied || "Just now");
                const appId = app._id || app.id;

                return (
                  <Card key={appId} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px" }}>
                    <span style={{ fontSize: 26 }}>{startupLogo}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, color: C.text, fontSize: 14 }}>{startupName}</div>
                      <div style={{ fontSize: 13, color: C.textMuted }}>{app.role} · Applied {dateApplied}</div>
                    </div>
                    <StatusBadge status={app.status} />
                  </Card>
                );
              })
            )}
          </div>
        </div>
        <div>
          <h3 style={{ color: C.text, fontWeight: 700, margin: "0 0 12px", fontSize: 15 }}>Recommended For You</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {startups.slice(0, 3).map(s => (
              <Card key={s.id || s._id} hover style={{ padding: "12px 14px" }} onClick={() => onNavigate("browse")}>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <span style={{ fontSize: 22 }}>{s.logo}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, color: C.text, fontSize: 13 }}>{s.name}</div>
                    <div style={{ fontSize: 12, color: C.textMuted }}>{s.roles ? s.roles[0] : "Collaborator"}</div>
                  </div>
                  <Badge color={C.teal} bg={`${C.teal}18`}>{s.compensation}</Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Browse Page ──────────────────────────────────────────────────────────────
function BrowsePage({ onApply, savedIds, onToggleSave, onMessage, startups = STARTUPS, setApplications }) {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ stage: "All", compensation: "All", workType: "All" });
  const [selectedStartup, setSelectedStartup] = useState(null);
  const [applyOpen, setApplyOpen] = useState(false);
  const [applyTarget, setApplyTarget] = useState(null);
  const [coverMsg, setCoverMsg] = useState("");
  const [appliedIds, setAppliedIds] = useState([3]);

  const filtered = startups.filter(s => {
    const q = search.toLowerCase();
    if (q && !s.name.toLowerCase().includes(q) && !s.category.toLowerCase().includes(q) && !s.skills.some(sk => sk.toLowerCase().includes(q))) return false;
    if (filters.stage !== "All" && s.stage !== filters.stage) return false;
    if (filters.compensation !== "All" && s.compensation !== filters.compensation) return false;
    if (filters.workType !== "All" && s.workType !== filters.workType) return false;
    return true;
  });

  const handleApply = async () => {
    if (!coverMsg.trim()) return;
    const newApp = {
      id: Date.now(),
      startup: applyTarget.name,
      logo: applyTarget.logo || "🚀",
      role: (applyTarget.roles && applyTarget.roles.length > 0) ? applyTarget.roles[0] : "Collaborator",
      status: "pending",
      applied: "Just Now",
      compensation: applyTarget.compensation || "Equity",
      founder: typeof applyTarget.founder === 'object' ? applyTarget.founder?.name : (applyTarget.founder || "Founder")
    };

    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5000/api/applications", {
        startupId: applyTarget._id || applyTarget.id,
        role: (applyTarget.roles && applyTarget.roles.length > 0) ? applyTarget.roles[0] : "Collaborator",
        coverMessage: coverMsg
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Success! Your application has been successfully recorded in the backend database.");
    } catch (err) {
      console.warn("MERN integration warning (Backend not configured/reachable, falling back to local simulation):", err.message);
    } finally {
      if (setApplications) {
        setApplications(prev => [newApp, ...prev]);
      }
      setAppliedIds([...appliedIds, applyTarget.id, applyTarget._id].filter(Boolean));
      setApplyOpen(false);
      setCoverMsg("");
    }
  };

  return (
    <div>
      <div style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ color: C.text, fontSize: 22, fontWeight: 800, margin: "0 0 4px" }}>Browse Startups</h1>
        <p style={{ color: C.textMuted, fontSize: 14 }}>{filtered.length} startups match your search</p>
      </div>
      <div style={{ position: "relative", marginBottom: 16 }}>
        <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 16 }}>🔍</span>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search startups, skills, categories..."
          style={{ width: "100%", background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 12, padding: "11px 14px 11px 42px", color: C.text, fontSize: 14, outline: "none", boxSizing: "border-box" }}
          onFocus={e => e.target.style.borderColor = C.accent}
          onBlur={e => e.target.style.borderColor = C.border} />
      </div>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: "1.5rem" }}>
        {[
          { key: "stage", label: "Stage", opts: ["All", "Idea", "Prototype", "MVP", "Launched"] },
          { key: "compensation", label: "Pay", opts: ["All", "Equity", "Paid", "Equity + Paid", "Unpaid", "Internship"] },
          { key: "workType", label: "Work", opts: ["All", "Remote", "Hybrid", "Onsite"] },
        ].map(({ key, label, opts }) => (
          <select key={key} value={filters[key]} onChange={e => setFilters({ ...filters, [key]: e.target.value })}
            style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 8, padding: "7px 12px", color: C.text, fontSize: 13, cursor: "pointer" }}>
            {opts.map(o => <option key={o} value={o} style={{ background: C.bgCard }}>{o === "All" ? `${label}: All` : o}</option>)}
          </select>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
        {filtered.map(s => (
          <Card key={s.id || s._id} hover onClick={() => setSelectedStartup(s)}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <div style={{ fontSize: 28, background: C.bgCard2, borderRadius: 10, width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center" }}>{s.logo || "🚀"}</div>
                <div>
                  <div style={{ fontWeight: 700, color: C.text, fontSize: 15 }}>{s.name}</div>
                  <div style={{ fontSize: 12, color: C.textMuted }}>{s.category}</div>
                </div>
              </div>
              <span onClick={e => { e.stopPropagation(); onToggleSave(s.id || s._id); }}
                style={{ fontSize: 18, cursor: "pointer", opacity: savedIds.includes(s.id || s._id) ? 1 : 0.4 }}>🔖</span>
            </div>
            <p style={{ fontSize: 13, color: C.textMuted, marginBottom: 10, lineHeight: 1.6 }}>{s.tagline}</p>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
              {(s.roles || []).slice(0, 2).map(r => <Tag key={r}>{r}</Tag>)}
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
              {(s.skills || []).slice(0, 3).map(sk => <Tag key={sk}>{sk}</Tag>)}
            </div>
            <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 10, display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <StageBadge stage={s.stage} />
                <Badge color={C.textMuted} bg={`${C.textMuted}18`}>{s.workType}</Badge>
              </div>
              <div style={{ fontSize: 12, color: C.textMuted }}>{s.applications || 0} applied</div>
            </div>
            {(appliedIds.includes(s.id) || appliedIds.includes(s._id))
              ? <Button variant="success" size="sm" disabled style={{ width: "100%", justifyContent: "center" }}>✓ Applied</Button>
              : <Button size="sm" style={{ width: "100%", justifyContent: "center" }} onClick={e => { e.stopPropagation(); setApplyTarget(s); setApplyOpen(true); }}>Apply Now</Button>
            }
          </Card>
        ))}
      </div>

      <Modal open={!!selectedStartup} onClose={() => setSelectedStartup(null)} title={selectedStartup?.name || ""} width={600}>
        {selectedStartup && (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
              <div style={{ fontSize: 44, background: C.bgCard2, borderRadius: 14, width: 64, height: 64, display: "flex", alignItems: "center", justifyContent: "center" }}>{selectedStartup.logo || "🚀"}</div>
              <div>
                <div style={{ fontSize: 11, color: C.textMuted, marginBottom: 6 }}>{selectedStartup.category}</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <StageBadge stage={selectedStartup.stage} />
                  <Badge color={C.textMuted}>{selectedStartup.workType}</Badge>
                  <Badge color={C.teal} bg={`${C.teal}18`}>{selectedStartup.compensation}</Badge>
                </div>
              </div>
            </div>
            <p style={{ color: C.textMuted, fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>{selectedStartup.description}</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
              <div style={{ background: C.bgCard2, borderRadius: 10, padding: "12px 14px" }}>
                <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 4 }}>📍 Location</div>
                <div style={{ fontSize: 14, color: C.text }}>{selectedStartup.location || "Remote"}</div>
              </div>
              <div style={{ background: C.bgCard2, borderRadius: 10, padding: "12px 14px" }}>
                <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 4 }}>📅 Deadline</div>
                <div style={{ fontSize: 14, color: C.text }}>{selectedStartup.deadline || "TBD"}</div>
              </div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 8 }}>Open Roles</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>{(selectedStartup.roles || []).map(r => <Tag key={r}>{r}</Tag>)}</div>
            </div>
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 8 }}>Required Skills</div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>{(selectedStartup.skills || []).map(sk => <Tag key={sk}>{sk}</Tag>)}</div>
            </div>
            <div style={{ display: "flex", gap: 10, alignItems: "center", borderTop: `1px solid ${C.border}`, paddingTop: 16 }}>
              <Avatar initials={typeof selectedStartup.founder === 'object' ? selectedStartup.founder?.avatar : "AS"} size={34} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{typeof selectedStartup.founder === 'object' ? selectedStartup.founder?.name : (selectedStartup.founder || "Founder")}</div>
                <div style={{ fontSize: 12, color: C.textMuted }}>Founder</div>
              </div>
              <Button variant="secondary" size="sm" onClick={() => { setSelectedStartup(null); onMessage(typeof selectedStartup.founder === 'object' ? selectedStartup.founder?.name : (selectedStartup.founder || "Founder")); }}>💬 Message</Button>
              {(appliedIds.includes(selectedStartup.id) || appliedIds.includes(selectedStartup._id))
                ? <Button variant="success" size="sm" disabled>✓ Applied</Button>
                : <Button size="sm" onClick={() => { setSelectedStartup(null); setApplyTarget(selectedStartup); setApplyOpen(true); }}>Apply Now</Button>
              }
            </div>
          </div>
        )}
      </Modal>

      <Modal open={applyOpen} onClose={() => setApplyOpen(false)} title={`Apply to ${applyTarget?.name}`}>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <label style={{ fontSize: 13, color: C.textMuted, display: "block", marginBottom: 6 }}>Cover Message *</label>
            <textarea value={coverMsg} onChange={e => setCoverMsg(e.target.value)} placeholder="Tell the founder why you're excited about this startup and what value you bring..."
              style={{ width: "100%", minHeight: 120, background: C.bgCard2, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", color: C.text, fontSize: 14, resize: "vertical", outline: "none", boxSizing: "border-box" }}
              onFocus={e => e.target.style.borderColor = C.accent}
              onBlur={e => e.target.style.borderColor = C.border} />
          </div>
          <Input label="Portfolio / GitHub Link (optional)" placeholder="https://github.com/yourhandle" />
          <Input label="Additional Note" placeholder="Any additional context..." />
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <Button variant="secondary" onClick={() => setApplyOpen(false)}>Cancel</Button>
            <Button onClick={handleApply} disabled={!coverMsg.trim()}>Submit Application →</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

// ─── Applications Page ────────────────────────────────────────────────────────
function ApplicationsPage({ apps = APPLICATIONS, isFounder = false, onStatusUpdate }) {
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? apps : apps.filter(a => a.status === filter);

  return (
    <div>
      <div style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ color: C.text, fontSize: 22, fontWeight: 800, margin: "0 0 4px" }}>
          {isFounder ? "Received Applications" : "My Applications"}
        </h1>
        <p style={{ color: C.textMuted, fontSize: 14 }}>{apps.length} total applications</p>
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: "1.5rem", flexWrap: "wrap" }}>
        {["all", "pending", "shortlisted", "accepted", "rejected"].map(s => {
          const count = s === "all" ? apps.length : apps.filter(a => a.status === s).length;
          return (
            <button key={s} onClick={() => setFilter(s)}
              style={{ padding: "7px 16px", borderRadius: 20, fontSize: 13, fontWeight: 600, cursor: "pointer", border: filter === s ? `1px solid ${C.accent}` : `1px solid ${C.border}`, background: filter === s ? `${C.accent}22` : "transparent", color: filter === s ? C.accentLight : C.textMuted, transition: "all 0.2s" }}>
              {s.charAt(0).toUpperCase() + s.slice(1)} ({count})
            </button>
          );
        })}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {filtered.length === 0 ? (
          <Card style={{ textAlign: "center", padding: "2rem", color: C.textMuted }}>
            No applications found matching the filter.
          </Card>
        ) : (
          filtered.map(app => {
            const startupName = typeof app.startup === 'object' ? app.startup?.name : (app.startup || "My Startup");
            const startupLogo = typeof app.startup === 'object' ? (app.startup?.logo || "🚀") : (app.logo || "🚀");
            const dateApplied = app.createdAt ? new Date(app.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : (app.applied || "Just now");
            const compensationVal = app.compensation || (typeof app.startup === 'object' ? app.startup?.compensation : null) || "Equity";
            const appId = app._id || app.id;

            if (isFounder) {
              const applicantName = typeof app.applicant === 'object' ? app.applicant?.name : (app.applicant || "New Candidate");
              const applicantEmail = typeof app.applicant === 'object' ? app.applicant?.email : "";
              const applicantSkills = typeof app.applicant === 'object' ? app.applicant?.skills || [] : [];
              const applicantAvatar = typeof app.applicant === 'object' ? app.applicant?.avatar : null;
              const initials = applicantName.split(" ").map(n => n[0]).join("").slice(0, 2);

              return (
                <Card key={appId} style={{ padding: "16px" }}>
                  <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 12 }}>
                    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                      <Avatar initials={applicantAvatar || initials} size={42} />
                      <div>
                        <div style={{ fontWeight: 700, color: C.text, fontSize: 15, display: "flex", alignItems: "center", gap: 8 }}>
                          {applicantName}
                          <Badge color={C.teal} bg={`${C.teal}18`}>{startupName}</Badge>
                        </div>
                        <div style={{ fontSize: 13, color: C.textMuted, marginTop: 2 }}>
                          Applied for: <span style={{ color: C.text, fontWeight: 600 }}>{app.role}</span>
                        </div>
                        {applicantEmail && (
                          <div style={{ fontSize: 12, color: C.textDim, marginTop: 2 }}>✉ {applicantEmail}</div>
                        )}
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <span style={{ fontSize: 12, color: C.textDim }}>Applied {dateApplied}</span>
                      <StatusBadge status={app.status} />
                    </div>
                  </div>

                  {app.coverMessage && (
                    <div style={{ background: C.bgCard2, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", marginBottom: 14, fontSize: 13, color: C.textMuted, lineHeight: 1.6 }}>
                      <div style={{ fontWeight: 600, color: C.text, fontSize: 11, textTransform: "uppercase", marginBottom: 4, letterSpacing: 0.5 }}>Cover Message</div>
                      "{app.coverMessage}"
                    </div>
                  )}

                  {applicantSkills.length > 0 && (
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
                      {applicantSkills.map(sk => <Tag key={sk}>{sk}</Tag>)}
                    </div>
                  )}

                  {onStatusUpdate && (
                    <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 12, display: "flex", gap: 8, justifyContent: "flex-end" }}>
                      {app.status === "pending" ? (
                        <>
                          <Button size="sm" variant="ghost" onClick={() => onStatusUpdate(appId, "rejected")} style={{ color: C.danger }}>Reject</Button>
                          <Button size="sm" variant="secondary" onClick={() => onStatusUpdate(appId, "shortlisted")}>Shortlist ⚡</Button>
                          <Button size="sm" onClick={() => onStatusUpdate(appId, "accepted")}>Accept Candidate ✓</Button>
                        </>
                      ) : (
                        <div style={{ fontSize: 12, color: C.textDim }}>
                          Status updated to <span style={{ textTransform: "capitalize", color: C.accentLight, fontWeight: 600 }}>{app.status}</span>. Change status:
                          <select value={app.status} onChange={e => onStatusUpdate(appId, e.target.value)}
                            style={{ marginLeft: 8, background: C.bgCard2, border: `1px solid ${C.border}`, borderRadius: 6, padding: "3px 8px", color: C.text, fontSize: 12, cursor: "pointer" }}>
                            <option value="pending">Pending</option>
                            <option value="shortlisted">Shortlisted</option>
                            <option value="accepted">Accepted</option>
                            <option value="rejected">Rejected</option>
                          </select>
                        </div>
                      )}
                    </div>
                  )}
                </Card>
              );
            }

            // Collaborator view
            const founderName = typeof app.founder === 'object' ? app.founder?.name : (app.founder || "Founder");
            return (
              <Card key={appId}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <span style={{ fontSize: 32 }}>{startupLogo}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, color: C.text, fontSize: 15, marginBottom: 2 }}>{startupName}</div>
                    <div style={{ fontSize: 13, color: C.textMuted }}>Role: {app.role}</div>
                    <div style={{ fontSize: 12, color: C.textDim, marginTop: 2 }}>Applied {dateApplied} · Founder: {founderName}</div>
                  </div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <Badge color={C.textMuted} bg={`${C.textMuted}18`}>{compensationVal}</Badge>
                    <StatusBadge status={app.status} />
                  </div>
                </div>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}

// ─── Messages Page ────────────────────────────────────────────────────────────
function MessagesPage({ user }) {
  const [selected, setSelected] = useState(MESSAGES[0]);
  const [msg, setMsg] = useState("");
  const [chats, setChats] = useState(MESSAGES);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [selected]);

  const sendMessage = () => {
    if (!msg.trim()) return;
    const newMsg = { id: Date.now(), sender: "Me", text: msg, time: "Now", isMe: true };
    setChats(prev => prev.map(c => c.id === selected.id ? { ...c, messages: [...c.messages, newMsg], unread: 0 } : c));
    setSelected(prev => ({ ...prev, messages: [...prev.messages, newMsg] }));
    setMsg("");
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", height: "calc(100vh - 120px)", gap: 0, background: C.bgCard, borderRadius: 16, overflow: "hidden", border: `1px solid ${C.border}` }}>
      <div style={{ borderRight: `1px solid ${C.border}`, display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "14px 16px", borderBottom: `1px solid ${C.border}` }}>
          <h3 style={{ color: C.text, fontWeight: 700, margin: 0, fontSize: 15 }}>Messages</h3>
        </div>
        <div style={{ overflowY: "auto", flex: 1 }}>
          {chats.map(c => (
            <div key={c.id} onClick={() => { setSelected(c); setChats(prev => prev.map(ch => ch.id === c.id ? { ...ch, unread: 0 } : ch)); }}
              style={{ padding: "12px 16px", borderBottom: `1px solid ${C.border}`, cursor: "pointer", background: selected?.id === c.id ? `${C.accent}15` : "transparent", transition: "background 0.15s" }}>
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <Avatar initials={c.fromAvatar} size={36} />
                <div style={{ flex: 1, overflow: "hidden" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontWeight: 700, fontSize: 13, color: C.text }}>{c.from}</span>
                    <span style={{ fontSize: 11, color: C.textDim }}>{c.time}</span>
                  </div>
                  <div style={{ fontSize: 12, color: C.textMuted, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.preview}</div>
                </div>
                {c.unread > 0 && <span style={{ background: C.accent, color: "#fff", borderRadius: "50%", width: 18, height: 18, fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{c.unread}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {selected && (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "12px 20px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 12 }}>
            <Avatar initials={selected.fromAvatar} size={36} />
            <div>
              <div style={{ fontWeight: 700, color: C.text, fontSize: 14 }}>{selected.from}</div>
              <div style={{ fontSize: 12, color: C.teal }}>● Online · {selected.fromRole}</div>
            </div>
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: "1rem 1.25rem", display: "flex", flexDirection: "column", gap: 12 }}>
            {selected.messages.map(m => (
              <div key={m.id} style={{ display: "flex", justifyContent: m.isMe ? "flex-end" : "flex-start", gap: 8 }}>
                {!m.isMe && <Avatar initials={selected.fromAvatar} size={28} />}
                <div style={{ maxWidth: "70%" }}>
                  <div style={{ background: m.isMe ? C.accent : C.bgCard2, color: m.isMe ? "#fff" : C.text, borderRadius: m.isMe ? "16px 16px 4px 16px" : "16px 16px 16px 4px", padding: "10px 14px", fontSize: 14, lineHeight: 1.5 }}>
                    {m.text}
                  </div>
                  <div style={{ fontSize: 11, color: C.textDim, marginTop: 4, textAlign: m.isMe ? "right" : "left" }}>{m.time}</div>
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
          <div style={{ padding: "12px 16px", borderTop: `1px solid ${C.border}`, display: "flex", gap: 10 }}>
            <input value={msg} onChange={e => setMsg(e.target.value)} placeholder="Type a message..." onKeyDown={e => e.key === "Enter" && sendMessage()}
              style={{ flex: 1, background: C.bgCard2, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", color: C.text, fontSize: 14, outline: "none" }}
              onFocus={e => e.target.style.borderColor = C.accent}
              onBlur={e => e.target.style.borderColor = C.border} />
            <Button onClick={sendMessage} disabled={!msg.trim()}>Send →</Button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Founder Dashboard ────────────────────────────────────────────────────────
function FounderDashboard({ user, onNavigate, startups = STARTUPS, applications = [] }) {
  const myStartups = startups.filter(s => s.founder?.name === user?.name || s.founder === user?.name || s.id === 1 || s.id === 2);
  const myStartupIds = myStartups.map(s => s.id || s._id);

  // Filter actual applications for the founder's startups statefully
  const realFounderApps = applications.filter(app => {
    const sId = app.startup?._id || app.startup?.id || app.startup;
    return myStartupIds.includes(sId) || app.founder === user?.name || app.founder?.name === user?.name;
  }).map(app => ({
    name: app.applicant?.name || (typeof app.applicant === 'string' ? app.applicant : "New Candidate"),
    role: app.role || "Collaborator",
    startup: app.startup?.name || "My Startup",
    status: app.status || "pending",
    time: "Just now"
  }));

  const recentApps = [...realFounderApps, ...[
    { name: "Rahul Mehta", role: "React Developer", startup: "NeuralCart", status: "pending", time: "2h ago" },
    { name: "Sarah O'Brien", role: "ML Engineer", startup: "NeuralCart", status: "shortlisted", time: "5h ago" },
    { name: "Jake Torres", role: "UI Designer", startup: "NeuralCart", status: "accepted", time: "Yesterday" },
    { name: "Aisha Ibrahim", role: "Full-Stack Dev", startup: "NeuralCart", status: "rejected", time: "2 days ago" },
  ]];

  const stats = [
    { label: "Startups Posted", value: myStartups.length, icon: "🚀", color: C.accent },
    { label: "Total Applications", value: 65 + realFounderApps.length, icon: "📋", color: C.warning },
    { label: "Team Members", value: 8, icon: "👥", color: C.teal },
    { label: "Active Chats", value: 12, icon: "💬", color: C.pink },
  ];

  return (
    <div>
      <div style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ color: C.text, fontSize: 22, fontWeight: 800, margin: "0 0 4px" }}>Founder Dashboard 🚀</h1>
        <p style={{ color: C.textMuted, fontSize: 14 }}>Manage your startups, team, and applications.</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 14, marginBottom: "1.5rem" }}>
        {stats.map(s => (
          <Card key={s.label}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>{s.icon}</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: s.color, marginBottom: 4 }}>{s.value}</div>
            <div style={{ fontSize: 12, color: C.textMuted }}>{s.label}</div>
          </Card>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 16 }}>
        <div>
          <h3 style={{ color: C.text, fontWeight: 700, margin: "0 0 12px", fontSize: 15 }}>Recent Applications</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {recentApps.map((a, i) => (
              <Card key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 16px" }}>
                <Avatar initials={a.name.split(" ").map(n => n[0]).join("")} size={36} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, color: C.text, fontSize: 14 }}>{a.name}</div>
                  <div style={{ fontSize: 13, color: C.textMuted }}>{a.role} · {a.startup} · {a.time}</div>
                </div>
                <StatusBadge status={a.status} />
              </Card>
            ))}
          </div>
        </div>
        <div>
          <h3 style={{ color: C.text, fontWeight: 700, margin: "0 0 12px", fontSize: 15 }}>Your Startups</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {myStartups.slice(0, 2).map(s => (
              <Card key={s.id}>
                <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 10 }}>
                  <span style={{ fontSize: 24 }}>{s.logo}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, color: C.text, fontSize: 14 }}>{s.name}</div>
                    <div style={{ fontSize: 12, color: C.textMuted }}>{s.applications} applications</div>
                  </div>
                  <StageBadge stage={s.stage} />
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <Button variant="secondary" size="sm" style={{ flex: 1, justifyContent: "center" }} onClick={() => onNavigate("founder-startups")}>Edit</Button>
                  <Button size="sm" style={{ flex: 1, justifyContent: "center" }} onClick={() => onNavigate("founder-applications")}>View Apps</Button>
                </div>
              </Card>
            ))}
            <Button style={{ width: "100%", justifyContent: "center" }} onClick={() => onNavigate("founder-startups")}>+ Post New Startup</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Admin Dashboard ──────────────────────────────────────────────────────────
function AdminDashboard() {
  const stats = [
    { label: "Total Users", value: "20,482", icon: "👥", color: C.accent },
    { label: "Total Founders", value: "2,401", icon: "🚀", color: C.teal },
    { label: "Collaborators", value: "18,081", icon: "💼", color: C.pink },
    { label: "Startups Posted", value: "2,401", icon: "📋", color: C.warning },
    { label: "Applications", value: "94,220", icon: "📨", color: C.success },
    { label: "Active Chats", value: "3,112", icon: "💬", color: C.info },
  ];

  const recentUsers = [
    { name: "Kavya Reddy", role: "Collaborator", email: "kavya@gmail.com", joined: "2 min ago", status: "active" },
    { name: "Tom Brooks", role: "Founder", email: "tom@startupx.co", joined: "15 min ago", status: "active" },
    { name: "Mei Lin", role: "Collaborator", email: "mei@dev.io", joined: "1h ago", status: "active" },
    { name: "Carlos Ruiz", role: "Founder", email: "carlos@biz.mx", joined: "3h ago", status: "flagged" },
    { name: "Unknown User", role: "Collaborator", email: "anon@temp.xyz", joined: "5h ago", status: "flagged" },
  ];

  return (
    <div>
      <div style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ color: C.text, fontSize: 22, fontWeight: 800, margin: "0 0 4px" }}>Admin Control Panel 🛡️</h1>
        <p style={{ color: C.textMuted, fontSize: 14 }}>Platform-wide analytics and moderation tools.</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 14, marginBottom: "1.75rem" }}>
        {stats.map(s => (
          <Card key={s.label}>
            <div style={{ fontSize: 20, marginBottom: 6 }}>{s.icon}</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: s.color, marginBottom: 4 }}>{s.value}</div>
            <div style={{ fontSize: 12, color: C.textMuted }}>{s.label}</div>
          </Card>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 16 }}>
        <div>
          <h3 style={{ color: C.text, fontWeight: 700, margin: "0 0 12px", fontSize: 15 }}>Recent User Registrations</h3>
          <Card style={{ padding: 0, overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                  {["User", "Role", "Email", "Joined", "Status", "Action"].map(h => (
                    <th key={h} style={{ padding: "10px 14px", fontSize: 12, color: C.textMuted, fontWeight: 600, textAlign: "left" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentUsers.map((u, i) => (
                  <tr key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
                    <td style={{ padding: "10px 14px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <Avatar initials={u.name.split(" ").map(n => n[0]).join("")} size={28} color={u.status === "flagged" ? C.danger : C.accent} />
                        <span style={{ fontSize: 13, color: C.text }}>{u.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: "10px 14px" }}><Badge color={u.role === "Founder" ? C.teal : C.accent}>{u.role}</Badge></td>
                    <td style={{ padding: "10px 14px", fontSize: 13, color: C.textMuted }}>{u.email}</td>
                    <td style={{ padding: "10px 14px", fontSize: 12, color: C.textDim }}>{u.joined}</td>
                    <td style={{ padding: "10px 14px" }}><Badge color={u.status === "active" ? C.success : C.danger}>{u.status === "active" ? "● Active" : "⚠ Flagged"}</Badge></td>
                    <td style={{ padding: "10px 14px" }}>
                      <Button variant={u.status === "flagged" ? "danger" : "ghost"} size="sm">{u.status === "flagged" ? "Delete" : "View"}</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
        <div>
          <h3 style={{ color: C.text, fontWeight: 700, margin: "0 0 12px", fontSize: 15 }}>Quick Actions</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {["View All Users", "Moderate Listings", "Export Analytics", "Send Platform Notice", "Review Reports"].map(a => (
              <Button key={a} variant="secondary" style={{ width: "100%", justifyContent: "flex-start" }}>{a} →</Button>
            ))}
          </div>
          <div style={{ marginTop: "1rem" }}>
            <h3 style={{ color: C.text, fontWeight: 700, margin: "0 0 12px", fontSize: 15 }}>Platform Health</h3>
            {[["Uptime", "99.98%", C.success], ["API Latency", "48ms", C.success], ["Error Rate", "0.02%", C.success], ["Open Reports", "3", C.warning]].map(([label, val, color]) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${C.border}` }}>
                <span style={{ fontSize: 13, color: C.textMuted }}>{label}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color }}>{val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Profile Page ─────────────────────────────────────────────────────────────
function ProfilePage({ user, onProfileUpdate, applications = [] }) {
  const acceptedApp = applications.find(a => a.status === "accepted");
  const shortlistedApp = applications.find(a => a.status === "shortlisted");

  let statusBadge = <Badge color={C.success} bg={`${C.success}18`}>● Available</Badge>;
  if (acceptedApp) {
    const sName = typeof acceptedApp.startup === 'object' ? acceptedApp.startup?.name : acceptedApp.startup;
    statusBadge = <Badge color={C.teal} bg={`${C.teal}18`}>● Joined {sName}</Badge>;
  } else if (shortlistedApp) {
    const sName = typeof shortlistedApp.startup === 'object' ? shortlistedApp.startup?.name : shortlistedApp.startup;
    statusBadge = <Badge color={C.warning} bg={`${C.warning}18`}>● Shortlisted: {sName}</Badge>;
  }
  const [form, setForm] = useState({
    name: user.name,
    bio: "",
    skills: "",
    github: "",
    linkedin: "",
    portfolio: "",
    location: "",
    availability: "",
    email: user.email
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const res = await axios.get("http://localhost:5000/api/auth/profile", {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (res.data) {
            setForm({
              name: res.data.name || user.name,
              bio: res.data.bio || "",
              skills: Array.isArray(res.data.skills) ? res.data.skills.join(", ") : (res.data.skills || ""),
              github: res.data.github || "",
              linkedin: res.data.linkedin || "",
              portfolio: res.data.portfolio || "",
              location: res.data.location || "",
              availability: res.data.availability || "",
              email: res.data.email || user.email
            });
          }
        }
      } catch (err) {
        console.warn("MERN profile fetch warning (Backend not configured/reachable, falling back to local simulation):", err.message);
      }
    };
    fetchProfile();
  }, [user]);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const res = await axios.put("http://localhost:5000/api/auth/profile", form, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.data && onProfileUpdate) {
          onProfileUpdate(res.data);
        }
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      console.warn("MERN profile update warning (Backend not configured/reachable, falling back to local simulation):", err.message);
      if (onProfileUpdate) {
        onProfileUpdate(form);
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  return (
    <div style={{ maxWidth: 700 }}>
      <div style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ color: C.text, fontSize: 22, fontWeight: 800, margin: "0 0 4px" }}>My Profile</h1>
        <p style={{ color: C.textMuted, fontSize: 14 }}>Update your profile to attract the best opportunities.</p>
      </div>
      <Card>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: "1.5rem", paddingBottom: "1.5rem", borderBottom: `1px solid ${C.border}` }}>
          <div style={{ position: "relative" }}>
            <Avatar initials={form.name.split(" ").map(n => n[0]).join("").slice(0, 2)} size={72} />
            <div style={{ position: "absolute", bottom: 0, right: 0, background: C.accent, borderRadius: "50%", width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, cursor: "pointer" }}>📷</div>
          </div>
          <div>
            <div style={{ fontWeight: 800, color: C.text, fontSize: 18 }}>{form.name}</div>
            <div style={{ fontSize: 14, color: C.textMuted, marginTop: 4 }}>{user.role}{form.location ? ` · ${form.location}` : ""}</div>
            <div style={{ marginTop: 6 }}>{statusBadge}</div>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
          <Input label="Full Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          <Input label="Email Address" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} type="email" />
          <Input label="Location" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} />
          <Input label="Availability" value={form.availability} onChange={e => setForm({ ...form, availability: e.target.value })} />
        </div>
        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 13, color: C.textMuted, display: "block", marginBottom: 6 }}>Bio</label>
          <textarea value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })}
            style={{ width: "100%", minHeight: 90, background: C.bgCard2, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", color: C.text, fontSize: 14, resize: "vertical", outline: "none", boxSizing: "border-box" }} />
        </div>
        <div style={{ marginBottom: 14 }}>
          <Input label="Skills (comma-separated)" value={form.skills} onChange={e => setForm({ ...form, skills: e.target.value })} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: "1.5rem" }}>
          <Input label="GitHub" value={form.github} onChange={e => setForm({ ...form, github: e.target.value })} placeholder="github.com/user" />
          <Input label="LinkedIn" value={form.linkedin} onChange={e => setForm({ ...form, linkedin: e.target.value })} placeholder="linkedin.com/in/user" />
          <Input label="Portfolio" value={form.portfolio} onChange={e => setForm({ ...form, portfolio: e.target.value })} placeholder="yoursite.com" />
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={handleSave} style={{ minWidth: 160, justifyContent: "center" }}>
            {saved ? "✓ Saved!" : "Save Profile →"}
          </Button>
        </div>
      </Card>
    </div>
  );
}

// ─── Saved Startups ───────────────────────────────────────────────────────────
function SavedPage({ savedIds, onToggleSave, onNavigate }) {
  const saved = STARTUPS.filter(s => savedIds.includes(s.id));

  return (
    <div>
      <div style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ color: C.text, fontSize: 22, fontWeight: 800, margin: "0 0 4px" }}>Saved Startups</h1>
        <p style={{ color: C.textMuted, fontSize: 14 }}>{saved.length} saved opportunities</p>
      </div>
      {saved.length === 0 ? (
        <Card style={{ textAlign: "center", padding: "3rem" }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🔖</div>
          <p style={{ color: C.textMuted }}>No saved startups yet. Browse startups and bookmark ones you like!</p>
          <Button onClick={() => onNavigate("browse")} style={{ marginTop: 12 }}>Browse Startups →</Button>
        </Card>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
          {saved.map(s => (
            <Card key={s.id} hover>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <div style={{ fontSize: 28, background: C.bgCard2, borderRadius: 10, width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center" }}>{s.logo}</div>
                  <div>
                    <div style={{ fontWeight: 700, color: C.text, fontSize: 15 }}>{s.name}</div>
                    <div style={{ fontSize: 12, color: C.textMuted }}>{s.category}</div>
                  </div>
                </div>
                <span onClick={() => onToggleSave(s.id)} style={{ fontSize: 18, cursor: "pointer", color: C.warning }}>🔖</span>
              </div>
              <p style={{ fontSize: 13, color: C.textMuted, marginBottom: 12, lineHeight: 1.6 }}>{s.tagline}</p>
              <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                <StageBadge stage={s.stage} />
                <Badge color={C.textMuted}>{s.workType}</Badge>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <Button variant="secondary" size="sm" style={{ flex: 1, justifyContent: "center" }} onClick={() => onToggleSave(s.id)}>Remove</Button>
                <Button size="sm" style={{ flex: 1, justifyContent: "center" }}>Apply Now</Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Founder Startups ─────────────────────────────────────────────────────────
function FounderStartupsPage({ startups = STARTUPS, setStartups, user }) {
  const [createOpen, setCreateOpen] = useState(false);
  const [form, setForm] = useState({ name: "", tagline: "", category: "E-Commerce / AI", stage: "Idea", description: "", compensation: "Equity", workType: "Remote", location: "", deadline: "" });

  const myStartups = startups.filter(s => s.founder?.name === user?.name || s.founder === user?.name || s.id === 1 || s.id === 2);

  const handleCreate = async () => {
    if (!form.name.trim() || !form.tagline.trim() || !form.description.trim()) {
      alert("Please fill in all required fields.");
      return;
    }

    const newStartup = {
      id: Date.now(),
      name: form.name,
      logo: "🚀",
      tagline: form.tagline,
      category: form.category,
      stage: form.stage,
      roles: ["General Partner", "Tech Lead"],
      skills: ["React", "Node.js", "System Design"],
      compensation: form.compensation,
      workType: form.workType,
      location: form.location || "Remote",
      deadline: form.deadline || "2025-12-31",
      founder: { name: user?.name || "Arjun Sharma", avatar: user?.name ? user.name.split(" ").map(n => n[0]).join("") : "AS" },
      description: form.description,
      applications: 0,
      saved: false,
      founded: new Date().getFullYear().toString()
    };

    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5000/api/startups", {
        name: form.name,
        tagline: form.tagline,
        description: form.description,
        category: form.category,
        stage: form.stage,
        compensation: form.compensation,
        workType: form.workType,
        location: form.location || "Remote",
        deadline: form.deadline || "2025-12-31"
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Success! Your startup has been posted successfully in the MERN database.");
    } catch (err) {
      console.warn("MERN integration warning (Backend not configured/reachable, falling back to local simulation):", err.message);
    } finally {
      if (setStartups) {
        setStartups(prev => [newStartup, ...prev]);
      }
      setCreateOpen(false);
      setForm({ name: "", tagline: "", category: "E-Commerce / AI", stage: "Idea", description: "", compensation: "Equity", workType: "Remote", location: "", deadline: "" });
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <div>
          <h1 style={{ color: C.text, fontSize: 22, fontWeight: 800, margin: "0 0 4px" }}>My Startups</h1>
          <p style={{ color: C.textMuted, fontSize: 14 }}>Manage your startup listings</p>
        </div>
        <Button onClick={() => setCreateOpen(true)}>+ Post New Startup</Button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16 }}>
        {myStartups.map(s => (
          <Card key={s.id}>
            <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 32, background: C.bgCard2, borderRadius: 10, width: 50, height: 50, display: "flex", alignItems: "center", justifyContent: "center" }}>{s.logo}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, color: C.text, fontSize: 15 }}>{s.name}</div>
                <div style={{ fontSize: 12, color: C.textMuted }}>{s.category}</div>
              </div>
              <StageBadge stage={s.stage} />
            </div>
            <p style={{ fontSize: 13, color: C.textMuted, marginBottom: 12, lineHeight: 1.6 }}>{s.tagline}</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 14 }}>
              {[["📋", "Applications", s.applications], ["👥", "Roles", s.roles ? s.roles.length : 0], ["💰", "Comp", s.compensation], ["📍", "Type", s.workType]].map(([ic, lb, vl]) => (
                <div key={lb} style={{ background: C.bgCard2, borderRadius: 8, padding: "8px 10px" }}>
                  <div style={{ fontSize: 11, color: C.textDim }}>{ic} {lb}</div>
                  <div style={{ fontSize: 13, color: C.text, fontWeight: 600 }}>{vl}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <Button variant="secondary" size="sm" style={{ flex: 1, justifyContent: "center" }}>✏️ Edit</Button>
              <Button size="sm" style={{ flex: 1, justifyContent: "center" }}>📋 View Apps</Button>
              <Button variant="danger" size="sm">🗑</Button>
            </div>
          </Card>
        ))}
      </div>

      <Modal open={createOpen} onClose={() => setCreateOpen(false)} title="Post New Startup" width={600}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <div style={{ gridColumn: "span 2" }}>
            <Input label="Startup Name *" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. NeuralCart" />
          </div>
          <div style={{ gridColumn: "span 2" }}>
            <Input label="Tagline *" value={form.tagline} onChange={e => setForm({ ...form, tagline: e.target.value })} placeholder="One-line description of your startup" />
          </div>
          <Select label="Category" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} options={["E-Commerce / AI", "FinTech", "HealthTech", "EdTech", "CleanTech", "Logistics / AI", "SaaS", "Other"]} />
          <Select label="Stage" value={form.stage} onChange={e => setForm({ ...form, stage: e.target.value })} options={["Idea", "Prototype", "MVP", "Launched"]} />
          <Select label="Compensation" value={form.compensation} onChange={e => setForm({ ...form, compensation: e.target.value })} options={["Equity", "Paid", "Equity + Paid", "Unpaid", "Internship"]} />
          <Select label="Work Type" value={form.workType} onChange={e => setForm({ ...form, workType: e.target.value })} options={["Remote", "Hybrid", "Onsite"]} />
          <Input label="Location" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} placeholder="City, Country" />
          <Input label="Application Deadline" value={form.deadline} onChange={e => setForm({ ...form, deadline: e.target.value })} type="date" />
          <div style={{ gridColumn: "span 2" }}>
            <label style={{ fontSize: 13, color: C.textMuted, display: "block", marginBottom: 6 }}>Description *</label>
            <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Describe your startup, problem you're solving, and what you're looking for..."
              style={{ width: "100%", minHeight: 100, background: C.bgCard2, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", color: C.text, fontSize: 14, resize: "vertical", outline: "none", boxSizing: "border-box" }} />
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 16 }}>
          <Button variant="secondary" onClick={() => setCreateOpen(false)}>Cancel</Button>
          <Button onClick={handleCreate} disabled={!form.name.trim() || !form.tagline.trim() || !form.description.trim()}>Post Startup →</Button>
        </div>
      </Modal>
    </div>
  );
}

// ─── Team Page ────────────────────────────────────────────────────────────────
function TeamPage() {
  const team = [
    { name: "Sarah O'Brien", role: "ML Engineer", startup: "NeuralCart", status: "active", since: "Jan 2025", avatar: "SO" },
    { name: "Jake Torres", role: "UI Designer", startup: "NeuralCart", status: "active", since: "Jan 2025", avatar: "JT" },
    { name: "Priya Kapoor", role: "Product Manager", startup: "NeuralCart", status: "active", since: "Dec 2024", avatar: "PK" },
    { name: "Ben Walker", role: "DevOps Engineer", startup: "NeuralCart", status: "inactive", since: "Nov 2024", avatar: "BW" },
  ];

  return (
    <div>
      <div style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ color: C.text, fontSize: 22, fontWeight: 800, margin: "0 0 4px" }}>Team Management</h1>
        <p style={{ color: C.textMuted, fontSize: 14 }}>{team.filter(t => t.status === "active").length} active members across your startups</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
        {team.map((m, i) => (
          <Card key={i}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
              <Avatar initials={m.avatar} size={48} color={m.status === "active" ? C.accent : C.textMuted} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, color: C.text, fontSize: 15 }}>{m.name}</div>
                <div style={{ fontSize: 13, color: C.textMuted }}>{m.role}</div>
                <div style={{ fontSize: 12, color: C.textDim }}>Since {m.since}</div>
              </div>
              <Badge color={m.status === "active" ? C.success : C.textMuted}>{m.status === "active" ? "● Active" : "○ Inactive"}</Badge>
            </div>
            <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 12 }}>🚀 {m.startup}</div>
            <div style={{ display: "flex", gap: 8 }}>
              <Button variant="secondary" size="sm" style={{ flex: 1, justifyContent: "center" }}>Message</Button>
              <Button variant="danger" size="sm">Remove</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function StartSync() {
  const [page, setPage] = useState("landing");
  const [user, setUser] = useState(null);
  const [savedIds, setSavedIds] = useState([2, 4]);
  const [applications, setApplications] = useState(APPLICATIONS);
  const [startups, setStartups] = useState(STARTUPS);
  const notifCount = 2;

  useEffect(() => {
    const restoreSession = async () => {
      const token = localStorage.getItem("token");
      if (token && !user) {
        try {
          if (token.startsWith("mock-token-for-")) {
            const role = token.replace("mock-token-for-", "");
            const capitalizedRole = role.charAt(0).toUpperCase() + role.slice(1);
            setUser({
              name: capitalizedRole === "Founder" ? "Arjun Sharma" : "Alex Johnson",
              role: capitalizedRole,
              email: `${role}@startsync.io`,
              token
            });
            if (capitalizedRole === "Founder") setPage("founder-dashboard");
            else if (capitalizedRole === "Admin") setPage("admin-dashboard");
            else setPage("collab-dashboard");
            return;
          }
          const res = await axios.get("http://localhost:5000/api/auth/profile", {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (res.data) {
            setUser({ ...res.data, token });
            if (res.data.role === "Founder") setPage("founder-dashboard");
            else if (res.data.role === "Admin") setPage("admin-dashboard");
            else setPage("collab-dashboard");
          }
        } catch (err) {
          console.warn("Session restore failed:", err.message);
          localStorage.removeItem("token");
        }
      }
    };
    restoreSession();
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        const startupsRes = await axios.get("http://localhost:5000/api/startups");
        if (startupsRes.data && Array.isArray(startupsRes.data) && startupsRes.data.length > 0) {
          setStartups(startupsRes.data);
        }
      } catch (err) {
        console.warn("MERN startups fetch warning:", err.message);
      }

      if (user) {
        try {
          const token = localStorage.getItem("token");
          if (token) {
            const authHeader = { headers: { Authorization: `Bearer ${token}` } };
            if (user.role === "Collaborator") {
              const appsRes = await axios.get("http://localhost:5000/api/applications/my-applications", authHeader);
              if (appsRes.data && Array.isArray(appsRes.data)) {
                setApplications(appsRes.data);
              }
            } else if (user.role === "Founder") {
              const appsRes = await axios.get("http://localhost:5000/api/applications/startup-applications", authHeader);
              if (appsRes.data && Array.isArray(appsRes.data)) {
                setApplications(appsRes.data);
              }
            }
          }
        } catch (err) {
          console.warn("MERN applications fetch warning:", err.message);
        }
      }
    };
    loadData();
  }, [user]);

  const navigate = p => setPage(p);

  const handleStatusUpdate = async (id, status) => {
    try {
      const token = localStorage.getItem("token");
      if (token && !token.startsWith("mock-")) {
        const res = await axios.put(`http://localhost:5000/api/applications/${id}/status`, { status }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.data) {
          setApplications(prev => prev.map(app => (app._id === id || app.id === id) ? { ...app, status: res.data.status } : app));
          return;
        }
      }
      // Fallback local update if mock token or offline
      setApplications(prev => prev.map(app => (app._id === id || app.id === id) ? { ...app, status } : app));
    } catch (err) {
      console.warn("Failed to update application status:", err.message);
      // Fallback local update
      setApplications(prev => prev.map(app => (app._id === id || app.id === id) ? { ...app, status } : app));
    }
  };

  const handleLogin = u => {
    setUser(u);
    if (u.token) localStorage.setItem("token", u.token);
    else localStorage.setItem("token", `mock-token-for-${u.role.toLowerCase()}`);
    if (u.role === "Founder") setPage("founder-dashboard");
    else if (u.role === "Admin") setPage("admin-dashboard");
    else setPage("collab-dashboard");
  };

  const handleLogout = () => { setUser(null); localStorage.removeItem("token"); setPage("landing"); };
  const toggleSave = id => setSavedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);

  if (!user && page === "landing") {
    return (
      <div>
        <LandingPage onNavigate={navigate} />
        <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 999 }}>
          <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 12, padding: "10px 14px", fontSize: 12, color: C.textMuted, display: "flex", gap: 8, alignItems: "center" }}>
            <span>Try as:</span>
            {["Collaborator", "Founder", "Admin"].map(r => (
              <button key={r} onClick={() => handleLogin({ name: r === "Admin" ? "Admin User" : r === "Founder" ? "Arjun Sharma" : "Alex Johnson", role: r, email: `${r.toLowerCase()}@startsync.io` })}
                style={{ background: C.gradient, color: "#fff", border: "none", borderRadius: 8, padding: "5px 12px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    if (page === "login" || page === "signup") return <AuthPage type={page} onNavigate={navigate} onLogin={handleLogin} />;
    return <LandingPage onNavigate={navigate} />;
  }

  const renderPage = () => {
    switch (page) {
      case "collab-dashboard": return <CollabDashboard user={user} onNavigate={navigate} startups={startups} applications={applications} savedIds={savedIds} />;
      case "browse": return <BrowsePage savedIds={savedIds} onToggleSave={toggleSave} onMessage={() => navigate("messages")} startups={startups} setApplications={setApplications} />;
      case "collab-applications": return <ApplicationsPage apps={applications} isFounder={false} />;
      case "collab-saved": return <SavedPage savedIds={savedIds} onToggleSave={toggleSave} onNavigate={navigate} />;
      case "messages": return <MessagesPage user={user} />;
      case "profile": return <ProfilePage user={user} onProfileUpdate={updatedUser => setUser(prev => ({ ...prev, ...updatedUser }))} applications={applications} />;
      case "founder-dashboard": return <FounderDashboard user={user} onNavigate={navigate} startups={startups} applications={applications} />;
      case "founder-startups": return <FounderStartupsPage startups={startups} setStartups={setStartups} user={user} />;
      case "founder-applications": return <ApplicationsPage apps={applications} isFounder={true} onStatusUpdate={handleStatusUpdate} />;
      case "founder-team": return <TeamPage />;
      case "admin-dashboard": return <AdminDashboard />;
      case "admin-users": return <AdminDashboard />;
      case "admin-startups": return <AdminDashboard />;
      default: return <CollabDashboard user={user} onNavigate={navigate} startups={startups} applications={applications} savedIds={savedIds} />;
    }
  };

  return (
    <AppShell user={user} onLogout={handleLogout} activePage={page} onNavigate={navigate} notifCount={notifCount}>
      {renderPage()}
    </AppShell>
  );
}
