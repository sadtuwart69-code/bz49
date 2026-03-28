import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface RitualProps {
  onComplete: () => void;
}

export const Ritual: React.FC<RitualProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 50);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-charcoal">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative flex items-center justify-center"
      >
        <div className="w-64 h-64 rounded-full border-2 border-gold/20 flex items-center justify-center ritual-breathing">
          <div className="w-48 h-48 rounded-full border-4 border-gold/40" />
        </div>
        <div className="absolute text-center">
          <h2 className="gold-text text-2xl mb-2">静心凝神</h2>
          <p className="text-gold/60 text-sm tracking-widest">FOCUS ON YOUR INTENT</p>
        </div>
      </motion.div>
      
      <div className="mt-12 w-48 h-1 bg-gold/10 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-gold"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
