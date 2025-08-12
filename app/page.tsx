"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Target, Map, Zap, Star, TrendingUp, Code, BarChart3 } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function LandingPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-violet-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-violet-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-serif font-bold gradient-text">SkillSync</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">
              How it Works
            </a>
            <a href="#testimonials" className="text-gray-600 hover:text-gray-900 transition-colors">
              Success Stories
            </a>
            {/* Updated header navigation to include auth links */}
            <Link href="/login">
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="gradient-bg">
                Get Started
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge className="mb-6 bg-blue-100 text-blue-700 hover:bg-blue-100">AI-Powered Career Coaching</Badge>
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 leading-tight">
            Your AI Career Coach – <span className="gradient-text">Built for You, Evolving with You</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Bridge the gap between education and employment with AI-driven skill analysis, personalized career mapping,
            and real-world job simulation experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/assessment">
              <Button size="lg" className="gradient-bg hover:opacity-90 text-lg px-8 py-6">
                Start Your Career Journey
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/assessment">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-transparent">
                Try Skill Assessment
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 3-Step Process */}
      <section id="how-it-works" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold mb-4">How SkillSync Works</h2>
            <p className="text-xl text-gray-600">Three simple steps to accelerate your career</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="card-hover border-0 shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-serif">1. Assess Skills</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base leading-relaxed">
                  Upload your CV, connect GitHub/LinkedIn, or manually input your skills. Our AI analyzes your current
                  abilities and identifies growth opportunities.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="card-hover border-0 shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4">
                  <Map className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-serif">2. Get Roadmap</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base leading-relaxed">
                  Receive a personalized career path with interactive timelines, milestone tracking, and curated
                  learning resources from top platforms.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="card-hover border-0 shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-serif">3. Practice Real Tasks</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base leading-relaxed">
                  Complete job simulations with real-world scenarios. Get instant feedback and build confidence before
                  applying to actual positions.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Career Roadmap Examples */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-violet-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold mb-4">Example Career Paths</h2>
            <p className="text-xl text-gray-600">See how SkillSync creates personalized roadmaps</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="card-hover border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-2">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                  <CardTitle className="text-lg">Data Analyst</CardTitle>
                </div>
                <Badge variant="secondary" className="w-fit">
                  8 months
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Learn SQL & Python</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Master Data Visualization</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    <span>Complete Portfolio Projects</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-2">
                  <Code className="w-6 h-6 text-violet-600" />
                  <CardTitle className="text-lg">Frontend Developer</CardTitle>
                </div>
                <Badge variant="secondary" className="w-fit">
                  6 months
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Master React & TypeScript</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Build Responsive UIs</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    <span>Deploy Full-Stack Apps</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-hover border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-2">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                  <CardTitle className="text-lg">Product Manager</CardTitle>
                </div>
                <Badge variant="secondary" className="w-fit">
                  10 months
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Learn Product Strategy</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Master User Research</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    <span>Lead Cross-functional Teams</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold mb-4">Success Stories</h2>
            <p className="text-xl text-gray-600">See how SkillSync transformed careers</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="card-hover border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-violet-400 rounded-full flex items-center justify-center text-white font-bold">
                    S
                  </div>
                  <div>
                    <CardTitle className="text-lg">Sarah Chen</CardTitle>
                    <CardDescription>Psychology → UX Designer</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-600">
                  "SkillSync helped me transition from psychology to UX design in just 7 months. The job simulations
                  were incredibly realistic!"
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-400 rounded-full flex items-center justify-center text-white font-bold">
                    M
                  </div>
                  <div>
                    <CardTitle className="text-lg">Marcus Johnson</CardTitle>
                    <CardDescription>Student → Data Analyst</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-600">
                  "The personalized roadmap was a game-changer. I landed my first data analyst role before even
                  graduating!"
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-violet-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold">
                    A
                  </div>
                  <div>
                    <CardTitle className="text-lg">Aisha Patel</CardTitle>
                    <CardDescription>Marketing → Product Manager</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-600">
                  "The AI coach understood my background perfectly and created a path that built on my existing
                  marketing skills."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 gradient-bg">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-4xl font-serif font-bold text-white mb-6">Ready to Transform Your Career?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of students and professionals who've accelerated their careers with SkillSync.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/assessment">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                Start Free Assessment
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
            >
              View Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-serif font-bold">SkillSync</span>
              </div>
              <p className="text-gray-400 text-sm">AI-powered career coaching that evolves with you.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Skill Assessment
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Career Roadmaps
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Job Simulations
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    AI Coach
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 SkillSync. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
