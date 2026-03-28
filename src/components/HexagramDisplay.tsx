import React from 'react';
import { Hexagram } from '../data/hexagrams';

interface HexagramDisplayProps {
  original: Hexagram;
  changed?: Hexagram;
  movingLines: number[]; // 1-indexed from bottom to top
}

export const HexagramDisplay: React.FC<HexagramDisplayProps> = ({ original, changed, movingLines }) => {
  const renderLines = (binary: string, isOriginal: boolean) => {
    return binary.split('').map((bit, index) => {
      const lineIndex = index + 1;
      const isMoving = movingLines.includes(lineIndex);
      
      return (
        <div key={index} className="relative group">
          {bit === '1' ? (
            // Yang line
            <div className={`w-32 h-3 rounded-full transition-all duration-500 ${
              isMoving 
                ? 'bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.8)]' 
                : 'bg-gold shadow-[0_0_5px_rgba(212,175,55,0.2)]'
            }`} />
          ) : (
            // Yin line
            <div className="flex gap-4">
              <div className={`w-14 h-3 rounded-full transition-all duration-500 ${
                isMoving 
                  ? 'bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.8)]' 
                  : 'bg-gold shadow-[0_0_5px_rgba(212,175,55,0.2)]'
              }`} />
              <div className={`w-14 h-3 rounded-full transition-all duration-500 ${
                isMoving 
                  ? 'bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.8)]' 
                  : 'bg-gold shadow-[0_0_5px_rgba(212,175,55,0.2)]'
              }`} />
            </div>
          )}
          {isMoving && (
            <div className="absolute -inset-2 bg-red-500/20 blur-xl rounded-full animate-pulse pointer-events-none" />
          )}
        </div>
      );
    }).reverse(); // Binary is bottom to top, so we reverse to show line 6 at the top
  };

  return (
    <div className="flex flex-col md:flex-row gap-16 items-start justify-center py-8">
      {/* Stage 1: Original */}
      <div className="flex flex-col items-center gap-8">
        <span className="text-gold/40 text-[10px] uppercase tracking-[0.3em] font-bold">ORIGINAL HEXAGRAM</span>
        <div className="flex flex-col gap-3">
          {renderLines(original.binary, true)}
        </div>
        <div className="mt-4 text-center">
          <h3 className="gold-text text-4xl font-serif tracking-[0.2em]">{original.name}</h3>
          <p className="text-gold/40 text-xs mt-4 max-w-[200px] leading-relaxed">{original.interpretation}</p>
        </div>
      </div>

      {movingLines.length > 0 && changed && (
        <>
          <div className="hidden md:flex h-64 items-center">
            <div className="w-[1px] h-full bg-gradient-to-b from-transparent via-gold/20 to-transparent" />
          </div>
          
          {/* Stage 3: Changed */}
          <div className="flex flex-col items-center gap-8">
            <span className="text-gold/40 text-[10px] uppercase tracking-[0.3em] font-bold">TRANSFORMED HEXAGRAM</span>
            <div className="flex flex-col gap-3">
              {renderLines(changed.binary, false)}
            </div>
            <div className="mt-4 text-center">
              <h3 className="gold-text text-4xl font-serif tracking-[0.2em]">{changed.name}</h3>
              <p className="text-gold/40 text-xs mt-4 max-w-[200px] leading-relaxed">{changed.interpretation}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
