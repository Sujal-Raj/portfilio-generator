import { dbConnect } from "@/lib/db";
import Navbar from "@/components/layout/Navbar";
import HomePage from "@/components/layout/HomePage";
import HowItWorksPage from "@/components/layout/HowItWorks";

// dbConnect();
export default function Home() {
  return (
    <>
    <Navbar/>
    {/* <div className="bg-red-800">hello</div> */}
    <HomePage/>
    <HowItWorksPage/>
    </>
  );
}
