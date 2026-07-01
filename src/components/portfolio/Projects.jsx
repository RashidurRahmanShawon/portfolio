import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { useSkillFilter } from '../../context/SkillFilterContext';

/**
 * @typedef {{ id: string, title: string, category: string, description: string, stack: string[], github: string, live: string, stats: Record<string, string>, details: string }} Project
 */

const projects = [
  {
    id: '01',
    title: 'LeadSphere Engine',
    category: 'AI & Automation',
    description:
      'Advanced lead generation and validation system that extracts, cleanses, and enriches B2B lead databases from custom web directories and business portals.',
    stack: ['Node.js', 'Puppeteer', 'REST APIs', 'MongoDB'],
    github: '#',
    live: '#',
    stats: {
      speed: '50k+ Leads/hr',
      accuracy: '98% Verified',
      enrichment: 'Automated',
    },
    details: 'Features multi-threaded scraping, smart proxy rotation, and real-time email verification check bypasses.'
  },
  {
    id: '02',
    title: 'GeoLead Map Scraper',
    category: 'AI & Automation',
    description:
      'A high-performance extraction system targeting Google Maps business pages, capturing phone numbers, socials, reviews, and verified emails.',
    stack: ['Node.js', 'Puppeteer', 'APIs', 'MongoDB'],
    github: '#',
    live: '#',
    stats: {
      throughput: '10k+ Listings/hr',
      accuracy: '99.8% Uptime',
      socials: 'Auto-Matched',
    },
    details: 'Utilizes headless browsers to parse dynamic elements, circumventing strict API rate limits and data cloaking.'
  },
  {
    id: '03',
    title: 'WA-Sender Engine',
    category: 'AI & Automation',
    description:
      'Enterprise WhatsApp marketing and messaging automation bot supporting contact list segmentation, custom templates, and anti-ban delay features.',
    stack: ['Node.js', 'Puppeteer', 'Redis', 'Express'],
    github: '#',
    live: '#',
    stats: {
      volume: '100k+ Texts/day',
      safety: 'Zero Ban Rate',
      latency: '< 1.2s Delivery',
    },
    details: 'Employs browser state virtualization and randomized human-like delays to mimic natural interaction.'
  },
  {
    id: '04',
    title: 'EstateFlow Portal',
    category: 'Web Applications',
    description:
      'Premium real estate web platform boasting instant listings loading, dynamic maps, advanced multi-parameter filtering, and virtual tours.',
    stack: ['React', 'TailwindCSS', 'Node.js', 'MongoDB'],
    github: '#',
    live: '#',
    stats: {
      loadTime: '< 1.8s',
      filterSpeed: 'Instantaneous',
      seo: '98/100 Mobile',
    },
    details: 'Integrated interactive Mapbox modules and custom components with custom server-side caching.'
  },
  {
    id: '05',
    title: 'SafeDeal Escrow Bot',
    category: 'Discord Ecosystem',
    description:
      'Automated middleman/broker system facilitating safe peer-to-peer digital trades inside Discord by holding game accounts, assets, or keys.',
    stack: ['Discord.js', 'Node.js', 'Cryptography', 'MongoDB'],
    github: '#',
    live: '#',
    stats: {
      volume: '$100k+ Handled',
      security: 'SHA-256 Logs',
      resolution: 'Auto-Dispute',
    },
    details: 'Secures multi-party trading loops with custom digital asset verification checkers and cryptographic log trails.'
  },
  {
    id: '06',
    title: 'Zen Projector',
    category: 'Web Applications',
    description:
      'Execution and projection hub tailored for Zen Studio controllers, syncing inputs with active screen overlays and macro timers.',
    stack: ['React', 'Node.js', 'WebSockets', 'TailwindCSS'],
    github: '#',
    live: '#',
    stats: {
      delay: '< 5ms Latency',
      state: 'Hot-Reloadable',
      precision: 'Frame-Perfect',
    },
    details: 'Employs real-time WebSocket messaging and canvas-based graphics for visual simulation and script automation overlays.'
  },
  {
    id: '07',
    title: 'RL Tourney Hub',
    category: 'Gaming Integrations',
    description:
      'Fully automated Rocket League tournament and matchmaking framework supporting 1v1, 2v2, and 3v3 matches with real-time brackets.',
    stack: ['Discord.js', 'Node.js', 'REST APIs', 'PostgreSQL'],
    github: '#',
    live: '#',
    stats: {
      matches: 'Auto-Bracketer',
      capacity: '500+ Players',
      reporting: 'Auto-Screenshot',
    },
    details: 'Integrated with Rocket League APIs to verify scores and progress teams through bracket stages dynamically.'
  },
  {
    id: '08',
    title: 'GeoCards GO',
    category: 'Gaming Integrations',
    description:
      'Real-time location-based trading card game backend handling GPS tracking, player card trading, and active PVP battles.',
    stack: ['React', 'Node.js', 'Redis', 'MongoDB', 'Express'],
    github: '#',
    live: '#',
    stats: {
      dbSync: '< 45ms Latency',
      cache: '96.4% Hit Rate',
      protection: 'Anti-Spoofing',
    },
    details: 'Implements PostgreSQL transactional locks and Redis cache-aside strategies to guarantee atomic item transfers.'
  },
  {
    id: '09',
    title: 'ClipRewards System',
    category: 'Web Applications',
    description:
      'Affiliate marketing tracker that monitors TikTok/YouTube views for video creators and pays them out automatically when campaigns conclude.',
    stack: ['React', 'Node.js', 'Stripe SDK', 'TailwindCSS', 'APIs'],
    github: '#',
    live: '#',
    stats: {
      views: '10M+ Tracked',
      payouts: 'Fully Automated',
      gateways: 'Stripe, PayPal',
    },
    details: 'Features OAuth integration, scheduled video statistic fetchers, and automated Stripe/PayPal mass payments.'
  },
  {
    id: '10',
    title: 'RoleSync Automator',
    category: 'Discord Ecosystem',
    description:
      'Discord server management bot synchronizing user tags, names, and roles with external purchase tables or forum profiles in real time.',
    stack: ['Discord.js', 'Node.js', 'REST APIs', 'Redis'],
    github: '#',
    live: '#',
    stats: {
      syncTime: 'Instant (<1s)',
      users: '50k+ Managed',
      accuracy: '100% Logged',
    },
    details: 'Built with token bucket rate limiters to prevent Discord API blockages during rapid mass updates.'
  },
  {
    id: '11',
    title: 'CoreBot & Web Dashboard',
    category: 'Discord Ecosystem',
    description:
      'All-in-one Discord bot featuring ticketing, join/leave graphics, auto-moderation, and music, paired with a modern React administration dashboard.',
    stack: ['React', 'TailwindCSS', 'Discord.js', 'Express', 'Socket.IO'],
    github: '#',
    live: '#',
    stats: {
      modules: '20+ Active',
      latency: '< 50ms SSE',
      panels: 'Responsive',
    },
    details: 'Features secure session validation and real-time dashboard controls powered by WebSockets and Server-Sent Events.'
  },
  {
    id: '12',
    title: 'Shorts AI Generator',
    category: 'AI & Automation',
    description:
      'Faceless YouTube video generator that converts textual prompts into visual shorts, compiling footage, AI voices, and subtitles automatically.',
    stack: ['Node.js', 'Python', 'FFmpeg', 'AI APIs', 'YouTube API'],
    github: '#',
    live: '#',
    stats: {
      genTime: '1-Click (15s)',
      voice: 'ElevenLabs HD',
      uploading: 'Auto-Publish',
    },
    details: 'Automates video editing sequences with FFmpeg scripts, generates AI scripts, and uploads media via the YouTube API.'
  },
  {
    id: '13',
    title: 'Aegis Antinuke Guard',
    category: 'Discord Ecosystem',
    description:
      'Ultimate security system for Discord servers, preventing rogue admins or bots from kicking members or deleting channels by quarantining culprits.',
    stack: ['Discord.js', 'Node.js', 'Redis', 'MongoDB'],
    github: '#',
    live: '#',
    stats: {
      detect: '< 200ms Trigger',
      safety: 'Auto-Quarantine',
      lockdown: 'Full-Server',
    },
    details: 'Utilizes rapid cache lookups and self-healing algorithms to restore deleted channels and restrict compromised keys.'
  },
  {
    id: '14',
    title: 'OmniAI Automation',
    category: 'AI & Automation',
    description:
      'Omnichannel business helper powered by LLMs, automating ticket triage, email replies, and support flows for commercial operations.',
    stack: ['Node.js', 'Express', 'AI APIs', 'MongoDB'],
    github: '#',
    live: '#',
    stats: {
      resolve: '85% Deflection',
      status: '24/7 Active',
      integrations: 'Email, Chat',
    },
    details: 'Uses retrieval-augmented generation (RAG) and tool-calling models to solve client enquiries without agent intervention.'
  },
  {
    id: '15',
    title: 'Echo Voice AI Bot',
    category: 'Discord Ecosystem',
    description:
      'Conversational AI assistant residing directly in Discord voice channels, listening to voice requests and replying with voice feedback.',
    stack: ['Discord.js', 'Node.js', 'AI APIs', 'WebSockets'],
    github: '#',
    live: '#',
    stats: {
      voiceDelay: '< 400ms',
      quality: 'Ultra-HD Audio',
      stt: 'Whisper Powered',
    },
    details: 'Manages voice connection streams, transcribing user audio on the fly and returning synthesized voice responses.'
  },
  {
    id: '16',
    title: 'CoinSentinel Alerts',
    category: 'Crypto & FinTech',
    description:
      'Live crypto monitoring bot tracking exchange listings, gas price spikes, and whale wallets, broadcasting immediate alerts.',
    stack: ['Node.js', 'WebSockets', 'APIs', 'Redis'],
    github: '#',
    live: '#',
    stats: {
      alerts: '0.5s Real-time',
      networks: '5+ Blockchains',
      delivery: 'Telegram/Discord',
    },
    details: 'Monitors direct blockchain transaction streams and third-party exchange APIs over persistent socket connections.'
  },
  {
    id: '17',
    title: 'TrustGuard Escrow',
    category: 'Crypto & FinTech',
    description:
      'Cryptographic escrow system locking funds in digital vaults until designated delivery/action conditions are verified and completed.',
    stack: ['Go', 'Node.js', 'REST APIs', 'MongoDB'],
    github: '#',
    live: '#',
    stats: {
      vaults: '100% Cryptographic',
      auditing: 'Ledger Logs',
      release: 'Multi-Sig Option',
    },
    details: 'Uses automated release rules and API-based physical delivery integrations to hold and disburse funds securely.'
  }
];

