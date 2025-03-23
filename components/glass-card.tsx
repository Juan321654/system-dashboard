import { cn } from "@/lib/utils"
import { Card, type CardProps } from "@/components/ui/card"

interface GlassCardProps extends CardProps {
  glassLevel?: "light" | "medium" | "heavy"
  glowEffect?: boolean
  hoverEffect?: boolean
}

export function GlassCard({
  glassLevel = "medium",
  glowEffect = false,
  hoverEffect = false,
  className,
  children,
  ...props
}: GlassCardProps) {
  const glassStyles = {
    light: "bg-background/15 backdrop-blur-sm border-background/10 dark:bg-background/10 dark:border-white/5",
    medium: "bg-background/20 backdrop-blur-md border-background/15 dark:bg-background/15 dark:border-white/10",
    heavy: "bg-background/30 backdrop-blur-lg border-background/20 dark:bg-background/20 dark:border-white/15",
  }

  return (
    <Card
      className={cn(
        "border transition-all duration-300",
        glassStyles[glassLevel],
        glowEffect &&
          "shadow-[2px_2px_5px_rgba(var(--primary-rgb),0.2)] dark:shadow-[2px_2px_5px_rgba(var(--primary-rgb),0.3)]",
        hoverEffect &&
          "hover:shadow-[0_0_25px_rgba(var(--primary-rgb),0.3)] hover:border-primary/30 hover:-translate-y-1 dark:hover:shadow-[0_0_35px_rgba(var(--primary-rgb),0.4)] dark:hover:border-primary/40",
        className,
      )}
      {...props}
    >
      {children}
    </Card>
  )
}

