import React from "react";
import { startCase } from "lodash";
import Sidebar from "../../_components/Sidebar";
import { auth } from "@clerk/nextjs/server";

export async function generateMetadata() {
  const { orgSlug } = auth();

  return {
    title: startCase(orgSlug || "organization"),
  };
}

export default function OrganizationIdLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="pt-20 md:pt-24 px-4 max-w-6xl 2xl:max-w-screen mx-auto">
      <div className="flex gap-x-7">
        <div className="w-64 shrink-0 hidden md:block">
          <Sidebar />
        </div>
        {children}
      </div>
    </main>
  );
}
