import React from 'react';

import MagicBento from './MagicBento';




const Projects = () => {

    const orangeGlowColor = '249, 115, 22';

    return (
        <section id="projects" className="py-20 bg-black text-white flex flex-col items-center">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-2">PROJECTS</h2>
                <p className="text-gray-500">A selection of my best work. Hover over the cards for an effect.</p>
            </div>


            <MagicBento
                glowColor={orangeGlowColor}
                enableTilt={true}
            />
        </section>
    );
};

export default Projects;