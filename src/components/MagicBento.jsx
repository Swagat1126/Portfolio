import React, { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';


const DEFAULT_PARTICLE_COUNT = 12;
const DEFAULT_SPOTLIGHT_RADIUS = 300;
const DEFAULT_GLOW_COLOR = '132, 0, 255';
const MOBILE_BREAKPOINT = 768;


const cardData = [
    {
        color: '#060010',
        title: 'AI-Powered Study Planner',
        description: 'Generates personalized study schedules using machine learning.',
        label: 'React & AI'
    },
    {
        color: '#060010',
        title: 'E-Commerce Backend API',
        description: 'A robust RESTful API with JWT authentication.',
        label: 'Node.js & API'
    },
    {
        color: '#060010',
        title: 'This Portfolio Website',
        description: 'Built with React, Vite, and Tailwind CSS, featuring advanced animations.',
        label: 'Frontend'
    },
    {
        color: '#060010',
        title: 'Data Visualization',
        description: 'Track user behavior and metrics.',
        label: 'Analytics'
    },
    {
        color: '#060010',
        title: 'Team Collaboration',
        description: 'Work together seamlessly.',
        label: 'Teamwork'
    },
    {
        color: '#060010',
        title: 'Workflow Automation',
        description: 'Streamline your workflows.',
        label: 'Efficiency'
    }
];


const createParticleElement = (x, y, color) => {
    const el = document.createElement('div');
    el.className = 'particle';
    el.style.cssText = `
    position: absolute; width: 4px; height: 4px; border-radius: 50%;
    background: rgba(${color}, 1); box-shadow: 0 0 6px rgba(${color}, 0.6);
    pointer-events: none; z-index: 100; left: ${x}px; top: ${y}px;
  `;
    return el;
};

const calculateSpotlightValues = radius => ({
    proximity: radius * 0.5,
    fadeDistance: radius * 0.75
});

const updateCardGlowProperties = (card, mouseX, mouseY, glow, radius) => {
    const rect = card.getBoundingClientRect();
    const relativeX = ((mouseX - rect.left) / rect.width) * 100;
    const relativeY = ((mouseY - rect.top) / rect.height) * 100;
    card.style.setProperty('--glow-x', `${relativeX}%`);
    card.style.setProperty('--glow-y', `${relativeY}%`);
    card.style.setProperty('--glow-intensity', glow.toString());
    card.style.setProperty('--glow-radius', `${radius}px`);
};




const ParticleCard = ({
    children,
    className = '',
    disableAnimations = false,
    style,
    particleCount = DEFAULT_PARTICLE_COUNT,
    glowColor = DEFAULT_GLOW_COLOR,
    enableTilt = true,
    clickEffect = false,
    enableMagnetism = false
}) => {
    const cardRef = useRef(null);
    const particlesRef = useRef([]);
    const timeoutsRef = useRef([]);
    const isHoveredRef = useRef(false);

    const clearAllParticles = useCallback(() => {
        timeoutsRef.current.forEach(clearTimeout);
        timeoutsRef.current = [];
        particlesRef.current.forEach(particle => {
            gsap.to(particle, {
                scale: 0, opacity: 0, duration: 0.3, ease: 'back.in(1.7)',
                onComplete: () => particle.parentNode?.removeChild(particle)
            });
        });
        particlesRef.current = [];
    }, []);

    const animateParticles = useCallback(() => {
        if (!cardRef.current || !isHoveredRef.current) return;
        const { width, height } = cardRef.current.getBoundingClientRect();

        for (let i = 0; i < particleCount; i++) {
            const timeoutId = setTimeout(() => {
                if (!isHoveredRef.current || !cardRef.current) return;
                const particle = createParticleElement(Math.random() * width, Math.random() * height, glowColor);
                cardRef.current.appendChild(particle);
                particlesRef.current.push(particle);

                gsap.fromTo(particle, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' });
                gsap.to(particle, {
                    x: (Math.random() - 0.5) * 100, y: (Math.random() - 0.5) * 100,
                    opacity: 0, scale: 0, duration: 1 + Math.random() * 2, ease: 'power2.out',
                    onComplete: () => particle.remove()
                });
            }, i * 50);
            timeoutsRef.current.push(timeoutId);
        }
    }, [particleCount, glowColor]);

    useEffect(() => {
        if (disableAnimations || !cardRef.current) return;
        const element = cardRef.current;

        const handleMouseEnter = () => {
            isHoveredRef.current = true;
            animateParticles();
        };

        const handleMouseLeave = () => {
            isHoveredRef.current = false;
            clearAllParticles();
        };



        element.addEventListener('mouseenter', handleMouseEnter);
        element.addEventListener('mouseleave', handleMouseLeave);
        return () => {
            isHoveredRef.current = false;
            element.removeEventListener('mouseenter', handleMouseEnter);
            element.removeEventListener('mouseleave', handleMouseLeave);
            clearAllParticles();
        };
    }, [animateParticles, clearAllParticles, disableAnimations, enableTilt, enableMagnetism, clickEffect, glowColor]);

    return (
        <div ref={cardRef} className={`${className} relative overflow-hidden`} style={style}>
            {children}
        </div>
    );
};


const GlobalSpotlight = ({ gridRef, disableAnimations = false, enabled = true, spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS, glowColor = DEFAULT_GLOW_COLOR }) => {
    useEffect(() => {
        if (disableAnimations || !gridRef?.current || !enabled) return;
        const spotlight = document.createElement('div');
        spotlight.style.cssText = `
      position: fixed; width: ${spotlightRadius * 2}px; height: ${spotlightRadius * 2}px;
      border-radius: 50%; pointer-events: none;
      background: radial-gradient(circle, rgba(${glowColor}, 0.1) 0%, transparent 70%);
      z-index: 1; opacity: 0; transform: translate(-50%, -50%); mix-blend-mode: screen;
    `;
        document.body.appendChild(spotlight);

        const handleMouseMove = e => {
            gsap.to(spotlight, {
                opacity: 1, left: e.clientX, top: e.clientY, duration: 0.2, ease: 'power2.out'
            });
        };
        document.addEventListener('mousemove', handleMouseMove);
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            spotlight.remove();
        };
    }, [gridRef, disableAnimations, enabled, spotlightRadius, glowColor]);

    return null;
};

const useMobileDetection = () => {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);
    return isMobile;
};


