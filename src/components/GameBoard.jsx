import React from 'react';
import Tile from './Tile';

const GameBoard = ({ tiles, onRevealTile, gameActive, gameLost }) => {
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
              gameLost={gameLost}
            />
          ))}
      </div>
    </div>
  );
};

export default GameBoard;