'use client'; // This is now a client component to allow for state and effects

import React, { useState, useEffect, useRef, ReactNode } from 'react';
import Image from 'next/image'; 
// Corrected: Removed unused Twitter and Instagram imports
import { Github, Mail, Code, PenTool, Search, Server, Database, Layers, ArrowUpRight, Download, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button'; 
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(TextPlugin);

// --- Morphing Icon Component ---
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

    gsap.fromTo(
      [iconEl, textEl],
      { y: 25, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }
    );

    const outAnimation = gsap.to([iconEl, textEl], {
      y: -25,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.in',
      delay: 2.5,
      onComplete: () => {
        setCurrentIndex(prev => (prev + 1) % skills.length);
      }
    });

    return () => {
      outAnimation.kill();
    };

  }, [currentIndex]);

  return (
    <div className="bg-[#2a2a2a] p-4 rounded-lg shadow-lg flex items-center justify-center space-x-4 w-48 h-16">
      <div ref={iconRef} className="text-[#32c788]" key={`icon-${currentIndex}`}>
        {skills[currentIndex].icon}
      </div>
      <div ref={textRef} className="font-semibold text-lg" key={`text-${currentIndex}`}>
        {skills[currentIndex].text}
      </div>
    </div>
  );
};


// Main App Component
export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const homeRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const worksRef = useRef<HTMLDivElement>(null);
  const contactsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sectionRefs = [
      { id: 'home', ref: homeRef },
      { id: 'services', ref: servicesRef },
      { id: 'works', ref: worksRef },
      { id: 'contacts', ref: contactsRef },
    ];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      let currentSection = 'home';
      for (const section of sectionRefs) {
        if (section.ref.current) {
          const top = section.ref.current.offsetTop;
          const height = section.ref.current.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            currentSection = section.id;
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
  }, []);

  return (
    <div className="bg-[#1a1a1a] text-white min-h-screen font-sans">
      <Header activeSection={activeSection} />
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

// Header Component
const Header = ({ activeSection }: { activeSection: string }) => {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'works', label: 'Works' },
    { id: 'notes', label: 'Notes' },
    { id: 'contacts', label: 'Contacts' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#1a1a1a] bg-opacity-80 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#home" className="text-2xl font-bold font-heading">Zakaria Bhaibi</a>
        <nav className="hidden md:flex items-center space-x-8 font-heading text-lg">
          {navItems.map(item => {
            const isActive = activeSection === item.id;
            return (
              <a 
                key={item.label} 
                href={`#${item.id}`} 
                className={`transition-colors ${isActive ? 'text-[#32c788]' : 'hover:text-[#32c788]'}`}
              >
                {isActive ? `<${item.label}>` : item.label}
              </a>
            );
          })}
        </nav>
        <div className="flex items-center space-x-4">
          <a href="#" aria-label="LinkedIn" className="hover:text-[#32c788] transition-colors"><Linkedin size={20} /></a>
          <a href="#" aria-label="GitHub" className="hover:text-[#32c788] transition-colors"><Github size={20} /></a>
          <a href="#contacts" aria-label="Email" className="bg-[#32c788] p-2 rounded-full hover:bg-opacity-80 transition-colors">
            <Mail size={20} className="text-black" />
          </a>
        </div>
      </div>
    </header>
  );
};

