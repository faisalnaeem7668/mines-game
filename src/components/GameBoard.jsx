import React from 'react';
import Tile from './Tile';

const GameBoard = ({ tiles, onRevealTile, gameActive }) => {
  return (
    <div className="game-content-layout">
      <div className="grid-wrapper">
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