import React, { useEffect } from "react";

const App = () => {
  const skills = [
    {
      name: "woodcutting",
      experience: 0,
      tickCount: 0,
      tickInterval: 2000, //Time in ms between each tick
      tickExperience: 10, //Experience gained per tick
    },
    {
      name: "mining",
      experience: 0,
      tickCount: 0,
      tickInterval: 1000, //Time in ms between each tick
      tickExperience: 5, //Experience gained per tick
    },
  ];

  function gameTick() {
    for (const skill of skills) {
      skill.tickCount++;
      skill.experience += skill.tickExperience;

      // Check if the skill has reached a certain tick count
      // You can adjust this condition based on your game's requirements
      if (skill.tickCount >= 10) {
        skill.tickCount = 0;
        skill.tickExperience += 2; // Increase the experience gained per tick
      }
      console.log(`${skill.name}: ${skill.experience}`);
    }

    // Perform any other game logic here
  }

  useEffect(() => {
    // Start the game loop when the component mounts
    const gameLoop = setInterval(gameTick, 1000);

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(gameLoop);
    };
  }, []); // Empty dependency array ensures the effect runs only once

  return <div>{console.log(skills[0], skills[1])}</div>;
};

export default App;
