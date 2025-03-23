import type React from "react"

interface ActivityItemProps {
  icon: React.ReactNode
  title: string
  description: string
  timestamp: string
}

export function ActivityItem({ icon, title, description, timestamp }: ActivityItemProps) {
  return (
    <div className="flex items-start gap-4 rounded-lg border p-3 bg-background/20 dark:bg-background/15 backdrop-blur-sm transition-all duration-300 hover:bg-background/30 dark:hover:bg-background/25 hover:shadow-[0_0_15px_rgba(var(--primary-rgb),0.15)]">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 backdrop-blur-md text-primary dark:text-primary-foreground">
        {icon}
      </div>
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium leading-none text-foreground">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
        <p className="text-xs text-muted-foreground">{timestamp}</p>
      </div>
    </div>
  )
}

