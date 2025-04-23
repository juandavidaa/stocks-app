export type RiskLevel = 'low' | 'medium' | 'high' | ''

export interface RiskOption {
  value: RiskLevel
  label: string
  description: string
  icon: any
  iconClass: string
}