import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { useSkillFilter } from '../../context/SkillFilterContext';



const nodes = [
  {
    id: 'backend',
    label: 'Backend Systems',
    x: 200,
    y: 90,
    skills: ['High Concurrency Handling', 'Multithreading', 'Distributed Systems', 'State Persistence'],
    techs: ['Go', 'Node.js', 'Python', 'gRPC'],
    example: 'Escrow Transaction System backend processing engine'
  },
  {
    id: 'automation',
    label: 'Automation',
    x: 350,
    y: 120,
    skills: ['Scheduled Workflows', 'Event-Driven Processing', 'Webhooks & Pollers', 'Error-Recovery Cycles'],
    techs: ['Celery', 'RabbitMQ', 'Zapier CLI', 'Docker'],
    example: 'Distributed Automation Pipeline Engine'
  },
  {
    id: 'apis',
    label: 'APIs',
    x: 380,
    y: 280,
    skills: ['RESTful Web Services', 'gRPC Contracts', 'GraphQL Resolvers', 'Rate Limiting & Security'],
    techs: ['FastAPI', 'Express', 'JWT', 'OAuth2'],
    example: 'Dynamic API Gateway with JWT & multi-tier throttling'
  },
  {
    id: 'databases',
    label: 'Databases',
    x: 310,
    y: 430,
    skills: ['Query Optimization', 'Transaction Isolation', 'Caching Strategies', 'Schema Migrations'],
    techs: ['PostgreSQL', 'Redis', 'MongoDB', 'Prisma'],
    example: 'Card Collection transactional lock mechanism'
  },
  {
    id: 'discord',
    label: 'Discord Infrastructure',
    x: 150,
    y: 450,
    skills: ['WebSocket Sharding', 'Event Bus Dispatchers', 'Command Parsing', 'Rate Limit Queuing'],
    techs: ['Discord.js', 'Eris', 'Redis Streams', 'Kubernetes'],
    example: 'Discord Infrastructure Suite clustering'
  },
  {
    id: 'dashboards',
    label: 'Dashboards',
    x: 40,
    y: 380,
    skills: ['Real-time SSE Streams', 'Data Visualization', 'Telemetry Feeds', 'Responsive UI State'],
    techs: ['React', 'Vite', 'Recharts', 'TailwindCSS'],
    example: 'Real-time Operations Dashboard cluster monitor'
  },
  {
    id: 'architecture',
    label: 'Architecture',
    x: 30,
    y: 220,
    skills: ['Microservices', 'Load Balancing', 'High Availability', 'Fault-Tolerant Patterns'],
    techs: ['Docker', 'Nginx', 'Kubernetes', 'AWS'],
    example: 'Distributed shard orchestration layout'
  },
  {
    id: 'integrations',
    label: 'Integrations',
    x: 80,
    y: 100,
    skills: ['Third-Party Webhooks', 'Stripe Payments', 'OAuth Providers', 'Message Brokers'],
    techs: ['Stripe SDK', 'RabbitMQ', 'SendGrid', 'Twilio'],
    example: 'Multi-gateway settlement engine flow'
  }
];

