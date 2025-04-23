import { defineStore } from "pinia";
import { api, getRecommendationLabel } from "@/utils";
import type { RiskLevel } from "~/RiskSelector";
import type { Stock } from "@/components/StockCard/types";

export const useStockStore = defineStore("stocks", {
	state: () => ({
		riskLevel: "medium" as RiskLevel,
		stocks: [] as Stock[],
		currentPage: 0,
		loading: false,
		error: null as string | null,
		query: null as string | null,
	}),

	actions: {
		async fetchStocks(): Promise<boolean> {
			this.loading = true;
			this.error = null;

			try {
				const params = {
					page: this.currentPage,
					risk: this.riskLevel,
					query: "",
				};
				if (this.query) {
					params["query"] = this.query;
				}
				const response = await api.get("/stocks/getBestStocks", {
					params,
				});

				if (response.data === null) {
					return false;
				}

				response.data.map(
					(s: Stock) =>
						(s.recommendation = getRecommendationLabel(
							s.score_base
						))
				);

				this.stocks.push(...response.data);

				if (this.stocks[0].is_best) {
					this.stocks[0].recommendation = {
						label: "THE BEST",
						color: "dark:bg-amber-500 text-amber-100 text-bold text-xs",
					};
				}
				return true;
			} catch (error) {
				this.error = "Failed to load stocks";
				console.error("API Error:", error);
				return false;
			} finally {
				this.loading = false;
			}
		},
	},
});
