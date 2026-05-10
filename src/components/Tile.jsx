import React from 'react';
import diamondImg from '../assets/diamond.webp';
import mineImg from '../assets/mine.webp';

const Tile = ({ tile, index, onReveal, gameActive, gameLost }) => {
  const handleClick = () => {
    if (!gameActive) return;
    if (tile.isRevealed) return;
    onReveal(index);
  };

  const getTileContent = () => {
    if (!tile.isRevealed && !gameLost) {
      return (
        <div 
          onClick={handleClick}
          className="w-full h-full bg-[#272a30] rounded-lg shadow-lg flex items-center justify-center cursor-pointer transition-all duration-200"
        >
        </div>
      );
    }
   
    if (tile.isRevealed && tile.isMine) {
      return (
        <div className="w-full h-full bg-[#272a30] rounded-lg flex items-center justify-center p-2">
          <img src={mineImg} alt="mine" className="w-10 h-10 md:w-12 md:h-12 object-contain" />
        </div>
      );
    }
    
    if (tile.isRevealed && !tile.isMine) {
      return (
        <div className="w-full h-full bg-[#7d40cf] rounded-lg flex items-center justify-center p-2">
          <img src={diamondImg} alt="diamond" className="w-10 h-10 md:w-12 md:h-12 object-contain" />
        </div>
      );
    }

    if (!tile.isRevealed && tile.isMine && gameLost) {
      return (
        <div className="w-full h-full bg-[#272a30] rounded-lg flex items-center justify-center p-2 opacity-35">
          <img src={mineImg} alt="mine" className="w-10 h-10 md:w-12 md:h-12 object-contain opacity-40" />
        </div>
      );
    }

    if (!tile.isRevealed && !tile.isMine && gameLost) {
      return (
        <div className="w-full h-full bg-[#7d40cf] rounded-lg flex items-center justify-center p-2 opacity-35">
          <img src={diamondImg} alt="diamond" className="w-10 h-10 md:w-12 md:h-12 object-contain opacity-40" />
        </div>
      );
    }

    return null;
  };

  return (
    <div className="w-16 h-16 md:w-20 md:h-20">
      {getTileContent()}
    </div>
  );
};

export default Tile;