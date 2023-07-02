import Navbar from "@/components/Navbar";
import { convertCountry } from "@/utils/convertCountry";
import Image from "next/image";
import Link from "next/link";

export async function getServerSideProps(context) {
  const {
    params: { race },
  } = context;
  const raceYear = race[0];
  const raceCircuit = race[1];

  if (raceYear !== null && raceCircuit !== null) {
    const data = {};
    const raceResponse = await fetch(
      `http://ergast.com/api/f1/${raceYear}/${raceCircuit}/results.json`
    );
    data["RaceData"] = await raceResponse.json();
    data["convertCountry"] =
      convertCountry[
        data?.RaceData?.MRData.RaceTable.Races[0].Circuit.Location.country
      ];

    return { props: { data } };
  }
}

const RaceResults = ({ data }) => {
  return (
    <>
      <Navbar />
      <div className="mt-10 text-zinc-500 px-12 lg:px-24 xl:px-80 w-screen text-xl">
        <Link href="/search-by-race" className=" ">
          &lt; Return to Search
        </Link>
      </div>
      <div className="flex justify-center w-screen">
        {data && (
          <div className="animate-fade w-3/4 xl:w-3/5 mt-8">
            {/* TODO: data formatting for races not year completed, ie Saudi grand prix is yet to happen */}

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
                />
              </div>
            </div>
            <div className="flex items-center justify-between ">
              <div>
                <div>Date: {data.RaceData.MRData.RaceTable.Races[0].date}</div>
                <div>
                  Round: {data.RaceData.MRData.RaceTable.Races[0].round}
                </div>
              </div>
              <div>
                <div className="text-end">
                  Local Time:{" "}
                  {/* {data.RaceData.MRData.RaceTable.Races[0].time.split("Z")[0]} */}
                </div>
                <div className="text-end">
                  Location: [
                  {data.RaceData.MRData.RaceTable.Races[0].Circuit.Location.lat}
                  ,{" "}
                  {
                    data.RaceData.MRData.RaceTable.Races[0].Circuit.Location
                      .long
                  }
                  ]
                </div>
              </div>
            </div>

            <div className="border-2 border-x-0 border-b-0 px-5 mt-3 border-white"></div>
            <div>hi</div>
            <div>hi</div>
          </div>
        )}
      </div>
    </>
  );
};

export default RaceResults;
