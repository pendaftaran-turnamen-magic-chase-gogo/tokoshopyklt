"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ReactNode } from "react";

// The user provided: dev:grandiose-shepherd-97|eyJ...
// We extract the URL from the deployment name.
// Standard Convex URL format: https://<deployment-name>.convex.cloud
const CONVEX_URL = "https://grandiose-shepherd-97.convex.cloud";

const convex = new ConvexReactClient(CONVEX_URL);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
