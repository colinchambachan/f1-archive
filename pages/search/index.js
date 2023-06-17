import F1Select from "@/components/F1Select";
import Navbar from "@/components/Navbar";
import React from "react";
import { RaceYears } from "@/utils/Constants";

function Search() {
  return (
    <>
      <Navbar />

      <div className="">
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
          <F1Select id="Year" options={RaceYears} />
          <F1Select id="Circuit" options={RaceYears} />
        </div>
      </div>
    </>
  );
}

export default Search;
