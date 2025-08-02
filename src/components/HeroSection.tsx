'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Code, PenTool, Server, Database, Layers, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(TextPlugin);

const skills = [
  { icon: <PenTool size={28} />, text: 'Design' },
  { icon: <Code size={28} />, text: 'Front-End' },
  { icon: <Server size={28} />, text: 'Back-End' },
  { icon: <Database size={28} />, text: 'Databases' },
  { icon: <Layers size={28} />, text: 'WordPress' },
];

const MorphingTechIcon = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const iconRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const iconEl = iconRef.current;
    const textEl = textRef.current;
    if (!iconEl || !textEl) return;
    gsap.fromTo([iconEl, textEl], { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' });
    const outAnimation = gsap.to([iconEl, textEl], { y: -25, opacity: 0, duration: 0.6, ease: 'power2.in', delay: 2.5, onComplete: () => { setCurrentIndex(prev => (prev + 1) % skills.length); } });
    return () => { outAnimation.kill(); };
  }, [currentIndex]);

  return (
    <div className="bg-[#2a2a2a] p-4 rounded-lg shadow-lg flex items-center justify-center space-x-4 w-48 h-16">
      <div ref={iconRef} className="text-[#32c788]" key={`icon-${currentIndex}`}>{skills[currentIndex].icon}</div>
      <div ref={textRef} className="font-semibold text-lg" key={`text-${currentIndex}`}>{skills[currentIndex].text}</div>
    </div>
  );
};

export default function HeroSection() {
  const textRef = useRef(null);

  useEffect(() => {
    const textEl = textRef.current;
    const textContent = "Talk is cheap. <br /> Show me the code";
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 3 });
    tl.to(textEl, { duration: 2, text: textContent, ease: "none" }).to(textEl, { duration: 2, text: "", ease: "none", delay: 1 });
    return () => { tl.kill(); };
  }, []);

  return (
    <section id="home" className="pt-32 pb-16 md:pt-48 md:pb-24">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="inline-block bg-[#32c788] text-[#1a1a1a] px-3 py-1 text-sm font-semibold rounded-full">Full-Stack DEVELOPER</span>
            <h2 className="text-4xl md:text-6xl font-bold leading-tight font-heading min-h-[128px] md:min-h-[160px]">
              <span ref={textRef}></span>
              <span className="inline-block w-1 h-12 bg-green-400 ml-2 animate-pulse"></span>
            </h2>
            <p className="text-gray-400 text-lg max-w-md">I build accessible, pixel-perfect digital experiences for the web.</p>
            <div className="flex flex-wrap gap-4 pt-2">
              <a href="/files/Zakaria-Bhaibi-cv.pdf" download="Zakaria-Bhaibi-Resume.pdf">
                <Button variant="default" className="bg-[#32c788] text-black px-6 py-3 hover:bg-opacity-80 transition-all duration-300 flex items-center gap-2">Download Resume <Download size={18} /></Button>
              </a>
            </div>
            <div className="flex space-x-8 pt-6">
              <div>
                <p className="text-4xl font-bold text-[#32c788]">3</p>
                <p className="text-gray-400 text-sm">YEARS EXPERIENCE</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-[#32c788]">30</p>
                <p className="text-gray-400 text-sm">PROJECTS COMPLETED</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-8">
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg blur-xl opacity-25"></div>
              <Image src="/images/profile.png" alt="A portrait of the developer" width={400} height={500} className="relative z-10 rounded-lg object-cover" priority />
            </div>
            <MorphingTechIcon />
          </div>
        </div>
      </div>
    </section>
  );
};
