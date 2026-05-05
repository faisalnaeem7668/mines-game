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

  const sliderProgress = ((minesCount - MIN_MINES) / (MAX_MINES - MIN_MINES)) * 100;

  const handleBetChange = (value) => {
    onBetChange(value);
    setShowMinMax(true); // Show Min/Max buttons, stays visible
  };

  // Reset Min/Max visibility when game starts or resets
  const handleGameStart = () => {
    onStartGame(minesCount, betAmount);
    setShowMinMax(false); // Hide Min/Max when new game starts
  };

  return (
    <>
      <DepositModal 
        isOpen={showDepositModal} 
        onClose={() => setShowDepositModal(false)} 
        onDeposit={handleDeposit} 
      />
      
      <div style={{ background: '#13151f', borderRadius: 16, padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: 18, width: '100%' }}>
        {/* Amount Section */}
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
              <button className="amount-ctrl-btn" onClick={() => handleBetChange(0)} disabled={gameStarted}>0</button>
              <button className="amount-ctrl-btn" onClick={() => handleBetChange(Math.floor(betAmount / 2))} disabled={gameStarted}>1/2</button>
              <button className="amount-ctrl-btn" onClick={() => handleBetChange(betAmount * 2)} disabled={gameStarted}>2×</button>
              <div className="arrow-btn-group">
                <button className="arrow-btn" onClick={() => handleBetChange(betAmount + 1)} disabled={gameStarted}>▲</button>
                <button className="arrow-btn" onClick={() => handleBetChange(Math.max(0, betAmount - 1))} disabled={gameStarted}>▼</button>
              </div>
            </div>
          </div>

          {/* Min/Max Buttons - appear after using up/down arrows and stay visible */}
          {showMinMax && (
            <div style={{ display: 'flex', gap: 8, marginTop: 8, marginBottom: 8 }}>
              <button
                onClick={() => handleBetChange(0)}
                className="preset-btn-inactive"
                style={{ flex: 1, padding: '8px 0', borderRadius: 8, fontWeight: 600, cursor: 'pointer' }}
              >
                Min
              </button>
              <button
                onClick={() => handleBetChange(balance)}
                className="preset-btn-inactive"
                style={{ flex: 1, padding: '8px 0', borderRadius: 8, fontWeight: 600, cursor: 'pointer' }}
              >
                Max
              </button>
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

        {/* Mines Section */}
        <div>
          <label className="amount-label-text" style={{ display: 'block', marginBottom: 10 }}>Mines</label>
          <div className="slider-container">
            <span className="slider-min-label">{minesCount}</span>
            <input
              type="range"
              min={MIN_MINES}
              max={MAX_MINES}
              value={minesCount}
              onChange={(e) => onMinesChange(parseInt(e.target.value))}
              className="mines-slider"
              disabled={gameStarted}
              style={{
                flex: 1,
                background: `linear-gradient(90deg, #8b22ff ${sliderProgress}%, #2a2d3a ${sliderProgress}%)`
              }}
            />
            <span className="slider-max-label">{MAX_MINES}</span>
          </div>
        </div>

        {/* Bet Button */}
        {!gameStarted && (
          <button
            onClick={handleGameStart}
            className="gradient-btn"
            disabled={betAmount > balance}
            style={{ width: '100%', padding: '14px 0', borderRadius: 10, color: 'white', fontWeight: 700, fontSize: 18 }}
          >
            Bet
          </button>
        )}

        {/* Game Action Buttons */}
        {gameStarted && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <button
              onClick={onRandomPick}
              disabled={!gameActive}
              style={{
                width: '100%', padding: '12px 0', borderRadius: 10,
                background: '#6d28d9', color: 'white', fontWeight: 600, fontSize: 15,
                border: 'none', cursor: gameActive ? 'pointer' : 'not-allowed', opacity: gameActive ? 1 : 0.5,
              }}
            >
              Pick a Tile Randomly
            </button>
            <button
              onClick={onCashOut}
              disabled={!gameActive}
              className="gradient-btn"
              style={{ width: '100%', padding: '14px 0', borderRadius: 10, color: 'white', fontWeight: 700, fontSize: 18 }}
            >
              Cash out ₹{cashoutAmount.toFixed(2)}
            </button>
          </div>
        )}

        {/* Demo Mode Notice */}
        <div className="demo-notice">
          <div className="info-icon">i</div>
          <span>Betting with ₹0 will enter demo mode.</span>
        </div>

        {/* Balance and Deposit */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 28, fontWeight: 700, color: 'white' }}>₹{balance.toFixed(2)}</span>
          <button
            onClick={() => setShowDepositModal(true)}
            className="gradient-btn"
            style={{ padding: '10px 24px', borderRadius: 10, color: 'white', fontWeight: 700, fontSize: 16 }}
          >
            Deposit
          </button>
        </div>

        {/* Game Status Messages */}
        {gameLost && <div className="game-status-lost">Game Over! You hit a mine!</div>}
        {revealedTiles.length === (25 - minesCount) && revealedTiles.length > 0 && !gameLost && (
          <div className="game-status-won">You won! 🎉</div>
        )}
      </div>
    </>
  );
};

export default Controls;