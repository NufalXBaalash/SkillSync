"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  HelpCircle,
  Search,
  MessageCircle,
  Mail,
  Phone,
  BookOpen,
  Video,
  FileText,
  Users,
  Clock,
  Star,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Lightbulb,
  Shield,
  Zap
} from "lucide-react"
import ProtectedRoute from "@/components/protected-route"
import SidebarNavigation from "@/components/sidebar-navigation"

interface FAQ {
  id: string
  question: string
  answer: string
  category: string
  tags: string[]
}

interface SupportOption {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  responseTime: string
  priority: 'high' | 'medium' | 'low'
  href?: string
  action?: () => void
}

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const categories = [
    { id: "all", label: "All Topics", count: 24 },
    { id: "account", label: "Account & Billing", count: 8 },
    { id: "features", label: "Features & Usage", count: 12 },
    { id: "technical", label: "Technical Issues", count: 4 }
  ]

  const faqs: FAQ[] = [
    {
      id: "1",
      question: "How do I reset my password?",
      answer: "To reset your password, go to the login page and click 'Forgot Password'. Enter your email address and you'll receive a reset link. Make sure to check your spam folder if you don't see the email.",
      category: "account",
      tags: ["password", "security", "login"]
    },
    {
      id: "2",
      question: "Can I export my data from SkillSync?",
      answer: "Yes! You can export your data by going to Settings > Data & Privacy > Export My Data. This will download a ZIP file containing all your assessment results, progress data, and profile information.",
      category: "features",
      tags: ["data", "export", "privacy"]
    },
    {
      id: "3",
      question: "How accurate are the skill assessments?",
      answer: "Our AI-powered assessments are designed to provide accurate insights based on your responses and profile data. However, they should be used as guidance rather than absolute measures. We recommend combining them with real-world feedback and continuous learning.",
      category: "features",
      tags: ["assessment", "accuracy", "ai"]
    },
    {
      id: "4",
      question: "What browsers are supported?",
      answer: "SkillSync works best on modern browsers including Chrome 90+, Firefox 88+, Safari 14+, and Edge 90+. For the best experience, we recommend using the latest version of your preferred browser.",
      category: "technical",
      tags: ["browser", "compatibility", "technical"]
    },
    {
      id: "5",
      question: "How do I update my profile information?",
      answer: "You can update your profile by going to Settings > Profile. Here you can change your name, email, bio, and profile picture. Changes are saved automatically when you navigate away from the page.",
      category: "account",
      tags: ["profile", "settings", "update"]
    },
    {
      id: "6",
      question: "Is my data secure and private?",
      answer: "Absolutely! We take data security seriously. All data is encrypted in transit and at rest. We never share your personal information with third parties without your explicit consent. You can control your privacy settings in Settings > Data & Privacy.",
      category: "account",
      tags: ["security", "privacy", "data"]
    },
    {
      id: "7",
      question: "How often should I take skill assessments?",
      answer: "We recommend taking skill assessments every 3-6 months to track your progress. However, you can take them as often as you'd like. Regular assessments help identify areas for improvement and track your learning journey.",
      category: "features",
      tags: ["assessment", "frequency", "progress"]
    },
    {
      id: "8",
      question: "Can I use SkillSync on mobile devices?",
      answer: "Yes! SkillSync is fully responsive and works great on mobile devices. You can access all features including assessments, AI chat, and profile management from your smartphone or tablet.",
      category: "technical",
      tags: ["mobile", "responsive", "accessibility"]
    }
  ]

  const supportOptions: SupportOption[] = [
    {
      id: "1",
      title: "Live Chat",
      description: "Chat with our support team in real-time",
      icon: <MessageCircle className="w-5 h-5" />,
      responseTime: "Instant",
      priority: "high",
      action: () => console.log("Open live chat")
    },
    {
      id: "2",
      title: "Email Support",
      description: "Send us a detailed message",
      icon: <Mail className="w-5 h-5" />,
      responseTime: "Within 24 hours",
      priority: "medium",
      href: "mailto:support@skillsync.com"
    },
    {
      id: "3",
      title: "Phone Support",
      description: "Call us for urgent issues",
      icon: <Phone className="w-5 h-5" />,
      responseTime: "Immediate",
      priority: "high",
      href: "tel:+1-800-SKILLSYNC"
    },
    {
      id: "4",
      title: "Knowledge Base",
      description: "Browse our comprehensive guides",
      icon: <BookOpen className="w-5 h-5" />,
      responseTime: "Instant",
      priority: "low",
      href: "/knowledge-base"
    }
  ]

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  const toggleFAQ = (id: string) => {
    setExpandedFAQ(expandedFAQ === id ? null : id)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'var(--destructive)'
      case 'medium': return 'var(--accent)'
      case 'low': return 'var(--success)'
      default: return 'var(--muted-foreground)'
    }
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
        <SidebarNavigation />
        
        {/* Main Content */}
        <div className="lg:ml-64">
          <div className="p-6 lg:p-8">
            <div className="max-w-6xl mx-auto">
              {/* Header */}
              <div className="mb-8 skillsync-fade-in">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg" 
                       style={{ backgroundColor: 'var(--primary)' }}>
                    <HelpCircle className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-h1 mb-2" style={{ color: 'var(--foreground)' }}>Help & Support</h1>
                    <p className="text-body leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                      Find answers to common questions, get help with issues, and learn how to make the most of SkillSync.
                    </p>
                  </div>
                </div>
              </div>

              {/* Search Bar */}
              <div className="mb-8">
                <div className="relative max-w-2xl">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" 
                          style={{ color: 'var(--muted-foreground)' }} />
                  <Input
                    placeholder="Search for help articles, FAQs, or topics..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="skillsync-input pl-10 text-lg py-4"
                  />
                </div>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Support Options */}
                  <Card className="skillsync-card shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-h3 flex items-center" style={{ color: 'var(--foreground)' }}>
                        <Zap className="w-5 h-5 mr-3" style={{ color: 'var(--primary)' }} />
                        Get Help Fast
                      </CardTitle>
                      <CardDescription style={{ color: 'var(--muted-foreground)' }}>
                        Choose the best way to get the help you need
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-4">
                        {supportOptions.map((option) => (
                          <div
                            key={option.id}
                            className={`p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer hover:shadow-md ${
                              option.priority === 'high' ? 'border-destructive/20 hover:border-destructive/40' :
                              option.priority === 'medium' ? 'border-accent/20 hover:border-accent/40' :
                              'border-success/20 hover:border-success/40'
                            }`}
                            onClick={() => option.action ? option.action() : option.href ? window.open(option.href) : null}
                          >
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 rounded-lg flex items-center justify-center" 
                                   style={{ backgroundColor: 'var(--muted)' }}>
                                {option.icon}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="font-semibold text-body-sm" style={{ color: 'var(--foreground)' }}>
                                    {option.title}
                                  </h4>
                                  <Badge 
                                    className="text-xs"
                                    style={{ 
                                      backgroundColor: getPriorityColor(option.priority),
                                      color: 'white'
                                    }}
                                  >
                                    {option.priority}
                                  </Badge>
                                </div>
                                <p className="text-small mb-2" style={{ color: 'var(--muted-foreground)' }}>
                                  {option.description}
                                </p>
                                <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--muted-foreground)' }}>
                                  <Clock className="w-3 h-3" />
                                  {option.responseTime}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* FAQ Section */}
                  <Card className="skillsync-card shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-h3 flex items-center" style={{ color: 'var(--foreground)' }}>
                        <FileText className="w-5 h-5 mr-3" style={{ color: 'var(--primary)' }} />
                        Frequently Asked Questions
                      </CardTitle>
                      <CardDescription style={{ color: 'var(--muted-foreground)' }}>
                        Quick answers to common questions
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {/* Category Filter */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {categories.map((category) => (
                          <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id)}
                            className={`px-3 py-1 rounded-full text-sm transition-all duration-200 ${
                              selectedCategory === category.id
                                ? 'bg-primary text-white'
                                : 'bg-muted text-foreground hover:bg-muted/80'
                            }`}
                            style={{
                              backgroundColor: selectedCategory === category.id ? 'var(--primary)' : 'var(--muted)',
                              color: selectedCategory === category.id ? 'var(--primary-foreground)' : 'var(--foreground)'
                            }}
                          >
                            {category.label} ({category.count})
                          </button>
                        ))}
                      </div>

                      {/* FAQ Items */}
                      <div className="space-y-4">
                        {filteredFAQs.map((faq) => (
                          <div
                            key={faq.id}
                            className="border rounded-lg transition-all duration-200 hover:shadow-sm"
                            style={{ borderColor: 'var(--border)' }}
                          >
                            <button
                              className="w-full text-left p-4 flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                              onClick={() => toggleFAQ(faq.id)}
                            >
                              <h4 className="font-medium text-body-sm" style={{ color: 'var(--foreground)' }}>
                                {faq.question}
                              </h4>
                              {expandedFAQ === faq.id ? (
                                <ChevronDown className="w-4 h-4" style={{ color: 'var(--muted-foreground)' }} />
                              ) : (
                                <ChevronRight className="w-4 h-4" style={{ color: 'var(--muted-foreground)' }} />
                              )}
                            </button>
                            
                            {expandedFAQ === faq.id && (
                              <div className="px-4 pb-4 border-t" style={{ borderColor: 'var(--border)' }}>
                                <p className="text-body-sm mt-3 leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                                  {faq.answer}
                                </p>
                                <div className="flex flex-wrap gap-2 mt-3">
                                  {faq.tags.map((tag) => (
                                    <Badge
                                      key={tag}
                                      variant="outline"
                                      className="text-xs"
                                      style={{ borderColor: 'var(--border)', color: 'var(--muted-foreground)' }}
                                    >
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      {filteredFAQs.length === 0 && (
                        <div className="text-center py-8">
                          <FileText className="w-12 h-12 mx-auto mb-3" style={{ color: 'var(--muted-foreground)' }} />
                          <p className="text-body" style={{ color: 'var(--muted-foreground)' }}>
                            No FAQs found matching your search. Try different keywords or browse all categories.
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Quick Actions */}
                  <Card className="skillsync-card shadow-lg">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-h3 flex items-center" style={{ color: 'var(--foreground)' }}>
                        <Lightbulb className="w-5 h-5 mr-2" style={{ color: 'var(--accent)' }} />
                        Quick Actions
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button variant="outline" className="w-full skillsync-btn-secondary justify-start">
                        <BookOpen className="w-4 h-4 mr-2" />
                        User Guide
                      </Button>
                      <Button variant="outline" className="w-full skillsync-btn-secondary justify-start">
                        <Video className="w-4 h-4 mr-2" />
                        Video Tutorials
                      </Button>
                      <Button variant="outline" className="w-full skillsync-btn-secondary justify-start">
                        <Users className="w-4 h-4 mr-2" />
                        Community Forum
                      </Button>
                      <Button variant="outline" className="w-full skillsync-btn-secondary justify-start">
                        <Shield className="w-4 h-4 mr-2" />
                        Security Center
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Contact Info */}
                  <Card className="skillsync-card shadow-lg">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-h3 flex items-center" style={{ color: 'var(--foreground)' }}>
                        <MessageCircle className="w-5 h-5 mr-2" style={{ color: 'var(--secondary)' }} />
                        Contact Us
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: 'var(--muted)' }}>
                        <Mail className="w-4 h-4" style={{ color: 'var(--primary)' }} />
                        <div>
                          <p className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>Email</p>
                          <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>support@skillsync.com</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: 'var(--muted)' }}>
                        <Clock className="w-4 h-4" style={{ color: 'var(--primary)' }} />
                        <div>
                          <p className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>Response Time</p>
                          <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Within 24 hours</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: 'var(--muted)' }}>
                        <Star className="w-4 h-4" style={{ color: 'var(--primary)' }} />
                        <div>
                          <p className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>Satisfaction</p>
                          <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>98% customer satisfaction</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Helpful Resources */}
                  <Card className="skillsync-card shadow-lg">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-h3" style={{ color: 'var(--foreground)' }}>Helpful Resources</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <a href="#" className="block p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 border border-transparent hover:border-gray-200">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center" 
                               style={{ backgroundColor: 'var(--muted)' }}>
                            <BookOpen className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="font-medium text-sm" style={{ color: 'var(--foreground)' }}>Getting Started Guide</h4>
                            <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>New to SkillSync? Start here</p>
                          </div>
                        </div>
                      </a>
                      <a href="#" className="block p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 border border-transparent hover:border-gray-200">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center" 
                               style={{ backgroundColor: 'var(--muted)' }}>
                            <Video className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="font-medium text-sm" style={{ color: 'var(--foreground)' }}>Video Tutorials</h4>
                            <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Step-by-step video guides</p>
                          </div>
                        </div>
                      </a>
                      <a href="#" className="block p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 border border-transparent hover:border-gray-200">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center" 
                               style={{ backgroundColor: 'var(--muted)' }}>
                            <Users className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="font-medium text-sm" style={{ color: 'var(--foreground)' }}>Community Forum</h4>
                            <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Connect with other users</p>
                          </div>
                        </div>
                      </a>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
