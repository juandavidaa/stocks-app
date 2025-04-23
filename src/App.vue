<script setup>
    import {StockRecommender} from '~/StockRecommender'
</script>


<template>
    <main class="min-h-screen bg-zinc-900">
        <div class="container mx-auto px-4 py-10">
            <h1 class="text-3xl md:text-4xl font-bold text-center mb-2 text-slate-800 dark:text-slate-100">Stock Recommendations</h1>
            <p class="text-center text-slate-600 dark:text-slate-300 mb-10">Find the best stock recommendations based on your risk tolerance</p>
            <div class="space-y-6">
                <StockRecommender />

            </div>
        </div>
    </main>
</template>

