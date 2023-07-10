import React, { useState, useEffect } from "react";
import levels from "./Levels";
import { Box } from "@mui/material";
import { LinearProgress } from "@mui/material";

const ExperienceBar = ({ experience }) => {
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
    let currentLevel = 1;
    Object.entries(levels).forEach(([level, levelExperience]) => {
      if (experience >= levelExperience) {
        currentLevel = parseInt(level);
      }
    });
    return currentLevel;
  };

  const progress = Math.min((experience / nextLevelExperience) * 100, 100);
  const isLevelUp = experience >= nextLevelExperience;

  return (
    <>
      <Box>
        <Box>Experience: {experience}</Box>
        <Box>
          <LinearProgress
            variant="determinate"
            value={isLevelUp ? 0 : progress}
          />
        </Box>
        <Box>Level: {currentLevel}/10</Box>
      </Box>
    </>
  );
};

export default ExperienceBar;
