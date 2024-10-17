import { checkSubscription } from "@/lib/subscription";
import Info from "../_components/info";
import { Separator } from "@/components/ui/separator";
import SubscriptionButton from "../_components/subscription-button";

export default async function BillingPage() {
  const isPro = await checkSubscription();

  return (
    <div className="w-full">
      <Info isPro={isPro} />
      <Separator className="mt-2 mb-4" />
      <SubscriptionButton isPro={isPro} />
    </div>
  );
}
