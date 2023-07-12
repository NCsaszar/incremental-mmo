import React from "react";
import { Box, Button } from "@mui/material";

const MainGame = ({
  resData,
  charItems,
  skill,
  resetGameState,
  maxExperience,
  addCoins,
}) => {
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", margin: "20px" }}>
      <ResourcePanel resources={resData} charItems={charItems} />
      {skillsData.map((skill) => (
        <SkillCard key={skill.name} skill={skill} mExp={maxExperience} />
      ))}
      <Button
        onClick={resetGameState}
        sx={{
          bgcolor: "red",
          color: "white",
          "&:hover": { bgcolor: "green" },
        }}
      >
        Reset
      </Button>
      <Button
        onClick={() => addCoins()}
        sx={{
          bgcolor: "yellow",
          color: "black",
          "&:hover": { bgcolor: "green" },
        }}
      >
        Add Coins
      </Button>
    </Box>
  );
};

export default maingame;
