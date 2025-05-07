function modifyYears(date: string, years: number) {
	const newDate = new Date(date);
	newDate.setFullYear(newDate.getFullYear() + years);
	return newDate.toISOString().split("T")[0];
}

function idsToString(array: { id: number }[]) {
	return array.map((item) => item.id).join(",");
}

export const fetchUtils = {
	modifyYears,
	idsToString,
};
