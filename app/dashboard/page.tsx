"use client"

import { Label } from "@/components/ui/label"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Target,
  TrendingUp,
  Award,
  Clock,
  Play,
  BookOpen,
  CheckCircle,
  BarChart3,
  Users,
  Settings,
  LogOut,
  Bell,
  Star,
  ArrowRight,
  Github,
  Zap,
  ClipboardCheck,
  Map,
  Monitor,
  Rocket,
  Lightbulb,
  Calendar,
  Target as TargetIcon,
  TrendingUp as TrendingUpIcon,
  Brain,
  Trophy,
  BookOpen as BookOpenIcon,
  Play as PlayIcon
} from "lucide-react"
import Link from "next/link"
import AIChatWidget from "@/components/ai-chat-widget"
import ProgressTracker from "@/components/progress-tracker"
import ProtectedRoute from "@/components/protected-route"
import SidebarNavigation from "@/components/sidebar-navigation"
import { useAuth } from "@/contexts/auth-context"

export default function DashboardPage() {
  const { user, loading, signOut } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")
  const [timeoutError, setTimeoutError] = useState(false)

  // Add timeout protection
  useEffect(() => {
    if (loading) {
      const timeoutId = setTimeout(() => {
        console.warn('⚠️ Dashboard loading timeout')
        setTimeoutError(true)
      }, 15000) // 15 seconds timeout

      return () => clearTimeout(timeoutId)
    }
  }, [loading])

  // Debug logging
  console.log('🔍 Dashboard render:', { user: !!user, loading, timeoutError })

  // Show loading state while auth is being checked
  if (loading && !timeoutError) {
    console.log('⏳ Dashboard loading...')
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--background)' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: 'var(--primary)' }}></div>
          <p className="text-body" style={{ color: 'var(--foreground)' }}>Loading user data...</p>
          <p className="text-body-sm mt-2" style={{ color: 'var(--muted-foreground)' }}>Please wait while we verify your session</p>
          
          {/* Manual refresh option */}
          <div className="mt-6">
            <Button 
              onClick={() => window.location.reload()} 
              variant="outline" 
              size="sm"
              className="text-xs"
            >
              Still loading? Click here to refresh
            </Button>
          </div>
          
          {/* Debug info */}
          <div className="mt-4 text-xs" style={{ color: 'var(--muted-foreground)' }}>
            <p>Debug: Loading state active</p>
            <p>Check browser console for more details</p>
          </div>
        </div>
      </div>
    )
  }

  // Show timeout error
  if (timeoutError) {
    console.log('⏰ Dashboard loading timeout, showing error...')
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--background)' }}>
        <div className="text-center">
          <div className="text-6xl mb-4">⏰</div>
          <h2 className="text-h2 mb-4" style={{ color: 'var(--foreground)' }}>Loading Timeout</h2>
          <p className="text-body mb-6" style={{ color: 'var(--muted-foreground)' }}>It seems like there was an issue loading your dashboard.</p>
          <div className="space-y-3">
            <Button 
              onClick={() => window.location.reload()} 
              className="skillsync-btn-primary"
            >
              Refresh Page
            </Button>
            <br />
            <Button 
              onClick={() => window.location.href = '/login'} 
              variant="outline"
              className="skillsync-btn-secondary"
            >
              Go to Login
            </Button>
          </div>
          
          {/* Debug info */}
          <div className="mt-4 text-xs" style={{ color: 'var(--muted-foreground)' }}>
            <p>Debug: Loading timeout after 15 seconds</p>
            <p>Check browser console for auth context details</p>
          </div>
        </div>
      </div>
    )
  }

  // Redirect to login if no user after loading
  if (!user) {
    console.log('❌ No user found, redirecting to login...')
    // Use window.location for immediate redirect to avoid hydration issues
    if (typeof window !== 'undefined') {
      window.location.href = '/login'
      return null
    }
    
    // Fallback for SSR
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--background)' }}>
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-h2 mb-4" style={{ color: 'var(--foreground)' }}>Authentication Required</h2>
          <p className="text-body mb-6" style={{ color: 'var(--muted-foreground)' }}>Redirecting to login page...</p>
          <div className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
            <p>Debug: No user found, redirecting to login</p>
            <p>If this persists, please refresh the page</p>
          </div>
        </div>
      </div>
    )
  }

  console.log('✅ Dashboard loaded for user:', user.email)

  // User data from auth context
  const userData = {
    name: user?.user_metadata?.first_name && user?.user_metadata?.last_name 
      ? `${user.user_metadata.first_name} ${user.user_metadata.last_name}`
      : user?.email?.split('@')[0] || "User",
    email: user?.email || "user@example.com",
    joinDate: user?.created_at ? new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : "Recently",
    currentStreak: 12,
    totalPoints: 2847,
    level: "Intermediate",
    avatar: "/placeholder.svg?height=80&width=80",
  }

  const progressData = {
    overallProgress: 68,
    currentStreak: 12,
    totalPoints: 2847,
    level: "Intermediate",
    currentPath: "Frontend Developer",
    completedMilestones: 4,
    totalMilestones: 6,
    skillsLearned: 15,
    simulationsCompleted: 3,
    certificatesEarned: 2,
    weeklyGoal: 12,
    weeklyProgress: 8,
  }

  const recentActivity = [
    {
      type: "simulation",
      title: "Completed Sales Analysis Simulation",
      score: 87,
      date: "2 days ago",
      icon: <BarChart3 className="w-4 h-4" style={{ color: 'var(--primary)' }} />,
    },
    {
      type: "milestone",
      title: "Finished React & Component Architecture",
      date: "5 days ago",
      icon: <CheckCircle className="w-4 h-4" style={{ color: 'var(--success)' }} />,
    },
    {
      type: "assessment",
      title: "Updated Skill Assessment",
      score: 92,
      date: "1 week ago",
      icon: <ClipboardCheck className="w-4 h-4" style={{ color: 'var(--accent)' }} />,
    },
  ]

  const quickActions = [
    {
      title: "Start Assessment",
      description: "Evaluate your current skills",
      icon: <ClipboardCheck className="w-6 h-6" />,
      href: "/assessment",
      color: "primary"
    },
    {
      title: "View Roadmap",
      description: "See your learning path",
      icon: <Map className="w-6 h-6" />,
      href: "/roadmap",
      color: "secondary"
    },
    {
      title: "Try Simulation",
      description: "Practice real scenarios",
      icon: <Play className="w-6 h-6" />,
      href: "/simulation",
      color: "accent"
    },
    {
      title: "AI Chat",
      description: "Get career advice",
      icon: <Brain className="w-6 h-6" />,
      href: "/ai-chat",
      color: "success"
    }
  ]

  return (
    <ProtectedRoute>
      <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
        <SidebarNavigation />
        
        {/* Main Content */}
        <div className="lg:ml-64">
          <div className="p-6 lg:p-8">
            {/* Welcome Header */}
            <div className="mb-12 skillsync-fade-in">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div>
                  <h1 className="text-h1 mb-3" style={{ color: 'var(--foreground)' }}>
                    Welcome back, {userData.name}! 👋
                  </h1>
                  <p className="text-body leading-relaxed max-w-2xl" style={{ color: 'var(--muted-foreground)' }}>
                    Ready to continue your career growth journey? Here's what's happening today.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className="px-4 py-2 rounded-full shadow-sm" style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-foreground)' }}>
                    <Trophy className="w-4 h-4 mr-2" />
                    Level {userData.level}
                  </Badge>
                  <Badge className="px-4 py-2 rounded-full shadow-sm" style={{ backgroundColor: 'var(--success)', color: 'var(--success-foreground)' }}>
                    <Star className="w-4 h-4 mr-2" />
                    {userData.totalPoints} pts
                  </Badge>
                </div>
              </div>
            </div>

            {/* Progress Overview */}
            <div className="grid lg:grid-cols-3 gap-8 mb-12">
              <Card className="skillsync-card skillsync-fade-in skillsync-stagger-1 hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-4">
                  <CardTitle className="text-h3 flex items-center" style={{ color: 'var(--foreground)' }}>
                    <Target className="w-5 h-5 mr-3" style={{ color: 'var(--primary)' }} />
                    Overall Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-3" style={{ color: 'var(--primary)' }}>
                      {progressData.overallProgress}%
                    </div>
                    <Progress value={progressData.overallProgress} className="h-3 mb-4" />
                    <p className="text-body-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                      {progressData.completedMilestones} of {progressData.totalMilestones} milestones completed
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="skillsync-card skillsync-fade-in skillsync-stagger-2 hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-4">
                  <CardTitle className="text-h3 flex items-center" style={{ color: 'var(--foreground)' }}>
                    <TrendingUp className="w-5 h-5 mr-3" style={{ color: 'var(--secondary)' }} />
                    Current Streak
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-3" style={{ color: 'var(--secondary)' }}>
                      {progressData.currentStreak} days
                    </div>
                    <div className="flex justify-center gap-2 mb-4">
                      {Array.from({ length: 7 }, (_, i) => (
                        <div
                          key={i}
                          className={`w-3 h-3 rounded-full transition-all duration-200 ${
                            i < Math.min(progressData.currentStreak, 7) 
                              ? 'bg-green-500 shadow-sm' 
                              : 'bg-gray-200'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-body-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                      Keep up the great work!
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="skillsync-card skillsync-fade-in skillsync-stagger-3 hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-4">
                  <CardTitle className="text-h3 flex items-center" style={{ color: 'var(--foreground)' }}>
                    <BookOpen className="w-5 h-5 mr-3" style={{ color: 'var(--accent)' }} />
                    Weekly Goal
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-3" style={{ color: 'var(--accent)' }}>
                      {progressData.weeklyProgress}/{progressData.weeklyGoal}
                    </div>
                    <Progress value={(progressData.weeklyProgress / progressData.weeklyGoal) * 100} className="h-3 mb-4" />
                    <p className="text-body-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                      {progressData.weeklyGoal - progressData.weeklyProgress} more to reach your goal
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="mb-12">
              <h2 className="text-h2 mb-6" style={{ color: 'var(--foreground)' }}>Quick Actions</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {quickActions.map((action, index) => (
                  <Link key={action.title} href={action.href}>
                    <Card className="skillsync-card skillsync-fade-in skillsync-stagger-{index + 1} hover:shadow-lg transition-all duration-300 cursor-pointer group h-full">
                      <CardContent className="p-6 text-center h-full flex flex-col justify-center">
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                             style={{ backgroundColor: `var(--${action.color})` }}>
                          <div style={{ color: 'var(--white)' }}>
                            {action.icon}
                          </div>
                        </div>
                        <h3 className="text-h3 mb-3" style={{ color: 'var(--foreground)' }}>{action.title}</h3>
                        <p className="text-body-sm leading-relaxed flex-1" style={{ color: 'var(--muted-foreground)' }}>{action.description}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>

            {/* Main Content Tabs */}
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-3 mb-8 p-1" style={{ backgroundColor: 'var(--muted)' }}>
                    <TabsTrigger value="overview" className="skillsync-nav-link rounded-lg">Overview</TabsTrigger>
                    <TabsTrigger value="progress" className="skillsync-nav-link rounded-lg">Progress</TabsTrigger>
                    <TabsTrigger value="activity" className="skillsync-nav-link rounded-lg">Activity</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-8">
                    {/* Career Path Progress */}
                    <Card className="skillsync-card skillsync-fade-in hover:shadow-lg transition-all duration-300">
                      <CardHeader className="pb-4">
                        <CardTitle className="text-h3 flex items-center" style={{ color: 'var(--foreground)' }}>
                          <Map className="w-5 h-5 mr-3" style={{ color: 'var(--primary)' }} />
                          Career Path: {progressData.currentPath}
                        </CardTitle>
                        <CardDescription className="text-body leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                          Your personalized learning journey to become a {progressData.currentPath}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="flex justify-between items-center">
                          <span className="text-body-sm font-medium" style={{ color: 'var(--foreground)' }}>Path Progress</span>
                          <span className="text-body-sm font-semibold" style={{ color: 'var(--muted-foreground)' }}>{progressData.overallProgress}%</span>
                        </div>
                        <Progress value={progressData.overallProgress} className="h-3" />
                        
                        <div className="grid grid-cols-2 gap-6 pt-4">
                          <div className="text-center p-4 rounded-lg border" style={{ backgroundColor: 'var(--muted)', borderColor: 'var(--border)' }}>
                            <div className="text-2xl font-bold mb-2" style={{ color: 'var(--primary)' }}>{progressData.skillsLearned}</div>
                            <div className="text-body-sm font-medium" style={{ color: 'var(--muted-foreground)' }}>Skills Learned</div>
                          </div>
                          <div className="text-center p-4 rounded-lg border" style={{ backgroundColor: 'var(--muted)', borderColor: 'var(--border)' }}>
                            <div className="text-2xl font-bold mb-2" style={{ color: 'var(--success)' }}>{progressData.certificatesEarned}</div>
                            <div className="text-body-sm font-medium" style={{ color: 'var(--muted-foreground)' }}>Certificates</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Recent Achievements */}
                    <Card className="skillsync-card skillsync-fade-in hover:shadow-lg transition-all duration-300">
                      <CardHeader className="pb-4">
                        <CardTitle className="text-h3 flex items-center" style={{ color: 'var(--foreground)' }}>
                          <Award className="w-5 h-5 mr-3" style={{ color: 'var(--accent)' }} />
                          Recent Achievements
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {recentActivity.map((activity, index) => (
                            <div key={index} className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200" 
                                 style={{ backgroundColor: 'var(--muted)' }}>
                              <div className="flex-shrink-0">
                                {activity.icon}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-body-sm font-semibold mb-1" style={{ color: 'var(--foreground)' }}>
                                  {activity.title}
                                </p>
                                <p className="text-small leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                                  {activity.date}
                                </p>
                              </div>
                              {activity.score && (
                                <Badge className="flex-shrink-0 px-3 py-1 rounded-full" style={{ backgroundColor: 'var(--success)', color: 'var(--success-foreground)' }}>
                                  {activity.score}%
                                </Badge>
                              )}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="progress" className="space-y-6">
                    <Card className="skillsync-card skillsync-fade-in hover:shadow-lg transition-all duration-300">
                      <CardHeader>
                        <CardTitle className="text-h3" style={{ color: 'var(--foreground)' }}>Detailed Progress</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ProgressTracker />
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="activity" className="space-y-6">
                    <Card className="skillsync-card skillsync-fade-in hover:shadow-lg transition-all duration-300">
                      <CardHeader>
                        <CardTitle className="text-h3" style={{ color: 'var(--foreground)' }}>Activity Feed</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {recentActivity.map((activity, index) => (
                            <div key={index} className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200" 
                                 style={{ backgroundColor: 'var(--muted)' }}>
                              <div className="flex-shrink-0">
                                {activity.icon}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-body-sm font-semibold mb-1" style={{ color: 'var(--foreground)' }}>
                                  {activity.title}
                                </p>
                                <p className="text-small leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                                  {activity.date}
                                </p>
                              </div>
                              {activity.score && (
                                <Badge className="flex-shrink-0 px-3 py-1 rounded-full" style={{ backgroundColor: 'var(--success)', color: 'var(--success-foreground)' }}>
                                  {activity.score}%
                                </Badge>
                              )}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Right Sidebar */}
              <div className="space-y-6">
                {/* User Profile Card */}
                <Card className="skillsync-card skillsync-fade-in skillsync-stagger-4 hover:shadow-lg transition-all duration-300">
                  <CardHeader className="text-center pb-4">
                    <Avatar className="w-20 h-20 mx-auto mb-4 border-4" style={{ borderColor: 'var(--border)' }}>
                      <AvatarImage src={userData.avatar} alt={userData.name} />
                      <AvatarFallback className="text-xl font-semibold">{userData.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-h3 mb-2" style={{ color: 'var(--foreground)' }}>{userData.name}</CardTitle>
                    <CardDescription className="text-body-sm" style={{ color: 'var(--muted-foreground)' }}>{userData.email}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center p-3 rounded-lg" style={{ backgroundColor: 'var(--muted)' }}>
                      <span className="text-body-sm font-medium" style={{ color: 'var(--muted-foreground)' }}>Member since</span>
                      <span className="text-body-sm font-semibold" style={{ color: 'var(--foreground)' }}>{userData.joinDate}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-lg" style={{ backgroundColor: 'var(--muted)' }}>
                      <span className="text-body-sm font-medium" style={{ color: 'var(--muted-foreground)' }}>Current level</span>
                      <Badge className="px-3 py-1 rounded-full" style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-foreground)' }}>
                        {userData.level}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* Weekly Stats */}
                <Card className="skillsync-card skillsync-fade-in skillsync-stagger-4 hover:shadow-lg transition-all duration-300">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-h3" style={{ color: 'var(--foreground)' }}>This Week</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center p-3 rounded-lg" style={{ backgroundColor: 'var(--muted)' }}>
                      <span className="text-body-sm font-medium" style={{ color: 'var(--muted-foreground)' }}>Hours studied</span>
                      <span className="text-body-sm font-semibold" style={{ color: 'var(--foreground)' }}>12.5 hrs</span>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-lg" style={{ backgroundColor: 'var(--muted)' }}>
                      <span className="text-body-sm font-medium" style={{ color: 'var(--muted-foreground)' }}>Lessons completed</span>
                      <span className="text-body-sm font-semibold" style={{ color: 'var(--foreground)' }}>8</span>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-lg" style={{ backgroundColor: 'var(--muted)' }}>
                      <span className="text-body-sm font-medium" style={{ color: 'var(--muted-foreground)' }}>Points earned</span>
                      <span className="text-body-sm font-semibold" style={{ color: 'var(--foreground)' }}>+245</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="space-y-4">
                  <Link href="/assessment">
                    <Button className="w-full skillsync-btn-primary py-3 hover:shadow-lg transition-all duration-300">
                      <ClipboardCheck className="w-4 h-4 mr-2" />
                      Start Assessment
                    </Button>
                  </Link>
                  <Link href="/roadmap">
                    <Button variant="outline" className="w-full skillsync-btn-secondary py-3 hover:shadow-lg transition-all duration-300">
                      <Map className="w-4 h-4 mr-2" />
                      View Roadmap
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <AIChatWidget />
      </div>
    </ProtectedRoute>
  )
}
