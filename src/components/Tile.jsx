import React, { useEffect, useState } from 'react';
import diamondImg from '../assets/diamond.webp';
import mineImg from '../assets/mine.webp';
import explosionSprite from '../assets/mine_explosion.webp';

const Tile = ({ tile, index, onReveal, gameActive }) => {
  const [frame, setFrame] = useState(-1);

  useEffect(() => {
    if (tile.isRevealed && tile.isMine) {
      let currentFrame = 0;

      const interval = setInterval(() => {
        setFrame(currentFrame);
        currentFrame++;

        if (currentFrame >= 16) {
          clearInterval(interval);

          setTimeout(() => {
            setFrame(-1);
          }, 100);
        }
      }, 45);

      return () => clearInterval(interval);
    }
  }, [tile.isRevealed, tile.isMine]);

  const handleClick = () => {
    if (!gameActive) return;
    if (tile.isRevealed) return;
    onReveal(index);
  };

  const getTileContent = () => {
    if (!tile.isRevealed && !tile.showAfterLoss) {
      return (
        <div 
          onClick={handleClick}
          className="w-full h-full bg-[#272a30] rounded-lg shadow-lg flex items-center justify-center cursor-pointer transition-all duration-200"
        ></div>
      );
    }

    if (frame !== -1) {
      return (
        <div className="w-full h-full bg-[#272a30] rounded-lg overflow-hidden flex items-center justify-center">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url(${explosionSprite})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: '1600% 100%',
              backgroundPosition: `${frame * (100 / 15)}% 0%`,
            }}
          />
        </div>
      );
    }
 
    if (tile.isRevealed && tile.isMine) {
      return (
        <div className="w-full h-full bg-[#272a30] rounded-lg flex items-center justify-center p-2">
          <img src={mineImg} alt="mine" className="w-14 h-14 md:w-16 md:h-16 object-contain scale-110" />
        </div>
      );
    }
 
    if (tile.isRevealed && !tile.isMine) {
      return (
        <div className="w-full h-full bg-[#7d40cf] rounded-lg flex items-center justify-center p-2">
          <img src={diamondImg} alt="diamond" className="w-14 h-14 md:w-16 md:h-16 object-contain scale-110" />
        </div>
      );
    }

    if (tile.showAfterLoss && tile.isMine) {
      return (
        <div className="w-full h-full bg-[#272a30] rounded-lg flex items-center justify-center p-2 opacity-35">
          <img src={mineImg} alt="mine" className="w-10 h-10 md:w-12 md:h-12 object-contain opacity-40" />
        </div>
      );
    }


    return (
      <div className="w-full h-full bg-[#7d40cf] rounded-lg flex items-center justify-center p-2 opacity-35">
        <img src={diamondImg} alt="diamond" className="w-10 h-10 md:w-12 md:h-12 object-contain opacity-40" />
      </div>
    );
  };

  return (
    <div className="w-16 h-16 md:w-20 md:h-20 overflow-hidden">
      {getTileContent()}
    </div>
  );
};

export default Tile;