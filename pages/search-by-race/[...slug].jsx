import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useRouter } from "next/router";
const RaceResults = () => {
  const router = useRouter();
  return (
    <>
      <Navbar />
      <Link href="/search-by-race" className="text-zinc-500">
        {" "}
        &lt; Return to Search
      </Link>
      <div>{router.query.slug}</div>
    </>
  );
};

export default RaceResults;
