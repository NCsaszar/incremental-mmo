import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Stack } from '@mui/material';

const NavigationButtons = () => {
  const navigate = useNavigate();

  return (
    <Stack sx={{ my: '10px' }} spacing={2} direction="row">
      <Button onClick={() => navigate('/')}>Homepage</Button>
      <Button onClick={() => navigate('/game')}>Mainpage</Button>
      <Button onClick={() => navigate('/sell')}>Sellpage</Button>
    </Stack>
  );
};

export default NavigationButtons;
