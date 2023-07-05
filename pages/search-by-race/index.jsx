import F1Select from "@/components/F1Select";
import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import { RaceYears } from "@/utils/Constants";
import Link from "next/link";
import Image from "next/image";

function Search() {
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedCircuit, setSelectedCircuit] = useState(null);
  const [circuitOptions, setCiruitOptions] = useState([]);
  const [invalidInput, setInvalidInput] = useState(true);
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);

  const getCiruits = async (selectedYear) => {
    if (selectedYear !== "Choose a Year" && selectedYear !== null) {
      const response = await fetch(`api/getRespectiveCircuits/${selectedYear}`);
      const data = await response.json();
      setCiruitOptions(data);
      setLoading(false);
    } else {
      setCiruitOptions([]);
      setLoading(false);
    }
  };

  // Update selected circuits everytime selected year is changed
  useEffect(() => {
    setLoading(true);
    getCiruits(selectedYear);
  }, [selectedYear]);

  // Check to see if button should be enabled
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
      setShowError(false);
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

        <div className="flex flex-wrap  justify-center mt-10">
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
            <button
              onClick={() => {
                if (invalidInput) {
                  setShowError(true);
                } else {
                  setLoading(true);
                }
              }}
              className="flex hover:cursor-pointer bg-white  border-red-700 text-red-700 h-8 lg:h-10 items-center rounded-l-full rounded-r-full text-sm lg:text-lg px-4 py-2  hover:scale-105 transition ease-in-out duration-300 "
            >
              <span>Search</span>
            </button>
          </Link>
        </div>
        {loading && (
          <div className="flex justify-center pt-6">
            <Image src="/assets/images/712.gif" width="20" height="20" />
          </div>
        )}
        {showError && (
          <div className="transition-all animate-fadeInQuick ease-in-out duration-300 flex justify-center pt-5 ">
            * Please select both a year and a circuit
          </div>
        )}
      </div>
    </>
  );
}

export default Search;
