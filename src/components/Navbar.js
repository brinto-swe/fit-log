import Image from "next/image";
import logoImage from "../assets/logo.png";

const primaryLinks = [
  { label: "Workouts", href: "#workouts", active: true },
  { label: "My Plan", href: "#my-plan", active: false },
];

export default function Navbar() {
  return (
    <header className="border-b border-white/10 bg-[#0b0c0f]">
      <nav
        aria-label="Main navigation"
        className="navbar mx-auto min-h-16 max-w-[1440px] px-4 sm:px-6 lg:px-8"
      >
        <a href="#top" className="flex items-center gap-2" aria-label="FitLog home">
          <Image src={logoImage} alt="" width={18} height={18} priority />
          <span className="text-sm font-extrabold tracking-[0.08em] text-white">FITLOG</span>
        </a>

        <div className="mx-auto hidden items-center gap-2 sm:flex">
          {primaryLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`btn btn-sm border-0 px-4 text-xs font-medium ${
                link.active
                  ? "bg-[#a8f000]/10 text-[#b7ff00] hover:bg-[#a8f000]/15"
                  : "bg-transparent text-zinc-400 hover:bg-white/5 hover:text-white"
              }`}
              aria-current={link.active ? "page" : undefined}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-3 sm:ml-0">
          <a href="#my-plan" className="hidden items-center gap-2 text-xs text-zinc-300 sm:flex">
            Plan
            <span className="badge badge-xs border-0 bg-[#a8f000] text-black">0</span>
          </a>
          <a href="#saved" className="hidden text-xs text-zinc-400 hover:text-white sm:block">
            Saved
          </a>
          <button
            type="button"
            className="btn btn-circle btn-ghost btn-xs border border-white/10 text-zinc-400 hover:bg-white/10 hover:text-white"
            aria-label="Open saved workouts"
            title="Saved workouts"
          >
            <svg viewBox="0 0 24 24" fill="none" className="size-3.5" aria-hidden="true">
              <path d="M7 4.75h10a1 1 0 0 1 1 1v14l-6-3.5-6 3.5v-14a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
}