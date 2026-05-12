import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Hammer, BarChart3, Music, Ticket } from 'lucide-react';

const SLASH_COMMANDS = [
  {
    name: '/moderation ban',
    args: '@user [reason]',
    category: 'Moderation',
    icon: Hammer,
    description: 'Bans a user from the server with audit log entry.',
    response: {
      title: 'User banned',
      color: '#ef4444',
      fields: [
        { name: 'Target', value: '@ExampleUser#1234' },
        { name: 'Reason', value: 'Repeated rule violations' },
        { name: 'Moderator', value: '@Shawon#0001' },
        { name: 'Duration', value: 'Permanent' },
      ],
      footer: 'Action logged • Sentinel Bot v2.4.1',
    },
  },
  {
    name: '/stats server',
    args: '',
    category: 'Utility',
    icon: BarChart3,
    description: 'Displays real-time server statistics and analytics.',
    response: {
      title: 'Server statistics',
      color: '#F59E0B',
      fields: [
        { name: 'Members', value: '12,489 online / 48,203 total' },
        { name: 'Channels', value: '142 text • 28 voice' },
        { name: 'Messages Today', value: '23,481 messages' },
        { name: 'Bot Uptime', value: '99.98% (30 days)' },
      ],
      footer: 'Updated every 60s • Sentinel Bot',
    },
  },
  {
    name: '/music play',
    args: '[query]',
    category: 'Audio',
    icon: Music,
    description: 'Plays audio from YouTube, Spotify, or SoundCloud.',
    response: {
      title: 'Now playing',
      color: '#22c55e',
      fields: [
        { name: 'Track', value: 'Lofi Hip Hop Radio' },
        { name: 'Duration', value: '3:42 / 3:42 (Live)' },
        { name: 'Queue', value: '4 tracks upcoming' },
        { name: 'Volume', value: '60%' },
      ],
      footer: 'EchoLink Bot • Voice channel active',
    },
  },
  {
    name: '/ticket create',
    args: '[category]',
    category: 'Support',
    icon: Ticket,
    description: 'Opens a private support ticket channel.',
    response: {
      title: 'Ticket created',
      color: '#8b5cf6',
      fields: [
        { name: 'Ticket ID', value: '#TKT-20489' },
        { name: 'Category', value: 'Technical Support' },
        { name: 'Channel', value: '#ticket-20489 (private)' },
        { name: 'Status', value: 'Open — Awaiting staff' },
      ],
      footer: 'Reply in your ticket channel',
    },
  },
];

