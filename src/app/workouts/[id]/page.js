import WorkoutDetails from "@/components/WorkoutDetails";

export default async function WorkoutPage({ params }) {
	const { id } = await params;

	return <WorkoutDetails id={id} />;
}