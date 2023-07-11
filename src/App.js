import React, { useEffect, useState } from "react";
import skills from "./Skills/skillsData";
import SkillCard from "./Skills/SkillCard";
import Box from "@mui/material/Box";
import resources from "./Skillresources/resources";

// This function will return updated skill object
const updateSkill = (skill, gameTickMS, maxExperience) => {
  const updatedSkill = { ...skill };
  updatedSkill.tickCount += gameTickMS;

  if (updatedSkill.tickCount >= updatedSkill.tickInterval) {
    updatedSkill.tickCount = 0;
    if (updatedSkill.experience < maxExperience) {
      updatedSkill.experience += updatedSkill.tickExperience;
    } else {
      updatedSkill.experience = maxExperience;
    }
  }

  return updatedSkill;
};

const App = () => {
  const gameTickMS = 200;
  const maxExperience = 900;
  const [skillsData, setSkillsData] = useState(skills);
  const [resData, setResData] = useState(resources);

  function gameTick() {
    setSkillsData((prevSkills) => {
      const updatedSkills = prevSkills.map((skill) =>
        updateSkill(skill, gameTickMS, maxExperience)
      );

      setResData((prevResData) => {
        return prevResData.map((resource) => {
          // find the corresponding skill for this resource
          const correspondingSkill = updatedSkills.find(
            (skill) => skill.name === resource.skill
          );

          if (
            correspondingSkill &&
            correspondingSkill.tickCount === 0 &&
            correspondingSkill.experience < maxExperience
          ) {
            return { ...resource, qty: resource.qty + resource.base };
          }

          return resource;
        });
      });

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
