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
    <div className="min-h-screen bg-[#000000] p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:grid md:grid-cols-3 gap-4 md:gap-6">
          <div className="md:col-span-1 w-full">
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
          
          <div className="md:col-span-2 w-full">
            <GameBoard
              tiles={gameState.tiles}
              onRevealTile={revealTile}
              gameActive={gameState.gameActive}
            />
          </div>
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