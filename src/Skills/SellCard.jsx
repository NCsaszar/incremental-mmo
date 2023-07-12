import React from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import ExperienceBar from './ExperienceBar';
import { log, ore, fish, leather } from '../resourcepics';

const SkillCard = ({ resource }) => {
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
    height: '200px',
    padding: '5px',
    margin: '10px',
    borderRadius: '25px',
    background: gradientBackground,
    boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.8)', // Box shadow to create the pop-out effect
    transform: 'translateY(-6px)', // Translation to make the card appear lifted
  };

  return (
    <Card sx={cardStyle}>
      <Box sx={{ textAlign: 'center', marginTop: '16px' }}>
        <Typography
          component="div"
          variant="h5"
          sx={{
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
            width: '25px',
            height: '25px',
          }}
        />
      </Box>
    </Card>
  );
};

export default SkillCard;
