import React, { useState, useRef, useContext } from 'react';
import { Typography, Box, Card, Stack, Button, TextField } from '@mui/material';
import { log, ore, fish, leather } from '../assets/resourcepics';
import { cardStyle, sellbtnstyle, allbtnstyle } from './SkillCardStyles';
import { GameContext } from '../GameContext';

const SkillCard = ({ resource }) => {
  const [quantity, setQuantity] = useState(0);
  const { addCoins, removeResource } = useContext(GameContext);

  const resources = {
    log: { name: 'Logs', image: log },
    ore: { name: 'Ores', image: ore },
    fish: { name: 'Fish', image: fish },
    leather: { name: 'Leather', image: leather },
  };

  const { name: resourceName, image: skillImage } = resources[resource.name];

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
    setQuantity(Number(event.target.value));
  };

  const handleAllBtn = () => {
    setQuantity(resource.qty);
  };

  const handleSellBtn = (resource, qty) => {
    let { sellPrice } = resource;
    let coinsToAdd = qty * sellPrice;
    addCoins(coinsToAdd);
    removeResource(resource, qty);
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
        <Button
          sx={{ ...sellbtnstyle, width: '90%' }}
          onClick={() => handleSellBtn(resource, quantity)}
        >
          Sell
        </Button>
      </Stack>
    </Card>
  );
};

export default SkillCard;
