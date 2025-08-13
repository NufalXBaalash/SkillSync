"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { 
  Github, 
  Linkedin, 
  Star, 
  GitFork, 
  Code, 
  Briefcase, 
  Award, 
  GraduationCap,
  TrendingUp,
  Activity,
  MessageSquare,
  Globe,
  ArrowRight,
  CheckCircle,
  Clock,
  MapPin,
  Building,
  Home,
} from "lucide-react"
import Link from "next/link"
import SharedNavigation from "@/components/shared-navigation"

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
  profile: {
    name: string
    headline: string
    location: string
    summary: string
    skills: string[]
    experiences: Array<{
      title: string
      company: string
      duration: string
      description: string
    }>
    certifications: Array<{
      name: string
      issuer: string
      date: string
      description: string
    }>
    education: Array<{
      degree: string
      institution: string
      year: string
      field: string
    }>
    activityLevel: 'High' | 'Medium' | 'Low'
    topics: string[]
  }
  skillScore: number
  recommendations: string[]
  analysisDate: string
}

export default function ProfileAnalysisPage() {
  const [githubUsername, setGithubUsername] = useState("")
  const [linkedinUrl, setLinkedinUrl] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [githubAnalysis, setGithubAnalysis] = useState<GitHubAnalysis | null>(null)
  const [linkedinAnalysis, setLinkedinAnalysis] = useState<LinkedInAnalysis | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("overview")
  const [isClient, setIsClient] = useState(false)
  const [linkedinError, setLinkedinError] = useState<string | null>(null)

  // Fix hydration error
  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleAnalysis = async () => {
    if (!githubUsername && !linkedinUrl) {
      setError("Please provide at least one profile to analyze")
      return
    }

    setIsAnalyzing(true)
    setError(null)
    setAnalysisProgress(0)
    setGithubAnalysis(null)
    setLinkedinAnalysis(null)
    setLinkedinError(null)

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

      // Analyze GitHub if username provided
      if (githubUsername) {
        console.log('Starting GitHub analysis for:', githubUsername)
        const githubResponse = await fetch('/api/github-analysis', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: githubUsername })
        })
        
        if (githubResponse.ok) {
          const data = await githubResponse.json()
          setGithubAnalysis(data)
          console.log('GitHub analysis completed:', data)
        } else {
          const errorData = await githubResponse.json()
          setError(`GitHub Analysis Error: ${errorData.error}`)
        }
      }

      // Analyze LinkedIn if URL provided
      if (linkedinUrl) {
        console.log('Starting LinkedIn analysis for:', linkedinUrl)
        const linkedinResponse = await fetch('/api/linkedin-analysis', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ linkedinUrl })
        })
        
        if (linkedinResponse.ok) {
          const data = await linkedinResponse.json()
          setLinkedinAnalysis(data)
          console.log('LinkedIn analysis completed:', data)
          
          // Check if this is fallback data
          if (data.profile.name === 'LinkedIn Profile' && data.profile.summary.includes('could not be extracted')) {
            console.log('LinkedIn analysis used fallback data')
          }
        } else {
          const errorData = await linkedinResponse.json()
          setLinkedinError(`LinkedIn Analysis Error: ${errorData.error}`)
        }
      }

      setAnalysisProgress(100)
      
      // Reset to overview tab when analysis is complete
      setActiveTab("overview")

    } catch (err) {
      setError("An unexpected error occurred during analysis")
      console.error(err)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const getOverallScore = () => {
    if (!githubAnalysis && !linkedinAnalysis) return 0
    
    let totalScore = 0
    let count = 0
    
    if (githubAnalysis) {
      totalScore += githubAnalysis.skillScore
      count++
    }
    
    if (linkedinAnalysis) {
      totalScore += linkedinAnalysis.skillScore
      count++
    }
    
    return Math.round(totalScore / count)
  }

  const getScoreLevel = (score: number) => {
    if (score >= 80) return { level: "Expert", color: "bg-green-500", textColor: "text-green-700" }
    if (score >= 60) return { level: "Advanced", color: "bg-blue-500", textColor: "text-blue-700" }
    if (score >= 40) return { level: "Intermediate", color: "bg-yellow-500", textColor: "text-yellow-700" }
    return { level: "Beginner", color: "bg-gray-500", textColor: "text-gray-700" }
  }

  // Don't render until client-side hydration is complete
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-violet-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading Profile Analysis...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-violet-50" suppressHydrationWarning>
      <SharedNavigation />

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif font-bold mb-4">Professional Profile Analysis</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get comprehensive insights into your professional skills by analyzing your GitHub and LinkedIn profiles
          </p>
        </div>

        {/* Input Section */}
        {!githubAnalysis && !linkedinAnalysis && !isAnalyzing && (
          <Card className="max-w-4xl mx-auto mb-8 hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Enter Your Profile Information</CardTitle>
              <CardDescription className="text-center">
                Provide your GitHub username and/or LinkedIn profile URL to get started
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="github-username" className="flex items-center space-x-2">
                    <Github className="w-5 h-5" />
                    <span>GitHub Username</span>
                  </Label>
                  <Input
                    id="github-username"
                    placeholder="Enter your GitHub username (optional)"
                    value={githubUsername}
                    onChange={(e) => setGithubUsername(e.target.value)}
                    className="mt-2 hover:border-blue-300 focus:border-blue-500 transition-colors duration-200"
                  />
                </div>
                
                <div>
                  <Label htmlFor="linkedin-url" className="flex items-center space-x-2">
                    <Linkedin className="w-5 h-5" />
                    <span>LinkedIn Profile URL</span>
                  </Label>
                  <Input
                    id="linkedin-url"
                    placeholder="https://linkedin.com/in/your-profile (optional)"
                    value={linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                    className="mt-2 hover:border-blue-300 focus:border-blue-500 transition-colors duration-200"
                  />
                  <p className="text-sm text-amber-600 mt-1">
                    ⚠️ LinkedIn analysis may use fallback data if profile is private or scraping fails
                  </p>
                </div>
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600">{error}</p>
                </div>
              )}

              <Button 
                onClick={handleAnalysis} 
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg py-6 shadow-lg hover:shadow-xl transition-all duration-300"
                disabled={!githubUsername && !linkedinUrl}
              >
                <TrendingUp className="w-5 h-5 mr-2" />
                Start Analysis
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Loading State */}
        {isAnalyzing && (
          <Card className="max-w-2xl mx-auto mb-8 border-2 border-blue-200 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-center">Analyzing Profiles...</CardTitle>
              <CardDescription className="text-center">
                This may take a few moments depending on profile complexity
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{analysisProgress}%</span>
                </div>
                <Progress value={analysisProgress} className="h-3" suppressHydrationWarning />
              </div>
              
              <div className="text-center text-sm text-gray-600">
                {githubUsername && <div className="flex items-center justify-center space-x-2 mb-2">
                  <Github className="w-4 h-4" />
                  <span>Analyzing GitHub profile: {githubUsername}</span>
                </div>}
                {linkedinUrl && <div className="flex items-center justify-center space-x-2">
                  <Linkedin className="w-4 h-4" />
                  <span>Analyzing LinkedIn profile</span>
                </div>}
              </div>
            </CardContent>
          </Card>
        )}

        {linkedinError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  LinkedIn Analysis Failed
                </h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{linkedinError}</p>
                  {linkedinError.includes('authentication') && (
                    <div className="mt-2 p-3 bg-red-100 rounded border border-red-300">
                      <p className="font-medium">🔒 Authentication Required</p>
                      <ul className="mt-1 list-disc list-inside text-xs">
                        <li>Ensure the LinkedIn profile is public and accessible</li>
                        <li>The profile may be private or require login</li>
                        <li>LinkedIn may be blocking automated access</li>
                        <li>Try using a different profile or check privacy settings</li>
                      </ul>
                    </div>
                  )}
                  {linkedinError.includes('anti-scraping') && (
                    <div className="mt-2 p-3 bg-yellow-100 rounded border border-yellow-300">
                      <p className="font-medium">⚠️ Anti-Scraping Detection</p>
                      <ul className="mt-1 list-disc list-inside text-xs">
                        <li>LinkedIn detected automated access</li>
                        <li>Try again later when traffic is lower</li>
                        <li>Consider using a different profile</li>
                        <li>This is a temporary limitation</li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results Section */}
        {(githubAnalysis || linkedinAnalysis) && (
          <div className="space-y-6">
            {/* Overall Score Card */}
            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-3xl">Overall Professional Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center space-x-6 mb-6">
                  <div className="text-center">
                    <div className="text-6xl font-bold gradient-text" suppressHydrationWarning>{getOverallScore()}</div>
                    <div className="text-lg text-gray-600">Total Score</div>
                  </div>
                  <div className="text-center">
                    <Badge className={`text-lg px-4 py-2 ${getScoreLevel(getOverallScore()).color} ${getScoreLevel(getOverallScore()).textColor}`} suppressHydrationWarning>
                      {getScoreLevel(getOverallScore()).level}
                    </Badge>
                  </div>
                </div>
                <Progress value={getOverallScore()} className="h-4 max-w-md mx-auto" suppressHydrationWarning />
              </CardContent>
            </Card>

            {/* Analysis Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="github" disabled={!githubAnalysis}>GitHub Analysis</TabsTrigger>
                <TabsTrigger value="linkedin" disabled={!linkedinAnalysis}>LinkedIn Analysis</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <div className="grid lg:grid-cols-2 gap-6">
                  {/* GitHub Summary */}
                  {githubAnalysis && (
                    <Card className="hover:shadow-lg transition-all duration-300">
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Github className="w-5 h-5 text-gray-800" />
                          <span>GitHub Summary</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div>
                            <div className="text-2xl font-bold text-blue-600" suppressHydrationWarning>{githubAnalysis.totalRepos}</div>
                            <div className="text-sm text-gray-600">Repositories</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-yellow-600" suppressHydrationWarning>{githubAnalysis.totalStars}</div>
                            <div className="text-sm text-gray-600">Stars</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-green-600" suppressHydrationWarning>{githubAnalysis.totalForks}</div>
                            <div className="text-sm text-gray-600">Forks</div>
                          </div>
                        </div>
                        <div className="text-center">
                          <Badge className={`text-sm px-3 py-1 ${getScoreLevel(githubAnalysis.skillScore).color} ${getScoreLevel(githubAnalysis.skillScore).textColor}`} suppressHydrationWarning>
                            Score: {githubAnalysis.skillScore}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* LinkedIn Summary */}
                  {linkedinAnalysis && (
                    <Card className="hover:shadow-lg transition-all duration-300">
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Linkedin className="w-5 h-5 text-blue-600" />
                          <span>LinkedIn Summary</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div>
                            <div className="text-2xl font-bold text-blue-600" suppressHydrationWarning>{linkedinAnalysis.profile.skills.length}</div>
                            <div className="text-sm text-gray-600">Skills</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-green-600" suppressHydrationWarning>{linkedinAnalysis.profile.experiences.length}</div>
                            <div className="text-sm text-gray-600">Experiences</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-purple-600" suppressHydrationWarning>{linkedinAnalysis.profile.certifications.length}</div>
                            <div className="text-sm text-gray-600">Certifications</div>
                          </div>
                        </div>
                        <div className="text-center">
                          <Badge className={`text-sm px-3 py-1 ${getScoreLevel(linkedinAnalysis.skillScore).color} ${getScoreLevel(linkedinAnalysis.skillScore).textColor}`} suppressHydrationWarning>
                            Score: {linkedinAnalysis.skillScore}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/* Combined Recommendations */}
                <Card className="hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      <span>Career Recommendations</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {githubAnalysis?.recommendations.slice(0, 3).map((rec, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200">
                          <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-gray-700">{rec}</p>
                        </div>
                      ))}
                      {linkedinAnalysis?.recommendations.slice(0, 3).map((rec, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-200">
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-gray-700">{rec}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* GitHub Analysis Tab */}
              <TabsContent value="github" className="space-y-6">
                {githubAnalysis && (
                  <>
                    {/* Skills Breakdown */}
                    <div className="grid lg:grid-cols-2 gap-6">
                      <Card className="hover:shadow-lg transition-all duration-300">
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-2">
                            <Code className="w-5 h-5 text-blue-600" />
                            <span>Programming Languages</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            {Object.entries(githubAnalysis.skills.languages)
                              .sort(([,a], [,b]) => b - a)
                              .slice(0, 8)
                              .map(([lang, count]) => (
                                <div key={lang} className="flex justify-between items-center hover:bg-blue-50 p-2 rounded transition-colors duration-200">
                                  <span className="text-sm">{lang}</span>
                                  <Badge variant="secondary">{count}</Badge>
                                </div>
                              ))}
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="hover:shadow-lg transition-all duration-300">
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-2">
                            <Globe className="w-5 h-5 text-green-600" />
                            <span>Frameworks & Tools</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            {Object.entries(githubAnalysis.skills.frameworks)
                              .sort(([,a], [,b]) => b - a)
                              .slice(0, 8)
                              .map(([framework, count]) => (
                                <div key={framework} className="flex justify-between items-center hover:bg-green-50 p-2 rounded transition-colors duration-200">
                                  <span className="text-sm">{framework}</span>
                                  <Badge variant="secondary">{count}</Badge>
                                </div>
                              ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Top Repositories */}
                    <Card className="hover:shadow-lg transition-all duration-300">
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Star className="w-5 h-5 text-yellow-600" />
                          <span>Top Repositories</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {githubAnalysis.topRepos.map((repo, index) => (
                            <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 transition-all duration-200 hover:shadow-md">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <h4 className="font-medium text-lg">{repo.name}</h4>
                                  <p className="text-gray-600 text-sm mt-1">{repo.description}</p>
                                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
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
                                  <Button variant="outline" size="sm" className="hover:bg-blue-50 hover:border-blue-300 transition-colors duration-200">
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

              {/* LinkedIn Analysis Tab */}
              <TabsContent value="linkedin" className="space-y-6">
                {linkedinAnalysis && (
                  <>
                    {/* Profile Summary */}
                    <Card className="hover:shadow-lg transition-all duration-300">
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Linkedin className="w-5 h-5 text-blue-600" />
                          <span>Profile Summary</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h3 className="text-xl font-semibold">{linkedinAnalysis.profile.name}</h3>
                          <p className="text-gray-600">{linkedinAnalysis.profile.headline}</p>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                            <span className="flex items-center space-x-1">
                              <MapPin className="w-4 h-4" />
                              <span>{linkedinAnalysis.profile.location}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Activity className="w-4 h-4" />
                              <span>{linkedinAnalysis.profile.activityLevel} Activity</span>
                            </span>
                          </div>
                        </div>
                        <p className="text-gray-700">{linkedinAnalysis.profile.summary}</p>
                      </CardContent>
                    </Card>

                    {/* Skills */}
                    <Card className="hover:shadow-lg transition-all duration-300">
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Award className="w-5 h-5 text-green-600" />
                          <span>Skills & Endorsements</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {linkedinAnalysis.profile.skills.map((skill, index) => (
                            <Badge key={index} variant="secondary" className="text-sm hover:bg-blue-100 transition-colors duration-200">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Experience */}
                    <Card className="hover:shadow-lg transition-all duration-300">
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Briefcase className="w-5 h-5 text-blue-600" />
                          <span>Work Experience</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {linkedinAnalysis.profile.experiences.map((exp, index) => (
                            <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 transition-all duration-200 hover:shadow-md">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <h4 className="font-medium text-lg">{exp.title}</h4>
                                  <p className="text-gray-600 font-medium">{exp.company}</p>
                                  <p className="text-gray-500 text-sm mt-1">{exp.duration}</p>
                                  <p className="text-gray-700 text-sm mt-2">{exp.description}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Certifications */}
                    <Card className="hover:shadow-lg transition-all duration-300">
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Award className="w-5 h-5 text-purple-600" />
                          <span>Certifications</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {linkedinAnalysis.profile.certifications.map((cert, index) => (
                            <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 transition-all duration-200 hover:shadow-md">
                              <h4 className="font-medium text-lg">{cert.name}</h4>
                              <p className="text-gray-600">{cert.issuer}</p>
                              <p className="text-gray-500 text-sm mt-1">{cert.date}</p>
                              <p className="text-gray-700 text-sm mt-2">{cert.description}</p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Topics of Interest */}
                    <Card className="hover:shadow-lg transition-all duration-300">
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <MessageSquare className="w-5 h-5 text-orange-600" />
                          <span>Topics of Interest</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {linkedinAnalysis.profile.topics.map((topic, index) => (
                            <Badge key={index} variant="outline" className="text-sm hover:bg-orange-50 transition-colors duration-200">
                              {topic}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </>
                )}
              </TabsContent>
            </Tabs>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => {
                  setGithubAnalysis(null)
                  setLinkedinAnalysis(null)
                  setGithubUsername("")
                  setLinkedinUrl("")
                  setError(null)
                }}
                variant="outline"
                className="flex items-center space-x-2 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
              >
                <TrendingUp className="w-4 h-4" />
                <span>Analyze Another Profile</span>
              </Button>
              <Link href="/dashboard">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300">
                  <Home className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
