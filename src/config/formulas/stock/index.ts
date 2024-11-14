import { stockPositionCalculator } from './position-size'

export const stockFormulas = {
  'stock/position-size': stockPositionCalculator
} as const 