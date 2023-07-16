import React, { useContext } from 'react';
import { trap, fishpole, axe, pick } from '../assets/upgradepics';
import { Box, Button, Card, Typography } from '@mui/material';
import { GameContext } from '../GameContext';
import { coins } from '../assets/resourcepics';

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

const UpgradeCard = ({ skill, upgradeSkill, resData }) => {
  const { upgradeTiers } = useContext(GameContext);
  const { image: upgradePic, name: upgradeName } = upgrades[skill.name];

  const upgradeTier = upgradeTiers.find((tier) => tier.skill === skill.name);
  const tier = upgradeTier ? upgradeTier.tier : 0;

  const calculateUpgradeCost = (skillName, tier) => {
    const baseLogarithm = 10;
    const multiplier = 1000;
    const exponent = 2; // this will provide quadratic growth

    // The cost is calculated based on the current tier
    const cost = Math.pow(tier + 1, exponent) * multiplier;

    // Round the cost to the nearest whole number for simplicity
    const roundedCost = Math.ceil(cost);

    return roundedCost;
  };

  let upgradeCost = calculateUpgradeCost(skill.name, tier).toLocaleString();
  let upgradeCostNoLocale = calculateUpgradeCost(skill.name, tier);

  const handleUpgrade = () => {
    upgradeSkill({ skillName: skill.name, upgradeCost: upgradeCostNoLocale });
  };

  return (
    <Card sx={cardStyle}>
      <Typography variant="h4" fontWeight="bold" sx={{ mt: '10px' }}>
        {upgradeName}
      </Typography>
      <Typography>Tier: {tier}</Typography>
      <img src={upgradePic} alt={upgradeName} style={imageStyle} />
      <Typography>Increase gathering rate</Typography>
      <Box>
        <Box sx={{ display: 'flex' }}>
          <Typography>Upgrade Cost: {upgradeCost}</Typography>
          <img src={coins} alt="coins" />
        </Box>
        <Button onClick={handleUpgrade} sx={{ bgcolor: 'background.default' }}>
          Upgrade
        </Button>
      </Box>
    </Card>
  );
};

export default UpgradeCard;
