import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (
    /** @type {React.FormEvent<HTMLFormElement>} */ e
  ) => {
    e.preventDefault();
    // Placeholder — wire up a real email integration
    setSent(true);
  };

  return (
    <section id="contact" ref={ref} className="py-32 bg-charcoal relative overflow-hidden">
      <div className="absolute inset-0 syntax-grid opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber/3 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-16"
        >
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-amber">05</span>
          <div className="w-8 h-px bg-amber/40" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-iron">Access request</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            <h2 className="font-grotesk font-bold text-4xl lg:text-5xl text-bone tracking-tight">
              Let's build
              <br />
              <span className="text-amber">something real.</span>
            </h2>
            <p className="text-iron text-base leading-relaxed">
              Have a project, idea, or just want to talk tech? I'm open to
              freelance work, collaborations, and interesting opportunities.
            </p>

            <div className="flex flex-col gap-3 pt-2">
              {[
                { label: 'Email', value: 'rahsidurrahmanshawon@gmail.com', href: 'mailto:rahsidurrahmanshawon@gmail.com' },
                { label: 'GitHub', value: 'RashidurRahmanShawon', href: 'https://github.com/RashidurRahmanShawon' },
                { label: 'Fiverr', value: 'shawonwebdesign', href: 'https://www.fiverr.com/users/shawonwebdesign' },
                { label: 'LinkedIn', value: 'rashidur-rahman-shawon', href: 'https://www.linkedin.com/in/rashidur-rahman-shawon/' },
                { label: 'Discord', value: 'zig_shaw' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <span className="font-mono text-xs uppercase tracking-wider text-iron/40 w-16">
                    {item.label}
                  </span>
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="font-mono text-xs text-amber/90 hover:text-amber transition-colors"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span className="font-mono text-xs text-bone/80">{item.value}</span>
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3 pt-4">
              <div className="w-2 h-2 rounded-full bg-amber commit-dot" />
              <span className="font-mono text-xs uppercase tracking-wider text-amber">
                Currently available for new projects
              </span>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {sent ? (
              <div className="h-full flex flex-col items-start justify-center gap-4">
                <div className="w-12 h-12 border border-amber/30 flex items-center justify-center">
                  <span className="text-amber text-xl">✓</span>
                </div>
                <h3 className="font-grotesk font-bold text-2xl text-bone">Message sent.</h3>
                <p className="text-iron text-sm">I'll get back to you within 24 hours.</p>
                <button
                  onClick={() => setSent(false)}
                  className="font-mono text-xs uppercase tracking-widest text-iron/50 hover:text-amber transition-colors mt-2"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-xs uppercase tracking-wider text-iron/50">Name</label>
                  <input
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    required
                    className="bg-obsidian border border-white/10 text-bone text-sm px-4 py-3 outline-none focus:border-amber/40 transition-colors font-inter placeholder-iron/30"
                    placeholder="Your name"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-xs uppercase tracking-wider text-iron/50">Email</label>
                  <input
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    required
                    type="email"
                    className="bg-obsidian border border-white/10 text-bone text-sm px-4 py-3 outline-none focus:border-amber/40 transition-colors font-inter placeholder-iron/30"
                    placeholder="your@email.com"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-xs uppercase tracking-wider text-iron/50">Project Details</label>
                  <textarea
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    required
                    rows={5}
                    className="bg-obsidian border border-white/10 text-bone text-sm px-4 py-3 outline-none focus:border-amber/40 transition-colors font-inter placeholder-iron/30 resize-none"
                    placeholder="Describe your project, goals, and timeline..."
                  />
                </div>
                <button
                  type="submit"
                  className="font-mono text-xs uppercase tracking-widest bg-amber text-obsidian px-6 py-4 hover:bg-amber/90 transition-colors duration-200 mt-1 min-h-[44px]"
                >
                  Send Message
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}