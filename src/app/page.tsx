'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const homeRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const worksRef = useRef<HTMLDivElement>(null);
  const contactsRef = useRef<HTMLDivElement>(null);

  // Corrected: Wrapped sectionRefs in useMemo to prevent re-creation on every render.
  const sectionRefs = useMemo(() => ({
    home: homeRef,
    services: servicesRef,
    works: worksRef,
    contacts: contactsRef,
  }), []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      let currentSection = 'home';
      for (const [id, ref] of Object.entries(sectionRefs)) {
        if (ref.current) {
          const top = ref.current.offsetTop;
          const height = ref.current.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            currentSection = id;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sectionRefs]);

  const scrollToSection = (sectionId: string) => {
    const ref = sectionRefs[sectionId as keyof typeof sectionRefs];
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#1a1a1a] text-white min-h-screen font-sans">
      <Header activeSection={activeSection} onNavClick={scrollToSection} />
      <main>
        <div ref={homeRef}><HeroSection /></div>
        <div ref={servicesRef}><AboutSection /></div>
        <div ref={worksRef}><ProjectsSection /></div>
        <div ref={contactsRef}><ContactSection /></div>
      </main>
      <Footer />
    </div>
  );
}
