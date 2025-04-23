export interface Filter {
    id: string
    key: string
    label: string
    value: string
}

export interface Filters {
    search: Filter
    recommendation: Filter
}