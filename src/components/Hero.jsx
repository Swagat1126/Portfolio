import React from 'react';
import TextType from './TextType';
import Lightning from './Lightning';

const Hero = () => {
    return (
        <section className="bg-black text-white min-h-screen flex items-center justify-center relative overflow-hidden">

            <Lightning
                hue={200}
                xOffset={0.0}
                speed={0.5}
                intensity={0.7}
                size={0.8}
            />

            <div className="max-w-6xl w-full mx-auto px-4 grid md:grid-cols-2 gap-8 items-center relative z-10">

                <div className="md:h-48">
                    <TextType
                        as="h1"
                        className="text-5xl  md:text-7xl font-extrabold leading-tight mb-4"
                        text={[
                            'A Creative Problem-Solver.',
                            'I Build Modern Web Apps.',
                            'An Aspiring Software Engineer.',
                            'Turning Ideas into Reality.',
                        ]}
                        typingSpeed={70}
                        deletingSpeed={40}
                        pauseDuration={1500}
                        loop={true}
                        textColors={['#FFFFFF', '#f97316']}
                        cursorClassName="text-accent"
                    />
                </div>
            </div>
        </section>
    );
};

export default Hero;