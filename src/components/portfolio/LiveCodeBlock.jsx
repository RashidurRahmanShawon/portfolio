import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Code2, ShieldCheck, Database, Zap } from 'lucide-react';

const SNIPPETS = [
  {
    label: 'REST API Route',
    lang: 'js',
    icon: Code2,
    code: `// Express.js — rate-limited auth route
router.post('/auth/login',
  rateLimit({ max: 10, windowMs: 60_000 }),
  validateBody(loginSchema),
  async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !await user.verify(password))
      return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    res.json({ token, user: user.toPublic() });
  }
);`,
    output: [
      '  POST /auth/login',
      '  ✓ Rate limit: 10 req/min',
      '  ✓ Body validated (Zod schema)',
      '  ✓ Password verified (bcrypt)',
      '  ✓ JWT signed (7d expiry)',
      '  → 200 { token, user } returned',
    ],
    outputColor: '#22c55e',
  },
  {
    label: 'Discord Bot Command',
    lang: 'js',
    icon: ShieldCheck,
    code: `// Discord.js v14 — slash command handler
export const command = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Ban a member')
    .addUserOption(o => o.setName('target').setRequired(true))
    .addStringOption(o => o.setName('reason')),

  async execute(interaction) {
    const target = interaction.options.getUser('target');
    const reason = interaction.options.getString('reason')
      ?? 'No reason provided';

    await interaction.guild.members.ban(target, { reason });
    await interaction.reply({
      embeds: [buildEmbed('banned', target, reason)],
      ephemeral: true,
    });
    auditLog.write({ type: 'BAN', target, reason, mod: interaction.user });
  },
};`,
    output: [
      '  /ban @target [reason]',
      '  ✓ Slash command registered',
      '  ✓ Permission guard passed',
      '  ✓ Member banned from guild',
      '  ✓ Embed reply sent (ephemeral)',
      '  ✓ Audit log entry written',
    ],
    outputColor: '#F59E0B',
  },
  {
    label: 'MongoDB Aggregation',
    lang: 'js',
    icon: Database,
    code: `// MongoDB — leaderboard aggregation pipeline
const leaderboard = await User.aggregate([
  { $match: { guildId, active: true } },
  {
    $project: {
      username: 1,
      xp: 1,
      level: { $floor: { $divide: ['$xp', 1000] } },
      rank: { $cond: [{ $gte: ['$xp', 50000] }, 'Elite', 'Member'] },
    }
  },
  { $sort: { xp: -1 } },
  { $limit: 10 },
  {
    $group: {
      _id: null,
      users: { $push: '$$ROOT' },
      totalXP: { $sum: '$xp' },
    }
  },
]);`,
    output: [
      '  Pipeline: 5 stages',
      '  ✓ Filter: active guild members',
      '  ✓ Computed: level + rank fields',
      '  ✓ Sorted by XP descending',
      '  ✓ Limited to top 10',
      '  → 10 docs, 0.8ms (indexed)',
    ],
    outputColor: '#22c55e',
  },
  {
    label: 'React Custom Hook',
    lang: 'tsx',
    icon: Zap,
    code: `// React — real-time data hook with WebSocket
function useRealtimeStats(endpoint: string) {
  const [data, setData] = useState<Stats | null>(null);
  const [status, setStatus] = useState<'connecting'|'live'|'error'>('connecting');
  const wsRef = useRef<WebSocket>();

  useEffect(() => {
    const ws = new WebSocket(endpoint);
    wsRef.current = ws;

    ws.onopen = () => setStatus('live');
    ws.onmessage = ({ data }) => setData(JSON.parse(data));
    ws.onerror = () => setStatus('error');

    return () => ws.close();
  }, [endpoint]);

  return { data, status };
}`,
    output: [
      '  Hook: useRealtimeStats()',
      '  ✓ WebSocket lifecycle managed',
      '  ✓ Auto-cleanup on unmount',
      '  ✓ Status: connecting → live',
      '  ✓ Type-safe (TypeScript)',
      '  → Renders in 1 tick on connect',
    ],
    outputColor: '#60a5fa',
  },
];

/**
 * @param {{ text: string, delay: number }} props
 */
function CodeLine({ text, delay }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay, text]);

  // Basic syntax highlight
  const highlighted = text
    .replace(/(\/\/.*)/g, '<span style="color:#6b7280">$1</span>')
    .replace(/\b(const|let|var|async|await|return|export|import|function|if|new)\b/g, '<span style="color:#c084fc">$1</span>')
    .replace(/\b(true|false|null|undefined)\b/g, '<span style="color:#fb923c">$1</span>')
    .replace(/('[^']*'|"[^"]*"|`[^`]*`)/g, '<span style="color:#86efac">$1</span>')
    .replace(/(\$\{[^}]*\})/g, '<span style="color:#fde68a">$1</span>');

  return (
    <motion.div
      initial={{ opacity: 0, x: -4 }}
      animate={visible ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.15 }}
      className="font-mono text-xs leading-relaxed text-[#cdd6f4]"
      dangerouslySetInnerHTML={{ __html: highlighted }}
    />
  );
}

