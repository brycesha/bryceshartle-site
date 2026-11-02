import { useEffect, useState } from 'react';
import { ArrowUpRight, ArrowDown, Moon, Sun, Mail, Linkedin, Download, Plus, Award } from 'lucide-react';
import HeroWorld from './fx/HeroWorld';
import Cursor from './fx/Cursor';
import { useSmoothScroll, scrollToId, lockScroll, refreshScroll } from './fx/useSmoothScroll';
import { asset, experiences, leadership, portfolioItems } from './data';

const NAV = ['about', 'experience', 'skills', 'leadership', 'gallery', 'resume', 'contact'];
const YEARS: Record<string, string> = {
  'Michelin': '2024 — Now',
  'University of South Carolina': '2023 — 25',
  'Harris Teeter': '2021 — 24',
  'Cox, Kliewer & Company, P.C.': '2019',
};
const GROUPS = [
  { name: 'Sell', tag: 'Territory & accounts', cls: 'solid', items: ['Sales & Territory Management', 'Account Management', 'Client Relationship Building', 'Business Development'] },
  { name: 'Lead', tag: 'People & process', cls: 'blue', items: ['Stakeholder Engagement', 'Strategic Planning', 'Cross-Functional Collaboration', 'Project Coordination'] },
  { name: 'Analyze', tag: 'Data & decisions', cls: 'stroke', items: ['Data-Driven Decision Making', 'Business Intelligence', 'Process Optimization', 'Microsoft Suite'] },
];
const PROGRAMS = [
  { name: 'Rhodos Fellows Innovation Community', years: 'Freshman – Junior' },
  { name: 'Formula SAE (Tractive Team)', years: 'Junior' },
  { name: 'Resident Assistant Program', years: 'Freshman – Senior' },
  { name: 'Delta Chi Fraternity (Vice President)', years: 'Sophomore – Senior' },
  { name: 'IDEA Community', years: 'Senior' },
  { name: 'Volunteer · St. Thomas More Catholic Church', years: 'Junior – Senior' },
];
const AWARDS = [
  { title: "President's List (4.0)", sub: 'Fall 2022, Spring 2024, Fall 2024, Spring 2025, Fall 2025' },
  { title: "Dean's List (3.5+)", sub: 'Spring 2023, Fall 2023' },
  { title: 'Engineering & Computing Scholarship', sub: 'Sophomore – Junior' },
  { title: 'Duane and Mary Meyer Scholarship', sub: 'Junior' },
  { title: 'AI and Career Empowerment Certificate', sub: 'University of Maryland · Robert H. Smith School of Business · Dec 2025' },
];
const STATS = [
  { to: 50, dec: 0, suffix: '+', label: 'members in a progress focused workshop I led' },
  { to: 10, dec: 0, suffix: '+', label: 'operational tools built for logistics, budget, and communications' },
  { to: 4, dec: 0, suffix: '', label: 'roles at Michelin since 2024, from intern to key account manager' },
];

