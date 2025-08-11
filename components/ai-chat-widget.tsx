"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageCircle, Send, X, Bot, User } from "lucide-react"

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
  suggestions?: string[]
}

export function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hi! I'm your AI career coach. I'm here to help you with your learning journey, answer questions about your roadmap, and provide personalized career advice. How can I assist you today?",
      sender: "ai",
      timestamp: new Date(),
      suggestions: [
        "How can I improve my skills faster?",
        "What should I focus on next?",
        "Help me prepare for interviews",
        "Suggest learning resources",
      ],
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()

    if (lowerMessage.includes("skill") || lowerMessage.includes("improve") || lowerMessage.includes("learn")) {
      return "Great question! Based on your current progress, I recommend focusing on TypeScript next - it's highly valued by employers and builds on your JavaScript foundation. You could also practice more coding challenges to strengthen your problem-solving skills. Would you like me to suggest specific resources or create a practice schedule?"
    }

    if (lowerMessage.includes("interview") || lowerMessage.includes("job") || lowerMessage.includes("prepare")) {
      return "Interview preparation is crucial! I suggest: 1) Practice coding challenges on LeetCode (focus on arrays, strings, and basic algorithms), 2) Prepare STAR method answers for behavioral questions, 3) Build 2-3 portfolio projects that showcase your skills, 4) Try our job simulations to get realistic practice. Want me to help you create an interview prep timeline?"
    }

    if (lowerMessage.includes("roadmap") || lowerMessage.includes("next") || lowerMessage.includes("focus")) {
      return "Looking at your roadmap, you're 68% complete with your Frontend Developer path! Your next milestone is TypeScript Integration. This is perfect timing since TypeScript skills are in high demand. After that, focus on Modern CSS & Styling to round out your frontend expertise. Should I adjust your timeline based on your availability?"
    }

    if (lowerMessage.includes("resource") || lowerMessage.includes("course") || lowerMessage.includes("book")) {
      return "I'd be happy to recommend resources! For your current level, I suggest: 1) 'TypeScript for React Developers' on Pluralsight, 2) 'CSS Grid & Flexbox Masterclass' on Coursera, 3) Frontend Mentor for hands-on practice projects. These align perfectly with your roadmap. Would you like me to prioritize these based on your learning style?"
    }

    if (lowerMessage.includes("motivation") || lowerMessage.includes("stuck") || lowerMessage.includes("difficult")) {
      return "I understand learning can be challenging! Remember, you've already completed 4 milestones and learned 15 skills - that's impressive progress! Try breaking down complex topics into smaller chunks, celebrate small wins, and don't hesitate to take breaks. Your 12-day streak shows great consistency. What specific topic is giving you trouble?"
    }

    if (lowerMessage.includes("time") || lowerMessage.includes("schedule") || lowerMessage.includes("busy")) {
      return "Time management is key to success! Based on your current pace, I recommend: 1) 30-45 minutes daily for consistent progress, 2) Weekend deep-dive sessions for projects, 3) Use commute time for theory/videos, 4) Set specific learning goals each week. Your current 10-15 hours/week commitment is excellent. Want me to create a personalized schedule?"
    }

    return "That's an interesting question! As your AI career coach, I'm here to help with your learning journey, skill development, career planning, and interview preparation. Could you tell me more about what specific area you'd like guidance on? I can help with roadmap planning, resource recommendations, or motivation strategies."
  }

  const handleSendMessage = async (content?: string) => {
    const messageContent = content || inputValue.trim()
    if (!messageContent) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageContent,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    await new Promise((resolve) => setTimeout(resolve, 1500))

    const aiResponse: Message = {
      id: (Date.now() + 1).toString(),
      content: generateAIResponse(messageContent),
      sender: "ai",
      timestamp: new Date(),
      suggestions: messageContent.toLowerCase().includes("resource")
        ? ["Show me TypeScript tutorials", "Find CSS practice projects", "Recommend coding challenges"]
        : messageContent.toLowerCase().includes("interview")
          ? ["Create interview timeline", "Practice behavioral questions", "Review my portfolio"]
          : ["Tell me about my progress", "What should I learn next?", "Help with time management"],
    }

    setMessages((prev) => [...prev, aiResponse])
    setIsTyping(false)
  }

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion)
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full gradient-bg shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className="w-96 h-[500px] shadow-2xl border-0">
        <CardHeader className="gradient-bg text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <CardTitle className="text-lg">AI Career Coach</CardTitle>
                <CardDescription className="text-blue-100 text-sm">Always here to help</CardDescription>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} className="text-white hover:bg-white/20">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-0 flex flex-col h-[400px]">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className="space-y-2">
                <div className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`flex items-start space-x-2 max-w-[80%] ${
                      message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""
                    }`}
                  >
                    <Avatar className="w-8 h-8">
                      {message.sender === "ai" ? (
                        <div className="w-8 h-8 gradient-bg rounded-full flex items-center justify-center">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                      ) : (
                        <>
                          <AvatarImage src="/placeholder.svg" />
                          <AvatarFallback>
                            <User className="w-4 h-4" />
                          </AvatarFallback>
                        </>
                      )}
                    </Avatar>
                    <div
                      className={`rounded-lg p-3 ${
                        message.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </div>
                </div>

                {message.suggestions && message.sender === "ai" && (
                  <div className="flex flex-wrap gap-2 ml-10">
                    {message.suggestions.map((suggestion, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="text-xs h-7 bg-transparent"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-center space-x-2">
                  <Avatar className="w-8 h-8">
                    <div className="w-8 h-8 gradient-bg rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  </Avatar>
                  <div className="bg-gray-100 rounded-lg p-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t p-4">
            <div className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me anything about your career..."
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1"
              />
              <Button
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim() || isTyping}
                className="gradient-bg"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
