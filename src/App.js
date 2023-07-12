import React, { useEffect, useState } from "react";
import SkillCard from "./Skills/SkillCard";
import Box from "@mui/material/Box";
import ResourcePanel from "./Skills/ResourcePanel";
import { Button } from "@mui/material";
import { useGame } from "./hooks/useGame";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const App = () => {
  const { skillsData, resData, charItems, resetGameState, addCoins } =
    useGame();
  const maxExperience = 900;

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", margin: "20px" }}>
      <ResourcePanel resources={resData} charItems={charItems} />
      {skillsData.map((skill) => (
        <SkillCard key={skill.name} skill={skill} mExp={maxExperience} />
      ))}
      <Button
        onClick={resetGameState}
        sx={{ bgcolor: "red", color: "white", "&:hover": { bgcolor: "green" } }}
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

export default App;
