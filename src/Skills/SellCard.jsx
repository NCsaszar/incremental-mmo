import React, { useState, useRef, useContext } from 'react';
import { Typography, Box, Card, Stack, Button, TextField } from '@mui/material';
import { log, ore, fish, leather } from '../assets/resourcepics';
import { sellbtnstyle, allbtnstyle } from './SkillCardStyles';
import { GameContext } from '../GameContext';
export const cardStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '200px',
  minHeight: '200px',
  padding: '5px',
  margin: '10px',
  backgroundColor: 'background.contrast',
  borderRadius: '25px',
  boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.8)', // Box shadow to create the pop-out effect
  transform: 'translateY(-6px)', // Translation to make the card appear lifted
};

const SellCard = ({ resource }) => {
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
    if (quantity > Math.floor(resource.qty)) {
      setQuantity(Math.floor(resource.qty));
    }
    if (!quantity) {
      setQuantity(0);
    }
  };

  const handleChange = (event) => {
    let value = event.target.value;
    setQuantity(Math.floor(Number(value)));
  };

  const handleAllBtn = () => {
    setQuantity(Math.floor(resource.qty));
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
      <Typography>You own: {Math.floor(resource.qty)}</Typography>
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
            step: 1,
          }}
          value={Math.floor(quantity)}
          inputRef={inputRef}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          sx={{
            width: '100px',
            '& .MuiOutlinedInput-input': {
              minHeight: '0px',
              color: 'white',
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

export default SellCard;
