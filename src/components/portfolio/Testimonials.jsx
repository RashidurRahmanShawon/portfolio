import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const testimonials = [
  {
    quote:
      "Shawon delivered a moderation bot that handles 50k+ members without a hiccup. The code quality was exceptional — clean, documented, and easy to maintain.",
    author: 'Ethan K.',
    role: 'Discord Server Owner, 50k+ Members',
    initials: 'EK',
  },
  {
    quote:
      "The dashboard he built for us has been running in production for 8 months with zero critical issues. Fast delivery, clear communication, and impressive technical depth.",
    author: 'Sara L.',
    role: 'Founder, SaaS Startup',
    initials: 'SL',
  },
  {
    quote:
      "I've worked with a lot of freelance devs. Shawon stands out — he asks the right questions, understands the architecture upfront, and ships without surprises.",
    author: 'Marcus T.',
    role: 'CTO, Tech Agency',
    initials: 'MT',
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="testimonials" ref={ref} className="py-32 bg-obsidian">
      <div className="max-w-6xl mx-auto px-6">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-16"
        >
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-amber">08</span>
          <div className="w-8 h-px bg-amber/40" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-iron">Testimonials</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-grotesk font-bold text-4xl lg:text-5xl text-bone tracking-tight mb-14"
        >
          What clients
          <br />
          <span className="text-amber">actually say.</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.12 }}
              className="bg-charcoal border border-white/8 p-7 flex flex-col gap-6 group hover:border-amber/20 transition-colors duration-300 relative"
            >
              {/* Quote mark */}
              <span className="font-grotesk text-5xl leading-none text-amber/20 select-none">"</span>

              <p className="text-iron text-sm leading-relaxed flex-1 -mt-4">{t.quote}</p>

              <div className="flex items-center gap-3 pt-2 border-t border-white/6">
                <div className="w-9 h-9 rounded-full bg-amber/10 border border-amber/20 flex items-center justify-center flex-shrink-0">
                  <span className="font-grotesk font-bold text-xs text-amber">{t.initials}</span>
                </div>
                <div>
                  <p className="font-grotesk font-semibold text-bone text-sm">{t.author}</p>
                  <p className="font-mono text-[10px] text-iron/50 uppercase tracking-wider mt-0.5">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}