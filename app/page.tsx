import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Target, Map, Zap, CheckCircle, Play, Database, Cpu, Shield, Zap as ZapIcon, Sparkles, Rocket, Star, Users, Zap as ZapIcon2, Code } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-indigo-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-80 h-80 bg-gradient-to-r from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-72 h-72 bg-gradient-to-r from-slate-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/20 bg-white/80 backdrop-blur-xl shadow-lg shadow-slate-900/5">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
              <Target className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-serif font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              SkillSync
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-slate-600 hover:text-slate-900 transition-all duration-300 hover:scale-105">Features</a>
            <a href="#how-it-works" className="text-slate-600 hover:text-slate-900 transition-all duration-300 hover:scale-105">How it Works</a>
            <a href="#pricing" className="text-slate-600 hover:text-slate-900 transition-all duration-300 hover:scale-105">Pricing</a>
            <Link href="/login">
              <Button variant="outline" className="border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all duration-300 hover:scale-105">
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105">
                Get Started
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-32 px-4 overflow-hidden">
        {/* Enhanced background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-80 h-80 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/4 w-72 h-72 bg-gradient-to-r from-slate-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>
        
        <div className="container mx-auto max-w-6xl text-center relative z-10">
          <Badge className="mb-8 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 border border-blue-200/50 px-6 py-3 text-sm shadow-lg shadow-blue-500/10 animate-fade-in hover:scale-105 transition-all duration-300">
            <Sparkles className="w-4 h-4 mr-2" />
            AI-Powered Skill Assessment
          </Badge>
          
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif font-bold mb-8 leading-tight text-slate-900 animate-fade-in">
            Master the Skills That{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent animate-pulse">
              Actually Matter
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in">
            Get a personalized learning roadmap based on real job requirements. No fluff, just the skills you need to land your next role.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in">
            <Link href="/assessment">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-xl px-12 py-7 shadow-2xl shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-500 hover:scale-105 hover:-translate-y-1">
                <Rocket className="mr-3 w-6 h-6" />
                Start Free Assessment
                <ArrowRight className="ml-3 w-6 h-6" />
              </Button>
            </Link>
            <Link href="/assessment">
              <Button size="lg" variant="outline" className="text-xl px-12 py-7 border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all duration-300 hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl">
                <Play className="mr-3 w-6 h-6" />
                View Demo
              </Button>
            </Link>
          </div>
          
          {/* Trust indicators */}
          <div className="mt-20 flex flex-col sm:flex-row items-center justify-center gap-10 text-sm text-slate-500 animate-fade-in">
            <div className="flex items-center space-x-3 hover:scale-105 transition-transform duration-300">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span>Free Assessment</span>
            </div>
            <div className="flex items-center space-x-3 hover:scale-105 transition-transform duration-300">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span>5-Minute Setup</span>
            </div>
            <div className="flex items-center space-x-3 hover:scale-105 transition-transform duration-300">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span>Real Job Data</span>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section id="features" className="py-40 px-4 bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/20 relative overflow-hidden">
        {/* Enhanced background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-r from-blue-400/10 to-indigo-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-10 w-48 h-48 bg-gradient-to-r from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-2xl animate-pulse delay-500"></div>
        </div>
        
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-24">
            <Badge className="mb-6 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 border border-blue-200/50 px-6 py-3 text-sm shadow-lg shadow-blue-500/10 hover:scale-105 transition-transform duration-300">
              <Sparkles className="w-4 h-4 mr-2" />
              Powerful Features
            </Badge>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-slate-900">
              Built for <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Developers</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Focus on what matters - building and shipping code with confidence
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Cpu className="w-8 h-8 text-blue-600" />,
                title: "AI Skill Analysis",
                description: "Analyze your GitHub, LinkedIn, and resume to identify skill gaps",
                bgColor: "bg-gradient-to-br from-blue-50 to-blue-100/50",
                gradient: "from-blue-500 to-indigo-500"
              },
              {
                icon: <Map className="w-8 h-8 text-indigo-600" />,
                title: "Learning Roadmap",
                description: "Get a step-by-step path to your target role with time estimates",
                bgColor: "bg-gradient-to-br from-indigo-50 to-indigo-100/50",
                gradient: "from-indigo-500 to-purple-500"
              },
              {
                icon: <Code className="w-8 h-8 text-green-600" />,
                title: "Project Portfolio",
                description: "Build real projects that showcase your skills to employers",
                bgColor: "bg-gradient-to-br from-green-50 to-green-100/50",
                gradient: "from-green-500 to-emerald-500"
              },
              {
                icon: <Database className="w-8 h-8 text-orange-600" />,
                title: "Job Market Data",
                description: "See real salary data and job requirements for your target role",
                bgColor: "bg-gradient-to-br from-orange-50 to-orange-100/50",
                gradient: "from-orange-500 to-red-500"
              },
              {
                icon: <Shield className="w-8 h-8 text-purple-600" />,
                title: "Interview Prep",
                description: "Practice with real interview questions and coding challenges",
                bgColor: "bg-gradient-to-br from-purple-50 to-purple-100/50",
                gradient: "from-purple-500 to-pink-500"
              },
              {
                icon: <ZapIcon className="w-8 h-8 text-yellow-600" />,
                title: "Fast Learning",
                description: "Skip the basics you already know, focus on what you need",
                bgColor: "bg-gradient-to-br from-yellow-50 to-yellow-100/50",
                gradient: "from-yellow-500 to-orange-500"
              }
            ].map((feature, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-700 hover:-translate-y-4 border-slate-200 bg-white overflow-hidden relative">
                {/* Animated gradient border */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-50/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 delay-200"></div>
                
                {/* Floating icon background */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 delay-300 blur-xl"></div>
                
                <CardContent className="p-8 text-center relative z-10">
                  <div className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg group-hover:shadow-xl`}>
                    <div className="group-hover:animate-bounce">
                      {feature.icon}
                    </div>
                  </div>
                  
                  {/* Animated gradient line */}
                  <div className="w-0 h-1 bg-gradient-to-r from-transparent via-slate-300 to-transparent mx-auto mb-6 group-hover:w-16 transition-all duration-700 delay-200"></div>
                  
                  <h3 className="text-xl font-semibold mb-4 text-slate-900 group-hover:text-slate-800 transition-colors duration-300">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors duration-300">{feature.description}</p>
                  
                  {/* Hover effect indicator */}
                  <div className="mt-6 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-300">
                    <div className={`w-2 h-2 bg-gradient-to-r ${feature.gradient} rounded-full mx-auto animate-pulse`}></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-40 px-4 bg-white relative overflow-hidden">
        {/* Enhanced background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-56 h-56 bg-gradient-to-r from-slate-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-blue-400/10 to-indigo-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-indigo-400/10 to-purple-400/10 rounded-full blur-2xl animate-pulse delay-500"></div>
          <div className="absolute bottom-1/3 left-1/4 w-24 h-24 bg-purple-400/10 to-pink-400/10 rounded-full blur-2xl animate-pulse delay-700"></div>
        </div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-24">
            <Badge className="mb-6 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 border border-indigo-200/50 px-6 py-3 text-sm shadow-lg shadow-indigo-500/10 hover:scale-105 transition-transform duration-300">
              <Target className="w-4 h-4 mr-2" />
              Simple Process
            </Badge>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-slate-900">
              How It <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Works</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Three simple steps to accelerate your career and land your dream job
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Target className="w-10 h-10 text-blue-600" />,
                title: "1. Assess Skills",
                description: "Connect your GitHub, LinkedIn, or upload your resume. Our AI analyzes your current skills and identifies what you need to learn.",
                number: "01",
                gradient: "from-blue-500 to-indigo-500"
              },
              {
                icon: <Map className="w-10 h-10 text-indigo-600" />,
                title: "2. Get Roadmap",
                description: "Receive a personalized learning path with specific courses, projects, and milestones. Track your progress in real-time.",
                number: "02",
                gradient: "from-indigo-500 to-purple-500"
              },
              {
                icon: <Zap className="w-10 h-10 text-green-600" />,
                title: "3. Build & Apply",
                description: "Complete projects, practice interviews, and build a portfolio. Apply with confidence knowing you have the right skills.",
                number: "03",
                gradient: "from-green-500 to-emerald-500"
              }
            ].map((step, index) => (
              <Card key={index} className="text-center hover:shadow-2xl transition-all duration-700 hover:-translate-y-4 border-slate-200 bg-white overflow-hidden group relative">
                {/* Enhanced background effects */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-50/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-indigo-50/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 delay-200"></div>
                
                {/* Floating particles effect */}
                <div className="absolute top-4 right-4 w-3 h-3 bg-blue-400/30 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 delay-300 animate-pulse"></div>
                <div className="absolute bottom-4 left-4 w-2 h-2 bg-indigo-400/30 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 delay-500 animate-pulse"></div>
                
                <CardHeader className="pb-6 relative z-10">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-500 shadow-lg group-hover:shadow-xl">
                      <div className="group-hover:animate-pulse">
                        {step.icon}
                      </div>
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                      {step.number}
                    </div>
                    
                    {/* Animated ring effect */}
                    <div className="absolute inset-0 w-20 h-20 border-2 border-blue-200 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-700 delay-200"></div>
                  </div>
                  <CardTitle className="text-2xl font-serif text-slate-900 group-hover:text-slate-800 transition-colors duration-300">{step.title}</CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <CardDescription className="text-base leading-relaxed text-slate-600 group-hover:text-slate-700 transition-colors duration-300">
                    {step.description}
                  </CardDescription>
                  
                  {/* Progress indicator */}
                  <div className="mt-6 flex justify-center">
                    <div className="w-16 h-1 bg-gradient-to-r from-slate-200 to-slate-300 rounded-full overflow-hidden">
                      <div className={`w-0 h-full bg-gradient-to-r ${step.gradient} rounded-full group-hover:w-full transition-all duration-1000 delay-300`}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Career Paths */}
      <section className="py-40 px-4 bg-gradient-to-br from-slate-50 via-indigo-50/20 to-blue-50/20 relative overflow-hidden">
        {/* Enhanced background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-10 w-48 h-48 bg-gradient-to-r from-green-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-10 w-64 h-64 bg-gradient-to-r from-purple-400/10 to-indigo-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-gradient-to-r from-blue-400/10 to-indigo-400/10 rounded-full blur-2xl animate-pulse delay-500"></div>
          <div className="absolute bottom-1/3 right-1/3 w-24 h-24 bg-gradient-to-r from-indigo-400/10 to-purple-400/10 rounded-full blur-2xl animate-pulse delay-700"></div>
        </div>
        
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-24">
            <Badge className="mb-6 bg-gradient-to-r from-green-100 to-blue-100 text-green-700 border border-green-200/50 px-6 py-3 text-sm shadow-lg shadow-green-500/10 hover:scale-105 transition-transform duration-300">
              <Map className="w-4 h-4 mr-2" />
              Proven Paths
            </Badge>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-slate-900">
              Popular <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Career Paths</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Choose from proven learning paths that have helped thousands of developers succeed
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Code className="w-7 h-7 text-blue-600" />,
                title: "Full-Stack Developer",
                duration: "6-8 months",
                skills: ["React/Next.js Frontend", "Node.js Backend", "Database Design", "DevOps Basics"],
                bgColor: "bg-gradient-to-br from-blue-50 to-blue-100/50",
                gradient: "from-blue-500 to-indigo-500",
                color: "blue"
              },
              {
                icon: <Database className="w-7 h-7 text-indigo-600" />,
                title: "Data Engineer",
                duration: "8-10 months",
                skills: ["Python & SQL", "Data Pipelines", "Cloud Platforms", "ML Fundamentals"],
                bgColor: "bg-gradient-to-br from-indigo-50 to-indigo-100/50",
                gradient: "from-indigo-500 to-purple-500",
                color: "indigo"
              },
              {
                icon: <ZapIcon2 className="w-7 h-7 text-green-600" />,
                title: "DevOps Engineer",
                duration: "6-9 months",
                skills: ["Linux & Scripting", "Docker & Kubernetes", "CI/CD Pipelines", "Cloud Infrastructure"],
                bgColor: "bg-gradient-to-br from-green-50 to-green-100/50",
                gradient: "from-green-500 to-emerald-500",
                color: "green"
              }
            ].map((path, index) => (
              <Card key={index} className="hover:shadow-2xl transition-all duration-700 hover:-translate-y-4 border-slate-200 bg-white overflow-hidden group relative">
                {/* Enhanced background effects */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-50/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 delay-200"></div>
                
                {/* Floating skill dots */}
                <div className="absolute top-6 right-6 w-2 h-2 bg-blue-400/40 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 delay-300 animate-pulse"></div>
                <div className="absolute bottom-6 left-6 w-3 h-3 bg-indigo-400/40 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 delay-500 animate-pulse"></div>
                <div className="absolute top-1/2 right-4 w-1.5 h-1.5 bg-green-400/40 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 delay-700 animate-pulse"></div>
                
                <CardHeader className="relative z-10">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className={`w-12 h-12 ${path.bgColor} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500 group-hover:shadow-xl`}>
                      <div className="group-hover:animate-bounce">
                        {path.icon}
                      </div>
                    </div>
                    <div>
                      <CardTitle className="text-xl text-slate-900 group-hover:text-slate-800 transition-colors duration-300">{path.title}</CardTitle>
                      <Badge variant="secondary" className="w-fit bg-slate-100 text-slate-700 border-slate-200 font-semibold group-hover:bg-slate-200 transition-colors duration-300">
                        {path.duration}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="space-y-3 text-sm text-slate-600">
                    {path.skills.map((skill, skillIndex) => (
                      <div key={skillIndex} className="flex items-center space-x-3 group-hover:translate-x-2 transition-transform duration-300 delay-75" style={{ transitionDelay: `${skillIndex * 100}ms` }}>
                        <div className={`w-2 h-2 bg-gradient-to-r ${path.gradient} rounded-full group-hover:scale-125 transition-transform duration-300`}></div>
                        <span className="group-hover:text-slate-700 transition-colors duration-300">{skill}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Cool skill badges */}
                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <div className="flex flex-wrap gap-2 justify-center">
                      {["Beginner", "Intermediate", "Advanced"].map((level, levelIndex) => (
                        <div
                          key={levelIndex}
                          className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-500 delay-${levelIndex * 200} ${
                            levelIndex === 0 
                              ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border border-green-200' 
                              : levelIndex === 1 
                              ? 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 border border-blue-200'
                              : 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border border-purple-200'
                          } group-hover:scale-110 group-hover:shadow-lg`}
                        >
                          {level}
                        </div>
                      ))}
                    </div>
                    
                    {/* Floating achievement dots */}
                    <div className="mt-4 flex justify-center space-x-2">
                      <div className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-pulse group-hover:animate-bounce transition-all duration-300"></div>
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full animate-pulse delay-300 group-hover:animate-bounce transition-all duration-300"></div>
                      <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-pulse delay-600 group-hover:animate-bounce transition-all duration-300"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Plans Section */}
      <section id="pricing" className="py-40 px-4 bg-gradient-to-br from-white via-blue-50/10 to-indigo-50/10 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-10 w-56 h-56 bg-gradient-to-r from-blue-400/5 to-indigo-400/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-48 h-48 bg-gradient-to-r from-indigo-400/5 to-purple-400/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-20">
            <Badge className="mb-6 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 border border-purple-200/50 px-4 py-2 text-sm shadow-lg shadow-purple-500/10">
              <Star className="w-4 h-4 mr-2" />
              Simple Pricing
            </Badge>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-slate-900">
              Simple <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Pricing</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Start free, upgrade when you're ready. No hidden fees, no surprises.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Starter Plan */}
            <Card className="relative group hover:shadow-2xl transition-all duration-700 hover:-translate-y-4 border-slate-200 bg-gradient-to-br from-slate-50 to-white overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-50/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <CardHeader className="text-center pb-6 relative z-10">
                <CardTitle className="text-2xl text-slate-900">Starter</CardTitle>
                <CardDescription className="text-slate-600">Perfect for getting started</CardDescription>
              </CardHeader>
              <CardContent className="text-center relative z-10">
                <div className="text-4xl font-bold text-slate-900 mb-2">$0</div>
                <div className="text-slate-500 mb-8">Forever free</div>
                
                <ul className="space-y-4 text-left mb-8">
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-slate-700">Skill Assessment</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-slate-700">Basic Roadmap</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-slate-700">5 Learning Resources</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-slate-700">Community Access</span>
                  </li>
                </ul>
                
                <Link href="/signup" className="w-full">
                  <Button className="w-full bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                    Get Started Free
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Pro Plan */}
            <Card className="relative group hover:shadow-2xl transition-all duration-700 hover:-translate-y-4 border-2 border-blue-200 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 transform scale-105">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-100/30 via-indigo-100/30 to-purple-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 z-50">
                <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 text-base font-bold shadow-2xl shadow-blue-500/50 border-2 border-white/90 rounded-full">
                  ⭐ Most Popular
                </Badge>
              </div>
              <CardHeader className="text-center pb-6 relative z-10">
                <CardTitle className="text-2xl text-slate-900">Pro</CardTitle>
                <CardDescription className="text-slate-600">For serious career changers</CardDescription>
              </CardHeader>
              <CardContent className="text-center relative z-10">
                <div className="text-4xl font-bold text-slate-900 mb-2">$19</div>
                <div className="text-slate-500 mb-8">per month</div>
                
                <ul className="space-y-4 text-left mb-8">
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-slate-700">Everything in Starter</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-slate-700">Unlimited Resources</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-slate-700">Interview Prep</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-slate-700">Priority Support</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-slate-700">Advanced Analytics</span>
                  </li>
                </ul>
                
                <Link href="/signup" className="w-full">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105 transition-all duration-300">
                    Start Pro Trial
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Enterprise Plan */}
            <Card className="relative group hover:shadow-2xl transition-all duration-700 hover:-translate-y-4 border-slate-200 bg-gradient-to-br from-slate-50 to-white overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-50/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <CardHeader className="text-center pb-6 relative z-10">
                <CardTitle className="text-2xl text-slate-900">Enterprise</CardTitle>
                <CardDescription className="text-slate-600">For teams and organizations</CardDescription>
              </CardHeader>
              <CardContent className="text-center relative z-10">
                <div className="text-4xl font-bold text-slate-900 mb-2">Custom</div>
                <div className="text-slate-500 mb-8">Contact sales</div>
                
                <ul className="space-y-4 text-left mb-8">
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-slate-700">Everything in Pro</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-slate-700">Team Management</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-slate-700">Custom Integrations</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-slate-700">Dedicated Support</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-slate-700">SLA Guarantee</span>
                  </li>
                </ul>
                
                <Link href="/contact" className="w-full">
                  <Button className="w-full bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                    Contact Sales
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 px-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 relative overflow-hidden">
        {/* Enhanced background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/5 rounded-full blur-2xl animate-pulse delay-500"></div>
          <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-white/5 rounded-full blur-2xl animate-pulse delay-700"></div>
          <div className="absolute bottom-1/3 left-1/3 w-12 h-12 bg-white/5 rounded-full blur-xl animate-pulse delay-300"></div>
          <div className="absolute top-2/3 right-1/3 w-14 h-14 bg-white/5 rounded-full blur-xl animate-pulse delay-900"></div>
        </div>
        
        <div className="container mx-auto text-center max-w-5xl relative z-10">
          <Badge className="mb-8 bg-white/20 text-white border border-white/30 px-6 py-3 text-sm backdrop-blur-sm hover:scale-105 transition-transform duration-300 hover:bg-white/30">
            <Rocket className="w-4 h-4 mr-2" />
            Get Started Today
          </Badge>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-8 hover:scale-105 transition-transform duration-500">
            Ready to <span className="text-blue-100 hover:text-white transition-colors duration-300">Level Up</span>?
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto hover:text-white transition-colors duration-300">
            Join thousands of developers who are building better careers with SkillSync.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/assessment">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 text-xl px-12 py-7 shadow-2xl hover:shadow-2xl hover:shadow-white/20 transition-all duration-300 hover:scale-105 hover:-translate-y-1 group">
                <Rocket className="mr-3 w-6 h-6 group-hover:animate-bounce" />
                Start Free Assessment
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="lg" variant="outline" className="text-xl px-12 py-7 border-2 border-white text-white hover:bg-white hover:text-blue-600 transition-all duration-300 hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl group">
                <Users className="mr-3 w-6 h-6 group-hover:animate-pulse" />
                Create Account
              </Button>
            </Link>
          </div>
          
          {/* Trust indicators */}
          <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-blue-100">
            <div className="flex items-center space-x-2 hover:scale-105 transition-transform duration-300">
              <CheckCircle className="w-4 h-4 text-green-300" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center space-x-2 hover:scale-105 transition-transform duration-300">
              <CheckCircle className="w-4 h-4 text-green-300" />
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center space-x-2 hover:scale-105 transition-transform duration-300">
              <CheckCircle className="w-4 h-4 text-green-300" />
              <span>14-day free trial</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-24 px-4 relative overflow-hidden">
        {/* Enhanced background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent"></div>
          <div className="absolute top-1/4 right-10 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 left-10 w-24 h-24 bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/3 left-1/4 w-16 h-16 bg-purple-500/5 rounded-full blur-2xl animate-pulse delay-500"></div>
          <div className="absolute bottom-1/3 right-1/4 w-20 h-20 bg-blue-500/5 rounded-full blur-2xl animate-pulse delay-700"></div>
        </div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center space-x-3 mb-6 hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300">
                <Target className="w-7 h-7 text-white" />
              </div>
              <span className="text-3xl font-serif font-bold hover:text-blue-100 transition-colors duration-300">SkillSync</span>
            </div>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto hover:text-slate-200 transition-colors duration-300">AI-powered career development platform helping developers build the skills that actually matter.</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-10">
            <div className="group">
              <h4 className="font-semibold mb-6 text-white text-lg group-hover:text-blue-100 transition-colors duration-300">Product</h4>
              <ul className="space-y-3 text-sm text-slate-300">
                <li><a href="#" className="hover:text-white transition-all duration-300 hover:scale-105 hover:translate-x-1 inline-block">Skill Assessment</a></li>
                <li><a href="#" className="hover:text-white transition-all duration-300 hover:scale-105 hover:translate-x-1 inline-block">Learning Roadmaps</a></li>
                <li><a href="#" className="hover:text-white transition-all duration-300 hover:scale-105 hover:translate-x-1 inline-block">Project Portfolio</a></li>
                <li><a href="#" className="hover:text-white transition-all duration-300 hover:scale-105 hover:translate-x-1 inline-block">Interview Prep</a></li>
              </ul>
            </div>
            <div className="group">
              <h4 className="font-semibold mb-6 text-white text-lg group-hover:text-indigo-100 transition-colors duration-300">Company</h4>
              <ul className="space-y-3 text-sm text-slate-300">
                <li><a href="#" className="hover:text-white transition-all duration-300 hover:scale-105 hover:translate-x-1 inline-block">About</a></li>
                <li><a href="#" className="hover:text-white transition-all duration-300 hover:scale-105 hover:translate-x-1 inline-block">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-all duration-300 hover:scale-105 hover:translate-x-1 inline-block">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-all duration-300 hover:scale-105 hover:translate-x-1 inline-block">Contact</a></li>
              </ul>
            </div>
            <div className="group">
              <h4 className="font-semibold mb-6 text-white text-lg group-hover:text-purple-100 transition-colors duration-300">Support</h4>
              <ul className="space-y-3 text-sm text-slate-300">
                <li><a href="#" className="hover:text-white transition-all duration-300 hover:scale-105 hover:translate-x-1 inline-block">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-all duration-300 hover:scale-105 hover:translate-x-1 inline-block">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-all duration-300 hover:scale-105 hover:translate-x-1 inline-block">Terms of Service</a></li>
              </ul>
            </div>
            <div className="group">
              <h4 className="font-semibold mb-6 text-white text-lg group-hover:text-green-100 transition-colors duration-300">Connect</h4>
              <ul className="space-y-3 text-sm text-slate-300">
                <li><a href="#" className="hover:text-white transition-all duration-300 hover:scale-105 hover:translate-x-1 inline-block">Discord</a></li>
                <li><a href="#" className="hover:text-white transition-all duration-300 hover:scale-105 hover:translate-x-1 inline-block">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition-all duration-300 hover:scale-105 hover:translate-x-1 inline-block">LinkedIn</a></li>
                <li><a href="#" className="hover:text-white transition-all duration-300 hover:scale-105 hover:translate-x-1 inline-block">GitHub</a></li>
              </ul>
            </div>
          </div>
          
          {/* Enhanced separator */}
          <div className="border-t border-slate-800 mt-12 pt-8 text-center">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse delay-300"></div>
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-600"></div>
            </div>
            <p className="text-sm text-slate-400 hover:text-slate-300 transition-colors duration-300">&copy; 2024 SkillSync. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
