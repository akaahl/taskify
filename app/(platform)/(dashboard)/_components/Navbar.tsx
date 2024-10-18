import LogoHeader from "@/components/LogoHeader";
import { Button } from "@/components/ui/button";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import MobileSidebar from "./MobileSidebar";
import FormPopover from "@/components/form/FormPopover";

export default function Navbar() {
  return (
    <nav className="fixed z-50 top-0 px-4 border-b w-full h-[4.5rem] shadow-sm bg-white flex items-center">
      <MobileSidebar />
      <div className="flex items-center gap-x-4">
        <div className="hidden md:flex">
          <LogoHeader />
        </div>
        <FormPopover
          align="start"
          side="bottom"
          sideOffset={18}
        >
          <Button className="rounded-md hidden md:block h-auto py-1.5 px-2 text-md">
            Create
          </Button>
        </FormPopover>
        <FormPopover>
          <Button className="rounded-sm block md:hidden">
            <Plus className="h-4 w-4" />
          </Button>
        </FormPopover>
      </div>
      <div className="ml-auto flex items-center gap-x-2">
        <OrganizationSwitcher
          hidePersonal
          afterCreateOrganizationUrl={"/organization/:id"}
          afterLeaveOrganizationUrl={"/organization/:id"}
          afterSelectOrganizationUrl={"/select-org"}
          appearance={{
            elements: {
              organizationPreviewAvatarBox: {
                height: "30px",
                width: "30px",
              },
              organizationPreviewMainIdentifier: {
                fontSize: "18px",
              },
              rootBox: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              },
            },
          }}
        />
        <UserButton
          appearance={{
            elements: {
              userButtonAvatarBox: {
                height: "40px",
                width: "40px",
              },
            },
          }}
        />
      </div>
    </nav>
  );
}
