import React, { useState, useEffect } from 'react';

interface TypewriterProps {
  text: string[];
  speed?: number;
  className?: string;
  waitTime?: number;
  deleteSpeed?: number;
  cursorChar?: string;
}

export const Typewriter: React.FC<TypewriterProps> = ({
  text,
  speed = 70,
  className = '',
  waitTime = 1500,
  deleteSpeed = 40,
  cursorChar = '_',
}) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const type = () => {
      const currentWord = text[currentIndex];

      if (isWaiting) {
        timeout = setTimeout(() => {
          setIsWaiting(false);
          setIsDeleting(true);
        }, waitTime);
        return;
      }

      if (isDeleting) {
        setCurrentText(prev => prev.slice(0, -1));
        
        if (currentText === '') {
          setIsDeleting(false);
          setCurrentIndex(prev => (prev + 1) % text.length);
        }
        
        timeout = setTimeout(type, deleteSpeed);
      } else {
        if (currentText === currentWord) {
          setIsWaiting(true);
        } else {
          setCurrentText(currentWord.slice(0, currentText.length + 1));
        }
        
        timeout = setTimeout(type, speed);
      }
    };

    timeout = setTimeout(type, speed);

    return () => clearTimeout(timeout);
  }, [currentText, currentIndex, isDeleting, isWaiting, text, speed, deleteSpeed, waitTime]);

  return (
    <span className={className}>
      {currentText}
      <span className="animate-pulse">{cursorChar}</span>
    </span>
  );
};