import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { GameProvider } from './GameContext';
import MainGame from './gameplay/MainGame';

const App = () => {
  return (
    <GameProvider>
      <MainGame />
    </GameProvider>
  );
};

export default App;
