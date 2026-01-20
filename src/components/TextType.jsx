import React, { useState, useEffect, useRef, useMemo, createElement } from 'react';
import { gsap } from 'gsap';

const TextType = ({
    text,
    as: Component = 'div',
    typingSpeed = 50,
    initialDelay = 0,
    pauseDuration = 2000,
    deletingSpeed = 30,
    loop = true,
    className = '',
    showCursor = true,
    cursorClassName = '',
    cursorCharacter = '|',
    cursorBlinkDuration = 0.5,
    textColors = [],
    ...props
}) => {
    const [displayedText, setDisplayedText] = useState('');
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const cursorRef = useRef(null);

    const textArray = useMemo(() => (Array.isArray(text) ? text : [text]), [text]);

    const getCurrentTextColor = () => {
        if (textColors.length === 0) return 'inherit';
        return textColors[currentTextIndex % textColors.length];
    };

    useEffect(() => {
        if (showCursor && cursorRef.current) {
            gsap.to(cursorRef.current, {
                opacity: 0,
                duration: cursorBlinkDuration,
                repeat: -1,
                yoyo: true,
                ease: 'power2.inOut',
            });
        }
    }, [showCursor, cursorBlinkDuration]);

    useEffect(() => {
        let timeout;
        const currentText = textArray[currentTextIndex];

        const executeTypingAnimation = () => {
            if (isDeleting) {
                if (displayedText === '') {
                    setIsDeleting(false);
                    if (currentTextIndex === textArray.length - 1 && !loop) return;
                    setCurrentTextIndex((prev) => (prev + 1) % textArray.length);
                    setCurrentCharIndex(0);
                } else {
                    timeout = setTimeout(() => {
                        setDisplayedText((prev) => prev.slice(0, -1));
                    }, deletingSpeed);
                }
            } else {
                if (currentCharIndex < currentText.length) {
                    timeout = setTimeout(() => {
                        setDisplayedText((prev) => prev + currentText[currentCharIndex]);
                        setCurrentCharIndex((prev) => prev + 1);
                    }, typingSpeed);
                } else if (textArray.length > 1 || loop) {
                    timeout = setTimeout(() => {
                        setIsDeleting(true);
                    }, pauseDuration);
                }
            }
        };

        if (currentCharIndex === 0 && !isDeleting && displayedText === '') {
            timeout = setTimeout(executeTypingAnimation, initialDelay);
        } else {
            executeTypingAnimation();
        }

        return () => clearTimeout(timeout);
    }, [
        currentCharIndex,
        displayedText,
        isDeleting,
        typingSpeed,
        deletingSpeed,
        pauseDuration,
        textArray,
        currentTextIndex,
        loop,
        initialDelay,
    ]);

    return createElement(
        Component,
        { className: `inline-block whitespace-pre-wrap tracking-tight ${className}`, ...props },
        <span className="inline" style={{ color: getCurrentTextColor() }}>
            {displayedText}
        </span>,
        showCursor && (
            <span ref={cursorRef} className={`ml-1 inline-block opacity-100 ${cursorClassName}`}>
                {cursorCharacter}
            </span>
        )
    );
};

export default TextType;