<script setup lang="ts">
import type { Stock } from './types';

defineProps<{
    index: number,
    stock: Stock,
    recommendation: {
        label: string,
        color: string
    }
}>()


</script>

<template>
    
    <div
        class="relative bg-white dark:bg-zinc-800 rounded-md border border-gray-200  flex flex-col shadow-lg hover:shadow-2xl transition-shadow" :class="stock.is_best ? 'border-4 dark:border-amber-500' : 'dark:border-gray-700'">
        <span class="absolute -top-13 left-3 transform -translate-x-1/2 text-5xl z-20" aria-label="Top Stock" v-if="stock.is_best">👑</span> 
        <div class="px-4 py-2 flex items-center justify-between">
            
            <div>
                <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100">{{ stock.ticker }}</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">{{ stock.company }}</p>
            </div>
            <span class="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full"
                :class="recommendation.color">
                {{ recommendation.label }}
            </span>
        </div>
        <hr class="border-gray-200 dark:border-gray-700" />
        <div class="p-4 flex-1 flex flex-col justify-between">
            <ul class="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li>
                    <span class="font-medium">Target Price:</span>
                    {{ stock.target_to }}
                </li>
                <li>
                    <span class="font-medium">Last Price:</span>
                    {{ stock.last_price }}
                </li>
                <li>
                    <span class="font-medium">Upside %:</span>
                    {{ (stock.upside_pct * 100).toFixed(1) }}%
                </li>
                <li>
                    <span class="font-medium">Updated:</span>
                    {{ Date.now() }}
                </li>
            </ul>
        </div>
    </div>
</template>
