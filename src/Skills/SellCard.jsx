import React, { useState, useRef } from 'react';
import { Typography, Box, Card, Stack, Button, TextField } from '@mui/material';
import { log, ore, fish, leather } from '../resourcepics';

const SkillCard = ({ resource }) => {
  const [quantity, setQuantity] = useState(0);
  let resourceName;
  let skillImage;
  if (resource.name == 'log') {
    skillImage = log;
  } else if (resource.name == 'ore') {
    skillImage = ore;
  } else if (resource.name == 'fish') {
    skillImage = fish;
  } else if (resource.name == 'leather') {
    skillImage = leather;
  }

  if (resource.name == 'log') {
    resourceName = 'Logs';
  } else if (resource.name == 'ore') {
    resourceName = 'Ores';
  } else if (resource.name == 'fish') {
    resourceName = 'Fish';
  } else if (resource.name == 'leather') {
    resourceName = 'Leather';
  }

  const gradientBackground =
    'radial-gradient(circle, rgba(187,187,187,1) 35%, rgba(11,251,241,1) 100%, rgba(69,89,93,1) 100%)';
  const cardStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '200px',
    minHeight: '200px',
    padding: '5px',
    margin: '10px',
    borderRadius: '25px',
    background: gradientBackground,
    boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.8)', // Box shadow to create the pop-out effect
    transform: 'translateY(-6px)', // Translation to make the card appear lifted
  };

  const sellbtnstyle = {
    bgcolor: 'red',
    color: 'white',
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: '0 2px 4px rgba(0,0,0,0.25)',
      bgcolor: 'red',
    },
  };

  const allbtnstyle = {
    bgcolor: 'green',
    color: 'white',
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: '0 2px 4px rgba(0,0,0,0.25)',
      bgcolor: 'green',
    },
  };

  // Define a ref to access the input element
  const inputRef = useRef();

  const handleFocus = (event) => {
    event.target.select();
  };

  const handleBlur = () => {
    if (quantity > resource.qty) {
      setQuantity(resource.qty);
    }
    if (!quantity) {
      setQuantity(0);
    }
  };

  const handleChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleAllBtn = () => {
    setQuantity(resource.qty);
  };

  return (
    <Card sx={cardStyle}>
      <Box sx={{ textAlign: 'center', marginTop: '16px' }}>
        <Typography
          component="div"
          variant="h6"
          sx={{
            mb: '15px',
            textAlign: 'center',
            color: 'black', // Custom text color
            fontWeight: 'bold', // Custom font weight
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)', // Custom text shadow
          }}
        >
          {resourceName}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img
          src={skillImage}
          alt={resource.name}
          style={{
            width: '40px',
            height: '40px',
          }}
        />
      </Box>
      <Typography>You own: {resource.qty}</Typography>
      <Stack
        direction="column"
        spacing={1}
        sx={{ justifyContent: 'center', alignItems: 'center' }}
      >
        <TextField
          type="number"
          inputProps={{
            min: 0,
            max: resource.qty,
          }}
          value={quantity}
          inputRef={inputRef}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          sx={{
            width: '100px',
            '& .MuiOutlinedInput-input': {
              minHeight: '0px',
              textAlign: 'center',
              height: '1rem',
              // Adjusts the actual input field
              padding: '10px 14px', // Changes vertical padding to 10px and horizontal padding to 14px
            },
            margin: '5px',
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
                borderColor: 'teal',
              },
            },
          }}
        />
        <Button onClick={handleAllBtn} sx={allbtnstyle}>
          All
        </Button>
        <Button sx={{ ...sellbtnstyle, width: '90%' }}>Sell</Button>
      </Stack>
    </Card>
  );
};

export default SkillCard;
