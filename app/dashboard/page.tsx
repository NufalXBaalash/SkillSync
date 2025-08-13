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
} from "lucide-react"
import Link from "next/link"
import AIChatWidget from "@/components/ai-chat-widget"
import ProgressTracker from "@/components/progress-tracker"
import ProtectedRoute from "@/components/protected-route"
import SharedNavigation from "@/components/shared-navigation"
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-violet-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading user data...</p>
          <p className="text-sm text-gray-500 mt-2">Please wait while we verify your session</p>
          
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
          <div className="mt-4 text-xs text-gray-400">
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-violet-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⏰</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Loading Timeout</h2>
          <p className="text-gray-600 mb-6">It seems like there was an issue loading your dashboard.</p>
          <div className="space-y-3">
            <Button 
              onClick={() => window.location.reload()} 
              className="bg-blue-600 hover:bg-blue-700"
            >
              Refresh Page
            </Button>
            <br />
            <Button 
              onClick={() => window.location.href = '/login'} 
              variant="outline"
            >
              Go to Login
            </Button>
          </div>
          
          {/* Debug info */}
          <div className="mt-4 text-xs text-gray-400">
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-violet-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Authentication Required</h2>
          <p className="text-gray-600 mb-6">Redirecting to login page...</p>
          <div className="text-xs text-gray-400">
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
      icon: <BarChart3 className="w-4 h-4 text-blue-600" />,
    },
    {
      type: "milestone",
      title: "Finished React & Component Architecture",
      date: "5 days ago",
      icon: <CheckCircle className="w-4 h-4 text-green-600" />,
    },
    {
      type: "skill",
      title: "Learned TypeScript Fundamentals",
      date: "1 week ago",
      icon: <BookOpen className="w-4 h-4 text-purple-600" />,
    },
    {
      type: "achievement",
      title: "Earned 'Quick Learner' Badge",
      date: "1 week ago",
      icon: <Award className="w-4 h-4 text-yellow-600" />,
    },
  ]

  const upcomingTasks = [
    {
      title: "Complete TypeScript Integration Milestone",
      dueDate: "In 3 days",
      priority: "high",
      estimatedTime: "2 hours",
    },
    {
      title: "Try UX Designer Job Simulation",
      dueDate: "This week",
      priority: "medium",
      estimatedTime: "45 minutes",
    },
    {
      title: "Review Modern CSS & Styling Resources",
      dueDate: "Next week",
      priority: "low",
      estimatedTime: "1 hour",
    },
  ]

  const achievements = [
    { name: "First Steps", description: "Completed your first assessment", earned: true },
    { name: "Quick Learner", description: "Completed 3 milestones in one week", earned: true },
    { name: "Simulation Master", description: "Scored 80+ on 3 simulations", earned: true },
    { name: "Consistent Learner", description: "7-day learning streak", earned: false },
    { name: "Skill Collector", description: "Learn 20 different skills", earned: false },
    { name: "Career Ready", description: "Complete your career roadmap", earned: false },
  ]

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-violet-50">
        <SharedNavigation />

        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <h1 className="text-3xl font-serif font-bold mb-2">Welcome back, {userData.name.split(" ")[0]}! 👋</h1>
                <p className="text-gray-600">You're making great progress on your {progressData.currentPath} journey</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-2xl font-bold gradient-text">{userData.currentStreak}</div>
                  <div className="text-sm text-gray-500">Day Streak</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold gradient-text">{userData.totalPoints}</div>
                  <div className="text-sm text-gray-500">Total Points</div>
                </div>
                <div className="text-center">
                  <Badge variant="secondary" className="text-sm">
                    {userData.level}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="progress">Progress</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Main Content */}
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Left Column - Main Actions */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Profile Analysis - Prominent Button */}
                  <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2 text-2xl">
                        <TrendingUp className="w-6 h-6 text-blue-600" />
                        <span>Professional Profile Analysis</span>
                      </CardTitle>
                      <CardDescription className="text-lg">
                        Get comprehensive insights into your skills by analyzing GitHub and LinkedIn profiles
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <Link href="/profile-analysis">
                          <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg py-6 shadow-lg hover:shadow-xl transition-all duration-300">
                            <TrendingUp className="w-5 h-5 mr-2" />
                            Combined Analysis
                          </Button>
                        </Link>
                        <Link href="/github-analysis">
                          <Button variant="outline" className="w-full text-lg py-6 border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-all duration-300">
                            <Github className="w-5 h-5 mr-2" />
                            GitHub Only
                          </Button>
                        </Link>
                      </div>
                      <p className="text-sm text-gray-600 text-center">
                        Analyze both platforms together or focus on GitHub skills analysis
                      </p>
                    </CardContent>
                  </Card>

                  {/* Quick Actions */}
                  <Card className="hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Zap className="w-5 h-5 text-yellow-600" />
                        <span>Quick Actions</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Link href="/assessment">
                        <Button variant="outline" className="w-full justify-start bg-transparent hover:bg-blue-50 hover:border-blue-300 transition-all duration-200">
                          <ClipboardCheck className="w-4 h-4 mr-2" />
                          Skills Assessment
                        </Button>
                      </Link>
                      <Link href="/roadmap">
                        <Button variant="outline" className="w-full justify-start bg-transparent hover:bg-green-50 hover:border-green-300 transition-all duration-200">
                          <Map className="w-4 h-4 mr-2" />
                          Learning Roadmap
                        </Button>
                      </Link>
                      <Link href="/simulation">
                        <Button variant="outline" className="w-full justify-start bg-transparent hover:bg-purple-50 hover:border-purple-300 transition-all duration-200">
                          <Monitor className="w-4 h-4 mr-2" />
                          Interview Simulation
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>

                  {/* Recent Activity */}
                  <Card className="hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Clock className="w-5 h-5 text-green-600" />
                        <span>Recent Activity</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentActivity.map((activity, index) => (
                          <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                            <div className="flex-shrink-0">{activity.icon}</div>
                            <div className="flex-1">
                              <p className="font-medium text-sm">{activity.title}</p>
                              <p className="text-xs text-gray-500">{activity.date}</p>
                            </div>
                            {activity.score && (
                              <Badge variant="secondary" className="text-xs">
                                {activity.score}%
                              </Badge>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Right Column - Progress & Stats */}
                <div className="space-y-6">
                  {/* Current Progress Card */}
                  <Card className="shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <TrendingUp className="w-5 h-5 text-blue-600" />
                        <span>Current Progress</span>
                      </CardTitle>
                      <CardDescription>Your {progressData.currentPath} roadmap</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Overall Completion</span>
                          <span className="text-sm text-gray-600">{progressData.overallProgress}%</span>
                        </div>
                        <Progress value={progressData.overallProgress} className="h-3" />
                        <div className="grid grid-cols-3 gap-4 pt-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">{progressData.completedMilestones}</div>
                            <div className="text-sm text-gray-500">Milestones Done</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">{progressData.skillsLearned}</div>
                            <div className="text-sm text-gray-500">Skills Learned</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-purple-600">{progressData.simulationsCompleted}</div>
                            <div className="text-sm text-gray-500">Simulations</div>
                          </div>
                        </div>
                        <div className="pt-4">
                          <Link href="/roadmap">
                            <Button className="w-full gradient-bg hover:shadow-lg transition-all duration-300">
                              Continue Learning
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Upcoming Tasks */}
                  <Card className="hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="text-lg">Upcoming Tasks</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {upcomingTasks.map((task, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-start justify-between">
                            <h4 className="font-medium text-sm">{task.title}</h4>
                            <Badge
                              variant={
                                task.priority === "high"
                                  ? "destructive"
                                  : task.priority === "medium"
                                    ? "default"
                                    : "secondary"
                              }
                              className="text-xs"
                            >
                              {task.priority}
                            </Badge>
                          </div>
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>{task.dueDate}</span>
                            <span>{task.estimatedTime}</span>
                          </div>
                          {index < upcomingTasks.length - 1 && <div className="border-b border-gray-100"></div>}
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Quick Actions */}
                  <Card className="hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="text-lg">Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Link href="/profile-analysis">
                        <Button variant="outline" className="w-full justify-start bg-transparent hover:bg-blue-50 hover:border-blue-300 transition-all duration-200">
                          <TrendingUp className="w-4 h-4 mr-2" />
                          Profile Analysis
                        </Button>
                      </Link>
                      <Link href="/assessment">
                        <Button variant="outline" className="w-full justify-start bg-transparent hover:bg-green-50 hover:border-green-300 transition-all duration-200">
                          <Target className="w-4 h-4 mr-2" />
                          Retake Assessment
                        </Button>
                      </Link>
                      <Link href="/simulation">
                        <Button variant="outline" className="w-full justify-start bg-transparent hover:bg-purple-50 hover:border-purple-300 transition-all duration-200">
                          <Play className="w-4 h-4 mr-2" />
                          Try New Simulation
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="progress" className="space-y-6">
              <ProgressTracker data={progressData} variant="detailed" showWeeklyGoal={true} />
            </TabsContent>

            <TabsContent value="achievements" className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {achievements.map((achievement, index) => (
                  <Card
                    key={index}
                    className={`${achievement.earned ? "border-green-200 bg-green-50" : "border-gray-200"} hover:shadow-lg transition-all duration-300 hover:scale-105`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            achievement.earned ? "bg-green-100" : "bg-gray-100"
                          }`}
                        >
                          {achievement.earned ? (
                            <Star className="w-6 h-6 text-green-600" />
                          ) : (
                            <Star className="w-6 h-6 text-gray-400" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-sm">{achievement.name}</h3>
                          <p className="text-xs text-gray-600">{achievement.description}</p>
                          {achievement.earned && (
                            <Badge variant="secondary" className="text-xs mt-1">
                              Earned
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="profile" className="space-y-6">
              <div className="grid lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-20 h-20">
                        <AvatarImage src={userData.avatar || "/placeholder.svg"} alt={userData.name} />
                        <AvatarFallback className="text-lg">AJ</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-xl font-semibold">{userData.name}</h3>
                        <p className="text-gray-600">{userData.email}</p>
                        <p className="text-sm text-gray-500">Member since {userData.joinDate}</p>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 pt-4">
                      <div>
                        <Label className="text-sm font-medium">Current Goal</Label>
                        <p className="text-sm text-gray-600">Become a Frontend Developer</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Experience Level</Label>
                        <p className="text-sm text-gray-600">2 years in web development</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Preferred Learning Style</Label>
                        <p className="text-sm text-gray-600">Hands-on projects</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Time Commitment</Label>
                        <p className="text-sm text-gray-600">10-15 hours per week</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-lg">Account Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start bg-transparent hover:bg-blue-50 hover:border-blue-300 transition-all duration-200">
                      <Settings className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent hover:bg-blue-50 hover:border-blue-300 transition-all duration-200">
                      <Bell className="w-4 h-4 mr-2" />
                      Notifications
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent hover:bg-blue-50 hover:border-blue-300 transition-all duration-200">
                      <Target className="w-4 h-4 mr-2" />
                      Learning Preferences
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-red-600 hover:text-red-700 bg-transparent hover:bg-red-50 hover:border-red-300 transition-all duration-200"
                      onClick={signOut}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <AIChatWidget />
      </div>
    </ProtectedRoute>
  )
}
