import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const stats = [
  { value: '3+', label: 'Years Learning & Building' },
  { value: '20+', label: 'Full-Stack Projects' },
  { value: '30+', label: 'Automation Systems' },
  { value: '100%', label: 'Self-Taught' },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" ref={ref} className="py-32 bg-charcoal relative overflow-hidden">
      <div className="absolute inset-0 syntax-grid opacity-50" />

      <div className="max-w-6xl mx-auto px-6 relative">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-16"
        >
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-amber">01</span>
          <div className="w-8 h-px bg-amber/40" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-iron">About</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Text */}
          <div className="flex flex-col gap-6">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-grotesk font-bold text-4xl lg:text-5xl text-bone leading-tight tracking-tight"
            >
              Crafting systems
              <br />
              <span className="text-amber">worth shipping.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-iron text-base leading-relaxed"
            >
              I started programming from curiosity and evolved into building production-grade full-stack systems, scalable backend architectures, intelligent automation tools, and modern web applications. I focus on writing robust backend logic, crafting intuitive user experiences, and developing automation solutions that eliminate repetitive work.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-iron text-base leading-relaxed"
            >
              My expertise spans full-stack JavaScript development, backend automation systems, API architecture, and building scalable solutions. I'm passionate about process optimization and creating tools that improve workflow efficiency.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-3 pt-2"
            >
              <span className="font-mono text-xs text-iron/60 bg-white/5 border border-white/8 px-3 py-1.5">Bangladesh</span>
              <span className="font-mono text-xs text-iron/60 bg-white/5 border border-white/8 px-3 py-1.5">Remote</span>
              <span className="font-mono text-xs text-amber/80 bg-amber/5 border border-amber/15 px-3 py-1.5 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-amber rounded-full commit-dot" />
                Available
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-6"
            >
              {[
                'Full Stack Development',
                'Automation Engineering',
                'API Architecture',
                'UI/UX Design',
                'Backend Systems',
                'Process Optimization',
              ].map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[10px] uppercase tracking-widest text-iron/60 bg-white/5 border border-white/8 px-3 py-2"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 content-start">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className="bg-obsidian border border-white/8 p-6 flex flex-col gap-2 group hover:border-amber/25 transition-colors duration-300"
              >
                <span className="font-grotesk font-bold text-3xl text-amber">{stat.value}</span>
                <span className="font-mono text-xs uppercase tracking-wider text-iron">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}