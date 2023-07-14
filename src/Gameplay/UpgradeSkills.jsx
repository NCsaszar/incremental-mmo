import React, { useContext } from 'react';
import { GameContext } from '../GameContext';
import { Box, Stack, Button } from '@mui/material';
import UpgradeCard from '../skills/UpgradeCard';

const UpgradeSkills = () => {
  const { skillsData, upgradeSkill, resData } = useContext(GameContext);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {skillsData.map((skill) => (
          <UpgradeCard
            key={skill.name}
            skill={skill}
            upgradeSkill={upgradeSkill}
            resData={resData}
          />
        ))}
      </Box>
      {/* <Stack spacing={2} direction="row" sx={{ height: '40px' }}>
        <Button onClick={resetGameState}>Reset</Button>
        <Button onClick={() => addCoins()}>Add Coins</Button>
      </Stack> */}
    </Box>
  );
};

export default UpgradeSkills;
