// ✅ /src/app/private/prompt/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Storyboard from "@/components/storyboard";
import Navbar from "@/components/navbar";
import { Sparkles, Loader2 } from "lucide-react";
import ThemeToggle from "@/components/theme-toggle";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { rewritePrompt } from "@/lib/semanticRewriter";

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
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth");
    }
  }, [status, router]);

  if (status === "loading") return <div>Loading...</div>;

  const handleSubmit = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setSteps(null);
    setError(null);

    const rewritten = rewritePrompt(prompt, {
      userType: "student", // could be dynamic in future
      intent: "apply", // basic filtering assumption
    });

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: rewritten }),
      });

      const data = await res.json();
      const parsed = JSON.parse(data.result);

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 dark:from-gray-900 dark:to-black text-foreground transition-colors duration-300">
      <Navbar />
      <main className="max-w-4xl mx-auto px-6 py-12 space-y-10 animate-in fade-in-50 zoom-in-95">
        <ThemeToggle />

        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center bg-primary/10 p-3 rounded-full text-primary">
            <Sparkles className="w-6 h-6" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight">
            Welcome, {session?.user?.name}!
          </h1>
          <p className="text-muted-foreground text-sm">
            Ask how to do anything – from immigration steps to permit
            applications!
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-3 items-center justify-center">
          <Input
            placeholder="e.g. How to apply for a Canadian study permit"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="md:w-[60%]"
          />
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full md:w-auto"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="animate-spin w-4 h-4" /> Thinking...
              </span>
            ) : (
              "Ask"
            )}
          </Button>
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}

        {steps ? (
          <Card className="bg-card text-card-foreground border border-border rounded-xl shadow-md p-6 animate-in fade-in slide-in-from-bottom-3 overflow-y-auto max-h-[60vh] scroll-smooth">
            <Storyboard steps={steps} originalPrompt={prompt} />
          </Card>
        ) : (
          !loading && (
            <p className="text-muted-foreground text-center">
              Response will appear here as storyboard steps.
            </p>
          )
        )}
      </main>
    </div>
  );
}
