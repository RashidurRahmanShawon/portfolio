import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Server, Workflow, ShieldCheck, Activity, Terminal } from 'lucide-react';

const projects = [
  {
    title: 'Discord Infrastructure Suite',
    type: 'Internal Project',
    description: 'A multi-sharded, fault-tolerant infrastructure built to support millions of concurrent websocket events, featuring dynamic load balancing and centralized state management.',
    icon: Server,
    stats: {
      uptime: '99.99%',
      throughput: '25k events/s',
      shards: '64 Active',
    },
    tech: ['Node.js', 'Redis', 'WebSockets', 'Docker', 'Kubernetes'],
    architecture: 'Centralized microservices orchestrator with Redis Pub/Sub for state synchronization across dynamic shards.',
  },
  {
    title: 'Card Collection Ecosystem',
    type: 'Technical Demonstration',
    description: 'A complete real-time trading card backend handling complex item ownership, secure trading loops, verification mechanisms, and high-frequency inventory state queries.',
    icon: Workflow,
    stats: {
      latency: '< 45ms',
      database: 'PostgreSQL',
      cacheHit: '96.4%',
    },
    tech: ['TypeScript', 'Express', 'Redis Cache', 'Postgres', 'Prisma'],
    architecture: 'Transactional database isolation with caching write-through strategy to prevent duplicate trades and race conditions.',
  },
  {
    title: 'Escrow Transaction System',
    type: 'Concept Prototype',
    description: 'A highly secure escrow and payment automation system designed to hold funds, verify multi-party conditions, and release funds programmatically via secure APIs.',
    icon: ShieldCheck,
    stats: {
      security: '256-bit AES',
      validation: 'Dual-Key Auth',
      compliance: 'Fully Mocked',
    },
    tech: ['Go', 'gRPC', 'PostgreSQL', 'Vault', 'REST APIs'],
    architecture: 'Automated cryptographic ledgers matching dual-party signatures before releasing state blocks from quarantine.',
  },
  {
    title: 'Automation Pipeline Engine',
    type: 'Technical Demonstration',
    description: 'A customizable node-based runner that parses JSON graphs, schedules workflows, handles conditional retry policies, and manages distributed task execution queues.',
    icon: Activity,
    stats: {
      concurrency: '1,000 tasks/s',
      workers: 'Dynamic scaling',
      failover: 'Auto-recovery',
    },
    tech: ['Python', 'FastAPI', 'RabbitMQ', 'Celery', 'MongoDB'],
    architecture: 'Broker-backed worker queues that auto-scale and store incremental state logs in document stores.',
  },
  {
    title: 'Operations Dashboard',
    type: 'Concept Prototype',
    description: 'A low-latency dashboard engine visualizing cluster performance, traffic routing, microservice heartbeat charts, and pipeline execution logs in real time.',
    icon: Terminal,
    stats: {
      updateRate: '100ms',
      webSockets: 'Secure (wss://)',
      renderTime: '< 8ms',
    },
    tech: ['React.js', 'Vite', 'TailwindCSS', 'Recharts', 'SSE'],
    architecture: 'Server-Sent Events listener combined with virtualized list rendering to display 10,000 log events/min without UI lag.',
  },
];

export default function SystemsShowcase() {
  const [selectedIdx, setSelectedIdx] = useState(null);

  return (
    <section id="showcase" className="py-24 bg-charcoal border-y border-white/5 relative overflow-hidden">
      {/* Background glow lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber/15 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber/15 to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-amber">
              [ 01 // PRODUCTION ARCHITECTURE ]
            </span>
            <h2 className="font-grotesk font-bold text-3xl sm:text-4xl text-bone mt-2">
              Systems Showcase
            </h2>
          </div>
          <p className="text-iron text-sm max-w-md font-mono">
            Deployments designed for continuous operation, horizontal scaling, and deterministic execution. Explore live architectural telemetry.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {projects.map((p, idx) => {
            const Icon = p.icon;
            const isHovered = selectedIdx === idx;
            return (
              <motion.div
                key={p.title}
                onMouseEnter={() => setSelectedIdx(idx)}
                onMouseLeave={() => setSelectedIdx(null)}
                className={`relative group bg-obsidian border p-6 flex flex-col justify-between transition-all duration-300 ${
                  isHovered ? 'border-amber/40 shadow-[0_0_20px_rgba(245,158,11,0.08)]' : 'border-white/10'
                }`}
                layoutId={`card-${p.title}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-[10px] uppercase px-2 py-1 bg-white/5 border border-white/10 text-iron">
                      {p.type}
                    </span>
                    <Icon className={`w-5 h-5 transition-colors duration-300 ${isHovered ? 'text-amber' : 'text-iron'}`} />
                  </div>

                  <h3 className="font-grotesk font-bold text-lg text-bone mb-2">
                    {p.title}
                  </h3>
                  
                  <p className="text-iron text-xs leading-relaxed mb-6 h-16 overflow-hidden">
                    {p.description}
                  </p>

                  {/* System Stats Block */}
                  <div className="grid grid-cols-3 gap-2 border-t border-white/5 pt-4 mb-6">
                    {Object.entries(p.stats).map(([k, v]) => (
                      <div key={k} className="flex flex-col">
                        <span className="font-mono text-[9px] text-iron/50 uppercase tracking-wider">{k}</span>
                        <span className="font-mono text-[11px] text-amber font-semibold mt-0.5">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  {/* Architectural summary showing in constant height container */}
                  <div className="border-t border-white/5 pt-4 mb-4">
                    <p className="font-mono text-[9.5px] text-iron leading-relaxed">
                      <strong className="text-bone">Architecture:</strong> {p.architecture}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {p.tech.map((t) => (
                      <span key={t} className="font-mono text-[9px] bg-white/5 border border-white/5 px-2 py-0.5 text-bone/70">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
