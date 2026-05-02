import React from 'react';
import diamondImg from '../assets/diamond.webp';
import mineImg from '../assets/mine.webp';

const Tile = ({ tile, index, onReveal, gameActive }) => {
  const handleClick = () => {
    if (!gameActive) return;
    if (tile.isRevealed) return;
    onReveal(index);
  };

  const getTileContent = () => {
    if (!tile.isRevealed) {
      return (
        <div 
          onClick={handleClick}
          className="w-full h-full bg-gray-800 rounded-lg shadow-lg flex items-center justify-center cursor-pointer transition-all duration-200 "
        >
        </div>
      );
    }
    
    if (tile.isMine) {
      return (
        <div className="w-full h-full bg-gray-800 rounded-lg flex items-center justify-center p-2">
          <img src={mineImg} alt="mine" className="w-14 h-14 object-contain" />
        </div>
      );
    }
    
    return (
      <div className="w-full h-full bg-[#7d40cf] rounded-lg flex items-center justify-center p-2">
        <img src={diamondImg} alt="diamond" className="w-14 h-14 object-contain" />
      </div>
    );
  };

  return (
    <div className="aspect-square w-full">
      {getTileContent()}
    </div>
  );
};

export default Tile;