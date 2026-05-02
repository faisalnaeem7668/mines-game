import React from 'react';
import Tile from './Tile';

const GameBoard = ({ tiles, onRevealTile, gameActive }) => {
  return (
    <div className="bg-gray-900/30 p-3 md:p-4 rounded-xl h-full">
      <div className="grid grid-cols-5 gap-1.5 md:gap-2">
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
  );
};

export default GameBoard;