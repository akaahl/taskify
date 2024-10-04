"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useOrganization,
  useOrganizationList,
} from "@clerk/nextjs";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { useLocalStorage } from "usehooks-ts";

interface SidebarProps {
  storageKey?: string;
}

export default function Sidebar({
  storageKey = "t-sidebar-state",
}: SidebarProps) {
  const [expanded, setExpanded] = useLocalStorage<
    Record<string, any>
  >(storageKey, {});

  const {
    organization: activeOrganization,
    isLoaded: isLoadedOrg,
  } = useOrganization();

  const { userMemberships, isLoaded: isLoadedList } =
    useOrganizationList({
      userMemberships: {
        infinite: true,
      },
    });

  const defaultAccordionValue: string[] = Object.keys(
    expanded,
  ).reduce((acc: string[], key: string) => {
    if (expanded[key]) {
      acc.push(key);
    }

    return acc;
  }, []);

  function onExpand(id: string) {
    setExpanded((curr) => ({
      ...curr,
      [id]: !expanded[id],
    }));
  }

  if (
    !isLoadedOrg ||
    !isLoadedList ||
    userMemberships.isLoading
  ) {
    return (
      <>
        <Skeleton />
      </>
    );
  }

  return (
    <>
      <div className="font-medium text-xs flex items-center mb-1">
        <span className="pl-4">Workspaces</span>
        <Button
          asChild
          type="button"
          variant="ghost"
          size="icon"
          className="ml-auto"
        >
          <Link href="/select-org">
            <PlusCircle className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </>
  );
}
