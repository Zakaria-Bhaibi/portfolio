'use client';

import React from 'react';
import { Github, Mail, Linkedin } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  onNavClick: (id: string) => void;
}

export default function Header({ activeSection, onNavClick }: HeaderProps) {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'works', label: 'Works' },
    { id: 'contacts', label: 'Contacts' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#1a1a1a] bg-opacity-80 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#home" onClick={(e) => { e.preventDefault(); onNavClick('home'); }} className="text-2xl font-bold font-heading cursor-pointer">Zakaria Bhaibi</a>
        <nav className="hidden md:flex items-center space-x-8 font-heading text-lg">
          {navItems.map(item => {
            const isActive = activeSection === item.id;
            return (
              <a 
                key={item.label} 
                href={`#${item.id}`} 
                onClick={(e) => {
                  e.preventDefault();
                  onNavClick(item.id);
                }}
                className={`transition-colors cursor-pointer ${isActive ? 'text-[#32c788]' : 'hover:text-[#32c788]'}`}
              >
                {isActive ? `<${item.label}>` : item.label}
              </a>
            );
          })}
        </nav>
        <div className="flex items-center space-x-4">
          <a href="https://www.linkedin.com/in/bhaibi-zakaria/" target='_blank' aria-label="LinkedIn" className="hover:text-[#32c788] transition-colors"><Linkedin size={20} /></a>
          <a href="https://github.com/Zakaria-Bhaibi" target="_blank" aria-label="GitHub" className="hover:text-[#32c788] transition-colors"><Github size={20} /></a>
          <a href="#contacts" onClick={(e) => { e.preventDefault(); onNavClick('contacts'); }} aria-label="Email" className="bg-[#32c788] p-2 rounded-full hover:bg-opacity-80 transition-colors cursor-pointer">
            <Mail size={20} className="text-black" />
          </a>
        </div>
      </div>
    </header>
  );
};