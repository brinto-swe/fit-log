"use client";

import { createContext, useContext, useEffect, useSyncExternalStore } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WorkoutPlanContext = createContext(null);
const PLAN_STORAGE_KEY = "fitlog-plan";
const SAVED_STORAGE_KEY = "fitlog-saved";
const DAILY_PLAN_LIMIT = 5;
const emptySnapshot = { plan: [], saved: [], isReady: false };
let snapshot = emptySnapshot;
const listeners = new Set();

function subscribe(listener) {
	listeners.add(listener);
	return () => listeners.delete(listener);
}

function notify() {
	for (const listener of listeners) listener();
}

function updateSnapshot(nextSnapshot) {
	snapshot = nextSnapshot;
	if (snapshot.isReady) {
		localStorage.setItem(PLAN_STORAGE_KEY, JSON.stringify(snapshot.plan));
		localStorage.setItem(SAVED_STORAGE_KEY, JSON.stringify(snapshot.saved));
	}
	notify();
}

function hydrateFromStorage() {
	try {
		const storedPlan = JSON.parse(localStorage.getItem(PLAN_STORAGE_KEY) || "[]");
		const storedSaved = JSON.parse(localStorage.getItem(SAVED_STORAGE_KEY) || "[]");
		snapshot = {
			plan: Array.isArray(storedPlan) ? storedPlan : [],
			saved: Array.isArray(storedSaved) ? storedSaved : [],
			isReady: true,
		};
	} catch {
		localStorage.removeItem(PLAN_STORAGE_KEY);
		localStorage.removeItem(SAVED_STORAGE_KEY);
		snapshot = { plan: [], saved: [], isReady: true };
	}
	notify();
}

function getSnapshot() {
	return snapshot;
}

function getServerSnapshot() {
	return emptySnapshot;
}

export function WorkoutPlanProvider({ children }) {
	const { plan, saved, isReady } = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

	useEffect(() => {
		hydrateFromStorage();
	}, []);

	function addToPlan(workout) {
		if (snapshot.plan.some((item) => String(item.id) === String(workout.id))) {
			toast.info(`${workout.name} is already in today's plan.`);
			return false;
		}
		if (snapshot.plan.length >= DAILY_PLAN_LIMIT) {
			toast.warning("Today's plan is full. Finish a lift before adding another.");
			return false;
		}

		updateSnapshot({ ...snapshot, plan: [...snapshot.plan, workout] });
		toast.success(`${workout.name} added to today's plan.`);
		return true;
	}

	function removeFromPlan(id, completed = false) {
		const workout = plan.find((item) => String(item.id) === String(id));
		updateSnapshot({ ...snapshot, plan: snapshot.plan.filter((item) => String(item.id) !== String(id)) });
		if (workout) {
			toast.success(completed ? `${workout.name} marked as done.` : `${workout.name} removed from today's plan.`);
		}
	}

	function toggleSaved(workout) {
		const alreadySaved = snapshot.saved.some((item) => String(item.id) === String(workout.id));
		if (alreadySaved) {
			updateSnapshot({ ...snapshot, saved: snapshot.saved.filter((item) => String(item.id) !== String(workout.id)) });
			toast.info(`${workout.name} removed from saved workouts.`);
			return false;
		}

		updateSnapshot({ ...snapshot, saved: [...snapshot.saved, workout] });
		toast.success(`${workout.name} saved for later.`);
		return true;
	}

	const value = {
		plan,
		saved,
		isReady,
		addToPlan,
		removeFromPlan,
		toggleSaved,
	};

	return (
		<WorkoutPlanContext.Provider value={value}>
			{children}
			<ToastContainer
				position="top-right"
				autoClose={2600}
				theme="dark"
				newestOnTop
				toastClassName="!border !border-white/10 !bg-[#15161d] !text-zinc-100"
				progressClassName="!bg-[#b7ff00]"
			/>
		</WorkoutPlanContext.Provider>
	);
}

export function useWorkoutPlan() {
	const context = useContext(WorkoutPlanContext);
	if (!context) {
		throw new Error("useWorkoutPlan must be used inside WorkoutPlanProvider");
	}
	return context;
}