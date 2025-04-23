import { Check, TrendingUp, AlertTriangle } from 'lucide-vue-next'

export const RISK_OPTIONS = {
    low: {
        value: 'low',
        label: 'Low Risk',
        description: 'Conservative investments with stable returns',
        icon: Check,
        iconColor: 'bg-green-100 text-green-600 dark:bg-green-600/20',
        borderColor: 'border-green-100 dark:border-green-900/30',
        selectedStyles: 'bg-green-500 hover:bg-green-600 dark:bg-green-800 dark:hover:bg-green-900',

    },
    medium: {
        value: 'medium',
        label: 'Medium Risk',
        description: 'Balanced approach with moderate growth potential',
        icon: TrendingUp,
        iconColor: 'bg-amber-100 text-amber-600 dark:bg-amber-600/20',
        borderColor: 'border-amber-100 dark:border-amber-900/30',
        selectedStyles: 'bg-amber-500 hover:bg-amber-600 dark:bg-amber-800 dark:hover:bg-amber-900',
       
    },
    high: {
        value: 'high',
        label: 'High Risk',
        description: 'Aggressive strategy with higher volatility',
        icon: AlertTriangle,
        iconColor: 'bg-red-100 text-red-600 dark:bg-red-600/20',
        borderColor: 'border-red-100 dark:border-red-900/30',
        selectedStyles: 'bg-red-500 hover:bg-red-600 dark:bg-red-900 dark:hover:bg-red-900',

    }
} as const