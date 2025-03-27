"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, Loader2 } from "lucide-react";

interface Substep {
  step_number: number;
  title: string;
  description: string;
}

interface Step {
  step_number: number;
  title: string;
  description?: string;
  substeps?: Substep[];
}

interface StoryboardProps {
  steps: Step[];
  originalPrompt?: string;
}

export default function Storyboard({
  steps,
  originalPrompt = "",
}: StoryboardProps) {
  const [activeStepIndex, setActiveStepIndex] = useState<number | null>(null);
  const [dynamicSteps, setDynamicSteps] = useState<Step[]>(steps);
  const [loadingSubsteps, setLoadingSubsteps] = useState(false);
  const router = useRouter();

  const handleStepClick = async (index: number) => {
    const step = dynamicSteps[index];

    if (step.description) {
      setLoadingSubsteps(true);
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            prompt: `Break down the step \"${step.title}\" into detailed steps with title and description.`,
          }),
        });
        const data = await res.json();
        const parsed = JSON.parse(data.result);

        const updatedSteps = [...dynamicSteps];
        updatedSteps[index] = { ...updatedSteps[index], substeps: parsed };
        setDynamicSteps(updatedSteps);
        setActiveStepIndex(index);
      } catch (err) {
        console.error("Failed to fetch substeps:", err);
      } finally {
        setLoadingSubsteps(false);
      }
    } else {
      // Navigate to detailed explore page using original prompt and clicked title
      router.push(
        `/explore?prompt=${encodeURIComponent(
          originalPrompt
        )}&step=${encodeURIComponent(step.title)}`
      );
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
      {/* Step list */}
      <div className="space-y-4">
        {dynamicSteps.map((step, index) => (
          <Card
            key={step.step_number}
            className="cursor-pointer shadow-md hover:shadow-xl transition"
            onClick={() => handleStepClick(index)}
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                  {step.description && (
                    <p className="text-sm text-gray-600">{step.description}</p>
                  )}
                </div>
                <ChevronRight className="text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Substep detail */}
      <div className="bg-white rounded-xl shadow-md p-4 min-h-[300px]">
        {activeStepIndex !== null ? (
          <>
            <h2 className="text-xl font-bold mb-2">
              {dynamicSteps[activeStepIndex].title}
            </h2>
            {dynamicSteps[activeStepIndex].description && (
              <p className="mb-4 text-gray-700">
                {dynamicSteps[activeStepIndex].description}
              </p>
            )}
            {loadingSubsteps ? (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="animate-spin" /> Fetching substeps from
                LLM...
              </div>
            ) : dynamicSteps[activeStepIndex].substeps ? (
              <div className="space-y-3">
                {dynamicSteps[activeStepIndex].substeps!.map((sub, i) => (
                  <div key={i} className="border-l-4 border-blue-500 pl-4">
                    <h4 className="text-md font-semibold">{sub.title}</h4>
                    <p className="text-sm text-gray-600">{sub.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">
                No additional substeps available.
              </p>
            )}
          </>
        ) : (
          <p className="text-muted-foreground">
            Select a step to see more details.
          </p>
        )}
      </div>
    </div>
  );
}
