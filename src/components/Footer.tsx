'use client';

import React from 'react';

export default function Footer() {
    return (
        <footer className="bg-[#1a1a1a] border-t border-gray-800 py-8">
            <div className="container mx-auto px-6 text-center text-gray-400">
                <p>&copy; {new Date().getFullYear()} Made with NextJS, Tailwind, Gsap and ❤️ by Zakaria Bhaibi. All Rights Reserved.</p>
            </div>
        </footer>
    );
};
