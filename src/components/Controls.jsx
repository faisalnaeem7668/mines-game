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
  const [showMinMax, setShowMinMax] = useState(false);

  const { minesCount, betAmount, balance, gameStarted, gameActive, revealedTiles, gameLost, cashoutAmount } = gameState;

  const handleDeposit = (amount) => {
    onDeposit(amount);
  };

  const isBetOptionDisabled = (amount) => {
    return amount > balance;
  };

  const minesSliderProgress = ((minesCount - MIN_MINES) / (MAX_MINES - MIN_MINES)) * 100;
  const betSliderProgress = balance > 0 ? (betAmount / balance) * 100 : 0;

  const handleBetChange = (value) => {
    onBetChange(Math.max(0, Math.min(balance, value)));
  };

  const handleGameStart = () => {
    onStartGame(minesCount, betAmount);
    setShowMinMax(false);
  };

  return (
    <>
      <DepositModal 
        isOpen={showDepositModal} 
        onClose={() => setShowDepositModal(false)} 
        onDeposit={handleDeposit} 
      />

      <div className="controls-container">

        <div>
          <div className="amount-label">
            <label className="amount-label-text">Amount</label>
            <div className="amount-info-icon">i</div>
          </div>

          <div className="amount-input-container">
            <span className="flag">🇮🇳</span>
            <input
              type="number"
              value={betAmount}
              onChange={(e) => handleBetChange(Number(e.target.value))}
              disabled={gameStarted}
              min={0}
            />

            <div className="amount-controls">
              <button onClick={() => handleBetChange(0)} disabled={gameStarted} className="amount-ctrl-btn">0</button>
              <button onClick={() => handleBetChange(Math.floor(betAmount / 2))} disabled={gameStarted} className="amount-ctrl-btn">1/2</button>
              <button onClick={() => handleBetChange(betAmount * 2)} disabled={gameStarted} className="amount-ctrl-btn">2×</button>

              <div className="arrow-btn-group">
                <button
                  className="arrow-btn"
                  onClick={() => {
                    setShowMinMax(true);
                    handleBetChange(betAmount + 1);
                  }}
                  disabled={gameStarted}
                >
                  ▲
                </button>

                <button
                  className="arrow-btn"
                  onClick={() => {
                    setShowMinMax(true);
                    handleBetChange(betAmount - 1);
                  }}
                  disabled={gameStarted}
                >
                  ▼
                </button>
              </div>
            </div>
          </div>

          {showMinMax && (
            <div className="bet-slider-container">
              <span className="bet-slider-label">Min</span>
              <input
                type="range"
                min={0}
                max={balance}
                value={betAmount}
                disabled={gameStarted}
                onChange={(e) => handleBetChange(Number(e.target.value))}
                className="bet-slider"
                style={{
                  background: `linear-gradient(90deg, #8b22ff ${betSliderProgress}%, #2a2d3a ${betSliderProgress}%)`
                }}
              />
              <span className="bet-slider-label">Max</span>
            </div>
          )}

          <div className="preset-grid">
            {BET_OPTIONS.map(amount => (
              <button
                key={amount}
                onClick={() => handleBetChange(amount)}
                disabled={isBetOptionDisabled(amount) || gameStarted}
                className={`preset-btn ${betAmount === amount && !gameStarted ? 'preset-btn-active' : 'preset-btn-inactive'}`}
              >
                {amount >= 1000 ? `${amount/1000}.0k` : amount}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="amount-label-text" style={{ marginBottom: 10, display: 'block' }}>Mines</label>

          <div className="slider-container">
            <span className="slider-min-label">{minesCount}</span>
            <input
              type="range"
              min={MIN_MINES}
              max={MAX_MINES}
              value={minesCount}
              onChange={(e) => onMinesChange(parseInt(e.target.value))}
              disabled={gameStarted}
              className="mines-slider"
              style={{
                background: `linear-gradient(90deg, #8b22ff ${minesSliderProgress}%, #2a2d3a ${minesSliderProgress}%)`
              }}
            />
            <span className="slider-max-label">{MAX_MINES}</span>
          </div>
        </div>

        {!gameStarted && (
          <button onClick={handleGameStart} className="gradient-btn" disabled={betAmount > balance}>
            Bet
          </button>
        )}

        {gameStarted && (
          <div className="game-buttons-container">
            <button onClick={onRandomPick} disabled={!gameActive} className="random-pick-btn">
              Pick a Tile Randomly
            </button>
            <button onClick={onCashOut} disabled={!gameActive} className="gradient-btn cashout-btn">
              Cash out 🇮🇳 ₹{cashoutAmount.toFixed(2)}
            </button>
          </div>
        )}

        <div className="demo-notice">
          <div className="info-icon">i</div>
          <span>Betting with ₹0 will enter demo mode.</span>
        </div>

        <div className="balance-row">
          <span>₹{balance.toFixed(2)}</span>
          <button onClick={() => setShowDepositModal(true)} className="gradient-btn deposit-btn">
            Deposit
          </button>
        </div>
      </div>
    </>
  );
};

export default Controls;