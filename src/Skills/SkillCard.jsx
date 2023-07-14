import React, { useContext } from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import { Button, Stack, Typography } from '@mui/material';
import ExperienceBar from './ExperienceBar';
import { tree, rock, fish, hunt } from '../assets/skillpics';
import { GameContext } from '../GameContext';

const SKILL_IMAGES = {
  Woodcutting: tree,
  Mining: rock,
  Fishing: fish,
  Hunting: hunt,
};

const cardStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '300px',
  minHeight: '300px',
  padding: '5px',
  margin: '10px',
  borderRadius: '25px',
  backgroundColor: 'background.contrast',
  boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.8)', // Box shadow to create the pop-out effect
  transform: 'translateY(-6px)', // Translation to make the card appear lifted
};

const typoStyle = {
  textAlign: 'center',
  fontWeight: 'bold', // Custom font weight
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)', // Custom text shadow
};

const imageStyle = {
  maxWidth: '100%',
  maxHeight: '100%',
  width: '100px',
  height: '100px',
};

const SkillCard = ({ skill }) => {
  let active = false;
  const skillImage = SKILL_IMAGES[skill.name];
  const { changeActiveSkill, activeSkill, maxExperience } =
    useContext(GameContext);
  const { name } = skill;

  const startSkill = () => {
    changeActiveSkill(name);
  };

  const stopSkill = () => {
    if (name === activeSkill.current.name) {
      changeActiveSkill(null);
    }
  };
  if (activeSkill.current && name === activeSkill?.current.name) {
    active = true;
  } else {
    active = false;
  }

  return (
    <Card
      sx={{
        ...cardStyle,
        borderColor: active ? 'green' : 'transparent',
        borderWidth: active ? '2px' : '0',
        borderStyle: active ? 'solid' : null,
      }}
    >
      <Typography
        sx={{
          color: 'white',
        }}
      >
        {active ? 'Active' : ''}
      </Typography>
      <Box sx={{ textAlign: 'center', marginTop: active ? '0px' : '16px' }}>
        <Typography component="div" variant="h5" sx={typoStyle}>
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
        <img src={skillImage} alt={skill.name} style={imageStyle} />
      </Box>
      <ExperienceBar experience={skill.experience} mExp={maxExperience} />
      <Stack direction="row" spacing={1}>
        <Button onClick={startSkill} sx={{ bgcolor: 'background.default' }}>
          Start
        </Button>
        <Button onClick={stopSkill} sx={{ bgcolor: 'background.default' }}>
          Stop
        </Button>
      </Stack>
    </Card>
  );
};

export default SkillCard;
