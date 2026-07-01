import React from 'react';
import Navbar from '../components/portfolio/Navbar';
import Hero from '../components/portfolio/Hero';
import Projects from '../components/portfolio/Projects';
import Playground from '../components/portfolio/Playground';
import SkillsNetwork from '../components/portfolio/SkillsNetwork';
import EngineeringPrinciples from '../components/portfolio/EngineeringPrinciples';
import Contact from '../components/portfolio/Contact';
import Footer from '../components/portfolio/Footer';
import { SkillFilterProvider } from '../context/SkillFilterContext';

export default function Portfolio() {
  return (
    <SkillFilterProvider>
    <div className="bg-obsidian min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <Projects />
      <Playground />
      <SkillsNetwork />
      <EngineeringPrinciples />
      <Contact />
      <Footer />
    </div>
    </SkillFilterProvider>
  );
}