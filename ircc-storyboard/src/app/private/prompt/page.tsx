"use client";

import { useState,useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Storyboard from "@/components/storyboard";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'
interface Step {
  step_number: number;
  title: string;
  description: string;
  substeps?: Step[];
}

export default function PromptPage() {
  const [prompt, setPrompt] = useState("");
  const [steps, setSteps] = useState<Step[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth') // Redirect to login if not signed in
    }
  }, [status, router])

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  const handleSubmit = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setSteps(null);
    setError(null);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      const parsed = JSON.parse(data.result); // expects JSON from LLM
      if (Array.isArray(parsed)) {
        setSteps(parsed);
      } else {
        setError("The response format was not valid steps JSON.");
      }
    } catch (err) {
      console.error("Prompt error:", err);
      setError("Something went wrong. See console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <main className="p-6 max-w-5xl mx-auto min-h-screen">
      <h1 className="text-2xl font-bold mb-4">AI-Powered Storyboard Builder</h1>
      <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome, {session?.user?.name}!</h1>
      <p className="mt-2 text-gray-600">You're signed in and can use the app.</p>
    </div>
      <div className="flex gap-2 mb-6">
        <Input
          placeholder="Ask about a process (e.g., how to apply for PR)..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? "Thinking..." : "Ask"}
        </Button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {steps ? (
        <Storyboard steps={steps} />
      ) : (
        !loading && (
          <p className="text-muted-foreground">
            Response will appear here as storyboard steps.
          </p>
        )
      )}
    </main>
  );
}
