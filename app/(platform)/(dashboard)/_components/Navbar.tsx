import LogoHeader from "@/components/LogoHeader";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="fixed z-50 top-0 px-4 border-bw-full h-[4.5rem] shadow-sm bg-white flex items-center">
      <div className="flex items-center gap-x-4">
        <div className="hidden md:flex">
          <LogoHeader />
        </div>
        <Button className="rounded-md hidden md:block h-auto py-1.5 px-2">
          Create
        </Button>
      </div>
    </nav>
  );
}
