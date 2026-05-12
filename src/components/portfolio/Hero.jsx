import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

const TYPING_STRINGS = [
  'Full Stack Developer',
  'Discord Bot Developer',
  'Automation Tools',
  'Modern Web Experiences',
];

/**
 * @param {string[]} strings
 * @param {number} [speed]
 * @param {number} [pause]
 */
function useTypingEffect(strings, speed = 80, pause = 1800) {
  const [display, setDisplay] = useState('');
  const [idx, setIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = strings[idx];
    /** @type {number|undefined} */
    let timeout;
    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx(c => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx(c => c - 1), speed / 2);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setIdx(i => (i + 1) % strings.length);
    }
    setDisplay(current.substring(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, idx, strings, speed, pause]);

  return display;
}

export default function Hero() {
  const typed = useTypingEffect(TYPING_STRINGS);
  const heroRef = useRef(/** @type {HTMLDivElement | null} */ (null));

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  const translateX = useTransform(springX, [0, 1], [-12, 12]);
  const translateY = useTransform(springY, [0, 1], [-8, 8]);

  const handleMouseMove = (
    /** @type {React.MouseEvent<HTMLDivElement>} */ e
  ) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center syntax-grid overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-amber/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-amber/3 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 pt-24 pb-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — Monogram */}
          <motion.div
            style={{ x: translateX, y: translateY }}
            className="hidden lg:flex items-center justify-center"
          >
            <div className="relative select-none">
              <span
                className="font-grotesk font-bold text-[12rem] xl:text-[14rem] leading-none text-transparent"
                style={{
                  WebkitTextStroke: '1px rgba(245,158,11,0.2)',
                  letterSpacing: '-0.04em',
                }}
              >
                RRS
              </span>
              {/* Floating amber square */}
              <motion.div
                animate={{ rotate: [0, 90, 180, 270, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute -top-4 -right-4 w-8 h-8 border border-amber/30"
              />
              <motion.div
                animate={{ rotate: [360, 270, 180, 90, 0] }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                className="absolute -bottom-2 -left-2 w-5 h-5 border border-amber/20"
              />
            </div>
          </motion.div>

          {/* Right — Content */}
          <div className="flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-amber">
                — Full-Stack & Bot Developer
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.7 }}
              className="font-grotesk font-bold text-4xl sm:text-5xl xl:text-6xl text-bone leading-[1.05] tracking-tight"
            >
              Rashidur
              <br />
              Rahman
              <br />
              <span className="text-amber">Shawon</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex items-center gap-2 h-8"
            >
              <span className="font-mono text-sm text-iron">{'>'}</span>
              <span className="font-mono text-sm text-bone">{typed}</span>
              <span className="terminal-cursor font-mono text-sm text-amber">_</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.6 }}
              className="text-iron text-base leading-relaxed max-w-md"
            >
              I’m a self-taught developer focused on building fast, scalable, and user-focused applications. I specialize in Discord bots, backend systems, automation tools, and modern web interfaces with clean user experience.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <a
                href="#projects"
                className="font-mono text-xs uppercase tracking-widest bg-amber text-obsidian px-6 py-3 hover:bg-amber/90 transition-colors duration-200 min-h-[44px] flex items-center"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="font-mono text-xs uppercase tracking-widest border border-white/15 text-bone px-6 py-3 hover:border-amber/40 hover:text-amber transition-all duration-200 min-h-[44px] flex items-center"
              >
                Contact Me
              </a>
            </motion.div>

            {/* Social row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.5 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              {[
                { label: 'GitHub', href: 'https://github.com/RashidurRahmanShawon' },
                { label: 'Fiverr', href: 'https://www.fiverr.com/users/shawonwebdesign' },
                { label: 'Discord', href: 'https://discord.com/users/zig_shaw' },
                { label: 'LinkedIn', href: 'https://linkedin.com/in/rashidur-rahman-shawon' },
                { label: 'Email', href: 'mailto:rahsidurrahmanshawon@gmail.com' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-xs text-iron hover:text-amber transition-colors tracking-widest"
                >
                  {s.label}
                </a>
              ))}
              <div className="flex-1 h-px bg-white/8 ml-2" />
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="font-mono text-xs text-iron/50 uppercase tracking-widest">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-px h-8 bg-gradient-to-b from-amber/50 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}