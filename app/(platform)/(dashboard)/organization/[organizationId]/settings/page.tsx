import { OrganizationProfile } from "@clerk/nextjs";

export default function Settings() {
  return (
    <div className="w-full">
      <OrganizationProfile
        appearance={{
          elements: {
            cardBox: {
              boxShadow: "none",
              width: "100%",
            },
            card: {
              border: "1px solid #e5e5e5",
              boxShadow: "none",
              width: "100%",
            },
            navbar: {
              background: "none !important",
            },
            scrollBox: {
              borderTopLeftRadius: "0px",
              borderBottomLeftRadius: "0px",
            },
          },
        }}
      />
    </div>
  );
}
