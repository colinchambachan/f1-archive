import F1Select from "@/components/F1Select";
import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import { RaceYears } from "@/utils/Constants";
import Link from "next/link";

function Search() {
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedCircuit, setSelectedCircuit] = useState(null);
  const [circuitOptions, setCiruitOptions] = useState([]);
  const [invalidInput, setInvalidInput] = useState(true);

  // Fetch circuits corresponding to selected year
  const fetchRespectiveCircuits = async () => {
    if (selectedYear !== "Choose a Year" && selectedYear !== null) {
      await fetch(`http://ergast.com/api/f1/${selectedYear}.json`)
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
          setCiruitOptions(circuits);
        });
    } else {
      setCiruitOptions([]);
    }
  };

  // Update selected circuits everytime selected year is changed
  useEffect(() => {
    fetchRespectiveCircuits();
  }, [selectedYear]);

  // Chec
  useEffect(() => {
    if (
      selectedYear === "Choose a Year" ||
      selectedYear === null ||
      selectedCircuit === "Choose a Circuit" ||
      selectedCircuit === null
    ) {
      setInvalidInput(true);
    } else {
      setInvalidInput(false);
    }
  }, [selectedYear, selectedCircuit]);

  return (
    <>
      <Navbar />

      <div className="mt-16">
        <div className=" pt-12 lg:pt-18">
          <div className="lg:text-6xl text-5xl font-semibold  text-center h-full">
            Search by Race
          </div>
        </div>
        <div className="flex justify-center py-3">
          <div className="lg:text-xl text-sm max-w-lg  font-semibold text-center text-zinc-500">
            Search info based on year and circuit
          </div>
        </div>

        <div className="flex justify-center mt-10">
          <F1Select id="Year" options={RaceYears} setValue={setSelectedYear} />
          <F1Select
            id="Circuit"
            options={circuitOptions}
            setValue={setSelectedCircuit}
          />
        </div>

        <div className="flex justify-center">
          <Link
            href={
              invalidInput
                ? ""
                : `/search-by-race/${selectedYear}/${selectedCircuit}`
            }
          >
            <button className="flex hover:cursor-pointer bg-white  border-red-700 text-red-700 h-8 lg:h-10 items-center rounded-l-full rounded-r-full text-sm lg:text-lg px-4 py-2  hover:scale-105 transition ease-in-out ">
              <span>Search</span>
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Search;
