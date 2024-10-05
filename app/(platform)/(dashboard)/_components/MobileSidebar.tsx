"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useMobileSidebar } from "@/hooks/useMobileSidebar";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";

export default function MobileSidebar() {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const isOpen = useMobileSidebar((state) => state.isOpen);
  const onClose = useMobileSidebar((state) => state.onClose);
  const onOpen = useMobileSidebar((state) => state.onOpen);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  if (!isMounted) return null;

  return (
    <>
      <Button
        onClick={onOpen}
        className="block md:hidden mr-3"
        variant="ghost"
      >
        <Menu className="h-4 w-4" />
      </Button>
      <Sheet
        open={isOpen}
        onOpenChange={onClose}
      >
        <SheetContent
          side="left"
          className="p2 pt-10"
        >
          <Sidebar storageKey="t-sidebar-mobile-state" />
        </SheetContent>
      </Sheet>
    </>
  );
}
