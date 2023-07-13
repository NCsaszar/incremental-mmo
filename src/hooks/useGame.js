import { useEffect, useState } from 'react';
import { database } from '../firebase';
import { ref, set, onValue } from 'firebase/database';
import skills from '../gamedata/skillsData';
import resources from '../gamedata/resourceData';
import characterItems from '../gamedata/charItemsData';

export const useGame = () => {
  const gameTickMS = 200;
  const maxExperience = 900;

  const [skillsData, setSkillsData] = useState(skills);
  const [resData, setResData] = useState(resources);
  const [charItems, setCharItems] = useState(characterItems);
  const [activeSkill, setActiveSkill] = useState(null);

  // This function will return updated skill object
  const updateSkill = (skill, gameTickMS, maxExperience) => {
    if (activeSkill && skill.name === activeSkill.name) {
      const updatedSkill = { ...skill };
      updatedSkill.tickCount += gameTickMS;

      if (updatedSkill.tickCount >= updatedSkill.tickInterval) {
        updatedSkill.tickCount = 0;
        if (updatedSkill.experience < maxExperience) {
          updatedSkill.experience += updatedSkill.tickExperience;
        } else {
          updatedSkill.experience = maxExperience;
        }
        // update corresponding resource when skill is trained
        setResData((prevResData) => {
          const updatedResData = prevResData.map((resource) => {
            if (
              resource.skill === updatedSkill.name &&
              updatedSkill.tickCount === 0
            ) {
              return { ...resource, qty: resource.qty + resource.base };
            }
            return resource;
          });
          // save the updated resources data in Firebase
          set(ref(database, 'games/gameId/resData'), updatedResData);
          return updatedResData;
        });
      }

      return updatedSkill;
    }
    return skill; // if it's not the active skill, just return it unchanged
  };

  // All your functions for managing game state and the game loop goes here...
  function saveGameState() {
    set(ref(database, 'games/gameId/skillsData'), skillsData);
    set(ref(database, 'games/gameId/resData'), resData);
    set(ref(database, 'games/gameId/charItems'), charItems); // Save charItems to Firebase
  }

  // Reset game state
  function resetGameState() {
    set(ref(database, 'games/gameId/skillsData'), skills);
    set(ref(database, 'games/gameId/resData'), resources);
    set(ref(database, 'games/gameId/charItems'), characterItems);
  }

  // Load game state
  function loadGameState() {
    const skillsPromise = new Promise((resolve) => {
      onValue(ref(database, 'games/gameId/skillsData'), (snapshot) => {
        const data = snapshot.exists() ? snapshot.val() : skills; // use skills as the default data
        setSkillsData(data);
        resolve();
      });
    });

    const resPromise = new Promise((resolve) => {
      onValue(ref(database, 'games/gameId/resData'), (snapshot) => {
        const data = snapshot.exists() ? snapshot.val() : resources; // use resources as the default data
        setResData(data);
        resolve();
      });
    });

    const charItemsPromise = new Promise((resolve) => {
      onValue(ref(database, 'games/gameId/charItems'), (snapshot) => {
        const data = snapshot.exists() ? snapshot.val() : characterItems;
        setCharItems(data);
        resolve();
      });
    });
    return Promise.all([skillsPromise, resPromise, charItemsPromise]);
  }

  const removeResource = (resource, qty) => {
    setResData((prevResData) => {
      const updatedResData = prevResData.map((res) => {
        if (res.name == resource.name) {
          return { ...res, qty: res.qty - qty };
        } else {
          return res;
        }
      });
      set(ref(database, 'games/gameId/resData'), updatedResData);
      return updatedResData;
    });
  };

  const addCoins = (amt) => {
    setCharItems((prevCharItems) => {
      const updatedCharItems = prevCharItems.map((item) => {
        if (item.name === 'coins') {
          return {
            ...item,
            qty: item.qty + amt,
          };
        } else {
          return item;
        }
      });
      set(ref(database, 'games/gameId/charItems'), updatedCharItems);
      return updatedCharItems;
    });
  };

  function gameTick() {
    setSkillsData((prevSkills) => {
      const updatedSkills = prevSkills.map((skill) =>
        updateSkill(skill, gameTickMS, maxExperience)
      );
      // save the updated skills data in Firebase
      set(ref(database, 'games/gameId/skillsData'), updatedSkills);
      return updatedSkills;
    });
  }

  const changeActiveSkill = (skillName) => {
    setActiveSkill(skillsData.find((skill) => skill.name === skillName));
  };

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

  // Return everything that your components might need from this hook
  return {
    skillsData,
    resData,
    charItems,
    resetGameState,
    addCoins,
    removeResource,
    changeActiveSkill,
  };
};
