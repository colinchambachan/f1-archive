export default async function handler(req, res) {
  const raceYear = req.query.year;

  await fetch(`http://ergast.com/api/f1/${raceYear}.json`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let circuits = [];
      data.MRData.RaceTable.Races.map((element) => {
        let obj = {};
        obj["label"] = element.raceName;
        obj["value"] = element.round;

        circuits.push(obj);
      });
      res.status(200).json(circuits);
    });
}

// Fetch circuits corresponding to selected year
// const fetchRespectiveCircuits = async () => {
//   if (selectedYear !== "Choose a Year" && selectedYear !== null) {
//     await fetch(`http://ergast.com/api/f1/${selectedYear}.json`)
//       .then((response) => {
//         return response.json();
//       })
//       .then((data) => {
//         let circuits = [];
//         data.MRData.RaceTable.Races.map((element) => {
//           let obj = {};
//           obj["label"] = element.raceName;
//           obj["value"] = element.round;

//           circuits.push(obj);
//         });
//         setCiruitOptions(circuits);
//       });
//   } else {
//     setCiruitOptions([]);
//   }
// };
