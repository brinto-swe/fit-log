"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useWorkoutPlan } from "@/components/WorkoutPlanProvider";
import logoImage from "../assets/logo.png";

export default function Navbar() {
  const pathname = usePathname();
  const isPlanPage = pathname === "/my-plan";
  const { plan, saved, isReady } = useWorkoutPlan();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#0b0c0f]/95 shadow-lg shadow-black/10 backdrop-blur">
      <nav
        aria-label="Main navigation"
        className="navbar mx-auto min-h-16 max-w-360 px-4 sm:px-6 lg:px-8"
      >
        <Link href="/#top" className="flex items-center gap-2" aria-label="FitLog home">
          <Image src={logoImage} alt="" width={18} height={18} priority />
          <span className="text-sm font-extrabold tracking-[0.08em] text-white">FITLOG</span>
        </Link>

        <div className="mx-auto flex items-center gap-2">
          <Link
            href="/#workouts"
            className={`btn btn-sm border-0 px-4 text-xs font-medium ${isPlanPage ? "bg-transparent text-zinc-400 hover:bg-white/5 hover:text-white" : "bg-[#a8f000]/10 text-[#b7ff00] hover:bg-[#a8f000]/15"}`}
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            className={`btn btn-sm border-0 px-4 text-xs font-medium ${isPlanPage ? "bg-[#a8f000]/10 text-[#b7ff00] hover:bg-[#a8f000]/15" : "bg-transparent text-zinc-400 hover:bg-white/5 hover:text-white"}`}
            aria-current={isPlanPage ? "page" : undefined}
          >
            My Plan
          </Link>
        </div>

        <div className="ml-auto flex items-center gap-3">
          <Link href="/my-plan" className="flex items-center gap-2 text-xs text-zinc-300">
            Plan
            <span className="badge badge-xs border-0 bg-[#a8f000] text-black">
              {isReady ? plan.length : 0}
            </span>
          </Link>
          <Link href="/my-plan#saved" className="hidden items-center gap-2 text-xs text-zinc-400 hover:text-white sm:flex">
            Saved <span className="badge badge-xs border border-white/15 bg-transparent text-zinc-300">{isReady ? saved.length : 0}</span>
          </Link>
          <Link
            href="/my-plan#saved"
            className="btn btn-circle btn-ghost btn-xs border border-white/10 text-zinc-400 hover:bg-white/10 hover:text-white sm:hidden"
            aria-label="Open saved workouts"
            title="Saved workouts"
          >
            <svg viewBox="0 0 24 24" fill="none" className="size-3.5" aria-hidden="true">
              <path d="M7 4.75h10a1 1 0 0 1 1 1v14l-6-3.5-6 3.5v-14a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </nav>
    </header>
  );
}