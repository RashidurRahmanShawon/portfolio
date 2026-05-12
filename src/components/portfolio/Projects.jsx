import React, { useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { useSkillFilter } from '../../context/SkillFilterContext';

/**
 * @typedef {{ id: string, title: string, category: string, description: string, stack: string[], github: string, live: string }} Project
 */

const projects = [
  {
    id: '01',
    title: 'Zigle',
    category: 'Random Chat Platform',
    description:
      'A modern random chat platform inspired by Omegle with interest-based matching, responsive UI, dark/light mode, and real-time interaction features.',
    stack: ['React', 'Node.js', 'Socket.IO', 'MongoDB'],
    github: '#',
    live: '#',
  },
  {
    id: '02',
    title: 'Discord Management Bot',
    category: 'Discord System',
    description:
      'Advanced Discord bot system featuring moderation, reaction roles, tickets, logging, dashboards, and automation features for large communities.',
    stack: ['Discord.js', 'MongoDB', 'Express'],
    github: '#',
    live: '#',
  },
  {
    id: '03',
    title: 'PlayConnect Dashboard',
    category: 'Admin Dashboard',
    description:
      'Custom admin dashboard for managing Discord systems, embeds, reaction roles, analytics, and server configuration in real time.',
    stack: ['EJS', 'Node.js', 'MongoDB'],
    github: '#',
    live: '#',
  },
  {
    id: '04',
    title: 'AI Voice Assistant Bot',
    category: 'AI Bot',
    description:
      'Experimental AI-powered Discord assistant capable of handling voice interaction, AI replies, and smart conversational responses.',
    stack: ['Node.js', 'AI APIs', 'Discord.js'],
    github: '#',
    live: '#',
  },
];

/**
 * @param {{ project: Project, index: number, inView: boolean, isVisible: boolean, isFiltered: boolean }} props
 */
function ProjectCard({ project, index, isVisible, isFiltered }) {
  const cardRef = useRef(/** @type {HTMLDivElement | null} */ (null));
  const { activeSkill } = useSkillFilter();

  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const springRotX = useSpring(rotX, { stiffness: 150, damping: 20 });
  const springRotY = useSpring(rotY, { stiffness: 150, damping: 20 });

  const handleMouseMove = (
    /** @type {React.MouseEvent<HTMLDivElement>} */ e
  ) => {
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

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={isVisible ? {
        opacity: isFiltered ? 0.25 : 1,
        y: 0,
        scale: isFiltered ? 0.98 : 1,
      } : { opacity: 0, y: 40 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.45, delay: isVisible ? index * 0.1 : 0 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: isFiltered ? 0 : springRotX,
        rotateY: isFiltered ? 0 : springRotY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      className="group bg-charcoal border border-white/8 hover:border-amber/25 transition-colors duration-300 relative overflow-hidden"
    >
      {/* Top accent line */}
      <div className="h-px w-0 group-hover:w-full bg-amber transition-all duration-500" />
      <div className="absolute inset-0 bg-amber/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div className="p-7 flex flex-col gap-5 relative">
        <div className="flex items-start justify-between">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-iron/50">{project.category}</span>
            <div className="flex items-center gap-2 mt-1">
              <span className="font-mono text-xs text-amber/60">{project.id}</span>
              <h3 className="font-grotesk font-bold text-xl text-bone">{project.title}</h3>
            </div>
          </div>
          <div className="w-2 h-2 rounded-full bg-amber/40 group-hover:bg-amber commit-dot mt-1 transition-colors duration-300" />
        </div>

        <p className="text-iron text-sm leading-relaxed">{project.description}</p>

        {/* Stack tags — highlight matched one */}
        <div className="flex flex-wrap gap-2">
          {project.stack.map(
            /** @param {string} tag */
            (tag) => {
              const isMatch = activeSkill && tag === activeSkill;
              return (
              <motion.span
                key={tag}
                animate={{
                  borderColor: isMatch ? 'rgba(245,158,11,0.6)' : 'rgba(255,255,255,0.08)',
                  color: isMatch ? '#F59E0B' : 'rgba(143,143,143,0.8)',
                  backgroundColor: isMatch ? 'rgba(245,158,11,0.08)' : 'rgba(255,255,255,0.03)',
                }}
                transition={{ duration: 0.25 }}
                className="font-mono text-[10px] uppercase tracking-wider border px-2 py-1"
              >
                {tag}
              </motion.span>
            );
          })}
        </div>

        <div className="flex gap-3 pt-1">
          <a href={project.github} className="font-mono text-xs uppercase tracking-wider text-iron hover:text-amber transition-colors duration-200 flex items-center gap-1.5">
            <span>GitHub</span><span className="text-iron/30">↗</span>
          </a>
          <span className="text-iron/20">|</span>
          <a href={project.live} className="font-mono text-xs uppercase tracking-wider text-amber hover:text-amber/80 transition-colors duration-200 flex items-center gap-1.5">
            <span>Live Demo</span><span>↗</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const { activeSkill } = useSkillFilter();

  return (
    <section id="projects" ref={ref} className="py-32 bg-charcoal relative">
      <div className="absolute inset-0 syntax-grid opacity-40" />

      <div className="max-w-6xl mx-auto px-6 relative">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-16"
        >
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-amber">03</span>
          <div className="w-8 h-px bg-amber/40" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-iron">Projects</span>
        </motion.div>

        <div className="flex items-end justify-between gap-4 mb-14 flex-wrap">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-grotesk font-bold text-4xl lg:text-5xl text-bone tracking-tight"
          >
            Selected work &
            <br />
            <span className="text-amber">shipped products.</span>
          </motion.h2>

          {/* Active filter badge */}
          <AnimatePresence>
            {activeSkill && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="flex items-center gap-2 border border-amber/30 bg-amber/5 px-3 py-2"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-amber commit-dot" />
                <span className="font-mono text-xs text-amber uppercase tracking-wider">
                  Filtered: {activeSkill}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project, i) => {
            const isFiltered = activeSkill
              ? !project.stack.includes(activeSkill)
              : false;
            return (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                inView={inView}
                isVisible={inView}
                isFiltered={isFiltered}
              />
            );
          })}
        </motion.div>

        {/* No matches message */}
        <AnimatePresence>
          {activeSkill && projects.every(p => !p.stack.includes(activeSkill)) && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="font-mono text-xs text-iron/40 text-center mt-8 uppercase tracking-widest"
            >
              No projects tagged with {activeSkill} yet.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}