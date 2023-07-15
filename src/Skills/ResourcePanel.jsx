import React, { useContext } from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import { fish, ore, log, leather, coins } from '../assets/resourcepics';
import { Typography } from '@mui/material';
import { GameContext } from '../GameContext';

const resourceImages = {
  fish: fish,
  log: log,
  ore: ore,
  leather: leather,
  coins: coins,
};

const ResourcePanel = () => {
  const { resData, charItems } = useContext(GameContext);
  const resources = [
    ...resData,
    ...charItems.filter((item) => item.name === 'coins'),
  ];

  return (
    <Card
      sx={{
        width: '95vw',
        height: '100%',
        display: 'flex',
        padding: '5px',
        mb: '10px',
        bgcolor: 'background.contrast',
      }}
    >
      {resources.map((res) => (
        <Box
          key={res.name}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mx: '5px',
          }}
        >
          <img src={resourceImages[res.name]} alt={res.name} />
          <Box
            sx={{
              bgcolor: 'background.default',
              borderRadius: '5px',
              padding: '3px',
              mx: '5px',
            }}
          >
            <Typography
              sx={{
                mx: '10px',
              }}
            >
              {Math.floor(res.qty).toLocaleString()}
            </Typography>
          </Box>
        </Box>
      ))}
      <Box sx={{ flexGrow: 1 }} />
    </Card>
  );
};

export default ResourcePanel;
