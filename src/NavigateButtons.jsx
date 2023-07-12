import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Stack } from '@mui/material';

const NavigationButtons = () => {
  const navigate = useNavigate();

  const btnstyle = {
    bgcolor: 'red',
    color: 'white',
    '&:hover': { backgroundColor: 'red' },
    mx: '5px',
  };

  return (
    <Stack spacing={2} direction="row">
      <Button sx={btnstyle} onClick={() => navigate('/')}>
        Homepage
      </Button>
      <Button sx={btnstyle} onClick={() => navigate('/game')}>
        Mainpage
      </Button>
      <Button sx={btnstyle} onClick={() => navigate('/sell')}>
        Sellpage
      </Button>
    </Stack>
  );
};

export default NavigationButtons;
