import React from 'react';
import { useMinesGame } from './hooks/useMinesGame';
import { GameBoard, Controls, WinDialog } from './components';

function App() {
  const {
    gameState,
    setCustomAmount,
    initializeGame,
    revealTile,
    cashOut,
    closeWinDialog,
    randomTilePick,
    updateBetAmount,
    updateMinesCount,
    depositMoney,
  } = useMinesGame();

  const handleStartGame = (minesCount, betAmount) => {
    initializeGame(minesCount, betAmount);
  };

  const extendedGameState = {
    ...gameState,
    setCustomAmount,
  };

  return (
    <div className="page">
      <div className="game-container">
        <div className="controls-col">
          <Controls
            gameState={extendedGameState}
            onMinesChange={updateMinesCount}
            onBetChange={updateBetAmount}
            onStartGame={handleStartGame}
            onRandomPick={randomTilePick}
            onCashOut={cashOut}
            onDeposit={depositMoney}
          />
        </div>

        <div className="board-col">
          <GameBoard
            tiles={gameState.tiles}
            onRevealTile={revealTile}
            gameActive={gameState.gameActive}
          />
        </div>

      </div>
      
      <WinDialog
        isOpen={gameState.showWinDialog}
        onClose={closeWinDialog}
        multiplier={gameState.lastWinMultiplier}
        winAmount={gameState.lastWinAmount}
      />
    </div>
  );
}

export default App;