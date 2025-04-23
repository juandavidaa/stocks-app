
export const getRecommendationLabel = (score: number) => {
	if (score >= 0.5)
		return {
			label: "Highly Recommended",
			color: "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100",
		};
	if (score >= 0.25)
		return {
			label: "Recommended",
			color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-800 dark:text-emerald-100",
		};
	if (score >= 0.1)
		return {
			label: "Neutral",
			color: "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100",
		};
	if (score >= 0.01)
		return {
			label: "Less Recommended",
			color: "bg-amber-100 text-amber-800 dark:bg-amber-800 dark:text-amber-100",
		};
	return {
		label: "Not Recommended",
		color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
	};
};
