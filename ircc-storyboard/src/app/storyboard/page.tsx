import Storyboard from "@/components/storyboard";
import studyData from "@/data/study_permit.json";

export default function StoryboardPage() {
  return (
     <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 dark:from-gray-900 dark:to-black text-foreground transition-colors duration-300 py-12 px-6">
      <h1 className="text-2xl font-bold mb-4">Study Permit Storyboard</h1>
      <Storyboard steps={studyData} />
    </main>
  );
}
