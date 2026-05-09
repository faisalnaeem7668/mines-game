import React, { useEffect, useRef } from 'react';
import crackerImg from '../assets/cracker.webp';
import flagImg from '../assets/flag.webp';
import starsImg from '../assets/stars.webp';
import winSound from '../assets/you_won.mp3';

const WinDialog = ({ isOpen, onClose, multiplier, winAmount }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (isOpen) {

      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(err => console.log('Audio play failed:', err));
      }

      const timer = setTimeout(() => {
        onClose();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <audio ref={audioRef} src={winSound} preload="auto" />
      <div className="bg-[#23272c] rounded-2xl p-4 w-64 mx-4 shadow-2xl border-4 border-[#2d353e]">
        <div className="text-center space-y-3">
          <img src={crackerImg} alt="cracker" className="w-64 h- object-contain mx-auto" />

          <div className="flex items-center justify-center gap-2 my-3">
            <img src={starsImg} alt="diamond" className="w-12 h-12 object-contain" />
            <span className="px-2 text-2xl font-bold text-[#7717ff]">{multiplier}x</span>
            <img src={starsImg} alt="diamond" className="w-12 h-12 object-contain"  style={{ transform: 'scaleX(-1)' }}  />
          </div>

          <div className="bg-[#2d353e] rounded-xl py-3 px-6 w-full inline-block">
           
          <span className="text-xl text-white">
              ₹{Math.round(winAmount)} <img src={flagImg} alt="flag" className="w-5 h-5 object-contain inline-block" />
            </span>

          </div>
        </div>
      </div>
    </div>
  );
};

export default WinDialog;