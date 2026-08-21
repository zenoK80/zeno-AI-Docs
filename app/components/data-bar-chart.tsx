'use client'

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import styles from './learning-visuals.module.css'

type DataPoint = {
  label: string
  value: number
}

type DataBarChartProps = {
  data: DataPoint[]
  label: string
  unit?: string
}

export function DataBarChart({ data, label, unit = '' }: DataBarChartProps) {
  return (
    <figure className={styles.chart} aria-label={label}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 12, right: 12, bottom: 8, left: 0 }}>
          <CartesianGrid stroke="var(--chart-grid)" strokeDasharray="3 3" vertical={false} />
          <XAxis
            axisLine={{ stroke: 'var(--chart-grid)' }}
            dataKey="label"
            tick={{ fill: 'var(--chart-axis)' }}
            tickLine={{ stroke: 'var(--chart-grid)' }}
          />
          <YAxis
            axisLine={{ stroke: 'var(--chart-grid)' }}
            tick={{ fill: 'var(--chart-axis)' }}
            tickLine={{ stroke: 'var(--chart-grid)' }}
            unit={unit}
            width={48}
          />
          <Tooltip formatter={(value) => [`${value}${unit}`, '값']} />
          <Bar dataKey="value" fill="var(--chart-bar)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
      <figcaption className={styles.caption}>{label}</figcaption>
    </figure>
  )
}