function generateMilestones(tickIntervalMS, tickExperience, levels = 50) {
  const totalTimeMS = 24 * 60 * 60 * 1000;
  const totalTicks = totalTimeMS / tickIntervalMS;
  const totalExperience = totalTicks * tickExperience;

  const milestones = {};
  for (let level = 1; level <= levels; level++) {
    const milestone = totalExperience * (1 - Math.pow(0.5, level / levels));
    milestones[level] = Math.round(milestone);
  }

  return milestones;
}

let tickIntervalMS = 1000; // for example
let tickExperience = 10; // for example
let levels = 50; // you want 50 levels

const levelMilestones = generateMilestones(
  tickIntervalMS,
  tickExperience,
  levels
);
console.log(levelMilestones);
