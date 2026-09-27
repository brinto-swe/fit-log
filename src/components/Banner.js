import Image from "next/image";
import bannerImage from "../assets/banner.png";

export default function Banner() {
	return (
		<section
			id="top"
			aria-labelledby="banner-title"
			className="relative flex min-h-[360px] scroll-mt-20 overflow-hidden rounded-xl border border-[#292c35] bg-[#15161d] sm:min-h-[400px]"
		>
			<div className="relative z-10 flex w-full items-center px-6 py-10 sm:px-10 lg:px-14">
				<div className="max-w-2xl">
					<p className="mb-4 text-[11px] font-bold uppercase tracking-[0.12em] text-[#b7ff00]">
						Workout library
					</p>
					<h1
						id="banner-title"
						className="max-w-[680px] text-4xl font-black uppercase leading-[0.98] text-white sm:text-5xl lg:text-6xl"
					>
						Train with intent. Log every set.
					</h1>
					<p className="mt-4 max-w-md text-sm leading-6 text-zinc-400">
						FitLog is a no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and
						watch the week&apos;s work add up.
					</p>
					<a
						href="#workouts"
						className="btn mt-6 min-h-11 border-0 bg-[#b7ff00] px-6 text-xs font-bold uppercase text-black hover:bg-[#c8ff4a]"
					>
						Browse workouts
					</a>
				</div>
			</div>
			<div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[40%] sm:block">
				<div className="absolute inset-y-0 left-0 z-[1] w-1/3 bg-gradient-to-r from-[#15161d] to-transparent" />
				<Image
					src={bannerImage}
					alt="Athlete seated at a weight machine"
					fill
					priority
					sizes="(min-width: 640px) 40vw, 0px"
					className="object-contain object-right py-5 pr-8"
				/>
			</div>
		</section>
	);
}