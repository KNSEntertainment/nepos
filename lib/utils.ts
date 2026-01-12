import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function normalizeDocs<T extends { _id: unknown }>(docs: T[]): (Omit<T, "_id"> & { _id: string })[] {
	return (docs || []).map((doc) => ({
		...doc,
		_id: typeof doc._id === "object" && doc._id !== null && "toString" in doc._id ? doc._id.toString() : String(doc._id),
	}));
}
