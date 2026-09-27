"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const FITLOG_API_URLS = [
	"https://api.abcz.workers.dev/api/fitlog",
	"https://api.api-store.workers.dev/api/fitlog",
];

export default function WorkoutsPage() {
	const [workouts, setWorkouts] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		let isActive = true;

		async function loadWorkouts() {
			for (const url of FITLOG_API_URLS) {
				try {
					const response = await fetch(url);
					if (!response.ok) continue;

					const data = await response.json();
					if (Array.isArray(data)) {
						if (isActive) setWorkouts(data);
						break;
					}
				} catch {
					continue;
				}
			}

			if (isActive) setIsLoading(false);
		}

		loadWorkouts();
		return () => {
			isActive = false;
		};
	}, []);

	return (
		<main className="mx-auto w-full max-w-[1440px] flex-1 px-4 pb-16 pt-9 sm:px-6 lg:px-8">
			<header className="mb-6">
				<p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#b7ff00]">
					FitLog training
				</p>
				<div className="mt-2 flex flex-wrap items-end justify-between gap-3">
					<div>
						<h1 className="text-3xl font-black uppercase leading-tight text-white sm:text-4xl">
							Workout library
						</h1>
						<p className="mt-1 text-sm text-zinc-400">
							Choose a workout to see its full details.
						</p>
					</div>
					{workouts && (
						<span className="badge badge-outline border-white/15 text-zinc-300">
							{workouts.length} workouts
						</span>
					)}
				</div>
			</header>

			{isLoading ? (
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3" aria-label="Loading workouts">
					{Array.from({ length: 6 }, (_, index) => (
						<div key={index} className="card overflow-hidden rounded-xl border border-[#292c35] bg-[#15161d]">
							<div className="skeleton aspect-[16/9] rounded-none bg-white/5" />
							<div className="card-body gap-3 p-4">
								<div className="skeleton h-4 w-24 bg-white/5" />
								<div className="skeleton h-5 w-2/3 bg-white/5" />
								<div className="skeleton h-4 w-1/2 bg-white/5" />
							</div>
						</div>
					))}
				</div>
			) : workouts === null ? (
				<div role="alert" className="alert border border-white/10 bg-[#15161d] text-zinc-300">
					<span>Workouts could not be loaded right now. Please try again in a moment.</span>
				</div>
			) : (
				<section
					id="workouts"
					aria-label="Available workouts"
					className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
				>
					{workouts.map((workout) => (
						<a
							key={workout.id}
							href={`/workouts/${workout.id}`}
							className="card overflow-hidden rounded-xl border border-[#292c35] bg-[#15161d] transition-colors hover:border-[#b7ff00]/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b7ff00]"
						>
							<figure className="relative aspect-[16/9] overflow-hidden bg-[#20222a]">
								<Image
									src={workout.image}
									alt={workout.name}
									fill
									loading="lazy"
									unoptimized
									className="object-cover"
								/>
							</figure>
							<div className="card-body gap-3 p-4">
								<div className="flex flex-wrap gap-2">
									{workout.muscleGroups?.map((group) => (
										<span
											key={group}
											className="badge badge-sm border-0 bg-[#b7ff00] font-semibold uppercase text-black"
										>
											{group}
										</span>
									))}
								</div>
								<div>
									<h2 className="text-lg font-extrabold uppercase leading-tight text-white">
										{workout.name}
									</h2>
									<p className="mt-1 text-sm text-zinc-400">{workout.equipment}</p>
								</div>
								<div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-white/5 pt-3 text-xs text-zinc-400">
									<span>{workout.duration} min</span>
									<span>{workout.caloriesBurned} kcal</span>
									<span aria-label={`Rating ${workout.rating} out of 5`}>
										<span className="text-[#b7ff00]" aria-hidden="true">★</span>{" "}
										{workout.rating}
									</span>
								</div>
							</div>
						</a>
					))}
				</section>
			)}
		</main>
	);
}