function InteractiveDetailsCard({ activeNode, activeSkill, toggle }) {
  const cardRef = useRef(null);
  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const springRotX = useSpring(rotX, { stiffness: 150, damping: 20 });
  const springRotY = useSpring(rotY, { stiffness: 150, damping: 20 });

  const [terminalLogs, setTerminalLogs] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    setTerminalLogs([]);
    setIsRunning(false);
  }, [activeNode]);

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rotX.set(-y * 10);
    rotY.set(x * 10);
  };

  const handleMouseLeave = () => {
    rotX.set(0);
    rotY.set(0);
  };

  const runDemo = () => {
    if (isRunning) return;
    setIsRunning(true);
    setTerminalLogs([`> Initializing ${activeNode.label.toLowerCase()} simulator...`]);
    
    setTimeout(() => {
      setTerminalLogs(prev => [...prev, `[info] Loading stack: ${activeNode.techs.join(', ')}`]);
    }, 500);

    setTimeout(() => {
      setTerminalLogs(prev => [...prev, `[success] Sync complete: "${activeNode.example}"`]);
      setIsRunning(false);
    }, 1200);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springRotX,
        rotateY: springRotY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      className="bg-charcoal border border-white/10 hover:border-amber/30 p-8 rounded-lg flex flex-col gap-6 relative overflow-hidden transition-colors duration-300 group"
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-amber/0 via-amber/1 to-amber/3 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300" />
      
      <div>
        <span className="font-mono text-[9px] text-amber/60 uppercase tracking-widest font-semibold">
          // ACTIVE CONNECTOR NODE
        </span>
        <h3 className="font-grotesk font-bold text-2xl text-bone mt-1 group-hover:text-amber transition-colors duration-300">
          {activeNode.label}
        </h3>
      </div>

      <div>
        <span className="font-mono text-[9px] uppercase text-iron/60 tracking-wider block mb-3">Core Skills</span>
        <div className="grid grid-cols-1 gap-2">
          {activeNode.skills.map((s) => (
            <motion.div
              key={s}
              whileHover={{ x: 6, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 350, damping: 15 }}
              className="flex items-center justify-between font-mono text-xs text-bone/90 bg-obsidian/40 border border-white/5 hover:border-amber/20 px-3 py-2 rounded-sm cursor-pointer select-none group/skill"
            >
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-amber rounded-full group-hover/skill:scale-125 transition-transform duration-200" />
                {s}
              </div>
              <span className="text-[8px] text-amber/20 group-hover/skill:text-amber/80 transition-colors">ACTIVE</span>
            </motion.div>
          ))}
        </div>
      </div>

      <div>
        <span className="font-mono text-[9px] uppercase text-iron/60 tracking-wider block mb-2">Tech Stack (Click to Filter Projects)</span>
        <div className="flex flex-wrap gap-1.5">
          {activeNode.techs.map((t) => {
            const isMatch = activeSkill && t.toLowerCase() === activeSkill.toLowerCase();
            return (
              <motion.button
                key={t}
                onClick={() => toggle(t)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`font-mono text-[10px] border px-2.5 py-1 transition-all duration-200 rounded-sm ${
                  isMatch
                    ? 'bg-amber/15 border-amber text-amber font-semibold shadow-[0_0_10px_rgba(245,158,11,0.25)]'
                    : 'bg-obsidian border-white/10 text-amber hover:border-amber/50 hover:bg-amber/5'
                }`}
              >
                {t}
              </motion.button>
            );
          })}
        </div>
        {activeSkill && activeNode.techs.some(t => t.toLowerCase() === activeSkill.toLowerCase()) && (
          <button
            onClick={() => toggle(activeSkill)}
            className="font-mono text-[9px] uppercase tracking-widest text-iron/40 hover:text-amber transition-colors self-start mt-2 block"
          >
            ✕ Clear filter ({activeSkill})
          </button>
        )}
      </div>

      <div className="border-t border-white/5 pt-4 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[9px] uppercase text-iron/60 tracking-wider">Project Sandbox Integration</span>
          <button
            onClick={runDemo}
            disabled={isRunning}
            className={`font-mono text-[9px] uppercase px-2 py-0.5 border rounded-sm transition-all duration-200 ${
              isRunning 
                ? 'border-amber/25 text-amber/40 cursor-not-allowed'
                : 'border-amber/40 text-amber hover:bg-amber/10'
            }`}
          >
            {isRunning ? 'Running...' : 'Run Telemetry'}
          </button>
        </div>

        {terminalLogs.length > 0 ? (
          <div className="bg-obsidian/90 border border-white/5 p-3 rounded-md font-mono text-[10px] text-amber/90 flex flex-col gap-1 min-h-[60px] justify-end">
            {terminalLogs.map((log, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                className={log.startsWith('>') ? 'text-amber' : log.includes('[success]') ? 'text-emerald-400' : 'text-iron'}
              >
                {log}
              </motion.div>
            ))}
          </div>
        ) : (
          <span className="font-mono text-xs text-iron italic leading-relaxed">
            {activeNode.example}
          </span>
        )}
      </div>
    </motion.div>
  );
}

