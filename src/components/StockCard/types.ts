export interface Stock {
    ticker: string
    company: string
    target_to: string
    last_price: string
    upside_pct: number
    rating_delta: number
    recency_weight: number
    score_base: number
    recommendation: Recommendation
    is_best: boolean
}

export interface Recommendation {
    label: string
    color: string
}