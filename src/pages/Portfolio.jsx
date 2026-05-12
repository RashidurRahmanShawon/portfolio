import React from 'react';
import Navbar from '../components/portfolio/Navbar';
import Hero from '../components/portfolio/Hero';
import About from '../components/portfolio/About';
import Skills from '../components/portfolio/Skills';
import Projects from '../components/portfolio/Projects';
import Terminal from '../components/portfolio/Terminal';
import BotShowcase from '../components/portfolio/BotShowcase';
import LiveCodeBlock from '../components/portfolio/LiveCodeBlock';
import Experience from '../components/portfolio/Experience';
import Testimonials from '../components/portfolio/Testimonials';
import Contact from '../components/portfolio/Contact';
import Footer from '../components/portfolio/Footer';
import { SkillFilterProvider } from '../context/SkillFilterContext';

export default function Portfolio() {
  return (
    <SkillFilterProvider>
    <div className="bg-obsidian min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Terminal />
      <BotShowcase />
      <LiveCodeBlock />
      <Experience />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
    </SkillFilterProvider>
  );
}