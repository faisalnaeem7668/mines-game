import React from 'react';
import Tile from './Tile';

const GameBoard = ({ tiles, onRevealTile, gameActive }) => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="bg-[#1a1d22] p-4 md:p-5 rounded-xl inline-block">
        <div className="grid grid-cols-5 gap-2 md:gap-2.5">
          {tiles.map((tile, index) => (
            <Tile
              key={index}
              tile={tile}
              index={index}
              onReveal={onRevealTile}
              gameActive={gameActive}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameBoard;