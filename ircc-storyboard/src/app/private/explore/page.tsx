"use client";

import { Suspense } from "react";
import ExplorePageClient from "@/components/explore-client";

export default function ExplorePage() {
  return (
    <main className="max-w-5xl mx-auto p-6 min-h-screen">
      <Suspense fallback={<p className="text-muted-foreground">Loading...</p>}>
        <ExplorePageClient />
      </Suspense>
    </main>
  );
}