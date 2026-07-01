import React from 'react';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-obsidian border-t border-white/6 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Monogram */}
          <div>
            <span className="font-grotesk font-bold text-bone text-lg tracking-tight">
              RRS
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber ml-1 mb-0.5 commit-dot" />
            </span>
            <p className="font-mono text-xs text-iron/40 mt-1 uppercase tracking-widest">
              Rashidur Rahman Shawon
            </p>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap gap-6">
            {[
              { label: 'Showcase', href: '#showcase' },
              { label: 'Interactive Lab', href: '#playground' },
              { label: 'Skills', href: '#skills' },
              { label: 'Principles', href: '#principles' },
              { label: 'Access', href: '#contact' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-mono text-xs uppercase tracking-widest text-iron/40 hover:text-amber transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Copyright */}
          <p className="font-mono text-xs text-iron/40">
            © {year} Rashidur Rahman Shawon. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}