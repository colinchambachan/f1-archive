import Navbar from "@/components/Navbar";
import Image from "next/image";

const NotFound = () => {
  return (
    <>
      <Navbar />
      <div className="h-screen">
        <div className=" pt-12 lg:pt-40">
          <div className="flex justify-center mt-5">
            <Image
              src="/assets/images/RedFlag.png"
              className="float-left mr-2"
              width={100}
              height={20}
              alt=""
            />
          </div>
          <div className=" flex justify-center items-center ">
            <div className="lg:text-7xl text-3xl font-semibold  text-center h-full">
              Red Flag on the track...
            </div>
          </div>
          <div className="flex justify-center py-7">
            <div className="lg:text-xl text-sm  font-semibold text-center text-zinc-500">
              Looks like the page you tried access doesn't exist :(
            </div>
          </div>

          <div className="flex justify-center mt-5">
            <a
              type="button"
              className="flex hover:cursor-pointer bg-red-700 text-white h-8 lg:h-10 items-center rounded-l-full rounded-r-full text-sm lg:text-lg px-4 py-2  hover:scale-105 transition ease-in-out "
              href="/"
            >
              <span>Home page</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
