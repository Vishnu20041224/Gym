"use client"

import React from "react"
import { Bar, BarChart } from "recharts"
import { ChartContainer } from "@/components/ui/chart" // only import the component

// Chart data
const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

// Chart config (just an object, no TypeScript)
const chartConfig = {
  desktop: { label: "Desktop", color: "#2563eb" },
  mobile: { label: "Mobile", color: "#60a5fa" },
}

function MyChart() {
  return (
    <ChartContainer config={chartConfig} className="max-w-3xl mx-auto h-[50vh]">
      <BarChart data={chartData}>
        {/* Use the colors from chartConfig */}
        <Bar dataKey="desktop" fill={chartConfig.desktop.color} radius={4} />
        <Bar dataKey="mobile" fill={chartConfig.mobile.color} radius={4} />
      </BarChart>
    </ChartContainer>
  )
}
export default MyChart