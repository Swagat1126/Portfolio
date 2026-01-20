
import React from 'react';

const Navbar = () => {
    return (
        <nav className="bg-black bg-opacity-50 backdrop-blur-md fixed w-full top-0 z-10">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <span className="text-2xl text-white font-bold">Swagat Koreti</span>
                    <div className="hidden md:flex items-center space-x-6 text-gray-300">
                        <a href="#about" className="hover:text-accent transition">About</a>
                        <a href="#projects" className="hover:text-accent transition">Projects</a>
                        <a href="#contact" className="bg-accent hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300">
                            Let's Talk
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;