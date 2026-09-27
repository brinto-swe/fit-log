import Image from "next/image";
import logoImage from "../assets/logo.png";

export default function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer className="mt-auto border-t border-white/10 bg-[#0b0c0f]">
			<div className="mx-auto flex min-h-16 max-w-[1440px] flex-col items-start justify-center gap-2 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
				<a href="#top" className="flex items-center gap-2" aria-label="FitLog home">
					<Image src={logoImage} alt="" width={16} height={16} />
					<span className="text-xs font-extrabold tracking-[0.08em] text-white">FITLOG</span>
				</a>
				<p className="text-xs text-zinc-500">
					© {year} FitLog <span className="px-1 text-zinc-700">—</span> Workout library. Train hard, log honest.
				</p>
			</div>
		</footer>
	);
}