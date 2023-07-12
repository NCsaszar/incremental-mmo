import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { GameProvider } from './GameContext';
import MainGame from './gameplay/MainGame';
import Sellitems from './gameplay/Sellitems';
import { Button, Box } from '@mui/material';

const App = () => {
  const btnstyle = {
    bgcolor: 'red',
    color: 'white',
    '&:hover': { backgroundColor: 'red' },
    mx: '5px',
  };

  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <Button sx={btnstyle}>Homepage</Button>
        <Button sx={btnstyle}>Mainpage</Button>
        <Button sx={btnstyle}>Sellpage</Button>
      </Box>
      <GameProvider>
        <Routes>
          <Route path="/game" element={<MainGame />} />
          <Route path="/" element={<Sellitems />} />
        </Routes>
      </GameProvider>
    </Router>
  );
};

export default App;
