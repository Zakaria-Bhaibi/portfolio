'use client';

import React, { useState } from 'react';
import { Linkedin, Mail, Copy, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const email = "bhaibizakaria@gmail.com";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section id="contacts" className="bg-[#212121] py-20">
      <div className="container mx-auto px-6 text-center">
        <h3 className="text-3xl md:text-4xl font-bold mb-4 font-heading">You can contact me in</h3>
        
        {/* Static Language Tags */}
        <div className="flex justify-center items-center gap-4 mb-12">
          <span className="bg-[#2a2a2a] text-white text-lg font-semibold px-6 py-3 rounded-full">English</span>
          <span className="bg-[#2a2a2a] text-white text-lg font-semibold px-6 py-3 rounded-full">Français</span>
          <span className="bg-[#2a2a2a] text-white text-lg font-semibold px-6 py-3 rounded-full">العربية</span>
        </div>
        
        {/* Contact Cards */}
        <div className="flex flex-col md:flex-row gap-8 justify-center">
          <a href="https://www.linkedin.com/in/bhaibi-zakaria/" target="_blank" rel="noopener noreferrer" className="bg-[#1a1a1a] p-8 rounded-lg border border-gray-700 hover:border-[#32c788] transition-colors duration-300 flex-1 max-w-md text-center">
            <Linkedin size={40} className="mx-auto mb-4 text-[#32c788]" />
            <h4 className="text-2xl font-bold font-heading mb-2">LinkedIn</h4>
            <p className="text-gray-400">Connect with me professionally.</p>
          </a>
          <a href="https://github.com/Zakaria-Bhaibi" target="_blank" rel="noopener noreferrer" className="bg-[#1a1a1a] p-8 rounded-lg border border-gray-700 hover:border-[#32c788] transition-colors duration-300 flex-1 max-w-md text-center">
            <Github size={40} className="mx-auto mb-4 text-[#32c788]" />
            <h4 className="text-2xl font-bold font-heading mb-2">GitHub</h4>
            <p className="text-gray-400">Check out my code and projects.</p>
          </a>
          <div className="bg-[#1a1a1a] p-8 rounded-lg border border-gray-700 hover:border-[#32c788] transition-colors duration-300 flex-1 max-w-md text-center">
            <Mail size={40} className="mx-auto mb-4 text-[#32c788]" />
            <h4 className="text-2xl font-bold font-heading mb-2">Email</h4>
            <p className="text-gray-400 mb-4 break-all">{email}</p>
            <Button onClick={copyToClipboard} variant="outline" className="border-[#32c788] text-[#32c788] hover:bg-[#32c788] hover:text-black transition-all duration-300">
              <Copy size={16} className="mr-2" />
              {copied ? 'Copied!' : 'Copy Email'}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
