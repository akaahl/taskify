import { STRIPE_API_KEY } from "@/env";
import Stripe from "stripe";

export const stripe = new Stripe(STRIPE_API_KEY!, {
  apiVersion: "2024-09-30.acacia",
  typescript: true,
});
