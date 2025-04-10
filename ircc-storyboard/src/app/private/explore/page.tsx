"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Storyboard from "@/components/storyboard";

interface Step {
  step_number: number;
  title: string;
  description: string;
}

export default function ExplorePage() {
  const searchParams = useSearchParams();
  const promptParam = searchParams.get("prompt") || "";
  const stepParam = searchParams.get("step") || "";

  const effectivePrompt = promptParam || `Explain this step: "${stepParam}" with full details`;

  const [steps, setSteps] = useState<Step[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!stepParam) return; // At minimum, step must be present

    const fetchData = async () => {
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: effectivePrompt }),
        });

        const data = await res.json();
        const parsed = JSON.parse(data.result);

        if (Array.isArray(parsed)) {
          setSteps(parsed);
        } else {
          throw new Error("Unexpected response structure");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch expanded step.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [promptParam, stepParam]);

  return (
    <main className="max-w-5xl mx-auto p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Detailed Breakdown</h1>
      <p className="text-muted-foreground mb-6">
        Context: <strong>{stepParam}</strong>
      </p>
      {loading ? (
        <p className="text-muted-foreground">Fetching details for: {stepParam}...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <Storyboard steps={steps} originalPrompt={effectivePrompt} />
      )}
    </main>
  );
}
