import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="animate-fade">
        <div className=" flex justify-center items-center pt-12 lg:pt-40">
          <div className="lg:text-7xl text-3xl font-semibold max-w-xl text-center h-full">
            Welcome to the F1 Archive
          </div>
        </div>
        <div className="flex justify-center py-7">
          <div className="lg:text-xl text-sm max-w-lg  font-semibold text-center text-zinc-500">
            Get information about your favourite races at the click of a button!
          </div>
        </div>

        <div className="flex justify-center mt-5">
          <Link
            type="button"
            className="flex hover:cursor-pointer bg-red-700 text-white h-8 lg:h-10 items-center rounded-l-full rounded-r-full text-sm lg:text-lg px-4 py-2  hover:scale-105 transition ease-in-out "
            href="/search-by-race"
          >
            <span>Get Started</span>
          </Link>
        </div>
      </div>
    </>
  );
}
