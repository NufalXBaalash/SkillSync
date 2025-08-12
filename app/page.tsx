import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Target, Map, Zap, Star, TrendingUp, Code, BarChart3, Users, Award, Clock, CheckCircle, Play, Download, MessageCircle, Database, Cpu, Shield, Zap as ZapIcon, Sparkles, Rocket, Brain, Terminal } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen tech-gradient-dark relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl tech-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-pink-500/20 to-yellow-500/20 rounded-full blur-3xl tech-float-delayed"></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-full blur-3xl tech-float"></div>
        <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl tech-float-delayed"></div>
      </div>

      {/* Header */}
      <header className="relative z-50 border-b border-white/10 bg-black/20 backdrop-blur-xl">
        <div className="container-responsive py-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 tech-gradient-primary rounded-xl flex items-center justify-center tech-glow">
              <Target className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-serif font-bold tech-text-gradient">SkillSync</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-white/90 hover:text-white transition-colors duration-300">Features</a>
            <a href="#how-it-works" className="text-white/90 hover:text-white transition-colors duration-300">How it Works</a>
            <Link href="/login">
              <Button variant="outline" className="tech-btn-secondary">
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="tech-btn-primary">
                Get Started
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="section-padding px-4 relative z-10">
        <div className="container-responsive text-center max-w-6xl">
          <Badge className="mb-8 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border border-blue-500/30 px-6 py-3 text-lg tech-fade-in">
            <Sparkles className="w-5 h-5 mr-2" />
            AI-Powered Skill Assessment
          </Badge>
          
          <h1 className="text-responsive font-serif font-bold mb-8 leading-tight tech-fade-in tech-stagger-1 text-white">
            Master the Skills That <span className="tech-text-gradient tech-text-glow">Actually Matter</span>
          </h1>
          
          <p className="text-responsive-sm text-white/90 mb-10 max-w-4xl mx-auto leading-relaxed tech-fade-in tech-stagger-2">
            Get a personalized learning roadmap based on real job requirements. No fluff, just the skills you need to land your next role.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center tech-fade-in tech-stagger-3">
            <Link href="/assessment">
              <Button size="lg" className="tech-btn-primary text-xl px-10 py-7">
                <Rocket className="mr-3 w-6 h-6" />
                Start Free Assessment
                <ArrowRight className="ml-3 w-6 h-6" />
              </Button>
            </Link>
            <Link href="/assessment">
              <Button size="lg" variant="outline" className="tech-btn-secondary text-xl px-10 py-7">
                <Play className="mr-3 w-6 h-6" />
                View Demo
              </Button>
            </Link>
          </div>
          
          {/* Trust indicators */}
          <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-10 text-sm text-white/70 tech-fade-in tech-stagger-4">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>Free Assessment</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>5-Minute Setup</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span>Real Job Data</span>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section id="features" className="section-padding px-4 relative z-10">
        <div className="container-responsive max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-serif font-bold mb-6 text-white tech-fade-in">
              Built for <span className="tech-text-gradient">Developers</span>
            </h2>
            <p className="text-2xl text-white/80 tech-fade-in tech-stagger-1">
              Focus on what matters - building and shipping code
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Cpu className="w-8 h-8 text-blue-400" />,
                title: "AI Skill Analysis",
                description: "Analyze your GitHub, LinkedIn, and resume to identify skill gaps",
                gradient: "from-blue-500/20 to-cyan-500/20"
              },
              {
                icon: <Map className="w-8 h-8 text-purple-400" />,
                title: "Learning Roadmap",
                description: "Get a step-by-step path to your target role with time estimates",
                gradient: "from-purple-500/20 to-pink-500/20"
              },
              {
                icon: <Code className="w-8 h-8 text-green-400" />,
                title: "Project Portfolio",
                description: "Build real projects that showcase your skills to employers",
                gradient: "from-green-500/20 to-emerald-500/20"
              },
              {
                icon: <Database className="w-8 h-8 text-orange-400" />,
                title: "Job Market Data",
                description: "See real salary data and job requirements for your target role",
                gradient: "from-orange-500/20 to-red-500/20"
              },
              {
                icon: <Shield className="w-8 h-8 text-indigo-400" />,
                title: "Interview Prep",
                description: "Practice with real interview questions and coding challenges",
                gradient: "from-indigo-500/20 to-blue-500/20"
              },
              {
                icon: <ZapIcon className="w-8 h-8 text-yellow-400" />,
                title: "Fast Learning",
                description: "Skip the basics you already know, focus on what you need",
                gradient: "from-yellow-500/20 to-orange-500/20"
              }
            ].map((feature, index) => (
              <div key={index} className={`tech-card p-8 text-center tech-grid-item tech-stagger-${(index % 4) + 1}`}>
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-xl`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-white">{feature.title}</h3>
                <p className="text-white/80 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="section-padding px-4 relative z-10">
        <div className="container-responsive max-w-6xl">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-serif font-bold mb-6 text-white tech-fade-in">
              How It <span className="tech-text-gradient">Works</span>
            </h2>
            <p className="text-2xl text-white/80 tech-fade-in tech-stagger-1">
              Three steps to accelerate your career
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Target className="w-10 h-10 text-blue-400" />,
                title: "1. Assess Skills",
                description: "Connect your GitHub, LinkedIn, or upload your resume. Our AI analyzes your current skills and identifies what you need to learn.",
                number: "01"
              },
              {
                icon: <Map className="w-10 h-10 text-purple-400" />,
                title: "2. Get Roadmap",
                description: "Receive a personalized learning path with specific courses, projects, and milestones. Track your progress in real-time.",
                number: "02"
              },
              {
                icon: <Zap className="w-10 h-10 text-green-400" />,
                title: "3. Build & Apply",
                description: "Complete projects, practice interviews, and build a portfolio. Apply with confidence knowing you have the right skills.",
                number: "03"
              }
            ].map((step, index) => (
              <div key={index} className="tech-card p-8 text-center tech-scale-in tech-stagger-${index + 1}">
                <div className="relative mb-6">
                  <div className="w-20 h-20 tech-gradient-primary rounded-full flex items-center justify-center mx-auto">
                    {step.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {step.number}
                  </div>
                </div>
                <CardTitle className="text-2xl font-serif mb-4 text-white">{step.title}</CardTitle>
                <CardDescription className="text-base leading-relaxed text-white/80">
                  {step.description}
                </CardDescription>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Career Paths */}
      <section className="section-padding px-4 relative z-10">
        <div className="container-responsive max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-serif font-bold mb-6 text-white tech-fade-in">
              Popular <span className="tech-text-gradient">Career Paths</span>
            </h2>
            <p className="text-2xl text-white/80 tech-fade-in tech-stagger-1">
              Choose from proven learning paths
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Code className="w-7 h-7 text-blue-400" />,
                title: "Full-Stack Developer",
                duration: "6-8 months",
                skills: ["React/Next.js Frontend", "Node.js Backend", "Database Design", "DevOps Basics"],
                gradient: "from-blue-500/20 to-cyan-500/20"
              },
              {
                icon: <BarChart3 className="w-7 h-7 text-purple-400" />,
                title: "Data Engineer",
                duration: "8-10 months",
                skills: ["Python & SQL", "Data Pipelines", "Cloud Platforms", "ML Fundamentals"],
                gradient: "from-purple-500/20 to-pink-500/20"
              },
              {
                icon: <TrendingUp className="w-7 h-7 text-green-400" />,
                title: "DevOps Engineer",
                duration: "6-9 months",
                skills: ["Linux & Scripting", "Docker & Kubernetes", "CI/CD Pipelines", "Cloud Infrastructure"],
                gradient: "from-green-500/20 to-emerald-500/20"
              }
            ].map((path, index) => (
              <div key={index} className={`tech-card tech-grid-item tech-stagger-${index + 1}`}>
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-3">
                    <div className={`w-12 h-12 bg-gradient-to-r ${path.gradient} rounded-xl flex items-center justify-center`}>
                      {path.icon}
                    </div>
                    <div>
                      <CardTitle className="text-xl text-white">{path.title}</CardTitle>
                      <Badge variant="secondary" className="w-fit bg-white text-black border-2 border-white font-bold px-3 py-1 shadow-lg">
                        {path.duration}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm text-white/80">
                    {path.skills.map((skill, skillIndex) => (
                      <div key={skillIndex} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding px-4 relative z-10">
        <div className="container-responsive text-center max-w-5xl">
          <div className="tech-card p-16 text-center tech-gradient-card">
            <h2 className="text-5xl font-serif font-bold text-white mb-8 tech-fade-in">
              Ready to <span className="tech-text-gradient">Level Up</span>?
            </h2>
            <p className="text-2xl text-white/90 mb-12 max-w-3xl mx-auto tech-fade-in tech-stagger-1">
              Join developers who are building better careers with SkillSync.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center tech-fade-in tech-stagger-2">
              <Link href="/assessment">
                <Button size="lg" className="tech-btn-primary text-xl px-10 py-7">
                  Start Free Assessment
                  <ArrowRight className="ml-3 w-6 h-6" />
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="lg" variant="outline" className="tech-btn-secondary text-xl px-10 py-7">
                  Create Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/40 backdrop-blur-xl border-t border-white/10 py-16 px-4 relative z-10">
        <div className="container-responsive max-w-6xl">
          <div className="grid md:grid-cols-4 gap-10">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 tech-gradient-primary rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-serif font-bold tech-text-gradient">SkillSync</span>
              </div>
              <p className="text-white/70 text-sm">AI-powered career development for developers.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-6 text-white">Product</h4>
              <ul className="space-y-3 text-sm text-white/70">
                <li><a href="#" className="hover:text-white transition-colors duration-300">Skill Assessment</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Learning Roadmaps</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Project Portfolio</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Interview Prep</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-6 text-white">Company</h4>
              <ul className="space-y-3 text-sm text-white/70">
                <li><a href="#" className="hover:text-white transition-colors duration-300">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-6 text-white">Support</h4>
              <ul className="space-y-3 text-sm text-white/70">
                <li><a href="#" className="hover:text-white transition-colors duration-300">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-12 pt-8 text-center text-sm text-white/50">
            <p>&copy; 2024 SkillSync. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
