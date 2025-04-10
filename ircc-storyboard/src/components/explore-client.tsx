"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Storyboard from "@/components/storyboard";

interface Step {
  step_number: number;
  title: string;
  description: string;
}

export default function ExplorePageClient() {
  const searchParams = useSearchParams();
  const prompt = searchParams.get("prompt") || "";
  const step = searchParams.get("step") || "";
  const [steps, setSteps] = useState<Step[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!prompt || !step) return;
    const fullPrompt = `${prompt}. Now expand in detail: ${step}`;

    const fetchData = async () => {
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: fullPrompt }),
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
  }, [prompt, step]);

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Detailed Breakdown</h1>
      <p className="text-muted-foreground mb-6">
        Context: <strong>{prompt}</strong>
      </p>
      {loading ? (
        <p className="text-muted-foreground">Fetching details for: {step}...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <Storyboard steps={steps} />
      )}
    </>
  );
}
