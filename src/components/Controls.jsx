import React, { useState } from 'react';
import { BET_OPTIONS, MIN_MINES, MAX_MINES } from '../constants/gameConfig';
import DepositModal from './DepositModal';
import flagImg from '../assets/flag.webp';

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
            <img src={flagImg} alt="flag" className="flag-icon" />
            <input
              type="number"
              value={betAmount || ''}
              placeholder="0"
              onChange={(e) => {
                const value = e.target.value;
                if (value === '') {
                  handleBetChange(0);
                } else {
                  handleBetChange(Number(value));
                }
              }}
              disabled={gameStarted}
              min={0}
              className="amount-input"
            />

            <div className="amount-controls">
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
                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                    <path d="M256 217.9L383 345c9.4 9.4 24.6 9.4 33.9 0 9.4-9.4 9.3-24.6 0-34L273 167c-9.1-9.1-23.7-9.3-33.1-.7L95 310.9c-4.7 4.7-7 10.9-7 17s2.3 12.3 7 17c9.4 9.4 24.6 9.4 33.9 0l127.1-127z"></path>
                  </svg>
                </button>

                <button
                  className="arrow-btn"
                  onClick={() => {
                    setShowMinMax(true);
                    handleBetChange(betAmount - 1);
                  }}
                  disabled={gameStarted}
                >
                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                    <path d="M256 294.1L383 167c9.4-9.4 24.6-9.4 33.9 0s9.3 24.6 0 34L273 345c-9.1 9.1-23.7 9.3-33.1.7L95 201.1c-4.7-4.7-7-10.9-7-17s2.3-12.3 7-17c9.4-9.4 24.6-9.4 33.9 0l127.1 127z"></path>
                  </svg>
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
                {amount >= 1000 ? `${amount / 1000}.0k` : amount}
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
            <span className="slider-min-label">{MAX_MINES}</span>
          </div>
        </div>

        {!gameStarted && (
          <button
            onClick={handleGameStart}
            className="gradient-btn"
            disabled={betAmount <= 0 || betAmount > balance}
          >
            Bet
          </button>
        )}

        {gameStarted && (
          <div className="game-buttons-container">
            <button onClick={onRandomPick} disabled={!gameActive} className="random-pick-btn">
              Pick a Tile Randomly
            </button>
            <button onClick={onCashOut} disabled={!gameActive} className="gradient-btn cashout-btn">
              Cash out{' '}
              <img src={flagImg} alt="flag" className="flag-icon-inline" />
              {' '}₹{Math.round(cashoutAmount)}
            </button>
          </div>
        )}

        <div className="demo-notice">
          <div className="info-icon">i</div>
          <span>Betting with $0 will enter demo mode.</span>
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