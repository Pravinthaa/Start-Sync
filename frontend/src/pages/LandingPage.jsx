import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STARTUPS = [
  { id: 1, name: "NeuralCart", logo: "🛒", tagline: "AI-powered e-commerce personalization", category: "E-Commerce / AI", stage: "MVP", roles: ["React Dev", "ML Engineer", "UI Designer"], skills: ["React", "Python", "TensorFlow"], compensation: "Equity", workType: "Remote", location: "San Francisco, CA", deadline: "2025-03-01", founder: { name: "Arjun Sharma", avatar: "AS" }, description: "NeuralCart uses advanced ML to predict what customers want before they search. We're reinventing online shopping with hyper-personalization at scale.", applications: 24, saved: false, founded: "2024" },
  { id: 2, name: "GreenTrack", logo: "🌱", tagline: "Carbon footprint tracking for enterprises", category: "CleanTech / SaaS", stage: "Launched", roles: ["Full-Stack Dev", "Data Engineer", "Marketing Lead"], skills: ["Node.js", "PostgreSQL", "React"], compensation: "Paid", workType: "Hybrid", location: "Berlin, Germany", deadline: "2025-02-15", founder: { name: "Lena Weber", avatar: "LW" }, description: "GreenTrack helps companies measure, report, and reduce their carbon emissions with real-time dashboards and automated ESG reporting.", applications: 41, saved: true, founded: "2023" },
  { id: 3, name: "MediSync", logo: "🏥", tagline: "Connecting patients with specialist doctors", category: "HealthTech", stage: "Prototype", roles: ["Backend Dev", "Mobile Dev", "UX Researcher"], skills: ["Flutter", "Django", "AWS"], compensation: "Equity + Paid", workType: "Remote", location: "New York, NY", deadline: "2025-04-10", founder: { name: "Dr. Priya Nair", avatar: "PN" }, description: "MediSync eliminates the 6-week wait time to see a specialist. Our platform uses AI triage to match patients with the right doctor instantly.", applications: 18, saved: false, founded: "2024" }
];

