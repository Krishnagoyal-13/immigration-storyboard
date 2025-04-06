import Storyboard from "@/components/storyboard";
import studyData from "@/data/study_permit.json";

export default function StoryboardPage() {
  return (
    <main className="p-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Study Permit Storyboard</h1>
      <Storyboard steps={studyData} />
    </main>
  );
}
