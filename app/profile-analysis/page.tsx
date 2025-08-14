"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Github, 
  Linkedin,
  Star, 
  GitFork, 
  Code, 
  TrendingUp,
  Globe,
  ArrowRight,
  CheckCircle,
  Database,
  Wrench,
  Map,
  Building,
  Users,
  Award,
  Calendar,
  ExternalLink,
  BarChart3,
  Target,
  Lightbulb,
  Zap
} from "lucide-react"
import ProtectedRoute from "@/components/protected-route"
import SidebarNavigation from "@/components/sidebar-navigation"
import { useAuth } from "@/contexts/auth-context"

interface GitHubAnalysis {
  username: string
  totalRepos: number
  totalStars: number
  totalForks: number
  skillScore: number
  skills: {
    languages: { [key: string]: number }
    frameworks: { [key: string]: number }
    databases: { [key: string]: number }
    tools: { [key: string]: number }
  }
  topRepos: Array<{
    name: string
    description: string
    stars: number
    forks: number
    language: string
    url: string
  }>
  recommendations: string[]
}

interface LinkedInAnalysis {
  profileUrl: string
  fullName: string
  headline: string
  location: string
  industry: string
  experience: Array<{
    title: string
    company: string
    duration: string
    description: string
  }>
  skills: string[]
  education: Array<{
    degree: string
    institution: string
    year: string
  }>
  recommendations: string[]
  skillScore: number
}

interface CombinedAnalysis {
  github?: GitHubAnalysis
  linkedin?: LinkedInAnalysis
  overallScore: number
  combinedRecommendations: string[]
}