function EmbedCard({ response, visible }) {
  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 8, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.97 }}
          transition={{ duration: 0.25 }}
          className="bg-[#2b2d31] rounded-md overflow-hidden border border-white/5"
          style={{ borderLeft: `4px solid ${response.color}` }}
        >
          <div className="p-4">
            <p className="font-grotesk font-semibold text-bone text-sm mb-3">{response.title}</p>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 mb-3">
              {response.fields.map((f, i) => (
                <div key={i}>
                  <p className="font-mono text-[10px] uppercase tracking-wide text-bone/70 mb-0.5">{f.name}</p>
                  <p className="font-inter text-xs text-[#dbdee1]">{f.value}</p>
                </div>
              ))}
            </div>
            <p className="font-mono text-[10px] text-[#949ba4]">{response.footer}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function BotShowcase() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [active, setActive] = useState(0);
  const [fired, setFired] = useState(null);
  const [inputVal, setInputVal] = useState('');

  const triggerCommand = (idx) => {
    setFired(null);
    setTimeout(() => {
      setActive(idx);
      setFired(idx);
    }, 80);
  };

  return (
    <section id="botshowcase" ref={ref} className="py-32 bg-obsidian relative">
      <div className="absolute inset-0 syntax-grid opacity-30" />

      <div className="max-w-6xl mx-auto px-6 relative">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-16"
        >
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-amber">05</span>
          <div className="w-8 h-px bg-amber/40" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-iron">Bot Showcase</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex h-full min-h-[700px] flex-col justify-between gap-6"
          >
            <h2 className="font-grotesk font-bold text-4xl lg:text-5xl text-bone tracking-tight">
              Discord bots
              <br />
              <span className="text-amber">at production</span>
              <br />
              scale.
            </h2>
            <p className="text-iron text-sm leading-relaxed">
              From moderation systems to advanced automation dashboards, I build Discord bots designed for performance, scalability, and community management.
            </p>

            <div className="grid grid-cols-2 gap-2 pt-4">
              {['Ticket Systems', 'Logging & Moderation', 'Reaction Roles', 'AI Integration', 'Verification Systems', 'Dashboard Controls'].map((feature) => (
                <div key={feature} className="border border-white/10 bg-[#101116] px-4 py-3 text-[11px] uppercase tracking-wider text-iron/70">
                  {feature}
                </div>
              ))}
            </div>

            {/* Command list */}
            <div className="flex flex-col gap-2">
              {SLASH_COMMANDS.map((cmd, i) => (
                <motion.button
                  key={cmd.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.25 + i * 0.08 }}
                  onClick={() => triggerCommand(i)}
                  className={`flex items-center gap-3 px-4 py-3 border text-left transition-all duration-200 ${
                    active === i
                      ? 'border-amber/40 bg-amber/5 text-bone'
                      : 'border-white/8 bg-white/2 text-iron hover:border-amber/20 hover:text-bone'
                  }`}
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-amber/10 text-amber">
                    {React.createElement(cmd.icon, { size: 16, className: 'text-amber' })}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-xs text-amber">{cmd.name}</span>
                      {cmd.args && <span className="font-mono text-[10px] text-iron/40">{cmd.args}</span>}
                    </div>
                    <p className="font-inter text-[11px] text-iron/60 mt-0.5 truncate">{cmd.description}</p>
                  </div>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-iron/30 border border-white/8 px-1.5 py-0.5 shrink-0">
                    {cmd.category}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Right — Discord mock */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="h-full min-h-[680px]"
          >
            {/* Discord window mock */}
            <div className="bg-[#313338] rounded-lg overflow-hidden border border-white/5 shadow-2xl h-full flex flex-col">
              {/* Discord top bar */}
              <div className="flex items-center gap-3 px-4 py-2.5 bg-[#1e1f22] border-b border-black/20">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                </div>
                <div className="flex items-center gap-2 ml-2">
                  <span className="text-[#949ba4] text-xs font-medium">#</span>
                  <span className="font-inter text-xs font-semibold text-[#f2f3f5]">bot-commands</span>
                </div>
                <div className="ml-auto flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#23a55a]" />
                  <span className="font-mono text-[10px] text-[#949ba4]">Sentinel Bot online</span>
                </div>
              </div>

              {/* Message area */}
              <div className="p-4 flex-1 flex flex-col gap-4 min-h-[320px]">
                {/* User message */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber flex items-center justify-center shrink-0 mt-0.5">
                    <span className="font-grotesk font-bold text-xs text-obsidian">You</span>
                  </div>
                  <div>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="font-inter font-semibold text-sm text-[#f2f3f5]">you</span>
                      <span className="font-mono text-[10px] text-[#949ba4]">Today at 12:00</span>
                    </div>
                    <motion.div
                      key={active}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="font-mono text-sm text-[#dbdee1] bg-[#2b2d31] rounded px-3 py-2 inline-block"
                    >
                      <span className="text-[#00b0f4]">{SLASH_COMMANDS[active].name}</span>
                      {SLASH_COMMANDS[active].args && (
                        <span className="text-[#949ba4]"> {SLASH_COMMANDS[active].args.replace('[', '').replace(']', '')}</span>
                      )}
                    </motion.div>
                  </div>
                </div>

                {/* Bot response */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#5865f2] flex items-center justify-center shrink-0 mt-0.5">
                    <span className="font-grotesk font-bold text-xs text-white">S</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="font-inter font-semibold text-sm text-[#f2f3f5]">Sentinel Bot</span>
                      <span className="font-mono text-[9px] text-white bg-[#5865f2] px-1.5 py-0.5 rounded">APP</span>
                      <span className="font-mono text-[10px] text-[#949ba4]">Today at 12:00</span>
                    </div>
                    <EmbedCard response={SLASH_COMMANDS[active].response} visible={fired === active} key={`embed-${active}`} />
                  </div>
                </div>
              </div>

              {/* Discord input bar */}
              <div className="px-4 pb-4">
                <div className="bg-[#383a40] rounded-lg px-4 py-2.5 flex items-center gap-3">
                  <span className="text-[#949ba4] text-lg leading-none">+</span>
                  <input
                    value={inputVal}
                    onChange={e => setInputVal(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter' && inputVal.startsWith('/')) {
                        const match = SLASH_COMMANDS.findIndex(c =>
                          c.name.toLowerCase().includes(inputVal.replace('/', '').split(' ')[0])
                        );
                        if (match !== -1) triggerCommand(match);
                        setInputVal('');
                      }
                    }}
                    className="flex-1 bg-transparent font-inter text-sm text-[#dbdee1] outline-none placeholder-[#949ba4]/60"
                    placeholder="Message #bot-commands or type a / command..."
                  />
                </div>
              </div>
            </div>

            {/* Hint */}
            <p className="font-mono text-[10px] text-iron/30 text-center mt-3 uppercase tracking-widest">
              Type /ban, /stats, /music, or /ticket and press Enter ↵
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}