const MagicBento = ({
    enableStars = true,
    enableSpotlight = true,
    enableBorderGlow = true,
    glowColor = DEFAULT_GLOW_COLOR,
    enableTilt = true,
}) => {
    const gridRef = useRef(null);
    const isMobile = useMobileDetection();
    const shouldDisableAnimations = isMobile;

    return (
        <>
            <style>
                {`
          .bento-section .card {
            --glow-x: 50%; --glow-y: 50%; --glow-intensity: 0;
            --glow-color-rgb: ${glowColor};
            border-color: #392e4e;
          }
          .bento-section .card::after {
            content: ''; position: absolute; inset: 0;
            padding: 2px;
            background: radial-gradient(400px circle at var(--glow-x) var(--glow-y),
              rgba(var(--glow-color-rgb), 0.4) 0%, transparent 70%);
            border-radius: inherit;
            mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            mask-composite: xor;
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            pointer-events: none;
            opacity: var(--glow-intensity);
            transition: opacity 0.3s ease;
          }
        `}
            </style>

            {enableSpotlight && (
                <GlobalSpotlight gridRef={gridRef} disableAnimations={shouldDisableAnimations} glowColor={glowColor} />
            )}

            <div ref={gridRef} className="bento-section grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl w-full p-4">
                {cardData.map((card, index) => {
                    const CardComponent = enableStars ? ParticleCard : 'div';
                    return (
                        <CardComponent
                            key={index}
                            className="card flex flex-col justify-between relative min-h-[220px] w-full p-5 rounded-2xl border font-light overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-1"
                            style={{ backgroundColor: card.color }}
                            disableAnimations={shouldDisableAnimations}
                            glowColor={glowColor}
                            enableTilt={enableTilt}
                        >
                            <div className="flex justify-between items-center text-white">
                                <span className="text-base">{card.label}</span>
                            </div>
                            <div className="text-white">
                                <h3 className="text-xl font-semibold m-0 mb-1">{card.title}</h3>
                                <p className="text-sm leading-5 opacity-80">{card.description}</p>
                            </div>
                        </CardComponent>
                    );
                })}
            </div>
        </>
    );
};

export default MagicBento;