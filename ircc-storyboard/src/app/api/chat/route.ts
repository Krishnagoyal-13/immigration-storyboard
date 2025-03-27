// ✅ /src/app/api/chat/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const userPrompt = body.prompt;

  if (!userPrompt) {
    return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
  }

  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`
      },
      body: JSON.stringify({
        model: "mistralai/mixtral-8x7b-instruct",
        messages: [
          {
            role: "system",
            content: "You are an assistant that only uses information from https://www.canada.ca/en/immigration-refugees-citizenship.html. Always respond with a valid, double-quoted JSON array. Do NOT explain. Do NOT wrap the response in triple backticks. Return ONLY JSON."
          },
          {
            role: "user",
            content: `${userPrompt}\n\nIf this is a high-level user query, return ONLY an array of JSON headlines like:\n[\n  {\n    \"step_number\": 1,\n    \"title\": \"Headline of step\"\n  },\n  ...\n]\n\nIf the prompt clearly refers to expanding a specific step, return detailed steps with title + description.`
          }
        ]
      })
    });

    const data = await res.json();
    const result = data.choices?.[0]?.message?.content || "No response.";

    return NextResponse.json({ result });
  } catch (error) {
    console.error("LLM Error:", error);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
