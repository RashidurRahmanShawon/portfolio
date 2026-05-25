import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const timeline = [
  {
    period: '2023',
    role: 'Started learning JavaScript and backend development.',
    org: 'Self-driven learning',
    description:
      'Foundations in JavaScript, Node.js, and basic systems architecture — building the first backend projects and automation scripts.',
    highlights: ['JavaScript', 'Node.js', 'APIs', 'Automation'],
    side: 'right',
  },
  {
    period: '2024',
    role: 'Developed full-stack applications, automation systems, and interactive web platforms.',
    org: 'Personal projects',
    description:
      'Built end-to-end applications with real-time data processing, complex backend automation, and responsive frontends. Developed bots and systems that handle community management and process automation at scale.',
    highlights: ['Full-Stack', 'Automation', 'MongoDB', 'React'],
    side: 'left',
  },
  {
    period: '2025',
    role: 'Started freelance development work and focused on scalable production-level applications.',
    org: 'Freelance services',
    description:
      'Delivered client work with a production mindset, focusing on cleaner architecture, deployable APIs, and maintainable frontend systems.',
    highlights: ['Freelance', 'APIs', 'Dashboards', 'Automation'],
    side: 'right',
  },
  {
    period: '2026',
    role: 'Scaling full-stack solutions with advanced automation and real-time systems.',
    org: 'Current focus',
    description:
      'Focusing on enterprise-grade backend systems, intelligent automation frameworks, real-time collaborative applications, and production-ready API architectures. Building solutions that scale with reliability and maintainability.',
    highlights: ['Full-Stack', 'Automation', 'Scalability', 'Architecture'],
    side: 'left',
  },
];

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="experience" ref={ref} className="py-32 bg-charcoal relative overflow-hidden">
      <div className="absolute inset-0 syntax-grid opacity-30" />

      <div className="max-w-6xl mx-auto px-6 relative">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-16"
        >
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-amber">07</span>
          <div className="w-8 h-px bg-amber/40" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-iron">Experience</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-grotesk font-bold text-4xl lg:text-5xl text-bone tracking-tight mb-20"
        >
          The path
          <br />
          <span className="text-amber">to where I am.</span>
        </motion.h2>

        {/* Git branch timeline */}
        <div className="relative">
          {/* Center line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ originY: 0 }}
            className="absolute left-1/2 top-0 bottom-0 w-px bg-amber/20 hidden md:block"
          />

          <div className="flex flex-col gap-16">
            {timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: item.side === 'right' ? 30 : -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.15 }}
                className={`relative grid grid-cols-1 md:grid-cols-2 gap-8 ${
                  item.side === 'left' ? 'md:direction-rtl' : ''
                }`}
              >
                {/* Left slot */}
                <div className={item.side === 'right' ? 'md:text-right md:pr-12' : 'md:order-2 md:pl-12'}>
                  {item.side === 'right' ? (
                    <div className="flex flex-col gap-2">
                      <span className="font-mono text-xs text-iron/50 uppercase tracking-wider">{item.period}</span>
                      <h3 className="font-grotesk font-bold text-xl text-bone">{item.role}</h3>
                      <span className="font-mono text-xs text-amber/70 uppercase tracking-wider">{item.org}</span>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      <p className="text-iron text-sm leading-relaxed">{item.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {item.highlights.map(h => (
                          <span key={h} className="font-mono text-[10px] uppercase tracking-wider text-iron/50 bg-white/4 border border-white/8 px-2 py-1">
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Center dot */}
                <div className="hidden md:flex absolute left-1/2 top-2 -translate-x-1/2 w-3 h-3 rounded-full bg-obsidian border-2 border-amber items-center justify-center">
                  <div className="w-1 h-1 rounded-full bg-amber" />
                </div>

                {/* Right slot */}
                <div className={item.side === 'right' ? 'md:pl-12' : 'md:order-1 md:text-right md:pr-12'}>
                  {item.side === 'right' ? (
                    <div className="flex flex-col gap-3">
                      <p className="text-iron text-sm leading-relaxed">{item.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {item.highlights.map(h => (
                          <span key={h} className="font-mono text-[10px] uppercase tracking-wider text-iron/50 bg-white/4 border border-white/8 px-2 py-1">
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <span className="font-mono text-xs text-iron/50 uppercase tracking-wider">{item.period}</span>
                      <h3 className="font-grotesk font-bold text-xl text-bone">{item.role}</h3>
                      <span className="font-mono text-xs text-amber/70 uppercase tracking-wider">{item.org}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}