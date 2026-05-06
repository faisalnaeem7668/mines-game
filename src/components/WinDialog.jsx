import React, { useEffect } from 'react';
import diamondImg from '../assets/diamond.webp';
import crackerImg from '../assets/cracker.webp';

const WinDialog = ({ isOpen, onClose, multiplier, winAmount }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-[#23272c] rounded-2xl p-4 w-64 mx-4 shadow-2xl border-4 border-[#2d353e]">
        <div className="text-center space-y-3">
          <img src={crackerImg} alt="cracker" className="w-64 h- object-contain mx-auto" />

          <div className="flex items-center justify-center gap-2 my-3">
            <img src={diamondImg} alt="diamond" className="w-6 h-6 object-contain" />
            <span className="text-2xl font-bold text-purple-400">{multiplier}x</span>
            <img src={diamondImg} alt="diamond" className="w-6 h-6 object-contain" />
          </div>

          <div className="bg-[#2d353e] rounded-xl py-3 px-6 w-full inline-block">
            <span className="text-xl text-white">
              ₹{Math.round(winAmount)} 🇮🇳
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WinDialog;