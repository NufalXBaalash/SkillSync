"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Play, 
  Target, 
  TrendingUp, 
  Award, 
  Clock, 
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
  Target as TargetIcon,
  Brain,
  MessageSquare,
  Video,
  FileText,
  CheckSquare,
  Square
} from "lucide-react"
import Link from "next/link"
import ProtectedRoute from "@/components/protected-route"
import SidebarNavigation from "@/components/sidebar-navigation"
import { useAuth } from "@/contexts/auth-context"

export default function SimulationPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("available")
  const [selectedSimulation, setSelectedSimulation] = useState<any>(null)
  const [isSimulationActive, setIsSimulationActive] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<{[key: string]: string}>({})
  const [simulationComplete, setSimulationComplete] = useState(false)

  const availableSimulations = [
    {
      id: 1,
      title: "Frontend Developer Interview",
      description: "Practice common frontend interview questions and scenarios",
      difficulty: "Intermediate",
      duration: "45-60 minutes",
      questions: 15,
      skills: ["React", "JavaScript", "CSS", "Problem Solving"],
      category: "Technical",
      rating: 4.8,
      attempts: 1250,
      thumbnail: "/placeholder.svg?height=120&width=200"
    },
    {
      id: 2,
      title: "System Design Challenge",
      description: "Design scalable systems and architecture solutions",
      difficulty: "Advanced",
      duration: "90-120 minutes",
      questions: 8,
      skills: ["System Design", "Architecture", "Scalability", "Databases"],
      category: "Technical",
      rating: 4.9,
      attempts: 890,
      thumbnail: "/placeholder.svg?height=120&width=200"
    },
    {
      id: 3,
      title: "Behavioral Interview Practice",
      description: "Master common behavioral and situational questions",
      difficulty: "Beginner",
      duration: "30-45 minutes",
      questions: 12,
      skills: ["Communication", "Leadership", "Problem Solving", "Teamwork"],
      category: "Soft Skills",
      rating: 4.7,
      attempts: 2100,
      thumbnail: "/placeholder.svg?height=120&width=200"
    },
    {
      id: 4,
      title: "Data Structures & Algorithms",
      description: "Practice coding challenges and algorithmic thinking",
      difficulty: "Advanced",
      duration: "60-90 minutes",
      questions: 10,
      skills: ["Algorithms", "Data Structures", "Problem Solving", "Optimization"],
      category: "Technical",
      rating: 4.6,
      attempts: 1560,
      thumbnail: "/placeholder.svg?height=120&width=200"
    }
  ]

  const completedSimulations = [
    {
      id: 1,
      title: "Frontend Developer Interview",
      completedDate: "2024-04-10",
      score: 87,
      timeSpent: "52 minutes",
      feedback: "Strong React knowledge, could improve on CSS optimization",
      skills: ["React", "JavaScript", "CSS", "Problem Solving"]
    },
    {
      id: 3,
      title: "Behavioral Interview Practice",
      completedDate: "2024-03-28",
      score: 92,
      timeSpent: "38 minutes",
      feedback: "Excellent communication skills and examples provided",
      skills: ["Communication", "Leadership", "Problem Solving", "Teamwork"]
    }
  ]

  const startSimulation = (simulation: any) => {
    setSelectedSimulation(simulation)
    setIsSimulationActive(true)
    setCurrentQuestion(0)
    setAnswers({})
    setSimulationComplete(false)
  }

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }))
  }

  const completeSimulation = () => {
    setIsSimulationActive(false)
    setSimulationComplete(true)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "beginner":
        return "var(--success)"
      case "intermediate":
        return "var(--accent)"
      case "advanced":
        return "var(--primary)"
      default:
        return "var(--muted-foreground)"
    }
  }

  if (isSimulationActive && selectedSimulation) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
          <SidebarNavigation />
          
          {/* Main Content */}
          <div className="lg:ml-64 lg:pt-16">
            <div className="p-6 lg:p-8">
              <div className="max-w-4xl mx-auto">
                {/* Simulation Header */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h1 className="text-h2" style={{ color: 'var(--foreground)' }}>
                        {selectedSimulation.title}
                      </h1>
                      <p className="text-body" style={{ color: 'var(--muted-foreground)' }}>
                        Question {currentQuestion + 1} of {selectedSimulation.questions}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Badge style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-foreground)' }}>
                        <Clock className="w-4 h-4 mr-1" />
                        {selectedSimulation.duration}
                      </Badge>
                      <Button 
                        variant="outline" 
                        onClick={completeSimulation}
                        className="skillsync-btn-secondary"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Exit Simulation
                      </Button>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <Progress value={((currentQuestion + 1) / selectedSimulation.questions) * 100} className="h-2" />
                </div>

                {/* Question Content */}
                <Card className="skillsync-card skillsync-fade-in">
                  <CardContent className="p-8">
                    <div className="text-center mb-8">
                      <h2 className="text-h3 mb-4" style={{ color: 'var(--foreground)' }}>
                        Sample Question {currentQuestion + 1}
                      </h2>
                      <p className="text-body" style={{ color: 'var(--muted-foreground)' }}>
                        This is a demonstration question. In a real simulation, you would see actual interview questions.
                      </p>
                    </div>

                    {/* Sample Question */}
                    <div className="space-y-6">
                      <div className="p-6 rounded-lg" style={{ backgroundColor: 'var(--muted)' }}>
                        <h3 className="text-h3 mb-3" style={{ color: 'var(--foreground)' }}>
                          Explain the difference between React's useState and useEffect hooks.
                        </h3>
                        <p className="text-body" style={{ color: 'var(--muted-foreground)' }}>
                          Provide a clear explanation with examples of when you would use each hook.
                        </p>
                      </div>

                      {/* Answer Options */}
                      <div className="space-y-3">
                        <h4 className="text-h3" style={{ color: 'var(--foreground)' }}>Your Answer:</h4>
                        <textarea
                          className="w-full p-4 rounded-lg border min-h-[120px] skillsync-input"
                          placeholder="Type your answer here..."
                          value={answers[`question_${currentQuestion}`] || ""}
                          onChange={(e) => handleAnswer(`question_${currentQuestion}`, e.target.value)}
                        />
                      </div>

                      {/* Navigation */}
                      <div className="flex justify-between pt-6">
                        <Button
                          variant="outline"
                          onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                          disabled={currentQuestion === 0}
                          className="skillsync-btn-secondary"
                        >
                          <ChevronRight className="w-4 h-4 mr-2 rotate-180" />
                          Previous
                        </Button>
                        
                        {currentQuestion < selectedSimulation.questions - 1 ? (
                          <Button
                            onClick={() => setCurrentQuestion(currentQuestion + 1)}
                            className="skillsync-btn-primary"
                          >
                            Next
                            <ChevronRight className="w-4 h-4 ml-2" />
                          </Button>
                        ) : (
                          <Button
                            onClick={completeSimulation}
                            className="skillsync-btn-primary"
                          >
                            <Check className="w-4 h-4 mr-2" />
                            Complete Simulation
                          </Button>
                        )}
                      </div>
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

  if (simulationComplete) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
          <SidebarNavigation />
          
          {/* Main Content */}
          <div className="lg:ml-64 lg:pt-16">
            <div className="p-6 lg:p-8">
              <div className="max-w-4xl mx-auto">
                {/* Success Header */}
                <div className="text-center mb-8 skillsync-fade-in">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'var(--success)' }}>
                    <Check className="w-10 h-10 text-white" />
                  </div>
                  <h1 className="text-h1 mb-4" style={{ color: 'var(--foreground)' }}>Simulation Complete!</h1>
                  <p className="text-body max-w-2xl mx-auto" style={{ color: 'var(--muted-foreground)' }}>
                    Great job completing the {selectedSimulation?.title}! Review your performance and continue practicing.
                  </p>
                </div>

                {/* Results Summary */}
                <div className="grid lg:grid-cols-2 gap-8 mb-8">
                  <Card className="skillsync-card skillsync-fade-in skillsync-stagger-1">
                    <CardHeader>
                      <CardTitle className="text-h3" style={{ color: 'var(--foreground)' }}>Performance Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 rounded-lg" style={{ backgroundColor: 'var(--muted)' }}>
                          <div className="text-2xl font-bold" style={{ color: 'var(--primary)' }}>15</div>
                          <div className="text-body-sm" style={{ color: 'var(--muted-foreground)' }}>Questions</div>
                        </div>
                        <div className="text-center p-3 rounded-lg" style={{ backgroundColor: 'var(--muted)' }}>
                          <div className="text-2xl font-bold" style={{ color: 'var(--success)' }}>52 min</div>
                          <div className="text-body-sm" style={{ color: 'var(--muted-foreground)' }}>Time Spent</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="skillsync-card skillsync-fade-in skillsync-stagger-2">
                    <CardHeader>
                      <CardTitle className="text-h3" style={{ color: 'var(--foreground)' }}>Next Steps</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--muted)' }}>
                          <h4 className="font-medium text-body-sm mb-1" style={{ color: 'var(--foreground)' }}>Review Answers</h4>
                          <p className="text-small" style={{ color: 'var(--muted-foreground)' }}>Go through your responses and identify areas for improvement</p>
                        </div>
                        <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--muted)' }}>
                          <h4 className="font-medium text-body-sm mb-1" style={{ color: 'var(--foreground)' }}>Practice More</h4>
                          <p className="text-small" style={{ color: 'var(--muted-foreground)' }}>Try other simulations to strengthen different skills</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Action Buttons */}
                <div className="text-center space-y-4">
                  <div className="flex justify-center space-x-4">
                    <Button 
                      onClick={() => {
                        setSimulationComplete(false)
                        setIsSimulationActive(false)
                        setSelectedSimulation(null)
                      }}
                      className="skillsync-btn-primary"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Try Another Simulation
                    </Button>
                    <Link href="/dashboard">
                      <Button variant="outline" className="skillsync-btn-secondary">
                        Back to Dashboard
                      </Button>
                    </Link>
                  </div>
                </div>
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
            <div className="max-w-6xl mx-auto">
              {/* Header */}
              <div className="mb-8 skillsync-fade-in">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h1 className="text-h1 mb-2" style={{ color: 'var(--foreground)' }}>Job Simulations</h1>
                    <p className="text-body" style={{ color: 'var(--muted-foreground)' }}>
                      Practice real-world scenarios and interview questions to prepare for your next career move.
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge className="px-3 py-1" style={{ backgroundColor: 'var(--success)', color: 'var(--success-foreground)' }}>
                      <CheckCircle className="w-4 h-4 mr-1" />
                      {completedSimulations.length} Completed
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Main Content Tabs */}
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-6" style={{ backgroundColor: 'var(--muted)' }}>
                      <TabsTrigger value="available" className="skillsync-nav-link">Available Simulations</TabsTrigger>
                      <TabsTrigger value="completed" className="skillsync-nav-link">Completed</TabsTrigger>
                    </TabsList>

                    <TabsContent value="available" className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        {availableSimulations.map((simulation, index) => (
                          <Card key={simulation.id} className="skillsync-card skillsync-fade-in skillsync-stagger-{index + 1} hover:shadow-lg transition-all duration-300">
                            <CardHeader>
                              <div className="flex items-center justify-between mb-3">
                                <Badge 
                                  style={{ 
                                    backgroundColor: getDifficultyColor(simulation.difficulty), 
                                    color: 'var(--white)' 
                                  }}
                                >
                                  {simulation.difficulty}
                                </Badge>
                                <div className="flex items-center space-x-1">
                                  <Star className="w-4 h-4" style={{ color: 'var(--accent)' }} />
                                  <span className="text-body-sm" style={{ color: 'var(--foreground)' }}>
                                    {simulation.rating}
                                  </span>
                                </div>
                              </div>
                              <CardTitle className="text-h3" style={{ color: 'var(--foreground)' }}>
                                {simulation.title}
                              </CardTitle>
                              <CardDescription style={{ color: 'var(--muted-foreground)' }}>
                                {simulation.description}
                              </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <div className="flex items-center justify-between text-body-sm" style={{ color: 'var(--muted-foreground)' }}>
                                <span>Duration: {simulation.duration}</span>
                                <span>{simulation.questions} questions</span>
                              </div>
                              
                              <div className="flex flex-wrap gap-2">
                                {simulation.skills.map((skill, skillIndex) => (
                                  <Badge key={skillIndex} variant="outline" className="text-xs" 
                                         style={{ borderColor: 'var(--border)', color: 'var(--muted-foreground)' }}>
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                              
                              <div className="flex items-center justify-between">
                                <span className="text-small" style={{ color: 'var(--muted-foreground)' }}>
                                  {simulation.attempts} attempts
                                </span>
                                <Button 
                                  onClick={() => startSimulation(simulation)}
                                  className="skillsync-btn-primary"
                                >
                                  <Play className="w-4 h-4 mr-2" />
                                  Start Simulation
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="completed" className="space-y-6">
                      <Card className="skillsync-card skillsync-fade-in">
                        <CardHeader>
                          <CardTitle className="text-h3" style={{ color: 'var(--foreground)' }}>Your Completed Simulations</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {completedSimulations.map((simulation, index) => (
                              <div key={simulation.id} className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200" style={{ backgroundColor: 'var(--muted)' }}>
                                <div className="flex-1">
                                  <h4 className="font-medium text-body-sm mb-1" style={{ color: 'var(--foreground)' }}>
                                    {simulation.title}
                                  </h4>
                                  <div className="flex items-center space-x-4 text-small" style={{ color: 'var(--muted-foreground)' }}>
                                    <span>Completed: {new Date(simulation.completedDate).toLocaleDateString()}</span>
                                    <span>Score: {simulation.score}%</span>
                                    <span>Time: {simulation.timeSpent}</span>
                                  </div>
                                  <p className="text-small mt-2" style={{ color: 'var(--muted-foreground)' }}>
                                    {simulation.feedback}
                                  </p>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    className="skillsync-btn-secondary"
                                  >
                                    <BarChart3 className="w-4 h-4 mr-2" />
                                    View Details
                                  </Button>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    className="skillsync-btn-secondary"
                                  >
                                    <Play className="w-4 h-4 mr-2" />
                                    Retake
                                  </Button>
                                </div>
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
                  {/* Quick Stats */}
                  <Card className="skillsync-card skillsync-fade-in skillsync-stagger-4">
                    <CardHeader>
                      <CardTitle className="text-h3" style={{ color: 'var(--foreground)' }}>Your Stats</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-body-sm" style={{ color: 'var(--muted-foreground)' }}>Simulations completed</span>
                        <span className="text-body-sm font-medium" style={{ color: 'var(--foreground)' }}>{completedSimulations.length}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-body-sm" style={{ color: 'var(--muted-foreground)' }}>Average score</span>
                        <span className="text-body-sm font-medium" style={{ color: 'var(--foreground)' }}>
                          {completedSimulations.length > 0 
                            ? Math.round(completedSimulations.reduce((acc, sim) => acc + sim.score, 0) / completedSimulations.length)
                            : 0}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-body-sm" style={{ color: 'var(--muted-foreground)' }}>Total time</span>
                        <span className="text-body-sm font-medium" style={{ color: 'var(--foreground)' }}>
                          {completedSimulations.length > 0 
                            ? completedSimulations.reduce((acc, sim) => acc + parseInt(sim.timeSpent), 0)
                            : 0} min
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Tips */}
                  <Card className="skillsync-card skillsync-fade-in skillsync-stagger-4">
                    <CardHeader>
                      <CardTitle className="text-h3" style={{ color: 'var(--foreground)' }}>Simulation Tips</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--muted)' }}>
                        <h4 className="font-medium text-body-sm mb-1" style={{ color: 'var(--foreground)' }}>Take Your Time</h4>
                        <p className="text-small" style={{ color: 'var(--muted-foreground)' }}>
                          Read questions carefully and think through your answers
                        </p>
                      </div>
                      <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--muted)' }}>
                        <h4 className="font-medium text-body-sm mb-1" style={{ color: 'var(--foreground)' }}>Practice Regularly</h4>
                        <p className="text-small" style={{ color: 'var(--muted-foreground)' }}>
                          Consistent practice improves your confidence and skills
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Quick Actions */}
                  <div className="space-y-3">
                    <Link href="/assessment">
                      <Button className="w-full skillsync-btn-primary">
                        <ClipboardCheck className="w-4 h-4 mr-2" />
                        Take Assessment
                      </Button>
                    </Link>
                    <Link href="/roadmap">
                      <Button variant="outline" className="w-full skillsync-btn-secondary">
                        <Map className="w-4 h-4 mr-2" />
                        View Roadmap
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
