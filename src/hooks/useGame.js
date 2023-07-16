import { useEffect, useRef, useState } from 'react';
import { database } from '../firebase';
import { ref, set, onValue } from 'firebase/database';
import skills from '../gamedata/skillsData';
import resources from '../gamedata/resourceData';
import characterItems from '../gamedata/charItemsData';
import upgradeData from '../gamedata/upgradeData';

export const useGame = () => {
  const gameTickMS = 200;
  const maxExperience = 432000;

  const [skillsData, setSkillsData] = useState(skills);
  const [upgradeTiers, setUpgradeTiers] = useState(upgradeData);
  const [resData, setResData] = useState(resources);
  const [charItems, setCharItems] = useState(characterItems);
  const [activeSkillName, setActiveSkillName] = useState(null);
  const activeSkill = useRef(null);

  // This function will return updated skill object
  const updateSkill = (skill, gameTickMS, maxExperience) => {
    if (activeSkill.current && skill.name === activeSkill.current.name) {
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
    set(ref(database, 'games/gameId/upgradeData'), upgradeData);
    setActiveSkillName(null);
    activeSkill.current = null;
    set(ref(database, 'games/gameId/activeSkillName'), null);
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

    const activeSkillPromise = new Promise((resolve) => {
      onValue(ref(database, 'games/gameId/activeSkillName'), (snapshot) => {
        const skillName = snapshot.exists() ? snapshot.val() : null;
        setActiveSkillName(skillName);
        if (skillName) {
          activeSkill.current = skillsData.find(
            (skill) => skill.name === skillName
          );
        }
        resolve();
      });
    });

    const upgradeTiersPromise = new Promise((resolve) => {
      onValue(ref(database, 'games/gameId/upgradeData'), (snapshot) => {
        const data = snapshot.exists() ? snapshot.val() : upgradeData; // use skills as the default data
        setUpgradeTiers(data);
        resolve();
      });
    });

    return Promise.all([
      skillsPromise,
      resPromise,
      charItemsPromise,
      activeSkillPromise,
      upgradeTiersPromise,
    ]);
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

  const changeActiveSkill = (skillName) => {
    activeSkill.current = skillsData.find((skill) => skill.name === skillName);
    setActiveSkillName(skillName);
    set(ref(database, 'games/gameId/activeSkillName'), skillName);
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

  const removeCoins = (amt) => {
    setCharItems((prevCharItems) => {
      const updatedCharItems = prevCharItems.map((item) => {
        if (item.name === 'coins') {
          return {
            ...item,
            qty: item.qty - amt,
          };
        } else {
          return item;
        }
      });
      set(ref(database, 'games/gameId/charItems'), updatedCharItems);
      return updatedCharItems;
    });
  };

  const upgradeSkill = async ({
    skillName,
    upgradeAmount = 0.25,
    upgradeCost,
  }) => {
    // Create a new array with updated data
    let coinsInBank = charItems.find((item) => item.name === 'coins').qty;
    if (upgradeCost <= coinsInBank && coinsInBank - upgradeCost >= 0) {
      const updatedData = resData.map((resource) => {
        if (resource.skill === skillName) {
          return {
            ...resource,
            base: resource.base + upgradeAmount,
          };
        } else {
          return resource;
        }
      });

      // Create a new array with updated upgrade tiers
      const updatedTiers = upgradeTiers.map((tier) => {
        if (tier.skill === skillName) {
          return {
            ...tier,
            tier: tier.tier + 1,
          };
        } else {
          return tier;
        }
      });

      removeCoins(upgradeCost);

      // Update state with the new data
      setResData(updatedData);
      setUpgradeTiers(updatedTiers);

      try {
        await Promise.all([
          set(ref(database, 'games/gameId/resData'), updatedData),
          set(ref(database, 'games/gameId/upgradeData'), updatedTiers),
        ]);
      } catch (error) {
        console.error('Firebase write failed:', error);
      }
    }
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
    maxExperience,
    resetGameState,
    addCoins,
    removeResource,
    changeActiveSkill,
    activeSkill,
    upgradeSkill,
    upgradeTiers,
  };
};
