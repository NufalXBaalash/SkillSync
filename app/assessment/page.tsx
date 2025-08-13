"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Upload,
  FileText,
  Github,
  Linkedin,
  Plus,
  X,
  Brain,
  TrendingUp,
  Target,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Home,
  ClipboardCheck,
} from "lucide-react"
import Link from "next/link"
import AIChatWidget from "@/components/ai-chat-widget"
import SharedNavigation from "@/components/shared-navigation"

interface SkillAssessment {
  detectedSkills: Array<{ name: string; level: number; category: string }>
  skillGaps: Array<{ skill: string; importance: string; recommendation: string }>
  careerMatch: Array<{ role: string; match: number; description: string }>
}

export default function AssessmentPage() {
  const [currentStep, setCurrentStep] = useState<"input" | "analyzing" | "results">("input")
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [socialLinks, setSocialLinks] = useState({ github: "", linkedin: "" })
  const [manualSkills, setManualSkills] = useState<string[]>([])
  const [newSkill, setNewSkill] = useState("")
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [assessment, setAssessment] = useState<SkillAssessment | null>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setUploadedFiles((prev) => [...prev, ...files])
  }

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const addManualSkill = () => {
    if (newSkill.trim() && !manualSkills.includes(newSkill.trim())) {
      setManualSkills((prev) => [...prev, newSkill.trim()])
      setNewSkill("")
    }
  }

  const removeManualSkill = (skill: string) => {
    setManualSkills((prev) => prev.filter((s) => s !== skill))
  }

  const startAnalysis = async () => {
    setCurrentStep("analyzing")
    setAnalysisProgress(0)

    // Simulate analysis progress
    const progressSteps = [
      { progress: 20, message: "Parsing uploaded documents..." },
      { progress: 40, message: "Analyzing GitHub repositories..." },
      { progress: 60, message: "Processing LinkedIn profile..." },
      { progress: 80, message: "Identifying skill gaps..." },
      { progress: 100, message: "Generating career recommendations..." },
    ]

    for (const step of progressSteps) {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setAnalysisProgress(step.progress)
    }

    // Mock assessment results
    const mockAssessment: SkillAssessment = {
      detectedSkills: [
        { name: "JavaScript", level: 85, category: "Programming" },
        { name: "React", level: 78, category: "Frontend" },
        { name: "Node.js", level: 65, category: "Backend" },
        { name: "Python", level: 72, category: "Programming" },
        { name: "SQL", level: 60, category: "Database" },
        { name: "Git", level: 80, category: "Tools" },
        { name: "HTML/CSS", level: 90, category: "Frontend" },
        { name: "TypeScript", level: 55, category: "Programming" },
      ],
      skillGaps: [
        {
          skill: "System Design",
          importance: "High",
          recommendation: "Essential for senior developer roles. Consider taking a system design course.",
        },
        {
          skill: "Docker/Kubernetes",
          importance: "Medium",
          recommendation: "Important for DevOps and deployment. Start with Docker basics.",
        },
        {
          skill: "Testing (Jest/Cypress)",
          importance: "High",
          recommendation: "Critical for code quality. Practice writing unit and integration tests.",
        },
      ],
      careerMatch: [
        {
          role: "Frontend Developer",
          match: 92,
          description: "Strong match with your React and JavaScript skills",
        },
        {
          role: "Full Stack Developer",
          match: 78,
          description: "Good foundation, but need stronger backend skills",
        },
        {
          role: "Software Engineer",
          match: 85,
          description: "Solid programming fundamentals with room to specialize",
        },
      ],
    }

    setAssessment(mockAssessment)
    setCurrentStep("results")
  }

  if (currentStep === "analyzing") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-violet-50">
        <SharedNavigation />
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
          <Card className="w-full max-w-md shadow-xl border-0">
            <CardHeader className="text-center">
              <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Brain className="w-8 h-8 text-white animate-pulse" />
              </div>
              <CardTitle className="text-xl">AI Analysis in Progress</CardTitle>
              <CardDescription>Our AI is analyzing your skills and experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Progress value={analysisProgress} className="h-2" />
              <p className="text-center text-sm text-gray-600">{analysisProgress}% Complete</p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (currentStep === "results" && assessment) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-violet-50">
        <SharedNavigation />
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent mb-4">
              Your Skill Assessment Results
            </h1>
            <p className="text-xl text-gray-600">AI-powered analysis of your skills and career potential</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Detected Skills */}
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="w-5 h-5 text-blue-600" />
                    <span>Detected Skills</span>
                  </CardTitle>
                  <CardDescription>Skills identified from your documents and profiles</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {assessment.detectedSkills.map((skill, index) => (
                      <div key={index} className="space-y-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{skill.name}</span>
                          <Badge variant="outline" className="text-xs">
                            {skill.category}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Progress value={skill.level} className="flex-1 h-2" />
                          <span className="text-sm text-gray-600 w-12">{skill.level}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Skill Gaps */}
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertCircle className="w-5 h-5 text-orange-600" />
                    <span>Skill Gaps & Recommendations</span>
                  </CardTitle>
                  <CardDescription>Areas to focus on for career advancement</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {assessment.skillGaps.map((gap, index) => (
                    <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-all duration-200">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{gap.skill}</h4>
                        <Badge variant={gap.importance === "High" ? "destructive" : "secondary"}>
                          {gap.importance} Priority
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{gap.recommendation}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Career Matches Sidebar */}
            <div className="space-y-6">
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    <span>Career Matches</span>
                  </CardTitle>
                  <CardDescription>Roles that align with your skills</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {assessment.careerMatch.map((match, index) => (
                    <div key={index} className="space-y-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">{match.role}</h4>
                        <Badge variant={match.match >= 80 ? "default" : "secondary"}>{match.match}%</Badge>
                      </div>
                      <p className="text-sm text-gray-600">{match.description}</p>
                      <Progress value={match.match} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Link href="/roadmap">
                  <Button className="w-full gradient-bg hover:shadow-lg transition-all duration-300">
                    Get My Career Roadmap
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link href="/simulation">
                  <Button variant="outline" className="w-full bg-transparent hover:bg-blue-50 hover:border-blue-300 transition-all duration-200">
                    Try Job Simulation
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-violet-50">
      <SharedNavigation />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent mb-4">
            Skill Assessment
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Upload your documents or enter your information to get a personalized AI analysis of your skills and career
            potential
          </p>
        </div>

        <Tabs defaultValue="upload" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upload">Upload Documents</TabsTrigger>
            <TabsTrigger value="social">Social Profiles</TabsTrigger>
            <TabsTrigger value="manual">Manual Entry</TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-6">
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Upload className="w-5 h-5" />
                  <span>Upload Your Documents</span>
                </CardTitle>
                <CardDescription>Upload your resume, portfolio, or any relevant documents</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors duration-200">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium mb-2">Drop files here or click to browse</p>
                  <p className="text-sm text-gray-500 mb-4">Supports PDF, DOC, DOCX files up to 10MB</p>
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload">
                    <Button variant="outline" className="cursor-pointer bg-transparent hover:bg-blue-50 hover:border-blue-300 transition-all duration-200">
                      Choose Files
                    </Button>
                  </label>
                </div>

                {uploadedFiles.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium">Uploaded Files:</h4>
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                        <div className="flex items-center space-x-2">
                          <FileText className="w-4 h-4 text-blue-600" />
                          <span className="text-sm">{file.name}</span>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => removeFile(index)} className="hover:bg-red-50 hover:text-red-600">
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="social" className="space-y-6">
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Github className="w-5 h-5" />
                  <span>Connect Your Profiles</span>
                </CardTitle>
                <CardDescription>Link your GitHub and LinkedIn profiles for comprehensive analysis</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="github">GitHub Profile URL</Label>
                  <div className="flex items-center space-x-2">
                    <Github className="w-5 h-5 text-gray-400" />
                    <Input
                      id="github"
                      placeholder="https://github.com/yourusername"
                      value={socialLinks.github}
                      onChange={(e) => setSocialLinks((prev) => ({ ...prev, github: e.target.value }))}
                      className="hover:border-blue-300 focus:border-blue-500 transition-colors duration-200"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn Profile URL</Label>
                  <div className="flex items-center space-x-2">
                    <Linkedin className="w-5 h-5 text-gray-400" />
                    <Input
                      id="linkedin"
                      placeholder="https://linkedin.com/in/yourprofile"
                      value={socialLinks.linkedin}
                      onChange={(e) => setSocialLinks((prev) => ({ ...prev, linkedin: e.target.value }))}
                      className="hover:border-blue-300 focus:border-blue-500 transition-colors duration-200"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="manual" className="space-y-6">
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Plus className="w-5 h-5" />
                  <span>Manual Skill Entry</span>
                </CardTitle>
                <CardDescription>Add your skills manually if you prefer not to upload documents</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Enter a skill (e.g., JavaScript, Project Management)"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addManualSkill()}
                    className="hover:border-blue-300 focus:border-blue-500 transition-colors duration-200"
                  />
                  <Button onClick={addManualSkill} className="hover:shadow-md transition-all duration-200">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                {manualSkills.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium">Your Skills:</h4>
                    <div className="flex flex-wrap gap-2">
                      {manualSkills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center space-x-1 hover:bg-blue-100 transition-colors duration-200">
                          <span>{skill}</span>
                          <button onClick={() => removeManualSkill(skill)} className="ml-1 hover:text-red-500 transition-colors duration-200">
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="experience">Additional Information (Optional)</Label>
                  <Textarea
                    id="experience"
                    placeholder="Tell us about your experience, projects, or career goals..."
                    className="min-h-[100px] hover:border-blue-300 focus:border-blue-500 transition-colors duration-200"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="text-center mt-8">
          <Button
            onClick={startAnalysis}
            disabled={
              uploadedFiles.length === 0 && !socialLinks.github && !socialLinks.linkedin && manualSkills.length === 0
            }
            size="lg"
            className="gradient-bg hover:shadow-lg transition-all duration-300"
          >
            <Brain className="w-5 h-5 mr-2" />
            Start AI Analysis
          </Button>
          <p className="text-sm text-gray-500 mt-2">
            Analysis takes 30-60 seconds. We'll identify your skills and suggest career paths.
          </p>
        </div>
      </div>
      <AIChatWidget />
    </div>
  )
}
