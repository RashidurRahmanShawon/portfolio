import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

/**
 * @typedef {'system' | 'input' | 'error' | 'typed' | 'gap' | 'output'} TerminalLineType
 */
/**
 * @typedef {{ type: TerminalLineType, text: string, delay?: number }} TerminalLine
 */
/**
 * @typedef {{ lines: string[], action?: () => void, clear?: boolean }} BotResponse
 */

/** @type {Record<string, BotResponse>} */
const BOT_RESPONSES = {
  help: {
    lines: [
      '  ┌─ Available commands ────────────────────┐',
      '  │  help           — show this menu         │',
      '  │  skills         — technical stack        │',
      '  │  projects       — featured work          │',
      '  │  experience     — career timeline        │',
      '  │  contact        — reach out              │',
      '  │  whoami         — about Rashidur         │',
      '  │  status         — current availability   │',
      '  │  /deploy zigle  — launch Zigle module    │',
      '  │  /sync roles    — sync Discord roles      │',
      '  │  /generate embed — build embed preview   │',
      '  │  /start assistant — start AI assistant   │',
      '  │  clear          — reset terminal         │',
      '  └─────────────────────────────────────────┘',
    ],
  },
  skills: {
    lines: [
      '  // loading skill registry...',
      '',
      '  LANGUAGES   ████████████ JavaScript  [95%]',
      '  LANGUAGES   ██████████░░ TypeScript  [85%]',
      '  RUNTIME     ███████████░ Node.js     [92%]',
      '  FRONTEND    ██████████░░ React       [88%]',
      '  BACKEND     ███████████░ Express.js  [90%]',
      '  DATABASE    ██████████░░ MongoDB     [85%]',
      '  BOT         ████████████ Discord.js  [95%]',
      '  STYLE       ███████████░ TailwindCSS [90%]',
      '',
      '  -> Click any skill node in the radar above ↑',
    ],
  },
  projects: {
    lines: [
      '  // fetching repository index...',
      '',
      '  ● Zigle               [React/Node] [Live]',
      '    Random chat platform with interest matching and dark/light mode.',
      '',
      '  ● Discord Management Bot [Discord.js] [Live]',
      '    Moderation, tickets, logs, reaction roles, and community automation.',
      '',
      '  ● PlayConnect Dashboard [EJS/Node] [Live]',
      '    Admin dashboard for Discord systems, embeds, and analytics.',
      '',
      '  ● AI Voice Assistant Bot [AI APIs] [Experimental]',
      '    AI-powered assistant for voice interaction and smart replies.',
    ],
    action: () => setTimeout(() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }), 800),
  },
  experience: {
    lines: [
      '  git log --oneline --graph',
      '',
      '  * 2023─Present  Freelance Full-Stack Developer',
      '  │  React, Node.js, Discord.js, MongoDB',
      '  │',
      '  * 2022─2023     Discord Bot Developer',
      '  │  Discord.js, Express, WebSockets',
      '  │',
      '  * 2021─2022     Junior Web Developer',
      '     JavaScript, React, Node.js, CSS',
    ],
  },
  contact: {
    lines: [
      '  // contact.json',
      '  {',
      '    "email":   "rashidur@example.com",',
      '    "discord": "shawon#0001",',
      '    "github":  "github.com/shawon",',
      '    "status":  "open to opportunities"',
      '  }',
    ],
  },
  whoami: {
    lines: [
      '  Rashidur Rahman Shawon',
      '  ─────────────────────',
      '  Role   : Full-Stack Engineer & Bot Developer',
      '  Based  : Bangladesh — Working Globally',
      '  Exp    : 3+ years, 20+ shipped products',
      '  Focus  : Scalable systems, clean code',
      '',
      '  Builds things that survive production.',
    ],
  },
  status: {
    lines: [
      '  ┌─ Availability Status ──────────────────┐',
      '  │                                         │',
      '  │  ● OPEN FOR FREELANCE     [active]      │',
      '  │  ● OPEN FOR CONTRACTS     [active]      │',
      '  │  ○ FULL-TIME POSITIONS    [selective]   │',
      '  │                                         │',
      '  │  Response time: ~24 hours               │',
      '  │  Timezone: UTC+6 (Bangladesh)           │',
      '  │                                         │',
      '  └─────────────────────────────────────────┘',
    ],
  },
  '/deploy zigle': {
    lines: [
      '  › Deploying Zigle to staging...',
      '  › Initializing chat workers',
      '  › Socket.IO endpoints configured',
      '  › Deployment complete — live at /zigle',
    ],
  },
  '/sync roles': {
    lines: [
      '  › Syncing Discord role matrix',
      '  › Permissions validated',
      '  › Active role sets updated',
      '  › Sync complete — 42 roles aligned',
    ],
  },
  '/generate embed': {
    lines: [
      '  › Generating embed preview',
      '  › Fields composed from server settings',
      '  › Image placeholders optimized',
      '  › Embed ready for deployment',
    ],
  },
  '/start assistant': {
    lines: [
      '  › Starting voice assistant module',
      '  › AI bridge initialized',
      '  › Connection to voice gateway live',
      '  › Assistant ready for interaction',
    ],
  },
  clear: { lines: [], clear: true },
};

