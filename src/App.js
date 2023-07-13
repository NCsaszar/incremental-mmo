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
import { createTheme, ThemeProvider } from '@mui/material';

const App = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#61AFEF', // A color from the One Dark Pro theme
      },
      secondary: {
        main: '#ABB2BF', // Another color from the One Dark Pro theme
      },
      background: {
        default: '#282C34', // Default background color in One Dark Pro
        paper: '#3B4048', // Background color for "paper" surfaces, like cards
      },
      text: {
        primary: '#ABB2BF', // Primary text color
        secondary: '#5C6370', // Secondary text color
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            color: 'white',
            '&:hover': {
              color: 'white',
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: '#3B4048',
            color: '#ABB2BF',
          },
        },
      },
    },
  });

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <NavButtons />
        <GameProvider>
          <Routes>
            <Route path="/game" element={<MainGame />} />
            <Route path="/sell" element={<Sellitems />} />
            <Route path="/" element={<Sellitems />} />
          </Routes>
        </GameProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;