function Mask({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <span className={`mask ${className}`}><span className="mask-in">{children}</span></span>;
}
function Heading({ eyebrow, children }: { eyebrow: string; children: React.ReactNode }) {
  return (
    <header className="sec-head">
      <p className="eyebrow fade-up">{eyebrow}</p>
      <h2 className="display sec-title">{children}</h2>
    </header>
  );
}
function Words({ text, className = '' }: { text: string; className?: string }) {
  return <p className={className}>{text.split(' ').map((w, i) => <span key={i} className="word">{w} </span>)}</p>;
}
function Btn({ href, onClick, children, ghost = false, download, external, label, plain = false }: {
  href?: string; onClick?: () => void; children: React.ReactNode; ghost?: boolean; download?: string; external?: boolean; label?: string; plain?: boolean;
}) {
  const cls = `btn ${plain ? 'btn-plain' : 'magnetic'} ${ghost ? 'btn-ghost' : ''}`;
  const inner = (<><span className="btn-fill" /><span className="btn-text">{children}</span><ArrowUpRight className="btn-arrow" size={18} /></>);
  if (href) return <a className={cls} href={href} download={download} data-cursor={label} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{inner}</a>;
  return <button className={cls} onClick={onClick}>{inner}</button>;
}

function App() {
  const [isDark, setIsDark] = useState(true);
  const [menu, setMenu] = useState(false);
  const [open, setOpen] = useState<string>('0-0');
  useSmoothScroll();

  useEffect(() => { document.documentElement.dataset.theme = isDark ? 'dark' : 'light'; }, [isDark]);
  useEffect(() => { lockScroll(menu); document.documentElement.classList.toggle('menu-open', menu); }, [menu]);
  useEffect(() => { refreshScroll(500); }, [open]);

  const go = (id: string) => { setMenu(false); setTimeout(() => scrollToId(id), menu ? 350 : 0); };

  return (
    <div className="site">
      <div id="loader" aria-hidden="true">
        <svg className="loader-tire" viewBox="0 0 100 100" width="84" height="84">
          <circle cx="50" cy="50" r="44" fill="none" stroke="#FCE500" strokeWidth="10" strokeDasharray="6 4" />
          <circle cx="50" cy="50" r="26" fill="none" stroke="#fff" strokeWidth="3" />
          <circle cx="50" cy="50" r="6" fill="#FCE500" />
        </svg>
        <div className="loader-num">000</div>
        <div className="loader-bar"><div className="loader-fill" /></div>
      </div>

      <div id="scroll-progress" />
      <Cursor />

      {/* Top bar */}
      <header className="topbar">
        <button className="brand" onClick={() => go('home')} aria-label="Back to top">
          <span className="brand-mark">BS</span><span className="brand-name">Bryce Shartle</span>
        </button>
        <div className="topbar-right">
          <button className="icon-btn" onClick={() => setIsDark(!isDark)} aria-label="Toggle dark mode">{isDark ? <Sun size={18} /> : <Moon size={18} />}</button>
          <button className="menu-btn" onClick={() => setMenu(!menu)} aria-expanded={menu}>
            <span>{menu ? 'Close' : 'Menu'}</span><i className="menu-dots" />
          </button>
        </div>
      </header>

      <nav className={`overlay ${menu ? 'is-open' : ''}`} aria-hidden={!menu}>
        <ul>
          {NAV.map((s, i) => (
            <li key={s} style={{ transitionDelay: `${menu ? 0.12 + i * 0.05 : 0}s` }}>
              <button onClick={() => go(s)} tabIndex={menu ? 0 : -1}><span className="mono">{String(i + 1).padStart(2, '0')}</span>{s}</button>
            </li>
          ))}
        </ul>
        <p className="mono overlay-foot">bryceshartle@gmail.com · New York, NY</p>
      </nav>

      {/* ---------------- Hero ---------------- */}
      <div className="hero-track" id="home"><section className="hero">
        <HeroWorld />
        <div className="hero-grid">
          <div className="hero-content">
            <p className="mono hero-fade hero-kicker"><i className="live-dot" /><span>NY/NJ B2C Sales Account Manager (WDA) · New York, NY</span></p>
            <h1 className="display hero-title" aria-label="Bryce Shartle">
              <span className="hero-line"><span className="hero-word">Bryce</span></span>
              <span className="hero-line"><span className="hero-word soft">Shartle</span></span>
            </h1>
            <p className="hero-lede hero-fade">
              B2C Sales Account Manager for Michelin's Wholesale Distributor & Associate (WDA) channel across New York and New Jersey.
              I pair data-driven thinking with consultative selling to build lasting relationships and deliver
              real value to every account.
            </p>
            <div className="hero-cta hero-fade">
              <Btn onClick={() => go('contact')}>Get in touch</Btn>
              <Btn onClick={() => go('resume')} ghost>View resume</Btn>
            </div>
            <p className="hero-hint mono hero-fade"><i /> <span>Move your cursor · Click to light the city</span></p>
          </div>
        </div>
        <button className="scroll-cue mono hero-fade" onClick={() => go('about')}><ArrowDown size={14} /> Scroll</button>
      </section></div>

      {/* ---------------- Stats ---------------- */}
      <section className="stats stagger-group">
        {STATS.map((s) => (
          <div key={s.label} className="stat stagger-item">
            <div className="display stat-num" data-to={s.to} data-dec={s.dec} data-suffix={s.suffix}>{s.to.toFixed(s.dec)}{s.suffix}</div>
            <p>{s.label}</p>
          </div>
        ))}
      </section>

      {/* ---------------- About ---------------- */}
      <section id="about" className="sec about">
        <Heading eyebrow="About"><Mask>The person</Mask><Mask>behind the</Mask><Mask className="blue">territory.</Mask></Heading>
        <div className="about-grid">
          <div className="about-copy">
            <Words className="lead" text="My career has been shaped by a genuine interest in how businesses grow — whether that means building tools that surface the right information at the right time, or showing up in a territory and earning the trust of the people you serve." />
            <Words className="body-lg" text="I've worked across operations, cross-functional teams, and customer-facing sales, and what connects all of it is a consistent focus on delivering real value to the people around me. I thrive in environments where the work is varied, the stakes are real, and there's always something more to learn. Whether I'm aligning stakeholders around a shared goal, managing a client relationship, or navigating a new challenge, I bring the same energy: structured thinking, a bias toward action, and a genuine investment in doing the job well." />
          </div>
          <aside className="spec spot fade-up" aria-label="Education">
            <p className="mono spec-head">Spec sheet · Education</p>
            <dl>
              <div><dt>School</dt><dd>University of South Carolina</dd></div>
              <div><dt>College</dt><dd>Molinaroli College of Engineering and Computing</dd></div>
              <div><dt>Major</dt><dd>Integrated Information Technology</dd></div>
              <div><dt>Minors</dt><dd>Computer Science, Cybersecurity Operations</dd></div>
              <div><dt>Graduated</dt><dd>December 2025</dd></div>
              <div className="spec-hi"><dt>GPA</dt><dd>3.94</dd></div>
            </dl>
          </aside>
        </div>
      </section>

      {/* ---------------- Experience ---------------- */}
      <section id="experience" className="sec dark-sec morph">
        <Heading eyebrow="Experience"><Mask>Where the</Mask><Mask className="yellow">road&nbsp;led.</Mask></Heading>
        <div className="route">
          <div className="route-line"><div className="route-fill" /></div>
          {experiences.map((exp, i) => (
            <article key={exp.company} className="route-stop">
              <span className="route-dot" />
              <div className="route-meta">
                <p className="mono route-years">{YEARS[exp.company]}</p>
                <h3 className="display route-co">{exp.company}</h3>
                <p className="mono muted">{exp.location}</p>
              </div>
              <div className="route-body">
                {exp.positions.map((pos, j) => {
                  const key = `${i}-${j}`; const isOpen = open === key;
                  return (
                    <div key={key} className={`pos ${isOpen ? 'is-open' : ''}`}>
                      <button className="pos-head" onClick={() => setOpen(isOpen ? '' : key)} aria-expanded={isOpen} data-cursor={isOpen ? 'Close' : 'Open'}>
                        <span className="pos-title">{pos.title}<small className="mono">{pos.period}</small></span>
                        <span className="pos-plus"><Plus size={20} /></span>
                      </button>
                      <div className="pos-panel"><div><ul>{pos.highlights.map((h, k) => <li key={k}>{h}</li>)}</ul></div></div>
                    </div>
                  );
                })}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ---------------- Skills ---------------- */}
      <section id="skills" className="sec">
        <Heading eyebrow="Skills &amp; capabilities"><Mask>Built for the</Mask><Mask className="blue">long haul.</Mask></Heading>
        <div className="caps">
          {GROUPS.map((g) => (
            <div key={g.name} className="cap">
              <div className="cap-line" />
              <p className="mono cap-tag">{g.tag}</p>
              <h3 className={`display cap-name ${g.cls}`}><Mask>{g.name}</Mask></h3>
              <ul>{g.items.map((it) => <li key={it} className="cap-item">{it}</li>)}</ul>
            </div>
          ))}
        </div>

        <h3 className="mono sub-head fade-up">Programs &amp; communities</h3>
        <div className="passes stagger-group">
          {PROGRAMS.map((p) => (
            <div key={p.name} className="pass spot stagger-item"><span className="pass-hole" /><p>{p.name}</p><small className="mono">{p.years}</small></div>
          ))}
        </div>
      </section>

      {/* ---------------- Leadership ---------------- */}
      <section id="leadership" className="sec dark-sec morph">
        <Heading eyebrow="Leadership &amp; community"><Mask>Leading</Mask><Mask className="yellow">from the front.</Mask></Heading>
        <div className="lead-cards stagger-group">
          {leadership.map((l) => (
            <article key={l.organization} className="lead-card spot stagger-item">
              <p className="mono muted">{l.location}</p>
              <h3 className="display">{l.organization}</h3>
              {l.roles.map((r) => (
                <div key={r.title}>
                  <p className="lead-role">{r.title}</p>
                  <p className="mono muted">{r.period}</p>
                  <ul>{r.description.map((d, k) => <li key={k}>{d}</li>)}</ul>
                </div>
              ))}
            </article>
          ))}
        </div>
        <h3 className="mono sub-head fade-up">Awards &amp; honors</h3>
        <div className="awards stagger-group">
          {AWARDS.map((a) => (
            <div key={a.title} className="award spot stagger-item"><Award size={22} /><div><b>{a.title}</b><small>{a.sub}</small></div></div>
          ))}
        </div>
      </section>

      {/* ---------------- Gallery ---------------- */}
      <section id="gallery" className="gallery">
        <div className="g-pin">
          <div className="g-top">
            <p className="eyebrow">Gallery</p>
            <h2 className="display sec-title"><Mask>On the</Mask><Mask className="blue">record.</Mask></h2>
            <p className="mono muted g-hint">Scroll →</p>
          </div>
          <div className="g-track">
            {portfolioItems.map((p, i) => (
              <figure key={p.title} className={`g-item ${i % 2 ? 'low' : 'high'}`} style={{ aspectRatio: `${p.w} / ${p.h}` }} data-cursor="Look">
                <div className="g-frame"><img className="g-img" src={p.image} alt={p.title} draggable={false} loading="eager" onLoad={() => refreshScroll(300)} /></div>
                <figcaption className="mono"><b>{String(i + 1).padStart(2, '0')}</b> {p.title} <em>{p.category}</em></figcaption>
              </figure>
            ))}
          </div>
          <div className="g-bar"><div className="g-progress" /></div>
        </div>
      </section>

      {/* ---------------- Resume ---------------- */}
      <section id="resume" className="sec resume">
        <div className="resume-card spot fade-up">
          <div className="resume-copy">
            <p className="eyebrow">Resume</p>
            <h2 className="display resume-title">One page.<br />Everything<br />that matters.</h2>
            <Btn href={asset('Shartle-Bryce-Resume.pdf')} download="Bryce_Shartle_Resume.pdf" label="PDF"><Download size={18} /> Download resume</Btn>
          </div>
          <div className="paper-stage" data-cursor="PDF">
            <div className="paper">
              <b>BRYCE SHARTLE</b>
              <small>NY/NJ B2C Sales Account Manager (WDA)</small>
              <i className="pl w90" /><i className="pl w70" /><i className="pl w80" />
              <em>Experience</em>
              <i className="pl w95" /><i className="pl w60" /><i className="pl w85" /><i className="pl w75" />
              <em>Education</em>
              <i className="pl w80" /><i className="pl w55" />
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Contact ---------------- */}
      <section id="contact" className="sec contact dark-sec morph">
        <p className="eyebrow fade-up">Get in touch</p>
        <h2 className="display contact-title"><Mask>Let’s</Mask><Mask className="yellow">talk.</Mask></h2>
        <p className="contact-lede fade-up">Whether you're looking to connect professionally, explore a potential collaboration, or simply have a conversation — I'd be glad to hear from you.</p>
        <a className="mail-link" href="mailto:bryceshartle@gmail.com"><Mail size={28} /> bryceshartle@gmail.com</a>
        <div className="contact-row">
          <Btn href="https://www.linkedin.com/in/bryceshartle/" external ghost plain><Linkedin size={18} /> LinkedIn</Btn>
          <Btn onClick={() => go('home')} ghost plain>Back to top</Btn>
        </div>
        <footer className="foot mono">© {new Date().getFullYear()} Bryce Shartle · New York, NY · NY/NJ Territory</footer>
      </section>
    </div>
  );
}

export default App;
