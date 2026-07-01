import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Server, Zap, Heart, CheckSquare, GitMerge } from 'lucide-react';

const principles = [
  {
    id: 'scalability',
    title: 'Scalability',
    icon: Server,
    tagline: 'Horizontal distribution under high loads.',
    description: 'Avoid single points of failure. Systems should scale horizontally by distributing state, events, and API load dynamically across an elastic layer of compute units.',
  },
  {
    id: 'automation',
    title: 'Automation',
    icon: Zap,
    tagline: 'Zero human intervention in operational loops.',
    description: 'Every manual operation is a bug waiting to happen. Build self-healing scripts, automated deployment pipelines, CI/CD runners, and active cron reconciliation systems.',
  },
  {
    id: 'reliability',
    title: 'Reliability',
    icon: Heart,
    tagline: 'Fault tolerance via active failovers.',
    description: 'Ensure consistent uptime by building in standby nodes, health checks, circuit breakers, and automatic database replication models.',
  },
  {
    id: 'maintainability',
    title: 'Maintainability',
    icon: CheckSquare,
    tagline: 'Modular, decoupled code over spaghetti.',
    description: 'Design software like modular Lego blocks. Code should be clean, typed, documented, and fully testable so modifications can occur without regression cascades.',
  },
  {
    id: 'systems',
    title: 'Systems Thinking',
    icon: GitMerge,
    tagline: 'Visualizing the entire architecture chain.',
    description: 'Do not just write isolated functions. Map out interactions, state engines, queue backpressures, and transaction side-effects across the whole deployment topology.',
  },
];

