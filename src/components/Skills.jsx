// src/components/Skills.jsx
import React from 'react';
import { FaReact, FaPython, FaNodeJs, FaJava } from 'react-icons/fa';
import { SiTailwindcss, SiJavascript, SiMongodb } from 'react-icons/si';

const skills = [
    { icon: <FaReact size={40} />, name: 'React' },
    { icon: <SiJavascript size={40} />, name: 'JavaScript' },
    { icon: <FaJava size={40} />, name: 'Java' },
    { icon: <FaNodeJs size={40} />, name: 'Node.js' },
    { icon: <SiTailwindcss size={40} />, name: 'Tailwind CSS' },
    { icon: <SiMongodb size={40} />, name: 'MongoDB' },
];

const Skills = () => {
    return (
        <section id="skills" className="py-20 bg-gray-900 text-white">
            <div className="max-w-4xl mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-8">Skills & Expertise</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                    {skills.map((skill, index) => (
                        <div key={index} className="flex flex-col items-center justify-center bg-gray-800 p-6 rounded-lg hover:bg-cyan-900/50 transition duration-300">
                            <div className="text-cyan-400 mb-2">{skill.icon}</div>
                            <h3 className="text-xl font-semibold">{skill.name}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;