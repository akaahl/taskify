import LogoHeader from "@/components/LogoHeader";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 w-full p-4 border-t bg-slate-100">
      <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between ">
        <LogoHeader />
        <div className="flex items-center justify-between w-full space-x-4 md:block md:w-auto">
          <Button variant="ghost">Privacy policy</Button>
          <Button variant="ghost">Terms of service</Button>
        </div>
      </div>
    </footer>
  );
}
