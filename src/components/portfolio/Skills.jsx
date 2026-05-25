import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useSkillFilter } from '../../context/SkillFilterContext';

const skills = [
  { name: 'JavaScript', level: 95, tag: 'LANG', desc: 'ES2023+, async patterns, core expertise' },
  { name: 'TypeScript', level: 85, tag: 'LANG', desc: 'Typed systems, generics, strict mode' },
  { name: 'Node.js', level: 92, tag: 'RUNTIME', desc: 'v20+, event loop mastery, streaming' },
  { name: 'React', level: 88, tag: 'UI', desc: 'Hooks, context, performance tuning' },
  { name: 'Express.js', level: 90, tag: 'BACKEND', desc: 'Middleware, routing, auth layers' },
  { name: 'MongoDB', level: 85, tag: 'DB', desc: 'Aggregations, indexing, Atlas' },
  { name: 'Automation Systems', level: 90, tag: 'TOOLS', desc: 'Workflow automation, process optimization' },
  { name: 'Discord.js', level: 95, tag: 'TOOLS', desc: 'v14, community systems, integrations' },
  { name: 'TailwindCSS', level: 90, tag: 'STYLE', desc: 'Design systems, responsive, tokens' },
  { name: 'REST APIs', level: 92, tag: 'ARCH', desc: 'Rate limiting, versioning, JWT' },
];

const POSITIONS = [
  { x: 50, y: 18 },
  { x: 78, y: 28 },
  { x: 88, y: 50 },
  { x: 75, y: 72 },
  { x: 52, y: 82 },
  { x: 25, y: 72 },
  { x: 12, y: 50 },
  { x: 22, y: 28 },
  { x: 38, y: 42 },
  { x: 63, y: 42 },
];

/**
 * @param {{ inView: boolean }} props
 */
function TagCloud({ inView }) {
  const { activeSkill, toggle } = useSkillFilter();
  const [hovered, setHovered] = useState(/** @type {string | null} */ (null));

  return (
    <div className="relative w-full aspect-square">
      <div className="absolute inset-0">
        {[0.25, 0.5, 0.75, 1].map((r, i) => (
          <div
            key={i}
            className="absolute rounded-full border border-white/4"
            style={{
              width: `${r * 100}%`,
              height: `${r * 100}%`,
              top: `${(1 - r) * 50}%`,
              left: `${(1 - r) * 50}%`,
            }}
          />
        ))}

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-amber/40" />

        <motion.div
          className="absolute top-1/2 left-1/2 origin-left h-px bg-gradient-to-r from-amber/30 to-transparent"
          style={{ width: '50%' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />

        {skills.map((skill, i) => {
          const pos = POSITIONS[i];
          const isActive = activeSkill === skill.name;
          const isDimmed = activeSkill && !isActive;
          const isHov = hovered === skill.name;
          const size = 0.6 + (skill.level / 100) * 0.6;

          return (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? {
                opacity: isDimmed ? 0.3 : 1,
                scale: isActive ? 1.15 : isHov ? 1.08 : 1,
              } : { opacity: 0, scale: 0 }}
              transition={{ duration: 0.4, delay: inView ? i * 0.06 : 0 }}
              className="absolute flex flex-col items-center cursor-pointer select-none"
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
              onClick={() => toggle(skill.name)}
              onHoverStart={() => setHovered(skill.name)}
              onHoverEnd={() => setHovered(null)}
            >
              <motion.div
                className="relative flex items-center justify-center rounded-full border"
                animate={{
                  borderColor: isActive ? 'rgba(245,158,11,0.8)' : isHov ? 'rgba(245,158,11,0.5)' : 'rgba(255,255,255,0.12)',
                  backgroundColor: isActive ? 'rgba(245,158,11,0.12)' : isHov ? 'rgba(245,158,11,0.06)' : 'rgba(17,17,17,0.9)',
                  boxShadow: isActive
                    ? '0 0 20px rgba(245,158,11,0.35), 0 0 40px rgba(245,158,11,0.15)'
                    : isHov
                    ? '0 0 12px rgba(245,158,11,0.2)'
                    : 'none',
                }}
                transition={{ duration: 0.25 }}
                style={{
                  width: `${44 * size}px`,
                  height: `${44 * size}px`,
                  minWidth: 36,
                  minHeight: 36,
                }}
              >
                <span className="font-mono text-[10px] text-amber font-semibold">{skill.level}</span>

                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-full border border-amber/40"
                    animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                  />
                )}
              </motion.div>

              <motion.span
                className="font-mono text-[9px] uppercase tracking-wider mt-1.5 text-center whitespace-nowrap"
                animate={{
                  color: isActive ? '#F59E0B' : isHov ? '#F0EDE8' : '#8F8F8F',
                }}
                transition={{ duration: 0.2 }}
              >
                {skill.name}
              </motion.span>

              <AnimatePresence>
                {isHov && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.95 }}
                    transition={{ duration: 0.18 }}
                    className="absolute bottom-full mb-2 bg-charcoal border border-amber/20 px-3 py-2 z-20 pointer-events-none"
                    style={{ minWidth: 140 }}
                  >
                    <p className="font-mono text-[10px] text-amber uppercase tracking-wider mb-1">{skill.tag}</p>
                    <p className="font-inter text-xs text-iron/80 leading-snug">{skill.desc}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const { activeSkill, toggle } = useSkillFilter();

  return (
    <section id="skills" ref={ref} className="py-32 bg-obsidian relative">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-16"
        >
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-amber">02</span>
          <div className="w-8 h-px bg-amber/40" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-iron">Skills</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col gap-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-grotesk font-bold text-4xl lg:text-5xl text-bone tracking-tight"
            >
              The tech that
              <br />
              <span className="text-amber">runs my work.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-iron text-sm leading-relaxed"
            >
              Click any node to filter projects by that technology.
              Node size reflects proficiency level.
            </motion.p>

            <AnimatePresence mode="wait">
              {activeSkill ? (
                <motion.div
                  key={activeSkill}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="border border-amber/25 bg-amber/5 p-5 flex flex-col gap-3"
                >
                  {(() => {
                    const s = skills.find((sk) => sk.name === activeSkill);
                    if (!s) return null;
                    return (
                      <>
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-mono text-[10px] uppercase tracking-widest text-amber/60">{s.tag}</span>
                            <h3 className="font-grotesk font-bold text-xl text-bone mt-0.5">{s.name}</h3>
                          </div>
                          <span className="font-grotesk font-bold text-3xl text-amber">{s.level}%</span>
                        </div>
                        <div className="h-px bg-white/8 w-full relative overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${s.level}%` }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute left-0 top-0 h-full bg-amber"
                          />
                        </div>
                        <p className="font-inter text-xs text-iron/70 leading-relaxed">{s.desc}</p>
                        <button
                          onClick={() => toggle(activeSkill)}
                          className="font-mono text-[10px] uppercase tracking-widest text-iron/40 hover:text-amber transition-colors self-start"
                        >
                          ✕ Clear filter
                        </button>
                      </>
                    );
                  })()}
                </motion.div>
              ) : (
                <motion.div
                  key="hint"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-wrap gap-2"
                >
                  {skills.map((s) => (
                    <button
                      key={s.name}
                      onClick={() => toggle(s.name)}
                      className="font-mono text-[10px] uppercase tracking-wider text-iron/40 bg-white/4 border border-white/8 px-2.5 py-1.5 hover:border-amber/30 hover:text-amber/80 transition-all duration-200"
                    >
                      {s.name}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full max-w-[520px] mx-auto"
          >
            <TagCloud inView={inView} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
