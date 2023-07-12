import { Card, Box } from '@mui/material';
import React from 'react';
import { fish, log, leather, ore } from '../resourcepics';

const Sellitems = () => {
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
          bgcolor: 'aqua',
          display: 'flex',
          margin: '20px',
          borderRadius: '10px',
          width: '80%',
          height: '80%',
        }}
      >
        <Box>
          <img src={log} alt="log" />
          <img src={ore} alt="ore" />
          <img src={fish} alt="fish" />
          <img src={leather} alt="leather" />
        </Box>
      </Card>
    </Box>
  );
};

export default Sellitems;