export default function LiveCodeBlock() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [active, setActive] = useState(0);
  const [renderKey, setRenderKey] = useState(0);
  const [showOutput, setShowOutput] = useState(false);

  const snippet = SNIPPETS[active];
  const lines = snippet.code.split('\n');

  /**
   * @param {number} i
   */
  const switchSnippet = (i) => {
    setShowOutput(false);
    setActive(i);
    setRenderKey(k => k + 1);
    setTimeout(() => setShowOutput(true), lines.length * 30 + 400);
  };

  useEffect(() => {
    if (inView) {
      setRenderKey(k => k + 1);
      setTimeout(() => setShowOutput(true), lines.length * 30 + 400);
    }
  }, [inView]);

  return (
    <section id="livecode" ref={ref} className="py-32 bg-charcoal relative overflow-hidden">
      <div className="absolute inset-0 syntax-grid opacity-30" />

      <div className="max-w-6xl mx-auto px-6 relative">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-16"
        >
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-amber">06</span>
          <div className="w-8 h-px bg-amber/40" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-iron">Code Showcase</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            <h2 className="font-grotesk font-bold text-4xl lg:text-5xl text-bone tracking-tight">
              Real code,
              <br />
              <span className="text-amber">real patterns.</span>
            </h2>
            <p className="text-iron text-sm leading-relaxed">
              Production-grade code snippets from my actual projects.
              Switch between categories to see how I write at each layer of the stack.
            </p>

            {/* Tab switcher */}
            <div className="flex flex-col gap-2">
              {SNIPPETS.map((s, i) => (
                <button
                  key={s.label}
                  onClick={() => switchSnippet(i)}
                  className={`flex items-center gap-3 px-4 py-3 border text-left transition-all duration-200 ${
                    active === i
                      ? 'border-amber/40 bg-amber/5'
                      : 'border-white/8 bg-white/2 hover:border-amber/20'
                  }`}
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-amber/10 text-amber">
                    <s.icon size={16} className="text-amber" />
                  </span>
                  <span className={`font-mono text-xs ${active === i ? 'text-amber' : 'text-iron/70'}`}>{s.label}</span>
                  <span className="ml-auto font-mono text-[10px] text-iron/30 uppercase">.{s.lang}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Right — Code editor */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="flex flex-col gap-3"
          >
            {/* Editor */}
            <div className="bg-[#1e1e2e] border border-white/8 rounded-lg overflow-hidden">
              {/* Title bar */}
              <div className="flex items-center gap-2 px-4 py-2.5 bg-[#181825] border-b border-white/5">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                </div>
                <span className="font-mono text-[10px] text-[#6c7086] ml-3">{snippet.label.toLowerCase().replace(/ /g, '-')}.{snippet.lang}</span>
                <div className="ml-auto flex items-center gap-2">
                  <span className="font-mono text-[9px] text-amber/40 uppercase">{snippet.lang}</span>
                </div>
              </div>

              {/* Code */}
              <div className="p-4 overflow-x-auto">
                <div className="flex gap-4">
                  {/* Line numbers */}
                  <div className="flex flex-col items-end shrink-0 select-none">
                    {lines.map((_, i) => (
                      <span key={i} className="font-mono text-xs text-[#45475a] leading-relaxed">{i + 1}</span>
                    ))}
                  </div>
                  {/* Code lines */}
                  <div key={renderKey} className="flex flex-col flex-1 min-w-0">
                    {lines.map((line, i) => (
                      <CodeLine key={`${renderKey}-${i}`} text={line} delay={i * 28} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Output console */}
            <AnimatePresence>
              {showOutput && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.35 }}
                  className="bg-[#0d0d0d] border border-white/8 rounded overflow-hidden"
                >
                  <div className="flex items-center gap-2 px-4 py-2 border-b border-white/5">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber commit-dot" />
                    <span className="font-mono text-[10px] text-iron/40 uppercase tracking-wider">Output</span>
                  </div>
                  <div className="p-4 flex flex-col gap-1">
                    {snippet.output.map((line, i) => (
                      <motion.p
                        key={`${active}-out-${i}`}
                        initial={{ opacity: 0, x: -4 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.07, duration: 0.2 }}
                        className="font-mono text-xs leading-relaxed"
                        style={{ color: line.startsWith('  ✓') ? snippet.outputColor : line.startsWith('  →') ? snippet.outputColor : '#6b7280' }}
                      >
                        {line}
                      </motion.p>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}