import { useState } from "react";
import { C } from "../constants/theme";
import { Button, Badge, Card, StageBadge, Tag, Avatar } from "../components";
import { STARTUPS } from "../data/mockData";

export default function LandingPage({ onNavigate }) {
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
