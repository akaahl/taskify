import LogoHeader from "@/components/LogoHeader";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 bg-white w-full h-[4.5rem] px-4 border-b shadow-sm flex items-center">
      <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between ">
        <LogoHeader />
        <div className="flex items-center justify-between w-full space-x-4 md:block md:w-auto">
          <Button variant="outline" asChild>
            <Link href="/sign-in">Sign in</Link>
          </Button>
          <Button asChild>
            <Link href="/sign-up">Get Taskify for free</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
