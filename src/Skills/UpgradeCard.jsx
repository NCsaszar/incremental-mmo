import React from 'react';
import { trap, fishpole, axe, pick } from '../assets/upgradepics';
import { Box, Button, Card, Typography } from '@mui/material';

const upgrades = {
  Woodcutting: { name: 'Axe Upgrade', image: axe },
  Mining: { name: 'Pickaxe Upgrade', image: pick },
  Hunting: { name: 'Trap Upgrade', image: trap },
  Fishing: { name: 'Fishing Pole Upgrade', image: fishpole },
};

const cardStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  textAlign: 'center',
  width: '300px',
  minHeight: '300px',
  padding: '5px',
  margin: '10px',
  borderRadius: '25px',
  backgroundColor: 'background.contrast',
  boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.8)', // Box shadow to create the pop-out effect
  transform: 'translateY(-6px)', // Translation to make the card appear lifted
};

const imageStyle = {
  maxWidth: '75px',
  maxHeight: '75px',
  width: '75px',
  height: '75px',
};

const UpgradeCard = ({ skill, upgradeSkill,resData }) => {
  const { image: upgradePic, name: upgradeName } = upgrades[skill.name];

  const handleUpgrade = () => {
    upgradeSkill(skill.name);
  };


  return (
    <Card sx={cardStyle}>
      <Typography variant="h4" fontWeight="bold" sx={{ mt: '10px' }}>
        {upgradeName}
      </Typography>
      <img src={upgradePic} alt={upgradeName} style={imageStyle} />
      <Typography>Increase gathering rate: +0.25</Typography>
      <Box>
        <Typography>Upgrade Cost: TBD</Typography>
        <Button onClick={handleUpgrade} sx={{ bgcolor: 'background.default' }}>
          Upgrade
        </Button>
      </Box>
    </Card>
  );
};

export default UpgradeCard;
