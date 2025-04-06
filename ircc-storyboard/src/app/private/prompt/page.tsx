"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Storyboard from "@/components/storyboard"
import Navbar from "@/components/navbar"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

interface Step {
  step_number: number
  title: string
  description: string
  substeps?: Step[]
}

export default function PromptPage() {
  const [prompt, setPrompt] = useState("")
  const [steps, setSteps] = useState<Step[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth")
    }
  }, [status, router])

  if (status === "loading") return <div>Loading...</div>

  const handleSubmit = async () => {
    if (!prompt.trim()) return

    setLoading(true)
    setSteps(null)
    setError(null)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      })

      const data = await res.json()
      const parsed = JSON.parse(data.result)

      if (Array.isArray(parsed)) {
        setSteps(parsed)
      } else {
        setError("The response format was not valid steps JSON.")
      }
    } catch (err) {
      console.error("Prompt error:", err)
      setError("Something went wrong. See console.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-2">
          Welcome, {session?.user?.name}!
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Ask an immigration-related question to generate a storyboard.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <Input
            placeholder="e.g., How to apply for PR in Canada?"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="flex-1"
          />
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Thinking..." : "Ask"}
          </Button>
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}

        {steps ? (
          <Storyboard steps={steps} />
        ) : (
          !loading && (
            <p className="text-center text-gray-400">
              Your storyboard will appear here after you ask a question.
            </p>
          )
        )}
      </main>
    </div>
  )
}
