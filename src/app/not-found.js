import Link from "next/link";

export default function NotFound() {
	return (
		<main className="mx-auto flex w-full max-w-360 flex-1 flex-col items-center justify-center px-4 py-20 text-center sm:px-6 lg:px-8">
			<p className="text-sm font-bold uppercase tracking-[0.12em] text-[#b7ff00]">FitLog</p>
			<h1 className="mt-3 text-6xl font-black text-white">404</h1>
			<h2 className="mt-2 text-xl font-extrabold uppercase text-white">Page not found</h2>
			<p className="mt-2 max-w-md text-sm leading-6 text-zinc-400">
				That page or workout does not exist. Head back to the library to find a lift.
			</p>
			<Link href="/#workouts" className="btn mt-6 border-0 bg-[#b7ff00] px-6 text-xs font-bold uppercase text-black hover:bg-[#c8ff4a]">
				Back to workouts
			</Link>
		</main>
	);
}