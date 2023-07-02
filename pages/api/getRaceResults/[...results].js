import { convertCountry } from "@/utils/convertCountry";

// export default async function handler(req, res) {
//   const raceYear = req.query.results[0];
//   const raceCircuit = req.query.results[1];

//   const data = {};
//   const raceResponse = await fetch(
//     `http://ergast.com/api/f1/${raceYear}/${raceCircuit}/results.json`
//   );
//   data["RaceData"] = await raceResponse.json();
//   data["convertCountry"] =
//     convertCountry[
//       data?.RaceData?.MRData.RaceTable.Races[0].Circuit.Location.country
//     ];

//   await res.status(200).json(data);
// }
