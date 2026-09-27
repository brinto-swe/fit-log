"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const FITLOG_API_URLS = [
  "https://api.abcz.workers.dev/api/fitlog",
  "https://api.api-store.workers.dev/api/fitlog",
];

export default function WorkoutLibrary() {
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
    <section
      id="workouts"
      aria-labelledby="workouts-title"
      className="mt-10 scroll-mt-24"
    >
      <header className="mb-5">
        <h2
          id="workouts-title"
          className="text-2xl font-black uppercase text-white sm:text-3xl"
        >
          The library
        </h2>
        <p className="text-xs text-zinc-500">
          Twelve lifts covering every major muscle group.
        </p>
        <div className="mt-1 flex flex-wrap items-end justify-between gap-3">
          {workouts && (
            <span className="badge badge-outline border-white/15 text-zinc-300">
              {workouts.length} workouts
            </span>
          )}
        </div>
      </header>

      {isLoading ? (
        <div
          className="flex min-h-60 flex-col items-center justify-center gap-3 rounded-xl border border-[#292c35] bg-[#15161d]"
          role="status"
          aria-live="polite"
        >
          <span className="loading loading-spinner loading-lg text-[#b7ff00]" aria-hidden="true" />
          <span className="text-sm text-zinc-400">Loading workouts...</span>
        </div>
      ) : workouts === null ? (
        <div
          role="alert"
          className="alert border border-white/10 bg-[#15161d] text-zinc-300"
        >
          <span>
            Workouts could not be loaded right now. Please try again in a
            moment.
          </span>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {workouts.map((workout) => (
            <Link
              key={workout.id}
              href={`/workouts/${workout.id}`}
              className="card overflow-hidden rounded-xl border border-[#292c35] bg-[#15161d] transition-colors hover:border-[#b7ff00]/50"
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
                  <h3 className="text-lg font-extrabold uppercase leading-tight text-white">
                    {workout.name}
                  </h3>
                  <p className="mt-1 text-sm text-zinc-400">
                    {workout.equipment}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-white/5 pt-3 text-xs text-zinc-400">
                  <span>{workout.duration} min</span>
                  <span>{workout.caloriesBurned} kcal</span>
                  <span aria-label={`Rating ${workout.rating} out of 5`}>
                    <span className="text-[#b7ff00]" aria-hidden="true">
                      ★
                    </span>{" "}
                    {workout.rating}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
