import React from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import ExperienceBar from './ExperienceBar';
import tree from '../assets/skillpics/tree.png';
import rock from '../assets/skillpics/rock.png';
import fish from '../assets/skillpics/fish.png';
import hunt from '../assets/skillpics/hunt.png';

const SkillCard = ({ skill, mExp }) => {
  let skillImage;
  if (skill.name == 'Woodcutting') {
    skillImage = tree;
  } else if (skill.name == 'Mining') {
    skillImage = rock;
  } else if (skill.name == 'Fishing') {
    skillImage = fish;
  } else if (skill.name == 'Hunting') {
    skillImage = hunt;
  }

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '300px',
        height: '300px',
        padding: '5px',
        margin: '10px',
        borderRadius: '25px',
        boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.8)', // Box shadow to create the pop-out effect
        transform: 'translateY(-6px)', // Translation to make the card appear lifted
      }}
    >
      <Box sx={{ textAlign: 'center', marginTop: '16px' }}>
        <Typography
          component="div"
          variant="h5"
          sx={{
            textAlign: 'center',
            fontWeight: 'bold', // Custom font weight
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)', // Custom text shadow
          }}
        >
          {skill.name}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexGrow: 1,
        }}
      >
        <img
          src={skillImage}
          alt={skill.name}
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            width: '100px',
            height: '100px',
          }}
        />
      </Box>
      <ExperienceBar experience={skill.experience} mExp={mExp} />
    </Card>
  );
};

export default SkillCard;
