import React, { useState } from 'react';
import { BET_OPTIONS, MIN_MINES, MAX_MINES } from '../constants/gameConfig';
import DepositModal from './DepositModal';

const Controls = ({ 
  gameState,
  onMinesChange, 
  onBetChange,
  onStartGame,
  onDeposit,
  onRandomPick,
  onCashOut,
}) => {
  const [showDepositModal, setShowDepositModal] = useState(false);
  const { minesCount, betAmount, balance, gameStarted, gameActive, revealedTiles, gameLost, cashoutAmount } = gameState;

  const handleDeposit = (amount) => {
    onDeposit(amount);
  };

  const isBetOptionDisabled = (amount) => {
    return amount > balance;
  };

  const sliderProgress = ((minesCount - MIN_MINES) / (MAX_MINES - MIN_MINES)) * 100;

  return (
    <>
      <DepositModal 
        isOpen={showDepositModal} 
        onClose={() => setShowDepositModal(false)} 
        onDeposit={handleDeposit} 
      />
      
      <div className="bg-gray-800 rounded-xl p-4 md:p-6 space-y-4 md:space-y-6 w-full">
        <div>
          <label className="text-gray-400 text-sm md:text-base mb-2 md:mb-3 block">Amount</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {BET_OPTIONS.map(amount => (
              <button
                key={amount}
                onClick={() => onBetChange(amount)}
                disabled={isBetOptionDisabled(amount)}
                className={`py-2 md:py-3 rounded-lg font-semibold transition-all text-sm md:text-base ${
                  betAmount === amount && !gameStarted
                    ? 'gradient-btn text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                } ${isBetOptionDisabled(amount) ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {amount >= 1000 ? `${amount/1000}k` : amount}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-gray-400 text-sm md:text-base mb-2 md:mb-3 block">Mines</label>
          <div className="flex items-center gap-2 md:gap-3">
            <span className="text-white font-bold text-sm md:text-base">{MIN_MINES}</span>
            <input
              type="range"
              min={MIN_MINES}
              max={MAX_MINES}
              value={minesCount}
              onChange={(e) => onMinesChange(parseInt(e.target.value))}
              className="flex-1 h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer range-slider"
              disabled={gameStarted}
              style={{
                background: `linear-gradient(90deg, #7717ff ${sliderProgress}%, #374151 ${sliderProgress}%)`
              }}
            />
            <span className="text-white font-bold text-sm md:text-base">{MAX_MINES}</span>
          </div>
          <div className="text-center text-purple-400 font-bold mt-2 md:mt-3 text-xl md:text-2xl">{minesCount}</div>
        </div>

        {gameStarted && (
          <div className="space-y-2 md:space-y-3">
            <button
              onClick={onRandomPick}
              className="w-full bg-purple-600 py-2 md:py-3 rounded-lg text-white font-semibold text-sm md:text-base hover:bg-purple-700 transition-all"
              disabled={!gameActive}
            >
              Pick a Tile Randomly
            </button>
            <button
              onClick={onCashOut}
              className="w-full gradient-btn py-2 md:py-3 rounded-lg text-white font-bold text-lg md:text-xl"
              disabled={!gameActive}
            >
              Cash out ₹{cashoutAmount.toFixed(2)}
            </button>
          </div>
        )}

        {!gameStarted && (
          <button
            onClick={() => onStartGame(minesCount, betAmount)}
            className="w-full gradient-btn py-2 md:py-3 rounded-lg text-white font-bold text-lg md:text-xl"
            disabled={betAmount > balance}
          >
            Bet {betAmount}
          </button>
        )}

        <div className="text-center text-gray-500 text-xs md:text-sm">
          Betting with ₹0 will enter demo mode.
        </div>

        <div className="pt-3 md:pt-4">
          <div className="text-center mb-2 md:mb-3">
            <span className="text-2xl md:text-3xl font-bold text-white">₹{balance.toFixed(2)}</span>
          </div>
          <button
            onClick={() => setShowDepositModal(true)}
            className="w-full gradient-btn py-2 md:py-3 rounded-lg text-white font-bold text-base md:text-lg"
          >
            Deposit
          </button>
          {gameLost && (
            <div className="mt-2 md:mt-3 text-center text-red-500 font-semibold text-sm md:text-base">
              Game Over! You hit a mine!
            </div>
          )}
          {revealedTiles.length === (25 - minesCount) && revealedTiles.length > 0 && !gameLost && (
            <div className="mt-2 md:mt-3 text-center text-green-500 font-semibold text-sm md:text-base">
              You won! 🎉
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Controls;