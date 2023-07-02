import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="flex items-center flex-row w-full h-12 font-semibold lg:text-4xl text-2xl  px-10 lg:px-16 xl:px-72 pt-10  justify-between">
      <Link className="flex items-center" href="/">
        <Image
          src="/assets/images/F1.png"
          className="float-left mr-2"
          width={100}
          height={25}
          alt=""
        />

        <span>F1 Archive</span>
      </Link>

      <a
        type="button"
        className="flex hover:cursor-pointer bg-white h-8 lg:h-10 items-center rounded-l-full rounded-r-full text-sm lg:text-lg px-4 py-2 text-neutral-800 hover:scale-105 transition ease-in-out "
        href="https://github.com/colinchambachan/f1-archive"
        target="_blank"
      >
        <Image
          src="/assets/images/github.png"
          className="float-left mr-2"
          width={20}
          height={20}
          alt=""
        />
        <span>Github</span>
      </a>
    </div>
  );
};

export default Navbar;