/** @type {Record<'node'|'react'|'discord'|'mongodb', string[]>} */
const STACK_DETAILS = {
  node: [
    '  node.js — Runtime Deep Dive',
    '  ────────────────────────────',
    '  Version     : v20+ LTS',
    '  Pattern     : Event loop, async/await, streams',
    '  Use case    : REST APIs, bots, real-time apps',
    '  Experience  : 3+ years, production deployments',
  ],
  react: [
    '  react — Frontend Deep Dive',
    '  ────────────────────────────',
    '  Version     : v18+',
    '  Pattern     : Hooks, context, code-splitting',
    '  Use case    : dashboards, modular interfaces',
    '  Experience  : 3+ years, shipped UIs',
  ],
  discord: [
    '  discord.js — Bot Deep Dive',
    '  ────────────────────────────',
    '  Version     : v14',
    '  Features    : slash commands, events, workflows',
    '  Scale       : community systems, ticket flows',
    '  Experience  : core specialisation',
  ],
  mongodb: [
    '  mongodb — Database Deep Dive',
    '  ────────────────────────────',
    '  Version     : Atlas M0 → M10',
    '  Pattern     : aggregations, indexing, TTL',
    '  Use case    : bot data, user profiles, logs',
    '  Experience  : 3+ years, multi-tenant schemas',
  ],
};

const INITIAL_LINES = [
  { type: 'system', text: '  RRS Terminal v2.0.0 — Interactive Portfolio Shell' },
  { type: 'system', text: '  npm run dev' },
  { type: 'system', text: '  initializing project...' },
  { type: 'system', text: '  connecting database...' },
  { type: 'system', text: '  deploying systems...' },
  { type: 'system', text: '  build successful.' },
  { type: 'system', text: '  ─────────────────────────────────────────────────' },
  { type: 'system', text: '  Type "help" to explore. Arrow keys navigate history.' },
  { type: 'gap', text: '' },
];

const QUICK_CMDS = ['help', 'whoami', 'skills', 'projects', 'status', '/deploy zigle', '/sync roles', '/generate embed', '/start assistant'];

/**
 * @param {{ text: string, delay?: number, type: TerminalLineType, onDone?: () => void }} props
 */
function TypingLine({ text, delay = 0, type, onDone }) {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    /** @type {number | undefined} */
    let timeout;
    const start = setTimeout(() => {
      let i = 0;
      const tick = () => {
        setDisplayed(text.substring(0, i + 1));
        i++;
        if (i < text.length) timeout = setTimeout(tick, 12);
        else if (onDone) setTimeout(onDone, 40);
      };
      tick();
    }, delay);
    return () => { clearTimeout(start); clearTimeout(timeout); };
  }, [text, delay]);

  const cls =
    type === 'input' ? 'text-amber' :
    type === 'error' ? 'text-red-400/80' :
    type === 'system' ? 'text-iron/40' :
    type === 'gap' ? '' :
    'text-iron/85';

  return <div className={`font-mono text-xs leading-relaxed mb-0.5 ${cls}`}>{displayed}</div>;
}

