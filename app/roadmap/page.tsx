"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Map, 
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
  Monitor, 
  Rocket, 
  Lightbulb, 
  Calendar,
  ChevronRight,
  Check,
  X,
  AlertCircle,
  Info,
  Timer,
  ExternalLink,
  Code,
  Briefcase,
  Globe,
  Database,
  Cloud,
  Shield,
  Palette,
  Lock,
  Unlock,
  Clock as ClockIcon,
  BookOpen as BookOpenIcon,
  Play as PlayIcon,
  Target as TargetIcon
} from "lucide-react"
import Link from "next/link"
import ProtectedRoute from "@/components/protected-route"
import SidebarNavigation from "@/components/sidebar-navigation"
import { useAuth } from "@/contexts/auth-context"

export default function RoadmapPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")

  const roadmapData = {
    currentPath: "Frontend Developer",
    overallProgress: 68,
    currentLevel: "Intermediate",
    nextLevel: "Advanced",
    estimatedTime: "4-6 months",
    totalMilestones: 6,
    completedMilestones: 4,
    skillsLearned: 15,
    skillsRemaining: 8
  }

  const milestones = [
    {
      id: 1,
      title: "JavaScript Fundamentals",
      description: "Master core JavaScript concepts and ES6+ features",
      status: "completed",
      progress: 100,
      skills: ["Variables", "Functions", "Objects", "Arrays", "ES6+"],
      estimatedTime: "2-3 weeks",
      completedDate: "2024-01-15"
    },
    {
      id: 2,
      title: "HTML & CSS Mastery",
      description: "Build responsive layouts with modern CSS techniques",
      status: "completed",
      progress: 100,
      skills: ["Semantic HTML", "Flexbox", "Grid", "Responsive Design"],
      estimatedTime: "3-4 weeks",
      completedDate: "2024-02-10"
    },
    {
      id: 3,
      title: "React Fundamentals",
      description: "Learn React core concepts and component architecture",
      status: "completed",
      progress: 100,
      skills: ["Components", "Props", "State", "Hooks", "JSX"],
      estimatedTime: "4-5 weeks",
      completedDate: "2024-03-20"
    },
    {
      id: 4,
      title: "Advanced React Patterns",
      description: "Master advanced React concepts and best practices",
      status: "completed",
      progress: 100,
      skills: ["Context API", "Custom Hooks", "Performance", "Testing"],
      estimatedTime: "3-4 weeks",
      completedDate: "2024-04-15"
    },
    {
      id: 5,
      title: "State Management & Routing",
      description: "Learn Redux, React Router, and advanced state patterns",
      status: "in-progress",
      progress: 65,
      skills: ["Redux", "React Router", "Context vs Redux", "Async Actions"],
      estimatedTime: "4-5 weeks",
      currentSkill: "Redux Toolkit"
    },
    {
      id: 6,
      title: "Advanced Frontend Concepts",
      description: "Master TypeScript, testing, and deployment",
      status: "locked",
      progress: 0,
      skills: ["TypeScript", "Testing", "CI/CD", "Performance", "Accessibility"],
      estimatedTime: "5-6 weeks",
      prerequisites: ["Complete milestone 5"]
    }
  ]

  const recommendedCourses = [
    {
      title: "Complete React Developer 2024",
      platform: "Udemy",
      rating: 4.8,
      students: "125K+",
      price: "$29.99",
      duration: "42 hours",
      skills: ["React", "Hooks", "Context", "Redux"],
      url: "#"
    },
    {
      title: "Advanced JavaScript Concepts",
      platform: "Frontend Masters",
      rating: 4.9,
      students: "15K+",
      price: "$39/month",
      duration: "8 hours",
      skills: ["ES6+", "Async/Await", "Modules", "Performance"],
      url: "#"
    },
    {
      title: "TypeScript Fundamentals",
      platform: "Pluralsight",
      rating: 4.7,
      students: "45K+",
      price: "$29/month",
      duration: "6 hours",
      skills: ["TypeScript", "Interfaces", "Generics", "Advanced Types"],
      url: "#"
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5" style={{ color: 'var(--success)' }} />
      case "in-progress":
        return <Clock className="w-5 h-5" style={{ color: 'var(--accent)' }} />
      case "locked":
        return <Lock className="w-5 h-5" style={{ color: 'var(--muted-foreground)' }} />
      default:
        return <Clock className="w-5 h-5" style={{ color: 'var(--muted-foreground)' }} />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge style={{ backgroundColor: 'var(--success)', color: 'var(--success-foreground)' }}>Completed</Badge>
      case "in-progress":
        return <Badge style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-foreground)' }}>In Progress</Badge>
      case "locked":
        return <Badge style={{ backgroundColor: 'var(--muted-foreground)', color: 'var(--muted)' }}>Locked</Badge>
      default:
        return <Badge style={{ backgroundColor: 'var(--muted-foreground)', color: 'var(--muted)' }}>Not Started</Badge>
    }
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
        <SidebarNavigation />
        
        {/* Main Content */}
        <div className="lg:ml-64 lg:pt-16">
          <div className="p-6 lg:p-8">
            <div className="max-w-6xl mx-auto">
              {/* Header */}
              <div className="mb-8 skillsync-fade-in">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h1 className="text-h1 mb-2" style={{ color: 'var(--foreground)' }}>
                      Your Career Roadmap
                    </h1>
                    <p className="text-body" style={{ color: 'var(--muted-foreground)' }}>
                      Personalized learning path to become a {roadmapData.currentPath}
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge className="px-3 py-1" style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>
                      <Target className="w-4 h-4 mr-1" />
                      {roadmapData.currentLevel}
                    </Badge>
                    <Badge className="px-3 py-1" style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-foreground)' }}>
                      <Clock className="w-4 h-4 mr-1" />
                      {roadmapData.estimatedTime}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Progress Overview */}
              <div className="grid lg:grid-cols-4 gap-6 mb-8">
                <Card className="skillsync-card skillsync-fade-in skillsync-stagger-1">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold mb-2" style={{ color: 'var(--primary)' }}>
                      {roadmapData.overallProgress}%
                    </div>
                    <Progress value={roadmapData.overallProgress} className="h-3 mb-3" />
                    <p className="text-body-sm" style={{ color: 'var(--muted-foreground)' }}>
                      Overall Progress
                    </p>
                  </CardContent>
                </Card>

                <Card className="skillsync-card skillsync-fade-in skillsync-stagger-2">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold mb-2" style={{ color: 'var(--success)' }}>
                      {roadmapData.completedMilestones}/{roadmapData.totalMilestones}
                    </div>
                    <p className="text-body-sm" style={{ color: 'var(--muted-foreground)' }}>
                      Milestones Completed
                    </p>
                  </CardContent>
                </Card>

                <Card className="skillsync-card skillsync-fade-in skillsync-stagger-3">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold mb-2" style={{ color: 'var(--secondary)' }}>
                      {roadmapData.skillsLearned}
                    </div>
                    <p className="text-body-sm" style={{ color: 'var(--muted-foreground)' }}>
                      Skills Learned
                    </p>
                  </CardContent>
                </Card>

                <Card className="skillsync-card skillsync-fade-in skillsync-stagger-4">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold mb-2" style={{ color: 'var(--accent)' }}>
                      {roadmapData.skillsRemaining}
                    </div>
                    <p className="text-body-sm" style={{ color: 'var(--muted-foreground)' }}>
                      Skills Remaining
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Main Content Tabs */}
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-3 mb-6" style={{ backgroundColor: 'var(--muted)' }}>
                      <TabsTrigger value="overview" className="skillsync-nav-link">Overview</TabsTrigger>
                      <TabsTrigger value="milestones" className="skillsync-nav-link">Milestones</TabsTrigger>
                      <TabsTrigger value="courses" className="skillsync-nav-link">Courses</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-6">
                      {/* Roadmap Visualization */}
                      <Card className="skillsync-card skillsync-fade-in">
                        <CardHeader>
                          <CardTitle className="text-h3 flex items-center" style={{ color: 'var(--foreground)' }}>
                            <Map className="w-5 h-5 mr-2" style={{ color: 'var(--primary)' }} />
                            Learning Path
                          </CardTitle>
                          <CardDescription style={{ color: 'var(--muted-foreground)' }}>
                            Your journey from {roadmapData.currentLevel} to {roadmapData.nextLevel} level
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-6">
                            {milestones.map((milestone, index) => (
                              <div key={milestone.id} className="relative">
                                {/* Connection Line */}
                                {index < milestones.length - 1 && (
                                  <div className="absolute left-6 top-12 w-0.5 h-8" style={{ backgroundColor: 'var(--border)' }}></div>
                                )}
                                
                                <div className="flex items-start space-x-4">
                                  {/* Status Icon */}
                                  <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center" 
                                       style={{ backgroundColor: milestone.status === 'completed' ? 'var(--success)' : 
                                               milestone.status === 'in-progress' ? 'var(--accent)' : 'var(--muted)' }}>
                                    {getStatusIcon(milestone.status)}
                                  </div>
                                  
                                  {/* Content */}
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-2">
                                      <h3 className="text-h3 font-medium" style={{ color: 'var(--foreground)' }}>
                                        {milestone.title}
                                      </h3>
                                      {getStatusBadge(milestone.status)}
                                    </div>
                                    
                                    <p className="text-body-sm mb-3" style={{ color: 'var(--muted-foreground)' }}>
                                      {milestone.description}
                                    </p>
                                    
                                    {milestone.status === 'in-progress' && (
                                      <div className="mb-3">
                                        <div className="flex justify-between items-center mb-2">
                                          <span className="text-body-sm" style={{ color: 'var(--foreground)' }}>Progress</span>
                                          <span className="text-body-sm" style={{ color: 'var(--muted-foreground)' }}>{milestone.progress}%</span>
                                        </div>
                                        <Progress value={milestone.progress} className="h-2" />
                                        {milestone.currentSkill && (
                                          <p className="text-small mt-1" style={{ color: 'var(--accent)' }}>
                                            Currently learning: {milestone.currentSkill}
                                          </p>
                                        )}
                                      </div>
                                    )}
                                    
                                    {milestone.status === 'completed' && milestone.completedDate && (
                                      <p className="text-small" style={{ color: 'var(--success)' }}>
                                        ✓ Completed on {new Date(milestone.completedDate).toLocaleDateString()}
                                      </p>
                                    )}
                                    
                                    {milestone.status === 'locked' && milestone.prerequisites && (
                                      <p className="text-small" style={{ color: 'var(--muted-foreground)' }}>
                                        🔒 {milestone.prerequisites}
                                      </p>
                                    )}
                                    
                                    <div className="mt-3">
                                      <div className="flex flex-wrap gap-2">
                                        {milestone.skills.map((skill, skillIndex) => (
                                          <Badge key={skillIndex} variant="outline" className="text-xs" 
                                                 style={{ borderColor: 'var(--border)', color: 'var(--muted-foreground)' }}>
                                            {skill}
                                          </Badge>
                                        ))}
                                      </div>
                                      <p className="text-small mt-2" style={{ color: 'var(--muted-foreground)' }}>
                                        Estimated time: {milestone.estimatedTime}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="milestones" className="space-y-6">
                      <Card className="skillsync-card skillsync-fade-in">
                        <CardHeader>
                          <CardTitle className="text-h3" style={{ color: 'var(--foreground)' }}>Detailed Milestones</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-6">
                            {milestones.map((milestone) => (
                              <Card key={milestone.id} className="skillsync-card">
                                <CardHeader>
                                  <div className="flex items-center justify-between">
                                    <CardTitle className="text-h3" style={{ color: 'var(--foreground)' }}>
                                      {milestone.title}
                                    </CardTitle>
                                    {getStatusBadge(milestone.status)}
                                  </div>
                                  <CardDescription style={{ color: 'var(--muted-foreground)' }}>
                                    {milestone.description}
                                  </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                  {milestone.status === 'in-progress' && (
                                    <div>
                                      <div className="flex justify-between items-center mb-2">
                                        <span className="text-body-sm" style={{ color: 'var(--foreground)' }}>Progress</span>
                                        <span className="text-body-sm" style={{ color: 'var(--muted-foreground)' }}>{milestone.progress}%</span>
                                      </div>
                                      <Progress value={milestone.progress} className="h-3" />
                                    </div>
                                  )}
                                  
                                  <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                      <h4 className="font-medium text-body-sm mb-2" style={{ color: 'var(--foreground)' }}>Skills Covered</h4>
                                      <div className="flex flex-wrap gap-2">
                                        {milestone.skills.map((skill, index) => (
                                          <Badge key={index} variant="outline" className="text-xs" 
                                                 style={{ borderColor: 'var(--border)', color: 'var(--muted-foreground)' }}>
                                            {skill}
                                          </Badge>
                                        ))}
                                      </div>
                                    </div>
                                    
                                    <div>
                                      <h4 className="font-medium text-body-sm mb-2" style={{ color: 'var(--foreground)' }}>Details</h4>
                                      <div className="space-y-2 text-body-sm" style={{ color: 'var(--muted-foreground)' }}>
                                        <p>Estimated time: {milestone.estimatedTime}</p>
                                        {milestone.status === 'completed' && milestone.completedDate && (
                                          <p>Completed: {new Date(milestone.completedDate).toLocaleDateString()}</p>
                                        )}
                                        {milestone.status === 'locked' && milestone.prerequisites && (
                                          <p>Prerequisites: {milestone.prerequisites}</p>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  
                                  {milestone.status === 'in-progress' && (
                                    <div className="pt-4">
                                      <Button className="skillsync-btn-primary">
                                        <Play className="w-4 h-4 mr-2" />
                                        Continue Learning
                                      </Button>
                                    </div>
                                  )}
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="courses" className="space-y-6">
                      <Card className="skillsync-card skillsync-fade-in">
                        <CardHeader>
                          <CardTitle className="text-h3" style={{ color: 'var(--foreground)' }}>Recommended Courses</CardTitle>
                          <CardDescription style={{ color: 'var(--muted-foreground)' }}>
                            Curated courses to help you achieve your learning goals
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {recommendedCourses.map((course, index) => (
                              <Card key={index} className="skillsync-card hover:shadow-lg transition-all duration-300">
                                <CardContent className="p-4">
                                  <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                      <h4 className="text-h3 font-medium mb-2" style={{ color: 'var(--foreground)' }}>
                                        {course.title}
                                      </h4>
                                      <div className="flex items-center space-x-4 mb-3 text-body-sm" style={{ color: 'var(--muted-foreground)' }}>
                                        <span>{course.platform}</span>
                                        <span className="flex items-center">
                                          <Star className="w-4 h-4 mr-1" style={{ color: 'var(--accent)' }} />
                                          {course.rating}
                                        </span>
                                        <span>{course.students} students</span>
                                        <span>{course.duration}</span>
                                      </div>
                                      <div className="flex flex-wrap gap-2 mb-3">
                                        {course.skills.map((skill, skillIndex) => (
                                          <Badge key={skillIndex} variant="outline" className="text-xs" 
                                                 style={{ borderColor: 'var(--secondary)', color: 'var(--secondary)' }}>
                                            {skill}
                                          </Badge>
                                        ))}
                                      </div>
                                    </div>
                                    <div className="text-right ml-4">
                                      <div className="text-h3 font-bold mb-2" style={{ color: 'var(--primary)' }}>
                                        {course.price}
                                      </div>
                                      <Button className="skillsync-btn-primary">
                                        <ExternalLink className="w-4 h-4 mr-2" />
                                        View Course
                                      </Button>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </div>

                {/* Right Sidebar */}
                <div className="space-y-6">
                  {/* Next Steps */}
                  <Card className="skillsync-card skillsync-fade-in skillsync-stagger-4">
                    <CardHeader>
                      <CardTitle className="text-h3" style={{ color: 'var(--foreground)' }}>Next Steps</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--muted)' }}>
                        <h4 className="font-medium text-body-sm mb-2" style={{ color: 'var(--foreground)' }}>
                          Current Focus: State Management
                        </h4>
                        <p className="text-small mb-3" style={{ color: 'var(--muted-foreground)' }}>
                          You're 65% through learning Redux and state management patterns
                        </p>
                        <Progress value={65} className="h-2 mb-3" />
                        <Button size="sm" className="skillsync-btn-primary w-full">
                          <Play className="w-4 h-4 mr-2" />
                          Continue Learning
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Learning Stats */}
                  <Card className="skillsync-card skillsync-fade-in skillsync-stagger-4">
                    <CardHeader>
                      <CardTitle className="text-h3" style={{ color: 'var(--foreground)' }}>Learning Stats</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-body-sm" style={{ color: 'var(--muted-foreground)' }}>This week</span>
                        <span className="text-body-sm font-medium" style={{ color: 'var(--foreground)' }}>8.5 hours</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-body-sm" style={{ color: 'var(--muted-foreground)' }}>Streak</span>
                        <span className="text-body-sm font-medium" style={{ color: 'var(--foreground)' }}>12 days</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-body-sm" style={{ color: 'var(--muted-foreground)' }}>Courses completed</span>
                        <span className="text-body-sm font-medium" style={{ color: 'var(--foreground)' }}>3</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Quick Actions */}
                  <div className="space-y-3">
                    <Link href="/assessment">
                      <Button className="w-full skillsync-btn-primary">
                        <ClipboardCheck className="w-4 h-4 mr-2" />
                        Update Assessment
                      </Button>
                    </Link>
                    <Link href="/simulation">
                      <Button variant="outline" className="w-full skillsync-btn-secondary">
                        <Play className="w-4 h-4 mr-2" />
                        Try Simulation
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
