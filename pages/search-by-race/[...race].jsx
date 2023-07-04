import Navbar from "@/components/Navbar";
import { convertCountry } from "@/utils/convertCountry";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export async function getServerSideProps(context) {
  const {
    params: { race },
  } = context;
  const raceYear = race[0];
  const raceCircuit = race[1];

  if (raceYear !== null && raceCircuit !== null) {
    const data = {};

    // Race info from Ergast API
    const raceResponse = await fetch(
      `http://ergast.com/api/f1/${raceYear}/${raceCircuit}/results.json`
    );
    data["RaceData"] = await raceResponse.json();

    if (data.RaceData.MRData.RaceTable.Races.length > 0) {
      data["convertCountry"] =
        convertCountry[
          data?.RaceData?.MRData.RaceTable.Races[0].Circuit.Location.country
        ];

      // Circuit info from Sports API
      const circuitResponse = await fetch(
        `https://v1.formula-1.api-sports.io/circuits?search=${data.RaceData.MRData.RaceTable.Races[0].Circuit.circuitId}`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "api-formula-1.p.rapidapi.com",
            "x-rapidapi-key": process.env.F1_API_KEY,
          },
        }
      );
      data["circuitData"] = await circuitResponse.json();
    }

    return { props: { data } };
  }
}

const RaceResults = ({ data }) => {
  const [screenWidth, setScreenWidth] = useState();
  const minScreenSize = 875;
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    // Add event listener to update width on window resize
    window.addEventListener("resize", handleResize);

    handleResize();
    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  console.log(data);
  return (
    <>
      <Navbar />
      <div className="mt-10 text-zinc-500 px-12 lg:px-24 xl:px-80 w-screen text-xl">
        <Link href="/search-by-race" className=" ">
          &lt; Return to Search
        </Link>
      </div>
      <div className="flex justify-center w-screen">
        {data.RaceData.MRData.RaceTable.Races.length > 0 && (
          <div className="animate-fade w-3/4 xl:w-3/5 mt-8 mb-10">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-extrabold text-xl lg:text-4xl">
                  {data.RaceData.MRData.RaceTable.season}{" "}
                  {data.RaceData.MRData.RaceTable.Races[0].raceName}
                </div>
                <div className="text-zinc-500">
                  {data.RaceData.MRData.RaceTable.Races[0].Circuit.circuitName}
                </div>
              </div>
              <div>
                <Image
                  width={75}
                  height={64}
                  src={`https://flagsapi.com/${data.convertCountry}/flat/64.png`}
                  alt={`${data.RaceData.MRData.RaceTable.Races[0].raceName} circuit`}
                />
              </div>
            </div>
            <div className="flex items-center justify-between ">
              <div className="w-1/2">
                <div>
                  {" "}
                  <span className="font-bold">Date:</span>{" "}
                  {data.RaceData.MRData.RaceTable.Races[0].date}
                </div>
                <div>
                  <span className="font-bold"> Round:</span>{" "}
                  {data.RaceData.MRData.RaceTable.Races[0].round}
                </div>
              </div>
              <div>
                <div className="text-end">
                  <span className="font-bold"> Laps:</span>{" "}
                  {data.circuitData?.response[0]?.laps}
                </div>
                <div className="text-end">
                  <span className="font-bold">Lap Record:</span>{" "}
                  {data.circuitData.response[0].lap_record.time} (
                  {data.circuitData.response[0].lap_record.driver} -{" "}
                  {data.circuitData.response[0].lap_record.year})
                </div>
              </div>
            </div>
            <div className="border-2 border-x-0 border-b-0 px-5 my-3 border-white"></div>
            <div className="text-2xl font-medium">Race Results</div>
            <div className="w-full mt-3">
              {" "}
              <table className="w-full text-center border-spacing-2">
                {/* <when less than 750px, hid car num, +/- */}
                <tr className="border-b-2 border-neutral-600 mb-2 ">
                  <th className="pb-2" width="10px">
                    Pos.
                  </th>
                  {screenWidth > minScreenSize && (
                    <th className="pb-2">Car Num.</th>
                  )}
                  <th className="pb-2" width="300px">
                    Name
                  </th>
                  <th className="pb-2 mb-2">Team</th>
                  <th className="pb-2" width="150px">
                    Time / Status
                  </th>
                  {screenWidth > minScreenSize && (
                    <th className="pb-2">Quali</th>
                  )}
                  {screenWidth > minScreenSize && <th className="pb-2">+/-</th>}
                  <th className="pb-2">Points</th>
                </tr>

                {data.RaceData.MRData.RaceTable.Races[0].Results.map(
                  (finish) => {
                    return (
                      <tr height="50px">
                        <td className="text-center" height="">
                          {finish.positionText}
                        </td>
                        {screenWidth > minScreenSize && (
                          <td className="text-center" width="100px">
                            {finish.number}
                          </td>
                        )}
                        <td>
                          {finish.Driver.givenName} {finish.Driver.familyName}
                        </td>
                        <td>{finish.Constructor.name}</td>
                        <td className="text-center">
                          {finish.Time ? finish.Time.time : finish.status}
                        </td>
                        {screenWidth > minScreenSize && <td>{finish.grid}</td>}
                        {screenWidth > minScreenSize && (
                          <td>
                            {finish.positionText === "R"
                              ? "-"
                              : finish.grid - finish.position > 0
                              ? "+" + (finish.grid - finish.position)
                              : finish.grid - finish.position}
                          </td>
                        )}
                        <td>{finish.points > 0 ? "+" + finish.points : "-"}</td>
                      </tr>
                    );
                  }
                )}
              </table>
              <div className="w-full flex flex-wrap text-sm mt-10 justify-center text-neutral-600">
                For more information:
                <Link
                  className="transition ease-in-out hover:underline underline-offset-4 ms-3"
                  href={data.RaceData.MRData.RaceTable.Races[0].url}
                  target="_blank"
                >
                  {data.RaceData.MRData.RaceTable.Races[0].url}
                </Link>
              </div>
            </div>
          </div>
        )}

        {data.RaceData.MRData.RaceTable.Races.length === 0 && (
          <div className="text-center justify-center">
            <Image src="/assets/images/TBD.png" width="612" height="500" />
            <div className="mb-3">
              This race hasn't happened yet! Check back soon!
            </div>
            <Link href={`/search-by-race`}>
              <button className=" hover:cursor-pointer bg-white  border-red-700 text-red-700 h-8 lg:h-10 items-center rounded-l-full rounded-r-full text-sm lg:text-lg px-4 py-2  hover:scale-105 transition ease-in-out duration-300 ">
                <span> &lt; Return to Search</span>
              </button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default RaceResults;
