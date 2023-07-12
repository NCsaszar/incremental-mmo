import React, { useContext } from 'react';
import { Box, Button, Stack } from '@mui/material';
import { GameContext } from '../GameContext';
import ResourcePanel from '../Skills/ResourcePanel';
import SkillCard from '../Skills/SkillCard';

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
    <Box sx={{ display: 'flex', flexWrap: 'wrap', margin: '20px' }}>
      <ResourcePanel resources={resData} charItems={charItems} />
      {skillsData.map((skill) => (
        <SkillCard key={skill.name} skill={skill} mExp={maxExperience} />
      ))}
      <Stack spacing={2} direction="row" sx={{ height: '40px' }}>
        <Button
          onClick={resetGameState}
          sx={{
            bgcolor: 'red',
            color: 'white',
            '&:hover': { bgcolor: 'green' },
          }}
        >
          Reset
        </Button>
        <Button
          sx={{
            bgcolor: 'yellow',
            color: 'black',
            '&:hover': { bgcolor: 'green' },
          }}
          onClick={() => addCoins()}
        >
          Add Coins
        </Button>
      </Stack>
    </Box>
  );
};

export default MainGame;
