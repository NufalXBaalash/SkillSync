"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Clock, Circle, ExternalLink, BookOpen, FileText, Code, Map, ArrowRight, Play, Target, TrendingUp } from "lucide-react"
import AIChatWidget from "@/components/ai-chat-widget"
import SharedNavigation from "@/components/shared-navigation"
import Link from "next/link"

interface Resource {
  title: string
  type: "course" | "article" | "practice"
  provider: string
  url: string
  duration?: string
  free: boolean
}

interface Milestone {
  id: string
  title: string
  description: string
  status: "completed" | "in-progress" | "upcoming"
  estimatedWeeks: number
  skills: string[]
  resources: Resource[]
}

interface CareerPath {
  title: string
  description: string
  totalDuration: string
  completionRate: number
  milestones: Milestone[]
}

export default function RoadmapPage() {
  const [selectedPath] = useState<CareerPath>({
    title: "Frontend Developer",
    description: "Master modern web development with React, TypeScript, and industry best practices",
    totalDuration: "6 months",
    completionRate: 35,
    milestones: [
      {
        id: "1",
        title: "JavaScript Fundamentals",
        description: "Master ES6+, async programming, and modern JavaScript concepts",
        status: "completed",
        estimatedWeeks: 3,
        skills: ["JavaScript", "ES6+", "Async/Await", "DOM Manipulation"],
        resources: [
          {
            title: "JavaScript: The Complete Guide",
            type: "course",
            provider: "Udemy",
            url: "#",
            duration: "52 hours",
            free: false,
          },
          {
            title: "You Don't Know JS",
            type: "article",
            provider: "GitHub",
            url: "#",
            free: true,
          },
          {
            title: "JavaScript30",
            type: "practice",
            provider: "Wes Bos",
            url: "#",
            duration: "30 days",
            free: true,
          },
        ],
      },
      {
        id: "2",
        title: "React & Component Architecture",
        description: "Build dynamic UIs with React hooks, state management, and component patterns",
        status: "in-progress",
        estimatedWeeks: 4,
        skills: ["React", "JSX", "Hooks", "State Management", "Component Design"],
        resources: [
          {
            title: "React - The Complete Guide",
            type: "course",
            provider: "Udemy",
            url: "#",
            duration: "48 hours",
            free: false,
          },
          {
            title: "React Official Documentation",
            type: "article",
            provider: "React.dev",
            url: "#",
            free: true,
          },
          {
            title: "React Challenges",
            type: "practice",
            provider: "Frontend Mentor",
            url: "#",
            free: true,
          },
        ],
      },
      {
        id: "3",
        title: "TypeScript Integration",
        description: "Add type safety and better developer experience to your React applications",
        status: "upcoming",
        estimatedWeeks: 2,
        skills: ["TypeScript", "Type Definitions", "Interfaces", "Generics"],
        resources: [
          {
            title: "TypeScript for React Developers",
            type: "course",
            provider: "Pluralsight",
            url: "#",
            duration: "6 hours",
            free: false,
          },
          {
            title: "TypeScript Handbook",
            type: "article",
            provider: "TypeScript",
            url: "#",
            free: true,
          },
        ],
      },
      {
        id: "4",
        title: "Modern CSS & Styling",
        description: "Master CSS Grid, Flexbox, animations, and CSS-in-JS solutions",
        status: "upcoming",
        estimatedWeeks: 3,
        skills: ["CSS Grid", "Flexbox", "Animations", "Styled Components", "Tailwind CSS"],
        resources: [
          {
            title: "CSS Grid & Flexbox Masterclass",
            type: "course",
            provider: "Coursera",
            url: "#",
            duration: "20 hours",
            free: false,
          },
          {
            title: "A Complete Guide to CSS Grid",
            type: "article",
            provider: "CSS-Tricks",
            url: "#",
            free: true,
          },
        ],
      },
      {
        id: "5",
        title: "Build & Deploy Portfolio",
        description: "Create a professional portfolio showcasing your projects and deploy to production",
        status: "upcoming",
        estimatedWeeks: 4,
        skills: ["Portfolio Design", "Git", "Deployment", "Performance Optimization"],
        resources: [
          {
            title: "Building a Developer Portfolio",
            type: "course",
            provider: "freeCodeCamp",
            url: "#",
            duration: "8 hours",
            free: true,
          },
          {
            title: "Vercel Deployment Guide",
            type: "article",
            provider: "Vercel",
            url: "#",
            free: true,
          },
        ],
      },
      {
        id: "6",
        title: "Job Interview Preparation",
        description: "Practice coding challenges, system design, and behavioral interviews",
        status: "upcoming",
        estimatedWeeks: 2,
        skills: ["Algorithm Practice", "System Design", "Interview Skills", "Code Reviews"],
        resources: [
          {
            title: "Cracking the Coding Interview",
            type: "course",
            provider: "LeetCode",
            url: "#",
            duration: "100+ problems",
            free: false,
          },
          {
            title: "System Design Primer",
            type: "article",
            provider: "GitHub",
            url: "#",
            free: true,
          },
        ],
      },
    ],
  })

  const getStatusIcon = (status: Milestone["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "in-progress":
        return <Clock className="h-5 w-5 text-blue-500" />
      case "upcoming":
        return <Circle className="h-5 w-5 text-gray-400" />
    }
  }

  const getResourceIcon = (type: Resource["type"]) => {
    switch (type) {
      case "course":
        return <BookOpen className="h-4 w-4" />
      case "article":
        return <FileText className="h-4 w-4" />
      case "practice":
        return <Code className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-violet-50">
      <SharedNavigation />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent mb-4">
            Your Career Roadmap
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Follow your personalized learning path to achieve your career goals
          </p>
        </div>

        {/* Progress Overview */}
        <Card className="mb-8 hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{selectedPath.title}</span>
              <Badge variant="secondary">{selectedPath.totalDuration}</Badge>
            </CardTitle>
            <CardDescription>{selectedPath.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Overall Progress</span>
                <span>{selectedPath.completionRate}%</span>
              </div>
              <Progress value={selectedPath.completionRate} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Timeline */}
        <div className="space-y-6">
          {selectedPath.milestones.map((milestone, index) => (
            <div key={milestone.id} className="relative">
              {/* Timeline line */}
              {index < selectedPath.milestones.length - 1 && (
                <div className="absolute left-6 top-12 w-0.5 h-full bg-gray-200 -z-10" />
              )}

              <Card className={`ml-12 ${milestone.status === "in-progress" ? "ring-2 ring-blue-500" : ""} hover:shadow-lg transition-all duration-300 hover:scale-[1.02]`}>
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="absolute -left-6 mt-1">{getStatusIcon(milestone.status)}</div>
                    <div className="flex-1">
                      <CardTitle className="flex items-center justify-between">
                        <span>{milestone.title}</span>
                        <Badge variant="outline">{milestone.estimatedWeeks} weeks</Badge>
                      </CardTitle>
                      <CardDescription>{milestone.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Skills */}
                  <div>
                    <h4 className="font-semibold mb-2">Skills You'll Learn</h4>
                    <div className="flex flex-wrap gap-2">
                      {milestone.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="hover:bg-blue-100 transition-colors duration-200">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Resources */}
                  <div>
                    <h4 className="font-semibold mb-2">Recommended Resources</h4>
                    <div className="grid gap-3 md:grid-cols-2">
                      {milestone.resources.map((resource, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-all duration-200 hover:shadow-md"
                        >
                          <div className="flex items-center gap-3">
                            {getResourceIcon(resource.type)}
                            <div>
                              <p className="font-medium text-sm">{resource.title}</p>
                              <p className="text-xs text-gray-500">
                                {resource.provider} • {resource.duration} • {resource.free ? "Free" : "Paid"}
                              </p>
                            </div>
                          </div>
                          <Button size="sm" variant="ghost" className="hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  {milestone.status === "in-progress" && (
                    <Button className="w-full gradient-bg hover:shadow-lg transition-all duration-300">
                      Continue Learning
                    </Button>
                  )}
                  {milestone.status === "upcoming" && (
                    <Button variant="outline" className="w-full bg-transparent hover:bg-blue-50 hover:border-blue-300 transition-all duration-200">
                      Start Milestone
                    </Button>
                  )}
                  {milestone.status === "completed" && (
                    <Button variant="secondary" className="w-full hover:bg-green-100 transition-colors duration-200">
                      Review & Practice
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center mt-8">
          <Link href="/simulation">
            <Button size="lg" className="gradient-bg hover:shadow-lg transition-all duration-300">
              <Play className="w-4 h-4 mr-2" />
              Try Job Simulation
            </Button>
          </Link>
          <Button variant="outline" size="lg" className="hover:bg-blue-50 hover:border-blue-300 transition-all duration-200">
            <Target className="w-4 h-4 mr-2" />
            Update Career Goals
          </Button>
        </div>
      </div>

      <AIChatWidget />
    </div>
  )
}
