"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Play,
  CheckCircle,
  Clock,
  BarChart3,
  Code,
  TrendingUp,
  Users,
  Lightbulb,
  Target,
  Award,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"
import AIChatWidget from "@/components/ai-chat-widget"

interface SimulationTask {
  id: string
  title: string
  role: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  duration: string
  description: string
  scenario: string
  deliverables: string[]
  resources?: Array<{
    title: string
    content: string
    type: "data" | "document" | "image"
  }>
}

interface SimulationResult {
  score: number
  feedback: string
  strengths: string[]
  improvements: string[]
  nextSteps: string[]
}

export default function SimulationPage() {
  const [selectedTask, setSelectedTask] = useState<SimulationTask | null>(null)
  const [currentStep, setCurrentStep] = useState<"selection" | "task" | "results">("selection")
  const [submissions, setSubmissions] = useState<Record<string, string>>({})
  const [results, setResults] = useState<SimulationResult | null>(null)

  const simulationTasks: SimulationTask[] = [
    {
      id: "data-analyst-1",
      title: "Sales Performance Analysis",
      role: "Data Analyst",
      difficulty: "Intermediate",
      duration: "45 minutes",
      description: "Analyze quarterly sales data and identify key trends and opportunities",
      scenario:
        "You're a data analyst at TechCorp, a growing SaaS company. The sales team has provided you with Q3 sales data and wants insights to improve Q4 performance. Your manager needs a clear analysis with actionable recommendations.",
      deliverables: [
        "3 key insights from the sales data",
        "2 recommendations for improving Q4 performance",
        "1 data visualization concept (describe what chart you'd create)",
      ],
      resources: [
        {
          title: "Q3 Sales Data Summary",
          type: "data",
          content: `Monthly Sales Data:
July: $125,000 (150 deals, avg deal size: $833)
August: $98,000 (140 deals, avg deal size: $700)
September: $156,000 (180 deals, avg deal size: $867)

Product Breakdown (Q3 Total):
- Basic Plan: $189,000 (60% of revenue, 420 customers)
- Pro Plan: $152,000 (35% of revenue, 38 customers)
- Enterprise: $38,000 (5% of revenue, 2 customers)

Sales Team Performance:
- Team A (East Coast): $190,000
- Team B (West Coast): $189,000
- Team C (International): $0 (new team, started in September)`,
        },
      ],
    },
    {
      id: "frontend-dev-1",
      title: "Component Architecture Challenge",
      role: "Frontend Developer",
      difficulty: "Intermediate",
      duration: "60 minutes",
      description: "Design and plan a reusable component system for an e-commerce platform",
      scenario:
        "You're joining the frontend team at ShopFast, an e-commerce startup. They need to rebuild their product catalog with reusable components. The current system is inconsistent and hard to maintain.",
      deliverables: [
        "Component hierarchy and structure plan",
        "Props interface design for main components",
        "State management approach explanation",
      ],
      resources: [
        {
          title: "Current UI Requirements",
          type: "document",
          content: `Required Components:
- ProductCard: Shows image, title, price, rating, add to cart
- ProductGrid: Displays multiple ProductCards with filtering
- ProductDetail: Full product view with gallery, description, reviews
- CartItem: Product in shopping cart with quantity controls

Current Issues:
- Inconsistent styling across product displays
- Duplicate code for price formatting
- No shared state for cart management
- Mobile responsiveness problems`,
        },
      ],
    },
    {
      id: "product-manager-1",
      title: "Feature Prioritization Matrix",
      role: "Product Manager",
      difficulty: "Advanced",
      duration: "50 minutes",
      description: "Prioritize feature requests and create a product roadmap for a mobile app",
      scenario:
        "You're the PM for FitTracker, a fitness app with 50K users. You have limited engineering resources and multiple stakeholder requests. The CEO wants a clear roadmap for the next quarter.",
      deliverables: [
        "Prioritized feature list with reasoning",
        "Resource allocation recommendation",
        "Risk assessment for top 3 features",
      ],
      resources: [
        {
          title: "Feature Requests & Data",
          type: "document",
          content: `Pending Features:
1. Social sharing (Marketing wants this, 2 weeks dev time)
2. Apple Watch integration (500+ user requests, 6 weeks dev time)
3. Nutrition tracking (CEO priority, 4 weeks dev time)
4. Premium subscription tier (Revenue team priority, 3 weeks dev time)
5. Dark mode (300+ user requests, 1 week dev time)
6. Workout video library (Competitor analysis shows need, 8 weeks dev time)

Current Metrics:
- Daily Active Users: 12K
- Monthly churn rate: 15%
- Average session time: 8 minutes
- Top user complaint: "Need better workout guidance"
- Revenue: $25K/month from ads

Team: 2 frontend devs, 1 backend dev, 1 designer`,
        },
      ],
    },
    {
      id: "ux-designer-1",
      title: "User Flow Optimization",
      role: "UX Designer",
      difficulty: "Intermediate",
      duration: "55 minutes",
      description: "Redesign the onboarding flow for a productivity app to improve user retention",
      scenario:
        "WorkFlow, a task management app, has a 40% drop-off rate during onboarding. Users find the setup process confusing and abandon before completing their profile. You need to redesign the flow.",
      deliverables: [
        "Improved onboarding flow outline",
        "Key friction points identified",
        "Success metrics to track improvement",
      ],
      resources: [
        {
          title: "Current Onboarding Issues",
          type: "document",
          content: `Current Flow (5 steps):
1. Email signup
2. Choose workspace name
3. Invite team members (optional)
4. Select project templates (12 options)
5. Create first project

User Feedback:
- "Too many choices upfront"
- "Don't know what templates to pick"
- "Unclear what happens after setup"
- "Takes too long to see value"

Analytics:
- Step 1 completion: 100%
- Step 2 completion: 85%
- Step 3 completion: 70%
- Step 4 completion: 45%
- Step 5 completion: 35%

Successful users typically create their first task within 10 minutes of signup.`,
        },
      ],
    },
  ]

  const handleTaskStart = (task: SimulationTask) => {
    setSelectedTask(task)
    setCurrentStep("task")
    setSubmissions({})
    setResults(null)
  }

  const handleSubmission = async () => {
    if (!selectedTask) return

    // Simulate evaluation time
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock evaluation results
    const mockResults: SimulationResult = {
      score: Math.floor(Math.random() * 30) + 70, // 70-100 range
      feedback:
        selectedTask.role === "Data Analyst"
          ? "Strong analytical thinking demonstrated. Your insights about the seasonal trends and team performance were particularly valuable. Consider diving deeper into customer segmentation for even more actionable recommendations."
          : selectedTask.role === "Frontend Developer"
            ? "Excellent component architecture planning. Your approach to state management shows good understanding of React patterns. The props interface design is clean and extensible."
            : selectedTask.role === "Product Manager"
              ? "Great prioritization framework applied. You balanced user needs with business objectives effectively. Your risk assessment shows strategic thinking."
              : "Solid UX thinking with user-centered approach. Your identification of friction points was thorough. Consider adding more specific usability testing recommendations.",
      strengths:
        selectedTask.role === "Data Analyst"
          ? ["Data interpretation", "Trend identification", "Business context awareness"]
          : selectedTask.role === "Frontend Developer"
            ? ["Component design", "State management", "Scalability planning"]
            : selectedTask.role === "Product Manager"
              ? ["Strategic thinking", "Stakeholder balance", "Resource planning"]
              : ["User empathy", "Problem identification", "Flow optimization"],
      improvements:
        selectedTask.role === "Data Analyst"
          ? ["Statistical significance testing", "Deeper customer segmentation"]
          : selectedTask.role === "Frontend Developer"
            ? ["Performance optimization considerations", "Accessibility planning"]
            : selectedTask.role === "Product Manager"
              ? ["Competitive analysis depth", "Success metrics definition"]
              : ["Quantitative validation methods", "A/B testing strategy"],
      nextSteps: [
        "Practice similar scenarios to build confidence",
        "Study industry best practices in this area",
        "Consider taking a specialized course to fill knowledge gaps",
      ],
    }

    setResults(mockResults)
    setCurrentStep("results")
  }

  const updateSubmission = (key: string, value: string) => {
    setSubmissions((prev) => ({ ...prev, [key]: value }))
  }

  if (currentStep === "results" && results && selectedTask) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-violet-50">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="mb-8">
            <Button variant="ghost" onClick={() => setCurrentStep("selection")} className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Simulations
            </Button>
            <div className="text-center">
              <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-serif font-bold mb-2">Simulation Complete!</h1>
              <p className="text-gray-600">
                {selectedTask.title} - {selectedTask.role}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              {/* Score */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="w-5 h-5 text-blue-600" />
                    <span>Your Performance</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold gradient-text mb-2">{results.score}/100</div>
                    <Badge
                      variant={results.score >= 80 ? "default" : results.score >= 60 ? "secondary" : "destructive"}
                    >
                      {results.score >= 80 ? "Excellent" : results.score >= 60 ? "Good" : "Needs Improvement"}
                    </Badge>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{results.feedback}</p>
                </CardContent>
              </Card>

              {/* Strengths & Improvements */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-green-600">
                      <CheckCircle className="w-5 h-5" />
                      <span>Strengths</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {results.strengths.map((strength, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm">{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-orange-600">
                      <AlertCircle className="w-5 h-5" />
                      <span>Areas to Improve</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {results.improvements.map((improvement, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                          <span className="text-sm">{improvement}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Next Steps Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Lightbulb className="w-5 h-5 text-yellow-600" />
                    <span>Next Steps</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {results.nextSteps.map((step, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-medium text-blue-600">{index + 1}</span>
                      </div>
                      <p className="text-sm text-gray-600">{step}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <div className="space-y-3">
                <Button className="w-full gradient-bg">
                  <Play className="w-4 h-4 mr-2" />
                  Try Another Simulation
                </Button>
                <Link href="/roadmap">
                  <Button variant="outline" className="w-full bg-transparent">
                    View Learning Roadmap
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <AIChatWidget />
      </div>
    )
  }

  if (currentStep === "task" && selectedTask) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-violet-50">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="mb-8">
            <Button variant="ghost" onClick={() => setCurrentStep("selection")} className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Simulations
            </Button>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-serif font-bold mb-2">{selectedTask.title}</h1>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <Badge variant="outline">{selectedTask.role}</Badge>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{selectedTask.duration}</span>
                  </div>
                  <Badge variant="secondary">{selectedTask.difficulty}</Badge>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Scenario */}
              <Card>
                <CardHeader>
                  <CardTitle>Scenario</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">{selectedTask.scenario}</p>
                </CardContent>
              </Card>

              {/* Resources */}
              {selectedTask.resources && (
                <Card>
                  <CardHeader>
                    <CardTitle>Resources</CardTitle>
                    <CardDescription>Use this information to complete your task</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="0">
                      <TabsList>
                        {selectedTask.resources.map((resource, index) => (
                          <TabsTrigger key={index} value={index.toString()}>
                            {resource.title}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                      {selectedTask.resources.map((resource, index) => (
                        <TabsContent key={index} value={index.toString()}>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <pre className="text-sm whitespace-pre-wrap font-mono">{resource.content}</pre>
                          </div>
                        </TabsContent>
                      ))}
                    </Tabs>
                  </CardContent>
                </Card>
              )}

              {/* Deliverables */}
              <Card>
                <CardHeader>
                  <CardTitle>Your Deliverables</CardTitle>
                  <CardDescription>Complete each section below</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {selectedTask.deliverables.map((deliverable, index) => (
                    <div key={index} className="space-y-2">
                      <Label className="text-base font-medium">
                        {index + 1}. {deliverable}
                      </Label>
                      <Textarea
                        placeholder={`Enter your response for: ${deliverable}`}
                        value={submissions[`deliverable-${index}`] || ""}
                        onChange={(e) => updateSubmission(`deliverable-${index}`, e.target.value)}
                        className="min-h-[120px]"
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle className="text-lg">Task Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">What you'll deliver:</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      {selectedTask.deliverables.map((deliverable, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>{deliverable}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t">
                    <Button
                      onClick={handleSubmission}
                      disabled={selectedTask.deliverables.some(
                        (_, index) => !submissions[`deliverable-${index}`]?.trim(),
                      )}
                      className="w-full gradient-bg"
                    >
                      Submit for Evaluation
                    </Button>
                    <p className="text-xs text-gray-500 text-center mt-2">Complete all sections to submit</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Tips for Success</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Be specific and actionable in your recommendations</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Use data from the resources to support your points</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Think from the business perspective</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Consider implementation feasibility</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        <AIChatWidget />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-violet-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <Link href="/roadmap" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Roadmap
          </Link>
          <div className="text-center">
            <h1 className="text-4xl font-serif font-bold mb-4">Job Simulations</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Practice real-world scenarios and get instant feedback to build confidence before applying to actual
              positions
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
          {simulationTasks.map((task) => (
            <Card key={task.id} className="card-hover border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {task.role === "Data Analyst" && <BarChart3 className="w-5 h-5 text-blue-600" />}
                    {task.role === "Frontend Developer" && <Code className="w-5 h-5 text-violet-600" />}
                    {task.role === "Product Manager" && <TrendingUp className="w-5 h-5 text-green-600" />}
                    {task.role === "UX Designer" && <Users className="w-5 h-5 text-pink-600" />}
                    <Badge variant="outline" className="text-xs">
                      {task.role}
                    </Badge>
                  </div>
                  <Badge
                    variant={
                      task.difficulty === "Beginner"
                        ? "secondary"
                        : task.difficulty === "Intermediate"
                          ? "default"
                          : "destructive"
                    }
                    className="text-xs"
                  >
                    {task.difficulty}
                  </Badge>
                </div>
                <CardTitle className="text-xl">{task.title}</CardTitle>
                <CardDescription className="text-sm leading-relaxed">{task.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{task.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Target className="w-4 h-4" />
                      <span>{task.deliverables.length} deliverables</span>
                    </div>
                  </div>

                  <Button onClick={() => handleTaskStart(task)} className="w-full gradient-bg">
                    <Play className="w-4 h-4 mr-2" />
                    Start Simulation
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Coming Soon */}
        <Card className="mt-8 border-dashed border-2 border-gray-300">
          <CardContent className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-serif font-bold mb-2">More Simulations Coming Soon</h3>
            <p className="text-gray-600 mb-4">
              We're adding new job simulations for Marketing, Sales, DevOps, and more career paths.
            </p>
            <Badge variant="secondary">Coming in Q1 2025</Badge>
          </CardContent>
        </Card>
      </div>
      <AIChatWidget />
    </div>
  )
}
