
import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Contact = () => {
    return (
        <section id="contact" className="py-20 bg-black text-white">
            <div className="max-w-6xl mx-auto px-4 text-center">
                <h2 className="text-4xl font-bold mb-4">Let's Work Together!</h2>
                <p className="text-gray-400 mb-10">Have a project in mind or just want to connect? Send me a message.</p>

                <div className="max-w-2xl mx-auto p-8 border border-gray-800 rounded-lg bg-[#111111] shadow-lg shadow-accent/10">
                    <form action="#" method="POST" className="space-y-6">
                        <input type="text" placeholder="Your Name" className="w-full bg-gray-800 text-white p-3 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent" />
                        <input type="email" placeholder="Your Email" className="w-full bg-gray-800 text-white p-3 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent" />
                        <textarea placeholder="Your Message" rows="5" className="w-full bg-gray-800 text-white p-3 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent"></textarea>
                        <button type="submit" className="w-full bg-accent hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-md transition duration-300">
                            Send Message
                        </button>
                    </form>
                </div>


                <div className="mt-12 flex justify-center space-x-6 text-2xl">
                    <a href="https://github.com/Swagat1126" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent"><FaGithub /></a>
                    <a href="https://linkedin.com/in/SwagatKoreti" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent"><FaLinkedin /></a>
                </div>
            </div>
        </section>
    );
};

export default Contact;