// Hero Section Component
const HeroSection = () => {
  const textRef = useRef(null);

   useEffect(() => {
       const textEl = textRef.current;
       const textContent = "Talk is cheap. <br /> Show me the code";
   
       const tl = gsap.timeline({ repeat: -1, repeatDelay: 3 });
   
       tl.to(textEl, {
         duration: 2,
         text: textContent,
         ease: "none",
       }).to(textEl, {
         duration: 2,
         text: "",
         ease: "none",
         delay: 1,
       });
   
       return () => {
         tl.kill();
       };
     }, []);

  return (
    <section id="home" className="pt-32 pb-16 md:pt-48 md:pb-24">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="inline-block bg-[#32c788] text-[#1a1a1a] px-3 py-1 text-sm font-semibold rounded-full">
              Full-Stack DEVELOPER
            </span>
            <h2 className="text-4xl md:text-6xl font-bold leading-tight font-heading min-h-[128px] md:min-h-[160px]">
              <span ref={textRef}></span>
              <span className="inline-block w-1 h-12 bg-green-400 ml-2 animate-pulse"></span>
            </h2>
            <p className="text-gray-400 text-lg max-w-md">
              I build accessible, pixel-perfect digital experiences for the web.
            </p>
            {/* --- Updated Buttons Section --- */}
            <div className="flex flex-wrap gap-4 pt-2">
              <Button variant="outline" className="border-[#32c788] text-[#32c788] px-6 py-3 hover:bg-[#32c788] hover:text-black transition-all duration-300">
                LET&apos;S CHAT!
              </Button>
              {/* This link points to a PDF in your `public` folder */}
              <a href="/files/Zakaria-Bhaibi-cv.pdf" download="Zakaria-Bhaibi-Resume.pdf">
                <Button variant="default" className="bg-[#32c788] text-black px-6 py-3 hover:bg-opacity-80 transition-all duration-300 flex items-center gap-2">
                  Download Resume <Download size={18} />
                </Button>
              </a>
            </div>
            <div className="flex space-x-8 pt-6">
              <div>
                <p className="text-4xl font-bold text-[#32c788]">3</p>
                <p className="text-gray-400 text-sm">YEARS EXPERIENCE</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-[#32c788]">20</p>
                <p className="text-gray-400 text-sm">PROJECTS COMPLETED</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-8">
              <div className="relative">
                  <div className="absolute -inset-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg blur-xl opacity-25"></div>
                  <Image
                      src="/images/profile.png"
                      alt="A portrait of the developer"
                      width={400}
                      height={500}
                      className="relative z-10 rounded-lg object-cover"
                      priority
                  />
              </div>
              <MorphingTechIcon />
          </div>
        </div>
      </div>
    </section>
  );
};

// About Section
const AboutSection = () => (
    <section id="services" className="py-20 bg-[#212121]">
        <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16 items-start">
                <div className="space-y-8">
                    <ServiceCard icon={<PenTool />} title="Design" description="Create digital products with unique ideas." projectCount={10} />
                    <ServiceCard icon={<Code />} title="Front-End" description="I develop front-end with coding super smooth." projectCount={20} />
                    <ServiceCard icon={<Search />} title="SEO" description="Boost your business with SEO optimize." projectCount={3} />
                </div>
                <div className="sticky top-24">
                    <p className="text-sm font-semibold text-[#32c788] mb-2">INTRODUCE</p>
                    {/* Corrected: Escaped apostrophe */}
                    <h3 className="text-4xl font-bold mb-6 font-heading">Hello! I&apos;m Zakaria Bhaibi</h3>
                    <div className="space-y-4 text-gray-400">
                        <p>
                            {/* Corrected: Escaped apostrophe */}
                            Every great Website begins with an even better story. Since beginning my journey as a freelance Web Developer nearly 3 years ago, I&apos;ve done remote work for agencies, consulted for startups, and collaborated with talented people to create digital products for both business and consumer use.
                        </p>
                        <p>
                            {/* Corrected: Escaped apostrophe */}
                            I&apos;m quietly confident, naturally curious, and perpetually working on improving my chops one design problem at a time.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

// Service Card Component
const ServiceCard = ({ icon, title, description, projectCount }: { icon: ReactNode, title: string, description: string, projectCount: number }) => (
    <div className="bg-[#1a1a1a] p-8 rounded-lg border border-gray-700 hover:border-[#32c788] transition-colors duration-300">
        <div className="flex justify-between items-start mb-4">
            <h4 className="text-2xl font-bold font-heading">{title}</h4>
            <div className="text-[#32c788]">{icon}</div>
        </div>
        <p className="text-gray-400 mb-4">{description}</p>
        <p className="text-sm text-[#32c788] font-semibold">{projectCount} PROJECTS</p>
    </div>
);


// --- Updated Projects Section ---
const projects = [
  {
    title: 'Edit Website',
    description: 'A modern, responsive website for a creative agency, built with React and Tailwind CSS.',
    imageUrl: '/images/Edit-website.png',
    link: '#',
    tags: ['React', 'Next.js', 'Tailwind CSS'],
  },
  {
    title: 'Vision Forge',
    description: 'A modern, responsive website for a VR specialised agency, built with React and Tailwind CSS.',
    imageUrl: '/images/Vision-forge.png',
    link: '#',
    tags: ['React', 'GSAP', 'Framer Motion'],
  },
  {
    title: 'Login Modal',
    description: 'Built with React and Tailwind CSS, this login modal features smooth animations and responsive design',
    imageUrl: '/images/Login-modal.png',
    link: '#',
    tags: ['React', 'TypeScript', 'shadcn/ui'],
  },
  {
    title: 'Product Modal',
    description: 'Built with React and Tailwind CSS, this product modal showcases a sleek design with smooth animations.',
    imageUrl: '/images/Product-modal.png',
    link: '#',
    tags: ['WordPress', 'PHP', 'Advanced Custom Fields'],
  },
];

const ProjectsSection = () => (
  <section id="works" className="py-20">
    <div className="container mx-auto px-6">
      <h3 className="text-3xl font-bold text-center mb-12 font-heading">My Works</h3>
      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
      <div className="text-center mt-12">
        <p className="text-gray-400 max-w-2xl mx-auto">
          More projects are available upon request. Some of my work is not displayed here due to non-disclosure agreements.
        </p>
      </div>
    </div>
  </section>
);

const ProjectCard = ({ title, description, imageUrl, link, tags }: { title: string, description: string, imageUrl: string, link: string, tags: string[] }) => (
  <div className="bg-[#212121] rounded-lg overflow-hidden group border border-transparent hover:border-[#32c788] transition-all duration-300 flex flex-col">
    <div className="overflow-hidden">
      <Image
        src={imageUrl}
        alt={`Screenshot of ${title}`}
        width={600}
        height={400}
        className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
      />
    </div>
    <div className="p-6 flex flex-col flex-grow">
      <h4 className="text-2xl font-bold font-heading mb-2">{title}</h4>
      <p className="text-gray-400 mb-4 flex-grow">{description}</p>
      {/* --- Added Tags Section --- */}
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag) => (
          <span key={tag} className="bg-[#2a2a2a] text-[#32c788] text-xs font-semibold px-3 py-1 rounded-full">
            {tag}
          </span>
        ))}
      </div>
      <a href={link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-[#32c788] font-semibold hover:underline mt-auto">
        View Project <ArrowUpRight className="ml-2 h-5 w-5" />
      </a>
    </div>
  </div>
);


// Contact Section
const ContactSection = () => (
  <section id="contacts" className="py-20 bg-[#212121]">
    <div className="container mx-auto px-6">
      <h3 className="text-3xl font-bold text-center mb-12 font-heading">Contact Me</h3>
       <p className="text-center text-gray-500">Contact form coming soon...</p>
    </div>
  </section>
);

// Footer Component
const Footer = () => (
  <footer className="bg-[#1a1a1a] border-t border-gray-800 py-8">
    <div className="container mx-auto px-6 text-center text-gray-400">
      <p>&copy; {new Date().getFullYear()} Zakaria Bhaibi. All Rights Reserved.</p>
    </div>
  </footer>
);
