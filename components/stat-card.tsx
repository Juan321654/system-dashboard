"use client"

import type React from "react"

import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"
import CountUp from "react-countup"

import { cn } from "@/lib/utils"
import { GlassCard } from "./glass-card"
import { CardContent, CardHeader } from "@/components/ui/card"

interface StatCardProps {
  title: string
  value: string
  change: string
  trend: "up" | "down"
  icon?: React.ReactNode
}

export function StatCard({ title, value, change, trend, icon }: StatCardProps) {
  const isNumeric = (str: string) => {
    return !isNaN(Number(str.replace(/[^0-9.-]+/g, "")))
  }

  const numericValue = isNumeric(value) ? Number.parseFloat(value.replace(/[^0-9.-]+/g, "")) : 0
  const formattedValue = value.replace(/[0-9.-]+/g, "0")

  return (
    <GlassCard glassLevel="light" glowEffect hoverEffect className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="text-sm font-medium text-foreground">{title}</div>
        <div className="text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">
          {isNumeric(value) ? (
            <CountUp
              start={0}
              end={numericValue}
              duration={2}
              separator=","
              decimals={value.includes(".") ? 2 : 0}
              decimal="."
              prefix={value.startsWith("$") ? "$" : ""}
              suffix={value.endsWith("%") ? "%" : ""}
            />
          ) : (
            value
          )}
        </div>
        <div className="flex items-center pt-1">
          <span
            className={cn(
              "flex items-center text-xs font-medium",
              trend === "up" ? "text-green-500 dark:text-green-400" : "text-red-500 dark:text-red-400",
            )}
          >
            {trend === "up" ? <ArrowUpIcon className="mr-1 h-3 w-3" /> : <ArrowDownIcon className="mr-1 h-3 w-3" />}
            {change}
          </span>
          <span className="text-xs text-muted-foreground ml-2">from last month</span>
        </div>
      </CardContent>
    </GlassCard>
  )
}

