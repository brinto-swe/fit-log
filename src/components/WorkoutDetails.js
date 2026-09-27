"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useWorkoutPlan } from "@/components/WorkoutPlanProvider";

const API_URLS = [
	"https://api.api-store.workers.dev/api/fitlog",
	"https://api.abcz.workers.dev/api/fitlog",
];

function MetricRow({ label, value }) {
	return (
		<div className="flex min-h-11 items-center justify-between gap-4 border-b border-white/5 px-4 last:border-b-0">
			<dt className="text-[11px] font-bold uppercase tracking-wide text-zinc-500">{label}</dt>
			<dd className="text-sm text-zinc-200">{value}</dd>
		</div>
	);
}

export default function WorkoutDetails({ id }) {
	const { plan, saved, isReady, addToPlan, toggleSaved } = useWorkoutPlan();
	const [workout, setWorkout] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const isInPlan = plan.some((item) => String(item.id) === String(id));
	const isSaved = saved.some((item) => String(item.id) === String(id));

	useEffect(() => {
		let isActive = true;

		async function loadWorkout() {
			for (const baseUrl of API_URLS) {
				try {
					const response = await fetch(`${baseUrl}/${encodeURIComponent(id)}`);
					if (!response.ok) continue;

					const data = await response.json();
					const selectedWorkout = Array.isArray(data)
						? data.find((item) => String(item.id) === id)
						: data;

					if (selectedWorkout && String(selectedWorkout.id) === id) {
						if (isActive) setWorkout(selectedWorkout);
						break;
					}
				} catch {
					continue;
				}
			}

			if (isActive) setIsLoading(false);
		}

		loadWorkout();
		return () => {
			isActive = false;
		};
	}, [id]);

	if (isLoading) {
		return (
			<main className="mx-auto grid w-full max-w-[1440px] flex-1 gap-8 px-4 py-8 sm:px-6 lg:grid-cols-2 lg:gap-10 lg:px-8">
				<div className="skeleton aspect-[4/5] w-full rounded-xl bg-white/5" />
				<div className="space-y-5 py-2">
					<div className="skeleton h-10 w-3/4 bg-white/5" />
					<div className="skeleton h-16 w-full bg-white/5" />
					<div className="skeleton h-56 w-full bg-white/5" />
				</div>
			</main>
		);
	}

	if (!workout) {
		return (
			<main className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col items-start px-4 py-12 sm:px-6 lg:px-8">
				<div role="alert" className="alert border border-white/10 bg-[#15161d] text-zinc-300">
					<span>Workout details could not be loaded. The workout may not exist or the API may be unavailable.</span>
				</div>
				<Link href="/#workouts" className="btn btn-ghost mt-4 text-[#b7ff00]">
					Back to workouts
				</Link>
			</main>
		);
	}

	return (
		<main className="mx-auto grid w-full max-w-[1440px] flex-1 gap-7 px-4 py-8 sm:px-6 lg:grid-cols-2 lg:gap-10 lg:px-8 lg:py-8">
			<div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-[#292c35] bg-[#15161d] lg:sticky lg:top-24 lg:aspect-[4/5] lg:max-h-[calc(100vh-8rem)]">
				<Image
					src={workout.image}
					alt={workout.name}
					fill
					priority
					unoptimized
					sizes="(min-width: 1024px) 46vw, 100vw"
					className="object-cover"
				/>
			</div>

			<div className="py-1 lg:py-0">
				<Link href="/#workouts" className="mb-5 inline-flex text-xs font-medium text-zinc-500 hover:text-[#b7ff00]">
					← All workouts
				</Link>
				<h1 className="text-3xl font-black uppercase leading-tight text-white sm:text-4xl">
					{workout.name}
				</h1>
				<p className="mt-2 text-sm leading-6 text-zinc-400">{workout.description}</p>

				<div className="mt-4 flex flex-wrap gap-2">
					{workout.muscleGroups?.map((group) => (
						<span key={group} className="badge badge-sm border-0 bg-[#b7ff00] font-semibold text-black">
							{group}
						</span>
					))}
				</div>

				<dl className="mt-5 overflow-hidden rounded-xl border border-[#252833] bg-[#151821]">
					<MetricRow label="Equipment" value={workout.equipment} />
					<MetricRow label="Difficulty" value={workout.difficulty} />
					<MetricRow label="Sets" value={workout.sets} />
					<MetricRow label="Reps" value={workout.reps} />
					<MetricRow label="Duration" value={`${workout.duration} min`} />
					<MetricRow label="Calories" value={`${workout.caloriesBurned} kcal`} />
					<MetricRow label="Rating" value={workout.rating} />
				</dl>

				<section aria-labelledby="instructions-title" className="mt-6">
					<h2 id="instructions-title" className="text-sm font-extrabold uppercase tracking-wide text-white">
						Instructions
					</h2>
					<ol className="mt-3 list-inside list-decimal space-y-2 text-sm leading-5 text-zinc-400 marker:text-zinc-500">
						{workout.instructions?.map((instruction, index) => (
							<li key={`${index}-${instruction}`}>{instruction}</li>
						))}
					</ol>
				</section>

				<div className="mt-7 flex flex-wrap gap-3">
					<button
						type="button"
						aria-pressed={isInPlan}
						disabled={!isReady || isInPlan}
						onClick={() => addToPlan(workout)}
						className={`btn border-0 px-5 text-xs font-bold ${isInPlan ? "bg-white/10 text-zinc-400" : "bg-[#b7ff00] text-black hover:bg-[#c8ff4a] disabled:bg-white/10 disabled:text-zinc-500"}`}
					>
						{isInPlan ? "Added to today's plan" : "Add to today's plan"}
					</button>
					<button
						type="button"
						aria-pressed={isSaved}
						disabled={!isReady}
						onClick={() => toggleSaved(workout)}
						className="btn border border-white/15 bg-transparent px-5 text-xs text-zinc-300 hover:border-white/30 hover:bg-white/5"
					>
						{isSaved ? "Saved" : "Save for later"}
					</button>
				</div>
			</div>
		</main>
	);
}