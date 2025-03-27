import requests
from bs4 import BeautifulSoup
from openai import OpenAI
import json

# === CONFIGURATION ===
OPENROUTER_API_KEY = "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"  # <-- replace this!
BASE_URL = "https://www.canada.ca"
START_URL = f"{BASE_URL}/en/immigration-refugees-citizenship/services/study-canada/study-permit.html"
MODEL = "mistralai/mixtral-8x7b-instruct"

# === SETUP OPENROUTER CLIENT ===
client = OpenAI(
    api_key=OPENROUTER_API_KEY,
    base_url="https://openrouter.ai/api/v1"
)

# === FUNCTION TO EXTRACT MAIN PAGE TEXT ===
def extract_page_text(url):
    print(f"🔍 Scraping page content: {url}")
    res = requests.get(url)
    soup = BeautifulSoup(res.content, 'html.parser')
    main = soup.find('div', class_='col-md-8') or soup.find('main')
    if not main:
        print("⚠️ Could not find main content area.")
        return ""
    return main.get_text(separator="\n", strip=True)

# === FUNCTION TO QUERY THE LLM ===
def send_to_llm(raw_text):
    print("🤖 Sending content to LLM for storyboard generation...")
    prompt = f"""
You are an immigration assistant helping international students.

Analyze the IRCC Study Permit page content below and break it into a storyboard format for a visual guidance tool.

Each step should have:
- A short title
- A 1–2 sentence description
- Approx. 7–10 major steps

Respond in JSON format:
[
  {{
    "step_number": 1,
    "title": "Step title",
    "description": "Explanation of this step..."
  }},
  ...
]

CONTENT:
{raw_text}
"""
    response = client.chat.completions.create(
        model=MODEL,
        messages=[{"role": "user", "content": prompt}]
    )
    return response.choices[0].message.content

# === FUNCTION TO SAVE OUTPUT ===
def save_output(json_text, filename='study_permit_storyboard_llm.json'):
    try:
        parsed = json.loads(json_text)
        with open(filename, 'w') as f:
            json.dump(parsed, f, indent=2)
        print(f"✅ Saved structured storyboard to {filename}")
    except Exception as e:
        print("⚠️ LLM response is not valid JSON. Saving raw text instead.")
        fallback = filename.replace(".json", ".txt")
        with open(fallback, 'w') as f:
            f.write(json_text)
        print(f"⚠️ Saved raw LLM response to {fallback}")

# === MAIN ENTRY POINT ===
def main():
    page_text = extract_page_text(START_URL)
    if not page_text:
        print("❌ Aborting: No page content found.")
        return
    llm_output = send_to_llm(page_text)
    save_output(llm_output)

if __name__ == "__main__":
    main()
