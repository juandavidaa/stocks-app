<script setup lang="ts">
import type { RiskLevel } from './types'
import { RISK_OPTIONS } from './constants'
import { computed } from 'vue'

const props = defineProps<{
    selectedRisk: RiskLevel
}>()

defineEmits<{
    (e: 'select-risk', risk: RiskLevel): void
    (e: 'continue'): void
}>()

const selectedRiskLabel = computed(() => {
    if(props.selectedRisk !== ''){
        return RISK_OPTIONS[props.selectedRisk]?.label || ''
    }
    
})
</script>


<template>
    <div class="max-w-2xl mx-auto bg-zinc-900">
        <div class="bg-gray-800 dark:bg-zinc-800 rounded-2xl shadow-xl overflow-hidden">
            <div class="p-6 space-y-4">
                <div class="text-center space-y-2">
                    <h2 class="text-2xl font-bold text-slate-900 dark:text-slate-100">Select Your Risk Tolerance</h2>
                    <p class="text-muted-foreground text-slate-600 dark:text-slate-400">
                        This will help us tailor stock recommendations to your investment style
                    </p>
                </div>

                <div class="space-y-4">
                    <button v-for="level in RISK_OPTIONS" :key="level.value" @click="$emit('select-risk', level.value)"
                        class="w-full text-left p-6 rounded-lg transition-all border-0 group border-slate-300 hover:scale-x-103 duration-400 cursor-pointer hover:bg-zinc-800"
                        :class="[
                            selectedRisk === level.value
                                ? level.selectedStyles
                                : null
                        ]">
                        <div class="flex items-start gap-4">
                            <div class="shrink-0">
                                <div class="h-10 w-10 rounded-full flex items-center justify-center"
                                    :class="level.iconColor">
                                    <Component :is="level.icon" class="h-5 w-5" />
                                </div>
                            </div>
                            <div>
                                <h3 class="text-lg font-medium text-slate-900 dark:text-slate-100">{{ level.label }}
                                </h3>
                                <p class="text-sm text-slate-600 dark:text-slate-400">{{ level.description }}</p>
                            </div>
                        </div>
                    </button>
                </div>

                <button @click="$emit('continue')" v-if="selectedRisk !== ''" class="
                    text-white
                    w-full py-3 mt-6
                    bg-gray-900/60
                     font-semibold
                    rounded-lg
                    shadow-md
                    transition-all duration-300 ease-in-out
                    transform hover:-translate-y-0.5
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-200
                ">
                    Continue with {{ selectedRiskLabel }}
                </button>
            </div>
        </div>
    </div>
</template>