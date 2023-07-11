import React, { useEffect, useState } from "react";
import skills from "./Skills/skillsData";
import SkillCard from "./Skills/SkillCard";
import Box from "@mui/material/Box";
import resources from "./Skillresources/resources";

const App = () => {
  const gameTickMS = 200;
  const maxExperience = 900;
  const [skillsData, setSkillsData] = useState(skills);
  const [resData, setResData] = useState(resources);

  function gameTick() {
    setSkillsData((prevSkills) => {
      // Copy the resData state to a new array
      let newResData = [...resData];
      const updatedSkills = prevSkills.map((skill, index) => {
        const updatedSkill = { ...skill };
        updatedSkill.tickCount += gameTickMS;

        // Check if the skill has reached its tickInterval
        if (updatedSkill.tickCount >= updatedSkill.tickInterval) {
          updatedSkill.tickCount = 0;
          if (updatedSkill.experience < maxExperience) {
            updatedSkill.experience += updatedSkill.tickExperience;

            // Update the corresponding resource in the new array
            const resourceIndex = newResData.findIndex(
              (resource) => resource.skill === updatedSkill.name
            );
            if (resourceIndex !== -1) {
              newResData[resourceIndex] = {
                ...newResData[resourceIndex],
                qty:
                  newResData[resourceIndex].qty +
                  newResData[resourceIndex].base,
              };
            }
          } else {
            updatedSkill.experience = maxExperience;
          }
        }

        return updatedSkill;
      });

      // Update resData state here, after all resource updates have been made
      setResData(newResData);

      return updatedSkills;
    });
  }

  console.log(resData);

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
