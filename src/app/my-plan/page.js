"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useWorkoutPlan } from "@/components/WorkoutPlanProvider";

export default function MyPlanPage() {
	const { plan, saved, isReady, addToPlan, removeFromPlan, toggleSaved } = useWorkoutPlan();
	const [activeTab, setActiveTab] = useState("plan");
	const [sortBy, setSortBy] = useState("duration");
	const visibleExercises = activeTab === "plan" ? plan : saved;
	const sortedExercises = [...visibleExercises].sort((first, second) => {
		if (sortBy === "calories") return second.caloriesBurned - first.caloriesBurned;
		if (sortBy === "rating") return second.rating - first.rating;
		return first.duration - second.duration;
	});
	const summary = plan.reduce(
		(result, exercise) => ({
			exercises: result.exercises + 1,
			minutes: result.minutes + exercise.duration,
			calories: result.calories + exercise.caloriesBurned,
		}),
		{ exercises: 0, minutes: 0, calories: 0 },
	);

	function removeExercise(exercise) {
		if (activeTab === "plan") {
			removeFromPlan(exercise.id);
		} else {
			toggleSaved(exercise);
		}
	}

	return (
		<main className="mx-auto w-full max-w-360 flex-1 px-4 pb-10 pt-8 sm:px-6 lg:px-8">
			<header className="mb-6">
				<h1 className="text-3xl font-black uppercase leading-tight text-white">My Plan</h1>
				<p className="mt-1 text-sm text-zinc-400">
					Cap of five lifts for today. Finish them, then load more.
				</p>
			</header>

			<section
				aria-label="Today's plan summary"
				className="grid grid-cols-1 divide-y divide-white/5 rounded-xl border border-[#292c35] bg-[#15161d] sm:grid-cols-3 sm:divide-x sm:divide-y-0"
			>
				{[
					{ label: "Exercises", value: isReady ? summary.exercises : 0, highlight: true },
					{ label: "Minutes", value: isReady ? summary.minutes : 0 },
					{ label: "Calories", value: isReady ? summary.calories : 0 },
				].map((item) => (
					<div key={item.label} className="px-6 py-4 sm:py-5">
						<p className="text-xs text-zinc-500">{item.label}</p>
						<p className={`mt-1 text-4xl font-black leading-none ${item.highlight ? "text-[#b7ff00]" : "text-white"}`}>
							{item.value}
						</p>
					</div>
				))}
			</section>

			<div className="mt-6 flex flex-wrap items-center justify-between gap-3">
				<div role="tablist" aria-label="Plan views" className="tabs tabs-box bg-[#15161d] p-1">
					<button
						type="button"
						id="todays-plan-tab"
						role="tab"
						aria-selected={activeTab === "plan"}
						onClick={() => setActiveTab("plan")}
						className={`tab text-xs ${activeTab === "plan" ? "tab-active" : "text-zinc-400"}`}
					>
						Today&apos;s Plan
					</button>
					<button
						type="button"
						id="saved"
						role="tab"
						aria-selected={activeTab === "saved"}
						onClick={() => setActiveTab("saved")}
						className={`tab text-xs ${activeTab === "saved" ? "tab-active" : "text-zinc-400"}`}
					>
						Saved
					</button>
				</div>

				<label className="flex items-center gap-2 text-xs text-zinc-500">
					<span>Sort by</span>
					<select
						value={sortBy}
						onChange={(event) => setSortBy(event.target.value)}
						className="select select-sm border-[#292c35] bg-[#15161d] text-zinc-300"
					>
						<option value="duration">Duration</option>
						<option value="calories">Calories</option>
						<option value="rating">Rating</option>
					</select>
				</label>
			</div>

			{!isReady ? null : sortedExercises.length > 0 ? (
				<section
					aria-label={activeTab === "plan" ? "Exercises in today's plan" : "Saved workouts"}
					className="mt-4 space-y-3"
				>
					{sortedExercises.map((exercise) => (
						<article
							key={exercise.id}
							className="flex flex-col gap-4 rounded-xl border border-[#292c35] bg-[#15161d] p-4 sm:flex-row sm:items-center"
						>
							<div className="flex min-w-0 flex-1 items-center gap-4">
								<div className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-[#20222a]">
									<Image src={exercise.image} alt="" fill unoptimized className="object-cover" />
								</div>
								<div className="min-w-0">
									<h2 className="truncate text-base font-extrabold uppercase text-white">{exercise.name}</h2>
									<p className="mt-0.5 text-xs text-zinc-400">{exercise.equipment}</p>
									<div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-400">
										<span>{exercise.duration} min</span>
										<span>{exercise.caloriesBurned} kcal</span>
										<span><span className="text-[#b7ff00]" aria-hidden="true">★</span> {exercise.rating}</span>
									</div>
								</div>
							</div>
							<div className="flex shrink-0 items-center gap-2 sm:pl-4">
								<Link href={`/workouts/${exercise.id}`} className="btn btn-sm border-[#343947] bg-transparent text-xs font-normal text-zinc-200 hover:bg-white/5">
									View details
								</Link>
								{activeTab === "plan" ? (
									<button type="button" onClick={() => removeFromPlan(exercise.id, true)} className="btn btn-sm border-0 bg-[#b7ff00] text-xs font-semibold text-black hover:bg-[#c8ff4a]">
										<span aria-hidden="true">✓</span> Mark as done
									</button>
								) : (
									<button
										type="button"
										onClick={() => addToPlan(exercise)}
										disabled={plan.some((item) => String(item.id) === String(exercise.id)) || plan.length >= 5}
										className="btn btn-sm border-0 bg-[#b7ff00] text-xs font-semibold text-black hover:bg-[#c8ff4a] disabled:bg-white/10 disabled:text-zinc-500"
									>
										{plan.some((item) => String(item.id) === String(exercise.id)) ? "In today's plan" : "Add to plan"}
									</button>
								)}
								<button
									type="button"
									onClick={() => removeExercise(exercise)}
									className="btn btn-square btn-sm btn-ghost text-zinc-500 hover:text-white"
									aria-label={activeTab === "plan" ? `Remove ${exercise.name}` : `Remove ${exercise.name} from saved`}
								>
									×
								</button>
							</div>
						</article>
					))}
				</section>
			) : (
				<section className="mt-4 flex min-h-70 flex-col items-center justify-center rounded-xl border border-dashed border-[#292c35] px-6 text-center">
					<h2 className="text-lg font-black uppercase text-white">
						{activeTab === "plan" ? "Nothing here yet" : "No saved workouts yet"}
					</h2>
					<p className="mt-1 text-sm text-zinc-400">
						{activeTab === "plan"
							? "Browse the library and add a lift to get today moving."
							: "Save a workout from its details page and it will appear here."}
					</p>
					<Link href="/#workouts" className="btn mt-5 min-h-10 border-0 bg-[#b7ff00] px-6 text-xs font-semibold text-black hover:bg-[#c8ff4a]">
						Go to workouts
					</Link>
				</section>
			)}
		</main>
	);
}
