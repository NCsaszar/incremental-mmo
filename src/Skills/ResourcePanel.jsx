import React from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import fish from '../assets/resourcepics/fish.png';
import ore from '../assets/resourcepics/ore.png';
import log from '../assets/resourcepics/log.png';
import leather from '../assets/resourcepics/leather.png';
import coins from '../assets/resourcepics/coins.png';
import { Typography } from '@mui/material';

const ResourcePanel = ({ resources, charItems }) => {
  let fishCt = resources.filter((res) => res.name == 'fish')[0].qty;
  let logCt = resources.filter((res) => res.name == 'log')[0].qty;
  let oreCt = resources.filter((res) => res.name == 'ore')[0].qty;
  let leatherCt = resources.filter((res) => res.name == 'leather')[0].qty;
  let coinsCt = charItems.filter((item) => item.name == 'coins')[0].qty;

  return (
    <Card
      sx={{
        bgcolor: 'aqua',
        width: '100vw',
        height: '100%',
        display: 'flex',
        padding: '5px',
        mb: '10px',
      }}
    >
      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <img src={fish} alt="fishres" />
        <Typography sx={{ mx: '10px' }}>{fishCt}</Typography>
      </Box>
      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <img src={ore} alt="oreres" />
        <Typography sx={{ mx: '10px' }}>{oreCt}</Typography>
      </Box>
      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <img src={log} alt="logres" />
        <Typography sx={{ mx: '10px' }}>{logCt}</Typography>
      </Box>
      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <img src={leather} alt="leatherres" />
        <Typography sx={{ mx: '10px' }}>{leatherCt}</Typography>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <img src={coins} alt="coins" />
        <Typography sx={{ mx: '10px' }}>{coinsCt}</Typography>
      </Box>
    </Card>
  );
};

export default ResourcePanel;
