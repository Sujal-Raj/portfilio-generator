
import {
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export default function Navbar() {
  return (
    <nav className="border-b-2 h-[8vh] flex items-center justify-between px-10 ">
      <h1 className="text-2xl font-light tracking-tighter">Portfolio</h1>
      <SignedOut>
        <SignUpButton>
          <button className="bg-gray-600  text-white rounded-md font-bold  text-sm sm:text-sm p-2 px-4 cursor-pointer hover:bg-gray-700 transition-all ease-in">
            Sign Up
          </button>
        </SignUpButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </nav>
  );
}