export default function ProfileAnalysisPage() {
  const { user } = useAuth()
  const [githubUsername, setGithubUsername] = useState("")
  const [linkedinUrl, setLinkedinUrl] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [analysis, setAnalysis] = useState<CombinedAnalysis | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("overview")
  const resultsRef = useRef<HTMLDivElement>(null)

  const handleAnalysis = async () => {
    if (!githubUsername.trim() && !linkedinUrl.trim()) {
      setError("Please enter at least one profile to analyze")
      return
    }

    setIsAnalyzing(true)
    setError(null)
    setAnalysisProgress(0)
    setAnalysis(null)

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setAnalysisProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 300)

      // Simulate API calls for both platforms
      const promises = []
      const platformOrder = []
      
      if (githubUsername.trim()) {
        promises.push(
          fetch('/api/github-analysis', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: githubUsername.trim() })
          })
        )
        platformOrder.push('github')
      }
      
      if (linkedinUrl.trim()) {
        promises.push(
          fetch('/api/linkedin-analysis', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ profileUrl: linkedinUrl.trim() })
          })
        )
        platformOrder.push('linkedin')
      }

      const responses = await Promise.all(promises)
      const results = await Promise.all(responses.map(r => r.json()))
      
      // Process results and create combined analysis
      const combinedAnalysis: CombinedAnalysis = {
        overallScore: 0,
        combinedRecommendations: []
      }

      // Assign results based on platform order
      platformOrder.forEach((platform, index) => {
        if (platform === 'github' && results[index]) {
          combinedAnalysis.github = results[index]
          combinedAnalysis.overallScore += results[index].skillScore
        } else if (platform === 'linkedin' && results[index]) {
          combinedAnalysis.linkedin = results[index]
          combinedAnalysis.overallScore += results[index].skillScore
        }
      })

      // Calculate average score
      const platformCount = (githubUsername.trim() ? 1 : 0) + (linkedinUrl.trim() ? 1 : 0)
      combinedAnalysis.overallScore = Math.round(combinedAnalysis.overallScore / platformCount)

      // Generate combined recommendations
      const allRecommendations = [
        ...(combinedAnalysis.github?.recommendations || []),
        ...(combinedAnalysis.linkedin?.recommendations || [])
      ]
      combinedAnalysis.combinedRecommendations = [...new Set(allRecommendations)].slice(0, 6)

      setAnalysis(combinedAnalysis)
      console.log('Combined analysis completed:', combinedAnalysis)
      
      // Auto-scroll to results
      setTimeout(() => {
        if (resultsRef.current) {
          resultsRef.current.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          })
        }
      }, 500)

      setAnalysisProgress(100)

    } catch (err) {
      setError("An unexpected error occurred during analysis")
      console.error(err)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const getScoreLevel = (score: number) => {
    if (score >= 80) return { level: "Expert", color: "bg-green-500", textColor: "text-green-700" }
    if (score >= 60) return { level: "Advanced", color: "bg-blue-500", textColor: "text-blue-700" }
    if (score >= 40) return { level: "Intermediate", color: "bg-yellow-500", textColor: "text-yellow-700" }
    return { level: "Beginner", color: "bg-gray-500", textColor: "text-gray-700" }
  }

  const resetAnalysis = () => {
    setAnalysis(null)
    setGithubUsername("")
    setLinkedinUrl("")
    setError(null)
    setActiveTab("overview")
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
        <SidebarNavigation />
        
        <div className="ml-64 p-8">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <Map className="w-12 h-12 mr-3" style={{ color: 'var(--primary)' }} />
                <h1 className="text-4xl font-bold" style={{ color: 'var(--foreground)' }}>Profile Analysis</h1>
              </div>
              <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                Analyze your professional profiles from GitHub and LinkedIn to get comprehensive insights into your skills, experience, and career development opportunities
              </p>
            </div>

            {/* Input Form */}
            <Card className="mb-8 skillsync-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5" />
                  <span>Enter Profile Information</span>
                </CardTitle>
                <CardDescription>
                  Provide your GitHub username and/or LinkedIn profile URL for comprehensive analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="github-username" className="flex items-center space-x-2">
                      <Github className="w-4 h-4" />
                      <span>GitHub Username</span>
                    </Label>
                    <Input
                      id="github-username"
                      type="text"
                      placeholder="e.g., octocat"
                      value={githubUsername}
                      onChange={(e) => setGithubUsername(e.target.value)}
                      className="skillsync-input"
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="linkedin-url" className="flex items-center space-x-2">
                      <Linkedin className="w-4 h-4" />
                      <span>LinkedIn Profile URL</span>
                    </Label>
                    <Input
                      id="linkedin-url"
                      type="url"
                      placeholder="https://linkedin.com/in/username"
                      value={linkedinUrl}
                      onChange={(e) => setLinkedinUrl(e.target.value)}
                      className="skillsync-input"
                    />
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <Button 
                    onClick={handleAnalysis} 
                    disabled={isAnalyzing || (!githubUsername.trim() && !linkedinUrl.trim())}
                    className="skillsync-btn-primary text-lg px-8 py-6"
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Analyzing Profiles...
                      </>
                    ) : (
                      <>
                        <Zap className="w-5 h-5 mr-2" />
                        Analyze Profiles
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Error Display */}
            {error && (
              <Card className="mb-6 border-red-200 bg-red-50 skillsync-card">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-3">
                    <div className="text-red-600 mt-1">❌</div>
                    <div>
                      <h3 className="font-semibold text-red-800 mb-2">Analysis Error</h3>
                      <p className="text-red-700">{error}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Loading State */}
            {isAnalyzing && (
              <Card className="max-w-2xl mx-auto mb-8 skillsync-card">
                <CardHeader>
                  <CardTitle className="text-center text-primary">Analyzing Profiles...</CardTitle>
                  <CardDescription className="text-center text-muted-foreground">
                    This may take a few moments depending on profile complexity
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm font-medium">
                      <span className="text-primary">Progress</span>
                      <span className="text-primary">{analysisProgress}%</span>
                    </div>
                    <Progress value={analysisProgress} className="h-3" />
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-3 p-4 bg-primary/10 rounded-lg border border-primary/20">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                      <span className="text-primary font-medium">
                        Analyzing: {githubUsername && `@${githubUsername}`} {githubUsername && linkedinUrl && '&'} {linkedinUrl && 'LinkedIn'}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Results Section */}
            {analysis && (
              <div ref={resultsRef} className="space-y-8">
                {/* Results Header */}
                <div className="text-center mb-8 p-8 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl border border-primary/20">
                  <h2 className="text-3xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>
                    Analysis Complete
                  </h2>
                  <p style={{ color: 'var(--muted-foreground)' }}>Comprehensive insights from your professional profiles</p>
                  <div className="mt-4 flex items-center justify-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>

                {/* Overall Score Card */}
                <Card className="text-center skillsync-card">
                  <CardHeader>
                    <CardTitle className="text-3xl">Overall Professional Score</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-center space-x-6 mb-6">
                      <div className="text-center">
                        <div className="text-6xl font-bold" style={{ color: 'var(--primary)' }}>{analysis.overallScore}</div>
                        <div className="text-lg" style={{ color: 'var(--muted-foreground)' }}>Total Score</div>
                      </div>
                      <div className="text-center">
                        <Badge className={`text-lg px-4 py-2 ${getScoreLevel(analysis.overallScore).color} ${getScoreLevel(analysis.overallScore).textColor}`}>
                          {getScoreLevel(analysis.overallScore).level}
                        </Badge>
                      </div>
                    </div>
                    <Progress value={analysis.overallScore} className="h-4 max-w-md mx-auto" />
                  </CardContent>
                </Card>

                {/* Analysis Tabs */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-3 mb-6">
                    <TabsTrigger value="overview" className="flex items-center space-x-2">
                      <BarChart3 className="w-4 h-4" />
                      <span>Overview</span>
                    </TabsTrigger>
                    <TabsTrigger value="github" className="flex items-center space-x-2" disabled={!analysis.github}>
                      <Github className="w-4 h-4" />
                      <span>GitHub</span>
                    </TabsTrigger>
                    <TabsTrigger value="linkedin" className="flex items-center space-x-2" disabled={!analysis.linkedin}>
                      <Linkedin className="w-4 h-4" />
                      <span>LinkedIn</span>
                    </TabsTrigger>
                  </TabsList>

                  {/* Overview Tab */}
                  <TabsContent value="overview" className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* GitHub Summary */}
                      {analysis.github && (
                        <Card className="skillsync-card">
                          <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                              <Github className="w-5 h-5 text-primary" />
                              <span>GitHub Summary</span>
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="text-center">
                                                           <div className="text-3xl font-bold mb-2" style={{ color: 'var(--primary)' }}>@{analysis.github.username}</div>
                             <div className="text-sm" style={{ color: 'var(--muted-foreground)' }}>GitHub Profile</div>
                            </div>
                            <div className="grid grid-cols-3 gap-4 text-center">
                              <div>
                                <div className="text-xl font-bold text-primary">{analysis.github.totalRepos}</div>
                                <div className="text-xs text-muted-foreground">Repositories</div>
                              </div>
                              <div>
                                <div className="text-xl font-bold text-yellow-600">{analysis.github.totalStars}</div>
                                <div className="text-xs text-muted-foreground">Stars</div>
                              </div>
                              <div>
                                <div className="text-xl font-bold text-green-600">{analysis.github.totalForks}</div>
                                <div className="text-xs text-muted-foreground">Forks</div>
                              </div>
                            </div>
                            <div className="text-center">
                              <Badge className="text-sm px-3 py-1">
                                Score: {analysis.github.skillScore}
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>
                      )}

                      {/* LinkedIn Summary */}
                      {analysis.linkedin && (
                        <Card className="skillsync-card">
                          <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                              <Linkedin className="w-5 h-5 text-secondary" />
                              <span>LinkedIn Summary</span>
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="text-center">
                                                           <div className="text-xl font-bold mb-1" style={{ color: 'var(--foreground)' }}>{analysis.linkedin.fullName}</div>
                             <div className="text-sm" style={{ color: 'var(--muted-foreground)' }}>{analysis.linkedin.headline}</div>
                            </div>
                            <div className="space-y-2 text-sm">
                                                             <div className="flex items-center space-x-2">
                                 <Building className="w-4 h-4" style={{ color: 'var(--muted-foreground)' }} />
                                 <span>{analysis.linkedin.industry}</span>
                               </div>
                               <div className="flex items-center space-x-2">
                                 <Users className="w-4 h-4" style={{ color: 'var(--muted-foreground)' }} />
                                 <span>{analysis.linkedin.experience.length} positions</span>
                               </div>
                               <div className="flex items-center space-x-2">
                                 <Award className="w-4 h-4" style={{ color: 'var(--muted-foreground)' }} />
                                 <span>{analysis.linkedin.skills.length} skills</span>
                               </div>
                            </div>
                            <div className="text-center">
                              <Badge className="text-sm px-3 py-1">
                                Score: {analysis.linkedin.skillScore}
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </div>

                    {/* Combined Recommendations */}
                    <Card className="skillsync-card">
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Lightbulb className="w-5 h-5 text-accent" />
                          <span>Career Development Recommendations</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-2 gap-4">
                          {analysis.combinedRecommendations.map((rec, index) => (
                            <div key={index} className="flex items-start space-x-3 p-3 rounded-lg" style={{ backgroundColor: 'var(--accent)' + '1A' }}>
                              <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--accent)' }} />
                              <p className="text-sm" style={{ color: 'var(--foreground)' }}>{rec}</p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* GitHub Tab */}
                  <TabsContent value="github" className="space-y-6">
                    {analysis.github && (
                      <>
                        {/* GitHub Skills Breakdown */}
                        <div className="grid lg:grid-cols-2 gap-6">
                          <Card className="skillsync-card">
                            <CardHeader>
                              <CardTitle className="flex items-center space-x-2">
                                <Code className="w-5 h-5" style={{ color: 'var(--primary)' }} />
                                <span>Programming Languages</span>
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-2">
                                {Object.entries(analysis.github.skills.languages)
                                  .sort(([,a], [,b]) => b - a)
                                  .slice(0, 8)
                                  .map(([lang, count]) => (
                                    <div key={lang} className="flex justify-between items-center hover:bg-primary/5 p-2 rounded transition-colors duration-200">
                                      <span className="text-sm">{lang}</span>
                                      <Badge variant="secondary">{count}</Badge>
                                    </div>
                                  ))}
                              </div>
                            </CardContent>
                          </Card>

                          <Card className="skillsync-card">
                            <CardHeader>
                              <CardTitle className="flex items-center space-x-2">
                                <Globe className="w-5 h-5" style={{ color: 'var(--secondary)' }} />
                                <span>Frameworks & Tools</span>
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-2">
                                {Object.entries(analysis.github.skills.frameworks)
                                  .sort(([,a], [,b]) => b - a)
                                  .slice(0, 8)
                                  .map(([framework, count]) => (
                                    <div key={framework} className="flex justify-between items-center hover:bg-secondary/5 p-2 rounded transition-colors duration-200">
                                      <span className="text-sm">{framework}</span>
                                      <Badge variant="secondary">{count}</Badge>
                                    </div>
                                  ))}
                              </div>
                            </CardContent>
                          </Card>
                        </div>

                        {/* Top Repositories */}
                        <Card className="skillsync-card">
                          <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                                              <Star className="w-5 h-5" style={{ color: 'var(--accent)' }} />
                              <span>Top Repositories</span>
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              {analysis.github.topRepos.map((repo, index) => (
                                <div key={index} className="p-4 border rounded-lg hover:bg-muted/50 transition-all duration-300">
                                  <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                      <h4 className="font-medium text-lg">{repo.name}</h4>
                                      <p className="text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>{repo.description}</p>
                                      <div className="flex items-center space-x-4 mt-2 text-sm" style={{ color: 'var(--muted-foreground)' }}>
                                        <span className="flex items-center space-x-1">
                                          <Code className="w-4 h-4" />
                                          <span>{repo.language}</span>
                                        </span>
                                        <span className="flex items-center space-x-1">
                                          <Star className="w-4 h-4" />
                                          <span>{repo.stars}</span>
                                        </span>
                                        <span className="flex items-center space-x-1">
                                          <GitFork className="w-4 h-4" />
                                          <span>{repo.forks}</span>
                                        </span>
                                      </div>
                                    </div>
                                    <a
                                      href={repo.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="ml-4"
                                    >
                                      <Button variant="outline" size="sm" className="skillsync-btn-secondary">
                                        <ExternalLink className="w-4 h-4 mr-2" />
                                        View
                                      </Button>
                                    </a>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </>
                    )}
                  </TabsContent>

                  {/* LinkedIn Tab */}
                  <TabsContent value="linkedin" className="space-y-6">
                    {analysis.linkedin && (
                      <>
                        {/* Experience */}
                        <Card className="skillsync-card">
                          <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                                              <Building className="w-5 h-5" style={{ color: 'var(--secondary)' }} />
                              <span>Professional Experience</span>
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              {analysis.linkedin.experience.map((exp, index) => (
                                <div key={index} className="p-4 border rounded-lg hover:bg-muted/50 transition-all duration-300">
                                  <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                      <h4 className="font-medium text-lg">{exp.title}</h4>
                                      <p className="font-medium" style={{ color: 'var(--secondary)' }}>{exp.company}</p>
                                      <p className="text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>{exp.duration}</p>
                                      <p className="text-sm mt-2" style={{ color: 'var(--foreground)' }}>{exp.description}</p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>

                        {/* Skills */}
                        <Card className="skillsync-card">
                          <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                                              <Award className="w-5 h-5" style={{ color: 'var(--accent)' }} />
                              <span>Skills & Endorsements</span>
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="flex flex-wrap gap-2">
                              {analysis.linkedin.skills.map((skill, index) => (
                                <Badge key={index} variant="secondary" className="px-3 py-1">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </CardContent>
                        </Card>

                        {/* Education */}
                        <Card className="skillsync-card">
                          <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                                              <Calendar className="w-5 h-5" style={{ color: 'var(--primary)' }} />
                              <span>Education</span>
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              {analysis.linkedin.education.map((edu, index) => (
                                <div key={index} className="p-3 border rounded-lg">
                                  <h4 className="font-medium">{edu.degree}</h4>
                                  <p style={{ color: 'var(--secondary)' }}>{edu.institution}</p>
                                  <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>{edu.year}</p>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </>
                    )}
                  </TabsContent>
                </Tabs>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                  <Button 
                    onClick={resetAnalysis}
                    variant="outline"
                    className="skillsync-btn-secondary"
                  >
                    <Target className="w-4 h-4 mr-2" />
                    <span>Analyze New Profiles</span>
                  </Button>
                  <Button 
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    variant="outline"
                    className="skillsync-btn-secondary"
                  >
                    <ArrowRight className="w-4 h-4 mr-2 rotate-[-90deg]" />
                    <span>Back to Top</span>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
