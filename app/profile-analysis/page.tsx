"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Github, 
  Linkedin, 
  TrendingUp, 
  Target, 
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
  Zap, 
  ClipboardCheck, 
  Map, 
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
  Palette
} from "lucide-react"
import Link from "next/link"
import ProtectedRoute from "@/components/protected-route"
import SidebarNavigation from "@/components/sidebar-navigation"
import { useAuth } from "@/contexts/auth-context"

export default function ProfileAnalysisPage() {
  const { user } = useAuth()
  const [githubUrl, setGithubUrl] = useState("")
  const [linkedinUrl, setLinkedinUrl] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)

  const startAnalysis = () => {
    if (!githubUrl && !linkedinUrl) return
    
    setIsAnalyzing(true)
    setAnalysisProgress(0)
    
    // Simulate analysis progress
    const interval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 100) {
          setIsAnalyzing(false)
          setAnalysisComplete(true)
          clearInterval(interval)
          return 100
        }
        return prev + 10
      })
    }, 500)
  }

  if (analysisComplete) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
          <SidebarNavigation />
          
          {/* Main Content */}
          <div className="lg:ml-64 lg:pt-16">
            <div className="p-6 lg:p-8">
              <div className="max-w-6xl mx-auto">
                {/* Success Header */}
                <div className="text-center mb-8 skillsync-fade-in">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'var(--success)' }}>
                    <Check className="w-10 h-10 text-white" />
                  </div>
                  <h1 className="text-h1 mb-4" style={{ color: 'var(--foreground)' }}>Profile Analysis Complete!</h1>
                  <p className="text-body max-w-2xl mx-auto" style={{ color: 'var(--muted-foreground)' }}>
                    We've analyzed your professional profiles and created a comprehensive skill assessment. Here's what we found:
                  </p>
                </div>

                {/* Analysis Results Grid */}
                <div className="grid lg:grid-cols-3 gap-8 mb-8">
                  {/* Skills Overview */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Technical Skills */}
                    <Card className="skillsync-card skillsync-fade-in skillsync-stagger-1">
                      <CardHeader>
                        <CardTitle className="text-h3 flex items-center" style={{ color: 'var(--foreground)' }}>
                          <Code className="w-5 h-5 mr-2" style={{ color: 'var(--primary)' }} />
                          Technical Skills
                        </CardTitle>
                        <CardDescription style={{ color: 'var(--muted-foreground)' }}>
                          Skills identified from your GitHub repositories and projects
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          {[
                            { skill: "JavaScript", level: 85, category: "Programming" },
                            { skill: "React", level: 78, category: "Frontend" },
                            { skill: "Node.js", level: 65, category: "Backend" },
                            { skill: "Python", level: 72, category: "Programming" },
                            { skill: "SQL", level: 60, category: "Database" },
                            { skill: "Git", level: 80, category: "Tools" }
                          ].map((skill, index) => (
                            <div key={index} className="space-y-2 p-3 rounded-lg hover:shadow-md transition-all duration-200" style={{ backgroundColor: 'var(--muted)' }}>
                              <div className="flex justify-between items-center">
                                <span className="font-medium text-body-sm" style={{ color: 'var(--foreground)' }}>{skill.skill}</span>
                                <Badge variant="outline" className="text-xs" style={{ borderColor: 'var(--secondary)', color: 'var(--secondary)' }}>
                                  {skill.category}
                                </Badge>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Progress value={skill.level} className="flex-1 h-2" />
                                <span className="text-body-sm w-12" style={{ color: 'var(--muted-foreground)' }}>{skill.level}%</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Professional Experience */}
                    <Card className="skillsync-card skillsync-fade-in skillsync-stagger-2">
                      <CardHeader>
                        <CardTitle className="text-h3 flex items-center" style={{ color: 'var(--foreground)' }}>
                          <Briefcase className="w-5 h-5 mr-2" style={{ color: 'var(--secondary)' }} />
                          Professional Experience
                        </CardTitle>
                        <CardDescription style={{ color: 'var(--muted-foreground)' }}>
                          Experience and achievements from your LinkedIn profile
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--muted)' }}>
                            <h4 className="font-medium text-body-sm mb-2" style={{ color: 'var(--foreground)' }}>Senior Frontend Developer</h4>
                            <p className="text-small mb-2" style={{ color: 'var(--muted-foreground)' }}>TechCorp Inc. • 2021 - Present</p>
                            <p className="text-body-sm" style={{ color: 'var(--muted-foreground)' }}>
                              Led development of customer-facing applications using React and TypeScript. 
                              Mentored junior developers and implemented best practices.
                            </p>
                          </div>
                          <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--muted)' }}>
                            <h4 className="font-medium text-body-sm mb-2" style={{ color: 'var(--foreground)' }}>Frontend Developer</h4>
                            <p className="text-small mb-2" style={{ color: 'var(--muted-foreground)' }}>StartupXYZ • 2019 - 2021</p>
                            <p className="text-body-sm" style={{ color: 'var(--muted-foreground)' }}>
                              Built responsive web applications and collaborated with design and backend teams.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Right Sidebar */}
                  <div className="space-y-6">
                    {/* Career Matches */}
                    <Card className="skillsync-card skillsync-fade-in skillsync-stagger-3">
                      <CardHeader>
                        <CardTitle className="text-h3 flex items-center" style={{ color: 'var(--foreground)' }}>
                          <Target className="w-5 h-5 mr-2" style={{ color: 'var(--accent)' }} />
                          Career Matches
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {[
                          { role: "Senior Frontend Developer", match: 92, description: "Excellent match with your React and leadership experience" },
                          { role: "Full Stack Developer", match: 78, description: "Good foundation, could strengthen backend skills" },
                          { role: "Tech Lead", match: 85, description: "Strong potential given your mentoring experience" }
                        ].map((match, index) => (
                          <div key={index} className="space-y-2 p-3 rounded-lg hover:shadow-md transition-all duration-200" style={{ backgroundColor: 'var(--muted)' }}>
                            <div className="flex justify-between items-center">
                              <h4 className="font-medium text-body-sm" style={{ color: 'var(--foreground)' }}>{match.role}</h4>
                              <Badge style={{ backgroundColor: 'var(--success)', color: 'var(--success-foreground)' }}>
                                {match.match}%
                              </Badge>
                            </div>
                            <p className="text-small" style={{ color: 'var(--muted-foreground)' }}>{match.description}</p>
                            <Progress value={match.match} className="h-2" />
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    {/* Quick Actions */}
                    <div className="space-y-3">
                      <Link href="/roadmap">
                        <Button className="w-full skillsync-btn-primary">
                          <Map className="w-4 h-4 mr-2" />
                          View Roadmap
                        </Button>
                      </Link>
                      <Link href="/assessment">
                        <Button variant="outline" className="w-full skillsync-btn-secondary">
                          <ClipboardCheck className="w-4 h-4 mr-2" />
                          Retake Assessment
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

  if (isAnalyzing) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
          <SidebarNavigation />
          
          {/* Main Content */}
          <div className="lg:ml-64 lg:pt-16">
            <div className="p-6 lg:p-8">
              <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
                <Card className="w-full max-w-md skillsync-card skillsync-scale-in">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg" style={{ background: 'var(--primary)' }}>
                      <TrendingUp className="w-8 h-8 text-white animate-pulse" />
                    </div>
                    <CardTitle className="text-h2" style={{ color: 'var(--foreground)' }}>Analyzing Your Profiles</CardTitle>
                    <CardDescription style={{ color: 'var(--muted-foreground)' }}>
                      Our AI is analyzing your GitHub and LinkedIn profiles
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Progress value={analysisProgress} className="h-2" />
                    <p className="text-center text-body-sm" style={{ color: 'var(--muted-foreground)' }}>{analysisProgress}% Complete</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
        <SidebarNavigation />
        
        {/* Main Content */}
        <div className="lg:ml-64 lg:pt-16">
          <div className="p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
              {/* Header */}
              <div className="text-center mb-8 skillsync-fade-in">
                <h1 className="text-h1 mb-4" style={{ color: 'var(--foreground)' }}>Professional Profile Analysis</h1>
                <p className="text-body max-w-2xl mx-auto" style={{ color: 'var(--muted-foreground)' }}>
                  Connect your GitHub and LinkedIn profiles for a comprehensive AI-powered analysis of your skills, experience, and career potential.
                </p>
              </div>

              {/* Profile Connection Form */}
              <Card className="skillsync-card skillsync-fade-in skillsync-stagger-1">
                <CardHeader>
                  <CardTitle className="text-h2" style={{ color: 'var(--foreground)' }}>Connect Your Profiles</CardTitle>
                  <CardDescription style={{ color: 'var(--muted-foreground)' }}>
                    We'll analyze your repositories, contributions, experience, and connections to provide personalized insights.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* GitHub Profile */}
                  <div className="space-y-2">
                    <Label htmlFor="github" className="flex items-center" style={{ color: 'var(--foreground)' }}>
                      <Github className="w-4 h-4 mr-2" />
                      GitHub Profile URL
                    </Label>
                    <Input
                      id="github"
                      type="url"
                      placeholder="https://github.com/yourusername"
                      value={githubUrl}
                      onChange={(e) => setGithubUrl(e.target.value)}
                      className="skillsync-input"
                    />
                    <p className="text-small" style={{ color: 'var(--muted-foreground)' }}>
                      We'll analyze your repositories, contributions, and coding patterns
                    </p>
                  </div>

                  {/* LinkedIn Profile */}
                  <div className="space-y-2">
                    <Label htmlFor="linkedin" className="flex items-center" style={{ color: 'var(--foreground)' }}>
                      <Linkedin className="w-4 h-4 mr-2" />
                      LinkedIn Profile URL
                    </Label>
                    <Input
                      id="linkedin"
                      type="url"
                      placeholder="https://linkedin.com/in/yourprofile"
                      value={linkedinUrl}
                      onChange={(e) => setLinkedinUrl(e.target.value)}
                      className="skillsync-input"
                    />
                    <p className="text-small" style={{ color: 'var(--muted-foreground)' }}>
                      We'll analyze your experience, skills, and professional network
                    </p>
                  </div>

                  <div className="pt-4">
                    <Button 
                      onClick={startAnalysis}
                      className="w-full skillsync-btn-primary text-lg py-3"
                      disabled={!githubUrl && !linkedinUrl}
                    >
                      <TrendingUp className="w-5 h-5 mr-2" />
                      Start Profile Analysis
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Benefits Section */}
              <div className="mt-12 grid md:grid-cols-3 gap-6">
                <Card className="skillsync-card skillsync-fade-in skillsync-stagger-2 text-center">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'var(--primary)' }}>
                      <Code className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-h3 mb-2" style={{ color: 'var(--foreground)' }}>Code Analysis</h3>
                    <p className="text-body-sm" style={{ color: 'var(--muted-foreground)' }}>
                      Analyze your GitHub repositories to identify technical skills and coding patterns
                    </p>
                  </CardContent>
                </Card>

                <Card className="skillsync-card skillsync-fade-in skillsync-stagger-3 text-center">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'var(--secondary)' }}>
                      <Briefcase className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-h3 mb-2" style={{ color: 'var(--foreground)' }}>Experience Insights</h3>
                    <p className="text-body-sm" style={{ color: 'var(--muted-foreground)' }}>
                      Get insights from your LinkedIn experience, skills, and professional achievements
                    </p>
                  </CardContent>
                </Card>

                <Card className="skillsync-card skillsync-fade-in skillsync-stagger-4 text-center">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'var(--accent)' }}>
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-h3 mb-2" style={{ color: 'var(--foreground)' }}>Career Matching</h3>
                    <p className="text-body-sm" style={{ color: 'var(--muted-foreground)' }}>
                      Find the best career paths that match your current skills and experience
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