/**
 * @param {{ project: Project, index: number, isVisible: boolean, isFiltered: boolean }} props
 */
function ProjectCard({ project, index, isVisible, isFiltered }) {
  const cardRef = useRef(/** @type {HTMLDivElement | null} */ (null));
  const { activeSkill } = useSkillFilter();
  const [isExpanded, setIsExpanded] = useState(false);

  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const springRotX = useSpring(rotX, { stiffness: 150, damping: 20 });
  const springRotY = useSpring(rotY, { stiffness: 150, damping: 20 });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (
    /** @type {React.MouseEvent<HTMLDivElement>} */ e
  ) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rotX.set(-y * 8);
    rotY.set(x * 8);

    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    rotX.set(0);
    rotY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      layout
      onClick={() => setIsExpanded(!isExpanded)}
      initial={{ opacity: 0, y: 45 }}
      animate={isVisible ? {
        opacity: isFiltered ? 0.25 : 1,
        y: 0,
        scale: isFiltered ? 0.98 : 1,
      } : { opacity: 0, y: 45 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.45, delay: isVisible ? Math.min(index * 0.05, 0.3) : 0 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: isFiltered ? 0 : springRotX,
        rotateY: isFiltered ? 0 : springRotY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      className="group bg-charcoal border border-white/8 hover:border-amber/40 transition-all duration-300 relative overflow-hidden flex flex-col justify-between rounded-md shadow-lg cursor-pointer select-none"
    >
      <div className="h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-amber/40 via-amber to-amber/40 transition-all duration-500" />
      
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 z-0"
        style={{
          background: `radial-gradient(220px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(245, 158, 11, 0.06), transparent 80%)`
        }}
        ref={(el) => {
          if (el) {
            mouseX.onChange(v => el.style.setProperty('--mouse-x', `${v}px`));
            mouseY.onChange(v => el.style.setProperty('--mouse-y', `${v}px`));
          }
        }}
      />

      <div className="p-6 flex flex-col gap-4 relative flex-grow z-10">
        <div className="flex items-start justify-between">
          <div>
            <span className="font-mono text-[9px] uppercase tracking-widest text-iron/50">{project.category}</span>
            <div className="flex items-center gap-2 mt-1">
              <span className="font-mono text-xs text-amber/60 font-semibold">{project.id}</span>
              <h3 className="font-grotesk font-bold text-lg text-bone group-hover:text-amber transition-colors duration-300">{project.title}</h3>
            </div>
          </div>
          <div className="relative flex h-2 w-2 mt-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber/60 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber"></span>
          </div>
        </div>

        <p className="text-iron text-xs leading-relaxed">{project.description}</p>
        
        {/* Reveal details on click */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden flex flex-col gap-4"
            >
              {/* Specs Grid */}
              <div className="grid grid-cols-3 gap-2 border-t border-white/5 pt-4 my-1">
                {Object.entries(project.stats).map(([k, v]) => (
                  <motion.div 
                    key={k} 
                    whileHover={{ y: -3, scale: 1.03 }}
                    className="flex flex-col bg-obsidian/30 border border-white/4 p-2 rounded-sm transition-colors group-hover:border-white/8 hover:bg-amber/[0.02]"
                  >
                    <span className="font-mono text-[8px] text-iron/50 uppercase tracking-wider">{k}</span>
                    <span className="font-mono text-[10px] text-amber font-semibold mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis">{v}</span>
                  </motion.div>
                ))}
              </div>

              {/* Technical Details block */}
              <div className="text-iron/70 font-mono text-[10px] border-t border-white/5 pt-3 leading-snug">
                <span className="text-amber/70 font-semibold font-mono mr-1">&gt;_</span>
                <span className="text-iron/60">{project.details}</span>
              </div>

              {/* Stack tags */}
              <div className="flex flex-wrap gap-1.5 border-t border-white/5 pt-3">
                {project.stack.map((tag) => {
                  const isMatch = activeSkill && tag.toLowerCase() === activeSkill.toLowerCase();
                  return (
                    <span
                      key={tag}
                      className={`font-mono text-[9px] uppercase tracking-wider border px-2 py-0.5 rounded-sm ${
                        isMatch
                          ? 'border-amber bg-amber/15 text-amber'
                          : 'border-white/8 bg-white/2 text-iron/70'
                      }`}
                    >
                      {tag}
                    </span>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Expand/Collapse prompt badge at the bottom */}
      <div className="p-4 pt-0 flex justify-between items-center relative z-10 border-t border-white/5 mt-2 bg-charcoal/40">
        <span className="font-mono text-[9.5px] uppercase tracking-widest text-amber/60 mt-3">
          {isExpanded ? '[-] Hide System Specs' : '[+] Inspect System Specs'}
        </span>
        <span className="font-mono text-[10px] text-iron/30 mt-3">
          {isExpanded ? 'ESC' : 'ENTER'}
        </span>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const { activeSkill } = useSkillFilter();
  const [showAll, setShowAll] = useState(false);

  // Filter projects by activeSkill if set
  const filteredProjects = activeSkill
    ? projects.filter(p => p.stack.some(s => s.toLowerCase() === activeSkill.toLowerCase()))
    : projects;

  // Paginated display
  const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, 6);

  return (
    <section id="projects" ref={ref} className="py-24 bg-obsidian border-t border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 syntax-grid opacity-30 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="flex items-center gap-3 mb-12">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-amber">03</span>
          <div className="w-8 h-px bg-amber/40" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-iron">Shipped Projects</span>
        </div>

        <div className="flex items-end justify-between gap-4 mb-12 flex-wrap">
          <div>
            <h2 className="font-grotesk font-bold text-3xl sm:text-4xl text-bone tracking-tight">
              Production Systems &
              <br />
              <span className="text-amber">Client Deliverables.</span>
            </h2>
            <p className="text-iron text-xs mt-2 max-w-lg font-mono">
              Audit the core metrics, architecture, and technology specs of the custom platforms built for live clients.
            </p>
          </div>

          <AnimatePresence>
            {activeSkill && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="flex items-center gap-2 border border-amber/30 bg-amber/5 px-3 py-1.5 rounded-sm"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-amber animate-pulse" />
                <span className="font-mono text-[10px] text-amber uppercase tracking-wider">
                  Technology Filter: {activeSkill}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {displayedProjects.map((project, i) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <ProjectCard
                  project={project}
                  index={i}
                  isVisible={true}
                  isFiltered={false}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <p className="font-mono text-xs text-iron/40 text-center mt-12 uppercase tracking-widest">
            No projects tagged with {activeSkill} found.
          </p>
        )}

        {filteredProjects.length > 6 && (
          <div className="flex justify-center mt-12 relative z-10">
            <button
              onClick={() => setShowAll(!showAll)}
              className="group font-mono text-xs uppercase tracking-widest text-bone bg-charcoal hover:bg-amber/10 border border-white/10 hover:border-amber/50 px-6 py-3 transition-all duration-300 flex items-center gap-2"
            >
              <span>{showAll ? 'Collapse List' : 'View More Systems'}</span>
              <span className="text-amber group-hover:translate-x-1 transition-transform duration-300">
                {showAll ? '↑' : '↓'}
              </span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}