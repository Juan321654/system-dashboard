"use client"

import { useState, useEffect } from "react"
import {
  Activity,
  BarChart3,
  Bell,
  Calendar,
  ChevronRight,
  CreditCard,
  Globe,
  Home,
  Layers,
  LayoutDashboard,
  Menu,
  MessageSquare,
  Moon,
  PieChart,
  Search,
  Settings,
  Sun,
  User,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import { AreaChart } from "./components/area-chart"
import { BarChart } from "./components/bar-chart"
import { DonutChart } from "./components/donut-chart"
import { StatCard } from "./components/stat-card"
import { ActivityItem } from "./components/activity-item"
import { AnimatedBackground } from "./components/animated-background"
import { GlassCard } from "./components/glass-card"

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Check system preference for dark mode on initial load
  useEffect(() => {
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setIsDarkMode(true)
      document.documentElement.classList.add("dark")
    }
  }, [])

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
  }

  return (
    <div
      className={cn(
        "flex min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90 transition-all duration-300 text-foreground",
        isDarkMode ? "dark" : "",
      )}
    >
      <AnimatedBackground />
      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 z-50 flex w-72 flex-col border-r bg-background/60 backdrop-blur-xl transition-transform duration-300 dark:bg-background/30 dark:border-white/10",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 items-center justify-between border-b px-6 dark:border-white/10">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-full bg-primary/20 flex items-center justify-center">
              <Layers className="h-4 w-4 text-primary dark:text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold tracking-tight text-foreground">Quantum JC</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-foreground"
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Close sidebar</span>
          </Button>
        </div>
        <nav className="flex-1 overflow-auto py-4">
          <div className="px-3">
            <h2 className="mb-2 px-4 text-xs font-semibold tracking-tight text-muted-foreground">Overview</h2>
            <div className="space-y-1">
              <Button variant="ghost" className="w-full justify-start gap-2 font-normal text-foreground">
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2 font-normal text-foreground">
                <Activity className="h-4 w-4" />
                Analytics
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2 font-normal text-foreground">
                <CreditCard className="h-4 w-4" />
                Transactions
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2 font-normal text-foreground">
                <MessageSquare className="h-4 w-4" />
                Messages
              </Button>
            </div>
          </div>
          <div className="mt-6 px-3">
            <h2 className="mb-2 px-4 text-xs font-semibold tracking-tight text-muted-foreground">Management</h2>
            <div className="space-y-1">
              <Button variant="ghost" className="w-full justify-start gap-2 font-normal text-foreground">
                <User className="h-4 w-4" />
                Users
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2 font-normal text-foreground">
                <Calendar className="h-4 w-4" />
                Calendar
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2 font-normal text-foreground">
                <Settings className="h-4 w-4" />
                Settings
              </Button>
            </div>
          </div>
        </nav>
        <div className="border-t p-4 dark:border-white/10">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Avatar" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium text-foreground">Juan Camacho</p>
              <p className="text-xs text-muted-foreground">juancamacho@example.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className={cn("flex flex-1 flex-col transition-all duration-300", sidebarOpen ? "md:ml-72" : "ml-0")}>
        {/* Header */}
        <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background/60 dark:bg-background/20 px-6 backdrop-blur-xl dark:border-white/10">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hidden md:flex text-foreground"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(true)}
            className="md:hidden text-foreground"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Open sidebar</span>
          </Button>
          <div className="relative flex-1 md:grow-0 md:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-full bg-background/50 dark:bg-background/30 pl-8 md:w-80 text-foreground"
            />
          </div>
          <div className="flex flex-1 items-center justify-end gap-4">
            <Button variant="ghost" size="icon" className="relative text-foreground">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
              <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                3
              </Badge>
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-foreground">
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              <span className="sr-only">Toggle theme</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-foreground">Dashboard</h1>
                <p className="text-muted-foreground">Welcome back, here's what's happening with your projects today.</p>
              </div>
              <div className="flex items-center gap-2">
                <Button className="gap-1">
                  <Globe className="h-4 w-4" />
                  View Network
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <StatCard
                title="Total Revenue"
                value="$45,231.89"
                change="+20.1%"
                trend="up"
                icon={<BarChart3 className="h-4 w-4 text-muted-foreground" />}
              />
              <StatCard
                title="Active Users"
                value="2,345"
                change="+10.3%"
                trend="up"
                icon={<User className="h-4 w-4 text-muted-foreground" />}
              />
              <StatCard
                title="Conversion Rate"
                value="3.2%"
                change="-0.4%"
                trend="down"
                icon={<PieChart className="h-4 w-4 text-muted-foreground" />}
              />
              <StatCard
                title="Active Sessions"
                value="1,294"
                change="+12.5%"
                trend="up"
                icon={<Activity className="h-4 w-4 text-muted-foreground" />}
              />
            </div>

            {/* Charts */}
            <Tabs defaultValue="overview" className="space-y-4">
              <div className="flex items-center justify-between">
                <TabsList className="bg-background/50 dark:bg-background/30">
                  <TabsTrigger
                    value="overview"
                    className="text-foreground data-[state=active]:bg-background/70 dark:data-[state=active]:bg-background/40"
                  >
                    Overview
                  </TabsTrigger>
                  <TabsTrigger
                    value="analytics"
                    className="text-foreground data-[state=active]:bg-background/70 dark:data-[state=active]:bg-background/40"
                  >
                    Analytics
                  </TabsTrigger>
                  <TabsTrigger
                    value="reports"
                    className="text-foreground data-[state=active]:bg-background/70 dark:data-[state=active]:bg-background/40"
                  >
                    Reports
                  </TabsTrigger>
                </TabsList>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-background/50 dark:bg-background/30 text-foreground"
                  >
                    Download
                  </Button>
                </div>
              </div>
              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                  <GlassCard glassLevel="light" glowEffect hoverEffect className="lg:col-span-4">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <div className="space-y-1">
                        <CardTitle className="text-foreground">Revenue Over Time</CardTitle>
                        <CardDescription>Daily revenue for the past 30 days</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        <AreaChart />
                      </div>
                    </CardContent>
                  </GlassCard>
                  <GlassCard glassLevel="light" glowEffect hoverEffect className="lg:col-span-3">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <div className="space-y-1">
                        <CardTitle className="text-foreground">Traffic Sources</CardTitle>
                        <CardDescription>Top channels driving traffic</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        <DonutChart />
                      </div>
                    </CardContent>
                  </GlassCard>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                  <GlassCard glassLevel="light" glowEffect hoverEffect className="lg:col-span-3">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <div className="space-y-1">
                        <CardTitle className="text-foreground">Conversion by Platform</CardTitle>
                        <CardDescription>Conversion rates across platforms</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        <BarChart />
                      </div>
                    </CardContent>
                  </GlassCard>
                  <GlassCard glassLevel="light" glowEffect hoverEffect className="lg:col-span-4">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <div className="space-y-1">
                        <CardTitle className="text-foreground">Recent Activity</CardTitle>
                        <CardDescription>Latest actions and updates</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <ActivityItem
                          icon={<User className="h-4 w-4" />}
                          title="New user registered"
                          description="Jane Smith created an account"
                          timestamp="2 minutes ago"
                        />
                        <ActivityItem
                          icon={<CreditCard className="h-4 w-4" />}
                          title="Payment processed"
                          description="$2,500 payment received"
                          timestamp="10 minutes ago"
                        />
                        <ActivityItem
                          icon={<Settings className="h-4 w-4" />}
                          title="System update"
                          description="Version 2.1.0 deployed successfully"
                          timestamp="1 hour ago"
                        />
                        <ActivityItem
                          icon={<MessageSquare className="h-4 w-4" />}
                          title="New message"
                          description="You have 3 unread messages"
                          timestamp="3 hours ago"
                        />
                        <ActivityItem
                          icon={<Home className="h-4 w-4" />}
                          title="New project created"
                          description="Project 'Quantum' was created"
                          timestamp="5 hours ago"
                        />
                      </div>
                    </CardContent>
                  </GlassCard>
                </div>
              </TabsContent>
              <TabsContent value="analytics" className="space-y-4">
                <GlassCard glassLevel="light" glowEffect hoverEffect>
                  <CardHeader>
                    <CardTitle className="text-foreground">Analytics</CardTitle>
                    <CardDescription>Detailed analytics data will appear here.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px] flex items-center justify-center border rounded-md border-background/20 dark:border-white/10">
                      <p className="text-muted-foreground">Analytics content coming soon</p>
                    </div>
                  </CardContent>
                </GlassCard>
              </TabsContent>
              <TabsContent value="reports" className="space-y-4">
                <GlassCard glassLevel="light" glowEffect hoverEffect>
                  <CardHeader>
                    <CardTitle className="text-foreground">Reports</CardTitle>
                    <CardDescription>Generated reports will appear here.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px] flex items-center justify-center border rounded-md border-background/20 dark:border-white/10">
                      <p className="text-muted-foreground">Reports content coming soon</p>
                    </div>
                  </CardContent>
                </GlassCard>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}

