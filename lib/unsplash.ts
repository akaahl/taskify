import { UNSPLASH_ACCESS_KEY } from "@/env";
import { createApi } from "unsplash-js";

export const unsplash = createApi({
  accessKey: UNSPLASH_ACCESS_KEY!,
  fetch,
});
