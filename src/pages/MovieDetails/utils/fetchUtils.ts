import type { modifyDateType } from "../types";

function modifyDate(
	date: string,
	{ years = 0, months = 0, days = 0 }: modifyDateType,
): string {
	const newDate = new Date(date);
	newDate.setFullYear(newDate.getFullYear() + years);
	newDate.setMonth(newDate.getMonth() + months);
	newDate.setDate(newDate.getDate() + days);
	return newDate.toISOString().split("T")[0];
}

function idsToString(array: { id: number }[]) {
	return array.map((item) => item.id).join(",");
}

export const fetchUtils = {
	modifyDate,
	idsToString,
};