export default function SkillsNetwork() {
  const [activeNode, setActiveNode] = useState(nodes[0]);
  const { activeSkill, toggle } = useSkillFilter();

  // SVG Size Constants
  const width = 450;
  const height = 550;
  const cx = width / 2;
  const cy = height / 2;

  return (
    <section id="skills" className="py-24 bg-obsidian relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-amber">
              [ 02 // INTERCONNECTED CAPABILITIES ]
            </span>
            <h2 className="font-grotesk font-bold text-3xl sm:text-4xl text-bone mt-2">
              Systems Topology
            </h2>
          </div>
          <p className="text-iron text-sm max-w-md font-mono">
            Hover over nodes in the system network diagram to audit core capability vectors, engineering stacks, and deployment contexts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* SVG Map */}
          <div className="lg:col-span-7 flex justify-center relative bg-charcoal/30 border border-white/5 p-8 rounded-lg overflow-hidden syntax-grid">
            <svg
              viewBox={`0 0 ${width} ${height}`}
              className="w-full max-w-[450px] aspect-square relative z-10 select-none"
            >
              {/* Connected Lines to Center */}
              {nodes.map((node) => {
                const isActive = activeNode?.id === node.id;
                return (
                  <g key={`line-${node.id}`}>
                    {/* Pulsing glow line */}
                    <line
                      x1={cx}
                      y1={cy}
                      x2={node.x}
                      y2={node.y}
                      stroke={isActive ? '#F59E0B' : '#F59E0B'}
                      strokeWidth={isActive ? 2.5 : 1}
                      strokeOpacity={isActive ? 0.7 : 0.15}
                      className={isActive ? 'animate-pulse' : ''}
                      style={{ transition: 'stroke-width 0.3s, stroke-opacity 0.3s' }}
                    />
                    {/* Moving data packets along path */}
                    {isActive && (
                      <motion.circle
                        r="3"
                        fill="#F59E0B"
                        initial={{ cx: cx, cy: cy }}
                        animate={{ cx: node.x, cy: node.y }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                      />
                    )}
                  </g>
                );
              })}

              {/* Center Node */}
              <g transform={`translate(${cx}, ${cy})`}>
                <circle r="36" fill="#0A0A0A" stroke="#F59E0B" strokeWidth="2.5" className="amber-glow" />
                <circle r="30" fill="#0A0A0A" stroke="#F59E0B" strokeWidth="1" strokeDasharray="3 3" />
                <foreignObject x="-30" y="-24" width="60" height="48">
                  <div className="flex items-center justify-center h-full text-center">
                    <span className="font-mono text-[9px] font-bold text-bone leading-tight">
                      SYSTEMS<br />CORE
                    </span>
                  </div>
                </foreignObject>
              </g>

              {/* Surrounding Nodes */}
              {nodes.map((node) => {
                const isActive = activeNode?.id === node.id;
                return (
                  <g
                    key={node.id}
                    transform={`translate(${node.x}, ${node.y})`}
                    className="cursor-pointer"
                    onMouseEnter={() => setActiveNode(node)}
                  >
                    {/* Ring aura on hover */}
                    <circle
                      r="16"
                      fill="transparent"
                      stroke={isActive ? '#F59E0B' : 'transparent'}
                      strokeWidth="1"
                      strokeDasharray="4 2"
                      className="animate-spin"
                      style={{ animationDuration: '8s' }}
                    />
                    {/* Main Circle */}
                    <circle
                      r="10"
                      fill="#0A0A0A"
                      stroke={isActive ? '#F59E0B' : '#8F8F8F'}
                      strokeWidth={isActive ? 2 : 1.2}
                      className="transition-all duration-300"
                    />
                    {isActive && <circle r="4" fill="#F59E0B" />}
                    
                    {/* Text Label */}
                    <text
                      y="26"
                      textAnchor="middle"
                      fill={isActive ? '#F59E0B' : '#F0EDE8'}
                      className="font-mono text-[9px] uppercase tracking-wider font-semibold transition-colors duration-300"
                    >
                      {node.label}
                    </text>
                  </g>
                );
              })}
            </svg>
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Details Panel */}
          <div className="lg:col-span-5 flex flex-col justify-center min-h-[350px]">
            <AnimatePresence mode="wait">
              {activeNode && (
                <InteractiveDetailsCard
                  activeNode={activeNode}
                  activeSkill={activeSkill}
                  toggle={toggle}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
