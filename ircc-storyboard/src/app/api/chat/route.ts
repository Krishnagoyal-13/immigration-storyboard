import { NextRequest, NextResponse } from "next/server";

// Extract the most detailed JSON array from LLM output
function sanitizeJsonFromLLM(content: string): string {
  const matches = content.match(/\[[\s\S]*?\]/g); // Match all arrays

  if (!matches || matches.length === 0) return "";

  // Prefer the one that includes descriptions
  const detailed = matches.find((json) => json.includes("description"));
  return (detailed || matches[0]).trim();
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const userPrompt = body.prompt;

  if (!userPrompt) {
    return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000); // 15s max

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: "mistralai/mixtral-8x7b-instruct",
        messages: [
          {
            role: "system",
            content: `You are an assistant that only uses information from https://www.canada.ca/en/immigration-refugees-citizenship.html. Always respond with a valid, double-quoted JSON array. Do NOT explain. Do NOT wrap the response in triple backticks. Return ONLY JSON.

            Each item must include:
            - "step_number"
            - "title"
            - "description" (mandatory, even for high-level steps)

            Example:
            [
              {
                "step_number": 1,
                "title": "Check your eligibility",
                "description": "Use the online tool to assess your eligibility for Canadian immigration programs."
              }
            ]`
          },
          {
            role: "user",
            content: userPrompt,
          },
        ],
      }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    const data = await res.json();
    const rawContent = data?.choices?.[0]?.message?.content;

    console.log("Raw LLM Response:", rawContent);

    if (!rawContent || typeof rawContent !== "string") {
      console.error("No content returned from LLM.");
      return NextResponse.json({ error: "No response from LLM." }, { status: 500 });
    }

    const cleaned = sanitizeJsonFromLLM(rawContent);

    if (!cleaned || cleaned === "undefined") {
      console.error("Sanitized response was empty or invalid.");
      return NextResponse.json({ error: "Invalid cleaned JSON." }, { status: 500 });
    }

    try {
      JSON.parse(cleaned);
    } catch (err) {
      console.error("LLM JSON parse error:", cleaned);
      return NextResponse.json(
        { error: "LLM returned invalid JSON format", raw: cleaned },
        { status: 500 }
      );
    }

    return NextResponse.json({ result: cleaned });
  } catch (error) {
    console.error("LLM Fetch Error:", error);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}