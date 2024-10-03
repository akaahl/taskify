import { OrganizationSwitcher } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

export default function OrganizationIdPage() {
  const { userId, orgId } = auth();

  return (
    <div>
      <OrganizationSwitcher />
    </div>
  );
}
