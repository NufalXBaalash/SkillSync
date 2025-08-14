"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Send,
  Brain,
  MessageSquare,
  Lightbulb,
  Target,
  TrendingUp,
  BookOpen,
  Rocket,
  Sparkles,
  Bot,
  User,
  Copy,
  ThumbsUp,
  ThumbsDown,
  RefreshCw
} from "lucide-react"
import ProtectedRoute from "@/components/protected-route"
import SidebarNavigation from "@/components/sidebar-navigation"
import { useAuth } from "@/contexts/auth-context"

interface Message {
  id: string
  content: string
  sender: 'user' | 'ai'
  timestamp: Date
  type: 'text' | 'suggestion' | 'action'
}

interface Suggestion {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  action: string
}

export default function AIChatPage() {
  const { user } = useAuth()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI career assistant. I can help you with career advice, skill development, interview preparation, and more. What would you like to discuss today?",
      sender: 'ai',
      timestamp: new Date(),
      type: 'text'
    }
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [activeSuggestions, setActiveSuggestions] = useState<Suggestion[]>([])

  const userData = {
    name: user?.user_metadata?.first_name && user?.user_metadata?.last_name 
      ? `${user.user_metadata.first_name} ${user.user_metadata.last_name}`
      : user?.email?.split('@')[0] || "User",
    avatar: "/placeholder.svg?height=80&width=80",
  }

  const suggestions: Suggestion[] = [
    {
      id: '1',
      title: "Career Path Guidance",
      description: "Get advice on choosing the right career path",
      icon: <Target className="w-5 h-5" />,
      action: "I'd like guidance on choosing a career path. Can you help me explore different options based on my interests and skills?"
    },
    {
      id: '2',
      title: "Skill Development",
      description: "Learn which skills to focus on next",
      icon: <TrendingUp className="w-5 h-5" />,
      action: "What skills should I focus on developing next to advance in my career?"
    },
    {
      id: '3',
      title: "Interview Preparation",
      description: "Get tips for job interviews",
      icon: <MessageSquare className="w-5 h-5" />,
      action: "I have an interview coming up. Can you help me prepare with some common questions and tips?"
    },
    {
      id: '4',
      title: "Learning Resources",
      description: "Find the best courses and materials",
      icon: <BookOpen className="w-5 h-5" />,
      action: "Can you recommend some learning resources for improving my technical skills?"
    },
    {
      id: '5',
      title: "Career Transition",
      description: "Navigate a career change successfully",
      icon: <Rocket className="w-5 h-5" />,
      action: "I'm thinking about transitioning to a different career field. How should I approach this?"
    },
    {
      id: '6',
      title: "Goal Setting",
      description: "Set and achieve career goals",
      icon: <Lightbulb className="w-5 h-5" />,
      action: "Help me set realistic career goals and create a plan to achieve them."
    }
  ]

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(inputValue),
        sender: 'ai',
        timestamp: new Date(),
        type: 'text'
      }
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
      
      // Show relevant suggestions
      showRelevantSuggestions(inputValue)
    }, 1500)
  }

  const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()
    
    if (input.includes('career') || input.includes('path')) {
      return "Great question! To help you choose the right career path, I'd need to understand your interests, skills, and values. What fields are you most passionate about? What are your strongest skills? And what kind of work environment do you prefer?"
    } else if (input.includes('skill') || input.includes('develop')) {
      return "Skill development is crucial for career growth! Based on current market trends, I'd recommend focusing on both technical and soft skills. What's your current role or field? This will help me give you more specific recommendations."
    } else if (input.includes('interview') || input.includes('prepare')) {
      return "Interview preparation is key to success! Start by researching the company and role thoroughly. Practice common questions like 'Tell me about yourself' and 'Why do you want this job?' Would you like me to help you prepare for specific types of questions?"
    } else if (input.includes('resource') || input.includes('course')) {
      return "There are many excellent learning resources available! For technical skills, I'd recommend platforms like Coursera, Udemy, or free resources like freeCodeCamp. What specific skills are you looking to develop?"
    } else if (input.includes('transition') || input.includes('change')) {
      return "Career transitions can be challenging but rewarding! Start by identifying transferable skills from your current role. Research your target field and consider taking courses or certifications. What field are you looking to transition into?"
    } else {
      return "That's an interesting question! I'd be happy to help you with career advice, skill development, interview preparation, or any other career-related topics. Could you tell me more about what you'd like to discuss?"
    }
  }

  const showRelevantSuggestions = (userInput: string) => {
    const input = userInput.toLowerCase()
    let relevantSuggestions: Suggestion[] = []
    
    if (input.includes('career') || input.includes('path')) {
      relevantSuggestions = [suggestions[0], suggestions[5]]
    } else if (input.includes('skill')) {
      relevantSuggestions = [suggestions[1], suggestions[3]]
    } else if (input.includes('interview')) {
      relevantSuggestions = [suggestions[2], suggestions[1]]
    } else {
      relevantSuggestions = suggestions.slice(0, 3)
    }
    
    setActiveSuggestions(relevantSuggestions)
  }

  const handleSuggestionClick = (suggestion: Suggestion) => {
    setInputValue(suggestion.action)
    setActiveSuggestions([])
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content)
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
                    <Brain className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-h1 mb-2" style={{ color: 'var(--foreground)' }}>AI Career Assistant</h1>
                    <p className="text-body leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                      Get personalized career advice, skill development tips, and interview preparation help from our AI.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid lg:grid-cols-4 gap-6">
                {/* Chat Interface */}
                <div className="lg:col-span-3">
                  <Card className="skillsync-card shadow-lg h-[600px] flex flex-col">
                    <CardHeader className="pb-4 border-b" style={{ borderColor: 'var(--border)' }}>
                      <CardTitle className="text-h3 flex items-center" style={{ color: 'var(--foreground)' }}>
                        <MessageSquare className="w-5 h-5 mr-2" style={{ color: 'var(--primary)' }} />
                        Chat with AI
                      </CardTitle>
                      <CardDescription style={{ color: 'var(--muted-foreground)' }}>
                        Ask me anything about your career, skills, or professional development
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="flex-1 p-0 flex flex-col">
                      {/* Messages Area */}
                      <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex gap-3 ${
                              message.sender === 'user' ? 'justify-end' : 'justify-start'
                            }`}
                          >
                            {message.sender === 'ai' && (
                              <Avatar className="w-8 h-8 flex-shrink-0">
                                <AvatarFallback className="text-sm" style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>
                                  <Bot className="w-4 h-4" />
                                </AvatarFallback>
                              </Avatar>
                            )}
                            
                            <div className={`max-w-[80%] ${
                              message.sender === 'user' ? 'order-1' : 'order-2'
                            }`}>
                              <div className={`p-3 rounded-lg ${
                                message.sender === 'user' 
                                  ? 'bg-primary text-primary-foreground' 
                                  : 'bg-muted'
                              }`} style={{
                                backgroundColor: message.sender === 'user' ? 'var(--primary)' : 'var(--muted)',
                                color: message.sender === 'user' ? 'var(--primary-foreground)' : 'var(--foreground)'
                              }}>
                                <p className="text-body-sm whitespace-pre-wrap">{message.content}</p>
                              </div>
                              
                              {/* Message Actions */}
                              <div className={`flex items-center gap-2 mt-2 ${
                                message.sender === 'user' ? 'justify-end' : 'justify-start'
                              }`}>
                                <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                                
                                {message.sender === 'ai' && (
                                  <div className="flex items-center gap-1">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-6 w-6 p-0 hover:bg-gray-100"
                                      onClick={() => copyMessage(message.content)}
                                    >
                                      <Copy className="w-3 h-3" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-6 w-6 p-0 hover:bg-gray-100"
                                    >
                                      <ThumbsUp className="w-3 h-3" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-6 w-6 p-0 hover:bg-gray-100"
                                    >
                                      <ThumbsDown className="w-3 h-3" />
                                    </Button>
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            {message.sender === 'user' && (
                              <Avatar className="w-8 h-8 flex-shrink-0">
                                <AvatarImage src={userData.avatar} alt={userData.name} />
                                <AvatarFallback className="text-sm">{userData.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                              </Avatar>
                            )}
                          </div>
                        ))}
                        
                        {/* Typing Indicator */}
                        {isTyping && (
                          <div className="flex gap-3 justify-start">
                            <Avatar className="w-8 h-8 flex-shrink-0">
                              <AvatarFallback className="text-sm" style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>
                                <Bot className="w-4 h-4" />
                              </AvatarFallback>
                            </Avatar>
                            <div className="p-3 rounded-lg bg-muted">
                              <div className="flex items-center gap-1">
                                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        <div ref={messagesEndRef} />
                      </div>
                      
                      {/* Input Area */}
                      <div className="p-4 border-t" style={{ borderColor: 'var(--border)' }}>
                        <div className="flex gap-3">
                          <Input
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Ask me anything about your career..."
                            className="skillsync-input flex-1"
                          />
                          <Button
                            onClick={handleSendMessage}
                            disabled={!inputValue.trim() || isTyping}
                            className="skillsync-btn-primary px-6"
                          >
                            <Send className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Suggestions Sidebar */}
                <div className="space-y-6">
                  {/* Quick Suggestions */}
                  <Card className="skillsync-card shadow-lg">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-h3 flex items-center" style={{ color: 'var(--foreground)' }}>
                        <Lightbulb className="w-5 h-5 mr-2" style={{ color: 'var(--accent)' }} />
                        Quick Start
                      </CardTitle>
                      <CardDescription style={{ color: 'var(--muted-foreground)' }}>
                        Try these conversation starters
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {suggestions.map((suggestion) => (
                        <button
                          key={suggestion.id}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-all duration-200 border border-transparent hover:border-gray-200"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center" 
                                 style={{ backgroundColor: 'var(--muted)' }}>
                              {suggestion.icon}
                            </div>
                            <div>
                              <h4 className="font-medium text-sm mb-1" style={{ color: 'var(--foreground)' }}>
                                {suggestion.title}
                              </h4>
                              <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                                {suggestion.description}
                              </p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Active Suggestions */}
                  {activeSuggestions.length > 0 && (
                    <Card className="skillsync-card shadow-lg">
                      <CardHeader className="pb-4">
                        <CardTitle className="text-h3 flex items-center" style={{ color: 'var(--foreground)' }}>
                          <Sparkles className="w-5 h-5 mr-2" style={{ color: 'var(--secondary)' }} />
                          Related Topics
                        </CardTitle>
                        <CardDescription style={{ color: 'var(--muted-foreground)' }}>
                          Continue the conversation
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {activeSuggestions.map((suggestion) => (
                          <button
                            key={suggestion.id}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-all duration-200 border border-transparent hover:border-gray-200"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg flex items-center justify-center" 
                                   style={{ backgroundColor: 'var(--muted)' }}>
                                {suggestion.icon}
                              </div>
                              <div>
                                <h4 className="font-medium text-sm mb-1" style={{ color: 'var(--foreground)' }}>
                                  {suggestion.title}
                                </h4>
                                <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                                  {suggestion.description}
                                </p>
                              </div>
                            </div>
                          </button>
                        ))}
                      </CardContent>
                    </Card>
                  )}

                  {/* Chat Stats */}
                  <Card className="skillsync-card shadow-lg">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-h3" style={{ color: 'var(--foreground)' }}>Chat Stats</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-body-sm" style={{ color: 'var(--muted-foreground)' }}>Messages today</span>
                        <Badge style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}>
                          {messages.length}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-body-sm" style={{ color: 'var(--muted-foreground)' }}>AI responses</span>
                        <Badge style={{ backgroundColor: 'var(--secondary)', color: 'var(--secondary-foreground)' }}>
                          {messages.filter(m => m.sender === 'ai').length}
                        </Badge>
                      </div>
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
