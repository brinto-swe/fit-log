import WorkoutDetails from "@/components/WorkoutDetails";
import { notFound } from "next/navigation";

const WORKOUT_API_URLS = [
	"https://api.api-store.workers.dev/api/fitlog",
	"https://api.abcz.workers.dev/api/fitlog",
];

export default async function WorkoutPage({ params }) {
	const { id } = await params;

	if (!/^\d+$/.test(id)) {
		notFound();
	}

	let apiReportedNotFound = false;
	for (const baseUrl of WORKOUT_API_URLS) {
		let response;
		try {
			response = await fetch(`${baseUrl}/${encodeURIComponent(id)}`, {
				cache: "no-store",
				signal: AbortSignal.timeout(5000),
			});
		} catch {
			continue;
		}

		if (response.status === 404) {
			apiReportedNotFound = true;
			continue;
		}
		if (!response.ok) continue;

		let workout;
		try {
			workout = await response.json();
		} catch {
			continue;
		}
		if (workout && String(workout.id) === id) {
			return <WorkoutDetails key={id} id={id} initialWorkout={workout} />;
		}
	}
	if (apiReportedNotFound) notFound();

	const workoutId = Number(id);
	if (!Number.isInteger(workoutId) || workoutId < 1 || workoutId > 12) {
		notFound();
	}

	return <WorkoutDetails key={id} id={id} />;
}