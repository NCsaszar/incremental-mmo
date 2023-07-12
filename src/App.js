import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from 'react-router-dom';
import { GameProvider } from './GameContext';
import MainGame from './gameplay/MainGame';
import Sellitems from './gameplay/Sellitems';
import NavButtons from './NavigateButtons';

const App = () => {
  return (
    <Router>
      <NavButtons />
      <GameProvider>
        <Routes>
          <Route path="/game" element={<MainGame />} />
          <Route path="/sell" element={<Sellitems />} />
          <Route path="/" element={<Sellitems />} />
        </Routes>
      </GameProvider>
    </Router>
  );
};

export default App;