export default function Terminal() {
  const ref = useRef(/** @type {HTMLDivElement | null} */ (null));
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const inputRef = useRef(/** @type {HTMLInputElement | null} */ (null));
  const scrollRef = useRef(/** @type {HTMLDivElement | null} */ (null));

  const [lines, setLines] = useState(/** @type {TerminalLine[]} */ (INITIAL_LINES));
  const [input, setInput] = useState('');
  const [history, setHistory] = useState(/** @type {string[]} */ ([]));
  const [histIdx, setHistIdx] = useState(-1);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  /**
   * @param {string} raw
   */
  const runCommand = (raw) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    const newLines = [...lines, { type: 'input', text: `  > ${raw}` }, { type: 'gap', text: '' }];
    setHistory(h => [cmd, ...h]);
    setHistIdx(-1);
    setInput('');

    // stack <query>
    if (cmd.startsWith('stack ')) {
      const query = cmd.replace('stack ', '').trim();
      /** @type {keyof typeof STACK_DETAILS | undefined} */
      const key = Object.keys(STACK_DETAILS).find(k => query.includes(k));
      const output = key
        ? STACK_DETAILS[key]
        : [`  No data for "${query}". Try: stack node, stack react, stack discord, stack mongodb`];
      setIsTyping(true);
      const typed = output.map((t, i) => ({ type: 'typed', text: t, delay: i * 60 }));
      setLines([...newLines, ...typed, { type: 'gap', text: '' }]);
      setTimeout(() => setIsTyping(false), output.length * 60 + 200);
      return;
    }

    const command = BOT_RESPONSES[cmd];
    if (command) {
      if (command.clear) {
        setLines(INITIAL_LINES);
      } else {
        setIsTyping(true);
        const typed = command.lines.map((t, i) => ({ type: 'typed', text: t, delay: i * 55 }));
        setLines([...newLines, ...typed, { type: 'gap', text: '' }]);
        setTimeout(() => setIsTyping(false), command.lines.length * 55 + 200);
        if (command.action) command.action();
      }
    } else {
      setLines([
        ...newLines,
        { type: 'error', text: `  bash: "${cmd}": command not found — try "help"` },
        { type: 'gap', text: '' },
      ]);
    }
  };

  const handleSubmit = (
    /** @type {React.FormEvent<HTMLFormElement>} */ e
  ) => {
    e.preventDefault();
    if (isTyping) return;
    runCommand(input);
  };

  const handleKeyDown = (
    /** @type {React.KeyboardEvent<HTMLInputElement>} */ e
  ) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const newIdx = Math.min(histIdx + 1, history.length - 1);
      setHistIdx(newIdx);
      setInput(history[newIdx] || '');
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const newIdx = Math.max(histIdx - 1, -1);
      setHistIdx(newIdx);
      setInput(newIdx === -1 ? '' : history[newIdx]);
    }
  };

  return (
    <section id="terminal" ref={ref} className="py-32 bg-obsidian">
      <div className="max-w-6xl mx-auto px-6">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-16"
        >
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-amber">04</span>
          <div className="w-8 h-px bg-amber/40" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-iron">Command Center</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-stretch">
          {/* Left panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-2 flex h-full min-h-[620px] flex-col gap-6"
          >
            <div>
              <h2 className="font-grotesk font-bold text-4xl lg:text-5xl text-bone tracking-tight mb-4">
                Interactive
                <br />
                <span className="text-amber">command</span>
                <br />
                interface.
              </h2>
              <p className="text-iron text-sm leading-relaxed">
                A live shell that simulates how I architect bot command systems.
                Type freely or click a quick command below.
              </p>
            </div>

            {/* Quick command buttons */}
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[10px] uppercase tracking-widest text-iron/40 mb-1">Quick commands</span>
              {QUICK_CMDS.map(cmd => (
                <button
                  key={cmd}
                  onClick={() => { if (!isTyping) runCommand(cmd); }}
                  className="font-mono text-xs text-left text-iron/70 hover:text-amber border border-white/6 hover:border-amber/30 bg-white/2 hover:bg-amber/4 px-4 py-2.5 transition-all duration-200 flex items-center gap-3"
                >
                  <span className="text-amber/40">$</span>
                  {cmd}
                  <span className="ml-auto text-iron/20">↵</span>
                </button>
              ))}
            </div>

            {/* Typing indicator */}
            <AnimatePresence>
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <div className="flex gap-1">
                    {[0, 1, 2].map(i => (
                      <motion.div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-amber/60"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.2 }}
                      />
                    ))}
                  </div>
                  <span className="font-mono text-xs text-iron/40">processing...</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Terminal window */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-3 bg-[#0d0d0d] border border-white/10 relative crt-lines overflow-hidden h-full min-h-[620px] flex flex-col"
            onClick={() => inputRef.current?.focus()}
          >
            {/* Title bar */}
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/8 bg-[#111]">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
              <span className="font-mono text-[10px] text-iron/30 ml-3 tracking-wider">rrs@portfolio — bash</span>
              <div className="ml-auto w-1.5 h-1.5 rounded-full bg-amber/50 commit-dot" />
            </div>

            {/* Output */}
            <div
              ref={scrollRef}
              className="p-4 flex-1 overflow-y-auto"
            >
              {lines.map((line, i) => (
                line.type === 'typed' ? (
                  <TypingLine key={i} text={line.text} delay={line.delay ?? 0} type="output" />
                ) : (
                  <div
                    key={i}
                    className={`font-mono text-xs leading-relaxed mb-0.5 ${
                      line.type === 'input' ? 'text-amber' :
                      line.type === 'error' ? 'text-red-400/80' :
                      line.type === 'system' ? 'text-iron/40' :
                      line.type === 'gap' ? 'h-2' :
                      'text-iron/85'
                    }`}
                  >
                    {line.text}
                  </div>
                )
              ))}
            </div>

            {/* Input row */}
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 px-4 py-3 border-t border-white/8 bg-[#0a0a0a]"
            >
              <span className="font-mono text-xs text-amber">{'shawon@rrs:~$'}</span>
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isTyping}
                className="flex-1 bg-transparent font-mono text-xs text-bone outline-none placeholder-iron/20 caret-amber disabled:opacity-40"
                placeholder={isTyping ? '' : 'type a command...'}
                autoComplete="off"
                spellCheck={false}
              />
              {!isTyping && <span className="terminal-cursor font-mono text-xs text-amber/70">█</span>}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}