export default function LandingPage({ onNavigate }) {
  const [activeFaq, setActiveFaq] = useState(null);

  const faqs = [
    { q: "Is StartSync free to use?", a: "StartSync is completely free for collaborators. Founders get a trial option; the Startup/Scale plans unlock unlimited listings and advanced analytics." },
    { q: "How are collaborators vetted?", a: "Collaborators build verified profiles with skill assessments, GitHub/portfolio links, and peer endorsements. Founders can review full profiles before reaching out." },
    { q: "What types of compensation are available?", a: "Founders can offer equity, paid roles, unpaid/volunteer, or internship opportunities. All compensation details are clearly listed on each startup card." },
    { q: "Can I apply to multiple startups?", a: "Absolutely! There's no limit on applications. We even suggest startups based on your skills and preferences to help you find the best fit." },
    { q: "How does the messaging system work?", a: "Once a founder shortlists your application, a direct chat unlocks between you and the founder. All messages are end-to-end encrypted and delivered in real-time." },
  ];

  return (
    <div style={{ background: "var(--black)", color: "var(--white)", minHeight: "100vh" }}>
      {/* NAV */}
      <nav className="landing-nav" style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "1.25rem 4rem",
        background: "rgba(10,10,15,0.85)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid var(--border)"
      }}>
        <div className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ cursor: "pointer" }}>
          <div className="nav-dot"></div>
          Start<span style={{ color: "var(--accent)" }}>Sync</span>
        </div>
        <ul className="nav-links" style={{ margin: 0, padding: 0 }}>
          <li><a href="#features">Features</a></li>
          <li><a href="#how">How it Works</a></li>
          <li><a href="#pricing">Pricing</a></li>
          <li><a href="#testimonials">Reviews</a></li>
        </ul>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <a onClick={() => onNavigate("login")} style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: "0.9rem", cursor: "pointer" }}>Log In</a>
          <a onClick={() => onNavigate("signup")} className="nav-cta" style={{ cursor: "pointer", textDecoration: "none" }}>Get Started</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-grid-lines"></div>
        <div className="hero-glow"></div>
        <div className="hero-glow2"></div>
        <div className="hero-content">
          <motion.div className="badge-new"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span className="badge-new-dot"></span>
            Now live — Invite-only beta
          </motion.div>
          <motion.h1 className="hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Sync your startup.<br />
            <span className="line2">Ship <span className="accent-word">faster</span> together.</span>
          </motion.h1>
          <motion.p className="hero-sub"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            The all-in-one collaboration layer for early-stage teams. Keep your team, tools, and timelines perfectly in sync — from idea to launch.
          </motion.p>
          <motion.div className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <button onClick={() => onNavigate("signup")} className="glow-btn" style={{ padding: "1rem 2.2rem", borderRadius: 100, fontSize: "1rem", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
              Start for free
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
            <button onClick={() => onNavigate("browse")} className="secondary-btn" style={{ padding: "1rem 2.2rem", borderRadius: 100, fontSize: "1rem", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
              Browse Startups
            </button>
          </motion.div>
          
          <motion.div className="hero-metrics"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="metric-item">
              <div className="metric-num">2.4<span>K+</span></div>
              <div className="metric-label">Startups onboarded</div>
            </div>
            <div className="metric-sep"></div>
            <div className="metric-item">
              <div className="metric-num">98<span>%</span></div>
              <div className="metric-label">On-time launches</div>
            </div>
            <div className="metric-sep"></div>
            <div className="metric-item">
              <div className="metric-num">3<span>x</span></div>
              <div className="metric-label">Faster shipping</div>
            </div>
            <div className="metric-sep"></div>
            <div className="metric-item">
              <div className="metric-num">14<span>ms</span></div>
              <div className="metric-label">Avg. sync latency</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee-section">
        <div className="marquee-track">
          {["Real-time Sync", "Team Velocity", "Sprint Planning", "AI Roadmaps", "Investor Updates", "Zero Context Loss", "Live Dashboards", "Async Standups",
            "Real-time Sync", "Team Velocity", "Sprint Planning", "AI Roadmaps", "Investor Updates", "Zero Context Loss", "Live Dashboards", "Async Standups"].map((t, idx) => (
            <div key={idx} className="marquee-item">
              {t} <span className="marquee-sep">✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* FEATURED STARTUPS */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "6rem 4rem 4rem" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div className="section-label">Active Ventures</div>
          <h2 className="section-title" style={{ margin: "0 auto" }}>Featured startup teams looking for collaborators</h2>
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 24 }}
        >
          {STARTUPS.map(s => (
            <div key={s.id} className="feature-card" onClick={() => onNavigate("browse")} style={{ background: "var(--card-bg)", cursor: "pointer" }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ fontSize: 28, background: "rgba(255,255,255,0.03)", border: "1px solid var(--border)", borderRadius: 10, width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center" }}>{s.logo}</div>
                  <div>
                    <div style={{ fontWeight: 700, color: "var(--white)", fontSize: 15 }}>{s.name}</div>
                    <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>{s.category}</div>
                  </div>
                </div>
              </div>
              <p style={{ fontSize: 13, color: "var(--text-secondary)", marginBottom: 12, lineHeight: 1.6 }}>{s.tagline}</p>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
                {s.skills.slice(0, 3).map(sk => <span key={sk} style={{ fontSize: 11, background: "rgba(255,255,255,0.04)", border: "1px solid var(--border)", padding: "2px 8px", borderRadius: 4 }}>{sk}</span>)}
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>📍 {s.workType} · {s.compensation}</div>
                <span style={{ fontSize: 11, color: "var(--accent)", background: "rgba(200,255,87,0.1)", padding: "2px 8px", borderRadius: 100 }}>{s.applications} applied</span>
              </div>
            </div>
          ))}
        </motion.div>
        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <button className="secondary-btn" onClick={() => onNavigate("browse")} style={{ padding: "0.9rem 2rem", borderRadius: 100 }}>
            Browse All Startups →
          </button>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="section-label">Core Features</div>
        <h2 className="section-title">Everything your team needs. <span className="dim">Nothing you don't.</span></h2>
        
        <motion.div className="features-grid"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="feature-card large">
            <div>
              <div className="feature-icon green">⚡</div>
              <div className="feature-name">Live Sync Engine</div>
              <p className="feature-desc">Sub-20ms conflict-free real-time collaboration. Every edit, comment, and status update propagates instantly across your entire team — no refreshes, no lost work, no duplicated effort.</p>
            </div>
            <div className="feature-visual">
              <div className="sync-visual" style={{ width: "80%", flexDirection: "column", gap: "1.5rem" }}>
                <div style={{ display: "flex", alignItems: "center", width: "100%", gap: "1rem" }}>
                  <div className="sync-node"></div>
                  <div className="sync-line"></div>
                  <div className="sync-node" style={{ background: "rgba(255,87,87,0.15)", borderColor: "rgba(255,87,87,0.3)" }}></div>
                  <div className="sync-line" style={{ transform: "scaleX(-1)" }}></div>
                  <div className="sync-node" style={{ background: "rgba(87,150,255,0.15)", borderColor: "rgba(87,150,255,0.3)" }}></div>
                </div>
                <div style={{ textAlign: "center", fontSize: "0.75rem", color: "var(--text-secondary)", letterSpacing: "0.08em", textTransform: "uppercase" }}>14ms avg latency</div>
              </div>
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-icon red">🗺️</div>
            <div className="feature-name">AI Roadmapping</div>
            <p className="feature-desc">Turn your messy Notion dump into a prioritized, investor-ready roadmap in seconds. StartSync AI understands startup context.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon blue">📊</div>
            <div className="feature-name">Live KPI Dashboard</div>
            <p className="feature-desc">Connect Stripe, Mixpanel, or any data source. Get a single-screen view of every metric that matters to your investors and team.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon purple">🔔</div>
            <div className="feature-name">Smart Standups</div>
            <p className="feature-desc">Async standups that actually get read. Auto-summarized, threaded, and surfaced to the right people at the right moment.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon green">🤝</div>
            <div className="feature-name">Investor Updates</div>
            <p className="feature-desc">Auto-generate beautiful, data-rich investor updates with one click. Pull metrics directly from your live dashboard — no copy-pasting.</p>
          </div>
        </motion.div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="how-section" style={{ paddingLeft: "4rem", paddingRight: "4rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
          <div className="section-label">How it Works</div>
          <h2 className="section-title" style={{ margin: "0 auto" }}>Up and running <span className="dim">in under 5 minutes.</span></h2>
          <motion.div className="steps-track"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {[
              { num: "01", title: "Connect your tools", desc: "Plug in Slack, GitHub, Linear, Notion, Stripe — or start fresh. One-click integrations, no dev required." },
              { num: "02", title: "Invite your team", desc: "Send invite links. Everyone gets a unified workspace with roles, permissions, and shared context from day one." },
              { num: "03", title: "Set your north star", desc: "Define your launch goals. StartSync auto-builds milestones, assigns owners, and keeps the team accountable." },
              { num: "04", title: "Ship, together", desc: "Stay in sync with daily digests, live dashboards, and AI nudges that keep everyone unblocked and moving." }
            ].map(step => (
              <div key={step.num} className="step">
                <div className="step-num">{step.num}</div>
                <div className="step-title">{step.title}</div>
                <p className="step-desc">{step.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="section-label">Pricing</div>
        <h2 className="section-title">Simple, honest pricing. <span className="dim">Scale as you grow.</span></h2>
        <motion.div className="pricing-grid"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="price-card">
            <div className="plan-name">Founder</div>
            <div className="plan-desc">Perfect for solo founders and pre-team stage.</div>
            <div className="plan-price">
              <span className="price-num">$0</span>
              <span className="price-per">/ month</span>
            </div>
            <ul className="plan-features">
              <li><span className="check">✓</span> 1 workspace</li>
              <li><span className="check">✓</span> Up to 3 team members</li>
              <li><span className="check">✓</span> Basic KPI dashboard</li>
              <li><span className="check">✓</span> 5 integrations</li>
              <li><span className="check">✓</span> Community support</li>
            </ul>
            <button className="plan-btn outline" onClick={() => onNavigate("signup")}>Get started free</button>
          </div>

          <div className="price-card featured">
            <div className="price-badge">Most Popular</div>
            <div className="plan-name">Startup</div>
            <div className="plan-desc">For growing teams shipping their first product.</div>
            <div className="plan-price">
              <span className="price-num">$49</span>
              <span className="price-per">/ month</span>
            </div>
            <ul className="plan-features">
              <li><span className="check">✓</span> Unlimited members</li>
              <li><span className="check">✓</span> Live sync engine</li>
              <li><span className="check">✓</span> AI roadmapping</li>
              <li><span className="check">✓</span> Unlimited integrations</li>
              <li><span className="check">✓</span> Investor update generator</li>
              <li><span className="check">✓</span> Priority support</li>
            </ul>
            <button className="plan-btn accent" onClick={() => onNavigate("signup")}>Start 14-day trial</button>
          </div>

          <div className="price-card">
            <div className="plan-name">Scale</div>
            <div className="plan-desc">For Series A teams with complex operations.</div>
            <div className="plan-price">
              <span className="price-num">$199</span>
              <span className="price-per">/ month</span>
            </div>
            <ul className="plan-features">
              <li><span className="check">✓</span> Everything in Startup</li>
              <li><span className="check">✓</span> Custom AI models</li>
              <li><span className="check">✓</span> Multi-workspace</li>
              <li><span className="check">✓</span> SSO & advanced security</li>
              <li><span className="check">✓</span> Dedicated CSM</li>
            </ul>
            <button className="plan-btn outline" onClick={() => onNavigate("signup")}>Contact sales</button>
          </div>
        </motion.div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" style={{ background: "rgba(255,255,255,0.005)", paddingLeft: "4rem", paddingRight: "4rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="section-label">Testimonials</div>
          <h2 className="section-title">Founders who <span className="dim">ship with StartSync.</span></h2>
          <motion.div className="testimonials-grid"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {[
              { name: "Aisha Ramirez", role: "Co-founder, Loopa · YC S24", avatar: "AR", color: "var(--accent)", quote: "We went from constant 'what are you working on?' Slack messages to a team that's genuinely in sync. Shipped our MVP 3 weeks ahead of schedule." },
              { name: "Kiran Mehta", role: "CEO, FluxAI · Techstars '24", avatar: "KM", color: "#5796FF", quote: "The investor update feature alone saves me 3 hours a month. Our lead just said it's the best update format they've seen from any portfolio company." },
              { name: "Sophie Lin", role: "CTO, Vesper · a16z portfolio", avatar: "SL", color: "#B457FF", quote: "StartSync is the nervous system of our startup. It quietly keeps everything connected — roadmap, metrics, team — so we focus on building, not coordinating." }
            ].map((t, idx) => (
              <div key={idx} className="testimonial">
                <div className="stars">★★★★★</div>
                <p className="quote">"{t.quote}"</p>
                <div className="author">
                  <div className="avatar" style={{ background: `${t.color}22`, color: t.color }}>{t.avatar}</div>
                  <div>
                    <div className="author-name">{t.name}</div>
                    <div className="author-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section style={{ maxWidth: 800, margin: "0 auto", padding: "6rem 2rem" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div className="section-label">FAQ</div>
          <h2 className="section-title" style={{ margin: "0 auto" }}>Frequently Asked Questions</h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{ borderBottom: "1px solid var(--border)", paddingBottom: 16, marginBottom: 12 }}>
              <div onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", padding: "8px 0" }}>
                <span style={{ fontWeight: 600, color: "var(--white)", fontSize: 16, fontFamily: "'Syne', sans-serif" }}>{faq.q}</span>
                <span style={{ color: "var(--accent)", transition: "transform 0.25s", transform: activeFaq === i ? "rotate(45deg)" : "none", fontSize: 22 }}>+</span>
              </div>
              <AnimatePresence>
                {activeFaq === i && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.7, marginTop: 8, overflow: "hidden" }}
                  >
                    {faq.a}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="section-label">Get started today</div>
        <h2 className="cta-title">Ready to sync<br />your startup?</h2>
        <p className="cta-sub">Join 2,400+ teams building faster with StartSync. Free forever, no credit card required.</p>
        <div className="cta-row">
          <div className="input-group-new">
            <input type="email" placeholder="your@startup.com" />
            <button className="glow-btn" onClick={() => onNavigate("signup")} style={{ padding: "0.75rem 1.6rem", fontSize: "0.95rem", borderRadius: 100, display: "flex", alignItems: "center", gap: 4 }}>
              Join beta
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>
        <p style={{ marginTop: "1.5rem", fontSize: "0.82rem", color: "var(--text-secondary)" }}>No spam. No credit card. Unsubscribe anytime.</p>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-top">
          <div className="footer-brand">
            <div className="nav-logo">
              <div className="nav-dot"></div>
              Start<span style={{ color: "var(--accent)" }}>Sync</span>
            </div>
            <p className="footer-desc">The collaboration layer for ambitious startup teams. Sync your team, tools, and timelines from idea to launch.</p>
          </div>
          <div className="footer-col">
            <h4>Product</h4>
            <ul style={{ margin: 0, padding: 0 }}>
              <li><a href="#features">Features</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#">Changelog</a></li>
              <li><a href="#">Integrations</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <ul style={{ margin: 0, padding: 0 }}>
              <li><a href="#">About</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Resources</h4>
            <ul style={{ margin: 0, padding: 0 }}>
              <li><a href="#">Docs</a></li>
              <li><a href="#">API</a></li>
              <li><a href="#">Status</a></li>
              <li><a href="#">Templates</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2025 StartSync, Inc. All rights reserved.</span>
          <span>Privacy · Terms · Security</span>
        </div>
      </footer>
    </div>
  );
}
