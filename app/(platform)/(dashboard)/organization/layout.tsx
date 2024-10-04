import React from "react";
import OrgControl from "./[organizationId]/_components/org-control";

export default function OrganizationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <OrgControl />
      {children}
    </>
  );
}
