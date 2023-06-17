export const RaceYears = [];
// RAce years, make sure to update when year changes
for (let i = 2023; i >= 1950; i--) {
  let obj = {};
  obj["label"] = i;
  obj["value"] = i;

  RaceYears.push(obj);
}
