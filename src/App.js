import React, { useEffect, useState, useContext } from 'react';
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
import ResourcePanel from './skills/ResourcePanel';

const App = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#61AFEF', // A color from the One Dark Pro theme
      },
      secondary: {
        main: '#ABB2BF', // Another color from the One Dark Pro theme
        contrastText: '#4F545C', // New secondary color for contrast
      },
      background: {
        default: '#3B4048', // Default background color in One Dark Pro
        paper: '#3B4048', // Background color for "paper" surfaces, like cards
        contrast: '#4F545C', // New background color for contrast
      },
      text: {
        primary: '#5C6370', // Primary text color
        secondary: '#ABB2BF', // Secondary text color
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            color: 'white',
            backgroundColor: '#4F545C',
            '&:hover': {
              color: 'white',
              backgroundColor: '#ABB2BF',
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
      MuiTypography: {
        styleOverrides: {
          root: {
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
          },
        },
      },
    },
  });

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <GameProvider>
          <NavButtons />
          <ResourcePanel />
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
