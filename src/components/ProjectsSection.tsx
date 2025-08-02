'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { title: 'Edit Website', description: 'A modern, responsive website for a creative agency, built with React and Tailwind CSS.', imageUrl: '/images/Edit-website.png', link: 'https://edit-website.vercel.app/', tags: ['React', 'Next.js', 'Tailwind CSS'] },
  { title: 'Vision Forge', description: 'A modern, responsive website for a VR specialised agency, built with React and Tailwind CSS.', imageUrl: '/images/Vision-forge.png', link: 'https://vision-forge.vercel.app/', tags: ['React', 'GSAP', 'Framer Motion'] },
  { title: 'Login Modal', description: 'Built with React and Tailwind CSS, this login modal features smooth animations and responsive design', imageUrl: '/images/Login-modal.png', link: 'https://login-modal-sand.vercel.app/', tags: ['React', 'TypeScript', 'shadcn/ui'] },
  { title: 'Product Modal', description: 'Built with React and Tailwind CSS, this product modal showcases a sleek design with smooth animations.', imageUrl: '/images/Product-modal.png', link: 'https://product-modal-two.vercel.app/', tags: ['WordPress', 'PHP', 'Advanced Custom Fields'] },
];

const ProjectCard = ({ title, description, imageUrl, link, tags }: { title: string, description: string, imageUrl: string, link: string, tags: string[] }) => (
  <div className="bg-[#212121] rounded-lg overflow-hidden group border border-transparent hover:border-[#32c788] transition-all duration-300 flex flex-col w-[80vw] md:w-[60vw] flex-shrink-0">
    <div className="overflow-hidden">
      <Image src={imageUrl} alt={`Screenshot of ${title}`} width={600} height={400} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300" />
    </div>
    <div className="p-6 flex flex-col flex-grow">
      <h4 className="text-2xl font-bold font-heading mb-2">{title}</h4>
      <p className="text-gray-400 mb-4 flex-grow">{description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag) => (<span key={tag} className="bg-[#2a2a2a] text-[#32c788] text-xs font-semibold px-3 py-1 rounded-full">{tag}</span>))}
      </div>
      <a href={link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-[#32c788] font-semibold hover:underline mt-auto">View Project <ArrowUpRight className="ml-2 h-5 w-5" /></a>
    </div>
  </div>
);

export default function ProjectsSection() {
    const mainRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const pinRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Corrected: Use gsap.context for proper cleanup
        let ctx = gsap.context(() => {
            const track = trackRef.current;
            if (!track) return;

            const scrollDistance = track.scrollWidth - window.innerWidth;

            gsap.to(track, {
                x: -scrollDistance,
                ease: "none",
                scrollTrigger: {
                    trigger: mainRef.current,
                    start: "top top",
                    end: `+=${scrollDistance}`,
                    scrub: true,
                    pin: pinRef.current,
                    invalidateOnRefresh: true,
                },
            });
        }, mainRef);

        // This is the crucial cleanup function
        return () => ctx.revert();
    }, []);

    return (
        <section id="works" ref={mainRef} className="bg-[#1a1a1a] overflow-hidden">
            <div ref={pinRef}>
                <div className="h-screen flex flex-col justify-center">
                    <h3 className="text-3xl font-bold text-center mb-12 font-heading">My Works</h3>
                    <div ref={trackRef} className="flex items-center gap-8 px-8">
                        {projects.map((project, index) => (<ProjectCard key={index} {...project} />))}
                    </div>
                </div>
            </div>
            <div className="container mx-auto px-6 text-center py-12">
                <p className="text-gray-400 max-w-2xl mx-auto">More projects are available upon request. Some of my work is not displayed here due to non-disclosure agreements.</p>
            </div>
        </section>
    );
};