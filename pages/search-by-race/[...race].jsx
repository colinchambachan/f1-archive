import Navbar from "@/components/Navbar";
import { data } from "autoprefixer";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const RaceResults = () => {
  const [data, setData] = useState(null);
  const router = useRouter();
  const raceYear = router.query.race ? router.query.race[0] : null;
  const raceCircuit = router.query.race ? router.query.race[1] : null;

  const fetchResults = async (year, circuit) => {
    try {
      const response = await fetch(`/api/getRaceResults/${year}/${circuit}`);
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchResults(raceYear, raceCircuit);
  }, [raceYear, raceCircuit]);

  return (
    <>
      <Navbar />
      <div className="mt-10 text-zinc-500 px-80 w-screen text-xl">
        <Link href="/search-by-race" className=" ">
          {" "}
          &lt; Return to Search
        </Link>
      </div>
      <div className="flex w-screen justify-center">
        {!data && (
          <Image
            src="/assets/images/Loading.gif"
            width="10"
            height="0"
            alt="Loading..."
            style={{ width: "40%" }}
          />
        )}
        {raceYear} {raceCircuit}
      </div>
    </>
  );
};

export default RaceResults;
