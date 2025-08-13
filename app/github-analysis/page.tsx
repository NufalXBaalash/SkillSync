"use client"

import { useState } from "react"
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
  Wrench
} from "lucide-react"
import Link from "next/link"

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-violet-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center">
              <Github className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-serif font-bold gradient-text">SkillSync</span>
          </div>
          <Link href="/dashboard">
            <Button variant="outline" size="sm">
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif font-bold mb-4">GitHub Skills Analysis</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Analyze your GitHub profile to discover your technical skills, programming languages, and project expertise
          </p>
        </div>

        {/* Input Section */}
        {!analysis && !isAnalyzing && (
          <Card className="max-w-2xl mx-auto mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Enter GitHub Username</CardTitle>
              <CardDescription className="text-center">
                We'll analyze your public repositories to extract your technical skills
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="github-username" className="flex items-center space-x-2">
                  <Github className="w-5 h-5" />
                  <span>GitHub Username</span>
                </Label>
                <Input
                  id="github-username"
                  placeholder="Enter your GitHub username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="mt-2"
                  onKeyPress={(e) => e.key === 'Enter' && handleAnalysis()}
                />
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600">{error}</p>
                </div>
              )}

              <Button 
                onClick={handleAnalysis} 
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg py-6"
                disabled={!username.trim()}
              >
                <TrendingUp className="w-5 h-5 mr-2" />
                Analyze GitHub Profile
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Loading State */}
        {isAnalyzing && (
          <Card className="max-w-2xl mx-auto mb-8">
            <CardHeader>
              <CardTitle className="text-center">Analyzing GitHub Profile...</CardTitle>
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
                <Progress value={analysisProgress} className="h-3" />
              </div>
              
              <div className="text-center text-sm text-gray-600">
                <div className="flex items-center justify-center space-x-2">
                  <Github className="w-4 h-4" />
                  <span>Analyzing GitHub profile: {username}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results Section */}
        {analysis && (
          <div className="space-y-6">
            {/* Overall Score Card */}
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="text-3xl">GitHub Skills Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center space-x-6 mb-6">
                  <div className="text-center">
                    <div className="text-6xl font-bold gradient-text">{analysis.skillScore}</div>
                    <div className="text-lg text-gray-600">Total Score</div>
                  </div>
                  <div className="text-center">
                    <Badge className={`text-lg px-4 py-2 ${getScoreLevel(analysis.skillScore).color} ${getScoreLevel(analysis.skillScore).textColor}`}>
                      {getScoreLevel(analysis.skillScore).level}
                    </Badge>
                  </div>
                </div>
                <Progress value={analysis.skillScore} className="h-4 max-w-md mx-auto" />
              </CardContent>
            </Card>

            {/* Profile Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Github className="w-5 h-5 text-gray-800" />
                  <span>Profile Statistics</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">{analysis.totalRepos}</div>
                    <div className="text-sm text-gray-600">Repositories</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-yellow-600">{analysis.totalStars}</div>
                    <div className="text-sm text-gray-600">Stars</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">{analysis.totalForks}</div>
                    <div className="text-sm text-gray-600">Forks</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Skills Breakdown */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
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
                        <div key={lang} className="flex justify-between items-center">
                          <span className="text-sm">{lang}</span>
                          <Badge variant="secondary">{count}</Badge>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
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
                        <div key={framework} className="flex justify-between items-center">
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
              <Card>
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
                        <div key={db} className="flex justify-between items-center">
                          <span className="text-sm">{db}</span>
                          <Badge variant="secondary">{count}</Badge>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
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
                        <div key={tool} className="flex justify-between items-center">
                          <span className="text-sm">{tool}</span>
                          <Badge variant="secondary">{count}</Badge>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Top Repositories */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-600" />
                  <span>Top Repositories</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analysis.topRepos.map((repo, index) => (
                    <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
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
                          <Button variant="outline" size="sm">
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
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <span>Skill Development Recommendations</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {analysis.recommendations.map((rec, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
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
                className="flex items-center space-x-2"
              >
                <TrendingUp className="w-4 h-4" />
                <span>Analyze Another Profile</span>
              </Button>
              <Link href="/profile-analysis">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Combined Analysis
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="outline">
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
