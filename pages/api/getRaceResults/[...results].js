export default async function handler(req, res) {
  const raceYear = req.query.results[0];
  const raceCircuit = req.query.results[1];

  const response = await fetch(
    `http://ergast.com/api/f1/${raceYear}/${raceCircuit}/results.json`
  );
  const data = await response.json();

  await res.status(200).json(data);
}
