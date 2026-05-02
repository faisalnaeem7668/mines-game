import React, { useEffect } from 'react';
import diamondImg from '../assets/diamond.webp';

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
      <div className="bg-linear-to-br from-gray-800 to-gray-900 rounded-2xl p-8 max-w-sm w-full mx-4 shadow-2xl border border-purple-500">
        <div className="text-center space-y-3">
          <div className="text-3xl font-bold text-yellow-400">
            YOU WON!
          </div>
          
          <div className="flex items-center justify-center gap-2 my-3">
            <img src={diamondImg} alt="diamond" className="w-6 h-6 object-contain" />
            <span className="text-2xl font-bold text-purple-400">{multiplier}x</span>
            <img src={diamondImg} alt="diamond" className="w-6 h-6 object-contain" />
          </div>
          
          <div className="text-2xl font-bold text-white">
            ₹{winAmount.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WinDialog;