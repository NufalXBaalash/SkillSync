"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Github, 
  Star, 
  GitFork, 
  Code, 
  TrendingUp,
  Globe,
  ArrowRight,
  CheckCircle,
  Database,
  Wrench,
  Home,
  Map,
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

export default function GitHubAnalysisPage() {
  const [username, setUsername] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [analysis, setAnalysis] = useState<GitHubAnalysis | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const resultsRef = useRef<HTMLDivElement>(null)

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = (scrollTop / docHeight) * 100
      setScrollProgress(scrollPercent)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleAnalysis = async () => {
    if (!username.trim()) {
      setError("Please enter a GitHub username")
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

      const response = await fetch('/api/github-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.trim() })
      })
      
      if (response.ok) {
        const data = await response.json()
        setAnalysis(data)
        console.log('GitHub analysis completed:', data)
        
        // Auto-scroll to results after successful analysis with enhanced effect
        setTimeout(() => {
          if (resultsRef.current) {
            // Add a subtle highlight effect
            resultsRef.current.style.transition = 'all 0.3s ease'
            resultsRef.current.style.transform = 'scale(1.02)'
            resultsRef.current.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            
            // Scroll to results
            resultsRef.current.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'start' 
            })
            
            // Reset the highlight effect
            setTimeout(() => {
              if (resultsRef.current) {
                resultsRef.current.style.transform = 'scale(1)'
                resultsRef.current.style.boxShadow = 'none'
              }
            }, 1000)
          }
        }, 500)
      } else {
        const errorData = await response.json()
        setError(`Analysis Error: ${errorData.error}`)
      }

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <SharedNavigation />
      
      <div className="max-w-6xl mx-auto p-4">
        {/* Scroll Progress Bar */}
        <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
          <div 
            className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mb-6">
          <Link href="/dashboard">
            <Button variant="outline" size="sm" className="hover:bg-blue-50 hover:border-blue-300 transition-all duration-200">
              <Home className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <Link href="/profile-analysis">
            <Button variant="outline" size="sm" className="hover:bg-purple-50 hover:border-purple-300 transition-all duration-200">
              <Map className="w-4 h-4 mr-2" />
              Combined Analysis
            </Button>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Github className="w-12 h-12 text-gray-800 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">GitHub Skills Analysis</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Analyze your GitHub profile to discover your technical skills, frameworks, and tools
          </p>
        </div>

        {/* Rate Limit Warning */}
        <Card className="mb-6 border-2 border-gradient-to-r from-amber-200 to-orange-200 bg-gradient-to-r from-amber-50/80 to-orange-50/80 shadow-lg backdrop-blur-sm hover:shadow-xl transition-all duration-300">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white text-xl font-bold">⚡</span>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-amber-800 mb-3 text-lg flex items-center">
                  <span className="w-2 h-2 bg-amber-400 rounded-full mr-2 animate-pulse"></span>
                  GitHub API Rate Limits
                </h3>
                <div className="space-y-2">
                  <p className="text-amber-700 text-sm leading-relaxed">
                    <span className="font-semibold">Public API:</span> <span className="bg-amber-100 px-2 py-1 rounded text-amber-800 font-mono text-xs">60 requests/hour</span>
                  </p>
                  <p className="text-amber-700 text-sm leading-relaxed">
                    <span className="font-semibold">Per Analysis:</span> <span className="bg-amber-100 px-2 py-1 rounded text-amber-800 font-mono text-xs">~4 API calls</span>
                  </p>
                  <p className="text-amber-700 text-sm leading-relaxed">
                    <span className="font-semibold">Pro Tip:</span> Use a personal access token for <span className="bg-gradient-to-r from-green-100 to-emerald-100 px-2 py-1 rounded text-green-800 font-mono text-xs">5,000 requests/hour</span>
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Input Form */}
        <Card className="mb-8 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Code className="w-5 h-5" />
              <span>Enter GitHub Username</span>
            </CardTitle>
            <CardDescription>
              We'll analyze your repositories to identify technologies and calculate your skill score
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex space-x-4">
              <div className="flex-1">
                <Label htmlFor="username">GitHub Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="e.g., octocat"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAnalysis()}
                  className="text-lg hover:border-blue-300 focus:border-blue-500 transition-colors duration-200"
                />
              </div>
              <div className="flex items-end">
                <Button 
                  onClick={handleAnalysis} 
                  disabled={isAnalyzing || !username.trim()}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <TrendingUp className="w-5 h-5 mr-2" />
                      Analyze Profile
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Error Display */}
        {error && (
          <Card className="mb-6 border-red-200 bg-red-50 hover:shadow-lg transition-all duration-300">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-3">
                <div className="text-red-600 mt-1">❌</div>
                <div>
                  <h3 className="font-semibold text-red-800 mb-2">Analysis Error</h3>
                  <p className="text-red-700">{error}</p>
                  {error.includes('rate limit') && (
                    <div className="mt-3 p-3 bg-red-100 rounded border border-red-200">
                      <p className="text-red-800 text-sm font-medium mb-2">Rate Limit Solutions:</p>
                      <ul className="text-red-700 text-sm space-y-1">
                        <li>• Wait about 1 hour for the limit to reset</li>
                        <li>• Use a GitHub personal access token for higher limits</li>
                        <li>• Try analyzing a different GitHub username</li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Loading State */}
        {isAnalyzing && (
          <Card className="max-w-2xl mx-auto mb-8 border-2 border-blue-200 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-center text-blue-800">Analyzing GitHub Profile...</CardTitle>
              <CardDescription className="text-center text-blue-600">
                This may take a few moments depending on profile complexity
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-blue-700">Progress</span>
                  <span className="text-blue-800">{analysisProgress}%</span>
                </div>
                <Progress value={analysisProgress} className="h-3 bg-blue-100" />
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center space-x-3 p-4 bg-blue-100/50 rounded-lg border border-blue-200">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                  <Github className="w-5 h-5 text-blue-600" />
                  <span className="text-blue-800 font-medium">Analyzing: @{username}</span>
                </div>
              </div>

              <div className="text-center text-sm text-blue-600">
                <p>Fetching repositories and analyzing code...</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Floating Scroll Indicator */}
        {analysis && (
          <div className="fixed bottom-8 right-8 z-50">
            <Button 
              onClick={() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              className="rounded-full w-12 h-12 p-0 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 animate-pulse"
              title="Scroll to Results"
            >
              <TrendingUp className="w-5 h-5 text-white" />
            </Button>
          </div>
        )}

        {/* Results Section */}
        {analysis && (
          <div ref={resultsRef} className="space-y-6 scroll-mt-8 transition-all duration-500 hover:scale-[1.01]">
            {/* Results Header with Animation */}
            <div className="text-center mb-8 p-6 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 rounded-xl border border-blue-200 hover:shadow-lg transition-all duration-300">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Analysis Results for <span className="text-blue-600">@{analysis.username}</span>
              </h2>
              <p className="text-gray-600">Here's what we discovered about your GitHub profile</p>
              <div className="mt-4 flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>

            {/* Overall Score Card */}
            <Card className="text-center border-2 border-blue-200 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
              <CardHeader>
                <CardTitle className="text-3xl">GitHub Skills Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center space-x-6 mb-6">
                  <div className="text-center">
                    <div className="text-6xl font-bold gradient-text animate-pulse">{analysis.skillScore}</div>
                    <div className="text-lg text-gray-600">Total Score</div>
                  </div>
                  <div className="text-center">
                    <Badge className={`text-lg px-4 py-2 ${getScoreLevel(analysis.skillScore).color} ${getScoreLevel(analysis.skillScore).textColor} animate-bounce`}>
                      {getScoreLevel(analysis.skillScore).level}
                    </Badge>
                  </div>
                </div>
                <Progress value={analysis.skillScore} className="h-4 max-w-md mx-auto" />
              </CardContent>
            </Card>

            {/* Profile Stats */}
            <Card className="hover:shadow-lg transition-all duration-300 hover:scale-[1.01]">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Github className="w-5 h-5 text-gray-800" />
                  <span>Profile Statistics</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="hover:scale-110 transition-transform duration-300">
                    <div className="text-2xl font-bold text-blue-600">{analysis.totalRepos}</div>
                    <div className="text-sm text-gray-600">Repositories</div>
                  </div>
                  <div className="hover:scale-110 transition-transform duration-300">
                    <div className="text-2xl font-bold text-yellow-600">{analysis.totalStars}</div>
                    <div className="text-sm text-gray-600">Stars</div>
                  </div>
                  <div className="hover:scale-110 transition-transform duration-300">
                    <div className="text-2xl font-bold text-green-600">{analysis.totalForks}</div>
                    <div className="text-sm text-gray-600">Forks</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Skills Breakdown */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="hover:shadow-lg transition-all duration-300 hover:scale-[1.01]">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Code className="w-5 h-5 text-blue-600" />
                    <span>Programming Languages</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {Object.entries(analysis.skills.languages)
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

              <Card className="hover:shadow-lg transition-all duration-300 hover:scale-[1.01]">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Globe className="w-5 h-5 text-green-600" />
                    <span>Frameworks & Tools</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {Object.entries(analysis.skills.frameworks)
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

            {/* Additional Skills */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="hover:shadow-lg transition-all duration-300 hover:scale-[1.01]">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Database className="w-5 h-5 text-purple-600" />
                    <span>Databases & Storage</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {Object.entries(analysis.skills.databases)
                      .sort(([,a], [,b]) => b - a)
                      .slice(0, 6)
                      .map(([db, count]) => (
                        <div key={db} className="flex justify-between items-center hover:bg-purple-50 p-2 rounded transition-colors duration-200">
                          <span className="text-sm">{db}</span>
                          <Badge variant="secondary">{count}</Badge>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300 hover:scale-[1.01]">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Wrench className="w-5 h-5 text-orange-600" />
                    <span>Development Tools</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {Object.entries(analysis.skills.tools)
                      .sort(([,a], [,b]) => b - a)
                      .slice(0, 6)
                      .map(([tool, count]) => (
                        <div key={tool} className="flex justify-between items-center hover:bg-orange-50 p-2 rounded transition-colors duration-200">
                          <span className="text-sm">{tool}</span>
                          <Badge variant="secondary">{count}</Badge>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Top Repositories */}
            <Card className="hover:shadow-lg transition-all duration-300 hover:scale-[1.01]">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-600" />
                  <span>Top Repositories</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analysis.topRepos.map((repo, index) => (
                    <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 transition-all duration-300 hover:scale-[1.02] hover:shadow-md">
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

            {/* Recommendations */}
            <Card className="hover:shadow-lg transition-all duration-300 hover:scale-[1.01]">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <span>Skill Development Recommendations</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {analysis.recommendations.map((rec, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all duration-300 hover:scale-[1.02] hover:shadow-md">
                      <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-700">{rec}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => {
                  setAnalysis(null)
                  setUsername("")
                  setError(null)
                }}
                variant="outline"
                className="flex items-center space-x-2 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
              >
                <TrendingUp className="w-4 h-4" />
                <span>Analyze Another Profile</span>
              </Button>
              <Link href="/profile-analysis">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300">
                  <Map className="w-4 h-4 mr-2" />
                  Combined Analysis
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="outline" className="hover:bg-gray-50 hover:border-gray-300 transition-all duration-200">
                  <Home className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
            </div>

            {/* Back to Top Button */}
            <div className="text-center pt-8">
              <Button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                variant="outline"
                size="sm"
                className="rounded-full px-6 py-2 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300"
              >
                <ArrowRight className="w-4 h-4 mr-2 rotate-[-90deg]" />
                Back to Top
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
