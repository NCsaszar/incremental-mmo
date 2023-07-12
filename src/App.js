import React, { useEffect, useState } from "react";
import skills from "./Skills/skillsData";
import SkillCard from "./Skills/SkillCard";
import Box from "@mui/material/Box";
import resources from "./Skillresources/resources";
import ResourcePanel from "./Skills/ResourcePanel";
import { database } from "./firebase";
import { ref, set, onValue } from "firebase/database";
import { Button } from "@mui/material";
import characterItems from "./character/charitems";

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
  const [charItems, setCharItems] = useState(characterItems);

  // Save game state
  function saveGameState() {
    set(ref(database, "games/gameId/skillsData"), skillsData);
    set(ref(database, "games/gameId/resData"), resData);
    set(ref(database, "games/gameId/charItems"), charItems); // Save charItems to Firebase
  }

  // Reset game state
  function resetGameState() {
    set(ref(database, "games/gameId/skillsData"), skills);
    set(ref(database, "games/gameId/resData"), resources);
    set(ref(database, "games/gameId/charItems"), characterItems);
  }

  // Load game state
  function loadGameState() {
    const skillsPromise = new Promise((resolve) => {
      onValue(ref(database, "games/gameId/skillsData"), (snapshot) => {
        const data = snapshot.exists() ? snapshot.val() : skills; // use skills as the default data
        setSkillsData(data);
        resolve();
      });
    });

    const resPromise = new Promise((resolve) => {
      onValue(ref(database, "games/gameId/resData"), (snapshot) => {
        const data = snapshot.exists() ? snapshot.val() : resources; // use resources as the default data
        setResData(data);
        resolve();
      });
    });

    const charItemsPromise = new Promise((resolve) => {
      onValue(ref(database, "games/gameId/charItems"), (snapshot) => {
        const data = snapshot.exists() ? snapshot.val() : characterItems;
        setCharItems(data);
        resolve();
      });
    });
    return Promise.all([skillsPromise, resPromise, charItemsPromise]);
  }

  const addCoins = (amt) => {
    setCharItems((prevCharItems) => {
      const updatedCharItems = prevCharItems.map((item) => {
        if (item.name === "coins") {
          return {
            ...item,
            qty: item.qty + (amt || 100),
          };
        } else {
          return item;
        }
      });
      set(ref(database, "games/gameId/charItems"), updatedCharItems);
      return updatedCharItems;
    });
  };

  function gameTick() {
    setSkillsData((prevSkills) => {
      const updatedSkills = prevSkills.map((skill) =>
        updateSkill(skill, gameTickMS, maxExperience)
      );

      setResData((prevResData) => {
        const updatedResData = prevResData.map((resource) => {
          // find the corresponding skill for this resource
          const correspondingSkill = updatedSkills.find(
            (skill) => skill.name === resource.skill
          );

          if (correspondingSkill && correspondingSkill.tickCount === 0) {
            return { ...resource, qty: resource.qty + resource.base };
          }

          return resource;
        });

        // save the updated game state in Firebase
        set(ref(database, "games/gameId/skillsData"), updatedSkills);
        set(ref(database, "games/gameId/resData"), updatedResData);

        return updatedResData;
      });

      return updatedSkills;
    });
  }

  useEffect(() => {
    // Load the game state when the component mounts
    loadGameState().then(() => {
      // Start the game loop
      const gameLoop = setInterval(gameTick, gameTickMS);

      // Clean up the interval when the component unmounts
      return () => {
        clearInterval(gameLoop);
      };
    });
  }, []);

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
