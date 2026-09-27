import Image from "next/image";
import Link from "next/link";

const plannedExercises = [
	{
		id: 11,
		name: "Russian Twist",
		equipment: "Medicine Ball",
		image: "https://img.magnific.com/free-photo/3d-cartoon-fitness-man_23-2151691487.jpg?w=740",
		duration: 8,
		calories: 70,
		rating: 4.1,
	},
	{
		id: 2,
		name: "Pull-Up",
		equipment: "Pull-up Bar",
		image: "https://img.magnific.com/free-photo/3d-cartoon-fitness-man_23-2151691400.jpg?w=740",
		duration: 15,
		calories: 120,
		rating: 4.7,
	},
];

const summary = plannedExercises.reduce(
	(totals, exercise) => ({
		exercises: totals.exercises + 1,
		minutes: totals.minutes + exercise.duration,
		calories: totals.calories + exercise.calories,
	}),
	{ exercises: 0, minutes: 0, calories: 0 },
);

export default function MyPlanPage() {
	const exercises = plannedExercises;

	return (
		<main className="mx-auto w-full max-w-[1440px] flex-1 px-4 pb-10 pt-8 sm:px-6 lg:px-8">
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
					{ label: "Exercises", value: summary.exercises, highlight: true },
					{ label: "Minutes", value: summary.minutes },
					{ label: "Calories", value: summary.calories },
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
					<button type="button" role="tab" aria-selected="true" className="tab tab-active text-xs">
						Today&apos;s Plan
					</button>
					<button id="saved" type="button" role="tab" aria-selected="false" className="tab text-xs text-zinc-400">
						Saved
					</button>
				</div>

				<label className="flex items-center gap-2 text-xs text-zinc-500">
					<span>Sort by</span>
					<select defaultValue="duration" className="select select-sm border-[#292c35] bg-[#15161d] text-zinc-300">
						<option value="duration">Duration</option>
						<option value="name">Name</option>
						<option value="calories">Calories</option>
					</select>
				</label>
			</div>

			{exercises.length > 0 ? (
				<section aria-label="Exercises in today's plan" className="mt-4 space-y-3">
					{exercises.map((exercise) => (
						<article
							key={exercise.id}
							className="flex flex-col gap-4 rounded-xl border border-[#292c35] bg-[#15161d] p-4 sm:flex-row sm:items-center"
						>
							<div className="flex min-w-0 flex-1 items-center gap-4">
								<div className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-[#20222a]">
									<Image
										src={exercise.image}
										alt=""
										fill
										unoptimized
										className="object-cover"
									/>
								</div>
								<div className="min-w-0">
									<h2 className="truncate text-base font-extrabold uppercase text-white">{exercise.name}</h2>
									<p className="mt-0.5 text-xs text-zinc-400">{exercise.equipment}</p>
									<div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-400">
										<span>{exercise.duration} min</span>
										<span>{exercise.calories} kcal</span>
										<span><span className="text-[#b7ff00]" aria-hidden="true">★</span> {exercise.rating}</span>
									</div>
								</div>
							</div>
							<div className="flex shrink-0 items-center gap-2 sm:pl-4">
								<Link href={`/workouts/${exercise.id}`} className="btn btn-sm border-[#343947] bg-transparent text-xs font-normal text-zinc-200 hover:bg-white/5">
									View details
								</Link>
								<button type="button" className="btn btn-sm border-0 bg-[#b7ff00] text-xs font-semibold text-black hover:bg-[#c8ff4a]">
									<span aria-hidden="true">✓</span> Mark as done
								</button>
								<button type="button" className="btn btn-square btn-sm btn-ghost text-zinc-500 hover:text-white" aria-label={`Remove ${exercise.name}`}>
									×
								</button>
							</div>
						</article>
					))}
				</section>
			) : (
				  <section className="mt-4 flex min-h-70 flex-col items-center justify-center rounded-xl border border-dashed border-[#292c35] px-6 text-center">
					<h2 className="text-lg font-black uppercase text-white">Nothing here yet</h2>
					<p className="mt-1 text-sm text-zinc-400">Browse the library and add a lift to get today moving.</p>
					<Link href="/#workouts" className="btn mt-5 min-h-10 border-0 bg-[#b7ff00] px-6 text-xs font-semibold text-black hover:bg-[#c8ff4a]">
						Go to workouts
					</Link>
				</section>
			)}
		</main>
	);
}