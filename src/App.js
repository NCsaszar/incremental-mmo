import React, { useEffect, useState } from "react";
import skills from "./skillsData";
import SkillCard from "./SkillCard";
import Box from "@mui/material/Box";

const App = () => {
  const gameTickMS = 200;
  const maxExperience = 900;
  const [skillsData, setSkillsData] = useState(skills);

  function gameTick() {
    setSkillsData((prevSkills) => {
      const updatedSkills = prevSkills.map((skill) => {
        const updatedSkill = { ...skill };
        updatedSkill.tickCount += gameTickMS;

        // Check if the skill has reached its tickInterval
        if (updatedSkill.tickCount >= updatedSkill.tickInterval) {
          updatedSkill.tickCount = 0;
          if (updatedSkill.experience < maxExperience) {
            updatedSkill.experience += updatedSkill.tickExperience;
          } else {
            updatedSkill.experience = 900;
          }
        }

        // Check if the skill has reached a certain tick count
        // You can adjust this condition based on your game's requirements
        // if (updatedSkill.tickCount >= 10) {
        //   updatedSkill.tickExperience += 2; // Increase the experience gained per tick
        // }

        return updatedSkill;
      });

      return updatedSkills;
    });
  }

  const targetExperience = 900;
  const tickInterval = 1000;
  const tickExperience = 10;

  const timeToReachExperience = calculateTimeToReachExperience(
    targetExperience,
    tickInterval,
    tickExperience
  );

  const minutes = Math.floor(timeToReachExperience / 60);
  const seconds = Math.round(timeToReachExperience % 60);

  console.log(
    `Time to reach ${targetExperience} experience: ${minutes} minutes ${seconds} seconds`
  );

  function calculateTimeToReachExperience(
    targetExperience,
    tickInterval,
    tickExperience
  ) {
    const timeInSeconds =
      (targetExperience / tickExperience) * (tickInterval / 1000);
    return timeInSeconds;
  }

  useEffect(() => {
    // Start the game loop when the component mounts
    const gameLoop = setInterval(gameTick, gameTickMS);

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(gameLoop);
    };
  }, []);
  // Empty dependency array ensures the effect runs only once

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
      {skillsData.map((skill) => (
        <SkillCard key={skill.name} skill={skill} />
      ))}
    </Box>
  );
};

export default App;
