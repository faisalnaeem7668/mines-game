import { useState, useCallback } from 'react';
import { TOTAL_TILES, DEFAULT_MINES } from '../constants/gameConfig';

const createEmptyGrid = () => {
  const grid = [];
  for (let i = 0; i < TOTAL_TILES; i++) {
    grid.push({ isRevealed: false, isMine: false });
  }
  return grid;
};

export const useMinesGame = () => {
  const [gameState, setGameState] = useState({
    tiles: createEmptyGrid(),
    minesCount: DEFAULT_MINES,
    betAmount: 0,
    customAmount: '',
    balance: 10000,
    gameActive: false,
    gameStarted: false,
    gameLost: false,
    revealedTiles: [],
    cashoutAmount: 0,
    currentWinMultiplier: 1,
    showWinDialog: false,
    lastWinAmount: 0,
    lastWinMultiplier: 1,
  });

  const setCustomAmount = useCallback((amount) => {
    setGameState(prev => ({ ...prev, customAmount: amount }));
  }, []);

  const initializeGame = useCallback((minesCount, betAmount) => {
    if (betAmount > gameState.balance) {
      alert('Insufficient balance! Please deposit more.');
      return false;
    }
    
    const newBalance = gameState.balance - betAmount;
    const newTiles = [];
    
    for (let i = 0; i < TOTAL_TILES; i++) {
      newTiles.push({ isRevealed: false, isMine: false });
    }
    
    let minesPlaced = 0;
    while (minesPlaced < minesCount) {
      const randomIndex = Math.floor(Math.random() * TOTAL_TILES);
      if (!newTiles[randomIndex].isMine) {
        newTiles[randomIndex].isMine = true;
        minesPlaced++;
      }
    }
    
    setGameState(prev => ({
      ...prev,
      tiles: newTiles,
      minesCount,
      betAmount: betAmount,
      balance: newBalance,
      gameActive: true,
      gameStarted: true,
      gameLost: false,
      revealedTiles: [],
      cashoutAmount: 0,
      currentWinMultiplier: 1,
      showWinDialog: false,
    }));
    
    return true;
  }, [gameState.balance]);

  const revealTile = useCallback((index) => {
    setGameState(prev => {
      if (!prev.gameActive) return prev;
      if (prev.tiles[index].isRevealed) return prev;
      
      const newTiles = [...prev.tiles];
      const tile = { ...newTiles[index] };
      
      if (tile.isMine) {
        tile.isRevealed = true;
        newTiles[index] = tile;
        
        for (let i = 0; i < newTiles.length; i++) {
          if (newTiles[i].isMine && !newTiles[i].isRevealed) {
            newTiles[i] = { ...newTiles[i], isRevealed: true };
          }
        }
        
        return {
          ...prev,
          tiles: newTiles,
          gameActive: false,
          gameStarted: false,
          gameLost: true,
        };
      }
      
      tile.isRevealed = true;
      newTiles[index] = tile;
      
      const newRevealedTiles = [...prev.revealedTiles, index];
      const safeTilesFound = newRevealedTiles.length;
      const totalSafeTiles = TOTAL_TILES - prev.minesCount;
      const multiplier = 1 + (safeTilesFound * 0.15);
      const newCashout = prev.betAmount * multiplier;
      
      if (safeTilesFound === totalSafeTiles) {
        const winAmount = prev.betAmount * multiplier;
        const newBalance = prev.balance + winAmount;
        
        return {
          ...prev,
          tiles: newTiles,
          balance: newBalance,
          gameActive: false,
          gameStarted: false,
          gameLost: false,
          revealedTiles: newRevealedTiles,
          cashoutAmount: winAmount,
          currentWinMultiplier: multiplier,
          showWinDialog: true,
          lastWinAmount: winAmount,
          lastWinMultiplier: multiplier,
        };
      }
      
      return {
        ...prev,
        tiles: newTiles,
        revealedTiles: newRevealedTiles,
        cashoutAmount: newCashout,
        currentWinMultiplier: multiplier,
      };
    });
  }, []);

  const cashOut = useCallback(() => {
    setGameState(prev => {
      if (!prev.gameActive) return prev;
      
      const newBalance = prev.balance + prev.cashoutAmount;
      const emptyGrid = createEmptyGrid();
      
      return {
        ...prev,
        tiles: emptyGrid,
        balance: newBalance,
        gameActive: false,
        gameStarted: false,
        gameLost: false,
        revealedTiles: [],
        cashoutAmount: 0,
        currentWinMultiplier: 1,
        showWinDialog: true,
        lastWinAmount: prev.cashoutAmount,
        lastWinMultiplier: prev.currentWinMultiplier,
      };
    });
  }, []);

  const closeWinDialog = useCallback(() => {
    setGameState(prev => ({ ...prev, showWinDialog: false }));
  }, []);

  const randomTilePick = useCallback(() => {
    if (!gameState.gameActive) return;
    
    const unrevealedTiles = [];
    for (let i = 0; i < gameState.tiles.length; i++) {
      if (!gameState.tiles[i].isRevealed) {
        unrevealedTiles.push(i);
      }
    }
    
    if (unrevealedTiles.length > 0) {
      const randomIndex = unrevealedTiles[Math.floor(Math.random() * unrevealedTiles.length)];
      revealTile(randomIndex);
    }
  }, [gameState.gameActive, gameState.tiles, revealTile]);

  const updateBetAmount = useCallback((amount) => {
    setGameState(prev => ({
      ...prev,
      betAmount: amount,
      customAmount: '',
    }));
  }, []);

  const updateMinesCount = useCallback((mines) => {
    setGameState(prev => ({ ...prev, minesCount: mines }));
  }, []);

  const depositMoney = useCallback((amount) => {
    setGameState(prev => ({ ...prev, balance: prev.balance + amount }));
  }, []);

  return {
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
  };
};