function generateMilestones(tickIntervalMS, tickExperience, levels = 50) {
  const totalTimeMS = 24 * 60 * 60 * 1000;
  const totalTicks = totalTimeMS / tickIntervalMS;
  const totalExperience = totalTicks * tickExperience;
  const milestones = [0];
  for (let level = 1; level < levels; level++) {
    const milestone = totalExperience * (1 - Math.pow(0.5, level / levels));
    milestones.push(Math.round(milestone));
  }
  return milestones;
}

let tickIntervalMS = 1000; // for example
let tickExperience = 10; // for example
let levels = 50; // you want 50 levels
let milestones = generateMilestones(tickIntervalMS, tickExperience, levels);

for (let i = 0; i < milestones.length; i++) {
  let timeToReachLevelMS = (milestones[i] / tickExperience) * tickIntervalMS;
  let timeToReachLevelSec = timeToReachLevelMS / 1000;
  let timeToReachLevelMin = timeToReachLevelSec / 60;

  console.log(
    "Level " +
      (i + 1) +
      ": " +
      milestones[i] +
      " experience, takes approx " +
      Math.round(timeToReachLevelMin) +
      " minutes (" +
      Math.round(timeToReachLevelSec) +
      " seconds)"
  );
}
