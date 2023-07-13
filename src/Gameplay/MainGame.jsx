import React, { useContext } from 'react';
import { Box, Button, Stack } from '@mui/material';
import { GameContext } from '../GameContext';
import ResourcePanel from '../skills/ResourcePanel';
import SkillCard from '../skills/SkillCard';

const MainGame = () => {
  const {
    skillsData,
    resData,
    charItems,
    resetGameState,
    addCoins,
    maxExperience,
  } = useContext(GameContext);
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
      >
        {skillsData.map((skill) => (
          <SkillCard key={skill.name} skill={skill} mExp={maxExperience} />
        ))}
      </Box>
      <Stack spacing={2} direction="row" sx={{ height: '40px' }}>
        <Button onClick={resetGameState}>Reset</Button>
        <Button onClick={() => addCoins()}>Add Coins</Button>
      </Stack>
    </Box>
  );
};

export default MainGame;
