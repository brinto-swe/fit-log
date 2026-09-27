import Banner from "@/components/Banner";
import WorkoutLibrary from "@/components/WorkoutLibrary";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-[1440px] flex-1 px-4 pb-16 pt-7 sm:px-6 sm:pt-9 lg:px-8">
      <Banner />
      <WorkoutLibrary />
    </main>
  );
}
