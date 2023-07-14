import React, { useState, useEffect, useContext } from 'react';
import levels from '../gamedata/Levels';
import { Box, Typography } from '@mui/material';
import { LinearProgress } from '@mui/material';
import { styled } from '@mui/system';
import { GameContext } from '../GameContext';

const ProgressBar = styled(LinearProgress)(({ theme }) => ({
  '& .MuiLinearProgress-bar': {
    backgroundColor: '#ABB2BF', // Change the color of the progress bar
  },
  backgroundColor: '#3B4048', // Change the background color of the progress bar
  height: 25, // Adjust the height as per your preference
  borderRadius: 12, // Optionally, adjust the border radius
}));

const ExperienceBar = ({ experience, mExp }) => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [nextLevelExperience, setNextLevelExperience] = useState(
    levels[currentLevel + 1]
  );

  useEffect(() => {
    const currentLevel = getLevel(experience);
    const nextLevel = currentLevel + 1;
    setNextLevelExperience(levels[nextLevel]);
    setCurrentLevel(currentLevel);
  }, [experience]);

  const getLevel = (experience) => {
    let currentLevel;
    Object.entries(levels).forEach(([level, levelExperience]) => {
      if (experience >= levelExperience) {
        currentLevel = parseInt(level);
      }
    });
    return currentLevel;
  };

  const currentLevelExperience = levels[currentLevel];
  const experienceRange = nextLevelExperience - currentLevelExperience;

  const progress = Math.round(
    ((experience - currentLevelExperience) / experienceRange) * 100
  );

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          maxWidth: '75%',
          width: '150px',
          margin: '20px',
        }}
      >
        <Typography>Experience: {experience}</Typography>
        <Typography>Level: {currentLevel}/50</Typography>
        <Box sx={{ width: '100%' }}>
          <ProgressBar
            variant="determinate"
            value={experience == mExp ? 100 : progress}
          />
        </Box>
      </Box>
    </>
  );
};

export default ExperienceBar;
