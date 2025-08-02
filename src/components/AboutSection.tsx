'use client';

import React, { ReactNode } from 'react';
import { Code, PenTool, Search } from 'lucide-react';

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

export default function AboutSection() {
    return (
        <section id="services" className="py-20 bg-[#212121]">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-16 items-start">
                    <div className="space-y-8">
                        <ServiceCard icon={<PenTool />} title="Design" description="Create digital products with unique ideas." projectCount={10} />
                        <ServiceCard icon={<Code />} title="Web Development" description="I develop Websites with different coding languages and frameworks." projectCount={20} />
                        <ServiceCard icon={<Search />} title="SEO" description="Boost your business with SEO optimize." projectCount={3} />
                    </div>
                    <div className="sticky top-24">
                        <p className="text-sm font-semibold text-[#32c788] mb-2">INTRODUCE</p>
                        <h3 className="text-4xl font-bold mb-6 font-heading">Hello! I&apos;m Zakaria Bhaibi</h3>
                        <div className="space-y-4 text-gray-400">
                            <p>Every great Website begins with an even better story. Since beginning my journey as a freelance Web Developer nearly 3 years ago, I&apos;ve done remote work for agencies, consulted for startups, and collaborated with talented people to create digital products for both business and consumer use.</p>
                            <p>I&apos;m quietly confident, naturally curious, and perpetually working on improving my chops one design problem at a time.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
