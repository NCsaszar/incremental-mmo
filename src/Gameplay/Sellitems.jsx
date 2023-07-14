import { Card, Box } from '@mui/material';
import React, { useContext } from 'react';
import { fish, log, leather, ore } from '../assets/resourcepics';
import SellCard from '../skills/SellCard';
import { GameContext } from '../GameContext';

const Sellitems = () => {
  const { skillsData, resData, charItems, addCoins, maxExperience } =
    useContext(GameContext);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Card
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          padding: '20px',
          borderRadius: '10px',
          width: '85%',
          height: '85%',
        }}
      >
        {resData.map((resource) => (
          <SellCard resource={resource} key={resource.name} />
        ))}
      </Card>
    </Box>
  );
};

export default Sellitems;
