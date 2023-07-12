import React, { createContext } from 'react';
import { useGame } from './hooks/useGame';

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const game = useGame();

  return <GameContext.Provider value={game}>{children}</GameContext.Provider>;
};
