<script setup lang="ts">
import { ref, computed, reactive, onMounted, onUnmounted } from 'vue'
import { Check, X, Filter } from 'lucide-vue-next'

import type { RiskLevel } from '~/RiskSelector'

/**
 * STORES
 */
import { useStockStore } from '@/stores/useStockStore'

/**
 * COMPONENTS
 */
import { RiskSelector, RISK_OPTIONS } from '~/RiskSelector'
import { StockCard } from '~/StockCard'
import { FiltersSheet, type Filters } from '~/FiltersSheet'

/**
 * STATE
 */
const stockStore = useStockStore()
const riskLevel = ref<RiskLevel>('')
const showRiskSelector = ref(true)
const stocks = computed(() => stockStore.stocks)

/**
 * Filters
 */
const filters = reactive<Filters>({
    search: { id: 'search', key: 'search', label: 'Search', value: '' },
    recommendation: { id: 'recommendation', key: 'recommendation', label: 'Recommendation', value: '' },
});
const showFiltersSheet = ref(false)

const handleFilterUpdate = (payload: { key: keyof Filters, value: string }) => {
    console.log("payload", payload)
    filters[payload.key].value = payload.value

    if (payload.key === 'search') {
        stockStore.query = payload.value

        restoreStocks(riskLevel.value)
        stockStore.fetchStocks()
    }

}


/**
 * Stocks
 */

const restoreStocks = (newRiskLevel: RiskLevel) => {
    stockStore.stocks = []
    stockStore.riskLevel = newRiskLevel
    stockStore.currentPage = 0;
    startObserver()
}

/**
 * Risk level selection
 */
const riskIcon = ref(Check)


const selectedRiskLabel = computed(() => {
    if (riskLevel.value !== '') {
        riskIcon.value = RISK_OPTIONS[riskLevel.value].icon
        return RISK_OPTIONS[riskLevel.value].label + ' Investor Profile'
    }
    return ''
})

const handleRiskSelection = (newRiskLevel: RiskLevel) => {
    showRiskSelector.value = false
    riskLevel.value = newRiskLevel

    // Update store
    restoreStocks(newRiskLevel);
    stockStore.fetchStocks()
}



const sentinel = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

onMounted(() => {
    observer = new IntersectionObserver(async ([entry]) => {
        if (entry.isIntersecting && !stockStore.loading) {
            stockStore.currentPage++
            const hasMore = await stockStore.fetchStocks()
            if (!hasMore) observer!.disconnect()
        }
    }, { threshold: 1.0 })
})


function startObserver() {
    if (observer && sentinel.value) {
        observer.observe(sentinel.value)
    }
}

onUnmounted(() => {
    observer?.disconnect()
})
</script>

<template>
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <Transition name="risk-selector" mode="out-in" @after-enter="startObserver">
            <RiskSelector class="card-container" v-if="showRiskSelector" :selected-risk="riskLevel"
                @select-risk="handleRiskSelection" @continue="showRiskSelector = false" />

            <div v-else class="space-y-6">
                <!-- Header -->
                <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div>
                        <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
                            <Component :is="riskIcon" class="w-6 h-6" />
                            {{ selectedRiskLabel }}
                        </h2>
                    </div>

                    <div class="flex flex-wrap gap-3">
                        <button @click="showRiskSelector = true"
                            class="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                            Change Risk Level
                        </button>
                        <Button
                            class="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                            @click="showFiltersSheet = !showFiltersSheet">
                            <Filter class="h-4 w-4" />
                            Filters
                            <span
                                class="ml-1 inline-flex items-center justify-center px-2 py-0.5 text-xs font-medium bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-full">
                                {{
                                    filters.search.value.length > 0 ? 1 : 0 +
                                        filters.recommendation.value.length > 0 ? 1 : 0
                                }}
                            </span>

                        </Button>
                        <div class="w-full sm:max-w-md overflow-y-auto">
                            <TransitionGroup name="filter-sheet" mode="out-in">

                                <FiltersSheet v-if="showFiltersSheet" :filters="filters" :active-filters="filters"
                                    :visible="showFiltersSheet" @update-filters="handleFilterUpdate"
                                    @close-filters="showFiltersSheet = false" />
                            </TransitionGroup>

                        </div>
                    </div>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    <TransitionGroup name="stock-list">
                        <StockCard v-for="(stock, index) in stocks" :key="index" :stock="stock" :index="index"
                            :recommendation="stock.recommendation" :class="index === 0 ? 'relative border-3' : ''" />

                        <div v-if="stocks.length === 0"
                            class="col-span-full flex flex-col items-center justify-center py-12 text-center border-2 border-dashed rounded-xl">
                            <X class="w-12 h-12 text-muted-foreground mb-4" />
                            <h3 class="text-xl font-medium">No matching stocks found</h3>
                            <p class="text-muted-foreground mt-2">
                                Try adjusting your filters to see more recommendations
                            </p>
                        </div>
                    </TransitionGroup>
                </div>
                <div ref="sentinel" class="h-1 col-span-full"></div>
            </div>
        </Transition>

    </div>
</template>



<style>
.risk-selector-enter-active,
.risk-selector-leave-active {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.risk-selector-enter-from,
.risk-selector-leave-to {
    opacity: 0;
    transform: translateY(20px);
}

.stock-list-enter-active {
    transition: all 0.3s ease;
    transition-delay: calc(0.1s * var(--i));
}

.stock-list-enter-from {
    opacity: 0;
    transform: translateY(20px);
}

.filter-sheet-enter-active,
.filter-sheet-leave-active {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.filter-sheet-enter-from,
.filter-sheet-leave-to {
    opacity: 0;
    transform: translateY(20px);
}
</style>