<script setup lang="ts">
import { reactive } from 'vue'
import { X as XIcon } from 'lucide-vue-next'
import type { Filters, Filter } from '@/components/FiltersSheet/types'

const props = defineProps<{
    filters: Filters
    activeFilters: Filters
}>()

const emit = defineEmits<{
    (e: 'update-filters', payload: { key: keyof Filters, value: string }): void
    (e: 'close-filters'): void
}>()

const local = reactive<Record<keyof Filters, Filter>>({
  search: { ...props.activeFilters.search },
  recommendation: { ...props.activeFilters.recommendation },
})

function clearAll() {
    local.search.value = ''
}

function apply() {
  emit('update-filters', { key: 'search',        value: local.search.value })
  emit('update-filters', { key: 'recommendation', value: local.recommendation.value })
  emit('close-filters')
}

function close() {
    emit('close-filters')
}
</script>
<template>
    <div class="fixed inset-0 bg-black/50 z-40" @click="close"></div>

    <aside
        class="fixed inset-y-0 right-0 w-full max-w-sm bg-white dark:bg-gray-800 shadow-xl z-50 transform transition-transform duration-300">
        <header
            class="sticky top-0 bg-white dark:bg-gray-800 px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between z-10">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100">Filters</h2>
            <button @click="close" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <XIcon class="w-6 h-6" />
            </button>
        </header>

        <div class="px-6 py-4 space-y-6 overflow-y-auto h-full">
            <div>
                <label for="filter-search" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Search Ticker
                </label>
                <input id="filter-search" v-model="local.search.value" type="text"
                    placeholder="Type to search..."
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>

           <!-- <div>
                <label for="filter-recommendation" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Recommendation
                </label>
                <select id="filter-recommendation" v-model="local.recommendation.value" class="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option value="0">All</option>
                    <option value="1">Highly Recommended</option>
                    <option value="2">Recommended</option>
                    <option value="3">Neutral</option>
                    <option value="4">Less Recommended</option>
                    <option value="5">Not Recommended</option>
                </select>  
            </div>-->
        </div>

        <!-- Footer actions -->
        <footer
            class="sticky bottom-0 bg-white dark:bg-gray-800 px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <button @click="clearAll" class="text-sm text-gray-600 dark:text-gray-300 hover:underline">
                Clear All
            </button>
            <button @click="apply"
                class="px-4 py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 transition">
                Apply
            </button>
        </footer>
    </aside>
</template>
