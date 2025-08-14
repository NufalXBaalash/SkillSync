"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Brain, 
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
  ChevronRight,
  Check,
  X,
  AlertCircle,
  Info,
  Timer
} from "lucide-react"
import Link from "next/link"
import ProtectedRoute from "@/components/protected-route"
import SidebarNavigation from "@/components/sidebar-navigation"
import { useAuth } from "@/contexts/auth-context"

export default function AssessmentPage() {
  const { user } = useAuth()
  const [currentStep, setCurrentStep] = useState(1)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [formData, setFormData] = useState({
    experience: "",
    goals: "",
    skills: "",
    timeCommitment: "",
    learningStyle: ""
  })

  // Simulate analysis progress
  useEffect(() => {
    if (isAnalyzing) {
      const interval = setInterval(() => {
        setAnalysisProgress(prev => {
          if (prev >= 100) {
            setIsAnalyzing(false)
            setAnalysisComplete(true)
            return 100
          }
          return prev + 10
        })
      }, 500)
      return () => clearInterval(interval)
    }
  }, [isAnalyzing])

  const startAnalysis = () => {
    setIsAnalyzing(true)
    setAnalysisProgress(0)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  if (analysisComplete) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
          <SidebarNavigation />
          
          {/* Main Content */}
          <div className="lg:ml-64">
            <div className="p-6 lg:p-8">
              <div className="max-w-4xl mx-auto">
                {/* Success Header */}
                <div className="text-center mb-12 skillsync-fade-in">
                  <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg" 
                       style={{ backgroundColor: 'var(--success)' }}>
                    <Check className="w-12 h-12 text-white" />
                  </div>
                  <h1 className="text-h1 mb-4" style={{ color: 'var(--foreground)' }}>Assessment Complete!</h1>
                  <p className="text-body max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                    Your AI-powered skill analysis is ready. Discover your strengths, identify growth areas, and get a personalized career roadmap.
                  </p>
                </div>

                {/* Results Grid */}
                <div className="grid lg:grid-cols-2 gap-8 mb-12">
                  {/* Skills Overview */}
                  <Card className="skillsync-card skillsync-fade-in skillsync-stagger-1 hover:shadow-lg transition-all duration-300">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-h3 flex items-center" style={{ color: 'var(--foreground)' }}>
                        <Target className="w-5 h-5 mr-3" style={{ color: 'var(--primary)' }} />
                        Skills Overview
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center p-3 rounded-lg" style={{ backgroundColor: 'var(--muted)' }}>
                          <span className="text-body-sm font-medium" style={{ color: 'var(--foreground)' }}>Technical Skills</span>
                          <Badge className="px-3 py-1 rounded-full" style={{ backgroundColor: 'var(--success)', color: 'var(--success-foreground)' }}>Strong</Badge>
                        </div>
                        <div className="flex justify-between items-center p-3 rounded-lg" style={{ backgroundColor: 'var(--muted)' }}>
                          <span className="text-body-sm font-medium" style={{ color: 'var(--foreground)' }}>Problem Solving</span>
                          <Badge className="px-3 py-1 rounded-full" style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-foreground)' }}>Good</Badge>
                        </div>
                        <div className="flex justify-between items-center p-3 rounded-lg" style={{ backgroundColor: 'var(--muted)' }}>
                          <span className="text-body-sm font-medium" style={{ color: 'var(--foreground)' }}>Communication</span>
                          <Badge className="px-3 py-1 rounded-full" style={{ backgroundColor: 'var(--secondary)', color: 'var(--secondary-foreground)' }}>Developing</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Career Recommendations */}
                  <Card className="skillsync-card skillsync-fade-in skillsync-stagger-2 hover:shadow-lg transition-all duration-300">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-h3 flex items-center" style={{ color: 'var(--foreground)' }}>
                        <Rocket className="w-5 h-5 mr-3" style={{ color: 'var(--secondary)' }} />
                        Career Recommendations
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-4 rounded-lg border" style={{ backgroundColor: 'var(--muted)', borderColor: 'var(--border)' }}>
                          <h4 className="font-semibold text-body-sm mb-2" style={{ color: 'var(--foreground)' }}>Frontend Developer</h4>
                          <p className="text-small leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>High match based on your skills</p>
                        </div>
                        <div className="p-4 rounded-lg border" style={{ backgroundColor: 'var(--muted)', borderColor: 'var(--border)' }}>
                          <h4 className="font-semibold text-body-sm mb-2" style={{ color: 'var(--foreground)' }}>UX Designer</h4>
                          <p className="text-small leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>Good potential with some training</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Action Buttons */}
                <div className="text-center space-y-6">
                  <Link href="/roadmap">
                    <Button className="skillsync-btn-primary text-lg px-10 py-4 h-auto hover:shadow-lg transition-all duration-300">
                      <Map className="w-5 h-5 mr-3" />
                      View Your Roadmap
                    </Button>
                  </Link>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link href="/dashboard">
                      <Button variant="outline" className="skillsync-btn-secondary px-6 py-2">
                        Back to Dashboard
                      </Button>
                    </Link>
                    <Button variant="outline" className="skillsync-btn-secondary px-6 py-2">
                      <ClipboardCheck className="w-4 h-4 mr-2" />
                      Retake Assessment
                    </Button>
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
          <div className="lg:ml-64">
            <div className="p-6 lg:p-8">
              <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
                <Card className="w-full max-w-lg skillsync-card skillsync-scale-in shadow-xl">
                  <CardHeader className="text-center pb-6">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg" 
                         style={{ background: 'var(--primary)' }}>
                      <Brain className="w-10 h-10 text-white animate-pulse" />
                    </div>
                    <CardTitle className="text-h2 mb-3" style={{ color: 'var(--foreground)' }}>AI Analysis in Progress</CardTitle>
                    <CardDescription className="text-body leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                      Our AI is analyzing your skills and experience to create personalized recommendations
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-3">
                      <Progress value={analysisProgress} className="h-3" />
                      <div className="flex justify-between items-center">
                        <span className="text-body-sm font-medium" style={{ color: 'var(--foreground)' }}>Analysis Progress</span>
                        <span className="text-body-sm font-semibold" style={{ color: 'var(--primary)' }}>{analysisProgress}%</span>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-body-sm" style={{ color: 'var(--muted-foreground)' }}>
                        This usually takes 30-60 seconds. Please wait while we process your information.
                      </p>
                    </div>
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
        <div className="lg:ml-64">
          <div className="p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
              {/* Header */}
              <div className="text-center mb-12 skillsync-fade-in">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg" 
                     style={{ backgroundColor: 'var(--primary)' }}>
                  <Brain className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-h1 mb-4" style={{ color: 'var(--foreground)' }}>AI-Powered Skill Assessment</h1>
                <p className="text-body max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                  Let our AI analyze your skills, experience, and goals to create a personalized career development plan.
                </p>
              </div>

              {/* Assessment Form */}
              <Card className="skillsync-card skillsync-fade-in skillsync-stagger-1 mb-12 shadow-lg">
                <CardHeader className="pb-6">
                  <CardTitle className="text-h2 mb-2" style={{ color: 'var(--foreground)' }}>Tell Us About Yourself</CardTitle>
                  <CardDescription className="text-body leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                    This information helps us create the most accurate assessment and personalized recommendations.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <Label htmlFor="experience" className="text-body-sm font-medium" style={{ color: 'var(--foreground)' }}>
                        Years of Experience
                      </Label>
                      <select
                        id="experience"
                        value={formData.experience}
                        onChange={(e) => handleInputChange('experience', e.target.value)}
                        className="skillsync-input h-11"
                      >
                        <option value="">Select experience level</option>
                        <option value="0-1">0-1 years (Entry Level)</option>
                        <option value="1-3">1-3 years (Junior)</option>
                        <option value="3-5">3-5 years (Mid-level)</option>
                        <option value="5-8">5-8 years (Senior)</option>
                        <option value="8+">8+ years (Expert)</option>
                      </select>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="timeCommitment" className="text-body-sm font-medium" style={{ color: 'var(--foreground)' }}>
                        Weekly Time Commitment
                      </Label>
                      <select
                        id="timeCommitment"
                        value={formData.timeCommitment}
                        onChange={(e) => handleInputChange('timeCommitment', e.target.value)}
                        className="skillsync-input h-11"
                      >
                        <option value="">Select time commitment</option>
                        <option value="1-3">1-3 hours</option>
                        <option value="3-5">3-5 hours</option>
                        <option value="5-10">5-10 hours</option>
                        <option value="10-15">10-15 hours</option>
                        <option value="15+">15+ hours</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="goals" className="text-body-sm font-medium" style={{ color: 'var(--foreground)' }}>
                      Career Goals
                    </Label>
                    <Textarea
                      id="goals"
                      placeholder="What are your career goals? (e.g., become a senior developer, switch to data science, start a business)"
                      value={formData.goals}
                      onChange={(e) => handleInputChange('goals', e.target.value)}
                      className="skillsync-input min-h-[120px] resize-none"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="skills" className="text-body-sm font-medium" style={{ color: 'var(--foreground)' }}>
                      Current Skills & Technologies
                    </Label>
                    <Textarea
                      id="skills"
                      placeholder="List your current skills, programming languages, tools, and technologies you're familiar with"
                      value={formData.skills}
                      onChange={(e) => handleInputChange('skills', e.target.value)}
                      className="skillsync-input min-h-[120px] resize-none"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="learningStyle" className="text-body-sm font-medium" style={{ color: 'var(--foreground)' }}>
                      Preferred Learning Style
                    </Label>
                    <select
                      id="learningStyle"
                      value={formData.learningStyle}
                      onChange={(e) => handleInputChange('learningStyle', e.target.value)}
                      className="skillsync-input h-11"
                    >
                      <option value="">Select learning style</option>
                      <option value="hands-on">Hands-on projects and practice</option>
                      <option value="video">Video tutorials and courses</option>
                      <option value="reading">Reading documentation and books</option>
                      <option value="mentorship">One-on-one mentorship</option>
                      <option value="mixed">Mixed approach</option>
                    </select>
                  </div>

                  <div className="pt-6">
                    <Button 
                      onClick={startAnalysis}
                      className="w-full skillsync-btn-primary text-lg py-4 h-auto hover:shadow-lg transition-all duration-300"
                      disabled={!formData.experience || !formData.goals || !formData.skills}
                    >
                      <Brain className="w-5 h-5 mr-3" />
                      Start AI Analysis
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Benefits Section */}
              <div className="grid md:grid-cols-3 gap-8">
                <Card className="skillsync-card skillsync-fade-in skillsync-stagger-2 text-center hover:shadow-lg transition-all duration-300 group">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:scale-110" 
                         style={{ backgroundColor: 'var(--primary)' }}>
                      <Target className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-h3 mb-3" style={{ color: 'var(--foreground)' }}>Personalized Roadmap</h3>
                    <p className="text-body-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                      Get a customized learning path based on your current skills and career goals
                    </p>
                  </CardContent>
                </Card>

                <Card className="skillsync-card skillsync-fade-in skillsync-stagger-3 text-center hover:shadow-lg transition-all duration-300 group">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:scale-110" 
                         style={{ backgroundColor: 'var(--secondary)' }}>
                      <TrendingUp className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-h3 mb-3" style={{ color: 'var(--foreground)' }}>Skill Gap Analysis</h3>
                    <p className="text-body-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                      Identify exactly what skills you need to develop for your target role
                    </p>
                  </CardContent>
                </Card>

                <Card className="skillsync-card skillsync-fade-in skillsync-stagger-4 text-center hover:shadow-lg transition-all duration-300 group">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:scale-110" 
                         style={{ backgroundColor: 'var(--accent)' }}>
                      <Rocket className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-h3 mb-3" style={{ color: 'var(--foreground)' }}>Career Guidance</h3>
                    <p className="text-body-sm leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                      Receive actionable advice and recommendations for career advancement
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