export default function EngineeringPrinciples() {
  const [activeTab, setActiveTab] = useState('scalability');

  // Interactive state simulator engines
  const [requestCount, setRequestCount] = useState(0);
  const [activeServer, setActiveServer] = useState(0);
  const [reliabilityState, setReliabilityState] = useState('NORMAL'); // NORMAL, FAILED, ROUTED
  const [automationStep, setAutomationStep] = useState(0);

  // Scalability Simulator Timer
  useEffect(() => {
    if (activeTab !== 'scalability') return;
    const interval = setInterval(() => {
      setRequestCount(prev => prev + 1);
      setActiveServer(prev => (prev + 1) % 3);
    }, 1200);
    return () => clearInterval(interval);
  }, [activeTab]);

  // Automation Simulator Timer
  useEffect(() => {
    if (activeTab !== 'automation') return;
    const interval = setInterval(() => {
      setAutomationStep(prev => (prev + 1) % 4);
    }, 1500);
    return () => clearInterval(interval);
  }, [activeTab]);

  // Reliability Simulator Trigger
  const triggerFailover = () => {
    setReliabilityState('FAILED');
    setTimeout(() => {
      setReliabilityState('ROUTED');
    }, 1500);
  };

  const resetReliability = () => {
    setReliabilityState('NORMAL');
  };

  return (
    <section id="principles" className="py-24 bg-charcoal relative overflow-hidden border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-amber">
              [ 03 // CORE ARCHITECTURE CODE ]
            </span>
            <h2 className="font-grotesk font-bold text-3xl sm:text-4xl text-bone mt-2">
              Engineering Principles
            </h2>
          </div>
          <p className="text-iron text-sm max-w-md font-mono">
            Interactive playground demonstrating system engineering strategies for reliability, automation, and deterministic scaling.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Tab Selection */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            {principles.map((p) => {
              const Icon = p.icon;
              const isActive = activeTab === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setActiveTab(p.id)}
                  className={`text-left p-5 border transition-all duration-300 ${
                    isActive
                      ? 'bg-obsidian border-amber/40 shadow-[0_0_15px_rgba(245,158,11,0.06)]'
                      : 'bg-obsidian/45 border-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4.5 h-4.5 ${isActive ? 'text-amber' : 'text-iron'}`} />
                    <span className="font-grotesk font-bold text-sm text-bone">{p.title}</span>
                  </div>
                  <p className="font-mono text-[10px] text-iron mt-1 uppercase tracking-wider">{p.tagline}</p>
                </button>
              );
            })}
          </div>

          {/* Interactive Demonstration Panel */}
          <div className="lg:col-span-8 bg-obsidian border border-white/10 p-8 rounded-lg min-h-[400px] flex flex-col justify-between relative syntax-grid">
            <AnimatePresence mode="wait">
              {principles.map(
                (p) =>
                  activeTab === p.id && (
                    <motion.div
                      key={p.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.25 }}
                      className="flex flex-col md:grid md:grid-cols-2 gap-8 items-center h-full w-full"
                    >
                      {/* Left: Explanation */}
                      <div className="flex flex-col gap-4">
                        <span className="font-mono text-[9px] text-amber uppercase tracking-widest">// SYSTEM PRINCIPLE</span>
                        <h3 className="font-grotesk font-bold text-2xl text-bone">{p.title}</h3>
                        <p className="text-iron text-xs leading-relaxed font-mono">{p.description}</p>
                      </div>

                      {/* Right: Interactive Simulator View */}
                      <div className="w-full flex items-center justify-center p-6 border border-white/5 bg-charcoal/40 rounded-lg min-h-[220px]">
                        
                        {/* SCALABILITY SIMULATOR */}
                        {p.id === 'scalability' && (
                          <div className="flex flex-col items-center gap-6 w-full font-mono text-[10px]">
                            <div className="flex items-center gap-2 border border-amber/20 px-3 py-1.5 bg-obsidian">
                              <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber animate-pulse" />
                              <span className="text-bone">LOAD BALANCER: {requestCount} Requests</span>
                            </div>
                            
                            <div className="flex justify-around w-full gap-2">
                              {[0, 1, 2].map((i) => (
                                <div
                                  key={i}
                                  className={`flex flex-col items-center p-3 border transition-colors duration-300 w-16 text-center ${
                                    activeServer === i
                                      ? 'border-amber bg-amber/5 text-amber'
                                      : 'border-white/10 text-iron/60'
                                  }`}
                                >
                                  <Server className="w-5 h-5 mb-1" />
                                  <span>Node {i + 1}</span>
                                  <span className="text-[8px] mt-1 opacity-70">
                                    {activeServer === i ? 'Processing' : 'Idle'}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* AUTOMATION SIMULATOR */}
                        {p.id === 'automation' && (
                          <div className="flex flex-col items-center gap-4 w-full font-mono text-[10px]">
                            <div className="flex flex-col gap-3 w-full max-w-[200px]">
                              {[
                                { step: 0, label: 'Trigger Event Received' },
                                { step: 1, label: 'Conditional Filter Verification' },
                                { step: 2, label: 'Task Distribution (Worker)' },
                                { step: 3, label: 'Log Sync & Execution Done' },
                              ].map((item) => (
                                <div
                                  key={item.step}
                                  className={`p-2 border transition-all duration-300 text-left ${
                                    automationStep === item.step
                                      ? 'border-amber bg-amber/5 text-amber pl-4'
                                      : 'border-white/10 text-iron/50'
                                  }`}
                                >
                                  <span className="mr-2">[{item.step + 1}]</span>
                                  {item.label}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* RELIABILITY SIMULATOR */}
                        {p.id === 'reliability' && (
                          <div className="flex flex-col items-center gap-6 w-full font-mono text-[10px]">
                            <div className="flex items-center gap-8 justify-center">
                              {/* Master Server */}
                              <div className="flex flex-col items-center">
                                <div
                                  className={`p-3 border rounded ${
                                    reliabilityState === 'NORMAL'
                                      ? 'border-green-500/40 text-green-500 bg-green-500/5'
                                      : 'border-red-500/40 text-red-500 bg-red-500/5'
                                  }`}
                                >
                                  <Server className="w-6 h-6 mb-1" />
                                  <span>MASTER</span>
                                </div>
                                <span className="text-[8px] mt-1 text-iron">
                                  {reliabilityState === 'NORMAL' ? 'ONLINE' : 'CRASHED'}
                                </span>
                              </div>

                              {/* Watchdog Controller */}
                              <div className="flex flex-col items-center">
                                <div className="p-2 border border-amber/20 bg-obsidian text-amber text-center">
                                  <span>Watchdog</span>
                                  <div className="text-[7px] mt-1 uppercase">
                                    {reliabilityState === 'NORMAL' ? 'Monitoring' : reliabilityState === 'FAILED' ? 'Failing...' : 'Route Switched'}
                                  </div>
                                </div>
                              </div>

                              {/* Backup Server */}
                              <div className="flex flex-col items-center">
                                <div
                                  className={`p-3 border rounded ${
                                    reliabilityState === 'ROUTED'
                                      ? 'border-amber bg-amber/5 text-amber'
                                      : 'border-white/10 text-iron/50'
                                  }`}
                                >
                                  <Server className="w-6 h-6 mb-1" />
                                  <span>STANDBY</span>
                                </div>
                                <span className="text-[8px] mt-1 text-iron">
                                  {reliabilityState === 'ROUTED' ? 'ACTIVE' : 'READY'}
                                </span>
                              </div>
                            </div>

                            <div className="flex gap-2">
                              <button
                                onClick={triggerFailover}
                                disabled={reliabilityState !== 'NORMAL'}
                                className="px-3 py-1.5 bg-red-900/35 border border-red-500/40 hover:bg-red-900/60 transition-colors disabled:opacity-40 text-red-300 text-[9px] uppercase tracking-wider"
                              >
                                Trigger Crash
                              </button>
                              <button
                                onClick={resetReliability}
                                className="px-3 py-1.5 border border-white/10 hover:border-amber/50 transition-colors text-bone text-[9px] uppercase tracking-wider"
                              >
                                Reset Node
                              </button>
                            </div>
                          </div>
                        )}

                        {/* MAINTAINABILITY SIMULATOR */}
                        {p.id === 'maintainability' && (
                          <div className="flex flex-col items-center gap-4 w-full font-mono text-[10px]">
                            <div className="grid grid-cols-2 gap-4 w-full text-center">
                              {/* Modular View */}
                              <div className="border border-green-500/25 bg-green-950/10 p-3 flex flex-col gap-2">
                                <span className="text-green-400 font-bold">MODULAR SYSTEM</span>
                                <div className="grid grid-cols-3 gap-1">
                                  <div className="bg-white/5 border border-white/10 p-1">Auth</div>
                                  <div className="bg-white/5 border border-white/10 p-1">Cache</div>
                                  <div className="bg-white/5 border border-white/10 p-1">Jobs</div>
                                </div>
                                <p className="text-[8px] text-iron mt-1">Easy test isolates, independent upgrades.</p>
                              </div>

                              {/* Spaghetti View */}
                              <div className="border border-red-500/25 bg-red-950/10 p-3 flex flex-col gap-2 relative">
                                <span className="text-red-400 font-bold">TANGLED SYSTEM</span>
                                <svg viewBox="0 0 100 40" className="w-full h-8 opacity-40">
                                  <path d="M10,10 C40,40 20,0 90,30 M10,30 C30,0 80,40 90,10 M30,10 C10,35 90,5 90,30" stroke="#F87171" strokeWidth="1.5" fill="none" />
                                </svg>
                                <p className="text-[8px] text-iron mt-1">Single change crashes unrelated modules.</p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* SYSTEMS THINKING */}
                        {p.id === 'systems' && (
                          <div className="flex flex-col items-center gap-3 w-full font-mono text-[10px]">
                            <div className="flex flex-col gap-2 w-full text-left bg-obsidian p-4 border border-white/5">
                              <div className="flex justify-between border-b border-white/5 pb-1">
                                <span className="text-iron">[INPUT STATE]</span>
                                <span className="text-amber">Webhooks / API Payload</span>
                              </div>
                              <div className="flex justify-between border-b border-white/5 pb-1">
                                <span className="text-iron">[PROCESSING QUEUE]</span>
                                <span className="text-amber">Message Broker Dispatch</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-iron">[OUTPUT STATE]</span>
                                <span className="text-amber">Database Persistence</span>
                              </div>
                            </div>
                            <span className="text-[8px] text-iron text-center italic">"Optimizing components in isolation leads to system failure. Architect for the complete chain."</span>
                          </div>
                        )}

                      </div>
                    </motion.div>
                  )
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
