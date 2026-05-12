import React from 'react';
import { motion } from 'framer-motion';

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
            {['About', 'Skills', 'Work', 'Terminal', 'Contact'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="font-mono text-xs uppercase tracking-widest text-iron/40 hover:text-amber transition-colors duration-200"
              >
                {link}
              </a>
            ))}
          </nav>

          {/* Copyright */}
          <p className="font-mono text-xs text-iron/40">
            Designed & developed by Rashidur Rahman Shawon.
          </p>
        </div>
      </div>
    </footer>
  );
}